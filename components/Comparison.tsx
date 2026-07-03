import type { Dictionary } from "@/lib/dictionaries";
import { IconCheck, IconX, IconXCircle } from "@/components/icons";

export default function Comparison({ comparison }: { comparison: Dictionary["comparison"] }) {
  return (
    <section className="comparison-section section" aria-label={comparison.aria}>
      <div className="container">
        <div className="section-header gsap-fade-up">
          <div className="section-tag">{comparison.tag}</div>
          <h2 className="section-title">{comparison.title}</h2>
          <p className="section-subtitle">{comparison.subtitle}</p>
        </div>
        <div className="comparison-grid">
          <div className="comparison-before gsap-fade-left">
            <div className="comparison-header-card before">
              <IconXCircle />
              <span>{comparison.beforeTitle}</span>
            </div>
            <div className="comparison-items">
              {comparison.before.map((item) => (
                <div className="comparison-item bad" key={item}>
                  <IconX color="#ef4444" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="comparison-divider gsap-fade-up">
            <div className="divider-arrow">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          <div className="comparison-after gsap-fade-right">
            <div className="comparison-header-card after">
              <IconCheck size={24} />
              <span>{comparison.afterTitle}</span>
            </div>
            <div className="comparison-items">
              {comparison.after.map((item) => (
                <div className="comparison-item good" key={item}>
                  <IconCheck color="#22c55e" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
