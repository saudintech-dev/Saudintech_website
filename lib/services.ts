import {
  IconGlobe,
  IconBag,
  IconCode,
  IconPackage,
  IconUsers,
  IconActivity,
  IconClock,
} from "@/components/icons";

/**
 * Service slugs are the same across locales so URLs stay clean and shareable
 * (e.g. /en/services/inventory-pos and /ar/services/inventory-pos).
 * Order matches `services.items` in the message dictionaries.
 */
export const serviceSlugs = [
  "business-websites",
  "ecommerce-stores",
  "web-applications",
  "inventory-pos",
  "crm-erp",
  "mobile-apps",
  "business-automation",
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];

export function isServiceSlug(value: string): value is ServiceSlug {
  return (serviceSlugs as readonly string[]).includes(value);
}

export const serviceIcons: Record<ServiceSlug, typeof IconGlobe> = {
  "business-websites": IconGlobe,
  "ecommerce-stores": IconBag,
  "web-applications": IconCode,
  "inventory-pos": IconPackage,
  "crm-erp": IconUsers,
  "mobile-apps": IconActivity,
  "business-automation": IconClock,
};
