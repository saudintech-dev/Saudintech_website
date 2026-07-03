# SaudinTech — Bilingual Marketing Website

Next.js 15 (App Router) marketing site for SaudinTech, an IT agency serving Saudi businesses.
Fully bilingual: **English** (`/en`) and **Arabic with RTL** (`/ar`).

## Run locally

```bash
npm install
npm run dev        # development at http://localhost:3000
npm run build      # production build
npm start          # serve the production build
```

The root URL `/` redirects to `/en` or `/ar` based on the visitor's browser language.

## Editing the site

| What you want to change | Where |
| --- | --- |
| **Phone, WhatsApp, email, domain, socials** | `lib/site-config.ts` (one file, updates the whole site) |
| **All text (English)** | `messages/en.json` |
| **All text (Arabic)** | `messages/ar.json` |
| Colors, spacing, design system | `styles/globals.css` (CSS variables at the top) |
| Sections / layout | `components/*.tsx`, assembled in `app/[locale]/page.tsx` |
| SEO titles & descriptions | `meta` section in each `messages/*.json` |

### Before going live — checklist

1. **Buy a domain** (e.g. `saudintech.sa` or `.com`) and set `url` in `lib/site-config.ts` —
   the sitemap, canonical URLs, and hreflang tags are generated from it.
2. **Review the Arabic copy** in `messages/ar.json` with a native speaker.
3. **Confirm the FAQ pricing** (currently "from SAR 3,000" / "from SAR 8,000") matches what you actually charge.
4. Create social media profiles and add their URLs in `lib/site-config.ts` (empty ones are hidden).
5. After deploying, add the site to [Google Search Console](https://search.google.com/search-console)
   and submit `https://your-domain/sitemap.xml`. Put the verification code in `app/[locale]/layout.tsx`.

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new), import the repository — Vercel auto-detects Next.js.
3. Click Deploy. Done — you get `https://<project>.vercel.app`.
4. When you buy a domain: Vercel project → Settings → Domains → add it,
   then update `url` in `lib/site-config.ts` and redeploy.

## What's inside

- **SEO**: per-locale metadata, `hreflang` alternates, canonical URLs, Open Graph image
  (auto-generated), JSON-LD structured data (`ProfessionalService` + `FAQPage`), `sitemap.xml`, `robots.txt`.
- **Performance**: fully static pages (SSG), self-hosted fonts via `next/font`
  (Inter + Montserrat for English, Cairo for Arabic), no render-blocking CDN scripts.
- **Animations**: GSAP ScrollTrigger + Lenis smooth scrolling, ported from the original design.
  Content stays visible without JavaScript (good for crawlers and accessibility);
  respects `prefers-reduced-motion`.
- **`legacy/`**: the original static site draft (kept for reference, not used by the app).
