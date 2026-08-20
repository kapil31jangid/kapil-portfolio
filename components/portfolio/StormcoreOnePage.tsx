"use client";

import { StormfrontHero } from "@/components/sections/StormfrontHero";
import { OriginStory } from "@/components/sections/OriginStory";
import { CapabilitiesPosters } from "@/components/sections/CapabilitiesPosters";
import { AchievementsVictories } from "@/components/sections/AchievementsVictories";
import { SagaArchive } from "@/components/sections/SagaArchive";
import { ProjectMissions } from "@/components/sections/ProjectMissions";
import { ChroniclesTimeline } from "@/components/sections/ChroniclesTimeline";
import { SignalsEditorial } from "@/components/sections/SignalsEditorial";
import { GokuBotSection } from "@/components/sections/GokuBotSection";
import { ContactFinale } from "@/components/sections/ContactFinale";
import { StormTransition } from "@/components/ui/StormTransition";

export function StormcoreOnePage() {
  return (
    <main className="relative w-full bg-[#05070D] text-[#EAF7FF] min-h-screen">
      {/* Section 01: Stormfront Hero Poster */}
      <StormfrontHero />

      {/* Transition 1: Hero -> Origin (Thunder Split) */}
      <StormTransition mode="thunder-split">
        <OriginStory />
      </StormTransition>

      {/* Transition 2: Origin -> Powers (Forged Descent) */}
      <StormTransition mode="forged-descent">
        <CapabilitiesPosters />
      </StormTransition>

      {/* Transition 3: Powers -> Victories (Circular Energy-Gate) */}
      <StormTransition mode="energy-gate">
        <AchievementsVictories />
      </StormTransition>

      {/* Transition 4: Victories -> Saga Archive (Storm Blackout) */}
      <StormTransition mode="storm-blackout">
        <SagaArchive />
      </StormTransition>

      {/* Transition 5: Archive -> Missions (Electrical Continuity) */}
      <StormTransition mode="electrical-continuity">
        <ProjectMissions />
      </StormTransition>

      {/* Transition 6: Missions -> Journey (Timeline Compression) */}
      <StormTransition mode="timeline-compression">
        <ChroniclesTimeline />
      </StormTransition>

      {/* Transition 7: Journey -> Signals (Silver Editorial Reveal) */}
      <StormTransition mode="silver-reveal">
        <SignalsEditorial />
      </StormTransition>

      {/* Transition 8: Signals -> GokuBot & Contact (Energy Convergence) */}
      <StormTransition mode="energy-convergence">
        <GokuBotSection />
        <ContactFinale />
      </StormTransition>
    </main>
  );
}
