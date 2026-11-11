import { NextResponse } from "next/server";
import { gateway, generateText, type ModelMessage } from "ai";
import { answerQuestion } from "@/lib/assistant";
import { companyInfo } from "@/data/company";

export const maxDuration = 30;
const requests = new Map<string, { count: number; reset: number }>();

const SYSTEM = `Sen DEMLAB'ın Türkçe satış ve teknik destek asistanısın. Kısa, net ve güvenilir yanıt ver.
Ürün gerçekleri: Tek formülasyon 96 derece (%96.0 v/v), CAS 64-17-5. Seyreltme veya dozaj hesaplama yapma; farklı derece üretme. Ambalajlar ve KDV hariç fiyatlar: 1 L 450 TL, 5 L 1.750 TL, 10 L 3.000 TL, 20 L 5.500 TL. KDV %20. Ara toplam 5.000 TL üzerinde teslimat ücretsiz, altında 250 TL. İstanbul motokurye, diğer iller kargo. Ödeme: kapıda kart, kapıda nakit, havale/EFT, kurumsal cari. Telefon/WhatsApp ${companyInfo.phone}. Sipariş takibi için DLM numarası ve telefon gerekir. CoA/SDS belgeleri yüklenmişse belge merkezinden lot ile indirilir, yoksa WhatsApp'tan talep edilir. Ürün teknik prosesler içindir, doğrudan gıda olarak tüketilmez. H225 alevlenebilir sıvı ve buhar uyarısı vardır. Bilmediğin stok, kesin teslimat saati veya laboratuvar sonucu uydurma; ekibe yönlendir. En fazla 100 kelime.`;

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] ?? "local";
  const now = Date.now();
  const bucket = requests.get(ip);
  if (!bucket || bucket.reset < now) requests.set(ip, { count: 1, reset: now + 60_000 });
  else bucket.count += 1;
  if ((requests.get(ip)?.count ?? 0) > 12) return NextResponse.json({ error: "Çok fazla soru gönderildi. Bir dakika sonra tekrar deneyin." }, { status: 429 });

  const body = await request.json().catch(() => null) as { messages?: { role?: string; content?: string }[] } | null;
  const messages: ModelMessage[] = (body?.messages ?? []).slice(-10).flatMap((message) => {
    if ((message.role !== "user" && message.role !== "assistant") || typeof message.content !== "string") return [];
    return [{ role: message.role, content: message.content.trim().slice(0, 800) }];
  });
  const last = [...messages].reverse().find((message) => message.role === "user");
  if (!last || typeof last.content !== "string" || !last.content.trim()) return NextResponse.json({ error: "Bir soru yazın." }, { status: 400 });

  try {
    const result = await generateText({
      model: gateway(process.env.AI_MODEL ?? "openai/gpt-5-mini"),
      system: SYSTEM,
      messages,
      maxOutputTokens: 280,
      temperature: 0.2,
    });
    return NextResponse.json({ text: result.text, source: "model" });
  } catch {
    return NextResponse.json({ ...answerQuestion(last.content), source: "local" });
  }
}
