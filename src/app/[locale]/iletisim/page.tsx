import { getTranslations, setRequestLocale } from "next-intl/server";
import { Phone, MessageCircle, MapPin, Clock } from "lucide-react";
import { site, telLink, whatsappLink } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("title") };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  return (
    <section className="container-page py-16 md:py-24">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-4 text-lg text-ink-soft">{t("subtitle")}</p>
      </header>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <a
            href={telLink()}
            className="group flex items-start gap-4 rounded-xl border border-line bg-paper p-5 transition-colors hover:border-brand-700"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-700 text-paper">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
                {t("phoneLabel")}
              </p>
              <p className="mt-0.5 text-lg font-semibold group-hover:text-brand-700">
                {site.phoneDisplay}
              </p>
            </div>
          </a>

          <a
            href={whatsappLink(t("messagePreset"))}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-4 rounded-xl border border-line bg-paper p-5 transition-colors hover:border-[#25D366]"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#25D366] text-white">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
                {t("whatsappLabel")}
              </p>
              <p className="mt-0.5 text-lg font-semibold group-hover:text-[#25D366]">
                {t("messagePresetTitle")}
              </p>
              <p className="mt-1 text-sm text-ink-soft">
                "{t("messagePreset")}"
              </p>
            </div>
          </a>

          <div className="flex items-start gap-4 rounded-xl border border-line bg-paper p-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-ink text-paper">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
                {t("addressLabel")}
              </p>
              <p className="mt-0.5 text-base font-medium">
                {site.address.street}
              </p>
              <p className="text-sm text-ink-soft">
                {site.address.district} / {site.address.city}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-xl border border-line bg-paper p-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-ink text-paper">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
                {t("hoursLabel")}
              </p>
              <dl className="mt-1 grid grid-cols-[auto_auto] gap-x-4 gap-y-1 text-sm">
                <dt className="text-ink-soft">{t("weekday")}</dt>
                <dd>{site.hours.weekday}</dd>
                <dt className="text-ink-soft">{t("saturday")}</dt>
                <dd>{site.hours.saturday}</dd>
                <dt className="text-ink-soft">{t("sunday")}</dt>
                <dd>{site.hours.sunday}</dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-line bg-paper">
          <iframe
            title="Map"
            src={site.mapsEmbedUrl}
            className="h-[420px] w-full md:h-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
