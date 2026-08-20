"use client";

import { articles } from "@/data/portfolio";
import { BookOpen, ExternalLink } from "lucide-react";

export function BlogsMarkXLII() {
  return (
    <div className="relative w-full py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Featured Article — Dominant Composition */}
        <div className="lg:col-span-8">
          {articles.slice(0, 1).map((article) => (
            <div
              key={article.title}
              className="relative bg-gradient-to-br from-[#1A0A0A] via-[#0B0F19] to-[#020305] border-2 border-red-700/50 p-8 shadow-2xl"
              style={{ clipPath: "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))" }}
            >
              {/* Category badge */}
              <div className="flex items-center gap-3 mb-5">
                <span className="px-3 py-1 bg-amber-600/80 text-slate-950 font-mono text-xs font-bold uppercase tracking-widest rounded-sm">
                  {article.category}
                </span>
                <span className={`font-mono text-xs px-2 py-1 rounded-sm font-bold uppercase ${
                  article.status === "coming-soon"
                    ? "bg-slate-800 text-slate-400 border border-slate-600"
                    : "bg-cyan-900 text-cyan-300 border border-cyan-600"
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
                  className="inline-flex items-center gap-2 px-5 py-3 bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold uppercase tracking-widest rounded-sm transition shadow-[0_0_16px_rgba(209,26,34,0.4)]"
                >
                  <ExternalLink size={14} /> Read Article
                </a>
              ) : (
                <div className="inline-flex items-center gap-2 px-5 py-3 bg-slate-900 border border-slate-700 text-slate-500 font-mono text-xs font-bold uppercase tracking-widest rounded-sm cursor-not-allowed">
                  <BookOpen size={14} /> Publication Pending
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Editorial Side Column — Writing Philosophy */}
        <div className="lg:col-span-4 flex flex-col justify-between">
          <div className="bg-[#0B0F19] border border-amber-500/30 p-6 mb-4"
            style={{ clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)" }}
          >
            <span className="font-mono text-xs font-bold text-amber-400 uppercase tracking-widest block mb-3">
              {"// ANALYTICAL MISSION"}
            </span>
            <p className="text-slate-300 text-sm leading-relaxed">
              Writing about the systems and ideas driving AI-powered development. Each article dissects real engineering decisions and emerging intelligent systems.
            </p>
          </div>

          <div className="bg-slate-950/80 border border-slate-700 p-6"
            style={{ clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)" }}
          >
            <span className="font-mono text-xs font-bold text-slate-400 uppercase tracking-widest block mb-3">
              {"// TOPICS COVERED"}
            </span>
            <div className="flex flex-wrap gap-2">
              {["LLM Architecture", "Retrieval-Augmented Generation", "Full-Stack AI", "Product Engineering", "GenAI Systems"].map((tag) => (
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
  );
}
