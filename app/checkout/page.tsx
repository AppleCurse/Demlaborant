"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Building2, CheckCircle2, CreditCard, MapPin, PackageCheck, Truck } from "lucide-react";
import { useCart } from "@/context/CartContext";

type PaymentMethod = "door-card" | "door-cash" | "transfer" | "corporate";

const paymentOptions: { id: PaymentMethod; title: string; description: string }[] = [
  { id: "door-card", title: "Kapıda Kart", description: "Teslimat sırasında banka kartı veya kredi kartı" },
  { id: "door-cash", title: "Kapıda Nakit", description: "Teslimat sırasında nakit ödeme" },
  { id: "transfer", title: "Havale / EFT", description: "Ödeme onayından sonra sevkiyat" },
  { id: "corporate", title: "Cari / Kurumsal", description: "Firmanıza özel ödeme planı" },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, vatAmount, shippingFee, grandTotal, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("door-card");
  const [invoiceType, setInvoiceType] = useState<"corporate" | "individual">("individual");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "İstanbul",
    district: "",
    address: "",
    deliveryNotes: "",
    companyName: "",
    taxOffice: "",
    taxNumber: "",
  });

  const update = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          invoiceType,
          paymentType: paymentMethod,
          items: items.map((item) => ({
            slug: item.slug,
            size: item.size,
            quantity: item.quantity,
          })),
        }),
      });
      const result = (await response.json()) as {
        orderNo?: string;
        status?: string;
        grandTotal?: number;
        error?: string;
      };
      if (!response.ok || !result.orderNo) {
        throw new Error(result.error || "Sipariş oluşturulamadı.");
      }

      sessionStorage.setItem(
        "demlab_last_order",
        JSON.stringify({
          orderNo: result.orderNo,
          status: result.status,
          grandTotal: result.grandTotal,
          itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
        }),
      );
      clearCart();
      router.push(`/order-success?orderNo=${encodeURIComponent(result.orderNo)}`);
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Sipariş oluşturulamadı. Sepetiniz korundu.",
      );
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#24140c] text-[#e59840] border border-[#3e2315] flex items-center justify-center mx-auto">
          <Truck className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-[#fef5ec] font-serif">Sepetinizde Ürün Bulunmuyor</h1>
        <p className="text-xs text-[#baa08a] max-w-sm mx-auto">
          Sipariş oluşturmak için önce katalogdan ürün seçin.
        </p>
        <Link href="/products" className="inline-block btn-amber text-xs font-bold px-5 py-2.5 rounded-xl">
          Fermantasyon Kataloğuna Git
        </Link>
      </main>
    );
  }

  const inputClass = "w-full text-xs rounded-xl bg-[#180d07] border border-[#442616] text-[#f7ede2] p-3 outline-none focus:border-[#e59840]";
  const labelClass = "block text-xs font-semibold text-[#d8c2ad] mb-1";

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-16 space-y-8">
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-[#e59840]">DEMLAB Sipariş & Sevkiyat</span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#fff5ea] font-serif mt-1">Mühürlü Ambalajında Adrese Teslimat</h1>
        <p className="text-xs sm:text-sm text-[#c6ad97] mt-1">
          Teslimat ve ödeme tercihinizi seçin. Siparişiniz kaydedildikten sonra size özel takip numarası oluşturulur.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-6">
          <section className="oak-card rounded-3xl p-6 sm:p-8 space-y-4">
            <h2 className="text-base font-bold text-[#fef5ec] font-serif flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#e59840]" /> 1. Teslimat & İletişim Bilgileri
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="fullName" className={labelClass}>Teslim Alacak Kişi *</label>
                <input id="fullName" required minLength={3} autoComplete="name" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} className={inputClass} />
              </div>
              <div>
                <label htmlFor="phone" className={labelClass}>Telefon Numarası *</label>
                <input id="phone" required type="tel" minLength={10} autoComplete="tel" placeholder="0530 000 00 00" value={form.phone} onChange={(e) => update("phone", e.target.value)} className={inputClass} />
              </div>
            </div>
            <div>
              <label htmlFor="email" className={labelClass}>E-Posta *</label>
              <input id="email" required type="email" autoComplete="email" placeholder="adiniz@adres.com" value={form.email} onChange={(e) => update("email", e.target.value)} className={inputClass} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className={labelClass}>İl *</label>
                <input id="city" required autoComplete="address-level1" value={form.city} onChange={(e) => update("city", e.target.value)} className={inputClass} />
              </div>
              <div>
                <label htmlFor="district" className={labelClass}>İlçe *</label>
                <input id="district" required autoComplete="address-level2" value={form.district} onChange={(e) => update("district", e.target.value)} className={inputClass} />
              </div>
            </div>
            <div>
              <label htmlFor="address" className={labelClass}>Açık Adres *</label>
              <textarea id="address" required minLength={8} rows={3} autoComplete="street-address" value={form.address} onChange={(e) => update("address", e.target.value)} className={inputClass} />
            </div>
            <div>
              <label htmlFor="deliveryNotes" className={labelClass}>Sevkiyat Notu (Opsiyonel)</label>
              <input id="deliveryNotes" value={form.deliveryNotes} onChange={(e) => update("deliveryNotes", e.target.value)} className={inputClass} />
            </div>
          </section>

          <section className="oak-card rounded-3xl p-6 sm:p-8 space-y-4">
            <h2 className="text-base font-bold text-[#fef5ec] font-serif flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#e59840]" /> 2. Fatura Tercihi
            </h2>
            <div className="flex flex-wrap gap-4">
              {(["individual", "corporate"] as const).map((type) => (
                <label key={type} className="flex items-center gap-2 text-xs font-semibold cursor-pointer text-[#e0cbba]">
                  <input type="radio" name="invoice" checked={invoiceType === type} onChange={() => setInvoiceType(type)} className="accent-[#e59840]" />
                  {type === "individual" ? "Bireysel" : "Kurumsal"}
                </label>
              ))}
            </div>
            {invoiceType === "corporate" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="sm:col-span-2">
                  <label htmlFor="companyName" className={labelClass}>Şirket Resmi Unvanı *</label>
                  <input id="companyName" required value={form.companyName} onChange={(e) => update("companyName", e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label htmlFor="taxOffice" className={labelClass}>Vergi Dairesi *</label>
                  <input id="taxOffice" required value={form.taxOffice} onChange={(e) => update("taxOffice", e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label htmlFor="taxNumber" className={labelClass}>Vergi Numarası *</label>
                  <input id="taxNumber" required inputMode="numeric" pattern="[0-9]{10}" maxLength={10} value={form.taxNumber} onChange={(e) => update("taxNumber", e.target.value.replace(/\D/g, ""))} className={inputClass} />
                </div>
              </div>
            )}
          </section>

          <section className="oak-card rounded-3xl p-6 sm:p-8 space-y-4">
            <h2 className="text-base font-bold text-[#fef5ec] font-serif flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-[#e59840]" /> 3. Ödeme Yöntemi
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {paymentOptions.map((option) => (
                <button key={option.id} type="button" onClick={() => setPaymentMethod(option.id)} className={`p-4 rounded-xl border text-left transition ${paymentMethod === option.id ? "border-[#e59840] bg-[#e59840]/15 ring-1 ring-[#e59840]" : "border-[#3e2315] bg-[#180d07] hover:border-[#5a341e]"}`}>
                  <div className="font-bold text-xs text-[#fef5ec] font-serif">{option.title}</div>
                  <div className="text-[11px] text-[#baa08a] mt-1">{option.description}</div>
                </button>
              ))}
            </div>
            {paymentMethod === "transfer" && (
              <div className="p-4 bg-[#1e1109] rounded-xl border border-[#e59840]/30 text-xs text-[#ffd79a]">
                Sipariş kaydından sonra banka bilgileri satış ekibimiz tarafından iletilir. Sipariş, ödeme onayına kadar <strong>ÖDEME BEKLİYOR</strong> durumunda kalır.
              </div>
            )}
            {paymentMethod === "corporate" && (
              <div className="p-4 bg-[#1e1109] rounded-xl border border-[#e59840]/30 text-xs text-[#ffd79a]">
                Cari ödeme koşulları için satış ekibimiz sipariş sonrasında firmanızla iletişime geçer.
              </div>
            )}
          </section>
        </div>

        <div className="lg:col-span-5 sticky top-24 space-y-4">
          <div className="oak-card rounded-3xl p-6 sm:p-8 space-y-6">
            <h2 className="text-base font-bold text-[#fef5ec] font-serif flex items-center justify-between">
              Sipariş Özeti <span className="text-xs text-[#baa08a] font-normal">({items.length} Kalem)</span>
            </h2>
            <div className="divide-y divide-[#3e2315] max-h-64 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.id} className="py-3 first:pt-0 flex justify-between items-start gap-3 text-xs">
                  <div>
                    <div className="font-bold text-[#fef5ec] font-serif">{item.name}</div>
                    <div className="text-[#a88e79] text-[11px] mt-0.5">{item.size} • <strong className="text-[#f3bd68]">{item.quantity} Adet</strong></div>
                  </div>
                  <div className="font-bold text-[#f3bd68] whitespace-nowrap">{(item.price * item.quantity).toLocaleString("tr-TR")} ₺</div>
                </div>
              ))}
            </div>
            <div className="pt-4 border-t border-[#3e2315] space-y-2 text-xs text-[#c6ad97]">
              <div className="flex justify-between"><span>Ara Toplam</span><span>{subtotal.toLocaleString("tr-TR")} ₺</span></div>
              <div className="flex justify-between"><span>KDV (%20)</span><span>{vatAmount.toLocaleString("tr-TR")} ₺</span></div>
              <div className="flex justify-between"><span>Teslimat</span><span>{shippingFee === 0 ? "ÜCRETSİZ" : `${shippingFee} ₺`}</span></div>
              <div className="flex justify-between text-base font-extrabold text-[#fef5ec] pt-2 border-t border-[#3e2315]"><span>Genel Toplam</span><span className="text-[#f3bd68] text-xl">{grandTotal.toLocaleString("tr-TR")} ₺</span></div>
            </div>
            {error && <div role="alert" className="rounded-xl border border-red-500/40 bg-red-950/30 p-3 text-xs text-red-200">{error}</div>}
            <button type="submit" disabled={isSubmitting} className="w-full inline-flex items-center justify-center gap-2 btn-amber disabled:opacity-50 font-bold py-3.5 px-6 rounded-xl text-sm">
              <PackageCheck className="w-5 h-5" /> {isSubmitting ? "Sipariş Kaydediliyor..." : "Siparişi Kaydet"}
            </button>
            <div className="text-[11px] text-[#8e7460] space-y-1.5 pt-2 border-t border-[#3e2315]">
              <div className="flex items-center gap-1.5 text-[#e59840]"><CheckCircle2 className="w-3.5 h-3.5" /> Fiyatlar sunucuda güncel katalog üzerinden doğrulanır.</div>
              <div className="flex items-center gap-1.5 text-[#baa08a]"><Truck className="w-3.5 h-3.5 text-[#e59840]" /> Sipariş numaranız ve telefonunuzla takip edebilirsiniz.</div>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}
