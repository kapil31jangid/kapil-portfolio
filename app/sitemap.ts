import { MetadataRoute } from "next";
import { siteConfig } from "@/data/portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/projects", "/journey", "/services", "/contact", "/certifications", "/achievements", "/blogs", "/open-source", "/social", "/assistant", "/extras"];
  return routes.map((route) => ({
    url: `${siteConfig.canonicalUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
