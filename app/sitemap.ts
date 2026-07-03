import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { locales } from "@/lib/dictionaries";
import { serviceSlugs } from "@/lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const homeEntries: MetadataRoute.Sitemap = locales.map((locale) => ({
    url: `${siteConfig.url}/${locale}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 1,
    alternates: {
      languages: { en: `${siteConfig.url}/en`, ar: `${siteConfig.url}/ar` },
    },
  }));

  const serviceEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    serviceSlugs.map((slug) => ({
      url: `${siteConfig.url}/${locale}/services/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: {
        languages: {
          en: `${siteConfig.url}/en/services/${slug}`,
          ar: `${siteConfig.url}/ar/services/${slug}`,
        },
      },
    }))
  );

  return [...homeEntries, ...serviceEntries];
}
