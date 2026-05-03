// Central business config — fill in real values.
// Phone is in international E.164 for tel: links; whatsappNumber is digits-only.

export const site = {
  name: "Büyükyılmaz Oto Lastik",
  legalName: "Büyükyılmaz Oto Lastik",
  url: "https://buyukyilmazotolastik.com", // TODO: real domain when ready
  // TODO: replace with real phone (E.164 format, e.g. "+905551234567")
  phone: "+905555555555",
  phoneDisplay: "+90 555 555 55 55",
  // TODO: replace with real WhatsApp number (digits only, no +, e.g. "905551234567")
  whatsappNumber: "905555555555",
  email: "info@buyukyilmazotolastik.com", // TODO
  address: {
    street: "TODO: Sokak, No",
    district: "Selçuklu",
    city: "Konya",
    postalCode: "42000", // TODO
    country: "TR",
  },
  // Maps embed: paste the URL from Google Maps "Share > Embed a map > HTML > src"
  mapsEmbedUrl: "https://www.google.com/maps?q=Sel%C3%A7uklu+Konya&output=embed",
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
