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
- Hero section has logo top-left, shopping cart (SVG) top-right, "drop" dropdown (Hellion USA style)
- `/new` page is the single marketing URL — goes in all bios, flyers, QR codes
- Dependabot auto-merges minor/patch updates via GitHub Actions
- All constants/URLs centralized in `src/utils/constants.ts`
- Social links data in `src/data/socialLinks.ts`

## Design Guidelines

- Dark, minimal, moody aesthetic — reference hellionusa.com
- White/opacity text on black. No bright accent colors.
- `font-light` + `tracking-wider` for typography
- Subtle animations only (opacity, y-translate). No scale in infinite loops.
- Avoid: backdrop-blur, background-attachment: fixed, heavy CSS filters

## Current Campaign (April 2026)

- **"Pieces For You" EP** — coming April 25th
- **Free live show** — April 11th, Distinction Gallery, Escondido CA
- **New merch** (tees, pins, stickers) — just arrived, going to shop soon
- When EP releases: flip "Coming April 25th" → "Out Now" sitewide
- When merch goes live: flip "In the shop soon" → "Shop Now" sitewide
