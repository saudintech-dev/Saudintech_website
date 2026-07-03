import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getDictionary, isLocale, locales, type Locale } from "@/lib/dictionaries";
import { serviceSlugs, isServiceSlug, serviceIcons } from "@/lib/services";
import { siteConfig } from "@/lib/site-config";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollFx from "@/components/ScrollFx";
import { IconCheck } from "@/components/icons";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => serviceSlugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !isServiceSlug(slug)) notFound();
  const dict = getDictionary(locale);
  const sp = dict.servicePages[slug];
  const regionSuffix = locale === "ar" ? "في السعودية" : "in Saudi Arabia";

  return {
    title: `${sp.title} ${regionSuffix}`,
    description: sp.intro,
    alternates: {
      canonical: `/${locale}/services/${slug}`,
      languages: {
        en: `/en/services/${slug}`,
        ar: `/ar/services/${slug}`,
        "x-default": `/en/services/${slug}`,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "ar" ? "ar_SA" : "en_US",
      url: `/${locale}/services/${slug}`,
      siteName: siteConfig.name,
      title: `${sp.title} — ${siteConfig.name}`,
      description: sp.intro,
      images: [{ url: `/${locale}/opengraph-image`, width: 1200, height: 630, alt: sp.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${sp.title} — ${siteConfig.name}`,
      description: sp.intro,
      images: [`/${locale}/opengraph-image`],
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !isServiceSlug(slug)) notFound();

  const dict = getDictionary(locale);
  const sp = dict.servicePages[slug];
  const ui = dict.servicePage;
  const Icon = serviceIcons[slug];
  const other: Locale = (locale as Locale) === "ar" ? "en" : "ar";

  const others = serviceSlugs.filter((s) => s !== slug);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: ui.breadcrumbHome, item: `${siteConfig.url}/${locale}` },
      { "@type": "ListItem", position: 2, name: sp.title, item: `${siteConfig.url}/${locale}/services/${slug}` },
    ],
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: sp.title,
    description: sp.intro,
    serviceType: sp.title,
    provider: { "@type": "ProfessionalService", name: siteConfig.name, url: `${siteConfig.url}/${locale}` },
    areaServed: { "@type": "Country", name: "Saudi Arabia" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />

      <ScrollFx />
      <Navbar
        nav={dict.nav}
        base={`/${locale}`}
        homeHref={`/${locale}`}
        switchHref={`/${other}/services/${slug}`}
      />

      <main id="main-content" className="service-page">
        <section className="service-hero">
          <div className="service-hero-bg" aria-hidden="true"></div>
          <div className="container">
            <nav className="service-breadcrumb" aria-label="Breadcrumb">
              <Link href={`/${locale}`}>{ui.breadcrumbHome}</Link>
              <span aria-hidden="true">/</span>
              <Link href={`/${locale}#services-wrapper`}>{ui.breadcrumbServices}</Link>
            </nav>
            <div className="service-hero-icon">
              <Icon size={34} />
            </div>
            <div className="section-tag">{ui.eyebrow}</div>
            <h1 className="service-title">{sp.title}</h1>
            <p className="service-tagline">{sp.tagline}</p>
            <p className="service-intro">{sp.intro}</p>
            <div className="service-hero-actions">
              <a href={`/${locale}#contact`} className="btn btn-primary btn-lg">
                {ui.ctaButton}
              </a>
            </div>
          </div>
        </section>

        <section className="service-body section">
          <div className="container service-columns">
            <div className="service-col">
              <h2 className="service-col-title">{ui.featuresTitle}</h2>
              <ul className="service-feature-list">
                {sp.features.map((f) => (
                  <li key={f}>
                    <span className="service-feature-check" aria-hidden="true">
                      <IconCheck size={16} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="service-col">
              <h2 className="service-col-title">{ui.outcomesTitle}</h2>
              <ul className="service-outcome-list">
                {sp.outcomes.map((o) => (
                  <li key={o}>{o}</li>
                ))}
              </ul>
              <div className="service-cta-card">
                <h3>{ui.ctaTitle}</h3>
                <p>{ui.ctaText}</p>
                <a href={`/${locale}#contact`} className="btn btn-primary">
                  {ui.ctaButton}
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="service-others section">
          <div className="container">
            <h2 className="service-col-title">{ui.otherServices}</h2>
            <div className="service-others-grid">
              {others.map((s) => {
                const OtherIcon = serviceIcons[s];
                return (
                  <Link key={s} href={`/${locale}/services/${s}`} className="service-other-card">
                    <span className="service-other-icon">
                      <OtherIcon size={22} />
                    </span>
                    <span className="service-other-name">{dict.servicePages[s].title}</span>
                    <span className="service-other-arrow" aria-hidden="true">→</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer footer={dict.footer} base={`/${locale}`} />
    </>
  );
}
