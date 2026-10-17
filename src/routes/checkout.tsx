import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useCart } from "@/demlab/context/CartContext";
import { useNavigate } from "@tanstack/react-router";
import { createOrder } from "@/demlab/api.functions";
import {
  CreditCard,
  Building2,
  Truck,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  PackageCheck,
  User,
  Phone,
  Mail,
  MapPin,
  Sparkles
} from "lucide-react";
import { Link } from "@tanstack/react-router";

function CheckoutPage() {
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState("");
  const { items, subtotal, vatAmount, shippingFee, grandTotal, clearCart } = useCart();

  const [paymentMethod, setPaymentMethod] = useState<"card" | "transfer" | "corporate">("card");
  const [invoiceType, setInvoiceType] = useState<"corporate" | "individual">("individual");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    cardNumber: "",
    cardExp: "",
    cardCvc: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    try {
      const res = await createOrder({
        data: {
          items: items.map((i) => ({ name: i.name, size: i.size, price: i.price, quantity: i.quantity })),
          total: grandTotal,
          fullName: form.fullName,
          phone: form.phone,
          email: form.email,
          city: form.city,
          district: form.district,
          address: form.address,
          deliveryType: "cargo",
          paymentType: paymentMethod,
          notes: [form.deliveryNotes, invoiceType === "corporate" ? `Fatura: ${form.companyName} / ${form.taxOffice} / ${form.taxNumber}` : ""].filter(Boolean).join(" | "),
        },
      });
      clearCart();
      navigate({ to: "/order-success", search: { orderNo: res.orderNo, total: String(grandTotal) } });
    } catch {
      setSubmitError("Sipariş kaydedilemedi. Lütfen bilgileri kontrol edip tekrar deneyin.");
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
          Adresinize sipariş vermek ve teslimat planlamak için lütfen önce fermantasyon kataloğumuzdan ürün seçiniz.
        </p>
        <div>
          <Link
            to="/products"
            className="inline-block btn-amber text-xs font-bold px-5 py-2.5 rounded-xl transition"
          >
            Fermantasyon Kataloğuna Git
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-16 space-y-8">
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-[#e59840]">
          DEMLAB Sipariş & Sevkiyat
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#fff5ea] font-serif mt-1">
          Mühürlü Ambalajında Adrese Teslimat
        </h1>
        <p className="text-xs sm:text-sm text-[#c6ad97] mt-1">
          Fermantasyon çözeltileriniz orijinal emniyet mühürlü bidonlarında, analiz sertifikasıyla adresinize ulaştırılır.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sol Alan */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Teslimat Adresi */}
          <section className="oak-card rounded-3xl p-6 sm:p-8 space-y-4">
            <h2 className="text-base font-bold text-[#fef5ec] font-serif flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#e59840]" />
              <span>1. Teslimat & İletişim Bilgileri</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#d8c2ad] mb-1">Teslim Alacak Kişi *</label>
                <input
                  required
                  type="text"
                  placeholder="Ad Soyad"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  className="w-full text-xs rounded-xl bg-[#180d07] border border-[#442616] text-[#f7ede2] p-3 outline-none focus:border-[#e59840]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#d8c2ad] mb-1">Telefon Numarası *</label>
                <input
                  required
                  type="tel"
                  placeholder="0532 000 00 00"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full text-xs rounded-xl bg-[#180d07] border border-[#442616] text-[#f7ede2] p-3 outline-none focus:border-[#e59840]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#d8c2ad] mb-1">E-Posta (Sipariş & Fatura Bilgisi) *</label>
              <input
                required
                type="email"
                placeholder="adiniz@adres.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full text-xs rounded-xl bg-[#180d07] border border-[#442616] text-[#f7ede2] p-3 outline-none focus:border-[#e59840]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#d8c2ad] mb-1">İl *</label>
                <input
                  required
                  type="text"
                  placeholder="İstanbul, Ankara, İzmir..."
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="w-full text-xs rounded-xl bg-[#180d07] border border-[#442616] text-[#f7ede2] p-3 outline-none focus:border-[#e59840]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#d8c2ad] mb-1">İlçe *</label>
                <input
                  required
                  type="text"
                  placeholder="Kadıköy, vb."
                  value={form.district}
                  onChange={(e) => setForm({ ...form, district: e.target.value })}
                  className="w-full text-xs rounded-xl bg-[#180d07] border border-[#442616] text-[#f7ede2] p-3 outline-none focus:border-[#e59840]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#d8c2ad] mb-1">Açık Adres (Cadde, No, Daire/Atölye) *</label>
              <textarea
                required
                rows={2}
                placeholder="Meşe Caddesi No: 12..."
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full text-xs rounded-xl bg-[#180d07] border border-[#442616] text-[#f7ede2] p-3 outline-none focus:border-[#e59840]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#d8c2ad] mb-1">Kurye / Sevkiyat Notu (Opsiyonel)</label>
              <input
                type="text"
                placeholder="Örn: Kapıda güvenlik mevcuttur."
                value={form.deliveryNotes}
                onChange={(e) => setForm({ ...form, deliveryNotes: e.target.value })}
                className="w-full text-xs rounded-xl bg-[#180d07] border border-[#442616] text-[#f7ede2] p-3 outline-none focus:border-[#e59840]"
              />
            </div>
          </section>

          {/* 2. Fatura Tercihi */}
          <section className="oak-card rounded-3xl p-6 sm:p-8 space-y-4">
            <h2 className="text-base font-bold text-[#fef5ec] font-serif flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#e59840]" />
              <span>2. Fatura Tercihi</span>
            </h2>

            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer text-[#e0cbba]">
                <input
                  type="radio"
                  name="invoice"
                  checked={invoiceType === "individual"}
                  onChange={() => setInvoiceType("individual")}
                  className="accent-[#e59840]"
                />
                <span>Bireysel / Şahıs</span>
              </label>

              <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer text-[#e0cbba]">
                <input
                  type="radio"
                  name="invoice"
                  checked={invoiceType === "corporate"}
                  onChange={() => setInvoiceType("corporate")}
                  className="accent-[#e59840]"
                />
                <span>Kurumsal (Firma E-Faturası)</span>
              </label>
            </div>

            {invoiceType === "corporate" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#d8c2ad] mb-1">Şirket Resmi Unvanı *</label>
                  <input
                    required
                    type="text"
                    placeholder="DEMLAB Zanaat Ltd. Şti."
                    value={form.companyName}
                    onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                    className="w-full text-xs rounded-xl bg-[#180d07] border border-[#442616] text-[#f7ede2] p-3 outline-none focus:border-[#e59840]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#d8c2ad] mb-1">Vergi Dairesi *</label>
                  <input
                    required
                    type="text"
                    placeholder="Kadıköy VD"
                    value={form.taxOffice}
                    onChange={(e) => setForm({ ...form, taxOffice: e.target.value })}
                    className="w-full text-xs rounded-xl bg-[#180d07] border border-[#442616] text-[#f7ede2] p-3 outline-none focus:border-[#e59840]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#d8c2ad] mb-1">Vergi Numarası (VKN) *</label>
                  <input
                    required
                    type="text"
                    placeholder="10 Haneli VKN"
                    value={form.taxNumber}
                    onChange={(e) => setForm({ ...form, taxNumber: e.target.value })}
                    className="w-full text-xs rounded-xl bg-[#180d07] border border-[#442616] text-[#f7ede2] p-3 outline-none focus:border-[#e59840]"
                  />
                </div>
              </div>
            )}
          </section>

          {/* 3. Ödeme Yöntemi */}
          <section className="oak-card rounded-3xl p-6 sm:p-8 space-y-4">
            <h2 className="text-base font-bold text-[#fef5ec] font-serif flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-[#e59840]" />
              <span>3. Ödeme Yöntemi Seçimi</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod("card")}
                className={`p-4 rounded-xl border text-left transition ${
                  paymentMethod === "card"
                    ? "border-[#e59840] bg-[#e59840]/15 ring-1 ring-[#e59840]"
                    : "border-[#3e2315] bg-[#180d07] hover:border-[#5a341e]"
                }`}
              >
                <div className="font-bold text-xs text-[#fef5ec] font-serif">Kredi / Banka Kartı</div>
                <div className="text-[11px] text-[#baa08a] mt-1">3D Secure ile Güvenli Onay</div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("transfer")}
                className={`p-4 rounded-xl border text-left transition ${
                  paymentMethod === "transfer"
                    ? "border-[#e59840] bg-[#e59840]/15 ring-1 ring-[#e59840]"
                    : "border-[#3e2315] bg-[#180d07] hover:border-[#5a341e]"
                }`}
              >
                <div className="font-bold text-xs text-[#fef5ec] font-serif">Havale / EFT</div>
                <div className="text-[11px] text-[#f3bd68] font-bold mt-1">%3 Ek İndirim</div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("corporate")}
                className={`p-4 rounded-xl border text-left transition ${
                  paymentMethod === "corporate"
                    ? "border-[#e59840] bg-[#e59840]/15 ring-1 ring-[#e59840]"
                    : "border-[#3e2315] bg-[#180d07] hover:border-[#5a341e]"
                }`}
              >
                <div className="font-bold text-xs text-[#fef5ec] font-serif">Cari / Özel Teklif</div>
                <div className="text-[11px] text-[#baa08a] mt-1">Atölyelere Özel Düzen</div>
              </button>
            </div>

            {paymentMethod === "card" && (
              <div className="pt-2 space-y-4 bg-[#180d07] p-4 rounded-xl border border-[#3e2315]">
                <div>
                  <label className="block text-xs font-semibold text-[#d8c2ad] mb-1">Kart Numarası *</label>
                  <input
                    type="text"
                    placeholder="0000 0000 0000 0000"
                    value={form.cardNumber}
                    onChange={(e) => setForm({ ...form, cardNumber: e.target.value })}
                    className="w-full text-xs rounded-lg border border-[#442616] p-2.5 bg-[#120804] text-[#f7ede2]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#d8c2ad] mb-1">Son Kullanma (AA/YY) *</label>
                    <input
                      type="text"
                      placeholder="12/28"
                      value={form.cardExp}
                      onChange={(e) => setForm({ ...form, cardExp: e.target.value })}
                      className="w-full text-xs rounded-lg border border-[#442616] p-2.5 bg-[#120804] text-[#f7ede2]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#d8c2ad] mb-1">CVV / Güvenlik Kodu *</label>
                    <input
                      type="text"
                      placeholder="123"
                      value={form.cardCvc}
                      onChange={(e) => setForm({ ...form, cardCvc: e.target.value })}
                      className="w-full text-xs rounded-lg border border-[#442616] p-2.5 bg-[#120804] text-[#f7ede2]"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === "transfer" && (
              <div className="p-4 bg-[#1e1109] rounded-xl border border-[#e59840]/30 text-xs text-[#ffd79a] space-y-1">
                <strong>Garanti BBVA / İş Bankası Kurumsal IBAN</strong>
                <p>Sipariş onayınızın ardından sipariş numaranızı açıklama kısmına ekleyerek ödemeyi tamamlayabilirsiniz. Dekontunuz onaylandığında sevkiyat başlatılır.</p>
              </div>
            )}
          </section>
        </div>

        {/* Sağ Alan */}
        <div className="lg:col-span-5 sticky top-24 space-y-4">
          <div className="oak-card rounded-3xl p-6 sm:p-8 space-y-6">
            <h2 className="text-base font-bold text-[#fef5ec] font-serif flex items-center justify-between">
              <span>Sipariş Özeti</span>
              <span className="text-xs text-[#baa08a] font-normal">({items.length} Kalem Ürün)</span>
            </h2>

            {/* Ürün Listesi */}
            <div className="divide-y divide-[#3e2315] max-h-64 overflow-y-auto space-y-3 pr-1">
              {items.map((item) => (
                <div key={item.id} className="pt-3 first:pt-0 flex justify-between items-start text-xs">
                  <div>
                    <div className="font-bold text-[#fef5ec] font-serif">{item.name}</div>
                    <div className="text-[#a88e79] text-[11px] mt-0.5">
                      {item.size} • <strong className="text-[#f3bd68]">{item.quantity} Adet</strong>
                    </div>
                  </div>
                  <div className="font-bold text-[#f3bd68]">
                    {(item.price * item.quantity).toLocaleString("tr-TR")} ₺
                  </div>
                </div>
              ))}
            </div>

            {/* Fiyatlar */}
            <div className="pt-4 border-t border-[#3e2315] space-y-2 text-xs text-[#c6ad97]">
              <div className="flex justify-between">
                <span>Ara Toplam</span>
                <span className="font-semibold text-[#f7ede2]">{subtotal.toLocaleString("tr-TR")} ₺</span>
              </div>
              <div className="flex justify-between">
                <span>Hesaplanan KDV (%20)</span>
                <span>{vatAmount.toLocaleString("tr-TR")} ₺</span>
              </div>
              <div className="flex justify-between">
                <span>Mühürlü Ambalaj Getirimi</span>
                <span className={shippingFee === 0 ? "text-[#f3bd68] font-bold" : ""}>
                  {shippingFee === 0 ? "ÜCRETSİZ" : `${shippingFee} ₺`}
                </span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-[#fef5ec] pt-2 border-t border-[#3e2315]">
                <span>Genel Toplam</span>
                <span className="text-[#f3bd68] text-xl font-black">{grandTotal.toLocaleString("tr-TR")} ₺</span>
              </div>
            </div>

            {submitError && <p className="text-xs text-red-400">{submitError}</p>}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 btn-amber disabled:opacity-50 font-bold py-3.5 px-6 rounded-xl shadow-lg transition text-sm active:scale-[0.99]"
            >
              <PackageCheck className="w-5 h-5" />
              <span>{isSubmitting ? "Sipariş Hazırlanıyor..." : "Siparişi Onayla & Kapıma Getir"}</span>
            </button>

            <div className="text-[11px] text-[#8e7460] space-y-1.5 pt-2 border-t border-[#3e2315]">
              <div className="flex items-center gap-1.5 text-[#e59840]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Orijinal analiz sertifikası (CoA) koli içinde teslim edilir.</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#baa08a]">
                <Truck className="w-3.5 h-3.5 text-[#e59840]" />
                <span>Mühürlü emniyet kapaklı bidonlarda adrese teslim.</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [] }),
  component: CheckoutPage,
});
