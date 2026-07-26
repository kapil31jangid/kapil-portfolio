import { aboutParagraphs, identityCards, siteConfig } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function About() {
  return (
    <section id="about" className="relative py-24 bg-bg-secondary">
      {/* Visual background details */}
      <div className="absolute inset-0 grid-bg opacity-5 pointer-events-none" aria-hidden="true" />

      <div className="section-shell">
        <SectionHeading
          index="01"
          eyebrow="Profile"
          title="Building intelligent products with purpose"
          description={siteConfig.brandMessage}
        />

        {/* Editorial Open Split Layout (No card grids, minimal borders) */}
        <div className="grid gap-12 lg:grid-cols-2 items-start relative mt-12">
          
          {/* Left Column: Big Statement & Identity Highlights */}
          <div className="space-y-8">
            <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold uppercase tracking-wide text-text-chrome leading-snug">
              AI-Driven product architecture <span className="text-cyan">and practical engineering</span>.
            </h3>
            
            <p className="text-sm leading-relaxed text-text-secondary font-sans">
              Focused on bridging the gap between high-level Artificial Intelligence capabilities and robust, production-grade frontend and backend infrastructure.
            </p>

            {/* Restrained circuit divider */}
            <div className="circuit-divider my-6" aria-hidden="true" />
            
            {/* Open Identity labels listing (No cards/borders) */}
            <div className="space-y-4">
              <span className="font-mono text-[9px] text-cyan font-bold tracking-widest uppercase block">
                {"// FOCUS_AREAS"}
              </span>
              <div className="grid gap-4 sm:grid-cols-2">
                {identityCards.map((card) => (
                  <div key={card.title} className="space-y-1">
                    <h4 className="font-[family-name:var(--font-display)] text-sm font-bold uppercase tracking-wider text-text-primary">
                      ◆ {card.title}
                    </h4>
                    <p className="text-xs text-text-secondary leading-relaxed font-sans pl-3 border-l border-border-subtle">
                      {card.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Bio Detail & Dual Degree status */}
          <div className="space-y-6 lg:pl-12">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-mono text-xs text-cyan">[ BIO_LOGS ]</span>
              <div className="h-[1px] flex-1 bg-border-subtle/50" />
            </div>

            <div className="space-y-5 text-sm leading-relaxed text-text-secondary font-sans">
              {aboutParagraphs.map((paragraph, index) => (
                <p key={index} className="first-of-type:text-text-primary first-of-type:text-base">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Micro-label details (Omit heavy borders) */}
            <div className="pt-6 mt-6 border-t border-border-subtle/40">
              <div className="flex flex-col gap-2 font-mono text-[10px] text-text-secondary/60">
                <div className="flex justify-between">
                  <span>INSTITUTION_A:</span>
                  <span className="text-text-chrome font-bold">SILVER OAK UNIVERSITY</span>
                </div>
                <div className="flex justify-between">
                  <span>INSTITUTION_B:</span>
                  <span className="text-text-chrome font-bold">IIT MADRAS</span>
                </div>
                <div className="flex justify-between">
                  <span>LOCATION:</span>
                  <span className="text-cyan font-bold">AHMEDABAD, IN</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
