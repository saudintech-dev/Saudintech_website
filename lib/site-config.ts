/**
 * Central site configuration — edit contact details, domain, and socials here.
 * Every component reads from this file, so a change here updates the whole site.
 */
export const siteConfig = {
  name: "SaudinTech",

  // Production canonical origin. saudintech.com redirects to www, so www is canonical.
  // Drives metadataBase, canonical tags, hreflang, sitemap, robots, OG image, JSON-LD.
  url: "https://www.saudintech.com",

  email: "saudintech@gmail.com",
  phoneDisplay: "+966 55 494 8070",
  phoneE164: "+966554948070",
  whatsapp: "https://wa.me/966554948070",

  location: { city: "Riyadh", country: "SA" },

  // Add full profile URLs when the accounts exist; empty entries are hidden in the footer.
  socials: {
    linkedin: "",
    instagram: "",
    x: "",
    tiktok: "",
  },
} as const;
