import { getTranslations, setRequestLocale } from "next-intl/server";
import { Phone, MessageCircle, MapPin, Clock, CreditCard } from "lucide-react";
import { site, telLink, whatsappLink } from "@/lib/site";
import {
  RevealSection,
  StaggerGrid,
  StaggerItem,
  AccentLine,
  MotionButton,
  motionPress,
} from "@/components/motion";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("seoTitle"), description: t("seoDescription") };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  const homeLabel = locale === "tr" ? "Anasayfa" : "Home";
  const pageLabel = t("title");
  const pageHref  = locale === "tr" ? "/iletisim" : "/en/contact";

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

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {/* Left: contact cards */}
        <StaggerGrid className="space-y-3" delayStep={0.07}>

          {/* Primary phone */}
          <StaggerItem>
            <MotionButton
              href={telLink()}
              className="group flex w-full items-start gap-4 border-2 border-line bg-paper-dark p-5 hover:border-ink transition-colors duration-150 text-left"
              {...motionPress}
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center border-2 border-ink bg-ink text-paper group-hover:bg-brand-700 group-hover:border-brand-700 transition-colors">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <p className="label-mech text-steel">{t("phoneLabel")}</p>
                <p className="mt-0.5 font-display text-2xl font-bold">{site.phoneDisplay}</p>
              </div>
            </MotionButton>
          </StaggerItem>

          {/* Second phone */}
          <StaggerItem>
            <MotionButton
              href={telLink(true)}
              className="group flex w-full items-start gap-4 border-2 border-line bg-paper-dark p-5 hover:border-ink transition-colors duration-150 text-left"
              {...motionPress}
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center border-2 border-line bg-paper text-ink group-hover:border-ink transition-colors">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <p className="label-mech text-steel">{t("phone2Label")}</p>
                <p className="mt-0.5 font-display text-2xl font-bold">{site.phone2Display}</p>
              </div>
            </MotionButton>
          </StaggerItem>

          {/* WhatsApp */}
          <StaggerItem>
            <MotionButton
              href={whatsappLink(t("messagePreset"))}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-full items-start gap-4 border-2 border-line bg-paper-dark p-5 hover:border-[#25D366] transition-colors duration-150 text-left"
              {...motionPress}
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center border-2 border-[#25D366] bg-[#25D366] text-white">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div>
                <p className="label-mech text-steel">{t("whatsappLabel")}</p>
                <p className="mt-0.5 font-display text-xl font-bold">{t("messagePresetTitle")}</p>
                <p className="mt-1 text-sm text-ink-muted">"{t("messagePreset")}"</p>
              </div>
            </MotionButton>
          </StaggerItem>

          {/* Address */}
          <StaggerItem>
            <div className="flex items-start gap-4 border-2 border-line bg-paper-dark p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center border-2 border-line bg-paper text-ink">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="label-mech text-steel">{t("addressLabel")}</p>
                <p className="mt-0.5 font-display text-xl font-bold">{site.address.street}</p>
                <p className="text-sm text-ink-muted">
                  {site.address.neighborhood}, {site.address.postalCode} {site.address.district}/{site.address.city}
                </p>
              </div>
            </div>
          </StaggerItem>

          {/* Hours */}
          <StaggerItem>
            <div className="flex items-start gap-4 border-2 border-line bg-paper-dark p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center border-2 border-line bg-paper text-ink">
                <Clock className="h-5 w-5" />
              </div>
              <div className="w-full">
                <p className="label-mech text-steel">{t("hoursLabel")}</p>
                <dl className="mt-2 flex items-baseline justify-between font-mono text-sm">
                  <dt className="text-ink-muted">{t("everyDay")}</dt>
                  <dd className="font-bold text-ink">{site.hours.weekday}</dd>
                </dl>
              </div>
            </div>
          </StaggerItem>

          {/* Payment */}
          <StaggerItem>
            <div className="flex items-start gap-4 border-2 border-line bg-paper-dark p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center border-2 border-line bg-paper text-ink">
                <CreditCard className="h-5 w-5" />
              </div>
              <div>
                <p className="label-mech text-steel">{t("paymentLabel")}</p>
                <p className="mt-1 text-sm text-ink-muted">{t("paymentText")}</p>
              </div>
            </div>
          </StaggerItem>
        </StaggerGrid>

        {/* Right: Map */}
        <RevealSection delay={0.2}>
          <div className="h-full min-h-[480px] overflow-hidden border-2 border-line">
            <iframe
              title="Bosna Oto Lastik Konum"
              src={site.mapsEmbedUrl}
              className="h-full w-full"
              style={{ minHeight: "480px" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </RevealSection>
      </div>
    </section>
    </>
  );
}
