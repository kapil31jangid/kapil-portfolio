export type NavItem = {
  label: string;
  href: string;
};

export type SocialLink = {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "email";
};

export type SkillCategory = {
  title: string;
  skills: string[];
};

export type ProjectLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type Project = {
  id: string;
  name: string;
  tagline: string;
  problem: string;
  features: string[];
  stack: string[];
  image: string;
  imageAlt: string;
  status: string;
  contribution: string;
  github?: string;
  live?: string;
  caseStudy?: string;
};

export type ExperienceEntry = {
  role: string;
  organisation: string;
  location: string;
  start: string;
  end: string;
  responsibilities: string[];
  skills: string[];
};

export type LeadershipEntry = {
  title: string;
  description: string;
};

export type EducationEntry = {
  institution: string;
  qualification: string;
  period: string;
  status: "Ongoing" | "Completed";
  details?: string;
};

export type Certification = {
  name: string;
  issuer: string;
  date?: string;
  image?: string;
  credentialUrl?: string;
  skills?: string[];
};

export type Achievement = {
  title: string;
  description: string;
  date?: string;
};

export type Article = {
  title: string;
  summary: string;
  platform?: string;
  date?: string;
  readingTime?: string;
  coverImage?: string;
  url?: string;
  category: string;
  status: "published" | "coming-soon";
};

export type Service = {
  title: string;
  description: string;
  icon: string;
};

export type IdentityCard = {
  title: string;
  description: string;
};
