import type { Dictionary } from "@/lib/dictionaries";
import { IconCoffee, IconSend, IconBag, IconHeart, IconActivity, IconClock, IconBriefcase, IconBook } from "@/components/icons";

const icons = [IconCoffee, IconSend, IconBag, IconHeart, IconActivity, IconClock, IconBriefcase, IconBook];

export default function Industries({ industries }: { industries: Dictionary["industries"] }) {
  return (
    <section id="industries" className="industries-section section" aria-label={industries.aria}>
      <div className="container">
        <div className="section-header gsap-fade-up">
          <div className="section-tag">{industries.tag}</div>
          <h2 className="section-title">{industries.title}</h2>
          <p className="section-subtitle">{industries.subtitle}</p>
        </div>
        <div className="industries-grid">
          {industries.cards.map((card, i) => {
            const Icon = icons[i % icons.length];
            return (
              <div className="industry-card gsap-fade-up" data-delay={i * 0.08} key={card.title}>
                <div className="industry-icon">
                  <Icon size={36} />
                </div>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
                <div className="industry-solutions">
                  {card.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
