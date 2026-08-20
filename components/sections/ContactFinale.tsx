"use client";

import { FormEvent, useState } from "react";
import { Download, Github, Linkedin, Mail, Send, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/data/portfolio";

export function ContactFinale() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "");
    const email = String(form.get("email") || "");
    const message = String(form.get("message") || "");

    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
      `Portfolio Inquiry from ${name}`
    )}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;

    setSubmitted(true);
  };

  return (
    <section id="contact" className="storm-section env-storm-black py-28 relative overflow-hidden">
      {/* Background Energy Glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] bg-[radial-gradient(ellipse_at_bottom,rgba(47,140,255,0.2),transparent_70%)] blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Section Header with Monumental Finale Statement */}
        <div className="mb-16">
          <span className="section-label text-blue-400">{"// SECTION 10 — FINALE"}</span>
          <h2 className="title-oversized text-white max-w-5xl leading-none">
            LET’S BUILD SOMETHING INTELLIGENT.
          </h2>
          <p className="text-slate-400 font-mono text-base uppercase tracking-wider mt-4">
            Open for Internships, Freelance Collaborations & Full-Stack Engineering Roles
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Direct Channels */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            <div>
              <p className="text-slate-300 text-base leading-relaxed mb-8 font-sans">
                {siteConfig.contactAvailability}
              </p>

              <div className="space-y-4 mb-8">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-3 p-4 bg-slate-900 border border-blue-500/40 rounded-xl text-blue-300 hover:border-blue-400 hover:text-white transition group shadow-lg"
                >
                  <div className="p-3 bg-blue-600/20 text-blue-400 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition">
                    <Mail size={20} />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-slate-400 uppercase block">
                      DIRECT EMAIL
                    </span>
                    <span className="font-mono text-sm font-bold">
                      {siteConfig.email}
                    </span>
                  </div>
                </a>

                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="https://github.com/kapil31jangid"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-300 hover:border-blue-500 transition text-xs font-mono"
                  >
                    <Github size={16} className="text-blue-400" /> GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/kapil31jangid"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-300 hover:border-blue-500 transition text-xs font-mono"
                  >
                    <Linkedin size={16} className="text-blue-400" /> LinkedIn
                  </a>
                </div>

                <a
                  href={siteConfig.resumePath}
                  download
                  className="flex items-center justify-center gap-2 p-4 bg-blue-600/25 border border-blue-500/50 rounded-xl text-blue-300 hover:bg-blue-600/40 transition text-xs font-mono font-bold uppercase tracking-wider w-full"
                >
                  <Download size={16} /> Download Full Résumé (PDF)
                </a>
              </div>
            </div>

            <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl text-xs font-mono text-slate-400 flex items-center justify-between">
              <span>LOCATION: AHMEDABAD, INDIA</span>
              <span className="text-blue-400 font-bold">UTC +5:30 (IST)</span>
            </div>
          </div>

          {/* Compact Contact Form */}
          <div className="lg:col-span-7 gunmetal-surface engraved-border rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-md">
            <h3 className="font-display text-2xl font-bold text-white mb-6 uppercase">
              Send Direct Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="font-mono text-xs text-slate-400 uppercase tracking-wider block mb-2">
                  Your Name *
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="e.g. Alex Mercer"
                  className="w-full bg-slate-950 border border-slate-800 rounded p-3 text-sm text-white focus:outline-none focus:border-blue-500 font-sans"
                />
              </div>

              <div>
                <label className="font-mono text-xs text-slate-400 uppercase tracking-wider block mb-2">
                  Your Email *
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="e.g. alex@company.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded p-3 text-sm text-white focus:outline-none focus:border-blue-500 font-sans"
                />
              </div>

              <div>
                <label className="font-mono text-xs text-slate-400 uppercase tracking-wider block mb-2">
                  Message / Project Details *
                </label>
                <textarea
                  name="message"
                  required
                  minLength={15}
                  rows={4}
                  placeholder="Tell Kapil about your project, idea, or opportunity..."
                  className="w-full bg-slate-950 border border-slate-800 rounded p-3 text-sm text-white focus:outline-none focus:border-blue-500 font-sans resize-y"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-slate-950 font-bold font-mono text-xs uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 transition shadow-lg"
              >
                <Send size={15} /> Send Message (via Email)
              </button>

              {submitted && (
                <div className="p-3 bg-blue-950 border border-blue-500 text-blue-300 text-xs font-mono rounded-lg flex items-center gap-2">
                  <CheckCircle2 size={16} /> Opening default mail application...
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Footer Attribution Line */}
        <div className="mt-20 pt-8 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center text-xs font-mono text-slate-500 gap-4">
          <span>© 2026 KAPIL JANGID — STORMCORE PORTFOLIO</span>
          <span>BUILT WITH NEXT.JS, TAILWIND & FRAMER MOTION</span>
        </div>
      </div>
    </section>
  );
}
