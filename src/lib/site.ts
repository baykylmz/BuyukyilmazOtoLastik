// Central business config — fill in real values.
// Phone is in international E.164 for tel: links; whatsappNumber is digits-only.

export const site = {
  name: "Bosna Oto Lastik",
  legalName: "Bosna Oto Lastik",
  url: "https://bosnaotolastik.com", // TODO: real domain when ready
  phone: "+905357855587",
  phoneDisplay: "0535 785 55 87",
  whatsappNumber: "905357855587",
  email: "info@bosnaotolastik.com", // TODO
  address: {
    street: "Bosna Hersek, Osmanlı Cd. No:14/20",
    district: "Selçuklu",
    city: "Konya",
    postalCode: "42250",
    country: "TR",
  },
  mapsEmbedUrl: "https://www.google.com/maps?q=Bosna+Hersek+Osmal%C4%B1+Cd+No+14+Sel%C3%A7uklu+Konya&output=embed",
  hours: {
    weekday: "08:30 - 19:00",
    saturday: "08:30 - 18:00",
    sunday: "Kapalı",
  },
  social: {
    instagram: "", // TODO: full URL or empty
    facebook: "",
  },
  brands: [
    "Michelin",
    "Bridgestone",
    "Continental",
    "Pirelli",
    "Goodyear",
    "Hankook",
    "Lassa",
    "Petlas",
  ],
} as const;

export function whatsappLink(message?: string) {
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${site.whatsappNumber}${text}`;
}

export function telLink() {
  return `tel:${site.phone}`;
}
