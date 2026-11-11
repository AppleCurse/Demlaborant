import { NextResponse } from "next/server";
import { desc, eq, inArray } from "drizzle-orm";
import { db } from "@/db";
import { orderItems, orders } from "@/db/schema";
import { getAdminUser } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
export const ORDER_STATUSES = ["ÖDEME BEKLİYOR", "SİPARİŞ ALINDI", "ONAYLANDI", "HAZIRLANIYOR", "KURYEDE", "KARGODA", "TESLİM EDİLDİ", "İPTAL"] as const;

export async function GET() {
  if (!await getAdminUser()) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  try {
    const rows = await db.select().from(orders).orderBy(desc(orders.createdAt)).limit(200);
    const items = rows.length ? await db.select().from(orderItems).where(inArray(orderItems.orderId, rows.map((order) => order.id))) : [];
    return NextResponse.json({ orders: rows.map((order) => ({ ...order, items: items.filter((item) => item.orderId === order.id) })) });
  } catch {
    return NextResponse.json({ error: "Siparişler yüklenemedi." }, { status: 503 });
  }
}

export async function PATCH(request: Request) {
  if (!await getAdminUser()) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  const body = await request.json().catch(() => null) as { id?: number; status?: string } | null;
  if (!body || !Number.isInteger(body.id) || !ORDER_STATUSES.includes(body.status as typeof ORDER_STATUSES[number])) {
    return NextResponse.json({ error: "Geçersiz sipariş veya durum." }, { status: 422 });
  }
  const [order] = await db.update(orders).set({ status: body.status! }).where(eq(orders.id, body.id!)).returning({ id: orders.id, status: orders.status });
  if (!order) return NextResponse.json({ error: "Sipariş bulunamadı." }, { status: 404 });
  return NextResponse.json({ order });
}
