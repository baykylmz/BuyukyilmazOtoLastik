import { getTranslations, setRequestLocale } from "next-intl/server";
import { site } from "@/lib/site";
import { RevealSection, StaggerGrid, StaggerItem, AccentLine } from "@/components/motion";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "brands" });
  return { title: t("title") };
}

export default async function BrandsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("brands");

  return (
    <section className="container-page py-16 md:py-24">
      <RevealSection className="max-w-2xl">
        <span className="label-mech text-steel">— {t("title")}</span>
        <h1 className="mt-2 text-5xl font-bold uppercase md:text-6xl">{t("title")}</h1>
        <AccentLine />
        <p className="mt-5 text-lg text-ink-muted">{t("subtitle")}</p>
      </RevealSection>

      <StaggerGrid
        className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4"
        delayStep={0.04}
      >
        {site.brands.map((brand) => (
          <StaggerItem key={brand}>
            <div className="group flex h-24 cursor-default items-center justify-center border-2 border-line bg-paper-dark font-display text-xl font-bold uppercase tracking-widest text-ink transition-colors duration-150 hover:border-brand-700 hover:text-brand-700">
              {brand}
            </div>
          </StaggerItem>
        ))}
      </StaggerGrid>

      <RevealSection delay={0.3}>
        <p className="mt-10 max-w-2xl text-sm text-ink-muted">{t("note")}</p>
      </RevealSection>
    </section>
  );
}
