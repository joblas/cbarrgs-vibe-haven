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
