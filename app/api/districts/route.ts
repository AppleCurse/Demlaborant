import { NextResponse } from "next/server";
import { db } from "@/db";
import { districts, packages } from "@/db/schema";
import { ensureSeeded } from "@/db/seed";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await ensureSeeded();
    const [districtRows, packageRows] = await Promise.all([
      db.select().from(districts),
      db.select().from(packages),
    ]);
    return NextResponse.json({
      districts: districtRows.sort((a, b) => a.etaMin - b.etaMin),
      packages: packageRows.sort((a, b) => a.volume - b.volume),
    });
  } catch {
    return NextResponse.json(
      { error: "Referans verilerine ulaşılamadı." },
      { status: 503 },
    );
  }
}
