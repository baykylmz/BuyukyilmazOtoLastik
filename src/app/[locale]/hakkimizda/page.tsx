import { getTranslations, setRequestLocale } from "next-intl/server";
import { RevealSection, AccentLine } from "@/components/motion";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("seoTitle"), description: t("seoDescription") };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  const homeLabel = locale === "tr" ? "Anasayfa" : "Home";
  const pageLabel = t("title");
  const pageHref  = locale === "tr" ? "/hakkimizda" : "/en/about";

  return (
    <>
    <BreadcrumbSchema items={[
      { name: homeLabel, href: locale === "tr" ? "/" : "/en" },
      { name: pageLabel, href: pageHref },
    ]} />
    <section className="container-page py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <RevealSection>
          <span className="label-mech text-steel">— {t("title")}</span>
          <h1 className="mt-2 text-5xl font-bold uppercase md:text-6xl">{t("title")}</h1>
          <AccentLine />
        </RevealSection>

        <RevealSection delay={0.1}>
          <p className="mt-8 text-xl leading-relaxed font-medium">{t("lead")}</p>
        </RevealSection>

        <div className="mt-8 space-y-5">
          {(["p1", "p2", "p3"] as const).map((key, i) => (
            <RevealSection key={key} delay={0.1 + i * 0.08}>
              <p className="text-base leading-relaxed text-ink-muted">{t(key)}</p>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
    </>
  );
}
