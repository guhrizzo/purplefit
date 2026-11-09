import { hours, siteConfig } from "@/config/site";

/** Dados estruturados Schema.org (ExerciseGym) para SEO local. Gerados a partir da config central. */
const data = {
  "@context": "https://schema.org",
  "@type": "ExerciseGym",
  "@id": `${siteConfig.url}/#academia`,
  name: siteConfig.fullName,
  description: siteConfig.description,
  url: siteConfig.url,
  image: `${siteConfig.url}${siteConfig.heroPoster}`,
  telephone: `+${siteConfig.whatsapp.number}`,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address.street,
    addressLocality: siteConfig.address.city,
    addressRegion: siteConfig.address.region,
    addressCountry: siteConfig.address.country,
  },
  openingHoursSpecification: hours.map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: h.days,
    opens: h.opens,
    closes: h.closes,
  })),
  sameAs: [siteConfig.instagram.url],
  areaServed: { "@type": "City", name: siteConfig.city },
};

export const siteJsonLd = JSON.stringify(data);
