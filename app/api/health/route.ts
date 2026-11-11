import { NextResponse } from "next/server";
import { db } from "@/db";
import { sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await db.execute(sql`select 1`);
    return NextResponse.json({ status: "ok", database: "up" });
  } catch (error) {
    const detail = error as { message?: string; code?: string; cause?: { message?: string; code?: string } };
    return NextResponse.json(
      {
        status: "degraded",
        database: "down",
        reason: detail.message?.replace(/(password=|:\/\/)[^\s]+/gi, "$1[redacted]").slice(0, 300),
        code: detail.code,
        cause: detail.cause?.message,
        causeCode: detail.cause?.code,
      },
      { status: 503 },
    );
  }
}
