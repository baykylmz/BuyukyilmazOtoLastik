import { getTranslations, setRequestLocale } from "next-intl/server";
import { RevealSection, StaggerGrid, StaggerItem, AccentLine, MotionButton, motionPress } from "@/components/motion";
import { whatsappLink } from "@/lib/site";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "prices" });
  return { title: t("seoTitle"), description: t("seoDescription") };
}

// Prices only — labels come from messages (TR/EN)
const PRICES = [
  { serviceKey: "flatRepairWith",    noteKey: "flatRepairWithNote",    car: 300, commercial: 350 },
  { serviceKey: "flatRepairWithout", noteKey: "flatRepairWithoutNote", car: 250, commercial: 300 },
  { serviceKey: "rimEdge",           noteKey: null,                    car: 300, commercial: 350 },
  { serviceKey: "valveSteelService", noteKey: "valveSteelNote",        car: 350, commercial: 350 },
  { serviceKey: "valvePlasticService", noteKey: "valvePlasticNote",    car: 250, commercial: 250 },
  { serviceKey: "mountBalance",      noteKey: null,                    car: 850, commercial: 950 },
  { serviceKey: "rotation",          noteKey: "rotationNote",          car: 350, commercial: 450 },
  { serviceKey: "balanceOnly",       noteKey: "balanceOnlyNote",       car: 450, commercial: 550 },
  { serviceKey: "sensorValve",       noteKey: "sensorValveNote",       car: 400, commercial: 500 },
  { serviceKey: "tireHotel",         noteKey: null,                    car: 450, commercial: 550 },
  { serviceKey: "rimSwapNo",         noteKey: "rimSwapNoNote",         car: 450, commercial: 550 },
  { serviceKey: "rimSwapYes",        noteKey: "rimSwapYesNote",        car: 550, commercial: 650 },
] as const;

function fmt(n: number) {
  return n.toLocaleString("tr-TR") + " ₺";
}

export default async function PricesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t  = await getTranslations("prices");
  const tc = await getTranslations("contact");

  const homeLabel = locale === "tr" ? "Anasayfa" : "Home";
  const pageLabel = t("title");
  const pageHref  = locale === "tr" ? "/fiyatlar" : "/en/prices";

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

      {/* Table — desktop */}
      <RevealSection delay={0.1} className="mt-10 hidden md:block">
        <div className="overflow-hidden border-2 border-ink">
          <div className="grid grid-cols-[1fr_160px_160px] border-b-2 border-ink bg-ink text-paper">
            <div className="label-mech px-6 py-4">{t("colService")}</div>
            <div className="label-mech border-l-2 border-paper/20 px-6 py-4 text-center">{t("colCar")}</div>
            <div className="label-mech border-l-2 border-paper/20 px-6 py-4 text-center">{t("colCommercial")}</div>
          </div>
          {PRICES.map((row, i) => (
            <div
              key={i}
              className={`grid grid-cols-[1fr_160px_160px] border-b border-line last:border-b-0 transition-colors hover:bg-paper-dark ${
                i % 2 === 0 ? "bg-paper" : "bg-paper-dark"
              }`}
            >
              <div className="px-6 py-4">
                <span className="font-display text-lg font-bold">{t(`items.${row.serviceKey}`)}</span>
                {row.noteKey && (
                  <span className="ml-2 font-mono text-xs text-steel">({t(`items.${row.noteKey}`)})</span>
                )}
              </div>
              <div className="border-l border-line px-6 py-4 text-center font-mono font-bold tabular-nums">
                {fmt(row.car)}
              </div>
              <div className="border-l border-line px-6 py-4 text-center font-mono font-bold tabular-nums text-brand-700">
                {fmt(row.commercial)}
              </div>
            </div>
          ))}
        </div>
      </RevealSection>

      {/* Cards — mobile */}
      <StaggerGrid className="mt-10 space-y-3 md:hidden" delayStep={0.04}>
        {PRICES.map((row, i) => (
          <StaggerItem key={i}>
            <div className="border-2 border-line bg-paper-dark p-4">
              <p className="font-display text-lg font-bold uppercase">{t(`items.${row.serviceKey}`)}</p>
              {row.noteKey && (
                <p className="font-mono text-xs text-steel">({t(`items.${row.noteKey}`)})</p>
              )}
              <div className="mt-3 grid grid-cols-2 gap-2">
                <div className="border border-line bg-paper p-3 text-center">
                  <p className="label-mech text-steel">{t("colCar")}</p>
                  <p className="mt-1 font-mono text-lg font-bold">{fmt(row.car)}</p>
                </div>
                <div className="border border-brand-700/30 bg-brand-700/5 p-3 text-center">
                  <p className="label-mech text-steel">{t("colCommercial")}</p>
                  <p className="mt-1 font-mono text-lg font-bold text-brand-700">{fmt(row.commercial)}</p>
                </div>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerGrid>

      {/* Notes */}
      <RevealSection delay={0.2}>
        <div className="mt-8 border-2 border-line bg-paper-dark p-5">
          <p className="label-mech mb-3 text-steel">{t("notesLabel")}</p>
          <ul className="space-y-1.5 text-sm text-ink-muted">
            <li>— {t("note1")}</li>
            <li>— {t("note2")}</li>
            <li>— {t("note3")}</li>
          </ul>
        </div>
      </RevealSection>

      {/* CTA */}
      <RevealSection delay={0.25}>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <p className="text-sm text-ink-muted">{t("ctaText")}</p>
          <MotionButton
            href={whatsappLink(tc("messagePreset"))}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-danger"
            {...motionPress}
          >
            {t("ctaButton")}
          </MotionButton>
        </div>
      </RevealSection>
    </section>
    </>
  );
}
