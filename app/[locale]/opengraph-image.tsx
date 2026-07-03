import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const alt = "SaudinTech — Business Software & Websites for Saudi Businesses";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Brand text stays in English for both locales: the OG renderer's built-in
 * font has no Arabic glyphs, and the Latin brand mark is the stable identity.
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #0a3d26 0%, #0a5c3a 55%, #0f7a4a 100%)",
          color: "#ffffff",
          fontSize: 72,
          fontWeight: 800,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <svg width="96" height="96" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="#22c55e" />
            <path
              d="M8 22L14 10L20 18L24 12"
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="24" cy="12" r="2" fill="#ffffff" />
          </svg>
          <div style={{ display: "flex" }}>{siteConfig.name}</div>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 32,
            fontSize: 34,
            fontWeight: 400,
            color: "#a7f3c9",
          }}
        >
          Custom Websites &amp; Business Software — Saudi Arabia
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 18,
            fontSize: 26,
            fontWeight: 400,
            color: "#6ee7a0",
          }}
        >
          Riyadh · Arabic &amp; English
        </div>
      </div>
    ),
    size
  );
}
