import {
  aboutParagraphs,
  achievements,
  certifications,
  education,
  experience,
  projects,
  services,
  siteConfig,
  skillCategories,
  socialLinks,
} from "@/data/portfolio";

export type KnowledgeRecord = {
  id: string;
  category: string;
  title: string;
  content: string;
  keywords: string[];
  route?: string;
  externalUrl?: string;
};

export type AssistantSource = { label: string; href: string; external?: boolean };

export const assistantKnowledge: KnowledgeRecord[] = [
  {
    id: "profile",
    category: "Profile",
    title: "Kapil Jangid",
    content: `${aboutParagraphs[0]} ${aboutParagraphs[1]}`,
    keywords: ["kapil", "introduction", "about", "developer", "full stack", "ai"],
    route: "/#about",
  },
  {
    id: "skills",
    category: "Skills",
    title: "Technical skills",
    content: skillCategories.map((group) => `${group.title}: ${group.skills.join(", ")}.`).join(" "),
    keywords: ["skills", "technical", "strongest", "stack", "programming", "python", "typescript", "react", "next", "database", "ai"],
    route: "/#skills",
  },
  ...education.slice(0, 2).map((entry) => ({
    id: `education-${entry.institution}`,
    category: "Education",
    title: entry.institution,
    content: `${entry.qualification} at ${entry.institution}. ${entry.period}. Status: ${entry.status}.`,
    keywords: ["education", "studying", "study", "degree", "college", "iit", "silver oak", "btech", "data science"],
    route: "/#journey",
  })),
  ...projects.map((project) => ({
    id: `project-${project.id}`,
    category: "Project",
    title: project.name,
    content: `${project.name} is ${project.tagline} It addresses this problem: ${project.problem} Key capabilities include ${project.features.slice(0, 3).join("; ")}. Verified stack: ${project.stack.join(", ")}. Status: ${project.status}. Kapil's contribution: ${project.contribution}`,
    keywords: [project.name.toLowerCase(), "project", "projects", "ai project", ...project.stack.map((item) => item.toLowerCase())],
    route: "/#projects",
    externalUrl: project.live ?? project.github,
  })),
  ...services.map((service) => ({
    id: `service-${service.title}`,
    category: "Service",
    title: service.title,
    content: `${service.title}: ${service.description}`,
    keywords: ["service", "services", "work", "collaborate", "freelance", "mvp", "api", "documentation"],
    route: "/#contact",
  })),
  ...experience.map((entry) => ({
    id: `experience-${entry.organisation}`,
    category: "Journey",
    title: `${entry.role} — ${entry.organisation}`,
    content: `${entry.role} at ${entry.organisation}, ${entry.start} to ${entry.end}. ${entry.responsibilities.join(" ")}`,
    keywords: ["journey", "experience", "community", "ieee", "sight", "workshop", "leadership", "humanitarian", "documentation"],
    route: "/#journey",
  })),
  ...achievements.map((achievement) => ({
    id: `achievement-${achievement.title}`,
    category: "Achievement",
    title: achievement.title,
    content: `${achievement.title}. ${achievement.description}${achievement.date ? ` Date: ${achievement.date}.` : ""}`,
    keywords: ["achievement", "achievements", "hackathon", "recognition", "ieee"],
    route: "/#achievements",
  })),
  ...certifications.map((certification) => ({
    id: `certification-${certification.name}`,
    category: "Certification",
    title: certification.name,
    content: `${certification.name}, issued by ${certification.issuer}.${certification.date ? ` ${certification.date}.` : ""}${certification.skills ? ` Relevant skills: ${certification.skills.join(", ")}.` : ""}`,
    keywords: ["certificate", "certification", "certifications", "badge", "google", "cloud", "ieee"],
    route: "/#achievements",
  })),
  {
    id: "availability",
    category: "Contact",
    title: "Availability and contact",
    content: `${siteConfig.contactAvailability} Kapil can be reached at ${siteConfig.email}.`,
    keywords: ["contact", "email", "hire", "availability", "work", "collaborate", "resume", "résumé"],
    route: "/#contact",
  },
  {
    id: "open-source",
    category: "Open source",
    title: "Public repositories",
    content: `Verified public project repositories include ${projects.filter((project) => project.github).map((project) => project.name).join(", ")}. No contribution totals or unverified activity are represented.`,
    keywords: ["open source", "github", "repository", "repositories", "contribution"],
    route: "/#blogs",
    externalUrl: socialLinks.find((link) => link.label === "GitHub")?.href,
  },
];

export const assistantSuggestedQuestions = [
  "What are Kapil’s strongest technical skills?",
  "Show me Kapil’s best AI projects.",
  "Tell me about RetailOS.",
  "What is Kapil studying?",
  "What community experience does Kapil have?",
  "How can I work with Kapil?",
] as const;

export function sourcesFor(records: KnowledgeRecord[]): AssistantSource[] {
  const sources: AssistantSource[] = [];
  for (const record of records) {
    if (record.route && !sources.some((source) => source.href === record.route)) sources.push({ label: `View ${record.category === "Project" ? "Project" : record.title}`, href: record.route });
    if (record.externalUrl && !sources.some((source) => source.href === record.externalUrl)) sources.push({ label: record.category === "Open source" ? "Open GitHub" : "Open verified link", href: record.externalUrl, external: true });
  }
  return sources.slice(0, 3);
}
