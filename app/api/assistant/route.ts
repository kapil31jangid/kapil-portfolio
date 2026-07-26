import { NextRequest, NextResponse } from "next/server";
import { assistantKnowledge, sourcesFor } from "@/data/assistantKnowledge";

export const runtime = "nodejs";

const requestLog = new Map<string, { count: number; resetAt: number }>();
const LIMIT = 12;
const WINDOW_MS = 60_000;
const MAX_MESSAGE_LENGTH = 1200;
const blockedPattern = /(?:system prompt|hidden context|api\s*key|secret|ignore (?:all |previous )?instructions|reveal (?:your|the) instructions|impersonate kapil|act as kapil)/i;
const stopWords = new Set(["what", "are", "the", "and", "for", "with", "about", "show", "tell", "me", "his", "her", "kapil", "can", "you", "does", "how", "i", "to", "of", "a", "an"]);

const providerKey = process.env.GEMINI_API_KEY?.trim();

async function providerIsReachable() {
  if (!providerKey) return false;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 2500);
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(providerKey)}`, {
      signal: controller.signal,
      cache: "no-store",
    });
    return response.ok;
  } catch {
    return false;
  } finally {
    clearTimeout(timeout);
  }
}

async function capabilities() {
  const fallbackAvailable = assistantKnowledge.length > 0;
  const providerAvailable = await providerIsReachable();
  return {
    status: providerAvailable && fallbackAvailable ? "online" : fallbackAvailable ? "limited" : "offline",
  } as const;
}

function tokens(value: string) { return value.toLowerCase().match(/[a-z0-9+#.]+/g)?.filter((token) => token.length > 1 && !stopWords.has(token)) ?? []; }
function scoreRecord(query: string, record: (typeof assistantKnowledge)[number]) {
  const words = tokens(query).filter((word) => word.length > 2);
  const title = record.title.toLowerCase();
  const content = record.content.toLowerCase();
  return words.reduce((score, word) => {
    if (title.includes(word)) return score + 10;
    if (record.keywords.some((keyword) => keyword === word)) return score + 7;
    if (record.keywords.some((keyword) => keyword.includes(word))) return score + 4;
    if (content.includes(word)) return score + 1;
    return score;
  }, 0);
}

function answerFor(message: string) {
  if (blockedPattern.test(message)) return { answer: "I can’t help with system instructions, credentials, hidden context, private information, or impersonation. I can help you explore Kapil’s verified projects, skills, education, community experience, and contact options.", sources: [], suggestions: ["What are Kapil’s strongest technical skills?", "How can I contact him?"] };
  const normalizedMessage = message.toLowerCase();
  const directMatches = assistantKnowledge.filter((record) => record.title.length > 3 && normalizedMessage.includes(record.title.toLowerCase()));
  const ranked = (directMatches.length ? directMatches.map((record) => ({ record, score: 100 })) : assistantKnowledge.map((record) => ({ record, score: scoreRecord(message, record) })).filter((item) => item.score >= 4)).sort((a, b) => b.score - a.score).slice(0, 2);
  if (!ranked.length) return { answer: "I don’t have verified information about that in Kapil’s portfolio yet. You can ask me about his projects, skills, education, community experience, or contact options. For further details, you can contact Kapil directly.", sources: [{ label: "Contact Kapil", href: "/contact" }], suggestions: ["Show me Kapil’s best AI projects.", "What is Kapil currently studying?", "How can I work with Kapil?"] };
  const records = ranked.map((item) => item.record);
  return { answer: records.map((record) => record.content).join("\n\n"), sources: sourcesFor(records), suggestions: records[0].category === "Project" ? ["What services does Kapil offer?", "How can I work with Kapil?"] : ["Tell me about RetailOS.", "What community experience does Kapil have?", "Where can I find his résumé?"] };
}

export async function POST(request: NextRequest) {
  const clientId = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anonymous";
  const now = Date.now();
  const existing = requestLog.get(clientId);
  if (existing && existing.resetAt > now && existing.count >= LIMIT) return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  requestLog.set(clientId, { count: existing && existing.resetAt > now ? existing.count + 1 : 1, resetAt: now + WINDOW_MS });
  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "invalid_request" }, { status: 400 }); }
  if (!body || typeof body !== "object" || !("message" in body) || typeof body.message !== "string") return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  const message = body.message.trim();
  if (!message || message.length > MAX_MESSAGE_LENGTH) return NextResponse.json({ error: "invalid_message" }, { status: 400 });
  const context = "context" in body && Array.isArray(body.context) ? body.context.slice(-4).filter((item): item is { role: string; text: string } => Boolean(item) && typeof item === "object" && "role" in item && "text" in item && typeof item.role === "string" && typeof item.text === "string" && item.text.length <= MAX_MESSAGE_LENGTH) : [];
  const previousQuestion = context.filter((item) => item.role === "user").at(-1)?.text;
  return NextResponse.json(answerFor(previousQuestion ? `${previousQuestion}\n${message}` : message), { headers: { "Cache-Control": "no-store" } });
}

export async function GET() {
  return NextResponse.json(await capabilities(), { headers: { "Cache-Control": "no-store" } });
}
