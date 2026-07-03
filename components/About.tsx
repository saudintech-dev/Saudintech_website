import type { Dictionary } from "@/lib/dictionaries";
import { IconLayers, IconClock, IconCode, IconUsers } from "@/components/icons";

export default function About({ about }: { about: Dictionary["about"] }) {
  return (
    <section id="about" className="about-section section" aria-label={about.aria}>
      <div className="container">
        <div className="about-grid">
          <div className="about-visual gsap-fade-left">
            <div className="founders-card">
              <div className="founders-illustration">
                <div className="founder-avatar founder-1">
                  <div className="avatar-bg">
                    <span style={{ color: "#22c55e" }}>
                      <IconCode size={48} />
                    </span>
                  </div>
                  <div className="founder-label">{about.founder1}</div>
                </div>
                <div className="founders-connector"></div>
                <div className="founder-avatar founder-2">
                  <div className="avatar-bg">
                    <span style={{ color: "#0a5c3a" }}>
                      <IconUsers size={48} />
                    </span>
                  </div>
                  <div className="founder-label">{about.founder2}</div>
                </div>
              </div>
              <div className="values-list">
                {about.values.map((value) => (
                  <div className="value-item" key={value}>
                    <span className="value-dot"></span>
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="about-content gsap-fade-right">
            <div className="section-tag">{about.tag}</div>
            <h2 className="section-title">
              {about.title1}
              <br />
              {about.title2}
            </h2>
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
            <div className="about-pillars">
              {about.pillars.map((pillar, i) => (
                <div className="pillar" key={pillar.title}>
                  <div className="pillar-icon">{i === 0 ? <IconLayers size={22} /> : <IconClock size={22} />}</div>
                  <div>
                    <h3>{pillar.title}</h3>
                    <p>{pillar.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
