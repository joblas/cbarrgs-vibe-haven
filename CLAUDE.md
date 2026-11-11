# Cbarrgs Vibe Haven

Artist website for **Cbarrgs** (see-bargs) at cbarrgs.com.

## Tech Stack

- React 18 + Vite 8 + TypeScript (NOT Next.js — no "use client" needed)
- React Router v6, Tailwind CSS 3.4, Framer Motion, shadcn/ui
- Deployed on **Cloudflare Pages** (not Vercel)
- Backend: Cloudflare Pages Functions + KV (email subscribers) + Resend API
- Merch: Shopify at shopify.cbarrgs.com

## Commands

```bash
npm install        # install deps
npm run dev        # dev server at localhost:5173
npm run build      # production build to dist/
npm run lint       # eslint
npm run preview    # preview production build
```

## Key Routes

| Route | Purpose |
|-------|---------|
| `/` | Main landing page |
| `/new` | Promo smart-link page (bio link for all platforms) |
| `/privacy-policy` | Privacy policy |
| `/terms-of-service` | Terms of service |

## Architecture Notes

- `functions/api/subscribe.ts` — Cloudflare Pages Function for email capture (KV + Resend)
- `functions/api/news.ts` — same-origin proxy to the `cbarrgs-marketing-agent`
  worker's /api/news (CSP is connect-src 'self', so the browser never calls the
  worker directly). Sanitizes to plain text; hero renders these strings as text
  (never dangerouslySetInnerHTML). Hero copy updates via the worker's Telegram
  bot — no site deploy needed.
- Hero section has logo top-left, shopping cart (SVG) top-right, "drop" dropdown (Hellion USA style)
- `/new` page is the single marketing URL — goes in all bios, flyers, QR codes
- Dependabot auto-merges minor/patch updates via GitHub Actions
- All constants/URLs centralized in `src/utils/constants.ts`
- Social links data in `src/data/socialLinks.ts`

## Telegram Agent Mode

If this session was started with a `TELEGRAM_STATE_DIR` pointing at
`telegram-cbarrgs`, you are the artist's Telegram agent: read
`~/.hermes/skills/project-steward/references/cbarrgs-bot.md` FIRST and follow
its boundaries exactly.

## Brand Ground Truth

Canonical brand/aesthetic reference (artist facts, color boundary, catalog,
motifs): `~/.hermes/skills/project-steward/references/cbarrgs-brand.md`.
Redesign mockups + image assets: `design-canvas/` (gitignored) and the canvas
at https://claude.ai/code/artifact/68963549-4ea4-4d00-b2fe-cc5163fce1d8 —
read both before design work; don't re-derive the aesthetic from scratch.

## Design Guidelines

- Dark, minimal, moody aesthetic — reference hellionusa.com
- White/opacity text on black. No bright accent colors.
- `font-light` + `tracking-wider` for typography
- Subtle animations only (opacity, y-translate). No scale in infinite loops.
- Avoid: backdrop-blur, background-attachment: fixed, heavy CSS filters

## Current State (updated 2026-08-25)

- **"Pieces For You" EP** — released April 25, 2026. Sitewide copy and OG tags say "Out Now".
- **Merch** — live at shopify.cbarrgs.com (linked from site).
- SEO upkeep runs via Joe's daily `steward_cbarrgs` cron (charter in Hermes
  project-steward references). Keyword/content work follows the
  grounding-seo-content skill: no new pages without search data or an
  explicit UNVERIFIED label.
- `/new` is the smart-link page in all bios/flyers/QR codes — never rename or
  delete it without a redirect.
- Keep `public/sitemap.xml` in sync when routes change; keep OG/Twitter tags
  current with the latest release (stale "coming soon" tags sat for 4 months).

## Shipping (2026-09-05; gated paths per D-115 since 2026-11-11)

- **Two lanes.** Carlos's Telegram agent (charter in Hermes references) makes
  JS/content changes on `main` directly by Joe's decision — build must pass
  first — and Cloudflare Pages deploys the push. Everything else, from any
  agent, goes branch → PR → **the ship gate** (`.github/workflows/ship-gate.yml`
  + `.claude/skills/ship-review`), which merges on a clean independent review
  at the head SHA plus green CI (`ci.yml`: build + functions typecheck).
- **Gated paths** (`.github/gated-paths.regex`, read by both the CI tripwire and
  the gate): all of `.github/**`, `.claude/**`, `CLAUDE.md`, `AGENTS.md`,
  `wrangler.toml|jsonc|json`, all of `functions/api/**` (the subscriber list and
  its admin key live there) and `functions/_email.ts`, `package.json`,
  `package-lock.json`. A direct push to `main` touching one fails CI, so they
  change only through a PR. Under D-115 (Joe, 2026-10-06: "we have agents in
  place now and i dont want to be a blocker"; adopted here by Joe 2026-11-11),
  the gate merges a gated-path PR like any other: a clean independent review at
  the head SHA plus green CI. The gate labels it `gated-path` and quotes D-115
  on the merge. One exception: Dependabot's minor/patch bumps to `package.json`
  merge through `dependabot-auto-merge.yml`; the gate skips Dependabot PRs.
- **Owner-only paths** wait for Joe's word whatever the review says, because a
  change there could let an agent approve its own way around the gate: all of
  `.github/workflows/**` (any workflow can hold a token that merges),
  `.github/gated-paths.regex`, all of `.claude/**` (agent config and the
  reviewer's skill), `CLAUDE.md` (these rules), and `wrangler.toml|jsonc|json`
  (Cloudflare config). The gate labels them `needs-joe` and merges only after
  Joe adds `joe-approved` from the owner account; any later push voids it.
- **Joe's call by the charter, not by path:** anything Shopify, money,
  accounts, credentials, Cloudflare settings, deleting data (subscriber
  records, KV entries, store records), and new tools or services. Label such a
  PR `needs-joe` and the gate holds it. Deleting code is not deleting data:
  removed files stay in git history and revert cleanly, so a code deletion
  merges on a clean review like any other change.
- **No agent merges a PR by hand**, and no agent commits gated paths directly,
  not as "housekeeping". Reports about CI, merges, or deploys carry the run ID,
  merge SHA, and a live `curl` of cbarrgs.com.
- The site repo is PUBLIC: never commit personal info, internal notes, design
  working files, or secrets (`.env*` and, as of this change, `*.p8` are
  gitignored; keep it so).
