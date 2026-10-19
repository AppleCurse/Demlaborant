import { NextResponse } from "next/server";
import { db } from "@/db";
import { sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await db.execute(sql`select 1`);
    return NextResponse.json({ status: "ok", database: "up" });
  } catch {
    return NextResponse.json(
      { status: "degraded", database: "down" },
      { status: 503 },
    );
  }
}
