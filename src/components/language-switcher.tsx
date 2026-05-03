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
    startTransition(() => { router.replace(pathname, { locale: next }); });
  }

  return (
    <div className="flex items-center border-2 border-line font-display text-xs font-bold uppercase">
      {(["tr", "en"] as Locale[]).map((l, i) => (
        <button
          key={l}
          type="button"
          onClick={() => setLocale(l)}
          disabled={pending}
          aria-pressed={locale === l}
          className={`px-2.5 py-1.5 transition-colors ${
            locale === l ? "bg-ink text-paper" : "text-steel hover:text-ink"
          } ${i === 0 ? "" : "border-l border-line"}`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
