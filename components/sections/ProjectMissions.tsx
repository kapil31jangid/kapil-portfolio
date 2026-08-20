"use client";

import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import { projects } from "@/data/portfolio";

export function ProjectMissions() {
  return (
    <section id="projects" className="storm-section env-storm-parchment py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto w-full relative z-20">
        {/* Section Header */}
        <div className="mb-16">
          <span className="section-label text-blue-700">{"// SECTION 06 — FEATURED MISSIONS"}</span>
          <h2 className="title-oversized text-slate-950">FEATURED MISSIONS</h2>
          <p className="text-slate-700 font-mono text-sm uppercase tracking-wider mt-2">
            Near-Full-Viewport Showcases — RetailOS, CivicPulse & HireSense AI
          </p>
        </div>

        {/* Showcase Poster Compositions */}
        <div className="space-y-24">
          {projects.map((project, idx) => {
            const isEven = idx % 2 === 0;
            const projectNum = String(idx + 1).padStart(2, "0");

            return (
              <article
                key={project.id}
                className="bg-slate-900 text-white border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden"
              >
                {/* Text Content Block */}
                <div
                  className={`lg:col-span-6 flex flex-col items-start ${
                    isEven ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono text-xs font-bold px-3 py-1 bg-blue-600 text-slate-950 rounded uppercase tracking-wider">
                      MISSION #{projectNum}
                    </span>
                    <span className="font-mono text-xs font-semibold px-2.5 py-1 bg-slate-800 text-blue-300 rounded border border-slate-700">
                      {project.status}
                    </span>
                  </div>

                  <h3 className="font-display text-3xl sm:text-5xl font-bold text-white mb-2 tracking-tight">
                    {project.name}
                  </h3>

                  <p className="text-blue-400 font-display font-semibold text-base sm:text-lg mb-4">
                    {project.tagline}
                  </p>

                  <div className="bg-slate-950 border-l-4 border-blue-500 p-4 rounded-r mb-6 font-sans text-xs sm:text-sm text-slate-300">
                    <strong className="font-bold text-white block mb-1">
                      Problem Solved:
                    </strong>
                    {project.problem}
                  </div>

                  {/* Capabilities List */}
                  <div className="mb-6 w-full">
                    <span className="font-mono text-xs uppercase font-bold text-slate-400 block mb-2">
                      Key Capabilities:
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans text-slate-300">
                      {project.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-1.5">
                          <span className="text-blue-400 font-bold">•</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 bg-slate-800 text-slate-200 text-xs font-mono rounded border border-slate-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Links */}
                  <div className="flex flex-wrap gap-4 pt-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white transition text-xs font-mono uppercase tracking-wider rounded font-bold border border-slate-700"
                      >
                        <Github size={15} /> Repository
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-slate-950 transition text-xs font-mono uppercase tracking-wider rounded font-bold"
                      >
                        <ExternalLink size={15} /> Live Build
                      </a>
                    )}
                  </div>
                </div>

                {/* Dominating Screenshot Showcase Frame */}
                <div
                  className={`lg:col-span-6 relative w-full h-[340px] sm:h-[440px] rounded-xl overflow-hidden border-2 border-slate-700 shadow-2xl ${
                    isEven ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 650px"
                    className="object-cover object-top hover:scale-105 transition duration-700"
                  />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
