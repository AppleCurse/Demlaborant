"use client";

import { FormEvent, useState } from "react";
import { FileUp } from "lucide-react";

export default function DocumentUpload({ onUploaded }: { onUploaded: () => void }) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function upload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    setLoading(true);
    setMessage("");
    const response = await fetch("/api/admin/documents", { method: "POST", body: new FormData(formElement) });
    const result = await response.json() as { error?: string };
    if (!response.ok) setMessage(result.error ?? "Yükleme başarısız.");
    else {
      setMessage("PDF yüklendi ve belge merkezinde yayınlandı.");
      formElement.reset();
      onUploaded();
    }
    setLoading(false);
  }

  return (
    <form onSubmit={upload} className="grid gap-3 rounded-2xl border border-[#3e2315] bg-[#180d07] p-4 sm:grid-cols-4">
      <input name="lotNo" required placeholder="Lot no (DLM-96-...)" className="rounded-xl border border-[#442616] bg-[#0d0704] p-3 text-xs" />
      <select name="documentType" className="rounded-xl border border-[#442616] bg-[#0d0704] p-3 text-xs"><option value="COA">CoA</option><option value="SDS">SDS</option><option value="TDS">TDS</option></select>
      <input name="file" required type="file" accept="application/pdf,.pdf" className="rounded-xl border border-[#442616] bg-[#0d0704] p-2.5 text-xs" />
      <button disabled={loading} className="btn-amber inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs font-bold disabled:opacity-50"><FileUp className="h-4 w-4" />{loading ? "Yükleniyor" : "PDF Yükle"}</button>
      {message && <p className="text-xs text-[#f3bd68] sm:col-span-4">{message}</p>}
    </form>
  );
}
