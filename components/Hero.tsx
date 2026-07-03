"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsomorphicLayoutEffect } from "@/lib/use-isomorphic-layout-effect";
import type { Dictionary } from "@/lib/dictionaries";
import { IconCheck } from "@/components/icons";

export default function Hero({ hero, mock }: { hero: Dictionary["hero"]; mock: Dictionary["mock"] }) {
  const root = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context((self) => {
      const wrapper = root.current!;
      const q = gsap.utils.selector(wrapper);
      const dashboard = q("#heroDashboard");
      const metrics = q("#heroMetrics");
      const chart = q("#heroChart");
      const cards = q("#heroCardPos, #heroCardInv");
      const phone = q("#heroPhone");
      const stats = q("#heroStats");
      const visual = q("#heroVisual")[0];
      const badge = q("#heroBadge");
      const headline = q("#heroHeadline");
      const sub = q("#heroSub");
      const actions = q("#heroActions");

      gsap.set([badge, headline, sub, actions, stats], { opacity: 0, y: 30 });
      gsap.set(dashboard, { opacity: 0, scale: 0.88, y: 40 });
      gsap.set(metrics, { opacity: 0, y: 20 });
      gsap.set(chart, { opacity: 0, scaleY: 0, transformOrigin: "bottom" });
      gsap.set(cards, { opacity: 0, x: 40 });
      gsap.set(phone, { opacity: 0, y: 30 });

      gsap
        .timeline({ delay: 0.1 })
        .to([badge, headline], { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power3.out" })
        .to([sub, actions], { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" }, "-=0.3")
        .to(stats, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.1")
        .to(dashboard, { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "power4.out" }, "-=0.6")
        .to(metrics, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.3")
        .to(chart, { opacity: 1, scaleY: 1, duration: 0.6, ease: "power3.out" }, "-=0.2")
        .to(cards, { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: "power3.out" }, "-=0.4")
        .to(phone, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.3");

      /* Fade the visual out as the hero scrolls away */
      if (visual && wrapper.offsetHeight > window.innerHeight) {
        ScrollTrigger.create({
          trigger: wrapper,
          start: "top top",
          end: "+=60%",
          scrub: true,
          onUpdate: (st) => {
            const p = st.progress;
            if (p > 0.5) {
              gsap.set(visual, { opacity: 1 - (p - 0.5) * 2, y: p * -60 });
            } else {
              gsap.set(visual, { opacity: 1, y: 0 });
            }
          },
        });
      }

      /* Mouse parallax on the decorative orbs */
      const orbs = wrapper.querySelectorAll<HTMLElement>(".hero-orb");
      const onMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 30;
        const y = (e.clientY / window.innerHeight - 0.5) * 30;
        orbs.forEach((orb, i) => {
          const f = i === 0 ? 1 : -0.6;
          orb.style.transform = `translate(${x * f}px, ${y * f}px)`;
        });
      };
      window.addEventListener("mousemove", onMove, { passive: true });
      self.add(() => window.removeEventListener("mousemove", onMove));
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div className="hero-pin-wrapper" id="home" ref={root}>
      <section className="hero" aria-label={hero.headline1 + " " + hero.headlineAccent}>
        <div className="hero-bg-grid" aria-hidden="true"></div>
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge" id="heroBadge">
              <span className="badge-dot" aria-hidden="true"></span>
              {hero.badge}
            </div>
            <h1 className="hero-headline" id="heroHeadline">
              {hero.headline1}
              <br />
              <span className="headline-accent">{hero.headlineAccent}</span>
              <br />
              {hero.headline2}
            </h1>
            <p className="hero-subheadline" id="heroSub">
              {hero.sub}
            </p>
            <div className="hero-actions" id="heroActions">
              <a href="#contact" className="btn btn-primary btn-lg">
                {hero.ctaPrimary}
              </a>
              <a href="#solutions" className="btn btn-ghost btn-lg">
                {hero.ctaSecondary}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
            <div className="hero-stats" id="heroStats">
              {hero.badges.map((badge) => (
                <div className="hero-stat" key={badge.title}>
                  <span className="hero-stat-icon" aria-hidden="true">
                    <IconCheck size={16} />
                  </span>
                  <span className="hero-stat-text">
                    <span className="hero-stat-title">{badge.title}</span>
                    <span className="hero-stat-sub">{badge.sub}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true" id="heroVisual">
            <div className="dashboard-mockup">
              <div className="mockup-window mockup-main" id="heroDashboard">
                <div className="window-bar">
                  <span className="dot dot-red"></span>
                  <span className="dot dot-yellow"></span>
                  <span className="dot dot-green"></span>
                  <span className="window-title">{mock.windowTitle}</span>
                </div>
                <div className="window-body">
                  <div className="dash-header">
                    <div>
                      <div className="dash-title">{mock.overview}</div>
                      <div className="dash-sub">{mock.thisMonth}</div>
                    </div>
                    <div className="dash-badge-green">{mock.growth}</div>
                  </div>
                  <div className="dash-metrics" id="heroMetrics">
                    <div className="metric-card">
                      <div className="metric-icon metric-icon-green">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </div>
                      <div className="metric-value">{mock.revenueVal}</div>
                      <div className="metric-label">{mock.revenue}</div>
                    </div>
                    <div className="metric-card">
                      <div className="metric-icon metric-icon-blue">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="#3b82f6" strokeWidth="2" />
                          <circle cx="9" cy="7" r="4" stroke="#3b82f6" strokeWidth="2" />
                        </svg>
                      </div>
                      <div className="metric-value">{mock.customersVal}</div>
                      <div className="metric-label">{mock.customers}</div>
                    </div>
                    <div className="metric-card">
                      <div className="metric-icon metric-icon-purple">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="#8b5cf6" strokeWidth="2" />
                          <line x1="3" y1="6" x2="21" y2="6" stroke="#8b5cf6" strokeWidth="2" />
                        </svg>
                      </div>
                      <div className="metric-value">{mock.ordersVal}</div>
                      <div className="metric-label">{mock.orders}</div>
                    </div>
                  </div>
                  <div className="dash-chart" id="heroChart">
                    <div className="chart-bar" style={{ "--h": "45%" } as React.CSSProperties}></div>
                    <div className="chart-bar" style={{ "--h": "65%" } as React.CSSProperties}></div>
                    <div className="chart-bar" style={{ "--h": "50%" } as React.CSSProperties}></div>
                    <div className="chart-bar" style={{ "--h": "80%" } as React.CSSProperties}></div>
                    <div className="chart-bar active" style={{ "--h": "95%" } as React.CSSProperties}></div>
                    <div className="chart-bar" style={{ "--h": "70%" } as React.CSSProperties}></div>
                    <div className="chart-bar" style={{ "--h": "88%" } as React.CSSProperties}></div>
                  </div>
                </div>
              </div>

              <div className="mockup-card mockup-pos" id="heroCardPos">
                <div className="card-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <rect x="2" y="3" width="20" height="14" rx="2" stroke="#0a5c3a" strokeWidth="2" />
                    <path d="M8 21h8M12 17v4" stroke="#0a5c3a" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="card-info">
                  <div className="card-title">{mock.pos}</div>
                  <div className="card-sub">{mock.posSub}</div>
                </div>
                <div className="card-amount">{mock.posAmount}</div>
              </div>

              <div className="mockup-card mockup-inv" id="heroCardInv">
                <div className="card-icon card-icon-green">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" stroke="#22c55e" strokeWidth="2" />
                    <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" stroke="#22c55e" strokeWidth="2" />
                  </svg>
                </div>
                <div className="card-info">
                  <div className="card-title">{mock.inv}</div>
                  <div className="card-sub">{mock.invSub}</div>
                </div>
                <div className="card-badge-green">{mock.invBadge}</div>
              </div>

              <div className="mockup-phone" id="heroPhone">
                <div className="phone-screen">
                  <div className="phone-header">
                    <div className="phone-logo">S</div>
                    <div className="phone-title">{mock.phoneTitle}</div>
                  </div>
                  <div className="phone-metric">
                    <div className="phone-val">{mock.phoneVal}</div>
                    <div className="phone-trend">{mock.phoneTrend}</div>
                  </div>
                  <div className="phone-bars">
                    <div style={{ height: "40%" }}></div>
                    <div style={{ height: "60%" }}></div>
                    <div style={{ height: "80%" }}></div>
                    <div style={{ height: "55%" }}></div>
                    <div style={{ height: "90%" }}></div>
                  </div>
                </div>
              </div>

              <div className="hero-orb hero-orb-1" aria-hidden="true"></div>
              <div className="hero-orb hero-orb-2" aria-hidden="true"></div>
            </div>
          </div>
        </div>

        <div className="scroll-indicator" aria-hidden="true">
          <div className="scroll-line"></div>
          <span>{hero.scroll}</span>
        </div>
      </section>
    </div>
  );
}
