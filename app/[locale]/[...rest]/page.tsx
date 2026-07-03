import { notFound } from "next/navigation";

/**
 * Catch-all for unmatched paths under a locale (e.g. /en/typo). It renders
 * inside the locale layout and triggers the branded `[locale]/not-found.tsx`
 * boundary with a proper 404 status — instead of Next's bare default 404.
 */
export default function CatchAll() {
  notFound();
}
