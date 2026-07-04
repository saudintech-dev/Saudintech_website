import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} — Business Software & Websites`,
    short_name: siteConfig.name,
    description: "Custom websites and business software for Saudi businesses.",
    start_url: "/en",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0a5c3a",
    lang: "en",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any", purpose: "any" },
      { src: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { src: "/icon-512.png", type: "image/png", sizes: "512x512", purpose: "any" },
    ],
  };
}
