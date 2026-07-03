"use client";

import { useEffect, useState } from "react";
import type { Dictionary } from "@/lib/dictionaries";

export default function Faq({ faq }: { faq: Dictionary["faq"] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIdx(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section className="faq-section section" aria-label={faq.aria}>
      <div className="container faq-container">
        <div className="section-header gsap-fade-up">
          <div className="section-tag">{faq.tag}</div>
          <h2 className="section-title">{faq.title}</h2>
          <p className="section-subtitle">{faq.subtitle}</p>
        </div>
        <div className="faq-list">
          {faq.items.map((item, i) => {
            const open = openIdx === i;
            return (
              <div className={`faq-item gsap-fade-up${open ? " open" : ""}`} data-delay={i * 0.08} key={item.q}>
                <button
                  className="faq-question"
                  aria-expanded={open}
                  aria-controls={`faq-answer-${i}`}
                  onClick={() => setOpenIdx(open ? null : i)}
                >
                  {item.q}
                  <span className="faq-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </button>
                <div className={`faq-answer${open ? " open" : ""}`} id={`faq-answer-${i}`}>
                  <p>{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
