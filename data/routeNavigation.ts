export type PortfolioRoute = {
  id: string;
  label: string;
  href: string;
  command: string;
  description: string;
  aliases?: readonly string[];
};

export const portfolioRoutes: readonly PortfolioRoute[] = [
  { id: "home", label: "Home", href: "#hero", command: "home", description: "Return to hero section" },
  { id: "about", label: "About", href: "#about", command: "about", description: "Explore Kapil’s origin story" },
  { id: "skills", label: "Skills", href: "#skills", command: "skills", description: "View technical capabilities", aliases: ["capabilities", "powers"] },
  { id: "achievements", label: "Achievements", href: "#achievements", command: "achievements", description: "See verified credentials and achievements", aliases: ["certs", "victories"] },
  { id: "archive", label: "Saga Archive", href: "#archive", command: "archive", description: "Browse community photo collage", aliases: ["saga", "gallery"] },
  { id: "projects", label: "Projects", href: "#projects", command: "projects", description: "Explore product showcases", aliases: ["work", "missions"] },
  { id: "journey", label: "Journey", href: "#journey", command: "journey", description: "Explore education, experience & leadership", aliases: ["chronicles", "timeline"] },
  { id: "blogs", label: "Signals", href: "#blogs", command: "blogs", description: "Read published articles and open source code", aliases: ["articles", "signals"] },
  { id: "gokubot", label: "GokuBot", href: "#gokubot", command: "gokubot", description: "Interact with Kapil’s portfolio AI assistant", aliases: ["assistant", "bot"] },
  { id: "contact", label: "Contact", href: "#contact", command: "contact", description: "Get in touch with Kapil", aliases: ["connect"] },
];
