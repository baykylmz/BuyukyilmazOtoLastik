import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  Wrench, Disc3, Gauge, Bandage, Snowflake, CircleDot, Truck,
} from "lucide-react";
import { RevealSection, StaggerGrid, StaggerItem, AccentLine } from "@/components/motion";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return { title: t("title") };
}

const SERVICE_KEYS = [
  { key: "sale",      icon: CircleDot },
  { key: "mount",     icon: Wrench },
  { key: "balance", icon: Gauge },
  { key: "repair",  icon: Bandage },
  { key: "storage",   icon: Snowflake },
  { key: "rim",       icon: Disc3 },
  { key: "fleet",     icon: Truck },
] as const;

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services");

  return (
    <section className="container-page py-16 md:py-24">
      <RevealSection className="max-w-2xl">
        <span className="label-mech text-steel">— {t("title")}</span>
        <h1 className="mt-2 text-5xl font-bold uppercase md:text-6xl">{t("title")}</h1>
        <AccentLine />
        <p className="mt-5 text-lg text-ink-muted">{t("subtitle")}</p>
      </RevealSection>

      <StaggerGrid className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" delayStep={0.05}>
        {SERVICE_KEYS.map(({ key, icon: Icon }) => (
          <StaggerItem key={key}>
            <article className="group border-2 border-line bg-paper-dark p-6 hover:border-brand-700 transition-colors duration-150">
              <div className="flex h-12 w-12 items-center justify-center border-2 border-ink bg-ink text-paper transition-colors group-hover:bg-brand-700 group-hover:border-brand-700">
                <Icon className="h-6 w-6" />
              </div>
              <h2 className="mt-5 text-2xl font-bold uppercase">
                {t(`items.${key}Title` as const)}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {t(`items.${key}Text` as const)}
              </p>
            </article>
          </StaggerItem>
        ))}
      </StaggerGrid>
    </section>
  );
}
