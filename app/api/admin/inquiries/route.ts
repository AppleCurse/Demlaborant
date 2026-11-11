import { NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { inquiries } from "@/db/schema";
import { getAdminUser } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
const STATUSES = ["YENİ", "İNCELENİYOR", "TEKLİF GÖNDERİLDİ", "TAMAMLANDI", "İPTAL"];

export async function GET() {
  if (!await getAdminUser()) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  try {
    const rows = await db.select().from(inquiries).orderBy(desc(inquiries.createdAt)).limit(200);
    return NextResponse.json({ inquiries: rows });
  } catch {
    return NextResponse.json({ error: "Teklifler yüklenemedi." }, { status: 503 });
  }
}

export async function PATCH(request: Request) {
  if (!await getAdminUser()) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  const body = await request.json().catch(() => null) as { id?: number; status?: string } | null;
  if (!body || !Number.isInteger(body.id) || !STATUSES.includes(body.status ?? "")) {
    return NextResponse.json({ error: "Geçersiz teklif veya durum." }, { status: 422 });
  }
  const [inquiry] = await db.update(inquiries).set({ status: body.status! }).where(eq(inquiries.id, body.id!)).returning({ id: inquiries.id, status: inquiries.status });
  if (!inquiry) return NextResponse.json({ error: "Teklif bulunamadı." }, { status: 404 });
  return NextResponse.json({ inquiry });
}
