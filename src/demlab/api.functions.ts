import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

async function admin() {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return supabaseAdmin;
}

function orderNumber() {
  return `DLM-${Math.floor(100000 + Math.random() * 900000)}`;
}

export const getDistricts = createServerFn({ method: "GET" }).handler(async () => {
  const db = await admin();
  const { data } = await db.from("districts").select("name, eta_min, eta_max, note").order("eta_min");
  return (data ?? []).map((d) => ({ name: d.name, etaMin: d.eta_min, etaMax: d.eta_max, note: d.note }));
});

export const lookupLot = createServerFn({ method: "POST" })
  .inputValidator(z.object({ code: z.string().trim().min(1).max(40) }))
  .handler(async ({ data }) => {
    const db = await admin();
    const { data: row } = await db.from("lots").select("*").ilike("lot_code", data.code).maybeSingle();
    if (!row) return { found: false as const, error: "Bu lot numarasına ait analiz kaydı bulunamadı." };
    return {
      found: true as const,
      lot: {
        lotCode: row.lot_code,
        abv: row.abv,
        residue: row.residue,
        volatileAcidity: row.volatile_acidity,
        heavyMetals: row.heavy_metals,
        testDate: row.test_date,
        method: row.method,
        status: row.status,
      },
    };
  });

const itemSchema = z.object({
  name: z.string().max(200),
  size: z.string().max(100),
  price: z.number().nonnegative(),
  quantity: z.number().int().positive().max(1000),
});

export const createOrder = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      items: z.array(itemSchema).min(1).max(50),
      total: z.number().nonnegative(),
      fullName: z.string().trim().min(3).max(120),
      phone: z.string().trim().min(7).max(30),
      email: z.string().trim().max(200).optional(),
      city: z.string().trim().max(60).optional(),
      district: z.string().trim().max(60).optional(),
      address: z.string().trim().min(8).max(500),
      deliveryType: z.enum(["courier", "cargo"]).default("cargo"),
      paymentType: z.string().max(30).default("door-card"),
      notes: z.string().max(1000).optional(),
    }),
  )
  .handler(async ({ data }) => {
    const db = await admin();
    const orderNo = orderNumber();
    const status = data.deliveryType === "courier" ? "KURYE BEKLİYOR" : "MÜHÜRLENİYOR";
    const { error } = await db.from("orders").insert({
      order_no: orderNo,
      items: data.items,
      total: data.total,
      full_name: data.fullName,
      phone: data.phone,
      email: data.email || null,
      city: data.city || "İstanbul",
      district: data.district || null,
      address: data.address,
      delivery_type: data.deliveryType,
      payment_type: data.paymentType,
      notes: data.notes || null,
      status,
    });
    if (error) throw new Error("Sipariş kaydı oluşturulamadı, lütfen tekrar deneyin.");
    return { orderNo, status };
  });

const digits = (s: string) => s.replace(/\D/g, "").slice(-10);

export const trackOrder = createServerFn({ method: "POST" })
  .inputValidator(z.object({ orderNo: z.string().trim().min(3).max(30), phone: z.string().trim().min(7).max(30) }))
  .handler(async ({ data }) => {
    const db = await admin();
    const { data: row } = await db
      .from("orders")
      .select("order_no, items, total, phone, district, city, delivery_type, status, created_at")
      .ilike("order_no", data.orderNo)
      .maybeSingle();
    if (!row || digits(row.phone) !== digits(data.phone)) return null;
    return {
      orderNo: row.order_no,
      items: row.items as Array<{ name: string; size: string; quantity: number }>,
      total: Number(row.total),
      location: [row.district, row.city].filter(Boolean).join(" / "),
      deliveryType: row.delivery_type,
      status: row.status,
      createdAt: row.created_at,
    };
  });

export const createInquiry = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      name: z.string().trim().min(2).max(120),
      company: z.string().max(200).optional(),
      email: z.string().max(200).optional(),
      phone: z.string().max(30).optional(),
      product: z.string().max(200).optional(),
      message: z.string().max(2000),
    }),
  )
  .handler(async ({ data }) => {
    const db = await admin();
    const { error } = await db.from("inquiries").insert({ ...data, message: data.message || "-" });
    if (error) throw new Error("Talep kaydedilemedi.");
    return { ok: true };
  });
