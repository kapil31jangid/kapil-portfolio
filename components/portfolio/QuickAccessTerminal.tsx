"use client";

import { FormEvent, KeyboardEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, Terminal } from "lucide-react";
import { siteConfig } from "@/data/portfolio";
import { portfolioRoutes } from "@/data/routeNavigation";

type TerminalEntry = {
  id: string;
  command?: string;
  kind: "welcome" | "info" | "notice" | "error";
  lines?: readonly string[];
};

type CommandDefinition = {
  id: string;
  command: string;
  label: string;
  description: string;
  group: "Portfolio" | "Proof and Writing" | "Connect" | "Tools";
  aliases?: readonly string[];
  external?: boolean;
};

type CommandGroup = {
  title: CommandDefinition["group"];
  routeIds?: readonly string[];
  externalIds?: readonly (keyof typeof externalCommands)[];
  utilityIds?: readonly string[];
};

const externalCommands = {
  github: { label: "GitHub", href: "https://github.com/kapil31jangid", description: "Open Kapil’s GitHub profile" },
  linkedin: { label: "LinkedIn", href: "https://www.linkedin.com/in/kapil31jangid", description: "Open Kapil’s LinkedIn profile" },
  resume: { label: "Résumé", href: siteConfig.resumePath, description: "Download Kapil’s résumé" },
} as const;

const initialEntries: TerminalEntry[] = [{
  id: "welcome",
  kind: "welcome",
  lines: ["Welcome to Kapil’s portfolio.", "Choose a destination or type \"help\"."],
}];

const commandGroups: readonly CommandGroup[] = [
  { title: "Portfolio", routeIds: ["home", "about", "projects", "journey", "services", "contact"] },
  { title: "Proof and Writing", routeIds: ["certifications", "achievements", "blogs", "open-source"] },
  { title: "Connect", routeIds: ["social"], externalIds: ["github", "linkedin", "resume"] },
  { title: "Tools", routeIds: ["gokubot", "extras"], utilityIds: ["whoami", "clear", "help"] },
] as const;

const quickCommandIds = ["projects", "about", "journey", "gokubot", "contact", "resume"] as const;
const paletteId = "portfolio-command-palette";
const suggestionId = "portfolio-command-suggestions";

export function QuickAccessTerminal() {
  const router = useRouter();
  const input = useRef<HTMLInputElement>(null);
  const output = useRef<HTMLDivElement>(null);
  const paletteTrigger = useRef<HTMLButtonElement>(null);
  const paletteButtons = useRef<Array<HTMLButtonElement | null>>([]);
  const [value, setValue] = useState("");
  const [entries, setEntries] = useState<TerminalEntry[]>(initialEntries);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [announcement, setAnnouncement] = useState("");
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [paletteIndex, setPaletteIndex] = useState(0);
  const [paletteReturnTarget, setPaletteReturnTarget] = useState<"trigger" | "input">("trigger");
  const focusFirstPaletteCommand = useRef(false);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);

  const routeLookup = useMemo(() => {
    const lookup = new Map<string, (typeof portfolioRoutes)[number]>();
    for (const route of portfolioRoutes) {
      lookup.set(route.command, route);
      for (const alias of route.aliases ?? []) lookup.set(alias, route);
    }
    return lookup;
  }, []);

  const commandDefinitions = useMemo<CommandDefinition[]>(() => {
    const routeById = new Map(portfolioRoutes.map((route) => [route.id, route]));
    const definitions: CommandDefinition[] = [];

    for (const group of commandGroups) {
      for (const routeId of group.routeIds ?? []) {
        const route = routeById.get(routeId);
        if (route) definitions.push({ ...route, group: group.title });
      }

      for (const externalId of group.externalIds ?? []) {
        const external = externalCommands[externalId];
        definitions.push({ id: externalId, command: externalId, label: external.label, description: external.description, group: group.title, external: true });
      }

      for (const utilityId of group.utilityIds ?? []) {
        const utility = utilityId === "whoami"
          ? { label: "Whoami", description: "Show Kapil’s verified introduction" }
          : utilityId === "clear"
            ? { label: "Clear", description: "Clear terminal output" }
            : { label: "Help", description: "Open the command directory" };
        definitions.push({ id: utilityId, command: utilityId, ...utility, group: group.title });
      }
    }
    return definitions;
  }, []);

  const commandLookup = useMemo(() => {
    const lookup = new Map<string, CommandDefinition>();
    for (const command of commandDefinitions) {
      lookup.set(command.command, command);
      for (const alias of command.aliases ?? []) lookup.set(alias, command);
    }
    return lookup;
  }, [commandDefinitions]);

  const quickCommands = useMemo(
    () => quickCommandIds.map((id) => commandDefinitions.find((command) => command.id === id)).filter((command): command is CommandDefinition => Boolean(command)),
    [commandDefinitions],
  );

  const normalizedQuery = value.trim().toLowerCase().replace(/^open\s+/, "");
  const suggestions = useMemo(() => {
    if (!normalizedQuery) return [];
    return commandDefinitions
      .map((command) => {
        const terms = [command.command, command.label.toLowerCase(), ...(command.aliases ?? [])];
        const exact = terms.some((term) => term === normalizedQuery);
        const prefix = terms.some((term) => term.startsWith(normalizedQuery));
        const partial = terms.some((term) => term.includes(normalizedQuery)) || command.description.toLowerCase().includes(normalizedQuery);
        return { command, score: exact ? 0 : prefix ? 1 : partial ? 2 : 3 };
      })
      .filter((item) => item.score < 3)
      .sort((a, b) => a.score - b.score || a.command.label.localeCompare(b.command.label))
      .slice(0, 6)
      .map((item) => item.command);
  }, [commandDefinitions, normalizedQuery]);
  const resolvedActiveSuggestion = activeSuggestion >= 0 && activeSuggestion < suggestions.length ? activeSuggestion : -1;

  const append = useCallback((entry: Omit<TerminalEntry, "id">) => {
    setEntries((current) => [...current.slice(-5), { ...entry, id: crypto.randomUUID() }]);
  }, []);

  const refocusInput = useCallback(() => {
    window.setTimeout(() => input.current?.focus(), 0);
  }, []);

  const openPalette = useCallback((returnTarget: "trigger" | "input", focusFirst = false) => {
    setPaletteReturnTarget(returnTarget);
    setPaletteIndex(0);
    focusFirstPaletteCommand.current = focusFirst;
    setSuggestionsOpen(false);
    setPaletteOpen(true);
  }, []);

  const closePalette = useCallback(() => {
    setPaletteOpen(false);
    setAnnouncement("Command directory closed.");
    window.setTimeout(() => {
      if (paletteReturnTarget === "input") input.current?.focus();
      else paletteTrigger.current?.focus();
    }, 0);
  }, [paletteReturnTarget]);

  const execute = useCallback((rawCommand: string) => {
    const command = rawCommand.trim().toLowerCase();
    if (!command) return;
    setHistory((current) => [...current.slice(-29), command]);
    setHistoryIndex(-1);
    setValue("");
    setSuggestionsOpen(false);
    setActiveSuggestion(-1);

    if (command === "clear") {
      setEntries([]);
      setPaletteOpen(false);
      setAnnouncement("Terminal output cleared.");
      refocusInput();
      return;
    }
    if (command === "help") {
      append({ command, kind: "notice", lines: ["Command directory opened."] });
      openPalette("input", true);
      setAnnouncement("Command directory opened.");
      return;
    }
    if (command === "whoami") {
      append({ command, kind: "info", lines: ["Kapil Jangid · AI-Driven Full-Stack Developer", "Computer Science student at Silver Oak University · Data Science student at IIT Madras"] });
      setPaletteOpen(false);
      setAnnouncement("Verified profile summary shown.");
      refocusInput();
      return;
    }

    const [verb, argument, ...rest] = command.split(/\s+/);
    const destination = verb === "open" && rest.length === 0 ? argument : rest.length === 0 ? verb : "";
    const definition = destination ? commandLookup.get(destination) : undefined;
    if (!definition) {
      append({ command, kind: "error", lines: ["Command not found. Select a suggestion or type \"help\"."] });
      setAnnouncement("Command not found. Select a suggestion or type help.");
      refocusInput();
      return;
    }

    setPaletteOpen(false);
    if (definition.external) {
      const external = externalCommands[definition.command as keyof typeof externalCommands];
      append({ command, kind: "notice", lines: [`Opening ${external.label}…`] });
      setAnnouncement(`Opening ${external.label}.`);
      window.open(external.href, "_blank", "noopener,noreferrer");
      return;
    }

    const route = routeLookup.get(definition.command);
    if (route) {
      append({ command, kind: "notice", lines: [`Opening ${route.label}…`] });
      setAnnouncement(`Opening ${route.label}.`);
      router.push(route.href);
      return;
    }

    append({ command, kind: "error", lines: ["Command not found. Select a suggestion or type \"help\"."] });
    setAnnouncement("Command not found. Select a suggestion or type help.");
    refocusInput();
  }, [append, commandLookup, openPalette, refocusInput, routeLookup, router]);

  useEffect(() => {
    output.current?.scrollTo({ top: output.current.scrollHeight, behavior: "auto" });
  }, [entries]);

  useEffect(() => {
    if (!paletteOpen || !focusFirstPaletteCommand.current) return;
    paletteButtons.current[0]?.focus();
    focusFirstPaletteCommand.current = false;
  }, [paletteOpen]);

  useEffect(() => {
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        openPalette("input");
        input.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openPalette]);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const selected = resolvedActiveSuggestion >= 0 ? suggestions[resolvedActiveSuggestion] : undefined;
    execute(selected?.command ?? value);
  };

  const onInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      if (suggestionsOpen) {
        setSuggestionsOpen(false);
        setActiveSuggestion(-1);
      } else {
        setValue("");
        setHistoryIndex(-1);
      }
      return;
    }
    if (event.key === "ArrowDown" && suggestions.length) {
      event.preventDefault();
      setSuggestionsOpen(true);
      setActiveSuggestion((current) => current < suggestions.length - 1 ? current + 1 : 0);
      return;
    }
    if (event.key === "ArrowUp" && suggestions.length) {
      event.preventDefault();
      setSuggestionsOpen(true);
      setActiveSuggestion((current) => current <= 0 ? suggestions.length - 1 : current - 1);
      return;
    }
    if (event.key === "ArrowUp" && history.length && !value) {
      event.preventDefault();
      const nextIndex = historyIndex < 0 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setValue(history[nextIndex]);
      return;
    }
    if (event.key === "ArrowDown" && history.length && !value) {
      event.preventDefault();
      if (historyIndex <= 0) {
        setHistoryIndex(-1);
        setValue("");
      } else {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setValue(history[nextIndex]);
      }
      return;
    }
    if (event.key === "Tab" && resolvedActiveSuggestion >= 0 && suggestions[resolvedActiveSuggestion]) {
      event.preventDefault();
      setValue(suggestions[resolvedActiveSuggestion].command);
      setSuggestionsOpen(false);
      setActiveSuggestion(-1);
    }
  };

  const onPaletteKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closePalette();
      return;
    }
    if (!["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"].includes(event.key)) return;
    event.preventDefault();
    const direction = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : -1;
    const nextIndex = (paletteIndex + direction + commandDefinitions.length) % commandDefinitions.length;
    setPaletteIndex(nextIndex);
    paletteButtons.current[nextIndex]?.focus();
  };

  return (
    <section className="quick-terminal" aria-labelledby="quick-terminal-title">
      <div className="quick-terminal-shell">
        <div className="quick-terminal-heading">
          <span><Terminal aria-hidden="true" /><h2 id="quick-terminal-title">Quick Access</h2></span>
          <button ref={paletteTrigger} type="button" className="terminal-directory-trigger focus-ring" aria-expanded={paletteOpen} aria-controls={paletteId} onClick={() => openPalette("trigger")}>All commands <ChevronDown aria-hidden="true" /></button>
        </div>
        <section className="terminal-quick-commands" aria-label="Primary portfolio destinations">
          {quickCommands.map((command) => <button type="button" key={command.id} onClick={() => execute(command.command)} className="focus-ring" aria-label={command.external ? command.description : `Open ${command.label} page`}><span>{command.label}</span><b aria-hidden="true">↗</b></button>)}
        </section>
        <div ref={output} className="quick-terminal-output" aria-label="Portfolio terminal status">
          {entries.map((entry) => <div key={entry.id} className={`terminal-entry ${entry.kind}`}>
            {entry.command && <p className="terminal-command"><span>kj@portfolio:~$</span> {entry.command}</p>}
            {entry.lines?.map((line) => <p key={line}>{line}</p>)}
          </div>)}
        </div>
        <form className="quick-terminal-input" onSubmit={submit}>
          <label htmlFor="portfolio-terminal">Portfolio terminal command</label>
          <span aria-hidden="true">kj@portfolio:~$</span>
          <input ref={input} id="portfolio-terminal" value={value} onChange={(event) => { setValue(event.target.value); setSuggestionsOpen(Boolean(event.target.value.trim())); setActiveSuggestion(-1); }} onKeyDown={onInputKeyDown} autoComplete="off" spellCheck="false" placeholder="Type a command" role="combobox" aria-autocomplete="list" aria-expanded={suggestionsOpen && suggestions.length > 0} aria-controls={suggestionId} aria-activedescendant={resolvedActiveSuggestion >= 0 ? `${suggestionId}-${suggestions[resolvedActiveSuggestion]?.id}` : undefined} />
          <small aria-hidden="true">Tab complete · ↑↓ history · Enter open</small>
          {suggestionsOpen && <div id={suggestionId} className="terminal-suggestions" role="listbox" aria-label="Matching portfolio commands">
            {suggestions.length ? suggestions.map((command, index) => <button type="button" id={`${suggestionId}-${command.id}`} key={command.id} role="option" aria-selected={index === resolvedActiveSuggestion} className="focus-ring" onMouseDown={(event) => event.preventDefault()} onClick={() => execute(command.command)}><b>{command.command}</b><span>{command.description}</span></button>) : <p>No matching command</p>}
          </div>}
        </form>
        {paletteOpen && <section id={paletteId} className="terminal-palette" aria-label="Complete command directory" onKeyDown={onPaletteKeyDown}>
          {commandGroups.map((group) => <div className="terminal-palette-group" key={group.title} role="group" aria-labelledby={`terminal-group-${group.title.replaceAll(" ", "-").toLowerCase()}`}>
            <h3 id={`terminal-group-${group.title.replaceAll(" ", "-").toLowerCase()}`}>{group.title}</h3>
            <div>{commandDefinitions.filter((command) => command.group === group.title).map((command) => {
              const commandIndex = commandDefinitions.indexOf(command);
              return <button type="button" key={command.id} ref={(element) => { paletteButtons.current[commandIndex] = element; }} onFocus={() => setPaletteIndex(commandIndex)} onClick={() => execute(command.command)} className="focus-ring" aria-label={command.external ? command.description : `${command.label}: ${command.description}`}><b>{command.label}</b><span>{command.description}</span><i aria-hidden="true">↗</i></button>;
            })}</div>
          </div>)}
        </section>}
      </div>
      <p className="sr-only" role="status" aria-live="polite">{announcement}</p>
      <noscript><nav className="terminal-fallback" aria-label="Portfolio destinations">{portfolioRoutes.map((route) => <Link key={route.href} href={route.href}>{route.label}</Link>)}</nav></noscript>
    </section>
  );
}
