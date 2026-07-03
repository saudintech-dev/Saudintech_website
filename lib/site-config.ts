/**
 * Central site configuration — edit contact details, domain, and socials here.
 * Every component reads from this file, so a change here updates the whole site.
 */
export const siteConfig = {
  name: "SaudinTech",

  // TODO: replace with your custom domain once purchased (e.g. "https://saudintech.sa")
  url: "https://saudintech.vercel.app",

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
