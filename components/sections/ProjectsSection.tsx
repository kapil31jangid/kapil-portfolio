"use client";

import { useState } from "react";
import Image from "next/image";
import { projects } from "@/data/portfolio";
import { useArmourTheme } from "@/components/context/ArmourThemeProvider";
import { Github, ExternalLink, ChevronRight, ChevronLeft, Cpu } from "lucide-react";

export function ProjectsSection() {
  const { activeSuit } = useArmourTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const project = projects[activeIndex];

  return (
    <section id="projects" className="relative w-full py-16 px-4 sm:px-8 lg:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <div className="mb-6 pb-3 border-b border-slate-800 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <span
              className="px-3 py-1 font-mono text-xs font-bold rounded uppercase tracking-wider text-slate-950 shadow"
              style={{ backgroundColor: activeSuit.energyColor }}
            >
              DEPLOYMENT // PROJECTS
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white uppercase tracking-wider">
              FEATURED ENGINEERING MISSIONS
            </h2>
          </div>

          <span className="font-mono text-xs text-amber-400 font-bold uppercase tracking-widest">
            {"DEPLOYMENT MECHANIC: " + activeSuit.assemblyStyle}
          </span>
        </div>

        {/* Project Selector Chips */}
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          {projects.map((p, i) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={`px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider rounded-lg border transition-all duration-300 focus-ring ${
                i === activeIndex
                  ? "bg-red-600 text-white border-amber-400 shadow-lg scale-[1.02]"
                  : "bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-600 hover:text-slate-200"
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>

        {/* Unfolding Showcase Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Screenshot Container */}
          <div className="lg:col-span-7 relative">
            <div
              className="relative w-full aspect-video bg-slate-950 border-2 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500"
              style={{ borderColor: activeSuit.primaryColor }}
            >
              <Image
                src={project.image}
                alt={project.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 660px"
                className="object-cover object-top"
                priority={activeIndex === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

              <div className="absolute top-4 left-4 px-3 py-1 bg-red-600/90 text-white font-mono text-[10px] font-bold uppercase tracking-widest rounded shadow">
                {project.status}
              </div>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center gap-3 mt-4">
              <button
                type="button"
                onClick={() => setActiveIndex((i) => Math.max(0, i - 1))}
                disabled={activeIndex === 0}
                className="p-2 bg-slate-900 border border-slate-700 text-slate-400 hover:text-amber-400 hover:border-amber-500 disabled:opacity-30 disabled:cursor-not-allowed rounded transition focus-ring"
                aria-label="Previous project"
              >
                <ChevronLeft size={18} />
              </button>
              <span className="font-mono text-xs text-slate-500 flex-1 text-center">
                {activeIndex + 1} / {projects.length}
              </span>
              <button
                type="button"
                onClick={() => setActiveIndex((i) => Math.min(projects.length - 1, i + 1))}
                disabled={activeIndex === projects.length - 1}
                className="p-2 bg-slate-900 border border-slate-700 text-slate-400 hover:text-amber-400 hover:border-amber-500 disabled:opacity-30 disabled:cursor-not-allowed rounded transition focus-ring"
                aria-label="Next project"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Product Info Column */}
          <div className="lg:col-span-5 flex flex-col">
            <div
              className="armour-plate-surface rounded-2xl p-6 shadow-xl border transition-all duration-500"
              style={{ borderColor: activeSuit.secondaryColor }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Cpu size={16} className="text-amber-400" />
                <span className="font-mono text-xs text-amber-400 font-bold uppercase tracking-widest">
                  {"DEPLOYED VIA " + activeSuit.markNumber}
                </span>
              </div>

              <h3 className="font-display text-3xl font-bold text-white uppercase tracking-tight mb-1">
                {project.name}
              </h3>
              <p className="text-amber-300 text-sm font-medium mb-4 leading-relaxed">{project.tagline}</p>

              <div className="mb-4">
                <span className="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">
                  Problem Addressed:
                </span>
                <p className="text-slate-300 text-xs leading-relaxed">{project.problem}</p>
              </div>

              <div className="mb-4">
                <span className="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">
                  Key Features:
                </span>
                <ul className="space-y-1">
                  {project.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-slate-300">
                      <span className="text-red-500 mt-0.5 shrink-0">▸</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-5">
                <span className="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">
                  Stack:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 bg-slate-900 border border-slate-700 text-slate-300 font-mono text-[10px] rounded-sm"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 border border-slate-700 text-slate-200 hover:text-amber-400 hover:border-amber-500 font-mono text-xs font-bold uppercase tracking-wider transition rounded focus-ring"
                  >
                    <Github size={14} /> Source Code
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition rounded shadow-[0_0_12px_rgba(209,26,34,0.4)] focus-ring"
                  >
                    <ExternalLink size={14} /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
