import type { Dictionary } from "@/lib/dictionaries";
import { IconLayers, IconGlobe, IconClock, IconCoffee, IconActivity, IconUsers } from "@/components/icons";

const icons = [IconLayers, IconGlobe, IconClock, IconCoffee, IconActivity, IconUsers];

export default function TrustSection({ trust }: { trust: Dictionary["trust"] }) {
  return (
    <section id="trust" className="trust-section section" aria-label={trust.aria}>
      <div className="container">
        <div className="section-header gsap-fade-up">
          <div className="section-tag">{trust.tag}</div>
          <h2 className="section-title">{trust.title}</h2>
          <p className="section-subtitle">{trust.subtitle}</p>
        </div>
        <div className="trust-grid">
          {trust.cards.map((card, i) => {
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
