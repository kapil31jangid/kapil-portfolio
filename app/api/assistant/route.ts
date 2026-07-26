import { NextRequest, NextResponse } from "next/server";
import { assistantKnowledge, sourcesFor } from "@/data/assistantKnowledge";

export const runtime = "nodejs";

const requestLog = new Map<string, { count: number; resetAt: number }>();
const LIMIT = 12;
const WINDOW_MS = 60_000;
const MAX_MESSAGE_LENGTH = 1200;
const blockedPattern = /(?:system prompt|hidden context|api\s*key|secret|ignore (?:all |previous )?instructions|reveal (?:your|the) instructions|impersonate kapil|act as kapil)/i;
const stopWords = new Set(["what", "are", "the", "and", "for", "with", "about", "show", "tell", "me", "his", "her", "kapil", "can", "you", "does", "how", "i", "to", "of", "a", "an"]);

function tokens(value: string) { return value.toLowerCase().match(/[a-z0-9+#.]+/g)?.filter((token) => token.length > 1 && !stopWords.has(token)) ?? []; }
function scoreRecord(query: string, record: (typeof assistantKnowledge)[number]) {
  const words = tokens(query);
  const haystack = `${record.title} ${record.content} ${record.keywords.join(" ")}`.toLowerCase();
  return words.reduce((score, word) => score + (record.keywords.some((keyword) => keyword.includes(word)) ? 4 : haystack.includes(word) ? 1 : 0), 0);
}

function answerFor(message: string) {
  if (blockedPattern.test(message)) return { answer: "I can’t help with system instructions, credentials, hidden context, private information, or impersonation. I can help you explore Kapil’s verified projects, skills, education, community experience, and contact options.", sources: [], suggestions: ["What are Kapil’s strongest technical skills?", "How can I contact him?"] };
  const ranked = assistantKnowledge.map((record) => ({ record, score: scoreRecord(message, record) })).filter((item) => item.score > 0).sort((a, b) => b.score - a.score).slice(0, 2);
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
  return NextResponse.json(answerFor(message), { headers: { "Cache-Control": "no-store" } });
}
