import { siteConfig } from "@/config/site";

/** Link do WhatsApp oficial com mensagem opcional pré-preenchida. */
export function whatsappUrl(message: string = siteConfig.whatsapp.message): string {
  return `https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

export const fullAddress = `${siteConfig.address.street} - ${siteConfig.address.city}/${siteConfig.address.region}`;

export const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `Purple Fit ${fullAddress}`,
)}`;

export const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  fullAddress,
)}&output=embed`;
