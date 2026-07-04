"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/site-config";
import type { Dictionary } from "@/lib/dictionaries";
import { IconWhatsApp, IconMail, IconCheck } from "@/components/icons";

/**
 * "One question at a time" quote wizard. Tap-to-select chips for the first
 * steps (auto-advance), a short contact step, then a Done screen. On submit it
 * composes a WhatsApp message with all answers and opens it — no backend.
 */
export default function QuoteForm({ t }: { t: Dictionary["quoteForm"] }) {
  const chipSteps = t.steps.length;
  const totalSteps = chipSteps + 1; // chip steps + the contact step
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(false);
  const [done, setDone] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  const go = (next: number) => {
    setStep(next);
    setAnimKey((k) => k + 1);
  };

  const pick = (stepIdx: number, option: string) => {
    const a = [...answers];
    a[stepIdx] = option;
    setAnswers(a);
    window.setTimeout(() => go(stepIdx + 1), 160); // brief highlight, then advance
  };

  const buildBody = () => {
    const lines = [t.prefillIntro, ""];
    t.steps.forEach((s, i) => {
      if (answers[i]) lines.push(`• ${s.question} ${answers[i]}`);
    });
    if (name.trim()) lines.push(`• ${t.contactStep.nameLabel}: ${name}`);
    if (phone.trim()) lines.push(`• ${t.contactStep.phoneLabel}: ${phone}`);
    return lines.join("\n");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) {
      setError(true);
      return;
    }
    window.open(`${siteConfig.whatsapp}?text=${encodeURIComponent(buildBody())}`, "_blank", "noopener,noreferrer");
    setDone(true);
  };

  const emailHref =
    `mailto:${siteConfig.email}` +
    `?subject=${encodeURIComponent("Quote request — SaudinTech")}` +
    `&body=${encodeURIComponent(buildBody())}`;

  const reset = () => {
    setStep(0);
    setAnswers([]);
    setName("");
    setPhone("");
    setError(false);
    setDone(false);
    setAnimKey((k) => k + 1);
  };

  if (done) {
    return (
      <div className="quote-card">
        <div className="quote-eyebrow">{t.eyebrow}</div>
        <div className="quote-body quote-body--center" key="done">
          <div className="quote-done">
            <span className="quote-check" aria-hidden="true">
              <IconCheck size={30} color="#ffffff" />
            </span>
            <h3 className="quote-done-title">{t.done.title}</h3>
            <p className="quote-done-text">{t.done.text}</p>
            <button type="button" className="quote-restart" onClick={reset}>
              {t.done.again}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quote-card">
      <div className="quote-eyebrow">{t.eyebrow}</div>

      <div className="quote-progress" aria-hidden="true">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <span key={i} className={`quote-dot${i === step ? " active" : i < step ? " past" : ""}`} />
        ))}
      </div>
      <div className="quote-stepline">
        {t.step} {step + 1} {t.of} {totalSteps}
      </div>

      <div className="quote-body" key={animKey}>
        {step < chipSteps ? (
          <>
            <h3 className="quote-q">{t.steps[step].question}</h3>
            <div className="quote-options">
              {t.steps[step].options.map((opt, oi) => (
                <button
                  key={opt}
                  type="button"
                  className={`quote-chip${answers[step] === opt ? " selected" : ""}`}
                  style={{ animationDelay: `${oi * 0.05}s` }}
                  onClick={() => pick(step, opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="quote-contact" noValidate>
            <h3 className="quote-q">{t.contactStep.question}</h3>
            <label className="quote-label" htmlFor="qf-name">
              {t.contactStep.nameLabel}
            </label>
            <input
              id="qf-name"
              className="quote-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.contactStep.namePlaceholder}
              autoComplete="name"
            />
            <label className="quote-label" htmlFor="qf-phone">
              {t.contactStep.phoneLabel}
            </label>
            <input
              id="qf-phone"
              className="quote-input"
              type="tel"
              inputMode="tel"
              dir="ltr"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (error) setError(false);
              }}
              placeholder={t.contactStep.phonePlaceholder}
              autoComplete="tel"
              required
            />
            {error && <div className="quote-error">{t.contactStep.required}</div>}
            <button type="submit" className="btn btn-primary quote-submit">
              <IconWhatsApp size={18} />
              {t.contactStep.submit}
            </button>
            <a className="quote-email" href={emailHref}>
              <IconMail size={16} />
              {t.contactStep.emailInstead}
            </a>
          </form>
        )}
      </div>

      {step > 0 && (
        <button type="button" className="quote-back" onClick={() => go(step - 1)}>
          <span className="quote-back-arrow" aria-hidden="true">
            ←
          </span>
          {t.back}
        </button>
      )}
    </div>
  );
}
