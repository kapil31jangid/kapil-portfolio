"use client";

import { articles, projects } from "@/data/portfolio";
import { ExternalLink, Github, PenTool } from "lucide-react";

export function SignalsEditorial() {
  const openSourceProjects = projects.filter((p) => p.github);

  return (
    <section id="blogs" className="storm-section env-lightning-white py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto w-full relative z-20">
        {/* Section Header */}
        <div className="mb-14">
          <span className="section-label text-indigo-700">{"// SECTION 08 — SILVER EDITORIAL"}</span>
          <h2 className="title-oversized text-slate-950">SIGNALS & PUBLICATION</h2>
          <p className="text-slate-700 font-mono text-sm uppercase tracking-wider mt-2">
            Technical Writing Archive & Open Source Repositories
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Featured Technical Article */}
          <div className="lg:col-span-7 bg-white border border-slate-300 rounded-xl p-8 shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-bold text-indigo-700 uppercase tracking-widest flex items-center gap-1.5">
                  <PenTool size={14} /> FEATURED PUBLICATION
                </span>
                <span className="font-mono text-xs font-bold px-2.5 py-1 bg-amber-100 text-amber-800 rounded border border-amber-300">
                  COMING SOON
                </span>
              </div>

              {articles.map((art) => (
                <div key={art.title} className="my-4">
                  <span className="font-mono text-xs font-semibold text-slate-500 uppercase">
                    Category: {art.category}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-950 mt-1 mb-3">
                    {art.title}
                  </h3>
                  <p className="text-slate-700 font-sans text-sm sm:text-base leading-relaxed">
                    {art.summary}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-slate-200 mt-6 flex justify-between items-center text-xs font-mono text-slate-500">
              <span>VERIFIED DRAFT</span>
              <span className="text-indigo-600 font-bold">RESEARCH IN PROGRESS</span>
            </div>
          </div>

          {/* Open Source Public Directory */}
          <div className="lg:col-span-5 bg-slate-100 border border-slate-300 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4 border-b border-slate-300 pb-3">
              <span className="font-mono text-xs font-bold text-slate-950 uppercase tracking-wider flex items-center gap-1.5">
                <Github size={16} /> OPEN SOURCE DIRECTORY
              </span>
              <span className="font-mono text-xs text-indigo-700 font-bold">
                {openSourceProjects.length} REPOSITORIES
              </span>
            </div>

            <div className="space-y-3">
              {openSourceProjects.map((p) => (
                <div
                  key={p.id}
                  className="p-3.5 bg-white border border-slate-300 rounded hover:border-indigo-500 transition flex justify-between items-center"
                >
                  <div>
                    <h4 className="font-display font-bold text-slate-950 text-base">
                      {p.name}
                    </h4>
                    <p className="text-slate-600 text-xs font-mono truncate max-w-[220px]">
                      {p.stack.join(" · ")}
                    </p>
                  </div>

                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-slate-900 text-white rounded hover:bg-indigo-600 transition"
                      aria-label={`Open ${p.name} on GitHub`}
                    >
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
