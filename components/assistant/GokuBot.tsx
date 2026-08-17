"use client";

import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Bot, Copy, Eraser, ExternalLink, LoaderCircle, Plus, Send, ShieldCheck, Square } from "lucide-react";
import { assistantSuggestedQuestions } from "@/data/assistantKnowledge";

type Source = { label: string; href: string; external?: boolean };
type Message = { id: string; role: "assistant" | "user"; text: string; sources?: Source[]; suggestions?: string[] };
type Availability = "checking" | "online" | "limited" | "offline";

const welcome: Message = {
  id: "welcome",
  role: "assistant",
  text: "Hey, I’m GokuBot. I can help you explore Kapil’s projects, technical skills, studies and community experience. What would you like to know?",
};

const availabilityDetails: Record<Availability, { label: string; description: string }> = {
  checking: { label: "Checking", description: "Checking GokuBot’s available capabilities." },
  online: { label: "Online", description: "AI assistance and verified portfolio retrieval are available." },
  limited: { label: "Limited mode", description: "Verified portfolio answers" },
  offline: { label: "Offline", description: "GokuBot is temporarily unavailable." },
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
  const [announcement, setAnnouncement] = useState("");
  const [showJumpToLatest, setShowJumpToLatest] = useState(false);
  const controller = useRef<AbortController | null>(null);
  const composerInput = useRef<HTMLTextAreaElement>(null);
  const log = useRef<HTMLDivElement>(null);
  const logEnd = useRef<HTMLDivElement>(null);
  const sessionId = useRef("");
  const nearLatest = useRef(true);
  const copyResetTimer = useRef<number | null>(null);
  const hasConversation = messages.some((message) => message.role === "user");
  const showSuggestions = hydrated && !hasConversation;
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
    return () => {
      cancelled = true;
      if (retry) window.clearTimeout(retry);
    };
  }, []);

  useEffect(() => {
    if (!nearLatest.current && hasConversation) return;
    logEnd.current?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "end" });
  }, [messages, status, reduced, hasConversation]);

  useEffect(() => {
    const onEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape" && status === "thinking") controller.current?.abort();
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [status]);

  const updateScrollPosition = () => {
    const element = log.current;
    if (!element) return;
    const isNearLatest = element.scrollHeight - element.scrollTop - element.clientHeight < 96;
    nearLatest.current = isNearLatest;
    setShowJumpToLatest(hasConversation && !isNearLatest);
  };

  const jumpToLatest = () => {
    nearLatest.current = true;
    setShowJumpToLatest(false);
    logEnd.current?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "end" });
  };

  const ask = async (question?: string, isRetry = false) => {
    if (availability === "offline") {
      setError("GokuBot is temporarily unavailable. Please explore Kapil’s portfolio directly.");
      setStatus("error");
      return;
    }
    if (availability === "checking") {
      setError("GokuBot is still checking availability. Please wait a moment.");
      return;
    }
    const message = (question ?? draft).trim();
    if (!message) {
      setError("Enter a question for GokuBot.");
      return;
    }
    if (message.length > 1200) {
      setError("Please keep your message under 1,200 characters.");
      return;
    }

    nearLatest.current = true;
    setShowJumpToLatest(false);
    setError("");
    setStatus("thinking");
    setDraft("");
    setLastQuestion(message);
    if (!isRetry) setMessages((current) => [...current, { id: crypto.randomUUID(), role: "user", text: message }]);
    controller.current = new AbortController();

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-gokubot-session": sessionId.current },
        signal: controller.current.signal,
        body: JSON.stringify({ message, context: messages.slice(-4).map((item) => ({ role: item.role, text: item.text })) }),
      });
      if (response.status === 429) {
        setStatus("rate");
        return;
      }
      if (!response.ok) throw new Error("assistant_unavailable");
      const payload: { answer: string; sources: Source[]; suggestions: string[] } = await response.json();
      if (!payload.answer || typeof payload.answer !== "string") throw new Error("invalid_response");
      setMessages((current) => [...current, { id: crypto.randomUUID(), role: "assistant", text: payload.answer, sources: payload.sources, suggestions: payload.suggestions }]);
      setStatus("ready");
    } catch (requestError) {
      if ((requestError as Error).name === "AbortError") {
        setAnnouncement("GokuBot’s response was stopped.");
        setStatus("ready");
        return;
      }
      if (!isRetry) setDraft(message);
      setStatus("error");
    } finally {
      controller.current = null;
    }
  };

  const resetConversation = (message: string) => {
    controller.current?.abort();
    window.sessionStorage.removeItem("gokubot-history");
    window.sessionStorage.removeItem("gokubot-session");
    sessionId.current = crypto.randomUUID();
    window.sessionStorage.setItem("gokubot-session", sessionId.current);
    nearLatest.current = true;
    setShowJumpToLatest(false);
    setMessages([welcome]);
    setDraft("");
    setError("");
    setLastQuestion("");
    setStatus("ready");
    setAnnouncement(message);
    window.setTimeout(() => composerInput.current?.focus(), 0);
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!isThinking) void ask();
  };
  const keyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (!isThinking) void ask();
    }
  };
  const copy = async (id: string, text: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(text);
      else {
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
      setAnnouncement("Response copied to clipboard.");
      if (copyResetTimer.current) window.clearTimeout(copyResetTimer.current);
      copyResetTimer.current = window.setTimeout(() => setCopiedId((current) => current === id ? null : current), 1800);
    } catch {
      setError("Copying is not available in this browser. You can select the response text instead.");
    }
  };

  return (
    <section className="gokubot-page" aria-labelledby="gokubot-title">
      <div className="gokubot-stage">
        <header className="assistant-introduction">
          <p>GokuBot</p>
          <h1 id="gokubot-title">Explore Kapil’s work through conversation.</h1>
          <span>Ask about projects, skills, studies, community work or ways to collaborate.</span>
        </header>

        <section className="conversation-workspace" aria-label="GokuBot conversation workspace">
          <header className="workspace-toolbar">
            <div className="workspace-identity">
              <span aria-hidden="true"><Bot /></span>
              <b>GokuBot</b>
              <p className={`workspace-status ${availability}`} role="status" aria-live="polite">
                <i aria-hidden="true" /><span>{availabilityInfo.label}</span>
                {availability === "limited" && <em>· {availabilityInfo.description}</em>}
              </p>
            </div>
            <div className="workspace-controls">
              <button type="button" className="workspace-control focus-ring" onClick={() => resetConversation("New conversation started.")}>
                <Plus aria-hidden="true" /><span>New conversation</span>
              </button>
              <button type="button" className="workspace-control focus-ring" onClick={() => resetConversation("Conversation cleared.")}>
                <Eraser aria-hidden="true" /><span>Clear conversation</span>
              </button>
            </div>
          </header>

          <div className="message-region">
            <div className="assistant-message-viewport" ref={log} onScroll={updateScrollPosition} role="log" aria-live="polite" aria-label="GokuBot conversation">
              {messages.map((message) => (
                <motion.article key={message.id} className={`conversation-row ${message.role}`} initial={reduced ? false : { opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.18 }}>
                  <div className="conversation-role">{message.role === "assistant" && <Bot aria-hidden="true" />}<span>{message.role === "assistant" ? "GokuBot" : "You"}</span></div>
                  <div className="conversation-text">{message.text.split("\n").map((paragraph, index) => <p key={`${message.id}-${index}`}>{paragraph}</p>)}</div>
                  {message.role === "assistant" && <div className="conversation-actions"><button type="button" className="response-action focus-ring" onClick={() => void copy(message.id, message.text)} aria-label="Copy response"><Copy aria-hidden="true" /><span>{copiedId === message.id ? "Copied" : "Copy"}</span></button></div>}
                  {message.sources && message.sources.length > 0 && <div className="conversation-sources" aria-label="Related portfolio sources">{message.sources.map((source) => source.external ? <a key={source.href} href={source.href} target="_blank" rel="noopener noreferrer" className="focus-ring">{source.label}<ExternalLink aria-hidden="true" /></a> : <Link key={source.href} href={source.href} className="focus-ring">{source.label}</Link>)}</div>}
                  {message.suggestions && message.suggestions.length > 0 && <div className="conversation-followups" aria-label="Suggested follow-up questions">{message.suggestions.map((suggestion) => <button key={suggestion} type="button" onClick={() => void ask(suggestion)} className="focus-ring" disabled={isThinking || availability === "offline" || availability === "checking"}>{suggestion}</button>)}</div>}
                </motion.article>
              ))}
              {status === "thinking" && <div className="assistant-thinking" role="status"><LoaderCircle aria-hidden="true" /> GokuBot is preparing a verified response.</div>}
              {status === "rate" && <p className="assistant-notice" role="alert">GokuBot has received several requests. Please wait a moment before trying again.</p>}
              {status === "error" && <div className="assistant-notice" role="alert"><p>GokuBot couldn’t connect right now. Please retry or explore the portfolio directly.</p>{lastQuestion && <button type="button" className="response-action focus-ring" onClick={() => void ask(lastQuestion, true)}>Try again</button>}</div>}
              {availability === "offline" && <p className="assistant-notice" role="alert">GokuBot is temporarily unavailable. You can still explore <Link href="/projects">Projects</Link>, <Link href="/journey">Journey</Link>, and <Link href="/contact">Contact</Link>.</p>}
              {showSuggestions && <section className="assistant-suggestions" aria-labelledby="assistant-suggestions-title"><h2 id="assistant-suggestions-title">Start with a question</h2><div>{assistantSuggestedQuestions.map((question) => <button key={question} type="button" onClick={() => void ask(question)} className="focus-ring" disabled={isThinking || availability === "checking" || availability === "offline"}><span>{question}</span><span aria-hidden="true">→</span></button>)}</div></section>}
              <div ref={logEnd} />
            </div>
            {showJumpToLatest && <button type="button" className="assistant-jump-latest focus-ring" onClick={jumpToLatest}>Jump to latest</button>}
          </div>

          <form className="assistant-composer" onSubmit={submit}>
            <label htmlFor="gokubot-input">Ask GokuBot about Kapil’s portfolio</label>
            <div className="composer-surface">
              <textarea ref={composerInput} id="gokubot-input" value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={keyDown} onFocus={(event) => event.currentTarget.scrollIntoView({ block: "nearest", behavior: reduced ? "auto" : "smooth" })} maxLength={1200} disabled={availability === "offline" || isThinking} placeholder={availability === "offline" ? "GokuBot is temporarily unavailable" : "Ask GokuBot about Kapil…"} aria-describedby={error ? "gokubot-guidance gokubot-error" : "gokubot-guidance"} />
              {isThinking ? <button type="button" className="composer-submit focus-ring" onClick={() => controller.current?.abort()}><Square aria-hidden="true" /><span>Stop</span></button> : <button type="submit" className="composer-submit focus-ring" disabled={availability === "offline" || availability === "checking"}><Send aria-hidden="true" /><span>Send</span></button>}
            </div>
            {error && <p id="gokubot-error" className="composer-error" role="alert">{error}</p>}
            <div className="composer-guidance" id="gokubot-guidance"><span>Enter to send · Shift + Enter for a new line</span><span>{draft.length}/1200</span></div>
            <p className="assistant-privacy"><ShieldCheck aria-hidden="true" /> Messages remain in this browser session and are not used for training.</p>
          </form>
        </section>
        <p className="sr-only" aria-live="polite">{announcement}</p>
      </div>
    </section>
  );
}
