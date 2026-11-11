import { randomInt } from "node:crypto";
import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { orderItems, orders } from "@/db/schema";
import { CartValidationError, priceCart, type CartLineInput } from "@/lib/commerce";

export const dynamic = "force-dynamic";

const PAYMENT_METHODS = new Set(["door-card", "door-cash", "transfer", "corporate"]);

function text(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function phoneDigits(value: unknown) {
  return text(value, 30).replace(/\D/g, "");
}

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function orderNumber() {
  return `DLM-${randomInt(100000, 1000000)}`;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const orderNo = text(searchParams.get("orderNo"), 30).toUpperCase();
  const phone = phoneDigits(searchParams.get("phone"));

  if (!/^DLM-\d{6}$/.test(orderNo) || phone.length < 10 || phone.length > 15) {
    return NextResponse.json(
      { error: "Sipariş numarasını ve siparişte kullanılan telefon numarasını girin." },
      { status: 400 },
    );
  }

  try {
    const order = (
      await db
        .select()
        .from(orders)
        .where(and(eq(orders.orderNo, orderNo), eq(orders.phone, phone)))
        .limit(1)
    )[0];

    if (!order) {
      return NextResponse.json(
        { error: "Bu bilgilerle eşleşen sipariş bulunamadı." },
        { status: 404 },
      );
    }

    const items = await db.select().from(orderItems).where(eq(orderItems.orderId, order.id));
    return NextResponse.json({
      order: {
        orderNo: order.orderNo,
        status: order.status,
        createdAt: order.createdAt,
        city: order.city,
        district: order.district,
        deliveryType: order.deliveryType,
        paymentType: order.paymentType,
        grandTotal: order.grandTotal,
      },
      items: items.map((item) => ({
        name: item.productName,
        size: item.size,
        quantity: item.quantity,
        lineTotal: item.lineTotal,
      })),
    });
  } catch {
    return NextResponse.json(
      { error: "Sipariş takip servisine şu anda ulaşılamıyor." },
      { status: 503 },
    );
  }
}

export async function POST(request: Request) {
  let payload: Record<string, unknown>;
  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Geçersiz istek gövdesi." }, { status: 400 });
  }

  const fullName = text(payload.fullName, 120);
  const email = text(payload.email, 160).toLowerCase();
  const phone = phoneDigits(payload.phone);
  const city = text(payload.city, 80);
  const district = text(payload.district, 80);
  const address = text(payload.address, 500);
  const deliveryNotes = text(payload.deliveryNotes, 500);
  const invoiceType = payload.invoiceType === "corporate" ? "corporate" : "individual";
  const companyName = text(payload.companyName, 160);
  const taxOffice = text(payload.taxOffice, 120);
  const taxNumber = text(payload.taxNumber, 20).replace(/\D/g, "");
  const paymentType = text(payload.paymentType, 30);

  if (
    fullName.length < 3 ||
    !validEmail(email) ||
    phone.length < 10 ||
    phone.length > 15 ||
    city.length < 2 ||
    district.length < 2 ||
    address.length < 8
  ) {
    return NextResponse.json(
      { error: "Ad soyad, e-posta, telefon ve teslimat adresini eksiksiz kontrol edin." },
      { status: 422 },
    );
  }
  if (!PAYMENT_METHODS.has(paymentType)) {
    return NextResponse.json({ error: "Geçerli bir ödeme yöntemi seçin." }, { status: 422 });
  }
  if (invoiceType === "corporate" && (!companyName || !taxOffice || taxNumber.length < 10)) {
    return NextResponse.json(
      { error: "Kurumsal fatura için şirket unvanı, vergi dairesi ve 10 haneli vergi numarası gerekli." },
      { status: 422 },
    );
  }

  try {
    const cart = priceCart(payload.items as CartLineInput[]);
    const deliveryType = city.toLocaleLowerCase("tr-TR") === "i̇stanbul" || city.toLocaleLowerCase("tr-TR") === "istanbul"
      ? "courier"
      : "cargo";

    const result = await db.transaction(async (tx) => {
      const [order] = await tx
        .insert(orders)
        .values({
          orderNo: orderNumber(),
          fullName,
          email,
          phone,
          city,
          district,
          address,
          deliveryNotes: deliveryNotes || null,
          invoiceType,
          companyName: invoiceType === "corporate" ? companyName : null,
          taxOffice: invoiceType === "corporate" ? taxOffice : null,
          taxNumber: invoiceType === "corporate" ? taxNumber : null,
          deliveryType,
          paymentType,
          subtotal: cart.subtotal,
          vatAmount: cart.vatAmount,
          shippingFee: cart.shippingFee,
          grandTotal: cart.grandTotal,
          status: paymentType === "transfer" ? "ÖDEME BEKLİYOR" : "SİPARİŞ ALINDI",
        })
        .returning();

      await tx.insert(orderItems).values(
        cart.items.map((item) => ({
          orderId: order.id,
          productSlug: item.slug,
          productName: item.name,
          size: item.size,
          unitPrice: item.unitPrice,
          quantity: item.quantity,
          lineTotal: item.lineTotal,
        })),
      );
      return order;
    });

    return NextResponse.json(
      {
        orderNo: result.orderNo,
        status: result.status,
        grandTotal: result.grandTotal,
        deliveryType: result.deliveryType,
        paymentType: result.paymentType,
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof CartValidationError) {
      return NextResponse.json({ error: error.message }, { status: 422 });
    }
    return NextResponse.json(
      { error: "Sipariş kaydı oluşturulamadı. Sepetiniz korundu; lütfen tekrar deneyin." },
      { status: 503 },
    );
  }
}
