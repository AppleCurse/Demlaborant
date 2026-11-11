"use client";

import { useState } from "react";
import Link from "next/link";
import { AlertCircle, CheckCircle2, Send, Sparkles } from "lucide-react";
import { products } from "@/data/products";
import { companyInfo } from "@/data/company";

const initialForm = (defaultProduct: string) => ({
  companyName: "",
  taxOffice: "",
  taxNumber: "",
  contactName: "",
  email: "",
  phone: "",
  city: "",
  productName: defaultProduct || products[0]?.name || "",
  quantity: "5 Litre Laboratuvar Bidonu",
  notes: "",
  kvkkConsent: false,
});

export default function InquiryForm({ defaultProduct = "" }: { defaultProduct?: string }) {
  const [referenceNo, setReferenceNo] = useState("");
  const [formData, setFormData] = useState(() => initialForm(defaultProduct));
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const update = <K extends keyof typeof formData>(field: K, value: (typeof formData)[K]) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    if (!formData.kvkkConsent) {
      setError("Devam etmek için KVKK aydınlatma metnini onaylayın.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = (await response.json()) as { referenceNo?: string; error?: string };
      if (!response.ok || !result.referenceNo) throw new Error(result.error || "Talep kaydedilemedi.");
      setReferenceNo(result.referenceNo);
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Talep kaydedilemedi.");
    } finally {
      setSubmitting(false);
    }
  };

  if (referenceNo) {
    return (
      <div className="oak-card rounded-3xl p-8 sm:p-10 text-center space-y-4 border border-[#e59840]/40">
        <div className="w-16 h-16 bg-[#e59840]/20 text-[#f3bd68] rounded-full flex items-center justify-center mx-auto border border-[#e59840]/40"><CheckCircle2 className="w-8 h-8" /></div>
        <h3 className="text-xl font-bold text-[#fef5ec] font-serif">Teklif Talebiniz Kaydedildi</h3>
        <p className="text-xs sm:text-sm text-[#d6bda7] max-w-md mx-auto leading-relaxed">Talep referans numaranız <strong className="text-[#f3bd68] font-mono">{referenceNo}</strong>. Teknik ekibimiz verdiğiniz iletişim bilgileri üzerinden sizinle iletişime geçecek.</p>
        <button onClick={() => { setReferenceNo(""); setFormData(initialForm(defaultProduct)); }} className="text-xs font-semibold text-[#f3bd68] underline">Yeni bir talep oluştur</button>
      </div>
    );
  }

  const inputClass = "w-full text-xs rounded-xl bg-[#190d07] border border-[#442616] text-[#f7ede2] px-3.5 py-2.5 focus:border-[#e59840] outline-none transition";
  const labelClass = "block text-xs font-semibold text-[#d8c2ad] mb-1";

  return (
    <form onSubmit={handleSubmit} className="oak-card rounded-3xl p-6 sm:p-8 space-y-6">
      <div>
        <h3 className="text-lg font-bold text-[#fff4ea] font-serif flex items-center gap-2"><Sparkles className="w-5 h-5 text-[#e59840]" /> Özel Fermantasyon & Toptan Sipariş Formu</h3>
        <p className="text-xs text-[#bda18b] mt-1">Ambalaj ve teslimat ihtiyacınızı iletin; talebiniz kayıt altına alınsın.</p>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label htmlFor="inquiry-company" className={labelClass}>Firma / Atölye / Ad Soyad *</label><input id="inquiry-company" required minLength={2} value={formData.companyName} onChange={(e) => update("companyName", e.target.value)} className={inputClass} /></div>
          <div><label htmlFor="inquiry-tax" className={labelClass}>Vergi No veya T.C. Kimlik No</label><input id="inquiry-tax" value={formData.taxNumber} onChange={(e) => update("taxNumber", e.target.value)} className={inputClass} /></div>
          <div><label htmlFor="inquiry-office" className={labelClass}>Vergi Dairesi</label><input id="inquiry-office" value={formData.taxOffice} onChange={(e) => update("taxOffice", e.target.value)} className={inputClass} /></div>
          <div><label htmlFor="inquiry-contact" className={labelClass}>Yetkili Kişi *</label><input id="inquiry-contact" required minLength={3} autoComplete="name" value={formData.contactName} onChange={(e) => update("contactName", e.target.value)} className={inputClass} /></div>
          <div><label htmlFor="inquiry-email" className={labelClass}>E-Posta *</label><input id="inquiry-email" required type="email" autoComplete="email" value={formData.email} onChange={(e) => update("email", e.target.value)} className={inputClass} /></div>
          <div><label htmlFor="inquiry-phone" className={labelClass}>Telefon *</label><input id="inquiry-phone" required type="tel" minLength={10} autoComplete="tel" value={formData.phone} onChange={(e) => update("phone", e.target.value)} className={inputClass} /></div>
        </div>
        <div><label htmlFor="inquiry-city" className={labelClass}>Teslimat İli / İlçesi *</label><input id="inquiry-city" required value={formData.city} onChange={(e) => update("city", e.target.value)} className={inputClass} /></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label htmlFor="inquiry-product" className={labelClass}>İlgilendiğiniz Ürün *</label><select id="inquiry-product" required value={formData.productName} onChange={(e) => update("productName", e.target.value)} className={inputClass}>{products.map((product) => <option key={product.slug} value={product.name}>{product.name}</option>)}<option value="Diğer / Özel Formülasyon">Diğer / Özel Formülasyon</option></select></div>
          <div><label htmlFor="inquiry-quantity" className={labelClass}>Tahmini Miktar *</label><select id="inquiry-quantity" required value={formData.quantity} onChange={(e) => update("quantity", e.target.value)} className={inputClass}><option>1 Litre Numune</option><option>5 Litre Laboratuvar Bidonu</option><option>10 Litre Atölye Bidonu</option><option>20 Litre Sanayi Bidonu</option><option>20 Litreden Fazla / Toptan</option></select></div>
        </div>
        <div><label htmlFor="inquiry-notes" className={labelClass}>Proses ve Talep Notları</label><textarea id="inquiry-notes" rows={4} maxLength={1500} value={formData.notes} onChange={(e) => update("notes", e.target.value)} className={inputClass} /></div>
        <label className="flex items-start gap-2.5 text-[11px] text-[#bda18b] cursor-pointer">
          <input type="checkbox" checked={formData.kvkkConsent} onChange={(e) => update("kvkkConsent", e.target.checked)} className="mt-0.5 accent-[#e59840]" />
          <span><Link href="/privacy" target="_blank" className="text-[#f3bd68] underline">KVKK aydınlatma metnini</Link> okudum; iletişim ve teklif bilgilerimin bu amaçla işlenmesini kabul ediyorum. *</span>
        </label>
      </div>
      {error && <div role="alert" className="rounded-xl border border-red-500/40 bg-red-950/30 p-3 text-xs text-red-200 flex items-start gap-2"><AlertCircle className="w-4 h-4 shrink-0" /><span>{error} <a href={`${companyInfo.whatsappUrl}?text=${encodeURIComponent("Merhaba, teklif talebimi iletmek istiyorum.")}`} target="_blank" rel="noreferrer" className="block mt-1 text-[#f3bd68] underline">WhatsApp üzerinden iletin</a></span></div>}
      <button type="submit" disabled={submitting} className="w-full inline-flex items-center justify-center gap-2 btn-amber disabled:opacity-50 font-bold py-3.5 px-6 rounded-xl text-sm"><Send className="w-4 h-4" /> {submitting ? "Talep Kaydediliyor..." : "Teklif Talebini Gönder"}</button>
    </form>
  );
}
