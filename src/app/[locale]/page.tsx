import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, ShieldCheck, Sparkles, Timer } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { telLink, whatsappLink } from "@/lib/site";

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
    {
      icon: ShieldCheck,
      title: t("highlights.expertTitle"),
      text: t("highlights.expertText"),
    },
    {
      icon: Sparkles,
      title: t("highlights.brandsTitle"),
      text: t("highlights.brandsText"),
    },
    {
      icon: Timer,
      title: t("highlights.fastTitle"),
      text: t("highlights.fastText"),
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink text-paper">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, white 0, transparent 35%), radial-gradient(circle at 80% 60%, white 0, transparent 30%)",
          }}
        />
        <div className="container-page relative grid items-center gap-10 py-20 md:grid-cols-2 md:py-28">
          <div>
            <span className="inline-flex items-center rounded-full border border-paper/20 px-3 py-1 text-xs font-medium uppercase tracking-wider text-paper/80">
              {t("heroEyebrow")}
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              {t("heroTitle")}
            </h1>
            <p className="mt-5 max-w-xl text-base text-paper/75 md:text-lg">
              {t("heroDescription")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={whatsappLink(tc("messagePreset"))}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-brand-700 px-5 py-3 text-sm font-semibold text-paper hover:bg-brand-600"
              >
                {t("heroPrimary")}
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/hizmetler"
                className="inline-flex items-center gap-2 rounded-md border border-paper/30 px-5 py-3 text-sm font-semibold text-paper hover:bg-paper/10"
              >
                {t("heroSecondary")}
              </Link>
            </div>
          </div>

          <div className="relative aspect-square w-full max-w-md justify-self-center md:justify-self-end">
            <div className="absolute inset-0 rounded-3xl bg-brand-700/15 blur-3xl" />
            <div className="relative flex h-full w-full items-center justify-center rounded-3xl bg-paper p-8">
              <Image
                src="/brand/logo.svg"
                alt=""
                fill
                className="object-contain p-6"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="container-page py-16 md:py-24">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          {t("highlightsTitle")}
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {highlights.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-xl border border-line bg-paper p-6 transition-shadow hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-ink-soft">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-700 text-paper">
        <div className="container-page grid items-center gap-6 py-14 md:grid-cols-[1.2fr_auto] md:py-20">
          <div>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              {t("ctaTitle")}
            </h2>
            <p className="mt-3 max-w-2xl text-paper/85">{t("ctaText")}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={whatsappLink(tc("messagePreset"))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-paper px-5 py-3 text-sm font-semibold text-brand-700 hover:bg-paper/90"
            >
              {t("ctaPrimary")}
            </a>
            <a
              href={telLink()}
              className="inline-flex items-center gap-2 rounded-md border border-paper/40 px-5 py-3 text-sm font-semibold text-paper hover:bg-paper/10"
            >
              {t("ctaSecondary")}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
