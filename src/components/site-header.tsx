"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X, Phone } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageSwitcher } from "./language-switcher";
import { site, telLink } from "@/lib/site";

const NAV = [
  { href: "/", key: "home" },
  { href: "/hizmetler", key: "services" },
  { href: "/markalar", key: "brands" },
  { href: "/hakkimizda", key: "about" },
  { href: "/iletisim", key: "contact" },
] as const;

export function SiteHeader() {
  const t = useTranslations("nav");
  const tc = useTranslations("common");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur supports-[backdrop-filter]:bg-paper/70">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2" aria-label={site.name}>
          <Image
            src="/brand/logo-mark.svg"
            alt=""
            width={36}
            height={36}
            priority
          />
          <span className="hidden font-semibold tracking-tight text-ink sm:block">
            {site.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "text-brand-700"
                    : "text-ink-soft hover:text-ink"
                }`}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={telLink()}
            className="hidden items-center gap-2 rounded-md bg-brand-700 px-3 py-2 text-sm font-medium text-paper hover:bg-brand-800 sm:flex"
          >
            <Phone className="h-4 w-4" />
            <span>{tc("callNow")}</span>
          </a>
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-ink hover:bg-line/50 md:hidden"
            aria-label="Menu"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-line bg-paper md:hidden">
          <div className="container-page flex flex-col py-2">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-base font-medium text-ink-soft hover:bg-line/40 hover:text-ink"
              >
                {t(item.key)}
              </Link>
            ))}
            <a
              href={telLink()}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-brand-700 px-3 py-3 text-sm font-semibold text-paper"
            >
              <Phone className="h-4 w-4" />
              {tc("callNow")} · {site.phoneDisplay}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
