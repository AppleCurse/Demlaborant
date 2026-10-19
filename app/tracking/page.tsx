"use client";

import { useState } from "react";
import { Search, Truck, Package, Clock, CheckCircle2, AlertCircle, MapPin, Sparkles } from "lucide-react";

export default function TrackingPage() {
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);

  const mockResult = {
    orderNo: query.toUpperCase() || "DLM-849201",
    status: "Yolda - Mühürlü Sevkiyat",
    date: "Bugün",
    estimatedDelivery: "Bugün 16:30'a kadar",
    carrier: "DEMLAB Özel Lojistik Getirim Aracı (34 DLM 92)",
    address: "Kadıköy Zanaat Vadisi -> Alıcı Adresi",
    items: [
      { name: "%96 Laboratuvar Çözeltisi (Özel Fermantasyon Tipi)", size: "20 L HDPE Bidon", qty: 1 },
      { name: "Propilen Glikol (USP / Farma Derece)", size: "5 L Bidon", qty: 1 }
    ],
    timeline: [
      { title: "Sipariş Onaylandı & Fatura Düzenlendi", time: "09:15", done: true },
      { title: "Atölyede Hazırlandı, Lot Güvenlik Mührü & Analiz Sertifikası (CoA) Eklendi", time: "10:30", done: true },
      { title: "Sevkiyat Aracına Yüklendi", time: "11:45", done: true },
      { title: "Mühürlü Teslimat İçin Yolda", time: "13:30", active: true },
      { title: "Adrese Teslim Edildi", time: "Tahmini 16:30", done: false }
    ]
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query) {
      setSearched(true);
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-8 py-10 sm:py-16 space-y-10">
      <div className="text-center max-w-xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#e59840]">
          DEMLAB Lojistik Portalı
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#fff5ea] font-serif">
          Canlı Kargo & Getirim Takibi
        </h1>
        <p className="text-xs sm:text-sm text-[#c6ad97]">
          Sipariş onayınızda iletilen <strong className="text-[#f3bd68]">DLM-XXXXXX</strong> kodunu veya telefon numaranızı girerek fermantasyon sevkiyatınızın anlık konumunu sorgulayın.
        </p>
      </div>

      {/* Arama Formu */}
      <form onSubmit={handleSearch} className="max-w-md mx-auto flex gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#8f7561] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            required
            placeholder="Örn: DLM-982144 veya 0532..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-xs pl-10 pr-4 py-3 rounded-xl border border-[#442616] bg-[#180d07] text-[#f7ede2] outline-none focus:border-[#e59840]"
          />
        </div>
        <button
          type="submit"
          className="btn-amber text-xs font-bold px-5 py-3 rounded-xl transition shadow"
        >
          Sorgula
        </button>
      </form>

      {/* Sonuç Kartı */}
      {searched && (
        <div className="oak-card rounded-3xl p-6 sm:p-8 space-y-8 animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-[#3e2315]">
            <div>
              <span className="text-[11px] font-bold text-[#e59840] uppercase tracking-wider">
                Sipariş No: {mockResult.orderNo}
              </span>
              <h2 className="text-xl font-bold text-[#fef5ec] font-serif mt-0.5">
                {mockResult.status}
              </h2>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[10px] text-[#a98f7b] block">Tahmini Teslimat:</span>
              <span className="text-xs font-bold text-[#f3bd68]">
                {mockResult.estimatedDelivery}
              </span>
            </div>
          </div>

          {/* Sevkiyat Detayları */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 bg-[#180d07] rounded-xl border border-[#3e2315] space-y-1">
              <span className="text-[#967d6a] block">Taşıyıcı & Araç:</span>
              <span className="font-semibold text-[#f0ded0]">{mockResult.carrier}</span>
            </div>
            <div className="p-3.5 bg-[#180d07] rounded-xl border border-[#3e2315] space-y-1">
              <span className="text-[#967d6a] block">Güzergah:</span>
              <span className="font-semibold text-[#f0ded0]">{mockResult.address}</span>
            </div>
          </div>

          {/* Adımlar Zaman Çizelgesi */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#fef5ec] font-serif">Sevkiyat Aşamaları</h3>
            <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#3e2315]">
              {mockResult.timeline.map((step, i) => (
                <div key={i} className="relative flex items-start gap-4">
                  <div
                    className={`absolute -left-6 top-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                      step.done
                        ? "bg-[#e59840] text-black font-bold"
                        : step.active
                        ? "bg-[#d8892f] text-white ring-4 ring-[#e59840]/20 animate-pulse font-bold"
                        : "bg-[#28150c] text-[#8e7460] border border-[#3e2315]"
                    }`}
                  >
                    {step.done ? "✓" : i + 1}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#f0ded0]">{step.title}</div>
                    <div className="text-[11px] text-[#a98f7b]">{step.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* İçerik */}
          <div className="pt-4 border-t border-[#3e2315]">
            <h4 className="text-xs font-bold text-[#c6ad97] uppercase mb-2">Paket İçeriği:</h4>
            <div className="space-y-1 text-xs text-[#f0ded0]">
              {mockResult.items.map((it, idx) => (
                <div key={idx} className="flex justify-between">
                  <span>{it.name} ({it.size})</span>
                  <span className="font-bold text-[#f3bd68]">{it.qty} Adet</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
