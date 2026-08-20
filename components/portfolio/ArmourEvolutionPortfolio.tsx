"use client";

import { ArmourThemeProvider } from "@/components/context/ArmourThemeProvider";
import { BootSequence } from "@/components/ui/BootSequence";

import { ArmourHeroSection } from "@/components/sections/ArmourHeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { BlogsSection } from "@/components/sections/BlogsSection";
import { GokuBotSection } from "@/components/sections/GokuBotSection";
import { ContactSection } from "@/components/sections/ContactSection";

export function ArmourEvolutionPortfolio() {
  return (
    <ArmourThemeProvider>
      {/* 1. Initial concise 1.5s boot sequence */}
      <BootSequence />

      {/* One continuous page — existing sections with one validated hero armour */}
      <div className="relative w-full transition-colors duration-500 overflow-hidden">
        {/* Hero Section (Left ID + Right Interactive Suit) */}
        <ArmourHeroSection />

        {/* About Section */}
        <AboutSection />

        {/* Skills Subsystems Section */}
        <SkillsSection />

        {/* Featured Projects Showcase Section */}
        <ProjectsSection />

        {/* Experience & Leadership Mission Route Section */}
        <ExperienceSection />

        {/* Education & Achievements Section */}
        <EducationSection />

        {/* Technical Publications & Blogs Section */}
        <BlogsSection />

        {/* GokuBot AI Assistant System Section */}
        <GokuBotSection />

        {/* Contact & Finale Section */}
        <ContactSection />
      </div>
    </ArmourThemeProvider>
  );
}
