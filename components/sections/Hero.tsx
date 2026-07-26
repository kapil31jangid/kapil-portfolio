"use client";

import Image from "next/image";
import { ArrowDown, Download, Github, Linkedin, Mail } from "lucide-react";
import {
  rotatingRoles,
  siteConfig,
  socialLinks,
} from "@/data/portfolio";
import { Button, RoleRotator } from "@/components/ui/Button";
import { ParticlesBackground } from "@/components/ui/ParticlesBackground";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-16 bg-bg-primary"
    >
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 grid-bg opacity-25 pointer-events-none" aria-hidden="true" />
      
      {/* Faint Cyber Layout Lines */}
      <div className="absolute top-0 bottom-0 left-[8%] w-[1px] bg-cyan/5 hidden lg:block" aria-hidden="true" />
      <div className="absolute top-0 bottom-0 right-[22%] w-[1px] bg-cyan/5 hidden lg:block" aria-hidden="true" />
      
      {/* Ambient background glows placed behind subject */}
      <div className="absolute top-1/4 left-1/4 h-[600px] w-[600px] rounded-full bg-cyan/5 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 h-[500px] w-[500px] rounded-full bg-violet/5 blur-[110px] pointer-events-none" />

      {/* Subtle controlled particles */}
      <ParticlesBackground density={18} />

      <div className="section-shell relative z-10 w-full grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        
        {/* Left Column: Headings & Details */}
        <div className="order-2 lg:order-1 flex flex-col justify-center space-y-6">
          
          {/* Availability Indicator */}
          <div className="inline-flex self-start items-center gap-2 border border-cyan/20 bg-cyan/5 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-cyan clip-corner-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse" />
            [ STATUS: {siteConfig.availability} ]
          </div>

          {/* Oversized Cinematic Typography - KAPIL JANGID */}
          <div className="font-[family-name:var(--font-display)] leading-[0.85] select-none">
            <span className="block text-6xl sm:text-7xl md:text-8xl font-extrabold uppercase tracking-wide chrome-text">
              KAPIL
            </span>
            <span className="block text-7xl sm:text-8xl md:text-9xl font-extrabold uppercase tracking-tight gradient-name mt-2">
              JANGID
            </span>
          </div>

          {/* Professional Details */}
          <div className="space-y-2">
            <h2 className="text-base font-bold tracking-[0.15em] text-text-chrome uppercase sm:text-lg font-mono">
              {"// "}{siteConfig.title}
            </h2>
            <RoleRotator roles={rotatingRoles} />
          </div>

          {/* Supporting Statement */}
          <p className="max-w-lg text-sm leading-relaxed text-text-secondary sm:text-base font-sans">
            Building intelligent digital products by combining full stack engineering, Artificial Intelligence and practical problem solving.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap gap-4 pt-2">
            <Button href="#projects" variant="primary">
              <span>Explore My Work</span>
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button href={siteConfig.resumePath} variant="secondary" download>
              <Download className="h-4 w-4" aria-hidden="true" />
              <span>Download Résumé</span>
            </Button>
          </div>

          {/* Socials & Tech Motto */}
          <div className="flex flex-col gap-6 pt-4">
            <div className="flex flex-wrap items-center gap-3">
              {socialLinks.map((link) => {
                const icons = {
                  github: Github,
                  linkedin: Linkedin,
                  email: Mail,
                };
                const Icon = icons[link.icon];

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className="focus-ring inline-flex items-center gap-2 border border-border-subtle bg-bg-secondary/40 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-text-secondary transition-all hover:border-cyan/40 hover:text-cyan clip-corner-sm"
                    {...(link.icon !== "email"
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    aria-label={link.label}
                  >
                    <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{link.label}</span>
                  </a>
                );
              })}
            </div>

            <p className="font-mono text-xs tracking-[0.3em] uppercase text-text-secondary/40">
              CODE. <span className="text-cyan">CREATE</span>. PLAY. <span className="text-magenta">REPEAT</span>.
            </p>
          </div>
        </div>

        {/* Right Column: Integrated Cinematic Portrait (No Frame, No Grayscale, Natural Face) */}
        <div className="order-1 flex justify-center lg:order-2 lg:justify-end relative">
          
          <div className="relative w-full max-w-[380px] aspect-[4/5] sm:aspect-[4/5] flex items-center justify-center">
            
            {/* Directional Cyan & Violet backlights placed directly behind subject */}
            <div className="absolute -inset-8 bg-gradient-to-tr from-cyan/20 via-violet/15 to-magenta/5 blur-[55px] opacity-75 pointer-events-none rounded-full" aria-hidden="true" />
            
            {/* HUD Coordinate details around portrait */}
            <div className="absolute top-2 left-2 font-mono text-[9px] text-text-secondary/30 select-none z-20">
              [ SEC.X.722 // ACTIVE_SYSTEM ]
            </div>
            <div className="absolute bottom-2 right-2 font-mono text-[9px] text-cyan/35 select-none z-20">
              [ LAT: 23.0225° N ]
            </div>

            {/* Glowing HUD game elements / chip */}
            <div className="absolute -left-8 top-1/3 border border-border-subtle bg-bg-secondary/80 p-2 font-mono text-[9px] text-text-secondary hidden sm:block z-20 clip-corner-sm">
              <span className="block font-bold text-cyan">{"// AI_NODE"}</span>
              <span className="block opacity-65">INTEGRATED</span>
            </div>

            {/* Poster HUD strip (Innovate, Learn, Code, Build, Solve, Lead) on right side */}
            <div className="absolute -right-10 top-10 flex flex-col gap-1 items-end opacity-30 select-none z-20 font-mono text-[9px] text-text-secondary tracking-widest hidden sm:flex">
              <div>INNOVATE</div>
              <div className="h-6 w-[1px] bg-cyan/20 my-0.5" />
              <div>LEARN</div>
              <div className="h-6 w-[1px] bg-cyan/20 my-0.5" />
              <div>CODE</div>
              <div className="h-6 w-[1px] bg-cyan/20 my-0.5" />
              <div>BUILD</div>
            </div>

            {/* Natural integrated Portrait (No Box, No Borders, Cafe BG Faded Out programmatically via Mask) */}
            <div className="relative w-full h-full overflow-visible z-10">
              
              <Image
                src="/profile/kapil-hero-transparent.png"
                alt="Portrait of Kapil Jangid"
                fill
                preload
                sizes="(max-width: 768px) 100vw, 380px"
                className="object-cover object-top transition-all duration-300 pointer-events-none"
                style={{
                  maskImage: "radial-gradient(circle at 50% 35%, black 40%, transparent 74%)",
                  WebkitMaskImage: "radial-gradient(circle at 50% 35%, black 40%, transparent 74%)"
                }}
              />
              
            </div>

            {/* Tech quote label floating overlay below frame */}
            <div className="absolute -bottom-4 left-6 border border-border-subtle bg-bg-elevated/95 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.2em] text-text-secondary z-30 clip-corner-sm shadow-md">
              [ LEVEL_UP // REPEAT ]
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
