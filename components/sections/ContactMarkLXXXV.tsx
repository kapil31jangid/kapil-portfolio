"use client";

import { FormEvent, useState } from "react";
import { Download, Github, Linkedin, Mail, Send, CheckCircle2, RotateCcw } from "lucide-react";
import { siteConfig, projectTypes } from "@/data/portfolio";

interface ContactMarkLXXXVProps {
  onRestart?: () => void;
}

export function ContactMarkLXXXV({ onRestart }: ContactMarkLXXXVProps) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "");
    const email = String(form.get("email") || "");
    const projectType = String(form.get("project-type") || "");
    const message = String(form.get("message") || "");

    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
      `Portfolio Inquiry from ${name} — ${projectType}`
    )}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\nType: ${projectType}\n\n${message}`)}`;

    setSubmitted(true);
  };

  return (
    <div className="relative w-full py-8">
      {/* Red-gold convergence glow at base */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-80 bg-[radial-gradient(ellipse_at_bottom,rgba(143,16,21,0.25),transparent_70%)] pointer-events-none blur-3xl" />

      <div className="relative z-10">
        {/* Monumental headline */}
        <div className="mb-12">
          <h3 className="font-display text-4xl sm:text-6xl font-black text-white uppercase tracking-tight leading-none mb-3">
            {"Let's build something intelligent."}
          </h3>
          <p className="text-amber-300 font-mono text-sm uppercase tracking-wider">
            {siteConfig.contactAvailability}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Direct channels column */}
          <div className="lg:col-span-4 space-y-4">
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-3 p-4 bg-slate-900 border border-red-700/40 hover:border-red-500 hover:bg-slate-800 transition group"
              style={{ clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)" }}
            >
              <div className="p-2.5 bg-red-600/25 text-red-400 group-hover:bg-red-600 group-hover:text-white transition rounded-sm">
                <Mail size={18} />
              </div>
              <div>
                <span className="font-mono text-[10px] text-slate-400 uppercase block">Direct Email</span>
                <span className="font-mono text-sm font-bold text-white">{siteConfig.email}</span>
              </div>
            </a>

            <div className="grid grid-cols-2 gap-3">
              <a
                href="https://github.com/kapil31jangid"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3.5 bg-slate-900 border border-slate-700 text-slate-300 hover:text-amber-400 hover:border-amber-500 transition font-mono text-xs"
                style={{ clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)" }}
              >
                <Github size={15} /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/kapil31jangid"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3.5 bg-slate-900 border border-slate-700 text-slate-300 hover:text-amber-400 hover:border-amber-500 transition font-mono text-xs"
                style={{ clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)" }}
              >
                <Linkedin size={15} /> LinkedIn
              </a>
            </div>

            <a
              href={siteConfig.resumePath}
              download
              className="flex items-center justify-center gap-2 p-3.5 bg-amber-600/20 border border-amber-500/50 text-amber-300 hover:bg-amber-600/35 transition font-mono text-xs font-bold uppercase tracking-wider w-full"
              style={{ clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)" }}
            >
              <Download size={15} /> Download Résumé (PDF)
            </a>

            <div className="p-3.5 bg-slate-950 border border-slate-800 font-mono text-xs text-slate-500 flex justify-between">
              <span>AHMEDABAD, INDIA</span>
              <span className="text-amber-400 font-bold">UTC +5:30 (IST)</span>
            </div>
          </div>

          {/* Contact form column */}
          <div className="lg:col-span-8">
            <div
              className="bg-[#0A0D15] border-2 border-red-700/40 p-6 sm:p-8 shadow-2xl"
              style={{ clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))" }}
            >
              <h4 className="font-display text-2xl font-bold text-white uppercase mb-6">
                Initiate Transmission
              </h4>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-name" className="font-mono text-xs text-slate-400 uppercase tracking-wider block mb-2">
                      Your Name *
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      placeholder="e.g. Alex Mercer"
                      className="w-full bg-slate-950 border border-slate-700 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500/50 p-3 text-sm text-white font-sans transition"
                      style={{ clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)" }}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="font-mono text-xs text-slate-400 uppercase tracking-wider block mb-2">
                      Your Email *
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      placeholder="e.g. alex@company.com"
                      className="w-full bg-slate-950 border border-slate-700 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500/50 p-3 text-sm text-white font-sans transition"
                      style={{ clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)" }}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="project-type" className="font-mono text-xs text-slate-400 uppercase tracking-wider block mb-2">
                    Engagement Type
                  </label>
                  <select
                    id="project-type"
                    name="project-type"
                    className="w-full bg-slate-950 border border-slate-700 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500/50 p-3 text-sm text-white font-sans transition"
                    style={{ clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)" }}
                  >
                    {projectTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-message" className="font-mono text-xs text-slate-400 uppercase tracking-wider block mb-2">
                    Message / Project Details *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    minLength={15}
                    rows={5}
                    placeholder="Tell Kapil about your project, idea, or opportunity..."
                    className="w-full bg-slate-950 border border-slate-700 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500/50 p-3 text-sm text-white font-sans resize-y transition"
                    style={{ clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)" }}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-red-600 hover:bg-red-500 text-white font-bold font-mono text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition shadow-[0_0_20px_rgba(209,26,34,0.4)]"
                  style={{ clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))" }}
                >
                  <Send size={15} /> Transmit Message
                </button>

                {submitted && (
                  <div className="p-3 bg-red-950/60 border border-red-500/60 text-red-200 text-xs font-mono flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-red-400" /> Opening mail application — transmission initiated.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Restart Evolution control + Footer attribution */}
        <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-6">
          {onRestart && (
            <button
              type="button"
              onClick={onRestart}
              className="flex items-center gap-2 px-6 py-3 bg-slate-900 border border-amber-500/40 text-amber-300 hover:border-amber-400 hover:text-amber-200 font-mono text-xs font-bold uppercase tracking-widest transition"
              style={{ clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))" }}
            >
              <RotateCcw size={14} /> Restart Evolution
            </button>
          )}
          <div className="flex flex-col sm:flex-row gap-3 text-xs font-mono text-slate-500 text-center sm:text-right">
            <span>© 2026 KAPIL JANGID — KJ ARC PROTOCOL</span>
            <span className="hidden sm:inline text-slate-700">·</span>
            <span>NEXT.JS · TAILWIND · FRAMER MOTION</span>
          </div>
        </div>
      </div>
    </div>
  );
}
