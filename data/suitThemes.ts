export type SuitGenerationId =
  | "mark-3"
  | "mark-1"
  | "mark-2"
  | "mark-5"
  | "mark-7"
  | "hulkbuster"
  | "mark-42"
  | "mark-50"
  | "mark-85";

export interface SuitTheme {
  id: SuitGenerationId;
  name: string;
  generationLabel: string;
  systemTitle: string;
  sectionAnchor: string;
  primaryMetal: string;
  secondaryMetal: string;
  accentEnergy: string;
  glowColour: string;
  geometryType: "polished-plates" | "rough-iron" | "titanium-grid" | "suitcase-panels" | "flight-pods" | "heavy-hydraulic" | "autonomous-components" | "nanotech-mesh" | "convergence-core";
  technicalTagline: string;
}

export const suitThemes: Record<SuitGenerationId, SuitTheme> = {
  "mark-3": {
    id: "mark-3",
    name: "Mark III",
    generationLabel: "GEN 01 // MARK III",
    systemTitle: "IDENTITY SYSTEM",
    sectionAnchor: "#hero",
    primaryMetal: "#8F1015",
    secondaryMetal: "#D6A43B",
    accentEnergy: "#7FEFFF",
    glowColour: "rgba(127, 239, 255, 0.4)",
    geometryType: "polished-plates",
    technicalTagline: "Polished Red-Gold Iconic Armour Architecture",
  },
  "mark-1": {
    id: "mark-1",
    name: "Mark I",
    generationLabel: "GEN 02 // MARK I",
    systemTitle: "FOUNDATION SYSTEM",
    sectionAnchor: "#about",
    primaryMetal: "#2A313A",
    secondaryMetal: "#9A6A20",
    accentEnergy: "#F59E0B",
    glowColour: "rgba(245, 158, 11, 0.4)",
    geometryType: "rough-iron",
    technicalTagline: "Rough Iron & Welding Mark Engineering",
  },
  "mark-2": {
    id: "mark-2",
    name: "Mark II",
    generationLabel: "GEN 03 // MARK II",
    systemTitle: "REFINEMENT SYSTEM",
    sectionAnchor: "#skills",
    primaryMetal: "#C7CDD5",
    secondaryMetal: "#475569",
    accentEnergy: "#7FEFFF",
    glowColour: "rgba(127, 239, 255, 0.5)",
    geometryType: "titanium-grid",
    technicalTagline: "Silver Titanium & Blueprint Subsystem Diagnostic",
  },
  "mark-5": {
    id: "mark-5",
    name: "Mark V",
    generationLabel: "GEN 04 // MARK V",
    systemTitle: "DEPLOYMENT SYSTEM",
    sectionAnchor: "#projects",
    primaryMetal: "#D11A22",
    secondaryMetal: "#C7CDD5",
    accentEnergy: "#7FEFFF",
    glowColour: "rgba(209, 26, 34, 0.4)",
    geometryType: "suitcase-panels",
    technicalTagline: "Suitcase-Armour Folding Panel Mechanics",
  },
  "mark-7": {
    id: "mark-7",
    name: "Mark VII",
    generationLabel: "GEN 05 // MARK VII",
    systemTitle: "MISSION SYSTEM",
    sectionAnchor: "#journey",
    primaryMetal: "#8F1015",
    secondaryMetal: "#D6A43B",
    accentEnergy: "#7FEFFF",
    glowColour: "rgba(143, 16, 21, 0.5)",
    geometryType: "flight-pods",
    technicalTagline: "Advanced Flight Armour & Mission Route Waypoints",
  },
  "hulkbuster": {
    id: "hulkbuster",
    name: "Hulkbuster",
    generationLabel: "GEN 06 // HULKBUSTER",
    systemTitle: "IMPACT SYSTEM",
    sectionAnchor: "#achievements",
    primaryMetal: "#6B0D11",
    secondaryMetal: "#9A6A20",
    accentEnergy: "#F4FDFF",
    glowColour: "rgba(244, 253, 255, 0.5)",
    geometryType: "heavy-hydraulic",
    technicalTagline: "Heavy Interlocking Hydraulic Plates & Impact Locks",
  },
  "mark-42": {
    id: "mark-42",
    name: "Mark XLII",
    generationLabel: "GEN 07 // MARK XLII",
    systemTitle: "ANALYTICAL SYSTEM",
    sectionAnchor: "#blogs",
    primaryMetal: "#D6A43B",
    secondaryMetal: "#8F1015",
    accentEnergy: "#7FEFFF",
    glowColour: "rgba(214, 164, 59, 0.4)",
    geometryType: "autonomous-components",
    technicalTagline: "Autonomous Component Layers & Dark Crimson Glass",
  },
  "mark-50": {
    id: "mark-50",
    name: "Mark L",
    generationLabel: "GEN 08 // MARK L",
    systemTitle: "NANOTECH SYSTEM",
    sectionAnchor: "#gokubot",
    primaryMetal: "#8F1015",
    secondaryMetal: "#D6A43B",
    accentEnergy: "#7FEFFF",
    glowColour: "rgba(127, 239, 255, 0.6)",
    geometryType: "nanotech-mesh",
    technicalTagline: "Nanotechnology Assembly & Particle AI Mesh",
  },
  "mark-85": {
    id: "mark-85",
    name: "Mark LXXXV",
    generationLabel: "GEN 09 // MARK LXXXV",
    systemTitle: "CONVERGENCE SYSTEM",
    sectionAnchor: "#contact",
    primaryMetal: "#D11A22",
    secondaryMetal: "#D6A43B",
    accentEnergy: "#F4FDFF",
    glowColour: "rgba(244, 253, 255, 0.8)",
    geometryType: "convergence-core",
    technicalTagline: "Refined Final Generation Convergence Architecture",
  },
};
