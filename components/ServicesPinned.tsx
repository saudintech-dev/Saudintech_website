"use client";

import { Fragment, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsomorphicLayoutEffect } from "@/lib/use-isomorphic-layout-effect";
import type { Dictionary, Locale } from "@/lib/dictionaries";
import { serviceSlugs } from "@/lib/services";

export default function ServicesPinned({
  services,
  locale,
}: {
  services: Dictionary["services"];
  locale: Locale;
}) {
  const wrapper = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const total = services.items.length;
  const s = services.screens;

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const trigger = ScrollTrigger.create({
      trigger: wrapper.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 0,
      onUpdate: (self) => {
        setActive(Math.min(Math.floor(self.progress * total), total - 1));
      },
    });
    return () => trigger.kill();
  }, [total]);

  return (
    <div className="services-pin-wrapper" id="services-wrapper" ref={wrapper}>
      <section id="services" className="services-pinned" aria-label={services.aria}>
        <div className="services-pin-inner">
          <div className="services-left">
            <div className="section-tag">{services.tag}</div>
            <h2 className="services-main-title">{services.title}</h2>

            <div className="service-list">
              {services.items.map((item, i) => (
                <Link
                  href={`/${locale}/services/${serviceSlugs[i]}`}
                  className={`sli${i === active ? " active" : ""}`}
                  key={item.title}
                >
                  <div className="sli-num">{String(i + 1).padStart(2, "0")}</div>
                  <div className="sli-body">
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                  <div className="sli-arrow" aria-hidden="true">
                    →
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="services-right" aria-hidden="true">
            <div className="service-screens">
              {/* Screen 0: Business Website */}
              <div className={`svc-screen${active === 0 ? " active" : ""}`}>
                <div className="svc-browser">
                  <div className="svc-browser-bar">
                    <div className="svc-dots"><span></span><span></span><span></span></div>
                    <div className="svc-url-bar">{s.urlBar}</div>
                  </div>
                  <div className="svc-browser-body">
                    <div className="svc-site-nav">
                      <div className="svc-site-logo"></div>
                      <div className="svc-site-links"><div></div><div></div><div></div></div>
                      <div className="svc-site-btn"></div>
                    </div>
                    <div className="svc-site-hero">
                      <div className="svc-site-hero-text">
                        <div className="svc-h1"></div>
                        <div className="svc-h2"></div>
                        <div className="svc-btn-row"><div className="svc-cta-btn"></div><div className="svc-ghost-btn"></div></div>
                      </div>
                      <div className="svc-site-hero-img"></div>
                    </div>
                    <div className="svc-site-cards">
                      <div className="svc-site-card"><div></div><div></div></div>
                      <div className="svc-site-card"><div></div><div></div></div>
                      <div className="svc-site-card"><div></div><div></div></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Screen 1: E-Commerce */}
              <div className={`svc-screen${active === 1 ? " active" : ""}`}>
                <div className="svc-ecom">
                  <div className="svc-ecom-header">
                    <div className="svc-ecom-search"></div>
                    <div className="svc-ecom-cart-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <circle cx="9" cy="21" r="1" stroke="#22c55e" strokeWidth="2" />
                        <circle cx="20" cy="21" r="1" stroke="#22c55e" strokeWidth="2" />
                        <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>{" "}
                      <span>3</span>
                    </div>
                  </div>
                  <div className="svc-ecom-grid">
                    {[
                      { bg: "#f0fdf4", price: "SAR 120" },
                      { bg: "#eff6ff", price: "SAR 85" },
                      { bg: "#fdf4ff", price: "SAR 200" },
                      { bg: "#fff7ed", price: "SAR 60" },
                    ].map((p) => (
                      <div className="svc-product" key={p.bg}>
                        <div className="svc-product-img" style={{ background: p.bg }}></div>
                        <div className="svc-product-name"></div>
                        <div className="svc-product-price">{p.price}</div>
                        <div className="svc-add-cart">{s.ecomAdd}</div>
                      </div>
                    ))}
                  </div>
                  <div className="svc-ecom-footer">
                    <div className="svc-ecom-total"><span>{s.ecomTotal}</span><span className="svc-total-val">{s.ecomTotalVal}</span></div>
                    <div className="svc-checkout-btn">{s.ecomCheckout}</div>
                  </div>
                </div>
              </div>

              {/* Screen 2: Web Application */}
              <div className={`svc-screen${active === 2 ? " active" : ""}`}>
                <div className="svc-webapp">
                  <div className="svc-webapp-sidebar">
                    <div className="svc-ws-item active"></div>
                    <div className="svc-ws-item"></div>
                    <div className="svc-ws-item"></div>
                    <div className="svc-ws-item"></div>
                    <div className="svc-ws-item"></div>
                  </div>
                  <div className="svc-webapp-main">
                    <div className="svc-wa-stats">
                      <div className="svc-wa-stat green"><div className="svc-wa-stat-val">{s.waRevenueVal}</div><div className="svc-wa-stat-lbl">{s.waRevenue}</div></div>
                      <div className="svc-wa-stat"><div className="svc-wa-stat-val">{s.waUsersVal}</div><div className="svc-wa-stat-lbl">{s.waUsers}</div></div>
                      <div className="svc-wa-stat"><div className="svc-wa-stat-val">{s.waUptimeVal}</div><div className="svc-wa-stat-lbl">{s.waUptime}</div></div>
                    </div>
                    <div className="svc-wa-chart-area">
                      <div className="svc-wa-chart">
                        {["50%", "70%", "55%", "90%", "75%", "88%", "65%"].map((h, i) => (
                          <div style={{ height: h }} key={i}></div>
                        ))}
                      </div>
                      <div className="svc-wa-table">
                        <div className="svc-wa-tr header"><div></div><div></div><div></div></div>
                        <div className="svc-wa-tr"><div></div><div className="g"></div><div></div></div>
                        <div className="svc-wa-tr"><div></div><div className="g"></div><div></div></div>
                        <div className="svc-wa-tr"><div></div><div className="r"></div><div></div></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Screen 3: Inventory & POS */}
              <div className={`svc-screen${active === 3 ? " active" : ""}`}>
                <div className="svc-inv">
                  <div className="svc-inv-header">
                    <div className="svc-inv-title">{s.invTitle}</div>
                    <div className="svc-inv-stats">
                      <span className="svc-inv-stat">248 <small>{s.invItems}</small></span>
                      <span className="svc-inv-stat green">12 <small>{s.invLow}</small></span>
                      <span className="svc-inv-stat">{s.invValueVal} <small>{s.invValue}</small></span>
                    </div>
                  </div>
                  <div className="svc-inv-table">
                    <div className="svc-inv-tr th">
                      <div>{s.invColProduct}</div><div>{s.invColSku}</div><div>{s.invColStock}</div><div>{s.invColStatus}</div>
                    </div>
                    {s.invRows.map((row) => (
                      <div className="svc-inv-tr" key={row.sku}>
                        <div>{row.name}</div>
                        <div>{row.sku}</div>
                        <div>{row.stock}</div>
                        <div><span className={row.ok ? "badge-ok" : "badge-low"}>{row.ok ? s.badgeOk : s.badgeLow}</span></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Screen 4: CRM */}
              <div className={`svc-screen${active === 4 ? " active" : ""}`}>
                <div className="svc-crm">
                  <div className="svc-crm-header">
                    <div className="svc-crm-title">{s.crmTitle}</div>
                    <div className="svc-crm-total">{s.crmTotal} <strong>{s.crmTotalVal}</strong></div>
                  </div>
                  <div className="svc-crm-board">
                    {s.crmCols.map((col, colIdx) => (
                      <div className={`svc-crm-col${colIdx === s.crmCols.length - 1 ? " won" : ""}`} key={col.name}>
                        <div className="svc-crm-col-hd">{col.name} <span>{col.count}</span></div>
                        {col.cards.map((card, cardIdx) => (
                          <div
                            className={`svc-crm-card${colIdx === s.crmCols.length - 1 ? " won-card" : ""}${(colIdx === 1 || colIdx === 2) && cardIdx === 0 ? " hot" : ""}`}
                            key={card.co}
                          >
                            <div className="svc-crm-co">{card.co}</div>
                            <div className="svc-crm-amt">{card.amt}</div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Screen 5: Mobile App */}
              <div className={`svc-screen${active === 5 ? " active" : ""}`}>
                <div className="svc-mobile-wrap">
                  <div className="svc-phone-frame">
                    <div className="svc-phone-inner">
                      <div className="svc-app-header">
                        <div className="svc-app-logo">S</div>
                        <div className="svc-app-title">{s.appTitle}</div>
                        <div className="svc-app-notif">3</div>
                      </div>
                      <div className="svc-app-metric">
                        <div className="svc-app-label">{s.appRevenueLabel}</div>
                        <div className="svc-app-value">{s.appRevenueVal}</div>
                        <div className="svc-app-trend">{s.appTrend}</div>
                      </div>
                      <div className="svc-app-chart">
                        {["45%", "65%", "55%", "85%", "70%"].map((h, i) => (
                          <div style={{ height: h }} key={i}></div>
                        ))}
                      </div>
                      <div className="svc-app-actions">
                        <div className="svc-app-action">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <circle cx="9" cy="21" r="1" stroke="currentColor" strokeWidth="2" />
                            <circle cx="20" cy="21" r="1" stroke="currentColor" strokeWidth="2" />
                            <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" stroke="currentColor" strokeWidth="2" />
                          </svg>
                          <span>{s.appOrders}</span>
                        </div>
                        <div className="svc-app-action">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" stroke="currentColor" strokeWidth="2" />
                          </svg>
                          <span>{s.appInventory}</span>
                        </div>
                        <div className="svc-app-action">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" />
                            <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
                          </svg>
                          <span>{s.appCustomers}</span>
                        </div>
                      </div>
                      <div className="svc-app-nav">
                        <div className="active"></div><div></div><div></div><div></div>
                      </div>
                    </div>
                  </div>
                  <div className="svc-phone-glow"></div>
                </div>
              </div>

              {/* Screen 6: Automation */}
              <div className={`svc-screen${active === 6 ? " active" : ""}`}>
                <div className="svc-auto">
                  <div className="svc-auto-header">
                    <div className="svc-auto-title">{s.autoTitle}</div>
                    <div className="svc-auto-badge">{s.autoBadge}</div>
                  </div>
                  <div className="svc-auto-flows">
                    {s.autoFlows.map((flow, flowIdx) => (
                      <div className="svc-flow" key={flowIdx}>
                        {flow.map((step, stepIdx) => (
                          <Fragment key={step}>
                            {stepIdx > 0 && <div className="svc-flow-arrow">→</div>}
                            <div
                              className={`svc-flow-step${stepIdx === 0 ? " trigger" : ""}${stepIdx === flow.length - 1 ? " done" : ""}`}
                            >
                              {step}
                            </div>
                          </Fragment>
                        ))}
                      </div>
                    ))}
                  </div>
                  <div className="svc-auto-metrics">
                    {s.autoMetrics.map((m) => (
                      <div className="svc-auto-m" key={m.label}>
                        <div className="svc-auto-mv">{m.value}</div>
                        <div className="svc-auto-ml">{m.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
