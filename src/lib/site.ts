export const site = {
  name: "Bosna Oto Lastik",
  legalName: "Bosna Oto Lastik",
  url: "https://bosnaotolastik.com",
  foundingYear: 2015,
  founderYear: 1993, // Mahmut Büyükyılmaz'ın ustalık başlangıcı

  phone: "+905357855587",
  phoneDisplay: "0535 785 55 87",
  phone2: "+905378475138",
  phone2Display: "0537 847 51 38",
  whatsappNumber: "905357855587",
  email: "info@bosnaotolastik.com",

  address: {
    neighborhood: "Bosna Hersek Mahallesi",
    street: "Osmanlı Cd. No:14/20",
    district: "Selçuklu",
    city: "Konya",
    postalCode: "42250",
    country: "TR",
    full: "Bosna Hersek Mh., Osmanlı Cd. No:14/20, 42250 Selçuklu/Konya",
  },

  // Google Maps > Paylaş > Haritayı yerleştir > src değeri
  mapsEmbedUrl:
    "https://www.google.com/maps?q=38.009564,32.526168&output=embed",

  // 7 gün açık, gece yarısına kadar
  hours: {
    weekday:  "08:30 – 00:00",
    saturday: "08:30 – 00:00",
    sunday:   "08:30 – 00:00",
  },

  payment: {
    cashOnly: false,
    creditCard: true,
    debitCard: true,
    cards: ["Mastercard", "VISA"],
  },

  amenities: {
    toilet:   true,
    mechanic: true,
    delivery: true,
  },

  social: {
    instagram: "",
    facebook:  "",
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

export function telLink(secondary = false) {
  return `tel:${secondary ? site.phone2 : site.phone}`;
}
