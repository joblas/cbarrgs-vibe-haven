#!/usr/bin/env bash
# Regression tests for the guard scripts embedded in .github/workflows/*.yml.
# Each case extracts the real `run:` block from the workflow file and executes it
# against a throwaway git repo with `gh` stubbed, so the test exercises exactly
# the code CI runs. Usage: bash .github/tests/workflow-guards.sh (from repo root).
set -uo pipefail

ROOT=$(git rev-parse --show-toplevel)
WORK=$(mktemp -d)
trap 'rm -rf "$WORK"' EXIT
python3 -c 'import yaml' 2>/dev/null || pip install --quiet pyyaml 2>/dev/null || pip install --quiet --break-system-packages pyyaml

pass=0; fail=0
check() { # name expected actual
  if [ "$2" = "$3" ]; then pass=$((pass+1)); echo "ok   - $1"
  else fail=$((fail+1)); echo "FAIL - $1 (expected $2, got $3)"; fi
}

# Print the `run:` script of the step named $2 in workflow $1.
step_run() {
  python3 - "$1" "$2" <<'PY'
import sys, yaml
wf = yaml.safe_load(open(sys.argv[1]))
for job in wf["jobs"].values():
    for step in job.get("steps", []):
        if step.get("name") == sys.argv[2]:
            print(step["run"]); sys.exit(0)
sys.exit("step not found: " + sys.argv[2])
PY
}

# gh stub: `api .../commits/*/pulls` answers from $STUB_PULLS, `api .../pulls/*/files`
# from $STUB_FILES, `pr diff --name-only` from $STUB_DIFF; --jq is applied with jq.
# $STUB_FILES_PAGES, when set, serves `pulls/*/files` one page per call with
# per_page honored (the real API lists at most 3000 files and paginates at 100);
# $STUB_FAIL, when set, makes every api call fail (network/permission error).
# Every invocation is logged to $GH_LOG.
mkdir -p "$WORK/bin"
cat > "$WORK/bin/gh" <<'STUB'
#!/usr/bin/env bash
echo "gh $*" >> "${GH_LOG:-/dev/null}"
if [ -n "${STUB_FAIL:-}" ]; then echo "gh stub: simulated failure" >&2; exit 1; fi
jqexpr=""; args=()
while [ $# -gt 0 ]; do
  case "$1" in
    --jq) jqexpr=$2; shift 2 ;;
    --paginate) shift ;;
    *) args+=("$1"); shift ;;
  esac
done
emit() { if [ -n "$jqexpr" ]; then jq -r "$jqexpr" "$1"; else cat "$1"; fi; }
case "${args[0]} ${args[1]:-}" in
  "api "*/commits/*/pulls*) emit "$STUB_PULLS" ;;
  "api "*/pulls/*/files*)
    if [ -n "${STUB_FILES_PAGES:-}" ]; then
      # Real `gh api --paginate` applies --jq per page and concatenates the
      # output; serve each page file that way so page-2 entries reach the caller.
      for f in "${STUB_FILES_PAGES}"/*.json; do
        [ -e "$f" ] || continue
        jq -r "${jqexpr:-.}" "$f"
      done
    else
      emit "$STUB_FILES"
    fi ;;
  "api "*/pulls/*)          emit "$STUB_PR" ;;
  "pr diff")                printf '%s\n' "$STUB_DIFF" ;;
  "pr merge"|"pr comment")  : ;;
  *) echo "gh stub: unhandled: ${args[*]}" >&2; exit 2 ;;
esac
STUB
chmod +x "$WORK/bin/gh"
export PATH="$WORK/bin:$PATH" GH_LOG="$WORK/gh.log"

# ---------------------------------------------------------------- tripwire (ci.yml)
TRIPWIRE=$(step_run "$ROOT/.github/workflows/ci.yml" "Gated-path tripwire (enforcement rule 1)")

new_fixture() {
  rm -rf "$WORK/repo"; mkdir -p "$WORK/repo"; cd "$WORK/repo"
  git init -q -b main
  git config user.name Fixture; git config user.email fixture@example.com
  mkdir -p .github functions/api src
  cp "$ROOT/.github/gated-paths.regex" .github/
  echo base > CLAUDE.md; echo 'export {}' > functions/api/subscribers.ts; echo 1 > src/a.js
  git add -A; git commit -qm base
  BEFORE=$(git rev-parse HEAD)
}
pulls_none() { echo '[]' > "$WORK/pulls.json"; }
pulls_merged() { # merge_commit_sha base_ref [head_sha]
  printf '[{"number":7,"merged_at":"2026-10-02T19:14:00Z","merge_commit_sha":"%s","head":{"sha":"%s"},"base":{"ref":"%s"}}]\n' \
    "$1" "${3:-7777777777777777777777777777777777777777}" "$2" > "$WORK/pulls.json"
}
run_tripwire() { # before after
  ( cd "$WORK/repo" && BEFORE="$1" AFTER="$2" REPO=joblas/cbarrgs-vibe-haven \
      STUB_PULLS="$WORK/pulls.json" bash -c "$TRIPWIRE" ) >"$WORK/out.txt" 2>&1
  echo $?
}

# F2: a direct push whose tip claims GitHub's noreply committer must be diffed.
new_fixture
echo spoof >> CLAUDE.md; git add -A
GIT_COMMITTER_EMAIL=noreply@github.com GIT_COMMITTER_NAME=GitHub git commit -qm spoof
pulls_none
check "F2 spoofed noreply committer direct push touching CLAUDE.md fails" 1 "$(run_tripwire "$BEFORE" "$(git rev-parse HEAD)")"

# F3: renaming a gated file out of a gated path must be caught (rename source).
new_fixture
git mv functions/api/subscribers.ts functions/subscribers.ts; git commit -qm rename
pulls_none
check "F3 git mv functions/api/subscribers.ts out of functions/api fails" 1 "$(run_tripwire "$BEFORE" "$(git rev-parse HEAD)")"

# F1: a rebase merge of a merged PR (single parent, human committer) passes.
new_fixture
echo pr-change >> CLAUDE.md; git add -A
GIT_COMMITTER_NAME=Joe GIT_COMMITTER_EMAIL=40072373+joblas@users.noreply.github.com git commit -qm "rebased PR commit"
pulls_merged "$(git rev-parse HEAD)" main
check "F1 rebase-merge commit of a merged PR into main passes" 0 "$(run_tripwire "$BEFORE" "$(git rev-parse HEAD)")"

# A merged PR whose merge_commit_sha is NOT the pushed tip does not excuse the push.
new_fixture
echo x >> CLAUDE.md; git add -A; git commit -qm direct
pulls_merged 1111111111111111111111111111111111111111 main
check "merged PR with a different merge_commit_sha does not excuse a gated push" 1 "$(run_tripwire "$BEFORE" "$(git rev-parse HEAD)")"

# A PR's head branch pushed straight to main is auto-marked merged with
# merge_commit_sha == the pushed head commit (seen live: renfaire-directory
# #22, head == merge_commit_sha, single-parent). That push is a direct push,
# not a merge, so it must fail, touching a gated path.
new_fixture
echo x >> CLAUDE.md; git add -A; git commit -qm "head-branch push"
pulls_merged "$(git rev-parse HEAD)" main "$(git rev-parse HEAD)"
check "PR head branch pushed to main (auto-merged, merge_commit_sha == head) touching a gated path fails" 1 "$(run_tripwire "$BEFORE" "$(git rev-parse HEAD)")"

# Control: the same auto-marked PR push touching only ungated content passes.
new_fixture
echo y >> src/a.js; git add -A; git commit -qm "head-branch push, ungated"
pulls_merged "$(git rev-parse HEAD)" main "$(git rev-parse HEAD)"
check "control: PR head branch pushed to main touching only src/ passes" 0 "$(run_tripwire "$BEFORE" "$(git rev-parse HEAD)")"

# A PR merged into another branch does not excuse a push to main.
new_fixture
echo x >> CLAUDE.md; git add -A; git commit -qm other-base
pulls_merged "$(git rev-parse HEAD)" release
check "PR merged into a non-main base does not excuse a gated push" 1 "$(run_tripwire "$BEFORE" "$(git rev-parse HEAD)")"

# F4: a force-push that orphans BEFORE (unfetchable) fails closed.
new_fixture
echo y >> src/a.js; git add -A; git commit -qm after
pulls_none
check "F4 unreachable, unfetchable BEFORE fails closed" 1 "$(run_tripwire 2222222222222222222222222222222222222222 "$(git rev-parse HEAD)")"

# Audit 2026-10-06 F1': the pattern list is read from BEFORE, not from the
# pushed commit. A push that DELETES .github/gated-paths.regex in the same
# commit as a gated change must fail closed, not lose its own tripwire.
new_fixture
rm .github/gated-paths.regex; echo gone >> CLAUDE.md; git add -A; git commit -qm delete-list
pulls_none
check "audit-F1' push deleting gated-paths.regex with a gated change fails closed" 1 "$(run_tripwire "$BEFORE" "$(git rev-parse HEAD)")"

# A push that NARROWS the list in the same commit as a gated change is still
# judged by the OLD list: the tripwire must not accept its own loosening. The
# narrowed list drops every pattern that matches the pushed change, so only
# the OLD list can hold it.
new_fixture
printf '^src/\\n' > .github/gated-paths.regex; echo x >> CLAUDE.md
git add -A; git commit -qm narrow-list-with-gated-change
pulls_none
check "audit-F1' push narrowing gated-paths.regex is judged by the OLD list" 1 "$(run_tripwire "$BEFORE" "$(git rev-parse HEAD)")"

# Audit 2026-10-06 F2': a malformed regex line in the list at BEFORE is an
# error, never "clean" (grep exit 2 must not read as no-match). The malformed
# list sits at BEFORE itself; the pushed change touches only src/.
new_fixture
printf 'CLAUDE\\.md\n(\n' > .github/gated-paths.regex; git add -A; git commit -qm malformed-list
MAL=$(git rev-parse HEAD)
echo y >> src/a.js; git add -A; git commit -qm after
pulls_none
check "audit-F2' malformed regex line in gated-paths.regex fails closed" 1 "$(run_tripwire "$MAL" "$(git rev-parse HEAD)")"

# Controls: unchanged behaviour.
new_fixture
echo y >> src/a.js; git add -A; git commit -qm content
pulls_none
check "control: direct push touching only src/ passes" 0 "$(run_tripwire "$BEFORE" "$(git rev-parse HEAD)")"
new_fixture
echo y >> CLAUDE.md; git add -A; git commit -qm gated
pulls_none
check "control: direct push touching CLAUDE.md fails" 1 "$(run_tripwire "$BEFORE" "$(git rev-parse HEAD)")"

# ------------------------------------------------------- gate changed-files (ship-gate.yml)
# F3 in the gate: the `changed=` list must include a rename's source path.
GATE=$(step_run "$ROOT/.github/workflows/ship-gate.yml" "Verdict → labels → gated paths → CI → merge")
changed_line=$(grep -E '^changed=' <<< "$GATE")
cat > "$WORK/files.json" <<'J'
[{"filename":"functions/subscribers.ts","previous_filename":"functions/api/subscribers.ts","status":"renamed"},
 {"filename":"src/a.js","status":"modified"}]
J
changed=$( cd "$ROOT" && REPO=joblas/cbarrgs-vibe-haven PR=1 STUB_FILES="$WORK/files.json" \
  STUB_DIFF=$'functions/subscribers.ts\nsrc/a.js' bash -c "set -euo pipefail; $changed_line; printf '%s\n' \"\$changed\"" 2>&1 )
patterns=$(grep -v '^[[:space:]]*$' "$ROOT/.github/gated-paths.regex")
if grep -Eq -f <(printf '%s\n' "$patterns") <<< "$changed"; then r=held; else r=not-held; fi
check "F3 gate: renaming functions/api/subscribers.ts out of functions/api is held" held "$r"

# Audit 2026-10-06 F4a: --paginate must not hide page 2. Two pages of files, the
# gated file (CLAUDE.md) on page 2 only; the gate's changed= list must carry it.
gate_lines() { # extract the changed= and nfiles= lines from the gate step
  grep -E '^(changed|nfiles)=' <<< "$GATE"
}
mkdir -p "$WORK/pages"
cat > "$WORK/pages/1.json" <<'J'
[{"filename":"src/a.js","status":"modified"},{"filename":"src/b.js","status":"modified"}]
J
cat > "$WORK/pages/2.json" <<'J'
[{"filename":"CLAUDE.md","status":"modified"}]
J
page_out=$( cd "$ROOT" && REPO=joblas/cbarrgs-vibe-haven PR=1 STUB_FILES_PAGES="$WORK/pages" \
  bash -c "set -euo pipefail; $(gate_lines | grep '^changed='); printf '%s\n' \"\$changed\"" 2>&1 )
if grep -q 'CLAUDE.md' <<< "$page_out"; then r=listed; else r=missing; fi
check "audit-F4a gate: a gated file on files-page 2 is listed (pagination works)" listed "$r"

# Audit 2026-10-06 F3 (3000 files): past what the files API lists, the gate
# must hold on the PR's changed_files count, not on the truncated list.
cat > "$WORK/pr.json" <<'J'
{"changed_files": 3000}
J
nfiles_line=$(gate_lines | grep '^nfiles=')
nfiles=$( cd "$ROOT" && REPO=joblas/cbarrgs-vibe-haven PR=1 STUB_PR="$WORK/pr.json" \
  bash -c "set -euo pipefail; $nfiles_line; printf '%s' \"\$nfiles\"" 2>&1 )
if [ "$nfiles" -ge 3000 ]; then r=hold; else r=pass; fi
check "audit-F3 gate: 3000 changed files reads as a hold" hold "$r"

# Audit 2026-10-06 F4b: a gh failure while listing files must not read as an
# empty (clean) list. The gate runs under set -euo pipefail, so a failed gh
# aborts the step — assert that, not a silent continue.
ghfail_rc=$( cd "$ROOT" && REPO=joblas/cbarrgs-vibe-haven PR=1 STUB_FAIL=1 \
  bash -c "set -euo pipefail; $(gate_lines | grep '^changed=')" >/dev/null 2>&1; echo $? )
check "audit-F4b gate: gh failure aborts the step (no silent empty list)" 1 "$ghfail_rc"

# --------------------------------------------- Dependabot auto-merge (dependabot-auto-merge.yml)
# F7: CLAUDE.md allows only minor/patch auto-merges; a major dev bump must not merge.
DEPBOT=$(step_run "$ROOT/.github/workflows/dependabot-auto-merge.yml" "Auto-merge if build passes")
dep_run() { # update_type dep_type
  : > "$GH_LOG"
  PR_URL=https://github.com/joblas/cbarrgs-vibe-haven/pull/1 UPDATE_TYPE="$1" DEP_TYPE="$2" bash -c "$DEPBOT" >/dev/null 2>&1
  if grep -q '^gh pr merge' "$GH_LOG"; then echo merged; else echo not-merged; fi
}
check "F7 major devDependency bump is not auto-merged" not-merged "$(dep_run version-update:semver-major direct:development)"
check "control: minor bump is auto-merged" merged "$(dep_run version-update:semver-minor direct:production)"
check "control: major production bump is not auto-merged" not-merged "$(dep_run version-update:semver-major direct:production)"

echo "workflow-guards: $pass passed, $fail failed"
[ "$fail" -eq 0 ]
