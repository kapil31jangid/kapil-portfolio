"use client";

import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import { projects } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export function Projects() {
  const primaryProject = projects.find((p) => p.id === "retailos") || projects[0];
  const splitProjects = projects.filter((p) => ["civicpulse", "hiresense-ai"].includes(p.id));
  const otherProjects = projects.filter((p) => !["retailos", "civicpulse", "hiresense-ai"].includes(p.id));

  return (
    <section id="projects" className="relative py-24 bg-bg-secondary">
      <div className="absolute inset-0 grid-bg opacity-5 pointer-events-none" aria-hidden="true" />

      <div className="section-shell">
        <SectionHeading
          index="02"
          eyebrow="Portfolio"
          title="Product Showcase & Software Artifacts"
          description="AI-powered platforms and full-stack software built for client demand, open-source utilities, and technical research."
        />

        {/* 1. Primary Featured Showcase (RetailOS) - Large Open Layout (No heavy cards, clean spacing) */}
        {primaryProject && (
          <div className="mb-20">
            <p className="font-mono text-[9px] text-cyan font-bold tracking-[0.25em] uppercase mb-6">
              {"// CRITICAL_SYSTEM_SHOWCASE"}
            </p>
            
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-center">
              
              {/* Media Block - High Prominence */}
              <div className="relative aspect-[16/10] w-full overflow-hidden clip-corner border border-border-subtle group">
                <div className="absolute inset-0 bg-bg-elevated z-0" />
                <Image
                  src={primaryProject.image}
                  alt={primaryProject.imageAlt}
                  fill
                  className="object-cover relative z-10"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent z-20" />
                <span className="absolute left-4 top-4 font-mono text-[9px] font-bold uppercase tracking-widest border border-cyan/40 bg-bg-primary/95 text-cyan px-2.5 py-1 z-30 clip-corner-sm">
                  {primaryProject.status}
                </span>
              </div>

              {/* Project Details (Clean spacing, typography hierarchy) */}
              <div className="space-y-6">
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-wide uppercase text-text-chrome">
                    {primaryProject.name}
                  </h3>
                  <p className="mt-1 text-xs font-semibold text-cyan font-mono">
                    {"// "}{primaryProject.tagline}
                  </p>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-text-secondary leading-relaxed font-sans">
                  <div>
                    <span className="font-mono text-[9px] uppercase font-bold text-text-primary tracking-wider block mb-1">
                      [ PROBLEM ]
                    </span>
                    <p>{primaryProject.problem}</p>
                  </div>

                  <div>
                    <span className="font-mono text-[9px] uppercase font-bold text-text-primary tracking-wider block mb-2">
                      [ CAPABILITIES ]
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {primaryProject.features.map((feature) => (
                        <li key={feature} className="flex gap-2 items-start">
                          <span className="text-cyan font-mono">▪</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="font-mono text-[9px] uppercase font-bold text-text-primary tracking-wider block mb-1">
                      [ CONTRIBUTION ]
                    </span>
                    <p>{primaryProject.contribution}</p>
                  </div>
                </div>

                {/* Tech tags - limited */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {primaryProject.stack.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="border border-border-subtle/60 bg-bg-primary/50 px-2.5 py-0.5 font-mono text-[9px] uppercase text-text-secondary clip-corner-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 pt-2">
                  {primaryProject.github && (
                    <Button href={primaryProject.github} variant="secondary" external>
                      <Github className="h-4 w-4" aria-hidden="true" />
                      <span>GitHub</span>
                    </Button>
                  )}
                  {primaryProject.live && (
                    <Button href={primaryProject.live} variant="primary" external>
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                      <span>Launch Demo</span>
                    </Button>
                  )}
                  {primaryProject.caseStudy && (
                    <span className="inline-flex items-center font-mono text-[10px] text-text-secondary/50 border border-dashed border-border-subtle/50 px-4 py-2 clip-corner-sm">
                      {primaryProject.caseStudy}
                    </span>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* 2. Secondary Showcase (CivicPulse & HireSense AI) - Open alternating compositions */}
        <div className="grid gap-12 lg:grid-cols-2 mb-20 border-t border-border-subtle/30 pt-16">
          {splitProjects.map((project, idx) => (
            <div key={project.id} className="flex flex-col justify-between h-full space-y-6">
              
              {/* Media Block */}
              <div className="relative aspect-[16/9] w-full overflow-hidden clip-corner border border-border-subtle group">
                <div className="absolute inset-0 bg-bg-elevated z-0" />
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  className="object-cover relative z-10"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent z-20" />
                <span className="absolute left-3 top-3 font-mono text-[9px] font-bold uppercase tracking-widest border border-cyan/40 bg-bg-primary/95 text-cyan px-2 py-0.5 z-30 clip-corner-sm">
                  {project.status}
                </span>
              </div>

              {/* Text Info */}
              <div className="space-y-4">
                <div className="flex justify-between items-baseline gap-2">
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-bold uppercase tracking-wider text-text-chrome">
                    {project.name}
                  </h3>
                  <span className="font-mono text-[9px] text-text-secondary/40">
                    {"// SUB_CORE.0"}{idx + 1}
                  </span>
                </div>
                
                <p className="text-xs font-semibold text-cyan font-mono">
                  {"// "}{project.tagline}
                </p>

                <div className="space-y-3 text-xs leading-relaxed text-text-secondary font-sans">
                  <div>
                    <span className="font-bold text-text-primary font-mono text-[9px] uppercase tracking-wider block mb-1">
                      [ PROBLEM ]
                    </span>
                    <p>{project.problem}</p>
                  </div>
                  <div>
                    <span className="font-bold text-text-primary font-mono text-[9px] uppercase tracking-wider block mb-1">
                      [ CONTRIBUTION ]
                    </span>
                    <p>{project.contribution}</p>
                  </div>
                </div>
              </div>

              {/* Stack & Actions */}
              <div className="space-y-4 pt-4 border-t border-border-subtle/30">
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="border border-border-subtle/50 bg-bg-primary/50 px-2 py-0.5 font-mono text-[9px] uppercase text-text-secondary clip-corner-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {project.github && (
                    <Button href={project.github} variant="secondary" className="px-3.5 py-2" external>
                      <Github className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Repository</span>
                    </Button>
                  )}
                  {project.live && (
                    <Button href={project.live} variant="primary" className="px-3.5 py-2" external>
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Live Demo</span>
                    </Button>
                  )}
                </div>
              </div>
              
            </div>
          ))}
        </div>

        {/* 3. Minor showcases (StadiumOS AI, Assetra) - Clean spacing row list */}
        <div className="border-t border-border-subtle/30 pt-16">
          <p className="font-mono text-[9px] text-cyan font-bold tracking-[0.25em] uppercase mb-6">
            {"// SUPPORTING_PROJECTS_ARCHIVE"}
          </p>
          <div className="grid gap-8 md:grid-cols-2">
            {otherProjects.map((project) => (
              <div key={project.id} className="flex flex-col justify-between py-4 border-b border-border-subtle/20 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-bold uppercase tracking-wider text-text-chrome">
                      {project.name}
                    </h3>
                    <span className="font-mono text-[9px] text-text-secondary/50 uppercase">
                      {project.status}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-cyan font-mono">
                    {"// "}{project.tagline}
                  </p>
                  <p className="text-xs text-text-secondary leading-relaxed font-sans">
                    {project.problem}
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1">
                    {project.stack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="bg-bg-primary border border-border-subtle/40 px-2 py-0.5 font-mono text-[8px] uppercase text-text-secondary clip-corner-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    {project.github && (
                      <a
                        href={project.github}
                        className="text-text-secondary hover:text-cyan p-1.5 transition-colors border border-border-subtle bg-bg-secondary clip-corner-sm"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub Repo"
                      >
                        <Github className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        className="text-text-secondary hover:text-cyan p-1.5 transition-colors border border-border-subtle bg-bg-secondary clip-corner-sm"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Live Demo"
                      >
                        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
