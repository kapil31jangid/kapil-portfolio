"use client";

import { FormEvent, KeyboardEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Terminal } from "lucide-react";
import { siteConfig } from "@/data/portfolio";
import { portfolioRoutes } from "@/data/routeNavigation";

type BodyView = "quick" | "all" | "output";
type CommandGroup = "Portfolio" | "Proof and Writing" | "Connect" | "Tools";

type CommandDefinition = {
  id: string;
  command: string;
  label: string;
  description: string;
  group: CommandGroup;
  aliases?: readonly string[];
  external?: boolean;
};

const externalCommands = {
  github: { label: "GitHub", href: "https://github.com/kapil31jangid", description: "Open Kapil’s GitHub profile" },
  linkedin: { label: "LinkedIn", href: "https://www.linkedin.com/in/kapil31jangid", description: "Open Kapil’s LinkedIn profile" },
  resume: { label: "Résumé", href: siteConfig.resumePath, description: "Download Kapil’s résumé" },
} as const;

const commandGroupOrder: readonly CommandGroup[] = ["Portfolio", "Proof and Writing", "Connect", "Tools"];
const routeIdsByGroup: Record<CommandGroup, readonly string[]> = {
  Portfolio: ["home", "about", "projects", "journey", "services", "contact"],
  "Proof and Writing": ["certifications", "achievements", "blogs", "open-source"],
  Connect: ["social"],
  Tools: ["gokubot", "extras"],
};
const quickCommandIds = ["projects", "about", "journey", "gokubot", "contact", "resume"] as const;

export function QuickAccessTerminal() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const allCommandsTriggerRef = useRef<HTMLButtonElement>(null);
  const firstDirectoryCommandRef = useRef<HTMLButtonElement>(null);
  const [bodyView, setBodyView] = useState<BodyView>("quick");
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [status, setStatus] = useState("Choose a destination or type a command.");
  const [output, setOutput] = useState("");
  const focusDirectoryCommand = useRef(false);

  const commands = useMemo<CommandDefinition[]>(() => {
    const byId = new Map(portfolioRoutes.map((route) => [route.id, route]));
    const definitions: CommandDefinition[] = [];

    for (const group of commandGroupOrder) {
      for (const routeId of routeIdsByGroup[group]) {
        const route = byId.get(routeId);
        if (route) definitions.push({ ...route, group });
      }
      if (group === "Connect") {
        for (const [id, command] of Object.entries(externalCommands)) {
          definitions.push({ id, command: id, label: command.label, description: command.description, group, external: true });
        }
      }
      if (group === "Tools") {
        definitions.push(
          { id: "whoami", command: "whoami", label: "Whoami", description: "Show Kapil’s verified introduction", group },
          { id: "clear", command: "clear", label: "Clear", description: "Return to quick access", group },
          { id: "help", command: "help", label: "Help", description: "Open the command directory", group },
        );
      }
    }
    return definitions;
  }, []);

  const commandLookup = useMemo(() => {
    const lookup = new Map<string, CommandDefinition>();
    for (const command of commands) {
      lookup.set(command.command, command);
      for (const alias of command.aliases ?? []) lookup.set(alias, command);
    }
    return lookup;
  }, [commands]);

  const quickCommands = useMemo(() => quickCommandIds.flatMap((id) => {
    const command = commands.find((item) => item.id === id);
    return command ? [command] : [];
  }), [commands]);

  const completion = useMemo(() => {
    const query = input.trim().toLowerCase().replace(/^open\s+/, "");
    if (!query) return undefined;
    return commands.find((command) => [command.command, command.label.toLowerCase(), ...(command.aliases ?? [])].some((term) => term.startsWith(query)));
  }, [commands, input]);

  const showQuick = useCallback((focusTrigger = false) => {
    setBodyView("quick");
    setOutput("");
    setStatus("Choose a destination or type a command.");
    if (focusTrigger) window.setTimeout(() => allCommandsTriggerRef.current?.focus(), 0);
  }, []);

  const showAll = useCallback((focusFirst = false) => {
    focusDirectoryCommand.current = focusFirst;
    setBodyView("all");
    setStatus("Command directory opened.");
  }, []);

  const showOutput = useCallback((message: string, nextStatus = message) => {
    setOutput(message);
    setBodyView("output");
    setStatus(nextStatus);
  }, []);

  const executeCommand = useCallback((rawValue: string) => {
    const rawCommand = rawValue.trim().toLowerCase();
    if (!rawCommand) return;

    setHistory((current) => [...current.slice(-29), rawCommand]);
    setHistoryIndex(-1);
    setInput("");

    if (rawCommand === "help") {
      showAll(true);
      return;
    }
    if (rawCommand === "clear") {
      showQuick();
      window.setTimeout(() => inputRef.current?.focus(), 0);
      return;
    }
    if (rawCommand === "whoami") {
      showOutput("Kapil Jangid · AI-Driven Full-Stack Developer · Computer Science student at Silver Oak University and Data Science student at IIT Madras.", "Verified profile summary shown.");
      return;
    }

    const [verb, target, ...remainder] = rawCommand.split(/\s+/);
    const commandName = verb === "open" && target && remainder.length === 0 ? target : remainder.length === 0 ? verb : "";
    const command = commandLookup.get(commandName);

    if (!command) {
      showOutput("Command not found. Select a destination or type “help”.", "Unknown command. Type “help”.");
      window.setTimeout(() => inputRef.current?.focus(), 0);
      return;
    }

    if (command.external) {
      const external = externalCommands[command.command as keyof typeof externalCommands];
      showOutput(`Opening ${external.label}…`);
      window.open(external.href, "_blank", "noopener,noreferrer");
      return;
    }

    const route = portfolioRoutes.find((item) => item.command === command.command);
    if (route) {
      showOutput(`Opening ${route.label}…`);
      router.push(route.href);
      return;
    }

    showOutput("Command not found. Select a destination or type “help”.", "Unknown command. Type “help”.");
  }, [commandLookup, router, showAll, showOutput, showQuick]);

  useEffect(() => {
    if (bodyView !== "all" || !focusDirectoryCommand.current) return;
    firstDirectoryCommandRef.current?.focus();
    focusDirectoryCommand.current = false;
  }, [bodyView]);

  useEffect(() => {
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        showAll();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [showAll]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    executeCommand(input);
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      if (bodyView === "all") showQuick(true);
      else setInput("");
      return;
    }
    if (event.key === "Tab" && completion) {
      event.preventDefault();
      setInput(completion.command);
      setStatus(`Completed command: ${completion.command}.`);
      return;
    }
    if (event.key === "ArrowUp" && history.length) {
      event.preventDefault();
      const nextIndex = historyIndex < 0 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(history[nextIndex]);
      return;
    }
    if (event.key === "ArrowDown" && history.length) {
      event.preventDefault();
      if (historyIndex <= 0) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex]);
      }
    }
  };

  const handleDirectoryKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      showQuick(true);
    }
  };

  const groupedCommands = (group: CommandGroup) => commands.filter((command) => command.group === group);

  return (
    <section className="home-terminal" aria-labelledby="home-terminal-title">
      <div className="home-terminal__shell">
        <header className="home-terminal__header">
          <span className="home-terminal__title"><Terminal aria-hidden="true" /><h2 id="home-terminal-title">Quick Access</h2></span>
          <span className="home-terminal__header-actions">
            <span className="home-terminal__hint" title="Tab completes · Arrow keys recall history · Enter opens">Tab · ↑↓ · Enter</span>
            <button ref={allCommandsTriggerRef} type="button" className="home-terminal__directory-trigger" aria-expanded={bodyView === "all"} aria-controls="home-terminal-body" onClick={() => bodyView === "all" ? showQuick() : showAll()}>{bodyView === "all" ? "Back to quick access" : "All commands"}</button>
          </span>
        </header>

        <div id="home-terminal-body" className="home-terminal__body" aria-label={bodyView === "quick" ? "Quick portfolio destinations" : bodyView === "all" ? "Complete command directory" : "Command result"}>
          {bodyView === "quick" && <div className="home-terminal__quick-grid">
            {quickCommands.map((command) => <button key={command.id} type="button" onClick={() => executeCommand(command.command)} aria-label={command.external ? command.description : `Open ${command.label} page`}><span>{command.label}</span><b aria-hidden="true">↗</b></button>)}
          </div>}

          {bodyView === "all" && <div className="home-terminal__directory" onKeyDown={handleDirectoryKeyDown}>
            {commandGroupOrder.map((group) => <section key={group} className="home-terminal__group" aria-labelledby={`terminal-${group.replaceAll(" ", "-").toLowerCase()}`}>
              <h3 id={`terminal-${group.replaceAll(" ", "-").toLowerCase()}`}>{group}</h3>
              <div>{groupedCommands(group).map((command, index) => <button key={command.id} ref={group === "Portfolio" && index === 0 ? firstDirectoryCommandRef : undefined} type="button" onClick={() => executeCommand(command.command)} aria-label={command.external ? command.description : `${command.label}: ${command.description}`}><span>{command.label}</span><b aria-hidden="true">↗</b></button>)}</div>
            </section>)}
          </div>}

          {bodyView === "output" && <div className="home-terminal__output"><p>{output}</p><button type="button" onClick={() => showQuick()}>Back to commands <span aria-hidden="true">↗</span></button></div>}
        </div>

        <p className="home-terminal__status" role="status" aria-live="polite" title={status}>{status}</p>

        <form className="home-terminal__input" onSubmit={handleSubmit}>
          <span aria-hidden="true">kj@portfolio:~$</span>
          <input ref={inputRef} id="home-terminal-command" aria-label="Portfolio terminal command" value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={handleInputKeyDown} autoComplete="off" spellCheck="false" placeholder="Type a command" />
        </form>
      </div>
      <noscript><nav className="terminal-fallback" aria-label="Portfolio destinations">{portfolioRoutes.map((route) => <Link key={route.href} href={route.href}>{route.label}</Link>)}</nav></noscript>
    </section>
  );
}
