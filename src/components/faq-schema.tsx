import { getTranslations } from "next-intl/server";

const FAQ_PAIRS = [
  ["q1", "a1"],
  ["q2", "a2"],
  ["q3", "a3"],
  ["q4", "a4"],
  ["q5", "a5"],
  ["q6", "a6"],
] as const;

export async function FaqSchema({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "home" });

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_PAIRS.map(([qKey, aKey]) => ({
      "@type": "Question",
      name: t(`faq.${qKey}`),
      acceptedAnswer: {
        "@type": "Answer",
        text: t(`faq.${aKey}`),
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
