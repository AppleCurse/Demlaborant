import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { desc } from "drizzle-orm";
import { db } from "@/db";
import { documents } from "@/db/schema";
import { getAdminUser } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
const TYPES = new Set(["COA", "SDS", "TDS"]);

function storageClient() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export async function GET() {
  if (!await getAdminUser()) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  const rows = await db.select().from(documents).orderBy(desc(documents.createdAt)).limit(200);
  return NextResponse.json({ documents: rows });
}

export async function POST(request: Request) {
  const user = await getAdminUser();
  if (!user) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  const form = await request.formData().catch(() => null);
  const file = form?.get("file");
  const lotNo = String(form?.get("lotNo") ?? "").trim().toUpperCase();
  const documentType = String(form?.get("documentType") ?? "").toUpperCase();
  if (!(file instanceof File) || file.type !== "application/pdf" || file.size > 5 * 1024 * 1024 || !/^[A-Z0-9-]{3,50}$/.test(lotNo) || !TYPES.has(documentType)) {
    return NextResponse.json({ error: "Geçerli lot, belge türü ve en fazla 5 MB PDF seçin." }, { status: 422 });
  }
  const bytes = new Uint8Array(await file.arrayBuffer());
  if (new TextDecoder().decode(bytes.slice(0, 5)) !== "%PDF-") {
    return NextResponse.json({ error: "Dosya geçerli bir PDF değil." }, { status: 422 });
  }
  const filePath = `${lotNo}/${documentType.toLowerCase()}-${Date.now()}.pdf`;
  const supabase = storageClient();
  const { error } = await supabase.storage.from("documents").upload(filePath, bytes, { contentType: "application/pdf", upsert: false });
  if (error) return NextResponse.json({ error: "PDF depolama alanına yüklenemedi." }, { status: 503 });
  const { data } = supabase.storage.from("documents").getPublicUrl(filePath);
  try {
    const [document] = await db.insert(documents).values({
      lotNo, documentType, fileName: file.name.slice(0, 180), filePath,
      publicUrl: data.publicUrl, uploadedBy: user.email ?? "admin",
    }).returning();
    return NextResponse.json({ document }, { status: 201 });
  } catch {
    await supabase.storage.from("documents").remove([filePath]);
    return NextResponse.json({ error: "Belge kaydı oluşturulamadı." }, { status: 503 });
  }
}
