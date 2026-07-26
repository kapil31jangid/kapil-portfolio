import { skillCategories } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Skills() {
  return (
    <section id="skills" className="relative py-24 bg-bg-primary">
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" aria-hidden="true" />
      
      <div className="section-shell relative">
        <SectionHeading
          index="03"
          eyebrow="Capabilities"
          title="Technical Capability Matrix"
          description="A structured mapping of core competencies, technologies, and academic principles gathered across dual programs and product development."
        />

        {/* Matrix Rows (No boxes around individual skills, clean row separators) */}
        <div className="mt-12 space-y-6">
          {skillCategories.map((category, idx) => (
            <div
              key={category.title}
              className="py-4 border-b border-border-subtle/30 flex flex-col md:grid md:grid-cols-[250px_1fr] md:items-baseline gap-4 hover:bg-bg-elevated/20 px-2 transition-colors duration-150"
            >
              {/* Category Heading column */}
              <div className="flex items-center gap-3">
                <span className="font-mono text-[9px] text-cyan font-bold">
                  [ 0{idx + 1} ]
                </span>
                <h3 className="font-[family-name:var(--font-display)] text-base font-bold uppercase tracking-wider text-text-chrome">
                  {category.title}
                </h3>
              </div>

              {/* Skills List column - simple inline layout separated by dots */}
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-text-secondary font-sans leading-relaxed">
                {category.skills.map((skill, sIdx) => (
                  <span key={skill} className="hover:text-cyan transition-colors duration-150 uppercase tracking-wide text-xs">
                    {skill}
                    {sIdx < category.skills.length - 1 && (
                      <span className="text-border-subtle/80 ml-4 font-normal select-none">/</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Micro System Note */}
        <div className="mt-12 flex justify-center">
          <div className="inline-block border border-cyan/15 bg-cyan/5 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.2em] text-text-secondary clip-corner-sm">
            [ MATRIX.STATUS: VERIFIED // STACK_INSPECT_READY ]
          </div>
        </div>

      </div>
    </section>
  );
}
