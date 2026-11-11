import { randomInt } from "node:crypto";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { inquiries } from "@/db/schema";

export const dynamic = "force-dynamic";

function text(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Geçersiz istek gövdesi." }, { status: 400 });
  }

  const values = {
    referenceNo: `TLF-${randomInt(100000, 1000000)}`,
    companyName: text(body.companyName, 160),
    taxOffice: text(body.taxOffice, 120),
    taxNumber: text(body.taxNumber, 20),
    contactName: text(body.contactName, 120),
    email: text(body.email, 160).toLowerCase(),
    phone: text(body.phone, 30).replace(/\D/g, ""),
    city: text(body.city, 80),
    productName: text(body.productName, 200),
    quantity: text(body.quantity, 100),
    notes: text(body.notes, 1500),
  };

  if (
    values.companyName.length < 2 ||
    values.contactName.length < 3 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) ||
    values.phone.length < 10 ||
    values.phone.length > 15 ||
    values.city.length < 2 ||
    !values.productName ||
    !values.quantity
  ) {
    return NextResponse.json(
      { error: "Zorunlu alanları ve iletişim bilgilerini kontrol edin." },
      { status: 422 },
    );
  }
  if (body.kvkkConsent !== true) {
    return NextResponse.json({ error: "KVKK onayı gereklidir." }, { status: 422 });
  }

  try {
    const [inquiry] = await db
      .insert(inquiries)
      .values({
        ...values,
        taxOffice: values.taxOffice || null,
        taxNumber: values.taxNumber || null,
        notes: values.notes || null,
      })
      .returning({ referenceNo: inquiries.referenceNo, status: inquiries.status });

    return NextResponse.json(inquiry, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Talep kaydedilemedi. Lütfen tekrar deneyin veya WhatsApp hattımızı kullanın." },
      { status: 503 },
    );
  }
}
