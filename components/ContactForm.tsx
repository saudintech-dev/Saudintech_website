"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/site-config";
import type { Dictionary } from "@/lib/dictionaries";
import { IconWhatsApp, IconMail } from "@/components/icons";

/**
 * No-backend lead capture: the form composes a pre-filled message and hands it
 * to WhatsApp (primary) or the visitor's email client (fallback). WhatsApp is
 * the dominant business channel in Saudi Arabia, so leads land where the owner
 * already works — no server, database, or third-party signup required.
 */
export default function ContactForm({ t }: { t: Dictionary["contactForm"] }) {
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  function buildBody() {
    const lines = [t.prefillIntro, "", `• ${t.name}: ${name}`];
    if (business.trim()) lines.push(`• ${t.business}: ${business}`);
    if (phone.trim()) lines.push(`• ${t.phone}: ${phone}`);
    if (message.trim()) {
      lines.push("");
      lines.push(message);
    }
    return lines.join("\n");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setError(true);
      return;
    }
    setError(false);
    const url = `${siteConfig.whatsapp}?text=${encodeURIComponent(buildBody())}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  const emailHref =
    `mailto:${siteConfig.email}` +
    `?subject=${encodeURIComponent(`Website inquiry — ${name || "SaudinTech"}`)}` +
    `&body=${encodeURIComponent(buildBody())}`;

  return (
    <form className="contact-form-card" onSubmit={handleSubmit} noValidate>
      <div className="contact-form-heading">{t.heading}</div>

      <div className="contact-field">
        <label className="contact-label" htmlFor="cf-name">
          {t.name}
        </label>
        <input
          id="cf-name"
          className="contact-input"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (error) setError(false);
          }}
          placeholder={t.namePlaceholder}
          autoComplete="name"
          required
        />
      </div>

      <div className="contact-field">
        <label className="contact-label" htmlFor="cf-business">
          {t.business}
        </label>
        <input
          id="cf-business"
          className="contact-input"
          type="text"
          value={business}
          onChange={(e) => setBusiness(e.target.value)}
          placeholder={t.businessPlaceholder}
        />
      </div>

      <div className="contact-field">
        <label className="contact-label" htmlFor="cf-phone">
          {t.phone}
        </label>
        <input
          id="cf-phone"
          className="contact-input"
          type="tel"
          inputMode="tel"
          dir="ltr"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder={t.phonePlaceholder}
          autoComplete="tel"
        />
      </div>

      <div className="contact-field">
        <label className="contact-label" htmlFor="cf-message">
          {t.message}
        </label>
        <textarea
          id="cf-message"
          className="contact-textarea"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t.messagePlaceholder}
          rows={3}
        />
      </div>

      {error && <div className="contact-error">{t.required}</div>}

      <button type="submit" className="btn btn-primary contact-submit">
        <IconWhatsApp size={18} />
        {t.submit}
      </button>

      <a className="contact-email-link" href={emailHref}>
        <IconMail size={16} />
        {t.emailInstead}
      </a>
    </form>
  );
}
