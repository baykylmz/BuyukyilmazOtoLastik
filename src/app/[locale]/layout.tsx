import type { Metadata } from "next";
import { Geist_Mono, Barlow_Condensed, Inter } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import "../globals.css";
import { routing } from "@/i18n/routing";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsappFab } from "@/components/whatsapp-fab";
import { LocalBusinessJsonLd } from "@/components/json-ld";
import { site } from "@/lib/site";

// Body text — clean, legible
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

// Headings + labels — industrial condensed
const barlowCondensed = Barlow_Condensed({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700"],
});

// Monospace accents (specs, numbers)
const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  return {
    metadataBase: new URL(site.url),
    title: {
      default: t("seoTitle"),
      template: `%s | ${site.name}`,
    },
    description: t("seoDescription"),
    icons: { icon: "/brand/logo-mark.svg" },
    openGraph: {
      title: t("seoTitle"),
      description: t("seoDescription"),
      url: site.url,
      siteName: site.name,
      locale: locale === "tr" ? "tr_TR" : "en_US",
      type: "website",
    },
    alternates: {
      canonical: "/",
      languages: { tr: "/", en: "/en" },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${barlowCondensed.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <NextIntlClientProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <WhatsappFab />
        </NextIntlClientProvider>
        <LocalBusinessJsonLd />
      </body>
    </html>
  );
}
