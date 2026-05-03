import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  Wrench,
  Disc3,
  Gauge,
  Crosshair,
  Bandage,
  Snowflake,
  CircleDot,
  Truck,
} from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return { title: t("title") };
}

const SERVICE_KEYS = [
  { key: "sale", icon: CircleDot },
  { key: "mount", icon: Wrench },
  { key: "balance", icon: Gauge },
  { key: "alignment", icon: Crosshair },
  { key: "repair", icon: Bandage },
  { key: "storage", icon: Snowflake },
  { key: "rim", icon: Disc3 },
  { key: "fleet", icon: Truck },
] as const;

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services");

  return (
    <section className="container-page py-16 md:py-24">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-4 text-lg text-ink-soft">{t("subtitle")}</p>
      </header>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICE_KEYS.map(({ key, icon: Icon }) => (
          <article
            key={key}
            className="rounded-xl border border-line bg-paper p-6 transition-colors hover:border-brand-300"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-700 text-paper">
              <Icon className="h-6 w-6" />
            </div>
            <h2 className="mt-5 text-xl font-semibold">
              {t(`items.${key}Title` as const)}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              {t(`items.${key}Text` as const)}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
