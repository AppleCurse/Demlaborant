"use client";

import { useState } from "react";
import Link from "next/link";
import { AlertCircle, CheckCircle2, Clock, MapPin, Package, Search, Truck } from "lucide-react";

type TrackingResult = {
  order: {
    orderNo: string;
    status: string;
    createdAt: string;
    city: string;
    district: string;
    deliveryType: "courier" | "cargo";
    paymentType: string;
    grandTotal: number;
  };
  items: { name: string; size: string; quantity: number; lineTotal: number }[];
};

const paymentLabels: Record<string, string> = {
  "door-card": "Kapıda kart",
  "door-cash": "Kapıda nakit",
  transfer: "Havale / EFT",
  corporate: "Cari / Kurumsal",
};

export default function TrackingPage() {
  const [orderNo, setOrderNo] = useState("");
  const [phone, setPhone] = useState("");
  const [result, setResult] = useState<TrackingResult | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const response = await fetch(
        `/api/orders?orderNo=${encodeURIComponent(orderNo)}&phone=${encodeURIComponent(phone)}`,
        { cache: "no-store" },
      );
      const data = (await response.json()) as TrackingResult & { error?: string };
      if (!response.ok) throw new Error(data.error || "Sipariş bulunamadı.");
      setResult(data);
    } catch (searchError) {
      setError(searchError instanceof Error ? searchError.message : "Sipariş sorgulanamadı.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-8 py-10 sm:py-16 space-y-10">
      <div className="text-center max-w-xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#e59840]">DEMLAB Lojistik Portalı</span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#fff5ea] font-serif">Sipariş & Sevkiyat Takibi</h1>
        <p className="text-xs sm:text-sm text-[#c6ad97]">
          Sipariş numaranızı ve sipariş sırasında verdiğiniz telefon numarasını birlikte girerek kaydınızı sorgulayın.
        </p>
      </div>

      <form onSubmit={handleSearch} className="oak-card rounded-2xl p-5 sm:p-6 max-w-2xl mx-auto space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label className="relative block">
            <span className="block text-xs text-[#c6ad97] mb-1">Sipariş numarası</span>
            <Package className="w-4 h-4 text-[#8f7561] absolute left-3.5 bottom-3" />
            <input required placeholder="DLM-123456" value={orderNo} onChange={(e) => setOrderNo(e.target.value.toUpperCase())} className="w-full text-xs pl-10 pr-4 py-3 rounded-xl border border-[#442616] bg-[#180d07] text-[#f7ede2] outline-none focus:border-[#e59840]" />
          </label>
          <label className="relative block">
            <span className="block text-xs text-[#c6ad97] mb-1">Telefon numarası</span>
            <Search className="w-4 h-4 text-[#8f7561] absolute left-3.5 bottom-3" />
            <input required type="tel" placeholder="0530 000 00 00" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full text-xs pl-10 pr-4 py-3 rounded-xl border border-[#442616] bg-[#180d07] text-[#f7ede2] outline-none focus:border-[#e59840]" />
          </label>
        </div>
        <button type="submit" disabled={loading} className="btn-amber disabled:opacity-50 w-full text-xs font-bold px-5 py-3 rounded-xl">
          {loading ? "Sorgulanıyor..." : "Siparişi Sorgula"}
        </button>
      </form>

      {error && (
        <div role="alert" className="max-w-2xl mx-auto flex items-start gap-3 rounded-2xl border border-red-500/40 bg-red-950/30 p-4 text-xs text-red-200">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <div>{error}<Link href="/contact" className="block mt-2 text-[#f3bd68] underline">Destek ekibine ulaşın</Link></div>
        </div>
      )}

      {result && (
        <section className="oak-card rounded-3xl p-6 sm:p-8 space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b border-[#3e2315]">
            <div>
              <span className="text-[11px] font-bold text-[#e59840] uppercase tracking-wider">Sipariş No: {result.order.orderNo}</span>
              <h2 className="text-xl font-bold text-[#fef5ec] font-serif mt-1 flex items-center gap-2">
                {result.order.status === "TESLİM EDİLDİ" ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <Truck className="w-5 h-5 text-[#e59840]" />}
                {result.order.status}
              </h2>
            </div>
            <div className="text-left sm:text-right text-xs text-[#c6ad97] space-y-1">
              <div className="flex items-center gap-1.5 sm:justify-end"><Clock className="w-3.5 h-3.5 text-[#e59840]" /> {new Date(result.order.createdAt).toLocaleString("tr-TR")}</div>
              <div className="flex items-center gap-1.5 sm:justify-end"><MapPin className="w-3.5 h-3.5 text-[#e59840]" /> {result.order.district} / {result.order.city}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-[#180d07] border border-[#3e2315] rounded-xl p-4"><span className="text-[#8e7460] block mb-1">Teslimat</span><strong className="text-[#f3bd68]">{result.order.deliveryType === "courier" ? "İstanbul motokurye" : "Kargo"}</strong></div>
            <div className="bg-[#180d07] border border-[#3e2315] rounded-xl p-4"><span className="text-[#8e7460] block mb-1">Ödeme</span><strong className="text-[#f3bd68]">{paymentLabels[result.order.paymentType] ?? result.order.paymentType}</strong></div>
            <div className="bg-[#180d07] border border-[#3e2315] rounded-xl p-4"><span className="text-[#8e7460] block mb-1">Toplam</span><strong className="text-[#f3bd68]">{result.order.grandTotal.toLocaleString("tr-TR")} ₺</strong></div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#fef5ec] font-serif mb-3">Sipariş İçeriği</h3>
            <div className="divide-y divide-[#3e2315] border-y border-[#3e2315]">
              {result.items.map((item, index) => (
                <div key={`${item.name}-${index}`} className="py-3 flex justify-between gap-4 text-xs">
                  <div><div className="text-[#f7ede2] font-semibold">{item.name}</div><div className="text-[#a98f7b] mt-1">{item.size} • {item.quantity} adet</div></div>
                  <div className="text-[#f3bd68] font-bold whitespace-nowrap">{item.lineTotal.toLocaleString("tr-TR")} ₺</div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-[11px] text-[#8e7460]">Durum bilgisi sipariş kaydındaki güncel operasyon durumunu gösterir. Teslimat planı için satış ekibimiz sizinle iletişime geçer.</p>
        </section>
      )}
    </main>
  );
}
