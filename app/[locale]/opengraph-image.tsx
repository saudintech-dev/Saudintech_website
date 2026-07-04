import { ImageResponse } from "next/og";

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
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
          <svg width="104" height="104" viewBox="0 0 46 46">
            <circle cx="23" cy="23" r="21" fill="#ffffff" />
            <path
              d="M17 15 L28 23 L17 31"
              stroke="#0a5c3a"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
          <div style={{ display: "flex", fontSize: 88, fontWeight: 800, letterSpacing: -3 }}>
            <span style={{ color: "#ffffff" }}>saudin</span>
            <span style={{ color: "#a7f3d0" }}>tech</span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 40,
            fontSize: 36,
            fontWeight: 500,
            color: "#a7f3c9",
          }}
        >
          Business Software &amp; Custom Websites — Saudi Arabia
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
