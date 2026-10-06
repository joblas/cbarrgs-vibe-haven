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
# Every invocation is logged to $GH_LOG.
mkdir -p "$WORK/bin"
cat > "$WORK/bin/gh" <<'STUB'
#!/usr/bin/env bash
echo "gh $*" >> "${GH_LOG:-/dev/null}"
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
  "api "*/pulls/*/files*)   emit "$STUB_FILES" ;;
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
pulls_merged() { # merge_commit_sha base_ref
  printf '[{"number":7,"merged_at":"2026-10-02T19:14:00Z","merge_commit_sha":"%s","base":{"ref":"%s"}}]\n' "$1" "$2" > "$WORK/pulls.json"
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
