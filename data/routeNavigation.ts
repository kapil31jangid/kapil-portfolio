export type PortfolioRoute = {
  id: string;
  label: string;
  href: string;
  command: string;
  description: string;
  aliases?: readonly string[];
};

export const portfolioRoutes: readonly PortfolioRoute[] = [
  { id: "home", label: "Home", href: "/", command: "home", description: "Return to the home page" },
  { id: "about", label: "About", href: "/about", command: "about", description: "Learn about Kapil" },
  { id: "projects", label: "Projects", href: "/projects", command: "projects", description: "View Kapil’s projects", aliases: ["work"] },
  { id: "journey", label: "Journey", href: "/journey", command: "journey", description: "Explore experience and community work" },
  { id: "services", label: "Services", href: "/services", command: "services", description: "See ways to collaborate" },
  { id: "contact", label: "Contact", href: "/contact", command: "contact", description: "Find contact options" },
  { id: "certifications", label: "Certifications", href: "/certifications", command: "certifications", description: "Browse verified credentials", aliases: ["certs"] },
  { id: "achievements", label: "Achievements", href: "/achievements", command: "achievements", description: "See milestones and recognition" },
  { id: "blogs", label: "Blogs", href: "/blogs", command: "blogs", description: "Read published articles", aliases: ["blog"] },
  { id: "open-source", label: "Open Source", href: "/open-source", command: "open-source", description: "Explore public code", aliases: ["opensource"] },
  { id: "social", label: "Social", href: "/social", command: "social", description: "Open social profiles" },
  { id: "gokubot", label: "GokuBot", href: "/assistant", command: "gokubot", description: "Start a conversation with GokuBot", aliases: ["assistant", "bot"] },
  { id: "extras", label: "Extras", href: "/extras", command: "extras", description: "Explore more of Kapil’s interests" },
];
