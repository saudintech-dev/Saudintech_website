"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsomorphicLayoutEffect } from "@/lib/use-isomorphic-layout-effect";
import type { Dictionary } from "@/lib/dictionaries";
import { IconSearch, IconPen, IconCode, IconCheckCircle, IconCoffee } from "@/components/icons";

const icons = [IconSearch, IconPen, IconCode, IconCheckCircle, IconCoffee];

export default function ProcessPinned({ process }: { process: Dictionary["process"] }) {
  const wrapper = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const trackEl = track.current;
    if (!trackEl) return;

    const steps = Array.from(trackEl.querySelectorAll<HTMLElement>(".process-step-h"));
    // In RTL the track starts at the right edge, so it slides the opposite way
    const dirSign = document.documentElement.dir === "rtl" ? 1 : -1;

    const trigger = ScrollTrigger.create({
      trigger: wrapper.current,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        const p = self.progress;
        const trackWidth = trackEl.scrollWidth - window.innerWidth + 120;
        gsap.set(trackEl, { x: dirSign * p * trackWidth });

        if (fill.current) fill.current.style.width = p * 100 + "%";

        const activeIdx = Math.floor(p * steps.length);
        steps.forEach((step, i) => {
          const isActive = i <= activeIdx;
          step.style.borderColor = isActive ? "rgba(34,197,94,0.4)" : "";
          step.style.background = isActive ? "var(--vibrant-green-light)" : "";
          const num = step.querySelector<HTMLElement>(".psh-num");
          if (num) num.style.color = isActive ? "var(--vibrant-green)" : "";
        });
      },
    });

    return () => {
      trigger.kill();
      gsap.set(trackEl, { clearProps: "x" });
    };
  }, []);

  return (
    <div className="process-pin-wrapper" id="process-wrapper" ref={wrapper}>
      <section id="process" className="process-pinned" aria-label={process.aria}>
        <div className="process-header-fixed">
          <div className="section-tag">{process.tag}</div>
          <h2 className="section-title">{process.title}</h2>
        </div>
        <div className="process-progress-bar" aria-hidden="true">
          <div className="process-progress-fill" ref={fill}></div>
        </div>
        <div className="process-track-wrapper">
          <div className="process-track" ref={track}>
            {process.steps.map((step, i) => {
              const Icon = icons[i % icons.length];
              return (
                <div className="process-step-h" key={step.title}>
                  <div className="psh-num">{String(i + 1).padStart(2, "0")}</div>
                  <div className="psh-icon">
                    <Icon size={32} />
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                  {i < process.steps.length - 1 && <div className="psh-connector" aria-hidden="true"></div>}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
