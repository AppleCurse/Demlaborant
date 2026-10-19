import { NextResponse } from "next/server";
import { db } from "@/db";
import { packages } from "@/db/schema";
import { ensureSeeded } from "@/db/seed";

export async function GET() {
  await ensureSeeded();
  const all = await db.select().from(packages);
  return NextResponse.json(all);
}
