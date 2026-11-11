import { NextResponse } from "next/server";
import { Client } from "pg";

export const dynamic = "force-dynamic";

export async function GET() {
  const primary = new URL(process.env.DATABASE_URL!);
  const variants = [
    { name: "transaction-pooler", url: new URL(primary) },
    { name: "session-pooler", url: new URL(primary) },
    { name: "alternate-pooler", url: new URL(primary) },
    { name: "direct", url: new URL(primary) },
  ];
  variants[1].url.port = "5432";
  variants[2].url.hostname = primary.hostname.replace("aws-0-", "aws-1-");
  variants[3].url.hostname = `db.${process.env.NEXT_PUBLIC_SUPABASE_URL?.replace("https://", "")}`;
  variants[3].url.username = primary.username.split(".")[0];
  variants[3].url.port = "5432";

  const attempts = await Promise.all(variants.map(async ({ name, url }) => {
    const client = new Client({ connectionString: url.toString(), connectionTimeoutMillis: 8000 });
    try {
      await client.connect();
      await client.query("select 1");
      return { name, status: "up" };
    } catch (error) {
      const message = error instanceof Error ? error.message : "unknown";
      return { name, status: "down", reason: message.replace(/(password=|:\/\/)[^\s]+/gi, "$1[redacted]").slice(0, 200) };
    } finally {
      await client.end().catch(() => undefined);
    }
  }));
  const healthy = attempts.some((attempt) => attempt.status === "up");
  return NextResponse.json({ status: healthy ? "ok" : "degraded", database: healthy ? "up" : "down", attempts }, { status: healthy ? 200 : 503 });
}
