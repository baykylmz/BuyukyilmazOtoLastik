import { getTranslations, setRequestLocale } from "next-intl/server";
import { ShieldCheck, Sparkles, Timer } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { telLink, whatsappLink } from "@/lib/site";
import {
  StampHeadline,
  RevealSection,
  StaggerGrid,
  StaggerItem,
  AccentLine,
  MotionButton,
  motionPress,
} from "@/components/motion";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const tc = await getTranslations("contact");

  const highlights = [
    { icon: ShieldCheck, title: t("highlights.expertTitle"), text: t("highlights.expertText") },
    { icon: Sparkles,    title: t("highlights.brandsTitle"), text: t("highlights.brandsText") },
    { icon: Timer,       title: t("highlights.fastTitle"),   text: t("highlights.fastText") },
  ];

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-ink text-paper">
        {/* Subtle mechanical grid overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(var(--color-paper) 1px, transparent 1px), linear-gradient(90deg, var(--color-paper) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="container-page relative grid items-center gap-10 py-20 md:grid-cols-2 md:py-28">
          <div>
            {/* Eyebrow tag */}
            <StampHeadline>
              <span className="label-mech inline-flex items-center gap-2 border border-paper/20 px-3 py-1 text-paper/70">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-700" />
                {t("heroEyebrow")}
              </span>
            </StampHeadline>

            <StampHeadline>
              <h1 className="mt-5 text-5xl font-bold uppercase md:text-7xl">
                {t("heroTitle")}
              </h1>
            </StampHeadline>

            <RevealSection delay={0.15}>
              <p className="mt-5 max-w-xl text-base text-paper/70 md:text-lg">
                {t("heroDescription")}
              </p>
            </RevealSection>

            <RevealSection delay={0.25}>
              <div className="mt-8 flex flex-wrap gap-3">
                <MotionButton
                  href={whatsappLink(tc("messagePreset"))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-danger"
                  {...motionPress}
                >
                  {t("heroPrimary")}
                </MotionButton>
                <Link href="/hizmetler" className="btn btn-ghost-inv">
                  {t("heroSecondary")}
                </Link>
              </div>
            </RevealSection>
          </div>

          {/* Logo block */}
          <RevealSection delay={0.1}>
            <div className="relative aspect-square w-full max-w-sm justify-self-center md:justify-self-end">
              <div className="absolute inset-0 rounded-none bg-brand-700/10 blur-3xl" />
              <div className="relative flex h-full w-full items-center justify-center border-2 border-paper/10 bg-paper p-8">
                <Image src="/brand/logo.svg" alt="" fill className="object-contain p-4" priority />
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── Highlights ───────────────────────────────────────────────── */}
      <section className="container-page py-16 md:py-24">
        <RevealSection>
          <h2 className="text-4xl font-bold uppercase md:text-5xl">{t("highlightsTitle")}</h2>
          <AccentLine />
        </RevealSection>

        <StaggerGrid className="mt-10 grid gap-4 md:grid-cols-3">
          {highlights.map(({ icon: Icon, title, text }) => (
            <StaggerItem key={title}>
              <div className="group border-2 border-line bg-paper-dark p-6 transition-colors duration-150 hover:border-brand-700">
                <div className="flex h-11 w-11 items-center justify-center border-2 border-ink bg-ink text-paper group-hover:bg-brand-700 group-hover:border-brand-700 transition-colors">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-xl font-bold uppercase">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{text}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </section>

      {/* ── CTA band ─────────────────────────────────────────────────── */}
      <RevealSection>
        <section className="bg-ink text-paper">
          <div className="container-page grid items-center gap-6 py-14 md:grid-cols-[1fr_auto] md:py-20">
            <div>
              {/* Accent mark */}
              <span className="label-mech text-brand-700">{t("heroEyebrow")}</span>
              <h2 className="mt-2 text-3xl font-bold uppercase md:text-4xl">{t("ctaTitle")}</h2>
              <p className="mt-3 max-w-2xl text-paper/70">{t("ctaText")}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <MotionButton
                href={whatsappLink(tc("messagePreset"))}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-danger"
                {...motionPress}
              >
                {t("ctaPrimary")}
              </MotionButton>
              <MotionButton href={telLink()} className="btn btn-ghost-inv" {...motionPress}>
                {t("ctaSecondary")}
              </MotionButton>
            </div>
          </div>
        </section>
      </RevealSection>
    </>
  );
}
