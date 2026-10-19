import { NextResponse } from "next/server";
import { db } from "@/db";
import { coaRecords } from "@/db/schema";
import { eq } from "drizzle-orm";

const SEED_LOTS = [
  { lotNo: "DLM-96-2026-B4", purity: "%96.22", residue: "< 0.0005%", acidity: "< 12 ppm", heavyMetal: "Tespit Edilemedi", testDate: "2026-10-05", verified: true },
  { lotNo: "DLM-96-2026-A1", purity: "%96.18", residue: "< 0.0008%", acidity: "< 15 ppm", heavyMetal: "Tespit Edilemedi", testDate: "2026-09-12", verified: true },
  { lotNo: "DLM-96-2025-Z9", purity: "%96.02", residue: "< 0.001%", acidity: "< 10 ppm", heavyMetal: "Tespit Edilemedi", testDate: "2025-12-01", verified: true },
  { lotNo: "DLM-96-2026-C7", purity: "%95.98", residue: "< 0.0012%", acidity: "< 18 ppm", heavyMetal: "Eser Miktar", testDate: "2026-08-20", verified: true },
];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lot = searchParams.get("lot");

  // ensure seeded
  const existing = await db.select().from(coaRecords);
  if (existing.length === 0) {
    for (const s of SEED_LOTS) {
      await db.insert(coaRecords).values(s).onConflictDoNothing();
    }
  }

  if (lot) {
    const found = await db.select().from(coaRecords).where(eq(coaRecords.lotNo, lot.toUpperCase()));
    if (found[0]) return NextResponse.json({ found: true, data: found[0] });
    // try case-insensitive search
    const all = await db.select().from(coaRecords);
    const match = all.find(a => a.lotNo.toLowerCase() === lot.toLowerCase());
    if (match) return NextResponse.json({ found: true, data: match });
    return NextResponse.json({ found: false, message: "Lot bulunamadı. Lütfen kutu üzerindeki kodu kontrol edin." });
  }

  const all = await db.select().from(coaRecords);
  return NextResponse.json(all.length ? all : SEED_LOTS);
}

export async function POST(req: Request) {
  const body = await req.json();
  const lot = body.lot as string;
  if (!lot) return NextResponse.json({ found: false }, { status: 400 });

  const existing = await db.select().from(coaRecords);
  if (existing.length === 0) {
    for (const s of SEED_LOTS) await db.insert(coaRecords).values(s).onConflictDoNothing();
  }

  const found = await db.select().from(coaRecords).where(eq(coaRecords.lotNo, lot.toUpperCase()));
  if (found[0]) return NextResponse.json({ found: true, data: found[0] });
  const all = await db.select().from(coaRecords);
  const match = all.find(a => a.lotNo.toLowerCase() === lot.toLowerCase());
  if (match) return NextResponse.json({ found: true, data: match });
  return NextResponse.json({ found: false });
}
