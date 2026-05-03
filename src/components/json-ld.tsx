import { site } from "@/lib/site";

export function LocalBusinessJsonLd() {
  const allDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const data = {
    "@context": "https://schema.org",
    "@type": ["AutoRepair", "TireShop"],
    name: site.name,
    image: `${site.url}/brand/logo.svg`,
    "@id": site.url,
    url: site.url,
    telephone: [site.phone, site.phone2],
    foundingDate: String(site.foundingYear),
    description:
      "Bosna Oto Lastik, 2015'ten bu yana Konya Selçuklu'da lastik satışı, değişim, balans, rot ve onarım hizmeti vermektedir.",
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.address.neighborhood}, ${site.address.street}`,
      addressLocality: site.address.district,
      addressRegion: site.address.city,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      // TODO: replace with exact coordinates from Google Maps pin
      latitude: "37.9234",
      longitude: "32.4899",
    },
    areaServed: { "@type": "City", name: "Konya" },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: allDays,
        opens: "08:30",
        closes: "00:00",
      },
    ],
    paymentAccepted: "Cash, Credit Card, Debit Card",
    currenciesAccepted: "TRY",
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Restroom", value: true },
      { "@type": "LocationFeatureSpecification", name: "Mechanic on site", value: true },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Lastik Hizmetleri",
      itemListElement: [
        "Lastik Satışı (Sıfır ve İkinci El)",
        "Lastik Değişimi ve Montajı",
        "Balans Ayarı",
        "Rot Ayarı",
        "Lastik Tamiri",
        "Lastik Oteli",
        "Jant Satışı",
        "Filo Hizmeti",
      ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
