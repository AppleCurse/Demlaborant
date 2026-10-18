import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { CheckCircle2, Truck, Package, Phone, FileText, ArrowRight, Sparkles } from "lucide-react";
import { Suspense } from "react";

function OrderSuccessContent() {
  const { orderNo = "", total = "0" } = Route.useSearch();

  return (
    <div className="max-w-2xl mx-auto oak-card rounded-3xl p-8 sm:p-12 text-center space-y-6">
      <div className="w-20 h-20 bg-[#e59840]/20 text-[#f3bd68] rounded-full flex items-center justify-center mx-auto border border-[#e59840]/40 shadow-inner">
        <CheckCircle2 className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-[#e59840]">
          Siparişiniz Başarıyla Alındı
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#fff5ea] font-serif">
          DEMLAB Fermantasyon Sevkiyatı Hazırlanıyor
        </h1>
        <p className="text-xs sm:text-sm text-[#d8c2ad] max-w-md mx-auto leading-relaxed">
          Siparişiniz atölyemize düştü. Ürünleriniz parti numarası ve analiz sertifikalarıyla (CoA) birlikte özel mühürlü ambalajında kargolanıyor.
        </p>
      </div>

      {/* Sipariş Özeti Kutusu */}
      <div className="bg-[#180d07] border border-[#3e2315] rounded-2xl p-5 text-xs text-left space-y-3">
        <div className="flex justify-between items-center border-b border-[#2d180d] pb-2">
          <span className="text-[#a98f7b]">Sipariş Referans No:</span>
          <span className="font-mono font-bold text-[#f3bd68] text-sm">{orderNo}</span>
        </div>
        <div className="flex justify-between items-center border-b border-[#2d180d] pb-2">
          <span className="text-[#a98f7b]">Tahmini Teslimat:</span>
          <span className="font-bold text-[#f0ded0]">1 - 2 İş Günü (Mühürlü Teslim)</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[#a98f7b]">Toplam Tutar:</span>
          <span className="font-bold text-[#f3bd68] text-base font-mono">
            {Number(total).toLocaleString("tr-TR")} ₺
          </span>
        </div>
      </div>

      {/* Adımlar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
        <div className="p-3.5 bg-[#1a0e08] rounded-xl border border-[#3e2315] space-y-1">
          <div className="text-[#e59840] font-bold text-xs flex items-center gap-1">
            <Package className="w-3.5 h-3.5" />
            <span>1. Mühürleme</span>
          </div>
          <p className="text-[11px] text-[#baa08a]">Emniyet kapağı ve lot sertifikaları kolileniyor.</p>
        </div>

        <div className="p-3.5 bg-[#1a0e08] rounded-xl border border-[#3e2315] space-y-1">
          <div className="text-[#e59840] font-bold text-xs flex items-center gap-1">
            <Truck className="w-3.5 h-3.5" />
            <span>2. Sevkiyat</span>
          </div>
          <p className="text-[11px] text-[#baa08a]">Korumalı kargo ile adresinize yola çıkıyor.</p>
        </div>

        <div className="p-3.5 bg-[#1a0e08] rounded-xl border border-[#3e2315] space-y-1">
          <div className="text-[#e59840] font-bold text-xs flex items-center gap-1">
            <FileText className="w-3.5 h-3.5" />
            <span>3. Kapıda Ödeme</span>
          </div>
          <p className="text-[11px] text-[#baa08a]">Sipariş tutarını teslimat sırasında seçtiğiniz yöntemle kuryeye ödeyin.</p>
        </div>
      </div>

      <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          to="/products"
          className="inline-flex items-center justify-center gap-2 btn-amber font-bold text-xs px-6 py-3 rounded-xl transition"
        >
          <span>Kataloğa Dön</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          to="/"
          className="inline-flex items-center justify-center bg-[#25140b] hover:bg-[#341d10] text-[#f5dfce] border border-[#e59840]/30 font-bold text-xs px-6 py-3 rounded-xl transition"
        >
          Ana Sayfa
        </Link>
      </div>
    </div>
  );
}

function OrderSuccessPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12 sm:py-20">
      <Suspense fallback={<div className="text-center py-20 text-[#e59840]">Yükleniyor...</div>}>
        <OrderSuccessContent />
      </Suspense>
    </main>
  );
}

export const Route = createFileRoute("/order-success")({
  validateSearch: (s: Record<string, unknown>) => ({ orderNo: typeof s['orderNo'] === "string" ? s['orderNo'] : undefined, total: s['total'] != null ? String(s['total']) : undefined }),
  head: () => ({ meta: [] }),
  component: OrderSuccessPage,
});
