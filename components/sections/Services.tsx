import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export function Services() {
  return (
    <section id="services" className="relative py-24 bg-bg-primary">
      <div className="absolute inset-0 grid-bg opacity-5 pointer-events-none" aria-hidden="true" />

      <div className="section-shell">
        <SectionHeading
          index="07"
          eyebrow="Offerings"
          title="Freelance & Collaboration Matrix"
          description="Focused capability services designed for building robust MVPs, integrating AI APIs, and publishing clear project documentation."
        />

        {/* Editorial Service List (Vertically stacked rows, no card grids, thin dividers) */}
        <div className="mt-12 divide-y divide-border-subtle/30 border-t border-b border-border-subtle/30">
          {services.map((service, idx) => (
            <div
              key={service.title}
              className="py-6 flex flex-col md:grid md:grid-cols-[100px_1.2fr_2fr_50px] md:items-center gap-4 hover:bg-bg-elevated/25 px-4 transition-all duration-300 group"
            >
              {/* Service Number */}
              <span className="font-mono text-xs text-cyan font-bold block select-none">
                07.0{idx + 1}
              </span>
              
              {/* Service Title */}
              <h3 className="font-[family-name:var(--font-display)] text-lg font-bold uppercase tracking-wider text-text-chrome group-hover:text-cyan transition-colors">
                {service.title}
              </h3>
              
              {/* Outcome Description */}
              <p className="text-xs text-text-secondary leading-relaxed font-sans md:pr-8">
                {service.description}
              </p>

              {/* Minimal Directional Icon */}
              <div className="hidden md:flex justify-end text-text-secondary group-hover:text-cyan transition-colors transform group-hover:translate-x-1 group-hover:-translate-y-1 duration-300">
                <ArrowUpRight className="h-4.5 w-4.5" aria-hidden="true" />
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center max-w-xl mx-auto space-y-4">
          <p className="font-mono text-[10px] text-cyan tracking-widest uppercase">
            [ OUTCOME_DRIVEN // COLLABORATE ]
          </p>
          <p className="text-sm text-text-secondary font-sans">
            Have an idea? Let’s turn it into a working product.
          </p>
          <div className="pt-2">
            <Button href="#contact" variant="primary">
              <span>Start Conversation</span>
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
}
