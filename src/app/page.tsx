import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Differentials } from "@/components/sections/Differentials";
import { EnrollCTA } from "@/components/sections/EnrollCTA";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Modalities } from "@/components/sections/Modalities";
import { Structure } from "@/components/sections/Structure";
import { siteJsonLd } from "@/lib/schema";

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: siteJsonLd.replace(/</g, "\\u003c") }}
      />
      <Hero />
      <Marquee />
      <About />
      <Structure />
      <Modalities />
      <Differentials />
      <EnrollCTA />
      <Contact />
    </>
  );
}
