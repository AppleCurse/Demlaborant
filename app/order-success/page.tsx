"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, CheckCircle2, FileText, Package, Truck } from "lucide-react";

type SavedOrder = {
  orderNo: string;
  status: string;
  grandTotal: number;
  itemCount: number;
};

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderNo = searchParams.get("orderNo") ?? "";
  const [order, setOrder] = useState<SavedOrder | null>(null);
  const trackedOrder = useRef("");

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        const saved = JSON.parse(sessionStorage.getItem("demlab_last_order") ?? "null") as SavedOrder | null;
        if (saved?.orderNo === orderNo) setOrder(saved);
      } catch {
        setOrder(null);
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [orderNo]);

  useEffect(() => {
    if (!order || trackedOrder.current === order.orderNo) return;
    trackedOrder.current = order.orderNo;
    track("purchase", { order_no: order.orderNo, value: order.grandTotal, item_count: order.itemCount });
  }, [order]);

  if (!orderNo) {
    return (
      <div className="oak-card rounded-3xl p-8 text-center space-y-4">
        <h1 className="text-xl font-bold text-[#fef5ec] font-serif">Sipariş özeti bulunamadı</h1>
        <p className="text-xs text-[#c6ad97]">Geçerli bir sipariş bağlantısı kullanın veya sipariş takip sayfasından sorgulama yapın.</p>
        <Link href="/tracking" className="inline-block btn-amber text-xs font-bold px-5 py-2.5 rounded-xl">Sipariş Takibine Git</Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto oak-card rounded-3xl p-8 sm:p-12 text-center space-y-6">
      <div className="w-20 h-20 bg-[#e59840]/20 text-[#f3bd68] rounded-full flex items-center justify-center mx-auto border border-[#e59840]/40">
        <CheckCircle2 className="w-10 h-10" />
      </div>
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-[#e59840]">Sipariş Kaydınız Oluşturuldu</span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#fff5ea] font-serif">DEMLAB Siparişiniz Alındı</h1>
        <p className="text-xs sm:text-sm text-[#d8c2ad] max-w-md mx-auto leading-relaxed">
          Sipariş numaranızı saklayın. Operasyon ekibimiz teslimat ve ödeme detayları için sizinle iletişime geçecek.
        </p>
      </div>
      <div className="bg-[#180d07] border border-[#3e2315] rounded-2xl p-5 text-xs text-left space-y-3">
        <div className="flex justify-between gap-4 border-b border-[#2d180d] pb-2"><span className="text-[#a98f7b]">Sipariş Referans No:</span><span className="font-mono font-bold text-[#f3bd68] text-sm">{orderNo}</span></div>
        <div className="flex justify-between gap-4 border-b border-[#2d180d] pb-2"><span className="text-[#a98f7b]">Durum:</span><span className="font-bold text-[#f0ded0]">{order?.status ?? "Sipariş takip sayfasından sorgulayın"}</span></div>
        {order && <div className="flex justify-between gap-4"><span className="text-[#a98f7b]">Toplam Tutar:</span><span className="font-bold text-[#f3bd68] text-base font-mono">{order.grandTotal.toLocaleString("tr-TR")} ₺</span></div>}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
        <div className="p-3.5 bg-[#1a0e08] rounded-xl border border-[#3e2315] space-y-1"><Package className="w-4 h-4 text-[#e59840]" /><h2 className="font-bold text-xs">1. Kontrol</h2><p className="text-[11px] text-[#baa08a]">Sipariş ve stok bilgileri kontrol edilir.</p></div>
        <div className="p-3.5 bg-[#1a0e08] rounded-xl border border-[#3e2315] space-y-1"><Truck className="w-4 h-4 text-[#e59840]" /><h2 className="font-bold text-xs">2. Sevkiyat</h2><p className="text-[11px] text-[#baa08a]">Teslimat planı için sizinle iletişime geçilir.</p></div>
        <div className="p-3.5 bg-[#1a0e08] rounded-xl border border-[#3e2315] space-y-1"><FileText className="w-4 h-4 text-[#e59840]" /><h2 className="font-bold text-xs">3. Belgeler</h2><p className="text-[11px] text-[#baa08a]">Sevkiyat belgeleri siparişle birlikte hazırlanır.</p></div>
      </div>
      <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/tracking" className="inline-flex items-center justify-center gap-2 btn-amber font-bold text-xs px-6 py-3 rounded-xl">Siparişi Takip Et <ArrowRight className="w-3.5 h-3.5" /></Link>
        <Link href="/products" className="inline-flex items-center justify-center bg-[#25140b] text-[#f5dfce] border border-[#e59840]/30 font-bold text-xs px-6 py-3 rounded-xl">Kataloğa Dön</Link>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12 sm:py-20">
      <Suspense fallback={<div className="text-center py-20 text-[#e59840]">Yükleniyor...</div>}><OrderSuccessContent /></Suspense>
    </main>
  );
}
