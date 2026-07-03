import type { Dictionary } from "@/lib/dictionaries";
import { IconPackage, IconSend, IconHeart, IconUsers, IconActivity } from "@/components/icons";

const icons = [IconPackage, IconSend, IconHeart, IconUsers, IconActivity];

export default function Solutions({ solutions }: { solutions: Dictionary["solutions"] }) {
  return (
    <section id="solutions" className="solutions-section section" aria-label={solutions.aria}>
      <div className="solutions-bg" aria-hidden="true"></div>
      <div className="container">
        <div className="section-header gsap-fade-up">
          <div className="section-tag section-tag-light">{solutions.tag}</div>
          <h2 className="section-title section-title-light">{solutions.title}</h2>
          <p className="section-subtitle section-subtitle-light">{solutions.subtitle}</p>
        </div>
        <div className="solutions-grid">
          {solutions.cards.map((card, i) => {
            const Icon = icons[i % icons.length];
            return (
              <div className="solution-card gsap-fade-up" data-delay={i * 0.1} key={card.title}>
                <div className="solution-header">
                  <div className="solution-icon">
                    <Icon />
                  </div>
                  <div className="solution-badge">{card.badge}</div>
                </div>
                <h3>{card.title}</h3>
                <div className="solution-detail">
                  <div className="detail-row">
                    <span className="detail-label problem">{solutions.problemLabel}</span>
                    <span>{card.problem}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label solution">{solutions.solutionLabel}</span>
                    <span>{card.solution}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label impact">{solutions.impactLabel}</span>
                    <span className="impact-value">{card.impact}</span>
                  </div>
                </div>
                <a href="#contact" className="solution-cta">
                  {solutions.cta}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
