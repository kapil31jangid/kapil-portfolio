"use client";

import { FormEvent, useState } from "react";
import { Github, Linkedin, Mail, Send } from "lucide-react";
import {
  budgetRanges,
  projectTypes,
  siteConfig,
  socialLinks,
} from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { CyberFrame } from "@/components/ui/CyberFrame";
import { cn } from "@/utils/cn";

type FormState = "idle" | "success" | "error";

type FormData = {
  name: string;
  email: string;
  organisation: string;
  projectType: string;
  budget: string;
  message: string;
};

const initialForm: FormData = {
  name: "",
  email: "",
  organisation: "",
  projectType: projectTypes[0],
  budget: budgetRanges[0],
  message: "",
};

export function Contact() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );
  const [status, setStatus] = useState<FormState>("idle");
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const nextErrors: Partial<Record<keyof FormData, string>> = {};

    if (!form.name.trim()) nextErrors.name = "Please enter your name.";
    if (!form.email.trim()) {
      nextErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!form.message.trim()) {
      nextErrors.message = "Please include a short message.";
    } else if (form.message.trim().length < 20) {
      nextErrors.message = "Please provide at least 20 characters.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setStatus("idle");

    try {
      const subject = encodeURIComponent(
        `[Portfolio Contact] ${form.projectType} — ${form.name}`
      );
      const body = encodeURIComponent(
        [
          `Name: ${form.name}`,
          `Email: ${form.email}`,
          form.organisation ? `Organisation: ${form.organisation}` : null,
          `Project type: ${form.projectType}`,
          form.budget !== "Not specified" ? `Budget range: ${form.budget}` : null,
          "",
          "Message:",
          form.message,
        ]
          .filter(Boolean)
          .join("\n")
      );

      const endpoint = process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT;

      if (endpoint) {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });

        if (!response.ok) throw new Error("Submission failed");
      } else {
        window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
      }

      setStatus("success");
      setForm(initialForm);
    } catch {
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  const updateField = (field: keyof FormData, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
  };

  return (
    <section id="contact" className="relative py-24 bg-bg-primary">
      <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" aria-hidden="true" />
      
      <div className="section-shell relative">
        <SectionHeading
          index="08"
          eyebrow="Connect"
          title="Initiate Contact"
          description={siteConfig.contactAvailability}
        />

        {/* Cinematic split final layout */}
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] items-start mt-12">
          
          {/* Left panel: Info & Availability */}
          <div className="space-y-6">
            <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold uppercase tracking-wider text-text-chrome leading-tight">
              Let&apos;s build <span className="text-cyan">something intelligent</span>.
            </h3>
            
            <p className="text-xs text-text-secondary leading-relaxed font-sans">
              Connect to collaborate on generative AI integrations, software development, MVPs, or technical mentorship projects.
            </p>

            <div className="circuit-divider my-6" aria-hidden="true" />

            {/* Direct Links matrix */}
            <div className="space-y-3">
              {socialLinks.map((link) => {
                const icons = {
                  github: Github,
                  linkedin: Linkedin,
                  email: Mail,
                };
                const Icon = icons[link.icon];

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className="focus-ring flex items-center justify-between border border-border-subtle/50 bg-bg-secondary/40 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-text-secondary transition-all hover:border-cyan/40 hover:text-cyan clip-corner-sm"
                    {...(link.icon !== "email"
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      <span>{link.label}</span>
                    </div>
                    <span className="font-mono text-[9px] opacity-30">
                      {"// DIRECT_LINE"}
                    </span>
                  </a>
                );
              })}
            </div>
            
            {/* System Coordinates Info */}
            <div className="border border-border-subtle bg-bg-secondary/40 p-4 clip-corner-sm font-mono text-[10px] text-text-secondary/60">
              <div className="flex justify-between">
                <span>LOCAL_TIME:</span>
                <span className="text-cyan font-bold">IST (UTC +5:30)</span>
              </div>
              <div className="flex justify-between mt-1">
                <span>INBOX_STATUS:</span>
                <span className="text-text-chrome">MONITORED_DAILY</span>
              </div>
            </div>
          </div>

          {/* Right panel: Dark Angular Contact Form (Subtle border, no cyan glow) */}
          <CyberFrame variant="subtle" className="p-6 sm:p-8" clip="all" glow="none">
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <span className="font-mono text-[9px] text-cyan font-bold uppercase tracking-widest block mb-1">
                {"[ CONTACT_PORTAL // SECURE ]"}
              </span>
              
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="mb-2 block font-mono text-[9px] font-bold uppercase text-text-secondary">
                    Name <span className="text-cyan">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "contact-name-error" : undefined}
                    className={cn("field-input w-full", errors.name && "field-error")}
                  />
                  {errors.name && (
                    <p id="contact-name-error" className="mt-1.5 font-mono text-[9px] text-magenta">
                      ! {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-email" className="mb-2 block font-mono text-[9px] font-bold uppercase text-text-secondary">
                    Email <span className="text-cyan">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "contact-email-error" : undefined}
                    className={cn("field-input w-full", errors.email && "field-error")}
                  />
                  {errors.email && (
                    <p id="contact-email-error" className="mt-1.5 font-mono text-[9px] text-magenta">
                      ! {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="contact-organisation" className="mb-2 block font-mono text-[9px] font-bold uppercase text-text-secondary">
                  Organisation
                </label>
                <input
                  id="contact-organisation"
                  type="text"
                  value={form.organisation}
                  onChange={(e) => updateField("organisation", e.target.value)}
                  className="field-input w-full"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-project-type" className="mb-2 block font-mono text-[9px] font-bold uppercase text-text-secondary">
                    Project Type <span className="text-cyan">*</span>
                  </label>
                  <select
                    id="contact-project-type"
                    value={form.projectType}
                    onChange={(e) => updateField("projectType", e.target.value)}
                    className="field-input w-full cursor-pointer"
                  >
                    {projectTypes.map((opt) => (
                      <option key={opt} value={opt} className="bg-bg-secondary text-text-chrome">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-budget" className="mb-2 block font-mono text-[9px] font-bold uppercase text-text-secondary">
                    Budget Range
                  </label>
                  <select
                    id="contact-budget"
                    value={form.budget}
                    onChange={(e) => updateField("budget", e.target.value)}
                    className="field-input w-full cursor-pointer"
                  >
                    {budgetRanges.map((opt) => (
                      <option key={opt} value={opt} className="bg-bg-secondary text-text-chrome">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className="mb-2 block font-mono text-[9px] font-bold uppercase text-text-secondary">
                  Message <span className="text-cyan">*</span>
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  required
                  value={form.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "contact-message-error" : undefined}
                  className={cn("field-input w-full resize-none", errors.message && "field-error")}
                  placeholder="Describe details, parameters and target objectives..."
                />
                {errors.message && (
                  <p id="contact-message-error" className="mt-1.5 font-mono text-[9px] text-magenta">
                    ! {errors.message}
                  </p>
                )}
              </div>

              {status === "success" && (
                <div role="status" className="border border-cyan/30 bg-cyan/5 p-3 font-mono text-[10px] text-cyan clip-corner-sm uppercase tracking-wide">
                  {"[ TRANSMISSION SUCCESSFUL // DRAFT READY TO DISPATCH VIA EMAIL CLIENT ]"}
                </div>
              )}

              {status === "error" && (
                <div role="alert" className="border border-magenta/30 bg-magenta/5 p-3 font-mono text-[10px] text-magenta clip-corner-sm uppercase tracking-wide">
                  {"[ ERROR: TRANSMISSION FAILURE // TRY DIRECT MAILTO LINK ]"}
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                disabled={submitting}
                className="w-full sm:w-auto"
              >
                <Send className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{submitting ? "Transmitting..." : "Send Message"}</span>
              </Button>
            </form>
          </CyberFrame>
        </div>
      </div>
    </section>
  );
}
