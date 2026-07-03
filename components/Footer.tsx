import LogoMark from "@/components/LogoMark";
import { siteConfig } from "@/lib/site-config";
import type { Dictionary } from "@/lib/dictionaries";

const socialIcons: Record<string, { label: string; path: React.ReactNode }> = {
  linkedin: {
    label: "LinkedIn",
    path: (
      <>
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="2" y="9" width="4" height="12" stroke="currentColor" strokeWidth="2" />
        <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="2" />
      </>
    ),
  },
  instagram: {
    label: "Instagram",
    path: (
      <>
        <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2" />
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" stroke="currentColor" strokeWidth="2" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </>
    ),
  },
  x: {
    label: "X",
    path: <path d="M4 4l16 16M20 4L4 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />,
  },
  tiktok: {
    label: "TikTok",
    path: <path d="M9 12a4 4 0 104 4V4a5 5 0 005 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
  },
};

export default function Footer({
  footer,
  base = "",
}: {
  footer: Dictionary["footer"];
  /** Prefix for in-page anchors so footer links work from sub-pages too. */
  base?: string;
}) {
  const year = new Date().getFullYear();
  const socials = Object.entries(siteConfig.socials).filter(([, url]) => url);
  const columns = Object.values(footer.columns);
  const withBase = (href: string) => (href.startsWith("#") ? `${base}${href}` : href);

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <a href={`${base}#home`} className="footer-logo">
              <span className="logo-mark">
                <LogoMark variant="light" />
              </span>
              <span className="logo-text footer-logo-text">{siteConfig.name}</span>
            </a>
            <p className="footer-tagline">{footer.tagline}</p>
            {socials.length > 0 && (
              <div className="footer-socials">
                {socials.map(([key, url]) => (
                  <a
                    href={url}
                    className="social-link"
                    aria-label={socialIcons[key].label}
                    key={key}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      {socialIcons[key].path}
                    </svg>
                  </a>
                ))}
              </div>
            )}
          </div>
          {columns.map((col) => (
            <nav className="footer-nav-group" key={col.title}>
              <h3>{col.title}</h3>
              <ul>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={withBase(link.href)}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="footer-bottom">
          <p>
            &copy; {year} {siteConfig.name}. {footer.rights}
          </p>
          <p>
            {footer.location} &nbsp;·&nbsp; <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            &nbsp;·&nbsp; <a href={`tel:${siteConfig.phoneE164}`} dir="ltr">{siteConfig.phoneDisplay}</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
