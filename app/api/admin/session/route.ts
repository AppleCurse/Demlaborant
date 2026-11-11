import { NextResponse } from "next/server";
import { getAdminUser } from "@/lib/supabase/server";

export async function GET() {
  const user = await getAdminUser();
  if (!user) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  return NextResponse.json({ email: user.email });
}
