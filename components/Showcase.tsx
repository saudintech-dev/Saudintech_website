import type { Dictionary } from "@/lib/dictionaries";

/**
 * Reframed from the drafted "portfolio with results" section:
 * presents example builds honestly (what we build + realistic parameters)
 * instead of invented client case studies.
 */

function CafeMockup() {
  return (
    <div className="portfolio-mockup cafe-mockup">
      <div className="pm-header"><span className="pm-dot"></span><span className="pm-dot"></span><span className="pm-dot"></span></div>
      <div className="pm-body">
        <div className="pm-sidebar">
          <div className="pm-nav-item active"></div><div className="pm-nav-item"></div><div className="pm-nav-item"></div><div className="pm-nav-item"></div>
        </div>
        <div className="pm-content">
          <div className="pm-stat-row">
            <div className="pm-stat-card green"><div className="pm-stat-val">SAR 24K</div><div className="pm-stat-lbl">Monthly Revenue</div></div>
            <div className="pm-stat-card"><div className="pm-stat-val">842</div><div className="pm-stat-lbl">Orders</div></div>
          </div>
          <div className="pm-chart-row">
            <div style={{ height: "50%" }}></div><div style={{ height: "70%" }}></div><div style={{ height: "60%" }}></div><div style={{ height: "90%" }}></div><div style={{ height: "75%" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RetailMockup() {
  return (
    <div className="portfolio-mockup retail-mockup">
      <div className="pm-header"><span className="pm-dot"></span><span className="pm-dot"></span><span className="pm-dot"></span></div>
      <div className="pm-body">
        <div className="pm-sidebar">
          <div className="pm-nav-item active"></div><div className="pm-nav-item"></div><div className="pm-nav-item"></div><div className="pm-nav-item"></div>
        </div>
        <div className="pm-content">
          <div className="pm-table-header"><div></div><div></div><div></div><div></div></div>
          <div className="pm-table-row"><div></div><div className="green-tag"></div><div></div><div></div></div>
          <div className="pm-table-row"><div></div><div className="red-tag"></div><div></div><div></div></div>
          <div className="pm-table-row"><div></div><div className="green-tag"></div><div></div><div></div></div>
          <div className="pm-table-row"><div></div><div className="green-tag"></div><div></div><div></div></div>
        </div>
      </div>
    </div>
  );
}

function ClinicMockup() {
  return (
    <div className="portfolio-mockup clinic-mockup">
      <div className="pm-header"><span className="pm-dot"></span><span className="pm-dot"></span><span className="pm-dot"></span></div>
      <div className="pm-body">
        <div className="pm-sidebar">
          <div className="pm-nav-item active"></div><div className="pm-nav-item"></div><div className="pm-nav-item"></div><div className="pm-nav-item"></div>
        </div>
        <div className="pm-content">
          <div className="pm-calendar">
            <div className="pm-cal-header"></div>
            <div className="pm-cal-grid">
              <div className="pm-cal-item booked"></div><div className="pm-cal-item"></div><div className="pm-cal-item booked"></div><div className="pm-cal-item"></div>
              <div className="pm-cal-item booked"></div><div className="pm-cal-item booked"></div><div className="pm-cal-item"></div><div className="pm-cal-item booked"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mockups = [CafeMockup, RetailMockup, ClinicMockup];

export default function Showcase({ showcase }: { showcase: Dictionary["showcase"] }) {
  return (
    <section id="showcase" className="portfolio-section section" aria-label={showcase.aria}>
      <div className="container">
        <div className="section-header gsap-fade-up">
          <div className="section-tag">{showcase.tag}</div>
          <h2 className="section-title">{showcase.title}</h2>
          <p className="section-subtitle">{showcase.subtitle}</p>
        </div>
        <div className="portfolio-grid">
          {showcase.cards.map((card, i) => {
            const Mockup = mockups[i % mockups.length];
            return (
              <div className="portfolio-card gsap-fade-up" data-delay={i * 0.12} key={card.title}>
                <div className="portfolio-visual" aria-hidden="true">
                  <Mockup />
                </div>
                <div className="portfolio-info">
                  <div className="portfolio-tag">{card.tag}</div>
                  <h3>{card.title}</h3>
                  <div className="portfolio-challenge">
                    <span className="challenge-label">{showcase.challengeLabel}</span>
                    <p>{card.challenge}</p>
                  </div>
                  <div className="portfolio-challenge">
                    <span className="challenge-label">{showcase.buildLabel}</span>
                    <p>{card.build}</p>
                  </div>
                  <div className="portfolio-result">
                    {card.metrics.map((metric) => (
                      <div className="result-metric" key={metric.text}>
                        <span className="result-num">{metric.num}</span>
                        <span className="result-text">{metric.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
