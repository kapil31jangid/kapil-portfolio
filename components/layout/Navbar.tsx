"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Download, Github, Linkedin, Mail, Home, UserRound, FolderKanban, Route, Sparkles, Send, Award, BadgeCheck, BookOpen, Bot, Code2, Globe2 } from "lucide-react";
import { siteConfig } from "@/data/portfolio";

const items = [
  ["Home", "/", Home], ["About", "/about", UserRound], ["Projects", "/projects", FolderKanban], ["Journey", "/journey", Route], ["Services", "/services", Sparkles], ["Contact", "/contact", Send],
  ["Certifications", "/certifications", BadgeCheck], ["Achievements", "/achievements", Award], ["Blogs", "/blogs", BookOpen], ["Open Source", "/open-source", Code2], ["Social", "/social", Globe2], ["Assistant", "/assistant", Bot], ["Extras", "/extras", Sparkles],
] as const;

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
      {items.map(([label, href, Icon]) => <Link key={href} href={href} className={`orbit-item focus-ring ${pathname === href ? "active" : ""}`} aria-current={pathname === href ? "page" : undefined}><Icon /><span>{label}</span></Link>)}
    </nav>
    <nav className="bottom-nav" aria-label="Portfolio navigation">
      {items.map(([label, href, Icon]) => <Link key={href} href={href} className={`focus-ring ${pathname === href ? "active" : ""}`} aria-current={pathname === href ? "page" : undefined}><Icon /><span>{label}</span></Link>)}
    </nav>
  </>;
}
