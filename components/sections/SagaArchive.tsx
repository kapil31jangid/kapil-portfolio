"use client";

import Image from "next/image";

const archiveItems = [
  {
    id: "behind-poster",
    title: "Behind This Website Poster",
    subtitle: "// POSTER SPECIFICATION",
    image: "/extras/behind-website-poster.png",
    rotate: "rotate-1",
    size: "col-span-1 md:col-span-2 lg:col-span-2 min-h-[320px]",
  },
  {
    id: "ieee-cert",
    title: "IEEE Student Member Credential",
    subtitle: "// COMMUNITY CERTIFICATE",
    image: "/certificates/ieee-student-member.jpg",
    rotate: "-rotate-2",
    size: "col-span-1 md:col-span-1 lg:col-span-1 min-h-[320px]",
  },
  {
    id: "gaming-strat",
    title: "Gaming & Strategic Systems",
    subtitle: "// COMPETITIVE THINKING",
    image: "/extras/gaming-strategy.png",
    rotate: "-rotate-3",
    size: "col-span-1 md:col-span-1 lg:col-span-1 min-h-[280px]",
  },
  {
    id: "game-progress",
    title: "Trophy Progress & Milestones",
    subtitle: "// PERSONAL EXPLORATION",
    image: "/extras/game-trophy-progress.png",
    rotate: "rotate-2",
    size: "col-span-1 md:col-span-1 lg:col-span-1 min-h-[280px]",
  },
  {
    id: "library-coll",
    title: "Library Collection & Strategy",
    subtitle: "// CREATIVE THINKING",
    image: "/extras/game-library-collection.jpeg",
    rotate: "-rotate-1",
    size: "col-span-1 md:col-span-2 lg:col-span-1 min-h-[280px]",
  },
];

export function SagaArchive() {
  return (
    <section id="archive" className="storm-section env-storm-black py-24 relative overflow-hidden">
      {/* Electrical Connector Lines SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20 z-10 stroke-blue-400">
        <line x1="20%" y1="30%" x2="50%" y2="40%" strokeWidth="1.5" strokeDasharray="4 4" />
        <line x1="50%" y1="40%" x2="80%" y2="35%" strokeWidth="1.5" strokeDasharray="4 4" />
        <line x1="30%" y1="70%" x2="75%" y2="75%" strokeWidth="1.5" strokeDasharray="4 4" />
      </svg>

      <div className="max-w-7xl mx-auto w-full relative z-20">
        {/* Section Header */}
        <div className="mb-14">
          <span className="section-label text-blue-400">{"// SECTION 05 — SAGA ARCHIVE"}</span>
          <h2 className="title-oversized text-white">SAGA ARCHIVE</h2>
          <p className="text-slate-400 font-mono text-sm uppercase tracking-wider mt-2">
            Asymmetric Spatial Collage — Community Artifacts & Poster Design Specs
          </p>
        </div>

        {/* Asymmetric Spatial Collage Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {archiveItems.map((item) => (
            <div
              key={item.id}
              className={`${item.size} ${item.rotate} group relative bg-slate-900 border border-blue-500/30 rounded-xl p-3.5 shadow-2xl transition-all duration-300 hover:rotate-0 hover:scale-[1.02] hover:border-blue-400 hover:z-30`}
            >
              {/* Image Frame */}
              <div className="relative w-full h-64 sm:h-72 rounded-lg overflow-hidden bg-slate-950">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-cover object-center group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition" />
              </div>

              {/* Handwritten Style Labeling */}
              <div className="pt-3 px-1 flex flex-col justify-between">
                <span className="font-mono text-[10px] text-blue-400 tracking-widest uppercase">
                  {item.subtitle}
                </span>
                <h3 className="font-display font-bold text-lg text-slate-100 mt-0.5">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
