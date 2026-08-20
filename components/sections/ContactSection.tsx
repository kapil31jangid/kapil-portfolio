"use client";

import { FormEvent, useState } from "react";
import { useArmourTheme } from "@/components/context/ArmourThemeProvider";
import { Download, Github, Linkedin, Mail, Send, CheckCircle2, RotateCcw } from "lucide-react";
import { siteConfig, projectTypes } from "@/data/portfolio";

export function ContactSection() {
  const { activeSuit, setSuitId } = useArmourTheme();
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

  const handleRestart = () => {
    setSuitId("mark-3");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section id="contact" className="relative w-full py-16 px-4 sm:px-8 lg:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <div className="mb-10 pb-3 border-b border-slate-800 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <span
              className="px-3 py-1 font-mono text-xs font-bold rounded uppercase tracking-wider text-slate-950 shadow"
              style={{ backgroundColor: activeSuit.energyColor }}
            >
              FINALE // CONTACT
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white uppercase tracking-wider">
              INITIATE COLLABORATION
            </h2>
          </div>

          <span className="font-mono text-xs text-amber-400 font-bold uppercase tracking-widest">
            {"THEME: " + activeSuit.label}
          </span>
        </div>

        {/* Monumental Headline */}
        <div className="mb-12">
          <h3 className="font-display text-4xl sm:text-6xl font-black text-white uppercase tracking-tight leading-none mb-3">
            {"Let's build something intelligent."}
          </h3>
          <p className="text-amber-300 font-mono text-sm uppercase tracking-wider">
            {siteConfig.contactAvailability}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Direct Contact Channels */}
          <div className="lg:col-span-4 space-y-4">
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-3 p-4 bg-slate-900 border border-slate-800 hover:border-red-500 hover:bg-slate-800 transition rounded-xl group focus-ring"
            >
              <div className="p-2.5 bg-red-600/20 text-red-400 group-hover:bg-red-600 group-hover:text-white transition rounded-lg">
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
                className="flex items-center gap-2 p-3.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-300 hover:text-amber-400 hover:border-amber-500 transition font-mono text-xs focus-ring"
              >
                <Github size={15} /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/kapil31jangid"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-300 hover:text-amber-400 hover:border-amber-500 transition font-mono text-xs focus-ring"
              >
                <Linkedin size={15} /> LinkedIn
              </a>
            </div>

            <a
              href={siteConfig.resumePath}
              download
              className="flex items-center justify-center gap-2 p-3.5 bg-amber-600/20 border border-amber-500/50 text-amber-300 hover:bg-amber-600/35 transition font-mono text-xs font-bold uppercase tracking-wider rounded-xl w-full focus-ring"
            >
              <Download size={15} /> Download Résumé (PDF)
            </a>

            <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl font-mono text-xs text-slate-400 flex justify-between">
              <span>AHMEDABAD, INDIA</span>
              <span className="text-amber-400 font-bold">UTC +5:30 (IST)</span>
            </div>
          </div>

          {/* Direct Message Form */}
          <div className="lg:col-span-8">
            <div
              className="armour-plate-surface rounded-2xl p-6 sm:p-8 shadow-2xl border transition-all duration-500"
              style={{ borderColor: activeSuit.secondaryColor }}
            >
              <h4 className="font-display text-2xl font-bold text-white uppercase mb-6">
                Send Direct Message
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
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white font-sans focus:outline-none focus:border-red-500 transition focus-ring"
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
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white font-sans focus:outline-none focus:border-red-500 transition focus-ring"
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
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white font-sans focus:outline-none focus:border-red-500 transition focus-ring"
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
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white font-sans resize-y focus:outline-none focus:border-red-500 transition focus-ring"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-red-600 hover:bg-red-500 text-white font-bold font-mono text-xs uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 transition shadow-[0_0_20px_rgba(209,26,34,0.4)] focus-ring"
                >
                  <Send size={15} /> Transmit Message
                </button>

                {submitted && (
                  <div className="p-3.5 bg-slate-950 border border-red-500 text-red-300 text-xs font-mono rounded-lg flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-red-400" /> Opening mail application — transmission initiated.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Footer & Restart Evolution Control */}
        <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-6">
          <button
            type="button"
            onClick={handleRestart}
            className="flex items-center gap-2 px-6 py-3 bg-slate-900 border border-amber-500/50 text-amber-300 hover:border-amber-400 hover:bg-slate-800 rounded-lg font-mono text-xs font-bold uppercase tracking-widest transition focus-ring"
          >
            <RotateCcw size={14} /> Restart Evolution (Mark III Default)
          </button>
          <div className="flex flex-col sm:flex-row gap-3 text-xs font-mono text-slate-500 text-center sm:text-right">
            <span>© 2026 KAPIL JANGID — GLOBAL ARMOURY SYSTEM</span>
            <span className="hidden sm:inline text-slate-700">·</span>
            <span>NEXT.JS · TAILWIND · FRAMER MOTION</span>
          </div>
        </div>
      </div>
    </section>
  );
}
