"use client";

import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Bot, Copy, Eraser, ExternalLink, LoaderCircle, Plus, Send, ShieldCheck, Square, X } from "lucide-react";
import { assistantSuggestedQuestions } from "@/data/assistantKnowledge";

type Source = { label: string; href: string; external?: boolean };
type Message = { id: string; role: "assistant" | "user"; text: string; sources?: Source[]; suggestions?: string[] };
type Availability = "checking" | "online" | "limited" | "offline";

const welcome: Message = {
  id: "welcome",
  role: "assistant",
  text: "Hey! I’m GokuBot, Kapil’s AI portfolio assistant. I can help you explore his projects, technical skills, education, community experience, achievements, services and ways to connect with him. What would you like to know?",
};

const availabilityDetails: Record<Availability, { label: string; description: string }> = {
  checking: { label: "CHECKING", description: "Checking GokuBot availability." },
  online: { label: "ONLINE", description: "AI provider and verified portfolio retrieval are available." },
  limited: { label: "LIMITED MODE", description: "Verified local portfolio retrieval is available. Responses are limited to locally verified portfolio information." },
  offline: { label: "OFFLINE", description: "GokuBot and its local portfolio retrieval are unavailable." },
};

export function GokuBot() {
  const reduced = useReducedMotion();
  const [messages, setMessages] = useState<Message[]>([welcome]);
  const [draft, setDraft] = useState("");
  const [status, setStatus] = useState<"ready" | "thinking" | "error" | "rate">("ready");
  const [availability, setAvailability] = useState<Availability>("checking");
  const [hydrated, setHydrated] = useState(false);
  const [error, setError] = useState("");
  const [lastQuestion, setLastQuestion] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const controller = useRef<AbortController | null>(null);
  const screen = useRef<HTMLElement>(null);
  const log = useRef<HTMLDivElement>(null);
  const logEnd = useRef<HTMLDivElement>(null);
  const sessionId = useRef("");
  const nearLatest = useRef(true);
  const copyResetTimer = useRef<number | null>(null);
  const hasConversation = messages.some((message) => message.role === "user");
  const isThinking = status === "thinking";
  const availabilityInfo = availabilityDetails[availability];

  useEffect(() => {
    sessionId.current = window.sessionStorage.getItem("gokubot-session") || crypto.randomUUID();
    window.sessionStorage.setItem("gokubot-session", sessionId.current);
    const restore = window.setTimeout(() => {
      try {
        const saved = window.sessionStorage.getItem("gokubot-history");
        if (saved) {
          const parsed: unknown = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.every((item) => item && typeof item === "object" && "id" in item && "role" in item && "text" in item)) setMessages(parsed as Message[]);
        }
      } catch {
        window.sessionStorage.removeItem("gokubot-history");
      }
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(restore);
  }, []);

  useEffect(() => () => {
    if (copyResetTimer.current) window.clearTimeout(copyResetTimer.current);
  }, []);

  useEffect(() => {
    const viewport = window.visualViewport;
    const screenElement = screen.current;
    const updateKeyboardOffset = () => {
      if (!viewport || !screenElement) return;
      const offset = Math.max(0, window.innerHeight - viewport.height - viewport.offsetTop);
      screenElement.style.setProperty("--gokubot-keyboard-offset", `${offset}px`);
    };
    updateKeyboardOffset();
    viewport?.addEventListener("resize", updateKeyboardOffset);
    viewport?.addEventListener("scroll", updateKeyboardOffset);
    return () => {
      viewport?.removeEventListener("resize", updateKeyboardOffset);
      viewport?.removeEventListener("scroll", updateKeyboardOffset);
      screenElement?.style.removeProperty("--gokubot-keyboard-offset");
    };
  }, []);

  useEffect(() => {
    if (hydrated) window.sessionStorage.setItem("gokubot-history", JSON.stringify(messages.slice(-20)));
  }, [messages, hydrated]);

  useEffect(() => {
    let cancelled = false;
    let retry: number | undefined;
    const checkAvailability = async (attempt = 0) => {
      try {
        const response = await fetch("/api/assistant", { cache: "no-store" });
        if (!response.ok) throw new Error("unavailable");
        const payload: { status?: string } = await response.json();
        if (!cancelled) setAvailability(payload.status === "online" ? "online" : payload.status === "limited" ? "limited" : "offline");
      } catch {
        if (!cancelled && attempt === 0) retry = window.setTimeout(() => void checkAvailability(1), 3000);
        else if (!cancelled) setAvailability("offline");
      }
    };
    void checkAvailability();
    return () => { cancelled = true; if (retry) window.clearTimeout(retry); };
  }, []);

  useEffect(() => {
    if (!nearLatest.current && hasConversation) return;
    logEnd.current?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "end" });
  }, [messages, status, reduced, hasConversation]);

  useEffect(() => {
    const onEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") controller.current?.abort();
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, []);

  const updateScrollPosition = () => {
    const element = log.current;
    if (!element) return;
    nearLatest.current = element.scrollHeight - element.scrollTop - element.clientHeight < 96;
  };

  const ask = async (question?: string) => {
    if (availability === "offline") { setStatus("error"); return; }
    if (availability === "checking") { setError("GokuBot is still checking availability. Please wait a moment."); return; }
    const message = (question ?? draft).trim();
    if (!message) { setError("Enter a question for GokuBot."); return; }
    if (message.length > 1200) { setError("Please keep your message under 1,200 characters."); return; }

    nearLatest.current = true;
    setError("");
    setStatus("thinking");
    setDraft("");
    setLastQuestion(message);
    const userMessage: Message = { id: crypto.randomUUID(), role: "user", text: message };
    setMessages((current) => [...current, userMessage]);
    controller.current = new AbortController();

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-gokubot-session": sessionId.current },
        signal: controller.current.signal,
        body: JSON.stringify({ message, context: messages.slice(-4).map((item) => ({ role: item.role, text: item.text })) }),
      });
      if (response.status === 429) { setStatus("rate"); return; }
      if (!response.ok) throw new Error("assistant_unavailable");
      const payload: { answer: string; sources: Source[]; suggestions: string[] } = await response.json();
      if (!payload.answer || typeof payload.answer !== "string") throw new Error("invalid_response");
      setMessages((current) => [...current, { id: crypto.randomUUID(), role: "assistant", text: payload.answer, sources: payload.sources, suggestions: payload.suggestions }]);
      setStatus("ready");
    } catch (requestError) {
      if ((requestError as Error).name === "AbortError") { setStatus("ready"); return; }
      setStatus("error");
    } finally {
      controller.current = null;
    }
  };

  const clear = () => {
    controller.current?.abort();
    window.sessionStorage.removeItem("gokubot-history");
    window.sessionStorage.removeItem("gokubot-session");
    sessionId.current = crypto.randomUUID();
    window.sessionStorage.setItem("gokubot-session", sessionId.current);
    nearLatest.current = true;
    setMessages([welcome]);
    setDraft("");
    setError("");
    setLastQuestion("");
    setStatus("ready");
  };

  const submit = (event: FormEvent) => { event.preventDefault(); void ask(); };
  const keyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); void ask(); }
  };
  const copy = async (id: string, text: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const fallback = document.createElement("textarea");
        fallback.value = text;
        fallback.setAttribute("readonly", "");
        fallback.style.cssText = "position:fixed;opacity:0;pointer-events:none";
        document.body.appendChild(fallback);
        fallback.select();
        const copied = document.execCommand("copy");
        fallback.remove();
        if (!copied) throw new Error("copy_unavailable");
      }
      setCopiedId(id);
      if (copyResetTimer.current) window.clearTimeout(copyResetTimer.current);
      copyResetTimer.current = window.setTimeout(() => setCopiedId((current) => current === id ? null : current), 1800);
    } catch {
      setError("Copying is not available in this browser. You can select the response text instead.");
    }
  };

  return <section ref={screen} className="screen gokubot-screen">
    <div className="poster-grid" aria-hidden="true" />
    <div className="circuit-field" aria-hidden="true" />
    <div className="gokubot-mobile-head"><Bot /><span>GOKUBOT</span><small>{availabilityInfo.label} · AI portfolio assistant</small><details><summary className="focus-ring">Controls</summary><button onClick={clear}>New conversation</button><button onClick={clear}>Clear conversation</button><p>Messages stay only in this browser session. They are not stored by the backend or used for training.</p></details></div>
    <aside className="gokubot-rail">
      <div><p className="eyebrow">{"// Portfolio intelligence"}</p><h1>GOKUBOT</h1><p className="gokubot-role">Kapil Jangid’s Portfolio AI Assistant</p><p className={`gokubot-status ${availability}`} role="status" aria-live="polite"><i aria-hidden="true" /> <span>{availabilityInfo.label}</span></p><p className="gokubot-status-description">{availabilityInfo.description}</p></div>
      <div className="gokubot-rail-actions"><button className="focus-ring" onClick={clear}><Plus /> New conversation</button><button className="focus-ring" onClick={clear}><Eraser /> Clear conversation</button><Link className="focus-ring" href="/"><X /> Return to portfolio</Link></div>
      <div className="gokubot-privacy"><ShieldCheck /><p>Messages stay only in this browser session. They are not stored by the backend or used for training.</p></div>
    </aside>
    <main className={`gokubot-chat${hasConversation ? " has-conversation" : " initial"}`}>
      <header><div><p className="eyebrow">{"// GOKUBOT"}</p><h2>Your AI guide to Kapil’s work, skills and journey.</h2></div><span className={`gokubot-stage-status ${availability}`} role="status" aria-label={`Assistant status: ${availabilityInfo.label}`}><i aria-hidden="true" /><span className="sr-only">Assistant status: {availabilityInfo.label}</span></span></header>
      <div className="gokubot-log" ref={log} onScroll={updateScrollPosition} role="log" aria-live="polite" aria-label="GokuBot conversation">
        {messages.map((message) => <motion.article key={message.id} className={`gokubot-message ${message.role}`} initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .24 }}><p className="gokubot-identity">{message.role === "assistant" ? "GOKUBOT / AI ASSISTANT" : "YOU"}</p><div className="gokubot-text">{message.text.split("\n").map((paragraph, index) => <p key={`${message.id}-${index}`}>{paragraph}</p>)}</div>{message.role === "assistant" && <div className="gokubot-actions"><button className="copy-answer focus-ring" onClick={() => void copy(message.id, message.text)} aria-label="Copy response"><Copy /><span>{copiedId === message.id ? "Copied" : "Copy"}</span></button><span className="sr-only" aria-live="polite">{copiedId === message.id ? "Response copied to clipboard." : ""}</span></div>}{message.sources && <div className="gokubot-sources">{message.sources.map((source) => source.external ? <a key={source.href} href={source.href} target="_blank" rel="noopener noreferrer" className="focus-ring">{source.label}<ExternalLink /></a> : <Link key={source.href} href={source.href} className="focus-ring">{source.label}</Link>)}</div>}{message.suggestions && <div className="gokubot-followups">{message.suggestions.map((suggestion) => <button key={suggestion} onClick={() => void ask(suggestion)} className="focus-ring" disabled={isThinking || availability === "offline"}>{suggestion}</button>)}</div>}</motion.article>)}
        {status === "thinking" && <div className="gokubot-thinking"><LoaderCircle /> GOKUBOT IS ANALYSING PORTFOLIO DATA</div>}
        {status === "rate" && <p className="gokubot-notice" role="alert">GokuBot has received several requests. Please wait a moment before trying again.</p>}
        {status === "error" && <p className="gokubot-notice" role="alert">GokuBot couldn’t connect right now. Please retry or explore the portfolio directly. {lastQuestion && <button className="focus-ring" onClick={() => void ask(lastQuestion)}>Retry</button>}</p>}
        {availability === "offline" && <p className="gokubot-notice" role="alert">GokuBot is temporarily unavailable. You can still explore <Link href="/projects">Projects</Link>, <Link href="/journey">Journey</Link>, and <Link href="/contact">Contact</Link>.</p>}
        <div ref={logEnd} />
      </div>
      {!hasConversation && <div className="gokubot-welcome-prompts"><p>Explore verified portfolio topics</p>{assistantSuggestedQuestions.map((question) => <button key={question} onClick={() => void ask(question)} className="focus-ring" disabled={isThinking || availability === "checking" || availability === "offline"}>{question}</button>)}</div>}
      <form className="gokubot-composer" onSubmit={submit}><label htmlFor="gokubot-input">Ask GokuBot about Kapil&apos;s portfolio</label><textarea id="gokubot-input" value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={keyDown} onFocus={(event) => event.currentTarget.scrollIntoView({ block: "center" })} maxLength={1200} disabled={availability === "offline" || isThinking} placeholder={availability === "offline" ? "GokuBot is temporarily unavailable" : "Ask about projects, skills, education or collaboration…"} aria-describedby={error ? "gokubot-guidance gokubot-error" : "gokubot-guidance"} />{error && <p id="gokubot-error" role="alert">{error}</p>}<div><span id="gokubot-guidance">{draft.length}/1200 · Enter to send · Shift + Enter for a new line</span>{isThinking ? <button type="button" className="focus-ring" onClick={() => controller.current?.abort()}><Square /> Stop</button> : <button type="submit" className="focus-ring" disabled={availability === "offline" || availability === "checking"}><Send /> Send</button>}</div></form>
    </main>
  </section>;
}
