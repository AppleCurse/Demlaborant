import { products } from "@/data/products";
import { FileText, Download, ShieldCheck, Search, Sparkles } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Teknik Belgeler & Analiz Sertifikaları (CoA / TDS / SDS) | DEMLAB",
  description: "Özel fermantasyon çözeltileri ve laboratuvar kimyasalları için resmi Analiz Sertifikaları (CoA), Teknik Veri Formları (TDS) ve Güvenlik Bilgi Formları (SDS).",
};

export default function DocumentsPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-16 space-y-12">
      {/* Başlık */}
      <div className="max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-widest text-[#e59840]">
          DEMLAB Teknik Dokümantasyon
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#fff5ea] font-serif mt-1">
          Analiz Sertifikaları (CoA) & Güvenlik Formları (TDS / SDS)
        </h1>
        <p className="text-xs sm:text-sm text-[#c6ad97] mt-3 leading-relaxed">
          DEMLAB laboratuvarlarında gaz kromatografisi (GC) ve analitik saflık testlerinden geçirilmiş çözeltilerin güncel analiz raporları ve güvenlik veri sayfaları.
        </p>
      </div>

      {/* Bilgilendirme Kutusu */}
      <div className="oak-card rounded-2xl p-5 sm:p-6 flex items-start gap-4 text-xs text-[#d8c2ad] border border-[#e59840]/30">
        <ShieldCheck className="w-6 h-6 text-[#e59840] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="font-bold text-sm text-[#fff4ea] font-serif">Parti Bazlı Orijinal Analiz Sertifikası (CoA)</h4>
          <p className="leading-relaxed">
            Sipariş ettiğiniz her parti için düzenlenen orijinal analiz raporu faturanızla ve mühürlü bidon kolisinin içinde fiziki olarak iletilir.
          </p>
        </div>
      </div>

      {/* Doküman Listesi */}
      <div className="space-y-8">
        <h2 className="text-lg font-bold text-[#fef5ec] font-serif">Ürün Bazlı Doküman Kütüphanesi</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((product) => (
            <div
              key={product.slug}
              className="oak-card rounded-2xl p-6 transition hover:border-[#e59840]/50"
            >
              <div className="flex items-start justify-between gap-2 border-b border-[#3e2315] pb-4 mb-4">
                <div>
                  <span className="text-[11px] font-semibold text-[#f3bd68] bg-[#2c170d] px-2.5 py-0.5 rounded border border-[#e59840]/30">
                    {product.category}
                  </span>
                  <h3 className="text-base font-bold text-[#fef5ec] font-serif mt-2">
                    {product.name}
                  </h3>
                  {product.casNo && (
                    <span className="text-xs text-[#9a7f6b] font-mono mt-0.5 block">CAS: {product.casNo}</span>
                  )}
                </div>
              </div>

              {/* Dokümanlar */}
              <div className="space-y-2.5">
                {product.documents.map((doc, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-xl bg-[#180d07] border border-[#3e2315] hover:border-[#e59840]/40 transition text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-[#e59840]" />
                      <div>
                        <span className="font-semibold text-[#f0ded0]">{doc.title}</span>
                        <span className="text-[10px] text-[#8e7460] block">{doc.type} • {doc.size}</span>
                      </div>
                    </div>

                    <a
                      href={`/docs/${product.slug}-${doc.type.toLowerCase()}.pdf`}
                      download
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-[#f3bd68] bg-[#24140c] hover:bg-[#341d11] border border-[#e59840]/30 px-3 py-1.5 rounded-lg transition"
                    >
                      <Download className="w-3 h-3" />
                      <span>İndir</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
