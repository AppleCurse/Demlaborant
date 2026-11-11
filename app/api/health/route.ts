import { NextResponse } from "next/server";
import { Client } from "pg";

export const dynamic = "force-dynamic";

export async function GET() {
  const primary = new URL(process.env.DATABASE_URL!);
  primary.searchParams.set("sslmode", "no-verify");
  const variants = [
    { name: "aws0-custom", host: primary.hostname, user: primary.username },
    { name: "aws1-custom", host: primary.hostname.replace("aws-0-", "aws-1-"), user: primary.username },
    { name: "aws0-postgres", host: primary.hostname, user: `postgres.${primary.username.split(".")[1]}` },
    { name: "aws1-postgres", host: primary.hostname.replace("aws-0-", "aws-1-"), user: `postgres.${primary.username.split(".")[1]}` },
  ];
  const attempts = await Promise.all(variants.map(async ({ name, host, user }) => {
    const url = new URL(primary);
    url.hostname = host;
    url.username = user;
    const client = new Client({ connectionString: url.toString(), connectionTimeoutMillis: 8000 });
    try {
      await client.connect();
      await client.query("select 1");
      return { name, status: "up" };
    } catch (error) {
      const detail = error as { message?: string; cause?: { message?: string } };
      return { name, status: "down", reason: (detail.cause?.message ?? detail.message)?.slice(0, 180) };
    } finally {
      await client.end().catch(() => undefined);
    }
  }));
  return NextResponse.json({ status: attempts.some((a) => a.status === "up") ? "ok" : "degraded", attempts });
}
