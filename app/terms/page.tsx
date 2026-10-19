import { companyInfo } from "@/data/company";
import { Truck, RotateCcw, AlertTriangle, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Teslimat, İade ve Dağıtım Koşulları | DEMLAB",
  description: "DEMLAB %96 zanaat çözeltisi ve fermantasyon hammaddeleri için gizli kargo, teslimat ve iade prosedürleri.",
};

export default function TermsPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-8 py-10 sm:py-16 space-y-8">
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-amber-500">Zanaat & Sevkiyat Esasları</span>
        <h1 className="text-2xl sm:text-4xl font-black text-amber-100 mt-1 amber-title">
          Teslimat, İade ve Dağıtım Koşulları
        </h1>
        <p className="text-xs text-amber-200/60 mt-2">
          Zanaat çözeltileri, meşe fıçı ekstraktları ve laboratuvar hammaddeleri sevk esasları.
        </p>
      </div>

      <div className="oak-card rounded-3xl p-6 sm:p-10 space-y-8 text-xs sm:text-sm text-amber-100/80 leading-relaxed">
        {/* Teslimat ve Dağıtım */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
            <Truck className="w-5 h-5 text-amber-500" />
            <h2>1. Gizli Sevkiyat ve Hızlı Kargo</h2>
          </div>
          <p>
            Tüm ürün sevkiyatları İstanbul atölye ve laboratuvarımızdan gerçekleştirilmektedir:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-amber-200/70">
            <li><strong>Gizli ve Nötr Paketleme:</strong> 5L, 10L ve 20L çözelti ambalajları içerik belirtilmeyen çift oluklu korumalı kutularda sevk edilir.</li>
            <li><strong>Aynı Gün Çıkış:</strong> Saat 15:00&apos;e kadar verilen siparişler aynı iş günü kargoya teslim edilir.</li>
            <li><strong>Güvenli Ambalaj:</strong> Kimyasal dayanımlı HDPE bidonlar sızdırmaz indüksiyon folyo kapak ve kilitli emniyet halkası ile mühürlenir.</li>
          </ul>
        </section>

        {/* Hasar ve Kontrol */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <h2>2. Teslim Alma ve Hasar Güvencesi</h2>
          </div>
          <p>
            Taşıma esnasında herhangi bir darbe veya sızıntı tespit edilirse:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-amber-200/70">
            <li>Kargo görevlisine tutanak tutturarak durumu bize bildirmeniz halinde, DEMLAB derhal yeni parti ürünü sorgusuz sualsiz adresinize yönlendirir.</li>
            <li>Mühürlü güvenlik kapağı zarar görmemiş tüm ürünler DEMLAB saflık garantisi altındadır.</li>
          </ul>
        </section>

        {/* İade Koşulları */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
            <RotateCcw className="w-5 h-5 text-amber-500" />
            <h2>3. İade ve Değişim Esasları</h2>
          </div>
          <p>
            Laboratuvar kimyasallarının saflık ve kontaminasyon hassasiyeti nedeniyle:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-amber-200/70">
            <li>Açılmamış, orijinal kilitli mühürlü bidonlar teslim tarihinden itibaren 14 gün içinde iade edilebilir.</li>
            <li>Parti analiz raporu (CoA) değerlerinde belirtilen saflık standardına uygunsuzluk tespitinde koşulsuz iade ve değişim yapılır.</li>
            <li>İade ve teknik destek talepleri için doğrudan WhatsApp hattımızdan veya <a href={`mailto:${companyInfo.salesEmail}`} className="text-amber-400 hover:underline">{companyInfo.salesEmail}</a> adresinden ulaşabilirsiniz.</li>
          </ul>
        </section>
      </div>
    </main>
  );
}

