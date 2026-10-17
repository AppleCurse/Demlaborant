import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { trackOrder } from "@/demlab/api.functions";
import { Search, Truck, Package, Clock, CheckCircle2, AlertCircle, MapPin, Sparkles } from "lucide-react";

function TrackingPage() {
  const [query, setQuery] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [notFoundMsg, setNotFoundMsg] = useState("");
  const [result, setResult] = useState<Awaited<ReturnType<typeof trackOrder>>>(null);
  const searched = !!result;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setNotFoundMsg("");
    setResult(null);
    try {
      const r = await trackOrder({ data: { orderNo: query, phone } });
      if (!r) setNotFoundMsg("Bu sipariş numarası ve telefon ile eşleşen bir kayıt bulunamadı.");
      setResult(r);
    } catch {
      setNotFoundMsg("Sorgulama yapılamadı, lütfen bilgileri kontrol edin.");
    } finally {
      setLoading(false);
    }
  };

  const steps = ["SİPARİŞ ALINDI", "MÜHÜRLENİYOR", "KURYE BEKLİYOR", "YOLDA", "TESLİM EDİLDİ"];
  const current = Math.max(0, steps.indexOf(result?.status ?? ""));
  const mockResult = result && {
    orderNo: result.orderNo,
    status: result.status,
    estimatedDelivery: result.deliveryType === "courier" ? "Bugün (motokurye)" : "1-3 iş günü (kargo)",
    carrier: result.deliveryType === "courier" ? "DEMLAB İstanbul Motokurye" : "Anlaşmalı Mühürlü Kargo",
    address: `Kadıköy Zanaat Vadisi -> ${result.location || "Alıcı Adresi"}`,
    items: result.items.map((i) => ({ name: i.name, size: i.size, qty: i.quantity })),
    timeline: [
      "Sipariş Onaylandı & Fatura Düzenlendi",
      "Lot Güvenlik Mührü & Analiz Sertifikası (CoA) Eklendi",
      "Sevkiyat Aracına Yükleniyor",
      "Mühürlü Teslimat İçin Yolda",
      "Adrese Teslim Edildi",
    ].map((title, i) => ({
      title,
      time: i === 0 ? new Date(result.createdAt).toLocaleString("tr-TR") : "",
      done: i < Math.max(current, 1),
      active: i === Math.max(current, 1),
    })),
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
          Sipariş onayınızda iletilen <strong className="text-[#f3bd68]">DLM-XXXXXX</strong> kodunu ve telefon numaranızı girerek fermantasyon sevkiyatınızın anlık konumunu sorgulayın.
        </p>
      </div>

      {/* Arama Formu */}
      <form onSubmit={handleSearch} className="max-w-md mx-auto flex gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#8f7561] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            required
            placeholder="Sipariş No: DLM-982144"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-xs pl-10 pr-4 py-3 rounded-xl border border-[#442616] bg-[#180d07] text-[#f7ede2] outline-none focus:border-[#e59840]"
          />
        </div>
        <input
          type="tel"
          required
          placeholder="Telefon"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-36 text-xs px-4 py-3 rounded-xl border border-[#442616] bg-[#180d07] text-[#f7ede2] outline-none focus:border-[#e59840]"
        />
        <button
          type="submit"
          disabled={loading}
          className="btn-amber text-xs font-bold px-5 py-3 rounded-xl transition shadow"
        >
          Sorgula
        </button>
      </form>

      {/* Sonuç Kartı */}
      {notFoundMsg && <p className="text-center text-xs text-red-400">{notFoundMsg}</p>}
      {searched && mockResult && (
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

export const Route = createFileRoute("/tracking")({
  head: () => ({ meta: [] }),
  component: TrackingPage,
});
