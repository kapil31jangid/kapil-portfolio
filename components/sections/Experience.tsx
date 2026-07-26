import { experience, leadershipHighlights } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Experience() {
  return (
    <section id="journey" className="relative py-24 bg-bg-secondary">
      <div className="absolute inset-0 grid-bg opacity-5 pointer-events-none" aria-hidden="true" />

      <div className="section-shell">
        <SectionHeading
          index="04"
          eyebrow="Journey"
          title="Experience & Student Leadership"
          description="A unified timeline of professional community involvement, technical organization, and humanitarian technology leadership."
        />

        {/* Combined open split composition (No heavy cards or bordered widgets) */}
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-start mt-12">
          
          {/* Left: Vertical Illuminated Timeline */}
          <div className="space-y-8">
            <p className="font-mono text-[9px] text-cyan font-bold tracking-[0.25em] uppercase">
              {"// COMMUNITY_LOGS"}
            </p>
            
            <div className="relative pl-6 sm:pl-8 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[1px] before:bg-gradient-to-b before:from-cyan before:via-violet/50 before:to-transparent">
              
              {experience.map((entry) => (
                <div key={`${entry.organisation}-${entry.role}`} className="relative pb-8 last:pb-0">
                  {/* Timeline node marker */}
                  <span
                    className="absolute -left-6 sm:-left-8 top-1.5 h-3 w-3 border border-cyan bg-bg-primary shadow-[0_0_12px_rgba(0,240,255,0.6)] rotate-45"
                    aria-hidden="true"
                  />
                  
                  <div className="space-y-2">
                    {/* Role & Duration */}
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                      <h4 className="font-[family-name:var(--font-display)] text-base font-bold uppercase tracking-wider text-text-chrome">
                        {entry.role}
                      </h4>
                      <span className="font-mono text-[10px] text-cyan font-bold">
                        {entry.start} – {entry.end}
                      </span>
                    </div>

                    {/* Organisation details */}
                    <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-text-secondary/80">
                      <span>{entry.organisation}</span>
                      <span className="text-border-subtle/50">{"//"}</span>
                      <span className="font-mono text-[9px] uppercase opacity-75">{entry.location}</span>
                    </div>

                    {/* Responsibilities list */}
                    <ul className="mt-3 space-y-1.5 text-xs text-text-secondary leading-relaxed font-sans pl-3 border-l border-border-subtle">
                      {entry.responsibilities.map((resp, rIdx) => (
                        <li key={rIdx} className="flex gap-2 items-start">
                          <span className="text-cyan font-mono text-[9px] mt-0.5">▪</span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Skill Tags - limited */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {entry.skills.map((skill) => (
                        <span
                          key={skill}
                          className="border border-border-subtle/50 bg-bg-primary/40 px-2 py-0.5 font-mono text-[9px] uppercase text-text-secondary clip-corner-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

            </div>
          </div>

          {/* Right: Leadership Pillars (Refined to be open paragraphs, no cards) */}
          <div className="space-y-6 lg:pl-12">
            <p className="font-mono text-[9px] text-cyan font-bold tracking-[0.25em] uppercase">
              {"// LEADERSHIP_CAPABILITIES"}
            </p>

            <div className="space-y-6">
              {leadershipHighlights.map((item) => (
                <div key={item.title} className="space-y-2 border-b border-border-subtle/20 pb-4 last:border-none last:pb-0">
                  <span className="font-mono text-[9px] text-cyan/70 font-bold uppercase tracking-widest block">
                    ◆ {item.title}
                  </span>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-sans pl-3 border-l border-border-subtle">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Event note micro HUD */}
            <div className="border border-border-subtle bg-bg-secondary/40 p-4 clip-corner-sm mt-8">
              <span className="font-mono text-[9px] text-cyan font-bold block mb-2 uppercase">
                {"[ ACTIVITIES_LOG // SYS ]"}
              </span>
              <p className="text-[11px] text-text-secondary leading-relaxed font-sans">
                Active planning and documentation of campus bootcamps, workshops, hackathons, and speaker outreach programs under IEEE and GDG student initiatives.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
