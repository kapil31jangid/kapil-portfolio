"use client";

import { articles } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ExternalLink } from "lucide-react";

export function Blogs() {
  const featuredArticle = articles[0];

  return (
    <section id="blogs" className="relative py-24 bg-bg-secondary">
      <div className="absolute inset-0 grid-bg opacity-5 pointer-events-none" aria-hidden="true" />
      
      <div className="section-shell relative">
        <SectionHeading
          index="06"
          eyebrow="Insights"
          title="Technical Writing & Insights"
          description="Synthesizing concepts, system architectures, and learning experiences into structured articles."
        />

        {featuredArticle && (
          <div className="max-w-3xl mx-auto mt-12">
            <p className="font-mono text-[9px] text-cyan font-bold tracking-[0.25em] uppercase mb-4">
              {"// FEATURED_PUBLICATION"}
            </p>

            <div className="border-b border-border-subtle/30 pb-6 space-y-4">
              {/* Meta details header */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="font-mono text-[9px] text-cyan font-bold uppercase tracking-widest border border-cyan/20 bg-cyan/5 px-2 py-0.5 clip-corner-sm">
                  {featuredArticle.category}
                </span>
                
                <div className="flex items-center gap-3 font-mono text-[9px] text-text-secondary/50">
                  {featuredArticle.date && <span>{featuredArticle.date}</span>}
                  {featuredArticle.readingTime && (
                    <>
                      <span>{"//"}</span>
                      <span>{featuredArticle.readingTime}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Article content */}
              <div className="space-y-3">
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-extrabold uppercase tracking-wider text-text-chrome leading-tight">
                  {featuredArticle.title}
                </h3>
                
                <p className="text-sm leading-relaxed text-text-secondary font-sans">
                  {featuredArticle.summary}
                </p>
              </div>

              {/* Actions */}
              <div className="pt-2">
                {featuredArticle.status === "published" && featuredArticle.url ? (
                  <a
                    href={featuredArticle.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring inline-flex items-center gap-2 border border-cyan/40 bg-cyan/5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-cyan hover:bg-cyan/15 hover:border-cyan clip-corner-sm"
                  >
                    <span>Read Article</span>
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                ) : (
                  <div className="inline-flex items-center border border-dashed border-border-subtle/40 px-3 py-1.5 font-mono text-[9px] text-text-secondary/50 uppercase clip-corner-sm">
                    {"[ STATUS: COMING SOON // IN_DRAFT ]"}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
