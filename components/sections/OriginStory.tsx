"use client";

import { useState } from "react";
import Image from "next/image";
import { GraduationCap, Code, Users, Award, Download } from "lucide-react";
import { siteConfig } from "@/data/portfolio";

const originStages = [
  {
    id: "cs-student",
    step: "01",
    title: "Computer Science Student",
    subtitle: "Silver Oak University · B.Tech CSE (2025–2029)",
    icon: GraduationCap,
    description:
      "Pursuing a Bachelor of Technology in Computer Science and Engineering at Silver Oak University. Building strong foundations in algorithms, software architecture, data structures, and database management systems.",
    highlights: ["Algorithms & Data Structures", "Object-Oriented Programming", "DBMS & System Design"],
    image: "/profile/kapil-portrait.jpg",
  },
  {
    id: "data-science",
    step: "02",
    title: "Data Science Learner",
    subtitle: "IIT Madras · B.S. Data Science & Applications (2025–Present)",
    icon: Award,
    description:
      "Dual degree student at the Indian Institute of Technology Madras, focusing on statistics, machine learning foundations, data analytics, and computational data pipelines.",
    highlights: ["Machine Learning Foundations", "Data Analysis & Statistics", "Python & Data Engineering"],
    image: "/certificates/ieee-student-member.jpg",
  },
  {
    id: "ai-builder",
    step: "03",
    title: "AI & Full-Stack Builder",
    subtitle: "Engineering Intelligent Web Systems",
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
    image: "/extras/behind-website-poster.png",
  },
];

export function OriginStory() {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const stage = originStages[activeStageIndex];
  const Icon = stage.icon;

  return (
    <section id="about" className="storm-section env-storm-parchment py-24 relative overflow-hidden">
      {/* Thunder Split Fracture Visual Boundary */}
      <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-[#05070D] to-transparent pointer-events-none z-10" />

      <div className="max-w-7xl mx-auto w-full relative z-20">
        {/* Section Header */}
        <div className="mb-12">
          <span className="section-label text-blue-700">{"// SECTION 02 — NARRATIVE ORIGIN"}</span>
          <h2 className="title-oversized text-slate-950">THE ORIGIN</h2>
          <p className="text-slate-700 font-mono text-sm uppercase tracking-wider mt-2">
            Kapil Jangid’s Journey from CS Student to AI Full-Stack Developer
          </p>
        </div>

        {/* Pinned 4-Stage Controls */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {originStages.map((s, idx) => {
            const isActive = idx === activeStageIndex;
            return (
              <button
                key={s.id}
                onClick={() => setActiveStageIndex(idx)}
                className={`p-4 text-left border rounded transition-all duration-300 ${
                  isActive
                    ? "bg-slate-900 text-white border-blue-600 shadow-xl scale-[1.02]"
                    : "bg-slate-200/90 text-slate-800 border-slate-300 hover:bg-slate-300/80"
                }`}
              >
                <span className="font-mono text-xs font-bold text-blue-500 block mb-1">
                  STAGE {s.step}
                </span>
                <span className="font-display font-bold text-sm sm:text-base leading-tight block">
                  {s.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Stage Content Card Focal Area */}
        <div className="bg-slate-100 border border-slate-300 rounded-xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-xl">
          {/* Information Column */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 bg-blue-600 text-white rounded-lg">
                <Icon size={24} />
              </div>
              <div>
                <span className="font-mono text-xs font-bold text-blue-700 uppercase">
                  STAGE {stage.step} OF 04
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-950">
                  {stage.title}
                </h3>
              </div>
            </div>

            <p className="font-mono text-xs text-blue-900 uppercase font-semibold mb-4">
              {stage.subtitle}
            </p>

            <p className="text-slate-700 text-base leading-relaxed mb-6 font-sans">
              {stage.description}
            </p>

            {/* Verified Highlights */}
            <div className="mb-6 w-full">
              <span className="font-mono text-xs uppercase text-slate-500 font-bold block mb-2">
                Verified Highlights:
              </span>
              <div className="flex flex-wrap gap-2">
                {stage.highlights.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 bg-slate-200 text-slate-900 text-xs font-mono font-medium rounded border border-slate-300"
                  >
                    ✓ {item}
                  </span>
                ))}
              </div>
            </div>

            <a
              href={siteConfig.resumePath}
              download
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white hover:bg-blue-600 transition text-xs font-mono uppercase tracking-wider rounded font-bold"
            >
              <Download size={14} /> Download Verified Résumé
            </a>
          </div>

          {/* Visual Showcase Focal Image Frame */}
          <div className="lg:col-span-5 relative w-full h-[300px] sm:h-[360px] rounded-lg overflow-hidden border-2 border-slate-300 shadow-lg">
            <Image
              src={stage.image}
              alt={stage.title}
              fill
              sizes="(max-width: 1024px) 100vw, 480px"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
              <span className="font-mono text-xs text-white bg-slate-900/90 px-3 py-1 rounded">
                {"// VERIFIED STAGE ASSET #"}
                {stage.step}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
