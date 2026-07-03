"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useIsomorphicLayoutEffect } from "@/lib/use-isomorphic-layout-effect";

/**
 * Global scroll behavior: Lenis smooth scrolling, top progress bar,
 * scroll-reveal animations, and smooth anchor navigation.
 *
 * Reveal targets stay visible without JavaScript (CSS never hides them);
 * initial hidden states are applied here, right before the triggers mount.
 */
export default function ScrollFx() {
  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let lenis: Lenis | null = null;
    let rafTick: ((time: number) => void) | null = null;

    if (!prefersReduced) {
      lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
      lenis.on("scroll", ScrollTrigger.update);
      rafTick = (time: number) => lenis!.raf(time * 1000);
      gsap.ticker.add(rafTick);
      gsap.ticker.lagSmoothing(0);
    }

    /* Scroll progress bar */
    const bar = document.createElement("div");
    bar.style.cssText =
      "position:fixed;top:0;left:0;height:3px;background:linear-gradient(to right,var(--vibrant-green),var(--deep-green));z-index:9999;pointer-events:none;width:0%";
    document.body.prepend(bar);
    const progressTrigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        bar.style.width = self.progress * 100 + "%";
      },
    });

    /* Scroll reveals */
    const reveals: ScrollTrigger[] = [];
    const offsets: Record<string, { x: number; y: number }> = {
      "gsap-fade-up": { x: 0, y: 48 },
      "gsap-fade-left": { x: -48, y: 0 },
      "gsap-fade-right": { x: 48, y: 0 },
    };
    if (!prefersReduced) {
      Object.entries(offsets).forEach(([cls, offset]) => {
        document.querySelectorAll<HTMLElement>("." + cls).forEach((el) => {
          const delay = parseFloat(el.getAttribute("data-delay") || "0");
          gsap.set(el, { opacity: 0, x: offset.x, y: offset.y });
          reveals.push(
            ScrollTrigger.create({
              trigger: el,
              start: "top 88%",
              once: true,
              onEnter: () => {
                gsap.to(el, { opacity: 1, x: 0, y: 0, duration: 0.75, delay, ease: "power3.out" });
              },
            })
          );
        });
      });
    }

    /* Smooth anchor scrolling (delegated so it covers every in-page link) */
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;
      const target = document.querySelector<HTMLElement>(anchor.getAttribute("href") || "");
      if (!target) return;
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(target, { offset: -80, duration: 1.2 });
      } else {
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - 90,
          behavior: prefersReduced ? "auto" : "smooth",
        });
      }
    };
    document.addEventListener("click", onClick);

    /* Hover glow on cards (CSS reads --mouse-x/--mouse-y) */
    const onGlow = (e: MouseEvent) => {
      const card = (e.target as HTMLElement).closest?.<HTMLElement>(
        ".service-card, .trust-card, .industry-card"
      );
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mouse-x", `${((e.clientX - rect.left) / rect.width) * 100}%`);
      card.style.setProperty("--mouse-y", `${((e.clientY - rect.top) / rect.height) * 100}%`);
    };
    document.addEventListener("mousemove", onGlow, { passive: true });

    const refresh = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(refresh);
      document.removeEventListener("click", onClick);
      document.removeEventListener("mousemove", onGlow);
      progressTrigger.kill();
      reveals.forEach((t) => t.kill());
      bar.remove();
      if (rafTick) gsap.ticker.remove(rafTick);
      lenis?.destroy();
    };
  }, []);

  return null;
}
