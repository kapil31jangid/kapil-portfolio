import { beyondCode, siteConfig } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function BeyondCode() {
  return (
    <section id="beyond-code" className="relative py-24 bg-bg-secondary">
      <div className="absolute inset-0 grid-bg opacity-5 pointer-events-none" aria-hidden="true" />
      
      <div className="section-shell">
        <SectionHeading
          index="07.2"
          eyebrow="Beyond Code"
          title="Mindset & Exploration"
          description="Interests and perspectives driving personal growth and analytical thinking outside of development workspace."
          align="center"
        />

        <div className="max-w-2xl mx-auto mt-12 space-y-6">
          <ul className="space-y-4">
            {beyondCode.map((item, idx) => (
              <li
                key={idx}
                className="flex gap-3 text-xs leading-relaxed text-text-secondary sm:text-sm font-sans"
              >
                <span className="text-cyan font-mono text-[9px] mt-1 select-none">
                  [ 0{idx + 1} ]
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          
          <div className="pt-8 border-t border-border-subtle/20 text-center">
            <p className="font-mono text-[9px] tracking-[0.25em] text-violet font-bold uppercase">
              {"// "}{siteConfig.motto}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
