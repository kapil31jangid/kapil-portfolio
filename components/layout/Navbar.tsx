"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import { Download, Github, Linkedin, Mail, Home, UserRound, FolderKanban, Route, Sparkles, Send, Award, BadgeCheck, BookOpen, Bot, Code2, Globe2 } from "lucide-react";
import { siteConfig } from "@/data/portfolio";
import { portfolioRoutes } from "@/data/routeNavigation";

const navigationIcons: Record<string, LucideIcon> = {
  home: Home,
  about: UserRound,
  projects: FolderKanban,
  journey: Route,
  services: Sparkles,
  contact: Send,
  certifications: BadgeCheck,
  achievements: Award,
  blogs: BookOpen,
  "open-source": Code2,
  social: Globe2,
  gokubot: Bot,
  extras: Sparkles,
};

export function Navbar() {
  const pathname = usePathname();
  return <>
    <header className="site-header">
      <Link href="/" className="identity focus-ring" aria-label="Kapil Jangid home"><b>KJ</b><span>Kapil Jangid</span></Link>
      <div className="header-actions">
        <a href="https://github.com/kapil31jangid" target="_blank" rel="noopener noreferrer" className="focus-ring" aria-label="GitHub"><Github /></a>
        <a href="https://www.linkedin.com/in/kapil31jangid" target="_blank" rel="noopener noreferrer" className="focus-ring" aria-label="LinkedIn"><Linkedin /></a>
        <a href={`mailto:${siteConfig.email}`} className="focus-ring" aria-label="Email Kapil"><Mail /></a>
        <a href={siteConfig.resumePath} download className="resume-link focus-ring"><Download /> <span>Résumé</span></a>
      </div>
    </header>
    <nav className="orbit-nav" aria-label="Portfolio navigation">
      {portfolioRoutes.map((item) => {
        const Icon = navigationIcons[item.id];
        return <Link key={item.href} href={item.href} className={`orbit-item focus-ring ${pathname === item.href ? "active" : ""}`} aria-current={pathname === item.href ? "page" : undefined}><Icon /><span>{item.label}</span></Link>;
      })}
    </nav>
    <nav className="bottom-nav" aria-label="Portfolio navigation">
      {portfolioRoutes.map((item) => {
        const Icon = navigationIcons[item.id];
        return <Link key={item.href} href={item.href} className={`focus-ring ${pathname === item.href ? "active" : ""}`} aria-current={pathname === item.href ? "page" : undefined}><Icon /><span>{item.label}</span></Link>;
      })}
    </nav>
  </>;
}
