import { education, certifications, achievements } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Education() {
  const coreEducation = education;
  const coreCertifications = certifications;
  const coreAchievements = achievements;

  return (
    <section id="education" className="relative py-24 bg-bg-primary">
      <div className="absolute inset-0 grid-bg opacity-5 pointer-events-none" aria-hidden="true" />

      <div className="section-shell">
        <SectionHeading
          index="05"
          eyebrow="Credentials"
          title="Academics & Certifications"
          description="Academic foundation in computer science and data science alongside professional milestones and vendor certifications."
        />

        {/* Compact Split Composition (No heavy border cards) */}
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] items-start mt-12">
          
          {/* Left Column: Education List */}
          <div className="space-y-6">
            <p className="font-mono text-[9px] text-cyan font-bold tracking-[0.25em] uppercase">
              {"// ACADEMIC_HISTORY"}
            </p>

            <div className="space-y-6">
              {coreEducation.map((entry) => (
                <div key={`${entry.institution}-${entry.qualification}`} className="border-b border-border-subtle/20 pb-4 last:border-none last:pb-0 space-y-2">
                  <div className="flex justify-between items-baseline gap-2">
                    <h4 className="font-[family-name:var(--font-display)] text-base font-bold uppercase tracking-wider text-text-chrome">
                      {entry.institution}
                    </h4>
                    <span className="font-mono text-[9px] text-cyan uppercase font-bold">
                      {entry.status}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-cyan font-mono">
                    {"// "}{entry.qualification}
                  </p>
                  
                  <p className="text-xs text-text-secondary font-mono">
                    {entry.period}
                  </p>

                  {entry.details && (
                    <p className="text-xs text-text-secondary leading-relaxed font-sans pl-3 border-l border-border-subtle pt-1">
                      {entry.details}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Selected Certifications & Milestones */}
          <div className="space-y-8 lg:pl-12">
            
            {/* Certifications Subsection */}
            <div className="space-y-4">
              <p className="font-mono text-[9px] text-cyan font-bold tracking-[0.25em] uppercase">
                {"// CERTIFICATIONS"}
              </p>

              <div className="space-y-3">
                {coreCertifications.map((cert) => (
                  <div key={cert.name} className="py-2 border-b border-border-subtle/20 last:border-none flex justify-between items-center gap-4">
                    <div className="space-y-1">
                      <h5 className="font-[family-name:var(--font-display)] text-xs font-bold uppercase tracking-wider text-text-chrome">
                        {cert.name}
                      </h5>
                      <div className="flex items-center gap-1.5 font-mono text-[9px] text-text-secondary">
                        <span className="text-cyan">{cert.issuer}</span>
                        {cert.date && (
                          <>
                            <span>{"//"}</span>
                            <span>{cert.date}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements/Milestones Subsection */}
            <div className="space-y-4 pt-4 border-t border-border-subtle/30">
              <p className="font-mono text-[9px] text-cyan font-bold tracking-[0.25em] uppercase">
                {"// VERIFIED_MILESTONES"}
              </p>

              <div className="space-y-4">
                {coreAchievements.map((ach) => (
                  <div key={ach.title} className="border-l border-cyan/40 pl-3">
                    <div className="flex justify-between items-baseline gap-2">
                      <h5 className="font-[family-name:var(--font-display)] text-xs font-bold uppercase tracking-wider text-text-chrome">
                        {ach.title}
                      </h5>
                      {ach.date && (
                        <span className="font-mono text-[9px] text-text-secondary/40">
                          {ach.date}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-text-secondary leading-relaxed font-sans">
                      {ach.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
