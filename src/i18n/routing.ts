import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["tr", "en"] as const,
  defaultLocale: "tr",
  localePrefix: "as-needed",
  localeDetection: false,
  pathnames: {
    "/": "/",
    "/hizmetler": {
      tr: "/hizmetler",
      en: "/services",
    },
    "/markalar": {
      tr: "/markalar",
      en: "/brands",
    },
    "/hakkimizda": {
      tr: "/hakkimizda",
      en: "/about",
    },
    "/iletisim": {
      tr: "/iletisim",
      en: "/contact",
    },
  },
});

export type Locale = (typeof routing.locales)[number];
