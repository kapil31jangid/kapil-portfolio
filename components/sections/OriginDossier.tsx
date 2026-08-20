"use client";

import { useState } from "react";
import Image from "next/image";
import { GraduationCap, Code, Users, Award, Download, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/data/portfolio";

const dossierStages = [
  {
    id: "cs-student",
    step: "01",
    title: "Computer Science Student",
    subtitle: "Silver Oak University · B.Tech CSE (2025–2029)",
    icon: GraduationCap,
    description:
      "Pursuing a Bachelor of Technology in Computer Science and Engineering at Silver Oak University. Building core software architecture, data structures, algorithms, and database management systems.",
    highlights: ["Algorithms & Data Structures", "Object-Oriented Programming", "DBMS & System Design"],
    image: "/extras/behind-website-poster.png",
  },
  {
    id: "data-science",
    step: "02",
    title: "Data Science Learner",
    subtitle: "IIT Madras · B.S. Data Science & Applications (2025–Present)",
    icon: Award,
    description:
      "Dual degree student at the Indian Institute of Technology Madras, focusing on statistics, machine learning foundations, data analytics, and computational data pipelines.",
    highlights: ["Machine Learning Foundations", "Data Analysis & Statistics", "Python & Data Pipelines"],
    image: "/certificates/ieee-student-member.jpg",
  },
  {
    id: "ai-builder",
    step: "03",
    title: "AI & Full-Stack Builder",
    subtitle: "Engineering Intelligent Web Architecture",
    icon: Code,
    description:
      "Crafting production-grade digital products like RetailOS, CivicPulse, and HireSense AI. Integrating Gemini API, Retrieval-Augmented Generation (RAG), FastAPI backends, Supabase, and Neon PostgreSQL databases.",
    highlights: ["Generative AI & Gemini API", "FastAPI & Supabase / Neon", "React & Next.js Ecosystem"],
    image: "/projects/retailos-dashboard.png",
  },
  {
    id: "community-leader",
    step: "04",
    title: "Community Contributor",
    subtitle: "Secretary @ IEEE SOU SIGHT · GDG · AWS Student Builder",
    icon: Users,
    description:
      "Serving as Secretary of the IEEE SOU SIGHT Student Branch Group. Organizing technical workshops, hackathons, humanitarian technology initiatives, and technical documentation.",
    highlights: ["IEEE SIGHT Leadership", "GDG Workshops & Hackathons", "Technical Documentation"],
    image: "/extras/gaming-strategy.png",
  },
];

export function OriginDossier() {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const stage = dossierStages[activeStageIndex];
  const Icon = stage.icon;

  return (
    <section id="about" className="relative w-full py-24 px-4 sm:px-8 lg:px-16 bg-[#0B0F19] text-[#F1F5F9] border-t-2 border-red-600/40">
      {/* Mechanical Armor Shutter Decorative Top Border */}
      <div className="absolute top-0 inset-x-0 h-4 bg-gradient-to-r from-red-600 via-amber-500 to-red-600 opacity-60" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <div className="mb-12">
          <span className="font-mono text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
            {"// DOSSIER 01 — WORKSHOP NARRATIVE"}
          </span>
          <h2 className="metallic-forged-title text-white">WORKSHOP DOSSIER</h2>
          <p className="text-slate-400 font-mono text-sm uppercase tracking-wider mt-2">
            Verified Educational & Engineering Trajectory
          </p>
        </div>

        {/* Dossier Stage Controls */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {dossierStages.map((s, idx) => {
            const isActive = idx === activeStageIndex;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setActiveStageIndex(idx)}
                className={`p-4 text-left border rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-slate-900 text-white border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.3)] scale-[1.02]"
                    : "bg-slate-950/80 text-slate-400 border-slate-800 hover:bg-slate-900"
                }`}
              >
                <span className="font-mono text-xs font-bold text-red-500 block mb-1">
                  STAGE {s.step}
                </span>
                <span className="font-display font-bold text-sm sm:text-base leading-tight block">
                  {s.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Stage Dossier Card */}
        <div className="gunmetal-surface engraved-red-border rounded-xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-2xl">
          {/* Information Column */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 bg-red-600 text-white rounded-lg shadow-lg">
                <Icon size={24} />
              </div>
              <div>
                <span className="font-mono text-xs font-bold text-amber-400 uppercase tracking-widest">
                  DOSSIER RECORD #{stage.step}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                  {stage.title}
                </h3>
              </div>
            </div>

            <p className="font-mono text-xs text-red-400 uppercase font-semibold mb-4">
              {stage.subtitle}
            </p>

            <p className="text-slate-300 text-base leading-relaxed mb-6 font-sans">
              {stage.description}
            </p>

            {/* Verified Highlights */}
            <div className="mb-6 w-full">
              <span className="font-mono text-xs uppercase text-slate-400 font-bold block mb-2">
                Verified Dossier Highlights:
              </span>
              <div className="flex flex-wrap gap-2">
                {stage.highlights.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 bg-slate-950 text-amber-300 text-xs font-mono font-medium rounded border border-amber-500/30 flex items-center gap-1.5"
                  >
                    <ShieldCheck size={12} className="text-amber-400" /> {item}
                  </span>
                ))}
              </div>
            </div>

            <a
              href={siteConfig.resumePath}
              download
              className="inline-flex items-center gap-2 px-5 py-3 bg-red-600 hover:bg-red-500 text-white transition text-xs font-mono uppercase tracking-wider rounded-lg font-bold shadow-lg"
            >
              <Download size={15} /> Download Full Dossier (PDF)
            </a>
          </div>

          {/* Asset Image Frame */}
          <div className="lg:col-span-5 relative w-full h-[300px] sm:h-[360px] rounded-lg overflow-hidden border-2 border-slate-700 shadow-xl">
            <Image
              src={stage.image}
              alt={stage.title}
              fill
              sizes="(max-width: 1024px) 100vw, 480px"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent flex items-end p-4">
              <span className="font-mono text-xs text-amber-400 bg-slate-950/90 px-3 py-1 rounded border border-amber-500/30">
                {"// VERIFIED DOSSIER SPEC #"}
                {stage.step}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
