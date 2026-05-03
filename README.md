# Büyükyılmaz Oto Lastik

Konya Selçuklu'da hizmet veren lastik dükkanının kurumsal web sitesi.

Faz 1: içerik sitesi (Next.js 15, App Router, TR/EN). Faz 2'de randevu sistemi, sonrasında Odoo entegrasyonu planlanıyor. Mimari kararların gerekçesi için repo kökündeki PDF rapora bakın.

## Stack

- **Next.js 16** (App Router, Turbopack, React 19)
- **TypeScript**
- **Tailwind CSS v4**
- **next-intl** — TR/EN, `as-needed` locale prefix
- **lucide-react** — ikonlar

## Geliştirme

```bash
npm install
npm run dev
```

Site `http://localhost:3000` (TR) ve `http://localhost:3000/en` adreslerinde açılır.

## İletişim Bilgileri

`src/lib/site.ts` dosyasında `TODO` etiketli alanları (telefon, WhatsApp, adres, harita embed URL'i) gerçek değerlerle güncelleyin.

## Build

```bash
npm run build
npm start
```

## Yapı

```
src/
  app/
    [locale]/         # TR/EN ortak sayfalar
    sitemap.ts
    robots.ts
  components/         # Header, Footer, JSON-LD vb.
  i18n/               # next-intl config
  lib/site.ts         # merkezi işletme bilgileri
messages/             # tr.json, en.json
public/brand/         # logo varyantları (#b7132a / #fbfcfa)
```

## Yol Haritası

- **Faz 1 (mevcut):** İçerik sitesi
- **Faz 2:** PostgreSQL + randevu sistemi (`tsrange` + `EXCLUDE USING GIST` ile çifte rezervasyon koruması)
- **Faz 3:** Plaka/VIN lastik çözümleme API entegrasyonu, PWA
- **Faz 4:** Odoo entegrasyonu (admin paneli olarak)
