import { NextResponse } from "next/server";
import { db } from "@/db";
import { stories } from "@/db/schema";
import { desc } from "drizzle-orm";

const SEED_STORIES = [
  { author: "Elif K.", mood: "mutlu", title: "Kavanozdaki Yaz", content: "Vişne likörümü 96° ile demledim, her yudumda çocukluğumun bahçesi geri geldi.", transformation: "Meyve → Anı İksiri", likes: 42 },
  { author: "Murat D.", mood: "yalnız", title: "Atölyede Gece Vardiyası", content: "Ahşap fıçı dinlendirmesi için 45° hedefledim. 96° bana zamanı yavaşlatmayı öğretti.", transformation: "Ahşap → Hafıza", likes: 28 },
  { author: "Zeynep & Can", mood: "mutlu", title: "Düğün Hediyemiz", content: "Kendi portakal tentürümüzü yaptık. Misafirler hala o geceyi konuşuyor.", transformation: "Çiçek → Kutlama", likes: 54 },
  { author: "Kerem A.", mood: "uzgun", title: "Kayıptan Sonra", content: "Babamın tarifini ilk kez denedim. 96°'de demlenen sadece alkol değildi, özlem de dönüştü.", transformation: "Özlem → Şifa", likes: 37 },
];

export async function GET() {
  let all = await db.select().from(stories).orderBy(desc(stories.likes));
  if (all.length === 0) {
    for (const s of SEED_STORIES) {
      await db.insert(stories).values(s);
    }
    all = await db.select().from(stories).orderBy(desc(stories.likes));
  }
  return NextResponse.json(all);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { author, mood, title, content, transformation } = body;
    if (!author || !mood || !title || !content) return NextResponse.json({ error: "Eksik alan" }, { status: 400 });
    const inserted = await db.insert(stories).values({
      author, mood, title, content, transformation: transformation || "Ruh → Işık", likes: 0
    }).returning();
    return NextResponse.json(inserted[0]);
  } catch (e:any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
