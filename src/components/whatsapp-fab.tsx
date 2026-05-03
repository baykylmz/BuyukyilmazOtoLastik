import { useTranslations } from "next-intl";
import { whatsappLink } from "@/lib/site";

// Simple WhatsApp SVG (brand color drawn inline so we don't pull in a lib)
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M16.003 3C9.374 3 4 8.373 4 15c0 2.378.687 4.59 1.872 6.45L4 29l7.752-1.836A11.94 11.94 0 0 0 16.003 27C22.632 27 28 21.627 28 15S22.632 3 16.003 3Zm0 21.6c-1.83 0-3.62-.494-5.18-1.43l-.371-.222-4.6 1.09 1.118-4.477-.243-.385A9.575 9.575 0 0 1 6.4 15c0-5.295 4.31-9.6 9.603-9.6 2.564 0 4.973 1.001 6.787 2.815a9.55 9.55 0 0 1 2.81 6.785c0 5.296-4.31 9.6-9.597 9.6Zm5.27-7.197c-.288-.144-1.706-.84-1.97-.937-.264-.096-.456-.144-.648.144-.192.288-.745.937-.913 1.13-.168.192-.336.216-.624.072-.288-.144-1.218-.45-2.32-1.434-.857-.764-1.435-1.708-1.603-1.996-.168-.288-.018-.444.126-.588.13-.13.288-.336.432-.504.144-.168.192-.288.288-.48.096-.192.048-.36-.024-.504-.072-.144-.648-1.566-.888-2.146-.234-.564-.472-.486-.648-.495a11.34 11.34 0 0 0-.552-.012c-.192 0-.504.072-.768.36-.264.288-1.008.985-1.008 2.4s1.032 2.785 1.176 2.977c.144.192 2.034 3.106 4.928 4.36.69.297 1.226.475 1.645.608.69.22 1.319.189 1.815.115.554-.083 1.706-.697 1.946-1.37.24-.673.24-1.25.168-1.37-.072-.12-.264-.192-.552-.336Z"
      />
    </svg>
  );
}

export function WhatsappFab() {
  const t = useTranslations("contact");
  const message = t("messagePreset");

  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
      aria-label="WhatsApp"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
