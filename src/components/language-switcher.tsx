"use client";

import { useLocale } from "next-intl";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();

  function setLocale(next: Locale) {
    if (next === locale) return;
    startTransition(() => {
      // pathname here is the locale-stripped pathname
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <div className="flex items-center rounded-md border border-line text-xs font-semibold">
      <button
        type="button"
        onClick={() => setLocale("tr")}
        disabled={pending}
        aria-pressed={locale === "tr"}
        className={`px-2.5 py-1.5 rounded-l-md ${
          locale === "tr"
            ? "bg-ink text-paper"
            : "text-ink-soft hover:text-ink"
        }`}
      >
        TR
      </button>
      <button
        type="button"
        onClick={() => setLocale("en")}
        disabled={pending}
        aria-pressed={locale === "en"}
        className={`px-2.5 py-1.5 rounded-r-md ${
          locale === "en"
            ? "bg-ink text-paper"
            : "text-ink-soft hover:text-ink"
        }`}
      >
        EN
      </button>
    </div>
  );
}
