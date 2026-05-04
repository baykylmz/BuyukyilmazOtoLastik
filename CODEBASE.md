# Bosna Oto Lastik — Codebase Documentation

## Overview

This is the official website for **Bosna Oto Lastik**, a tire shop located in Konya Selçuklu, Turkey. The site is a **Phase 1 content-only marketing site** — no database, no authentication, no backend logic. Future phases will add appointment booking and Odoo ERP integration.

**Live:** [bosnaotolastik.com](https://bosnaotolastik.com)  
**Repository:** [github.com/baykylmz/BuyukyilmazOtoLastik](https://github.com/baykylmz/BuyukyilmazOtoLastik)  
**Hosting:** Vercel (auto-deploy on push to `main`)

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | 16.x |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | v4 |
| i18n | next-intl | 4.x |
| Animations | Framer Motion | 12.x |
| Icons | lucide-react | 0.460.x |
| Runtime | React | 19.x |
| Build tool | Turbopack | bundled with Next.js |
| Hosting | Vercel | — |

---

## Project Structure

```
bosnaotolastik/
├── messages/
│   ├── tr.json              # Turkish translations (default language)
│   └── en.json              # English translations
├── public/
│   └── brand/
│       ├── logo.svg         # Full horizontal logo (white bg, red brand)
│       ├── logo-alt.svg     # Alternate logo variant
│       ├── logo-square.svg  # Square format logo
│       └── logo-mark.svg    # Icon-only mark (used in header/footer/favicon)
├── src/
│   ├── app/
│   │   ├── [locale]/        # All pages live under the locale segment
│   │   │   ├── layout.tsx   # Root layout: fonts, html/body, header, footer
│   │   │   ├── page.tsx     # Home page
│   │   │   ├── hizmetler/   # Services page
│   │   │   ├── fiyatlar/    # Prices page
│   │   │   ├── markalar/    # Brands page
│   │   │   ├── hakkimizda/  # About page
│   │   │   └── iletisim/    # Contact page
│   │   ├── globals.css      # Tailwind v4 theme + mechanical design tokens
│   │   ├── sitemap.ts       # Auto-generated sitemap with hreflang alternates
│   │   └── robots.ts        # robots.txt
│   ├── components/
│   │   ├── site-header.tsx      # Sticky header with nav, language switcher, call button
│   │   ├── site-footer.tsx      # Footer with links, contact info, brand
│   │   ├── language-switcher.tsx # TR / EN toggle
│   │   ├── whatsapp-fab.tsx     # Floating WhatsApp button (bottom-right, always visible)
│   │   ├── motion.tsx           # Framer Motion animation primitives
│   │   ├── json-ld.tsx          # LocalBusiness / TireShop schema (all pages)
│   │   ├── faq-schema.tsx       # FAQPage JSON-LD schema (home page)
│   │   └── breadcrumb-schema.tsx # BreadcrumbList JSON-LD schema (inner pages)
│   ├── i18n/
│   │   ├── routing.ts       # Locale config + localized pathnames
│   │   ├── navigation.ts    # next-intl Link, useRouter, usePathname wrappers
│   │   └── request.ts       # Server-side locale resolution
│   ├── lib/
│   │   └── site.ts          # ★ Central business config (phone, address, hours, brands…)
│   └── proxy.ts             # next-intl middleware (locale routing)
├── next.config.ts           # Next.js config with next-intl plugin
├── .env.example             # Example environment variables
└── CODEBASE.md              # This file
```

---

## The One File You'll Edit Most

### `src/lib/site.ts`

Everything about the business lives here. Whenever contact details, hours, or brands change, this is the only file to touch.

```ts
export const site = {
  name: "Bosna Oto Lastik",
  url: "https://bosnaotolastik.com",

  phone: "+905357855587",         // E.164 — used in tel: links
  phoneDisplay: "0535 785 55 87", // Human-readable
  phone2: "+905378475138",
  phone2Display: "0537 847 51 38",
  whatsappNumber: "905357855587", // Digits only, no +

  address: {
    neighborhood: "Bosna Hersek Mahallesi",
    street: "Osmanlı Cd. No:14/20",
    district: "Selçuklu",
    city: "Konya",
    postalCode: "42250",
    full: "Bosna Hersek Mh., Osmanlı Cd. No:14/20, 42250 Selçuklu/Konya",
  },

  mapsEmbedUrl: "https://www.google.com/maps?q=38.009564,32.526168&output=embed",

  hours: {
    weekday:  "08:30 – 00:00",
    saturday: "08:30 – 00:00",
    sunday:   "08:30 – 00:00",
  },

  brands: ["Lassa", "Bridgestone", "Dayton", "Michelin", "Continental", ...],

  dealerNetwork: {
    name: "Lastiğim",
    operator: "Brisa (Bridgestone × Sabancı)",
    url: "https://lastigim.com.tr",
    primaryBrands: ["Lassa", "Bridgestone", "Dayton"],
  },
};
```

Helper functions exported from the same file:

```ts
whatsappLink(message?)  // → "https://wa.me/905357855587?text=..."
telLink(secondary?)     // → "tel:+905357855587" or second number
```

---

## Internationalization (TR / EN)

The site supports Turkish and English using **next-intl 4** with the App Router.

### How URLs work

| Page | Turkish (default) | English |
|---|---|---|
| Home | `/` | `/en` |
| Services | `/hizmetler` | `/en/services` |
| Prices | `/fiyatlar` | `/en/prices` |
| Brands | `/markalar` | `/en/brands` |
| About | `/hakkimizda` | `/en/about` |
| Contact | `/iletisim` | `/en/contact` |

Turkish has no prefix (`as-needed` mode). English gets `/en/`. `localeDetection: false` ensures the site always opens in Turkish regardless of the visitor's browser language.

### How it works

1. `src/proxy.ts` — middleware intercepts every request and resolves the locale
2. `src/i18n/routing.ts` — defines the locales, default locale, and the URL pathname map
3. `src/i18n/request.ts` — loads the correct `messages/*.json` on the server
4. `messages/tr.json` + `messages/en.json` — all user-facing strings

### Adding / editing text

Open `messages/tr.json` and `messages/en.json`, edit the matching key in both files. The structure is:

```json
{
  "nav": { ... },
  "common": { ... },
  "home": {
    "seoTitle": "...",
    "seoDescription": "...",
    "faq": { "q1": "...", "a1": "...", ... },
    ...
  },
  "services": { "seoTitle": "...", "seoDescription": "...", "title": "...", "items": { ... } },
  "prices":   { "seoTitle": "...", "seoDescription": "...", "items": { ... } },
  "brands":   { "seoTitle": "...", "seoDescription": "...", ... },
  "about":    { "seoTitle": "...", "seoDescription": "...", ... },
  "contact":  { "seoTitle": "...", "seoDescription": "...", ... },
  "footer":   { ... }
}
```

---

## Design System

### Brand Colors

Extracted from the original logo SVGs.

| Token | Hex | Usage |
|---|---|---|
| `brand-700` | `#b7132a` | Primary red — CTAs, accents, active states |
| `paper` | `#f4f3f0` | Page background (warm off-white) |
| `paper-dark` | `#e8e6e1` | Card backgrounds |
| `ink` | `#0e0c0b` | Near-black text and fills |
| `ink-muted` | `#5a534c` | Secondary text |
| `steel` | `#7c7570` | Tertiary / labels |
| `line` | `#d4cfc8` | Borders |
| `#25D366` | — | WhatsApp green (never repurposed) |

### Typography

Three font families create the mechanical character:

| Font | Variable | Usage |
|---|---|---|
| **Barlow Condensed** | `--font-display` | All `h1`/`h2`, uppercase labels, nav links |
| **Inter** | `--font-sans` | Body text, paragraphs |
| **Geist Mono** | `--font-mono` | Phone numbers, hours, spec labels |

The `.label-mech` utility class combines monospace + uppercase + letter-spacing for industrial-style labels throughout the UI.

### Button System

Four semantic button classes — never use ad-hoc colors for buttons:

| Class | Appearance | When to use |
|---|---|---|
| `.btn-primary` | Black fill, white text | Phone call — trust, solidity |
| `.btn-danger` | Red fill, white text | WhatsApp — highest urgency (max 1 per page) |
| `.btn-ghost` | 2px black border, fills on hover | Secondary actions on light backgrounds |
| `.btn-ghost-inv` | 2px white border | On dark/red backgrounds |

All buttons have a mechanical press effect (`.btn:active { transform: scale(0.97) }`).

---

## Animation System (`src/components/motion.tsx`)

All animations use **Framer Motion** with spring presets tuned for a mechanical, snappy feel — not floaty or bouncy.

### Spring presets

```ts
spring.stiff  // stiffness: 500, damping: 30  — general reveals
spring.snap   // stiffness: 700, damping: 35  — button press
```

### Components

| Component | Effect | Usage |
|---|---|---|
| `<StampHeadline>` | Scale 1.07→1 with overshoot | Hero title, eyebrow tags |
| `<AccentLine>` | Red line draws itself (width 0→48px) | Under every section `h1`/`h2` |
| `<RevealSection>` | Fade + slide up on scroll | Paragraphs, page headers |
| `<StaggerGrid>` | Wraps a grid, staggers children | Service cards, brand tiles |
| `<StaggerItem>` | Individual item inside StaggerGrid | Each card |
| `<MotionButton>` + `motionPress` | scale(0.96) on tap, scale(1.02) on hover | CTA links |

All scroll animations use `whileInView` with `once: true` — they fire once and stay visible.

---

## Pages

### Home (`src/app/[locale]/page.tsx`)

Three sections:

1. **Hero** — dark background with mechanical grid overlay, logo, headline with `StampHeadline`, two CTAs (WhatsApp = red, Services = ghost-inv)
2. **Highlights** — three staggered cards: experience (since 1993), authorized Lastiğim dealer, open 7 days
3. **CTA band** — dark background, WhatsApp + phone buttons

Includes `<FaqSchema>` for Google FAQ rich results.

### Services (`src/app/[locale]/hizmetler/page.tsx`)

7 service cards in a responsive grid (1 → 2 → 3 columns). Each card has an icon, uppercase title, and description. All service keys are defined as a typed constant and rendered from `messages.services.items`.

Services: Tire Sales, Mounting, Balancing, Repair, Tire Hotel (Storage), Rim Sales, Fleet Service.

### Prices (`src/app/[locale]/fiyatlar/page.tsx`)

Price list with 12 service rows. Prices are hardcoded in the component as numbers; labels come from `messages.prices.items`. Displayed as a table on desktop and stacked cards on mobile. All prices are in ₺ excluding VAT.

### Brands (`src/app/[locale]/markalar/page.tsx`)

Authorized Lastiğim dealer badge at the top, then primary brands (Lassa, Bridgestone, Dayton) in red tiles, then secondary brands in neutral tiles. Brand list pulled from `site.brands` in `site.ts`.

### About (`src/app/[locale]/hakkimizda/page.tsx`)

Static text from `messages.about`. Covers founding history (1993 craft journey, 2015 Bosna Oto Lastik), opening hours, and payment info.

### Contact (`src/app/[locale]/iletisim/page.tsx`)

Six info cards + Google Maps iframe:
- Primary phone (tap to call)
- Secondary phone (tap to call)
- WhatsApp (pre-filled message)
- Address
- Hours (every day 08:30–00:00)
- Payment methods (Cash, Mastercard, VISA)

Map embed uses exact GPS coordinates: `38.009564, 32.526168`.

---

## SEO

### Metadata

Every page exports `generateMetadata` pulling `seoTitle` and `seoDescription` from the matching translation namespace. The layout sets a `template: "%s | Bosna Oto Lastik"` fallback. OpenGraph and hreflang alternates are set in the layout.

### Structured Data (JSON-LD)

Three schema components:

| Component | Schema type | Where rendered |
|---|---|---|
| `json-ld.tsx` | `TireShop` + `AutoRepair` + `LocalBusiness` | Every page (layout) |
| `faq-schema.tsx` | `FAQPage` | Home page only |
| `breadcrumb-schema.tsx` | `BreadcrumbList` | All 5 inner pages |

### Sitemap (`src/app/sitemap.ts`)

Auto-generated at `/sitemap.xml`. Includes all pages in both languages with `alternates.languages` for each URL. Submitted to Google Search Console.

### Robots (`src/app/robots.ts`)

Allows all crawlers, points to the sitemap.

### Google Search Console

- Property verified via DNS TXT record (added in Vercel DNS settings)
- Sitemap submitted: `https://bosnaotolastik.com/sitemap.xml`

---

## Deployment

Hosting is on **Vercel**, connected to the GitHub repository.

- Every `git push origin main` triggers an automatic production deploy (~1–2 min)
- Domain: `bosnaotolastik.com` (registered on Namecheap, nameservers pointed to `ns1/ns2.vercel-dns.com`)
- HTTPS is automatic via Vercel
- DNS records (including Google Search Console verification TXT) are managed in Vercel's DNS panel

### Local development

```bash
npm install
npm run dev
# http://localhost:3000      → Turkish (default)
# http://localhost:3000/en   → English
```

### Production build

```bash
npm run build   # type-checks + generates static pages
npm start       # serves the production build locally
```

---

## Roadmap

The architecture is intentionally designed to grow without a rewrite:

### Phase 2 — Appointment Booking
- PostgreSQL + Prisma schema (User, Vehicle, Service, Appointment)
- `tsrange` + `EXCLUDE USING GIST` constraint for double-booking prevention at the database level
- NextAuth or Clerk for authentication
- Customer dashboard (book / cancel / history)
- Admin dashboard (calendar view, status updates)
- Email + SMS notifications (Resend + Turkish SMS provider)
- All timestamps stored as UTC (`timestamptz`), displayed as `Europe/Istanbul`

### Phase 3 — Tire Lookup API + PWA
- Plate/VIN → tire size lookup (TireConnect or local provider)
- Full PWA: offline shell, Web Push notifications for appointment reminders
- Stock synchronization

### Phase 4 — Odoo Integration
- Odoo XML-RPC/JSON-RPC bridge via Next.js Route Handler
- Use Odoo as the admin backend, site as the customer-facing interface
- Start with one-way sync (Odoo → site inventory), then bidirectional (appointment → Odoo task)

---

## Common Tasks

**Change business hours:**
Edit `site.hours` in `src/lib/site.ts`.

**Add a tire brand:**
Add a string to `site.brands` array in `src/lib/site.ts`.

**Edit page text:**
Edit `messages/tr.json` and `messages/en.json` — keep both files in sync.

**Edit a service price:**
Edit the `car` / `commercial` values in the `PRICES` array in `src/app/[locale]/fiyatlar/page.tsx`.

**Update Google Maps embed:**
Replace `site.mapsEmbedUrl` in `src/lib/site.ts` with the `src` value from Google Maps → Share → Embed a map.

**Add a new page:**
1. Create `src/app/[locale]/yeni-sayfa/page.tsx`
2. Add the path to `src/i18n/routing.ts` under `pathnames` (with EN equivalent)
3. Add the nav link to `NAV` array in `src/components/site-header.tsx`
4. Add translation keys to both `messages/*.json`
5. Add `<BreadcrumbSchema>` to the new page
