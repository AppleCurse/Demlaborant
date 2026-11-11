"use client";

import { FormEvent, useState } from "react";
import { LockKeyhole } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: String(form.get("email") ?? ""),
      password: String(form.get("password") ?? ""),
    });
    if (authError) {
      setError("E-posta veya şifre hatalı.");
      setLoading(false);
      return;
    }
    const response = await fetch("/api/admin/session");
    if (!response.ok) {
      await supabase.auth.signOut();
      setError("Bu hesabın yönetim paneli yetkisi bulunmuyor.");
      setLoading(false);
      return;
    }
    router.replace("/admin");
    router.refresh();
  }

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md items-center px-4 py-16">
      <form onSubmit={login} className="oak-card w-full space-y-5 rounded-3xl p-8">
        <LockKeyhole className="h-9 w-9 text-[#e59840]" />
        <div><h1 className="font-serif text-3xl font-black">DEMLAB Yönetim</h1><p className="mt-2 text-xs text-[#c6ad97]">Yetkili hesabınızla güvenli giriş yapın.</p></div>
        <label className="block text-xs font-semibold">E-posta<input name="email" type="email" autoComplete="username" required className="mt-2 w-full rounded-xl border border-[#442616] bg-[#180d07] p-3 text-sm outline-none focus:border-[#e59840]" /></label>
        <label className="block text-xs font-semibold">Şifre<input name="password" type="password" autoComplete="current-password" required className="mt-2 w-full rounded-xl border border-[#442616] bg-[#180d07] p-3 text-sm outline-none focus:border-[#e59840]" /></label>
        {error && <p role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300">{error}</p>}
        <button disabled={loading} className="btn-amber w-full rounded-xl py-3 text-sm font-bold disabled:opacity-50">{loading ? "Kontrol ediliyor..." : "Giriş Yap"}</button>
      </form>
    </main>
  );
}
