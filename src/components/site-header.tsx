"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X, Phone } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageSwitcher } from "./language-switcher";
import { site, telLink } from "@/lib/site";

const NAV = [
  { href: "/",           key: "home" },
  { href: "/hizmetler",  key: "services" },
  { href: "/fiyatlar",   key: "prices" },
  { href: "/markalar",   key: "brands" },
  { href: "/hakkimizda", key: "about" },
  { href: "/iletisim",   key: "contact" },
] as const;

export function SiteHeader() {
  const t  = useTranslations("nav");
  const tc = useTranslations("common");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink bg-paper/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">

        <Link href="/" className="font-display text-lg font-bold uppercase tracking-wide" aria-label={site.name}>
          {site.name}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center md:flex">
          {NAV.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`label-mech px-4 py-5 transition-colors border-b-2 ${
                  active
                    ? "border-brand-700 text-ink"
                    : "border-transparent text-steel hover:text-ink hover:border-line-dark"
                }`}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a href={telLink()} className="btn btn-primary hidden text-xs sm:inline-flex">
            <Phone className="h-3.5 w-3.5" />
            {tc("callNow")}
          </a>
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center border-2 border-line text-ink hover:border-ink md:hidden"
            aria-label="Menu"
            aria-expanded={open}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="border-t-2 border-ink bg-paper md:hidden">
          <div className="container-page flex flex-col py-3">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="label-mech border-b border-line py-3 text-steel hover:text-ink"
              >
                {t(item.key)}
              </Link>
            ))}
            <a
              href={telLink()}
              className="btn btn-primary mt-4 w-full justify-center"
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
