import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/acessibilidade", priority: 0.3 },
    { path: "/privacidade", priority: 0.3 },
  ];
  return routes.map(({ path, priority }) => ({
    url: `${siteConfig.url}${path}`,
    changeFrequency: path === "" ? "monthly" : "yearly",
    priority,
  }));
}
