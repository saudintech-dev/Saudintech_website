import type { Dictionary } from "@/lib/dictionaries";
import { IconUser, IconFileText, IconKey, IconEye, IconGlobe, IconUnlock } from "@/components/icons";

const icons = [IconUser, IconFileText, IconKey, IconEye, IconGlobe, IconUnlock];

/**
 * Replaces the drafted testimonials section: as a new agency we publish
 * verifiable commitments instead of invented client quotes.
 */
export default function Commitments({ commitments }: { commitments: Dictionary["commitments"] }) {
  return (
    <section className="commitments-section section" aria-label={commitments.aria}>
      <div className="container">
        <div className="section-header gsap-fade-up">
          <div className="section-tag">{commitments.tag}</div>
          <h2 className="section-title">{commitments.title}</h2>
          <p className="section-subtitle">{commitments.subtitle}</p>
        </div>
        <div className="trust-grid">
          {commitments.cards.map((card, i) => {
            const Icon = icons[i % icons.length];
            return (
              <div className="trust-card gsap-fade-up" data-delay={i * 0.08} key={card.title}>
                <div className="trust-icon">
                  <Icon />
                </div>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
