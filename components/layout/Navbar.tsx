"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Download, Github, Linkedin, Mail, ShieldAlert, Zap } from "lucide-react";
import { siteConfig } from "@/data/portfolio";

export function Navbar() {
  const [coreState, setCoreState] = useState<"subdued" | "online">("subdued");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const savedState = window.sessionStorage.getItem("kj-core-state");
      if (savedState === "online") {
        setCoreState("online");
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <header className="site-header">
      <Link href="#hero" className="identity focus-ring" aria-label="Kapil Jangid home">
        <b>KJ</b>
        <div className="flex flex-col">
          <span>Kapil Jangid</span>
          <span className="text-[9px] text-amber-400 font-mono tracking-widest flex items-center gap-1">
            {coreState === "online" ? (
              <>
                <Zap size={10} className="text-cyan-400 fill-cyan-400 animate-pulse" /> CORE // ONLINE
              </>
            ) : (
              <>
                <ShieldAlert size={10} className="text-amber-500" /> PROTOCOL // SUBDUED
              </>
            )}
          </span>
        </div>
      </Link>

      <div className="header-actions">
        <a
          href="https://github.com/kapil31jangid"
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring px-2.5"
          aria-label="GitHub"
        >
          <Github size={16} />
        </a>
        <a
          href="https://www.linkedin.com/in/kapil31jangid"
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring px-2.5"
          aria-label="LinkedIn"
        >
          <Linkedin size={16} />
        </a>
        <a
          href={`mailto:${siteConfig.email}`}
          className="focus-ring px-2.5"
          aria-label="Email Kapil"
        >
          <Mail size={16} />
        </a>
        <a
          href={siteConfig.resumePath}
          download
          className="resume-link focus-ring"
        >
          <Download size={14} /> <span>Résumé</span>
        </a>
      </div>
    </header>
  );
}
