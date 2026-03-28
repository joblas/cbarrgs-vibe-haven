# Cbarrgs - Music, Artist & Producer

Official website for **Cbarrgs** — a bedroom pop artist and producer. Dark-themed, minimal, and built for the vibe.

**Live:** [cbarrgs.com](https://cbarrgs.com)

## Features

- Minimalist dark aesthetic with grain overlay and parallax effects
- Responsive layout for all devices
- Spotify embed integration
- Animated UI with Framer Motion
- Newsletter subscribe form (Supabase-backed, optional)
- ADA-compliant (WCAG 2.1 AA)
- Edge-level security headers via Cloudflare

## Tech Stack

- **Framework:** React 18 + TypeScript
- **Build:** Vite 5 (SWC)
- **Styling:** Tailwind CSS 3 + Framer Motion
- **UI Components:** Radix UI primitives + shadcn/ui
- **Hosting:** Cloudflare Pages (auto-deploys from `main`)
- **DNS:** Cloudflare (CNAME flattening for apex domain)
- **Backend:** Supabase (optional — site works without it)
- **Icons:** Lucide React + Font Awesome

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install & Run

```bash
npm install
npm run dev
```

The dev server starts at `http://localhost:4000`.

### Build

```bash
npm run build
npm run preview
```

### Environment Variables

Copy `.env.example` to `.env` and fill in values:

```
VITE_SUPABASE_URL=        # Optional — newsletter signup
VITE_SUPABASE_ANON_KEY=   # Optional — newsletter signup
VITE_RESEND_API_KEY=      # Optional — email notifications
```

The site runs fully without these — the subscribe form degrades gracefully with a "coming soon" message.

## Project Structure

```
src/
  components/         # UI components
    ui/               # shadcn/ui primitives
    navigation/       # Nav + mobile menu
    ErrorBoundary.tsx # React error boundary
    Hero.tsx          # Landing hero with parallax
    About.tsx         # Artist bio section
    Listen.tsx        # Spotify embed
    ShopComingSoon.tsx# Merch placeholder
    SubscribeForm.tsx # Newsletter signup (rate-limited)
  hooks/              # Custom hooks (accessibility)
  integrations/       # Supabase client (nullable pattern)
  pages/              # Route pages
    Index.tsx         # Home page
    NotFound.tsx      # 404 with animations
    PrivacyPolicy.tsx # Legal
    TermsOfService.tsx
  lib/                # Utilities
public/
  _headers            # Cloudflare Pages security headers + caching
  _redirects          # SPA routing fallback
  sitemap.xml         # SEO sitemap
  robots.txt          # Crawler rules
```

## Deployment

Cloudflare Pages auto-deploys on push to `main`:

| Setting | Value |
|---------|-------|
| Build command | `npm run build` |
| Output directory | `dist` |
| Node version | 18 |

### DNS & Domain

- **Registrar:** Hostinger
- **Nameservers:** Cloudflare (`holly.ns.cloudflare.com`, `johnny.ns.cloudflare.com`)
- **DNS:** CNAME `@` and `www` → `cbarrgs.pages.dev` (proxied, CNAME flattened)

## Security

- **Content Security Policy** via `public/_headers` (Cloudflare edge)
- **X-Frame-Options**, **X-Content-Type-Options**, **Referrer-Policy** on all responses
- **Permissions-Policy** blocks camera, microphone, geolocation
- **Supabase credentials** in environment variables, never in source
- **Client-side rate limiting** on form submissions (10s cooldown)

## Accessibility (WCAG 2.1 AA)

- Skip-to-content link
- ARIA labels on interactive elements
- Reduced motion support (`prefers-reduced-motion` reactive hook)
- Color contrast ratios meet AA standards
- Keyboard navigable
- Spotify embed includes fallback content

## Performance

- Vendor code splitting (React, Framer Motion, Radix UI as separate chunks)
- Non-blocking font loading (preload + font-display swap)
- Immutable caching on `/assets/*` (1 year)
- 30-day caching on images
- HTML served with `must-revalidate` for instant deploy updates
- Chunk size budget: 500KB warning threshold

## Design Principles

- Black background, white text, serif accents
- Grain overlay texture for analog feel
- Parallax scrolling effects
- Smooth Framer Motion transitions
- Mobile-first responsive design
- Minimal distractions — content focused

## License

All rights reserved.
