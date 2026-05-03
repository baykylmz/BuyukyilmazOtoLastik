import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { site } from "@/lib/site";

export function SiteFooter() {
  const t = useTranslations("footer");
  const tn = useTranslations("nav");
  const tc = useTranslations("contact");

  return (
    <footer className="mt-16 border-t border-line bg-ink text-paper/90">
      <div className="container-page grid gap-10 py-12 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/brand/logo-mark.svg"
              alt=""
              width={40}
              height={40}
              className="rounded-md bg-paper p-1"
            />
            <span className="font-semibold">{site.name}</span>
          </div>
          <p className="mt-3 text-sm text-paper/70">{t("tagline")}</p>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-paper/60">
            {t("quickLinks")}
          </h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-brand-300">{tn("home")}</Link></li>
            <li><Link href="/hizmetler" className="hover:text-brand-300">{tn("services")}</Link></li>
            <li><Link href="/markalar" className="hover:text-brand-300">{tn("brands")}</Link></li>
            <li><Link href="/hakkimizda" className="hover:text-brand-300">{tn("about")}</Link></li>
            <li><Link href="/iletisim" className="hover:text-brand-300">{tn("contact")}</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-paper/60">
            {t("contactInfo")}
          </h3>
          <ul className="space-y-2 text-sm text-paper/80">
            <li>
              <a href={`tel:${site.phone}`} className="hover:text-brand-300">
                {tc("phoneLabel")}: {site.phoneDisplay}
              </a>
            </li>
            <li>
              {tc("addressLabel")}: {site.address.street}, {site.address.district}/{site.address.city}
            </li>
            <li className="pt-1 text-paper/60">
              {tc("hoursLabel")}: {site.hours.weekday}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-paper/10 py-4">
        <div className="container-page text-xs text-paper/50">
          © {new Date().getFullYear()} {site.legalName}. {t("rights")}
        </div>
      </div>
    </footer>
  );
}
