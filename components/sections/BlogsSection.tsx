"use client";

import { useArmourTheme } from "@/components/context/ArmourThemeProvider";
import { articles } from "@/data/portfolio";
import { BookOpen, ExternalLink } from "lucide-react";

export function BlogsSection() {
  const { activeSuit } = useArmourTheme();

  return (
    <section id="blogs" className="relative w-full py-16 px-4 sm:px-8 lg:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <div className="mb-8 pb-3 border-b border-slate-800 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <span
              className="px-3 py-1 font-mono text-xs font-bold rounded uppercase tracking-wider text-slate-950 shadow"
              style={{ backgroundColor: activeSuit.energyColor }}
            >
              ANALYTICAL // BLOGS
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white uppercase tracking-wider">
              TECHNICAL PUBLICATIONS & INSIGHTS
            </h2>
          </div>

          <span className="font-mono text-xs text-amber-400 font-bold uppercase tracking-widest">
            {"THEME: " + activeSuit.markNumber}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Featured Article Showcase */}
          <div className="lg:col-span-8">
            {articles.slice(0, 1).map((article) => (
              <div
                key={article.title}
                className="armour-plate-surface rounded-2xl p-8 border shadow-2xl transition-all duration-500"
                style={{ borderColor: activeSuit.secondaryColor }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="px-3 py-1 bg-amber-500 text-slate-950 font-mono text-xs font-bold uppercase tracking-widest rounded-sm">
                    {article.category}
                  </span>
                  <span className={`font-mono text-xs px-2 py-1 rounded-sm font-bold uppercase ${
                    article.status === "coming-soon"
                      ? "bg-slate-800 text-slate-400 border border-slate-700"
                      : "bg-cyan-950 text-cyan-300 border border-cyan-500"
                  }`}>
                    {article.status === "coming-soon" ? "COMING SOON" : "PUBLISHED"}
                  </span>
                </div>

                <h3 className="font-display text-3xl sm:text-4xl font-bold text-white uppercase tracking-tight leading-tight mb-4">
                  {article.title}
                </h3>

                <p className="text-slate-300 text-base leading-relaxed mb-6 font-sans max-w-2xl">
                  {article.summary}
                </p>

                {article.url ? (
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold uppercase tracking-widest rounded transition shadow-lg focus-ring"
                  >
                    <ExternalLink size={14} /> Read Article
                  </a>
                ) : (
                  <div className="inline-flex items-center gap-2 px-5 py-3 bg-slate-900 border border-slate-700 text-slate-500 font-mono text-xs font-bold uppercase tracking-widest rounded cursor-not-allowed">
                    <BookOpen size={14} /> Publication Pending
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Editorial Context Column */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div className="bg-slate-950/90 border border-slate-800 p-6 rounded-xl mb-4">
              <span className="font-mono text-xs font-bold text-amber-400 uppercase tracking-widest block mb-3">
                {"// ANALYTICAL FOCUS"}
              </span>
              <p className="text-slate-300 text-sm leading-relaxed">
                Exploring the inference pipelines, system architectures, and engineering decisions behind intelligent applications and generative AI platforms.
              </p>
            </div>

            <div className="bg-slate-950/90 border border-slate-800 p-6 rounded-xl">
              <span className="font-mono text-xs font-bold text-slate-400 uppercase tracking-widest block mb-3">
                {"// CORE TOPICS"}
              </span>
              <div className="flex flex-wrap gap-2">
                {["LLM Inference", "RAG Systems", "Full-Stack AI", "FastAPI Pipelines", "Production GenAI"].map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 bg-slate-900 border border-slate-700 text-slate-300 font-mono text-[10px] rounded-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
