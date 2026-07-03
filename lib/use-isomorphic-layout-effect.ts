import { useEffect, useLayoutEffect } from "react";

/**
 * useLayoutEffect on the client (so GSAP can set initial states before paint,
 * avoiding a flash of unstyled animation targets), useEffect during SSR.
 */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
