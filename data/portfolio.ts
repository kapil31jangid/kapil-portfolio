import type {
  Achievement,
  Article,
  Certification,
  EducationEntry,
  ExperienceEntry,
  IdentityCard,
  LeadershipEntry,
  NavItem,
  Project,
  Service,
  SkillCategory,
  SocialLink,
} from "@/types/portfolio";
import type { ComponentType } from "react";
import { AtSign, BadgeCheck, BarChart3, BookOpen, CodeXml, Gamepad2, Github, Instagram, Linkedin, Mail, MessageCircle, PenLine, Trophy, UsersRound } from "lucide-react";

export type SocialProfile = {
  name: string;
  username?: string;
  description: string;
  url: string;
  icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  category: "professional" | "developer" | "content" | "community" | "contact";
  featured?: boolean;
  external: boolean;
  demo?: boolean;
};

export const siteConfig = {
  name: "Kapil Jangid",
  title: "AI Driven Full Stack Developer",
  location: "Ahmedabad, Gujarat, India",
  email: "kapil31jangid@gmail.com",
  brandMessage:
    "I build intelligent, scalable and user centred digital solutions by combining full stack development with Artificial Intelligence.",
  heroIntro:
    "Computer Science and Data Science student building AI powered products, scalable software systems and practical technology solutions with real world impact.",
  motto: "Code. Create. Play. Repeat.",
  availability:
    "Open to Internships, Freelance Projects and Collaborations",
  contactAvailability:
    "I'm currently open to internships, freelance collaborations and meaningful technical projects.",
  resumePath: "/resume/kapil-jangid-resume.pdf",
  canonicalUrl: "https://kapil31jangid.dev", // TODO: Update after deployment
  ogImage: "/brand/og-image.png",
};

export const rotatingRoles = [
  "AI Driven Full Stack Developer",
  "Generative AI Enthusiast",
  "Aspiring Software Engineer",
  "Student Leader",
  "Gaming Enthusiast",
];

// Keep this list factual; add only information Kapil has verified.
export const currentFocus = [
  "Building intelligent web products with full stack engineering and generative AI.",
  "Exploring cloud native development and scalable deployment practices through student builder communities.",
  "Contributing to technical communities, documentation, and humanitarian technology initiatives.",
];

export const assistantKnowledge = {
  suggestedQuestions: [
    "What does Kapil build?",
    "Which projects can I explore?",
    "What is Kapil studying?",
    "How can I get in touch?",
  ],
  unavailableMessage:
    "KJ Assistant is currently unavailable because no secure portfolio knowledge service has been configured. Please use the navigation or contact Kapil directly.",
};

export const websiteDetails = [
  "A focused personal site for sharing verified work, learning, and ways to collaborate.",
  "Designed as a cyberpunk poster environment with accessible, responsive interaction patterns.",
  "Built with responsive layouts, keyboard focus states, reduced-motion support, and optimised local assets.",
  "Content is maintained centrally. AI-assisted tools were used during development; all public biographical content remains verified.",
];

export const extras = [
  {
    id: "learning",
    title: "Current Learning",
    introduction: "A focused learning log built around the systems and communities shaping Kapil’s next projects.",
    metadata: "Learning log · Active exploration",
    items: [
      { title: "Python", detail: "Strengthening practical programming foundations for AI, data, and product development." },
      { title: "Data Structures", detail: "Building stronger problem-solving and core computer science foundations." },
      { title: "Database Management Systems", detail: "Exploring structured data design, storage, and application data workflows." },
    ],
  },
  {
    id: "tools",
    title: "Favourite Tools",
    introduction: "A practical development loadout for turning ideas into responsive, maintainable products.",
    metadata: "Development loadout · Personal projects",
    items: [
      { title: "VS Code", detail: "Primary code editor listed in Kapil’s development tools." },
      { title: "Git and GitHub", detail: "Version control and public repository workflow." },
      { title: "Docker and Linux", detail: "Tools for repeatable environments and development workflows." },
      { title: "Web, API and data services", detail: "A recurring application stack across full stack and AI product work." },
    ],
  },
  {
    id: "gaming",
    title: "Gaming and Strategy",
    introduction: "Gaming is a personal interest that keeps Kapil curious about strategy, creativity, systems, and competitive thinking beyond development work.",
    metadata: "Personal interest · Verified note",
    items: [
      { title: "Strategy", detail: "Exploring decision-making, planning, and adaptation through games." },
      { title: "Creative Thinking", detail: "Appreciating the systems, storytelling, and problem-solving that games can bring together." },
      { title: "Competitive Mindset", detail: "A personal interest that complements persistence and continuous improvement." },
    ],
  },
  {
    id: "setup",
    title: "Workspace and Setup",
    introduction: "A lean build environment centred on tools already used across Kapil’s development practice.",
    metadata: "Build environment · No hardware claims",
    items: [
      { title: "Linux", detail: "A listed development platform for hands-on engineering workflows." },
      { title: "TypeScript and React", detail: "Core tools for responsive interface implementation." },
      { title: "REST APIs and PostgreSQL", detail: "Foundations for structured application and data systems." },
    ],
  },
  {
    id: "website",
    title: "Behind This Website",
    introduction: "This site transforms Kapil’s poster-inspired visual identity into an immersive route-based experience for presenting work clearly across devices.",
    metadata: "Site systems · Accessibility aware",
    items: websiteDetails.map((detail) => ({ title: "Design note", detail })),
  },
] as const;

export const navigation: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Leadership", href: "#leadership" },
  { label: "Education", href: "#education" },
  { label: "Achievements", href: "#achievements" },
  { label: "Blogs", href: "#blogs" },
  { label: "Contact", href: "#contact" },
];

export const socialProfiles: SocialProfile[] = [
  {
    name: "GitHub",
    username: "@kapil31jangid",
    description: "Code and open-source work",
    url: "https://github.com/kapil31jangid",
    icon: Github,
    category: "developer",
    featured: true,
    external: true,
  },
  {
    name: "LinkedIn",
    username: "kapil31jangid",
    description: "Professional profile",
    url: "https://www.linkedin.com/in/kapil31jangid",
    icon: Linkedin,
    category: "professional",
    featured: true,
    external: true,
  },
  {
    name: "Instagram",
    username: "Demo link",
    description: "Community and personal updates",
    url: "https://www.instagram.com/",
    icon: Instagram,
    category: "community",
    external: true,
    demo: true,
  },
  {
    name: "Credly",
    username: "Demo link",
    description: "Verified digital credentials",
    url: "https://www.credly.com/",
    icon: BadgeCheck,
    category: "professional",
    external: true,
    demo: true,
  },
  {
    name: "Reddit",
    username: "Demo link",
    description: "Community participation",
    url: "https://www.reddit.com/",
    icon: MessageCircle,
    category: "community",
    external: true,
    demo: true,
  },
  {
    name: "Kaggle",
    username: "Demo link",
    description: "Data science profile",
    url: "https://www.kaggle.com/",
    icon: BarChart3,
    category: "developer",
    external: true,
    demo: true,
  },
  {
    name: "Peerlist",
    username: "Demo link",
    description: "Developer profile",
    url: "https://peerlist.io/",
    icon: UsersRound,
    category: "developer",
    external: true,
    demo: true,
  },
  {
    name: "X",
    username: "Demo link",
    description: "Technology updates",
    url: "https://x.com/",
    icon: AtSign,
    category: "community",
    external: true,
    demo: true,
  },
  {
    name: "Hashnode",
    username: "Demo link",
    description: "Technical writing",
    url: "https://hashnode.com/",
    icon: PenLine,
    category: "content",
    external: true,
    demo: true,
  },
  {
    name: "Medium",
    username: "Demo link",
    description: "Articles and insights",
    url: "https://medium.com/",
    icon: BookOpen,
    category: "content",
    external: true,
    demo: true,
  },
  {
    name: "LeetCode",
    username: "Demo link",
    description: "Problem-solving profile",
    url: "https://leetcode.com/",
    icon: CodeXml,
    category: "developer",
    external: true,
    demo: true,
  },
  {
    name: "HackerRank",
    username: "Demo link",
    description: "Coding skills profile",
    url: "https://www.hackerrank.com/",
    icon: Trophy,
    category: "developer",
    external: true,
    demo: true,
  },
  {
    name: "PlayStation",
    username: "Demo link",
    description: "Gaming profile",
    url: "https://www.playstation.com/",
    icon: Gamepad2,
    category: "community",
    external: true,
    demo: true,
  },
  {
    name: "Email",
    username: siteConfig.email,
    description: "Direct professional contact",
    url: `mailto:${siteConfig.email}`,
    icon: Mail,
    category: "contact",
    featured: true,
    external: false,
  },
];

export const socialLinks: SocialLink[] = socialProfiles.filter((profile) => !profile.demo).map((profile) => ({
  label: profile.name,
  href: profile.url,
  icon: profile.name === "GitHub" ? "github" : profile.name === "LinkedIn" ? "linkedin" : "email",
}));

export const aboutParagraphs = [
  "I am pursuing a Bachelor of Technology in Computer Science and Engineering at Silver Oak University alongside a Bachelor of Science in Data Science and Applications at the Indian Institute of Technology Madras.",
  "My work sits at the intersection of full stack product development and Artificial Intelligence. I focus on building intelligent web applications, integrating generative AI capabilities, designing backend systems, and creating user centred experiences that solve practical problems.",
  "I enjoy contributing across the product lifecycle — from shaping ideas and planning user experiences to building frontend interfaces, developing APIs, integrating databases, and adding AI powered features that improve how people work with technology.",
];

export const identityCards: IdentityCard[] = [
  {
    title: "Dual Degree Student",
    description:
      "Computer Science and Data Science programmes at Silver Oak University and IIT Madras.",
  },
  {
    title: "AI and Full Stack Focus",
    description:
      "Generative AI, machine learning, APIs, and end to end product development.",
  },
  {
    title: "Technical Community Leadership",
    description:
      "Student leadership across IEEE, GDG on Campus, and humanitarian technology initiatives.",
  },
  {
    title: "Open to Opportunities",
    description:
      "Internships, freelance collaborations, and meaningful technical projects.",
  },
];

export const skillCategories: SkillCategory[] = [
  {
    title: "Programming",
    skills: ["C", "C++", "Python", "JavaScript", "TypeScript"],
  },
  {
    title: "Frontend Development",
    skills: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "Responsive Web Design",
      "UI Implementation",
    ],
  },
  {
    title: "Backend and Databases",
    skills: [
      "FastAPI",
      "REST APIs",
      "Supabase",
      "Neon PostgreSQL",
      "Database Design",
      "Authentication",
    ],
  },
  {
    title: "AI and Data",
    skills: [
      "Gemini API",
      "Generative AI",
      "Machine Learning",
      "Retrieval Augmented Generation",
      "Prompt Engineering",
      "Intelligent Automation",
      "Data Analysis",
    ],
  },
  {
    title: "Tools and Platforms",
    skills: ["Git", "GitHub", "Docker", "VS Code", "Linux"],
  },
  {
    title: "Core Computer Science",
    skills: [
      "Data Structures and Algorithms",
      "Object Oriented Programming",
      "Database Management Systems",
      "System Design",
      "Problem Solving",
    ],
  },
  {
    title: "Communication and Documentation",
    skills: [
      "Documentation",
      "Report Writing",
      "Letter Writing",
      "Technical Communication",
      "Event Documentation",
    ],
  },
];

export const projects: Project[] = [
  {
    id: "retailos",
    name: "RetailOS",
    tagline:
      "AI powered retail operations platform for small and medium sized businesses.",
    problem:
      "Small and medium retailers often rely on manual processes and disconnected tools, leading to inventory inaccuracies, billing delays, and limited business visibility.",
    features: [
      "Inventory management with low stock and expiry alerts",
      "Smart billing and customer record management",
      "Business analytics and real time operational alerts",
      "Grounded AI assistant for operational decision support",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "FastAPI",
      "Supabase Authentication",
      "Neon PostgreSQL",
      "Gemini API",
    ],
    image: "/projects/retailos-dashboard.png",
    imageAlt: "RetailOS retail operations dashboard",
    status: "In active development",
    contribution: "Full stack architecture, AI assistant design, and product planning.",
    // TODO: Add verified GitHub and live demo URLs when available
  },
  {
    id: "civicpulse",
    name: "CivicPulse",
    tagline:
      "Conversational AI assistant for exploring elections, public priorities, and constituency development.",
    problem:
      "Citizens need accessible ways to explore civic information, understand public priorities, and navigate complex political contexts through guided, trustworthy interactions.",
    features: [
      "Conversational interface with structured state based journey",
      "Civic information exploration and public priority analysis",
      "AI generated insights with user focused decision support",
      "Guided civic engagement workflows",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Generative AI",
      "REST APIs",
      "Prompt Engineering",
    ],
    image: "/projects/civicpulse-dashboard.png",
    imageAlt: "CivicPulse civic information assistant interface",
    status: "In active development",
    contribution: "Conversational UX design, AI workflow architecture, and frontend development.",
    // TODO: Add verified GitHub and live demo URLs when available
  },
  {
    id: "hiresense-ai",
    name: "HireSense AI",
    tagline:
      "Explainable candidate ranking platform designed for recruiter trust.",
    problem:
      "Recruiters need transparent, explainable ways to evaluate candidates at scale without sacrificing trust in automated ranking decisions.",
    features: [
      "Candidate analysis with structured applicant evaluation",
      "Explainable ranking with hybrid scoring models",
      "Recruiter focused workflows and AI assisted insights",
      "Transparent decision support for hiring teams",
    ],
    stack: [
      "React",
      "FastAPI",
      "Vector Search",
      "Generative AI",
      "Python",
    ],
    image: "/projects/hiresense-dashboard.png",
    imageAlt: "HireSense AI explainable candidate ranking dashboard",
    status: "Live demo available",
    contribution: "Full stack development, ranking engine integration, and recruiter UX.",
    github: "https://github.com/kapil31jangid/hiresense-ai",
    live: "https://hiresense-ai-delta.vercel.app",
    caseStudy: "Case study coming soon",
  },
  {
    id: "stadiumos-ai",
    name: "StadiumOS AI",
    tagline:
      "Intelligent stadium operations platform with role based workflows and AI assisted management.",
    problem:
      "Large venue operations require coordinated role based access, real time monitoring, and intelligent decision support across complex stadium environments.",
    features: [
      "Role based secure access and operational dashboards",
      "Stadium management workflows with AI assisted insights",
      "Digital twin inspired command centre experience",
      "Scalable platform architecture for venue operations",
    ],
    stack: ["Next.js", "TypeScript", "AI Integration", "Authentication", "Dashboard UI"],
    image: "/projects/stadiumos-dashboard.png",
    imageAlt: "StadiumOS AI stadium operations command centre",
    status: "Live demo available",
    contribution: "Frontend development, UI design system, and platform architecture.",
    github: "https://github.com/kapil31jangid/stadiumos-ai",
    live: "https://stadiumos-ai-nu.vercel.app",
    caseStudy: "Case study coming soon",
  },
  {
    id: "assetra",
    name: "Assetra",
    tagline:
      "Smart asset rental management with real time dashboards and automated workflows.",
    problem:
      "Asset rental operations need centralised inventory tracking, workflow automation, and actionable analytics to reduce manual overhead.",
    features: [
      "Real time dashboards and inventory tracking",
      "Automated rental workflows",
      "Analytics for operational visibility",
      "Structured asset management interfaces",
    ],
    stack: ["React", "Database Systems", "REST APIs", "Analytics"],
    image: "/projects/assetra-dashboard.png",
    imageAlt: "Assetra asset rental management dashboard",
    status: "Open source",
    contribution: "Full stack development and dashboard implementation.",
    github: "https://github.com/kapil31jangid/Assetra",
    caseStudy: "Case study coming soon",
  },
];

export const experience: ExperienceEntry[] = [
  {
    role: "Secretary",
    organisation: "IEEE SOU SIGHT Student Branch Group",
    location: "Ahmedabad, Gujarat",
    start: "2026",
    end: "Present",
    responsibilities: [
      "Leading humanitarian technology initiatives under IEEE SIGHT at Silver Oak University.",
      "Coordinating technical events and student led community projects with social impact.",
      "Managing collaboration, communication, and execution across volunteer teams.",
    ],
    skills: ["Leadership", "Event Coordination", "Humanitarian Technology", "Documentation"],
  },
  {
    role: "Member",
    organisation: "Silver Oak University IEEE Student Branch",
    location: "Ahmedabad, Gujarat",
    start: "2025",
    end: "Present",
    responsibilities: [
      "Supporting IEEE SB web presence and technical outreach activities.",
      "Contributing to branding, event promotion, and technical community engagement.",
    ],
    skills: ["Community Engagement", "Technical Communication", "Web Management"],
  },
  {
    role: "Member",
    organisation: "GDG on Campus Silver Oak University",
    location: "Ahmedabad, Gujarat",
    start: "Jan 2026",
    end: "Present",
    responsibilities: [
      "Participating in developer focused workshops, hackathons, and collaborative projects.",
      "Engaging with emerging technologies and campus developer communities.",
    ],
    skills: ["Developer Communities", "Workshops", "Collaborative Development"],
  },
  {
    role: "Member",
    organisation: "AWS Student Builder Group at Silver Oak University",
    location: "Ahmedabad, Gujarat",
    start: "Nov 2025",
    end: "Present",
    responsibilities: [
      "Exploring cloud native development concepts and scalable deployment practices.",
      "Participating in student builder community learning initiatives.",
    ],
    skills: ["Cloud Concepts", "Learning Communities", "Scalable Systems"],
  },
];

export const leadershipHighlights: LeadershipEntry[] = [
  {
    title: "Student Leadership",
    description:
      "Serving as Secretary of the IEEE SOU SIGHT Student Branch Group, coordinating humanitarian technology initiatives and student led community projects.",
  },
  {
    title: "Technical Event Organisation",
    description:
      "Contributing to IEEE and GDG on Campus activities including workshops, hackathons, and technical outreach programmes at Silver Oak University.",
  },
  {
    title: "Documentation and Communication",
    description:
      "Creating event documentation, reports, and structured content that supports clear communication across technical communities and organising teams.",
  },
  {
    title: "Community Engagement",
    description:
      "Building connections across developer communities, supporting speaker coordination, workshop planning, and volunteer driven technical initiatives.",
  },
];

export const education: EducationEntry[] = [
  {
    institution: "Silver Oak University",
    qualification:
      "Bachelor of Technology in Computer Science and Engineering",
    period: "July 2025 – July 2029",
    status: "Ongoing",
  },
  {
    institution: "Indian Institute of Technology Madras",
    qualification: "Bachelor of Science in Data Science and Applications",
    period: "Started September 2025",
    status: "Ongoing",
  },
  {
    institution: "G. S. Jangid Memorial School",
    qualification: "Class XII — Physics, Chemistry and Mathematics",
    period: "April 2022 – April 2024",
    status: "Completed",
  },
  {
    institution: "Laxmi Devi Mundra Public School",
    qualification: "Class X — Applied Mathematics",
    period: "April 2014 – May 2022",
    status: "Completed",
  },
];

export const certifications: Certification[] = [
  {
    name: "Gemini Certification for Students",
    issuer: "Google",
    skills: ["Generative AI", "Gemini API", "Prompt Engineering"],
    // TODO: Add completion date and credential URL when available
  },
  {
    name: "Google Cloud Gen AI Study Jams 2025",
    issuer: "Google Cloud",
    date: "2025",
    skills: ["Generative AI", "Cloud AI Services"],
  },
  {
    name: "Claude 101",
    issuer: "Anthropic",
    skills: ["Generative AI", "AI Assistants"],
    // TODO: Add completion date and credential URL when available
  },
  {
    name: "Gen AI Academy 2.0",
    issuer: "Gen AI Academy",
    skills: ["Generative AI", "Machine Learning Foundations"],
    // TODO: Add completion date and credential URL when available
  },
  {
    name: "IEEE Student Member",
    issuer: "IEEE",
    date: "Valid through December 2026",
    image: "/certificates/ieee-student-member.jpg",
    skills: ["Professional Membership", "Technical Community"],
  },
];

export const achievements: Achievement[] = [
  {
    title: "IEEE Student Member",
    description:
      "Recognised as an IEEE Student Member in good standing, reflecting commitment to advancing technology through professional community participation.",
    date: "Through December 2026",
  },
  {
    title: "Odoo x KSV Hackathon 2026",
    description:
      "Participated in the Odoo x KSV Hackathon, engaging in collaborative problem solving and product development under competitive conditions.",
    date: "July 2026",
  },
  {
    title: "AI Conclave 3.0 Community Involvement",
    description:
      "Contributed to AI focused campus initiatives alongside IEEE SOU, GDG on Campus SOU, and related technical communities at Silver Oak University.",
    // TODO: Add specific role and contribution details when confirmed
  },
];

export const articles: Article[] = [
  {
    title: "What Happens Inside an LLM After You Press Enter",
    summary:
      "A technical exploration of the inference pipeline behind large language models — from tokenisation to generation.",
    category: "Generative AI",
    status: "coming-soon",
    // TODO: Add verified publication platform, date, reading time, and external URL
  },
];

export const services: Service[] = [
  {
    title: "AI Powered Web Applications",
    description:
      "Build intelligent web products that integrate AI into practical business workflows.",
    icon: "brain",
  },
  {
    title: "Full Stack Product Development",
    description:
      "Turn product ideas into responsive interfaces, backend systems, and database driven applications.",
    icon: "layers",
  },
  {
    title: "AI API Integration",
    description:
      "Integrate Gemini and other approved AI services into existing or new applications.",
    icon: "plug",
  },
  {
    title: "Backend and API Development",
    description:
      "Develop structured APIs, authentication flows, database systems, and application logic.",
    icon: "server",
  },
  {
    title: "MVP Development",
    description:
      "Build focused, testable product versions for founders, students, and small businesses.",
    icon: "rocket",
  },
  {
    title: "Technical Documentation",
    description:
      "Create clear project documentation, reports, implementation guides, and structured content.",
    icon: "file-text",
  },
];

export const beyondCode = [
  "Gaming enthusiast exploring strategy, creativity, and competitive thinking.",
  "Continuous learner following emerging AI and developer tooling trends.",
  "Active participant in campus technical communities and collaborative events.",
  "Building experimental products that combine creativity with practical engineering.",
];

export const projectTypes = [
  "Internship Opportunity",
  "Freelance Project",
  "Collaboration",
  "Consultation",
  "Other",
];

export const budgetRanges = [
  "Not specified",
  "Under ₹25,000",
  "₹25,000 – ₹50,000",
  "₹50,000 – ₹1,00,000",
  "Above ₹1,00,000",
];
