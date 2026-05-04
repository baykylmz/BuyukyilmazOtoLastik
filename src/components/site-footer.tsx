import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { site } from "@/lib/site";

export function SiteFooter() {
  const t  = useTranslations("footer");
  const tn = useTranslations("nav");
  const tc = useTranslations("contact");

  return (
    <footer className="mt-16 border-t-2 border-ink bg-ink text-paper">
      <div className="container-page grid gap-10 py-12 md:grid-cols-3">

        <div>
          <div className="flex items-center gap-3">
            <Image src="/brand/logo-mark.svg" alt="" width={36} height={36} className="border border-paper/20 bg-paper p-1" />
            <span className="font-display text-lg font-bold uppercase tracking-wide">{site.name}</span>
          </div>
          <p className="mt-3 text-sm text-paper/60">{t("tagline")}</p>
          {/* Red accent */}
          <span className="mt-4 block h-0.5 w-12 bg-brand-700" />
        </div>

        <div>
          <h3 className="label-mech mb-4 text-paper/50">{t("quickLinks")}</h3>
          <ul className="space-y-2 font-display text-sm font-semibold uppercase tracking-wide">
            {(["home","services","prices","brands","about","contact"] as const).map((k) => (
              <li key={k}>
                <Link
                  href={k === "home" ? "/" : `/${
                    k === "services" ? "hizmetler"
                    : k === "prices"   ? "fiyatlar"
                    : k === "brands"   ? "markalar"
                    : k === "about"    ? "hakkimizda"
                    : "iletisim"
                  }`}
                  className="text-paper/70 hover:text-brand-400 transition-colors"
                >
                  {tn(k)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="label-mech mb-4 text-paper/50">{t("contactInfo")}</h3>
          <ul className="space-y-2 text-sm text-paper/70">
            <li>
              <a href={`tel:${site.phone}`} className="hover:text-brand-400 transition-colors font-mono">
                {site.phoneDisplay}
              </a>
            </li>
            <li>{site.address.street}</li>
            <li>{site.address.district} / {site.address.city}</li>
            <li className="pt-2 font-mono text-paper/50">
              {site.hours.weekday}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-paper/10 py-4">
        <div className="container-page label-mech text-paper/30">
          © {new Date().getFullYear()} {site.legalName} — {t("rights")}
        </div>
      </div>
    </footer>
  );
}
