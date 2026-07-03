"use client";

import { useEffect, useState } from "react";
import LogoMark from "@/components/LogoMark";
import { siteConfig } from "@/lib/site-config";
import type { Dictionary } from "@/lib/dictionaries";

export default function Navbar({
  nav,
  base = "",
  homeHref = "#home",
  switchHref,
}: {
  nav: Dictionary["nav"];
  /** Prefix for in-page anchor links. "" on the homepage; "/en" on sub-pages so anchors resolve back home. */
  base?: string;
  /** Where the logo links. "#home" on the homepage; "/en" on sub-pages. */
  homeHref?: string;
  /** Locale-switch target. Defaults to the other locale's homepage. */
  switchHref?: string;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = [
    { href: `${base}#services-wrapper`, label: nav.services },
    { href: `${base}#solutions`, label: nav.solutions },
    { href: `${base}#industries`, label: nav.industries },
    { href: `${base}#process-wrapper`, label: nav.process },
    { href: `${base}#showcase`, label: nav.showcase },
    { href: `${base}#about`, label: nav.about },
    { href: `${base}#contact`, label: nav.contact },
  ];

  return (
    <nav
      id="navbar"
      className={`${scrolled ? "scrolled" : ""} ${open ? "mobile-open" : ""}`.trim()}
      aria-label={nav.ariaMain}
    >
      <div className="nav-container">
        <a href={homeHref} className="nav-logo" aria-label={nav.ariaHome}>
          <span className="logo-mark">
            <LogoMark variant="dark" />
          </span>
          <span className="logo-text">{siteConfig.name}</span>
        </a>
        <button
          className="nav-toggle"
          aria-label={nav.ariaToggle}
          aria-expanded={open}
          aria-controls="navMenu"
          onClick={() => setOpen((v) => !v)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul className="nav-links" id="navMenu" role="list">
          {links.map((link) => (
            <li key={link.href + link.label}>
              <a href={link.href} className="nav-link" onClick={() => setOpen(false)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        {/* Full page navigation on purpose: re-initializes fonts, direction, and animations cleanly */}
        <a
          href={switchHref ?? `/${nav.switchLocale}`}
          className="lang-switch"
          lang={nav.switchLocale}
          aria-label={nav.ariaSwitch}
        >
          {nav.switchLabel}
        </a>
        <a href={`${base}#contact`} className="btn btn-primary nav-cta" onClick={() => setOpen(false)}>
          {nav.cta}
        </a>
      </div>
    </nav>
  );
}
