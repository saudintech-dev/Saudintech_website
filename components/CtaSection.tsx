import type { Dictionary } from "@/lib/dictionaries";
import { siteConfig } from "@/lib/site-config";
import { IconMail, IconWhatsApp, IconCheck } from "@/components/icons";
import QuoteForm from "@/components/QuoteForm";

export default function CtaSection({
  cta,
  quoteForm,
}: {
  cta: Dictionary["cta"];
  quoteForm: Dictionary["quoteForm"];
}) {
  return (
    <section id="contact" className="cta-section section" aria-label={cta.aria}>
      <div className="cta-bg" aria-hidden="true"></div>
      <div className="container">
        <div className="cta-grid">
          <div className="cta-content gsap-fade-left">
            <div className="cta-badge">{cta.badge}</div>
            <h2 className="cta-title">
              {cta.title1}
              <br />
              <span className="cta-accent">{cta.titleAccent}</span>
            </h2>
            <p className="cta-subtitle">{cta.sub}</p>
            <div className="cta-actions">
              <a href={`mailto:${siteConfig.email}`} className="btn btn-cta-primary btn-lg">
                <IconMail />
                {cta.emailBtn}
              </a>
              <a
                href={siteConfig.whatsapp}
                className="btn btn-cta-whatsapp btn-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconWhatsApp />
                {cta.whatsappBtn}
              </a>
            </div>
            <div className="cta-trust">
              {cta.trust.map((item) => (
                <div className="cta-trust-item" key={item}>
                  <IconCheck size={16} />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="cta-form-wrap gsap-fade-right">
            <QuoteForm t={quoteForm} />
          </div>
        </div>
      </div>
    </section>
  );
}
