import { getTranslations, setRequestLocale } from "next-intl/server";
import { site } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "brands" });
  return { title: t("title") };
}

export default async function BrandsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("brands");

  return (
    <section className="container-page py-16 md:py-24">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-4 text-lg text-ink-soft">{t("subtitle")}</p>
      </header>

      <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {site.brands.map((brand) => (
          <li
            key={brand}
            className="flex h-24 items-center justify-center rounded-xl border border-line bg-paper text-lg font-semibold tracking-wide text-ink transition-colors hover:border-brand-700 hover:text-brand-700"
          >
            {brand}
          </li>
        ))}
      </ul>

      <p className="mt-10 max-w-2xl text-sm text-ink-soft">{t("note")}</p>
    </section>
  );
}
