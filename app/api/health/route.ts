import { NextResponse } from "next/server";
import { db } from "@/db";
import { sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await db.execute(sql`select 1`);
    return NextResponse.json({ status: "ok", database: "up" });
  } catch (error) {
    const cause = error && typeof error === "object" && "cause" in error ? error.cause : null;
    const causeMessage = cause && typeof cause === "object" && "message" in cause ? String(cause.message) : "";
    const rawReason = causeMessage || (error instanceof Error ? error.message : "unknown");
    const reason = rawReason.replace(/(password=|:\/\/)[^\s]+/gi, "$1[redacted]").slice(0, 240);
    return NextResponse.json(
      { status: "degraded", database: "down", reason },
      { status: 503 },
    );
  }
}
