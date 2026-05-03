import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const PATHS = ["", "/hizmetler", "/markalar", "/hakkimizda", "/iletisim"] as const;
const EN_PATHS: Record<(typeof PATHS)[number], string> = {
  "": "/en",
  "/hizmetler": "/en/services",
  "/markalar": "/en/brands",
  "/hakkimizda": "/en/about",
  "/iletisim": "/en/contact",
};

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return PATHS.flatMap((p) => [
    {
      url: `${site.url}${p || "/"}`,
      lastModified: now,
      alternates: {
        languages: {
          tr: `${site.url}${p || "/"}`,
          en: `${site.url}${EN_PATHS[p]}`,
        },
      },
    },
    {
      url: `${site.url}${EN_PATHS[p]}`,
      lastModified: now,
    },
  ]);
}
