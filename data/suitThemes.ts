export type SuitId =
  | "mark-1"
  | "mark-3"
  | "mark-5"
  | "mark-7"
  | "mark-42"
  | "mark-46"
  | "mark-50"
  | "mark-85";

export interface SuitConfig {
  id: SuitId;
  markNumber: string;
  name: string;
  label: string;
  tagline: string;
  material: string;
  primaryColor: string;
  secondaryColor: string;
  energyColor: string;
  glowColor: string;
  bgColor: string;
  reactorType: string;
  assemblyStyle: string;
  geometryType: string;
  pbrParams: {
    metalness: number;
    roughness: number;
    clearcoat: number;
    emissiveIntensity: number;
  };
  specDetails: {
    armourClass: string;
    alloyComposition: string;
    powerCore: string;
    deploymentSpeed: string;
  };
}

export const suitCollection: SuitConfig[] = [
  {
    id: "mark-1",
    markNumber: "MARK I",
    name: "Cave Prototype (2008)",
    label: "MCU // MARK I",
    tagline: "Iron Man (2008) Unfinished Cave Cast Iron Engineering",
    material: "Forged Heavy Cast Iron & Salvaged Steel",
    primaryColor: "#4A525D",
    secondaryColor: "#9A6A20",
    energyColor: "#F59E0B",
    glowColor: "rgba(245, 158, 11, 0.45)",
    bgColor: "#090B0E",
    reactorType: "Crude Pneumatic Arc Generator",
    assemblyStyle: "Manual Mechanical Bolting",
    geometryType: "rough-iron",
    pbrParams: {
      metalness: 0.75,
      roughness: 0.55,
      clearcoat: 0.1,
      emissiveIntensity: 1.2,
    },
    specDetails: {
      armourClass: "Cave Salvage Prototype",
      alloyComposition: "Cast Iron & Crude Steel Plates",
      powerCore: "Miniature Crude Generator",
      deploymentSpeed: "Manual Mechanical Lock",
    },
  },
  {
    id: "mark-3",
    markNumber: "MARK III",
    name: "Classic Red & Gold (2008)",
    label: "MCU // MARK III",
    tagline: "Iron Man (2008) Classic Polished Gold-Titanium Shell",
    material: "Gold-Titanium Alloy & Clearcoat Crimson",
    primaryColor: "#D11A22",
    secondaryColor: "#D6A43B",
    energyColor: "#7FEFFF",
    glowColor: "rgba(209, 26, 34, 0.5)",
    bgColor: "#05070A",
    reactorType: "Tri-Ring Arc Core",
    assemblyStyle: "Pneumatic Gantry Interlock",
    geometryType: "polished-plates",
    pbrParams: {
      metalness: 0.92,
      roughness: 0.18,
      clearcoat: 0.8,
      emissiveIntensity: 2.0,
    },
    specDetails: {
      armourClass: "Tactical Combat Grade",
      alloyComposition: "Gold-Titanium Matrix",
      powerCore: "Dual-Chamber Arc Core",
      deploymentSpeed: "Automated Gantry Interlock",
    },
  },
  {
    id: "mark-5",
    markNumber: "MARK V",
    name: "Suitcase Suit (2010)",
    label: "MCU // MARK V",
    tagline: "Iron Man 2 (2010) Suitcase Unfolding Segmented Latches",
    material: "Segmented Lightweight Steel Mesh & Crimson",
    primaryColor: "#DC2626",
    secondaryColor: "#CBD5E1",
    energyColor: "#7FEFFF",
    glowColor: "rgba(220, 38, 38, 0.45)",
    bgColor: "#07080D",
    reactorType: "Compact Arc Cell",
    assemblyStyle: "14-Second Suitcase Unfold",
    geometryType: "suitcase-panels",
    pbrParams: {
      metalness: 0.88,
      roughness: 0.25,
      clearcoat: 0.6,
      emissiveIntensity: 1.8,
    },
    specDetails: {
      armourClass: "Portable Rapid Response",
      alloyComposition: "Articulated Steel Latches",
      powerCore: "Compact Arc Cell",
      deploymentSpeed: "14-Second Emergency Unfold",
    },
  },
  {
    id: "mark-7",
    markNumber: "MARK VII",
    name: "Avengers Flight Suit (2012)",
    label: "MCU // MARK VII",
    tagline: "The Avengers (2012) Mid-Air Homing Flight Armour",
    material: "Reinforced Heavy Combat Gold-Titanium",
    primaryColor: "#B91C1C",
    secondaryColor: "#EAB308",
    energyColor: "#38BDF8",
    glowColor: "rgba(185, 28, 28, 0.55)",
    bgColor: "#06070B",
    reactorType: "High-Flux Pulse Arc Core",
    assemblyStyle: "Mid-Air Homing Pod Lock",
    geometryType: "flight-pods",
    pbrParams: {
      metalness: 0.94,
      roughness: 0.2,
      clearcoat: 0.75,
      emissiveIntensity: 2.2,
    },
    specDetails: {
      armourClass: "Heavy Airborne Assault",
      alloyComposition: "Hardened Gold-Steel Mesh",
      powerCore: "High-Flux Arc Chamber",
      deploymentSpeed: "Mid-Air Homing Lock",
    },
  },
  {
    id: "mark-42",
    markNumber: "MARK XLII",
    name: "Prehensile Assembly (2013)",
    label: "MCU // MARK XLII",
    tagline: "Iron Man 3 (2013) Prehensile Gold-Dominant Modular Suit",
    material: "Gold-Dominant Prehensile Micro-Tiles",
    primaryColor: "#EAB308",
    secondaryColor: "#991B1B",
    energyColor: "#38BDF8",
    glowColor: "rgba(234, 179, 8, 0.5)",
    bgColor: "#080706",
    reactorType: "Magnetic Resonance Arc Core",
    assemblyStyle: "Sub-Surface Prehensile Fly-In",
    geometryType: "autonomous-components",
    pbrParams: {
      metalness: 0.9,
      roughness: 0.22,
      clearcoat: 0.7,
      emissiveIntensity: 2.0,
    },
    specDetails: {
      armourClass: "Autonomous Remote Flight",
      alloyComposition: "Gold-Dominant Micro-Tiles",
      powerCore: "Sub-Pulse Arc Matrix",
      deploymentSpeed: "Individual Piece Convergence",
    },
  },
  {
    id: "mark-46",
    markNumber: "MARK XLVI",
    name: "Civil War Suit (2016)",
    label: "MCU // MARK XLVI",
    tagline: "Captain America: Civil War (2016) Multi-Node Housing",
    material: "Sculpted Deep Crimson Titanium Shell",
    primaryColor: "#991B1B",
    secondaryColor: "#D97706",
    energyColor: "#38BDF8",
    glowColor: "rgba(153, 27, 27, 0.55)",
    bgColor: "#060507",
    reactorType: "Multi-Point Micro Arc Sensors",
    assemblyStyle: "Retractable Helmet Slider",
    geometryType: "geometric-nodes",
    pbrParams: {
      metalness: 0.95,
      roughness: 0.15,
      clearcoat: 0.85,
      emissiveIntensity: 2.3,
    },
    specDetails: {
      armourClass: "Civil Defense Strike",
      alloyComposition: "Composite Titanium Weave",
      powerCore: "Primary Core + 12 Micro Arc Sensors",
      deploymentSpeed: "Retractable Helmet Slider",
    },
  },
  {
    id: "mark-50",
    markNumber: "MARK L",
    name: "Nanotech Suit (2018)",
    label: "MCU // MARK L",
    tagline: "Avengers: Infinity War (2018) Nanotechnology Mesh",
    material: "Liquid Carbon Nanoparticles & Gold Accent",
    primaryColor: "#DC2626",
    secondaryColor: "#F59E0B",
    energyColor: "#38BDF8",
    glowColor: "rgba(56, 189, 248, 0.7)",
    bgColor: "#040508",
    reactorType: "Nanotech Arc Node",
    assemblyStyle: "Fluid Particle Reconstruction",
    geometryType: "nanotech-mesh",
    pbrParams: {
      metalness: 0.96,
      roughness: 0.12,
      clearcoat: 0.9,
      emissiveIntensity: 2.5,
    },
    specDetails: {
      armourClass: "Nanotech Adaptive Class",
      alloyComposition: "Self-Healing Micro-Particles",
      powerCore: "High-Density Arc Core Node",
      deploymentSpeed: "Instantaneous Surface Fluidity",
    },
  },
  {
    id: "mark-85",
    markNumber: "MARK LXXXV",
    name: "Endgame Final Suit (2019)",
    label: "MCU // MARK LXXXV",
    tagline: "Avengers: Endgame (2019) Vibranium Nano Lattice",
    material: "Refined Gold-Titanium & Vibranium Nano Lattice",
    primaryColor: "#EF4444",
    secondaryColor: "#F59E0B",
    energyColor: "#F0F9FF",
    glowColor: "rgba(240, 249, 255, 0.85)",
    bgColor: "#030407",
    reactorType: "Quantum Singularity Arc Reactor",
    assemblyStyle: "Quantum Nanotech Assembly",
    geometryType: "convergence-core",
    pbrParams: {
      metalness: 0.98,
      roughness: 0.08,
      clearcoat: 1.0,
      emissiveIntensity: 3.0,
    },
    specDetails: {
      armourClass: "Final Generation Supreme Class",
      alloyComposition: "Vibranium-Enhanced Gold-Nano Lattice",
      powerCore: "Singularity Arc Reactor",
      deploymentSpeed: "Neural Command Instantaneous",
    },
  },
];

export const suitMap: Record<SuitId, SuitConfig> = suitCollection.reduce(
  (acc, suit) => {
    acc[suit.id] = suit;
    return acc;
  },
  {} as Record<SuitId, SuitConfig>
);

export const suitThemes = suitMap;
