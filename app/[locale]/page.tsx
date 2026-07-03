import { getDictionary, isLocale } from "@/lib/dictionaries";
import { notFound } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import ScrollFx from "@/components/ScrollFx";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustSection from "@/components/TrustSection";
import ServicesPinned from "@/components/ServicesPinned";
import Industries from "@/components/Industries";
import Solutions from "@/components/Solutions";
import ProcessPinned from "@/components/ProcessPinned";
import Showcase from "@/components/Showcase";
import Comparison from "@/components/Comparison";
import Commitments from "@/components/Commitments";
import About from "@/components/About";
import Faq from "@/components/Faq";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  const businessJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    url: `${siteConfig.url}/${locale}`,
    email: siteConfig.email,
    telephone: siteConfig.phoneE164,
    description: dict.meta.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.location.city,
      addressCountry: siteConfig.location.country,
    },
    areaServed: { "@type": "Country", name: "Saudi Arabia" },
    knowsLanguage: ["en", "ar"],
    sameAs: Object.values(siteConfig.socials).filter(Boolean),
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: dict.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <ScrollFx />
      <Navbar nav={dict.nav} />
      <main id="main-content">

        <Hero hero={dict.hero} mock={dict.mock} />
        <TrustSection trust={dict.trust} />
        <ServicesPinned services={dict.services} locale={locale} />
        <Industries industries={dict.industries} />
        <Solutions solutions={dict.solutions} />
        <ProcessPinned process={dict.process} />
        <Showcase showcase={dict.showcase} />
        <Comparison comparison={dict.comparison} />
        <Commitments commitments={dict.commitments} />
        <About about={dict.about} />
        <Faq faq={dict.faq} />
        <CtaSection cta={dict.cta} contactForm={dict.contactForm} />
      </main>
      <Footer footer={dict.footer} />
    </>
  );
}
