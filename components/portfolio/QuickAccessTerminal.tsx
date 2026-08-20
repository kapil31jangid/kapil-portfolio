"use client";

import { FormEvent, KeyboardEvent, useCallback, useRef, useState } from "react";
import { Terminal } from "lucide-react";
import { siteConfig } from "@/data/portfolio";
import { portfolioRoutes } from "@/data/routeNavigation";

export function QuickAccessTerminal() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("Forged Command Console online. Type 'help' for section commands.");
  const [status, setStatus] = useState("CONDUCTOR_READY");

  const scrollToAnchor = (anchor: string, label: string) => {
    const el = document.querySelector(anchor);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setOutput(`COMMAND EXECUTED: Navigating to ${label}...`);
      setStatus(`SECTION_${label.toUpperCase()}_ENGAGED`);
    } else {
      setOutput(`SECTION ${label} NOT FOUND.`);
    }
  };

  const handleCommand = useCallback((rawInput: string) => {
    const cmd = rawInput.trim().toLowerCase();
    if (!cmd) return;

    setInput("");

    if (cmd === "clear") {
      setOutput("Console logs cleared.");
      setStatus("CONSOLE_READY");
      return;
    }

    if (cmd === "help") {
      setOutput("Available commands: help, about, projects, skills, journey, achievements, blogs, gokubot, contact, resume, clear");
      setStatus("DIRECTORY_OPENED");
      return;
    }

    if (cmd === "resume") {
      setOutput("Downloading Kapil's verified résumé...");
      setStatus("RESUME_DOWNLOADED");
      const a = document.createElement("a");
      a.href = siteConfig.resumePath;
      a.download = "kapil-jangid-resume.pdf";
      a.click();
      return;
    }

    const matchedRoute = portfolioRoutes.find(
      (r) => r.command === cmd || r.aliases?.includes(cmd)
    );

    if (matchedRoute) {
      scrollToAnchor(matchedRoute.href, matchedRoute.label);
      return;
    }

    setOutput(`Unknown command: '${cmd}'. Type 'help' for options.`);
    setStatus("COMMAND_UNRECOGNIZED");
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleCommand(input);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") setInput("");
  };

  return (
    <div className="gunmetal-surface engraved-border rounded-lg overflow-hidden flex flex-col shadow-2xl backdrop-blur-md">
      {/* 1. Structural Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950/90 border-b border-blue-500/20">
        <div className="flex items-center gap-2 font-mono text-xs font-bold text-blue-400 uppercase tracking-widest">
          <Terminal size={14} className="text-blue-400 animate-pulse" />
          <span>STORMCORE // COMMAND CONSOLE</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#2F8CFF]" />
          <span className="w-2 h-2 rounded-full bg-slate-700" />
          <span className="w-2 h-2 rounded-full bg-slate-700" />
        </div>
      </div>

      {/* 2. Readable Output Region */}
      <div className="px-4 py-3 min-h-[4.5rem] max-h-[6.5rem] overflow-y-auto font-mono text-xs text-slate-300 bg-slate-950/70 border-b border-blue-500/10">
        <p className="leading-relaxed">{output}</p>
      </div>

      {/* 3. Status Guidance Line */}
      <div className="px-4 py-1.5 bg-blue-950/40 text-[10px] font-mono text-blue-300 uppercase tracking-wider flex justify-between items-center border-b border-blue-500/10">
        <span>STATUS: {status}</span>
        <span className="text-slate-400">{"INPUT: TYPE 'HELP'"}</span>
      </div>

      {/* 4. Illuminated Input Conductor Row */}
      <form onSubmit={handleSubmit} className="flex items-center px-4 py-2 bg-slate-900/90 gap-2">
        <span className="font-mono text-xs font-bold text-blue-400 select-none">
          kj@stormcore:~$
        </span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="type a command..."
          className="flex-1 bg-transparent border-none text-xs font-mono text-white focus:outline-none placeholder-slate-500"
          spellCheck={false}
          autoComplete="off"
        />
      </form>
    </div>
  );
}
