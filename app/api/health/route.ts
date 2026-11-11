import { NextResponse } from "next/server";
import { db } from "@/db";
import { sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await db.execute(sql`select 1`);
    return NextResponse.json({ status: "ok", database: "up" });
  } catch (error) {
    const reason = error instanceof Error ? error.message.replace(/(password=|:\/\/)[^\s]+/gi, "$1[redacted]").slice(0, 240) : "unknown";
    return NextResponse.json(
      { status: "degraded", database: "down", reason },
      { status: 503 },
    );
  }
}
