import { getTranslations, setRequestLocale } from "next-intl/server";
import { BadgeCheck } from "lucide-react";
import { site } from "@/lib/site";
import { RevealSection, StaggerGrid, StaggerItem, AccentLine } from "@/components/motion";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "brands" });
  return { title: t("seoTitle"), description: t("seoDescription") };
}

export default async function BrandsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("brands");

  const homeLabel = locale === "tr" ? "Anasayfa" : "Home";
  const pageLabel = t("title");
  const pageHref  = locale === "tr" ? "/markalar" : "/en/brands";

  return (
    <>
    <BreadcrumbSchema items={[
      { name: homeLabel, href: locale === "tr" ? "/" : "/en" },
      { name: pageLabel, href: pageHref },
    ]} />
    <section className="container-page py-16 md:py-24">
      <RevealSection className="max-w-2xl">
        <span className="label-mech text-steel">— {t("title")}</span>
        <h1 className="mt-2 text-5xl font-bold uppercase md:text-6xl">{t("title")}</h1>
        <AccentLine />
        <p className="mt-5 text-lg text-ink-muted">{t("subtitle")}</p>
      </RevealSection>

      {/* Lastiğim official dealer badge */}
      <RevealSection delay={0.1}>
        <a
          href={site.dealerNetwork.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-3 border-2 border-brand-700 bg-brand-700/5 px-5 py-3 transition-colors hover:bg-brand-700/10"
        >
          <BadgeCheck className="h-6 w-6 shrink-0 text-brand-700" />
          <div>
            <p className="label-mech text-brand-700">{t("dealerBadgeLabel")}</p>
            <p className="font-display text-base font-bold uppercase">
              {site.dealerNetwork.name} — {site.dealerNetwork.operator}
            </p>
          </div>
        </a>
      </RevealSection>

      {/* Primary brands (Lassa, Bridgestone, Dayton) */}
      <RevealSection delay={0.15}>
        <h2 className="label-mech mt-12 text-steel">{t("primaryLabel")}</h2>
      </RevealSection>
      <StaggerGrid
        className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-3"
        delayStep={0.06}
      >
        {site.dealerNetwork.primaryBrands.map((brand) => (
          <StaggerItem key={brand}>
            <div className="group flex h-24 cursor-default items-center justify-center border-2 border-brand-700 bg-brand-700/5 font-display text-xl font-bold uppercase tracking-widest text-brand-700 transition-colors duration-150 hover:bg-brand-700 hover:text-paper">
              {brand}
            </div>
          </StaggerItem>
        ))}
      </StaggerGrid>

      {/* Other brands */}
      <RevealSection delay={0.1}>
        <h2 className="label-mech mt-10 text-steel">{t("othersLabel")}</h2>
      </RevealSection>
      <StaggerGrid
        className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4"
        delayStep={0.04}
      >
        {site.brands
          .filter((b) => !(site.dealerNetwork.primaryBrands as readonly string[]).includes(b))
          .map((brand) => (
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
    </>
  );
}
