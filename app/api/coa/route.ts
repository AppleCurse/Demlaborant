import { NextResponse } from "next/server";
import { sql } from "drizzle-orm";
import { db } from "@/db";
import { coaRecords } from "@/db/schema";

export const dynamic = "force-dynamic";

const SEED_LOTS = [
  { lotNo: "DLM-09-2026-B4", purity: "%9.22", residue: "< 0.0005%", acidity: "< 12 ppm", heavyMetal: "Tespit Edilemedi", testDate: "2026-10-05", verified: true },
  { lotNo: "DLM-09-2026-A1", purity: "%9.18", residue: "< 0.0008%", acidity: "< 15 ppm", heavyMetal: "Tespit Edilemedi", testDate: "2026-09-12", verified: true },
  { lotNo: "DLM-09-2025-Z9", purity: "%9.02", residue: "< 0.001%", acidity: "< 10 ppm", heavyMetal: "Tespit Edilemedi", testDate: "2025-12-01", verified: true },
  { lotNo: "DLM-09-2026-C7", purity: "%8.98", residue: "< 0.0012%", acidity: "< 18 ppm", heavyMetal: "Eser Miktar", testDate: "2026-08-20", verified: true },
];

async function findLot(lot: string) {
  const existing = await db.select().from(coaRecords);
  if (existing.length === 0) {
    await db.insert(coaRecords).values(SEED_LOTS).onConflictDoNothing();
  }
  return (
    await db
      .select()
      .from(coaRecords)
      .where(sql`upper(${coaRecords.lotNo}) = upper(${lot})`)
      .limit(1)
  )[0];
}

export async function GET(request: Request) {
  const lot = (new URL(request.url).searchParams.get("lot") ?? "").trim().slice(0, 80);
  try {
    if (lot) {
      const found = await findLot(lot);
      return found
        ? NextResponse.json({ found: true, data: found })
        : NextResponse.json({ found: false, message: "Lot bulunamadı. Kutu üzerindeki kodu kontrol edin." });
    }
    await findLot("__seed__");
    return NextResponse.json(await db.select().from(coaRecords));
  } catch {
    return NextResponse.json({ error: "Analiz servisine şu anda ulaşılamıyor." }, { status: 503 });
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { lot?: unknown };
    const lot = typeof body.lot === "string" ? body.lot.trim().slice(0, 80) : "";
    if (!lot) return NextResponse.json({ found: false, error: "Lot numarası gerekli." }, { status: 400 });
    const found = await findLot(lot);
    return NextResponse.json(found ? { found: true, data: found } : { found: false });
  } catch {
    return NextResponse.json({ error: "Analiz servisine şu anda ulaşılamıyor." }, { status: 503 });
  }
}
