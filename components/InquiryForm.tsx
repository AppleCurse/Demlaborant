"use client";

import { useState } from "react";
import { CheckCircle2, Send, Building2, User, Mail, Phone, MapPin, Sparkles } from "lucide-react";
import { products } from "@/data/products";

export default function InquiryForm({ defaultProduct = "" }: { defaultProduct?: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    taxOffice: "",
    taxNumber: "",
    contactName: "",
    email: "",
    phone: "",
    city: "",
    productName: defaultProduct || (products[0]?.name || ""),
    quantity: "5 Litre Laboratuvar Bidonu",
    notes: "",
    kvkkConsent: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.kvkkConsent) {
      alert("Lütfen KVKK aydınlatma metnini onaylayınız.");
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="oak-card rounded-3xl p-8 sm:p-10 text-center space-y-4 border border-[#e59840]/40">
        <div className="w-16 h-16 bg-[#e59840]/20 text-[#f3bd68] rounded-full flex items-center justify-center mx-auto border border-[#e59840]/40 shadow-inner">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-[#fef5ec] font-serif">Özel Teklif Talebiniz Alındı</h3>
        <p className="text-xs sm:text-sm text-[#d6bda7] max-w-md mx-auto leading-relaxed">
          Talebiniz DEMLAB teknik uzmanlarımıza iletilmiştir. Seçtiğiniz ambalaj (5L/10L/20L) ve teslimat lokasyonuna göre hazırlanan analiz sertifikalı proforma teklifiniz en kısa sürede e-posta adresinize gönderilecektir.
        </p>
        <div className="pt-2">
          <button
            onClick={() => setSubmitted(false)}
            className="text-xs font-semibold text-[#f3bd68] underline hover:text-[#ffd79a]"
          >
            Yeni bir talep formu doldur
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="oak-card rounded-3xl p-6 sm:p-8 space-y-6">
      <div>
        <h3 className="text-lg font-bold text-[#fff4ea] font-serif flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#e59840]" />
          <span>Özel Fermantasyon & Toptan Sipariş Formu</span>
        </h3>
        <p className="text-xs text-[#bda18b] mt-1">
          %96 Çözelti ve zanaat hammaddeleriniz için ambalaj ve sevkiyat bilgilerinizi iletin.
        </p>
      </div>

      <div className="space-y-4">
        {/* Firma Bilgileri */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#d8c2ad] mb-1">
              Firma / Atölye / Ad Soyad *
            </label>
            <input
              required
              type="text"
              placeholder="Örn: Dem Zanaat Atölyesi"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              className="w-full text-xs rounded-xl bg-[#190d07] border border-[#442616] text-[#f7ede2] px-3.5 py-2.5 focus:border-[#e59840] outline-none transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#d8c2ad] mb-1">
              Vergi No veya T.C. Kimlik No *
            </label>
            <input
              required
              type="text"
              placeholder="Fatura ve sevk irsaliyesi için"
              value={formData.taxNumber}
              onChange={(e) => setFormData({ ...formData, taxNumber: e.target.value })}
              className="w-full text-xs rounded-xl bg-[#190d07] border border-[#442616] text-[#f7ede2] px-3.5 py-2.5 focus:border-[#e59840] outline-none transition"
            />
          </div>
        </div>

        {/* Yetkili & İletişim */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#d8c2ad] mb-1">
              Yetkili Adı Soyadı *
            </label>
            <input
              required
              type="text"
              placeholder="Ad Soyad"
              value={formData.contactName}
              onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
              className="w-full text-xs rounded-xl bg-[#190d07] border border-[#442616] text-[#f7ede2] px-3.5 py-2.5 focus:border-[#e59840] outline-none transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#d8c2ad] mb-1">
              E-Posta Adresi *
            </label>
            <input
              required
              type="email"
              placeholder="ornek@demlab.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full text-xs rounded-xl bg-[#190d07] border border-[#442616] text-[#f7ede2] px-3.5 py-2.5 focus:border-[#e59840] outline-none transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#d8c2ad] mb-1">
              Telefon Numarası *
            </label>
            <input
              required
              type="tel"
              placeholder="0532 000 00 00"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full text-xs rounded-xl bg-[#190d07] border border-[#442616] text-[#f7ede2] px-3.5 py-2.5 focus:border-[#e59840] outline-none transition"
            />
          </div>
        </div>

        {/* Ürün & Miktar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-[#d8c2ad] mb-1">
              Talep Edilen Ürün *
            </label>
            <select
              value={formData.productName}
              onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
              className="w-full text-xs rounded-xl bg-[#190d07] border border-[#442616] text-[#f7ede2] px-3.5 py-2.5 focus:border-[#e59840] outline-none transition"
            >
              {products.map((p) => (
                <option key={p.slug} value={p.name} className="bg-[#190d07] text-[#f7ede2]">
                  {p.name} ({p.category})
                </option>
              ))}
              <option value="Ozel-Formulasyon-Cozelti" className="bg-[#190d07] text-[#f7ede2]">
                Özel Meşe Fıçılama & Fermantasyon Reçetesi
              </option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#d8c2ad] mb-1">
              Hedef Miktar & Ambalaj *
            </label>
            <input
              required
              type="text"
              placeholder="Örn: 2 Adet 5L Bidon"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              className="w-full text-xs rounded-xl bg-[#190d07] border border-[#442616] text-[#f7ede2] px-3.5 py-2.5 focus:border-[#e59840] outline-none transition"
            />
          </div>
        </div>

        {/* Sevkiyat İli ve Notlar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#d8c2ad] mb-1">
              Teslimat Şehri / İlçe *
            </label>
            <input
              required
              type="text"
              placeholder="Örn: İstanbul / Kadıköy"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full text-xs rounded-xl bg-[#190d07] border border-[#442616] text-[#f7ede2] px-3.5 py-2.5 focus:border-[#e59840] outline-none transition"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-[#d8c2ad] mb-1">
              Fermantasyon Notları / Özel İstekler
            </label>
            <input
              type="text"
              placeholder="Örn: Meşe fıçı maserasyonunda kullanılacak..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full text-xs rounded-xl bg-[#190d07] border border-[#442616] text-[#f7ede2] px-3.5 py-2.5 focus:border-[#e59840] outline-none transition"
            />
          </div>
        </div>

        {/* KVKK Onay */}
        <div className="pt-2">
          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              required
              type="checkbox"
              checked={formData.kvkkConsent}
              onChange={(e) => setFormData({ ...formData, kvkkConsent: e.target.checked })}
              className="mt-1 rounded border-[#442616] bg-[#190d07] text-[#e59840] focus:ring-[#e59840]"
            />
            <span className="text-xs text-[#b89b83] leading-normal">
              <a href="/privacy" target="_blank" className="text-[#f3bd68] underline font-medium">KVKK Aydınlatma Metni</a>{" "}
              kapsamında teklif hazırlığı ve teknik bilgilendirme amacıyla iletişim bilgilerimin işlenmesini onaylıyorum.
            </span>
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="w-full inline-flex items-center justify-center gap-2 btn-amber font-bold py-3.5 px-6 rounded-xl shadow-lg transition active:scale-[0.99] text-sm"
      >
        <Send className="w-4 h-4" />
        <span>Fermantasyon Teklif Talebini İlet</span>
      </button>
    </form>
  );
}
