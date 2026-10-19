import { NextResponse } from "next/server";
import { sql } from "drizzle-orm";
import { db } from "@/db";
import { lots } from "@/db/schema";
import { ensureSeeded, reseed } from "@/db/seed";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    await ensureSeeded();
    const code = String(
      String(new URL(request.url).searchParams.get("code") ?? "").trim(),
    );
    if (Number(code.length) === 0) {
      return NextResponse.json(
        { found: false, error: "Lot numarası boş olamaz." },
        { status: 400 },
      );
    }

    // Case-insensitive lookup is delegated to Postgres (upper()), which is
    // deterministic and immune to the JS runtime's string quirks.
    let rows = await db
      .select()
      .from(lots)
      .where(sql`upper(${lots.lotCode}) = upper(${code})`);

    if (Number(rows.length) === 0) {
      await reseed();
      rows = await db
        .select()
        .from(lots)
        .where(sql`upper(${lots.lotCode}) = upper(${code})`);
    }

    const match = rows[0];
    if (!match) {
      return NextResponse.json({
        found: false,
        error: "Bu lot numarasına ait analiz kaydı bulunamadı.",
      });
    }
    return NextResponse.json({ found: true, lot: match });
  } catch {
    return NextResponse.json(
      { found: false, error: "Analiz sunucusuna ulaşılamadı." },
      { status: 503 },
    );
  }
}
