import { NextResponse } from "next/server";
import { db } from "@/db";
import { orders, packages } from "@/db/schema";
import { ensureSeeded } from "@/db/seed";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

type OrderPayload = {
  packageId?: string;
  fullName?: string;
  phone?: string;
  city?: string;
  district?: string;
  address?: string;
  deliveryType?: string;
  paymentType?: string;
};

function orderNumber() {
  return `DLM-${Math.floor(100000 + Math.random() * 900000)}`;
}

export async function POST(request: Request) {
  let payload: OrderPayload;
  try {
    payload = (await request.json()) as OrderPayload;
  } catch {
    return NextResponse.json({ error: "Geçersiz istek gövdesi." }, { status: 400 });
  }

  const fullName = payload.fullName?.trim() ?? "";
  const phone = payload.phone?.trim() ?? "";
  const address = payload.address?.trim() ?? "";
  const city = payload.city?.trim() || "İstanbul";
  const district = payload.district?.trim() || "Kadıköy";
  const deliveryType = payload.deliveryType === "cargo" ? "cargo" : "courier";
  const paymentType = payload.paymentType === "door-cash" ? "door-cash" : "door-card";

  if (fullName.length < 3 || phone.length < 7 || address.length < 8) {
    return NextResponse.json(
      { error: "Lütfen ad soyad, telefon ve açık adres alanlarını eksiksiz doldurun." },
      { status: 422 },
    );
  }

  try {
    await ensureSeeded();
    const pkg = (
      await db
        .select()
        .from(packages)
        .where(eq(packages.id, payload.packageId ?? "pkg-10l"))
    )[0];
    if (!pkg) {
      return NextResponse.json({ error: "Paket bulunamadı." }, { status: 404 });
    }

    const [order] = await db
      .insert(orders)
      .values({
        orderNo: orderNumber(),
        packageId: pkg.id,
        volume: pkg.volume,
        price: pkg.price,
        fullName,
        phone,
        city,
        district,
        address,
        deliveryType,
        paymentType,
        status: deliveryType === "courier" ? "KURYE BEKLİYOR" : "MÜHÜRLENİYOR",
      })
      .returning();

    return NextResponse.json({
      orderNo: order.orderNo,
      status: order.status,
      volume: order.volume,
      price: order.price,
      deliveryType: order.deliveryType,
    });
  } catch {
    return NextResponse.json(
      { error: "Sipariş kaydı oluşturulamadı, lütfen tekrar deneyin." },
      { status: 503 },
    );
  }
}
