import Link from "next/link";
import { Download, Github, Linkedin, Mail } from "lucide-react";
import { siteConfig } from "@/data/portfolio";

export function Footer() {
  return <footer className="site-footer"><div><span className="footer-mark">KJ</span><p><b>Kapil Jangid</b><br />AI Driven Full Stack Developer</p></div><div className="footer-links"><a href="https://github.com/kapil31jangid" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github /></a><a href="https://www.linkedin.com/in/kapil31jangid" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin /></a><a href={`mailto:${siteConfig.email}`} aria-label="Email"><Mail /></a><a href={siteConfig.resumePath} download aria-label="Download résumé"><Download /></a><Link href="/">Return home</Link></div><small>© {new Date().getFullYear()} Kapil Jangid</small></footer>;
}
