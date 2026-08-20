"use client";

import { ArcTechHero } from "@/components/sections/ArcTechHero";
import { OriginDossier } from "@/components/sections/OriginDossier";
import { CapabilitiesPosters } from "@/components/sections/CapabilitiesPosters";
import { AchievementsVictories } from "@/components/sections/AchievementsVictories";
import { SagaArchive } from "@/components/sections/SagaArchive";
import { ProjectMissions } from "@/components/sections/ProjectMissions";
import { ChroniclesTimeline } from "@/components/sections/ChroniclesTimeline";
import { SignalsEditorial } from "@/components/sections/SignalsEditorial";
import { GokuBotSection } from "@/components/sections/GokuBotSection";
import { ContactFinale } from "@/components/sections/ContactFinale";
import { ArmourBootSequence, ArmourLoopRestart, ArmourLoopStage } from "@/components/ui/ArmourEvolutionLoop";

export function ArcProtocolOnePage() {
  return (
    <main className="armour-loop-engine relative w-full min-h-screen overflow-x-clip bg-[#05070A] text-[#F1F5F9]">
      <ArmourBootSequence />
      <ArmourLoopStage generation="identity" label="Core → Identity Form"><ArcTechHero /></ArmourLoopStage>
      <ArmourLoopStage generation="foundation" label="Foundation → Reconstruction"><OriginDossier /></ArmourLoopStage>
      <ArmourLoopStage generation="refinement" label="Refinement → Systems Online"><CapabilitiesPosters /></ArmourLoopStage>
      <ArmourLoopStage generation="impact" label="Impact → Controlled Release"><AchievementsVictories /></ArmourLoopStage>
      <ArmourLoopStage generation="deployment" label="Deployment → Module Retract"><SagaArchive /></ArmourLoopStage>
      <ArmourLoopStage generation="mission" label="Mission → Data Compression"><ProjectMissions /></ArmourLoopStage>
      <ArmourLoopStage generation="mission" label="Journey → Memory Archive"><ChroniclesTimeline /></ArmourLoopStage>
      <ArmourLoopStage generation="analysis" label="Analysis → Signal Stream"><SignalsEditorial /></ArmourLoopStage>
      <ArmourLoopStage generation="nanotech" label="Nanotech → Interface Reform"><GokuBotSection /></ArmourLoopStage>
      <ArmourLoopStage generation="convergence" label="Convergence → Core Reset"><ContactFinale /></ArmourLoopStage>
      <ArmourLoopRestart />
    </main>
  );
}
