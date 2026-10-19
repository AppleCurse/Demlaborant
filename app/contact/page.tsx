import InquiryForm from "@/components/InquiryForm";
import { companyInfo } from "@/data/company";
import { MapPin, Phone, Mail, Clock, ShieldCheck, Truck, Sparkles } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "İletişim & Atölye Siparişi | DEMLAB Zanaat & Fermantasyon Laboratuvarı",
  description: "%96 Zanaat çözeltisi, meşe fıçı ekstraksiyonu ve laboratuvar hammaddeleri sipariş ve teknik danışmanlık.",
};

export default function ContactPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-16 space-y-12">
      <div className="max-w-2xl">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-500 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          Zanaat & Fermantasyon Masası
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-amber-100 mt-1 amber-title">
          DEMLAB İletişim & Özel Çözelti Talebi
        </h1>
        <p className="text-xs sm:text-sm text-amber-200/70 mt-3 leading-relaxed">
          %96 saflıktaki özel fermantasyon ve maserasyon laboratuvar çözeltisi, meşe fıçı uyumlu ekstraksiyon çözümleri ve toptan sevkiyatlar için zanaat atölyemizle doğrudan iletişime geçebilirsiniz.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* İletişim Kanalları ve Şirket Künyesi */}
        <div className="lg:col-span-5 space-y-6">
          <div className="oak-card rounded-3xl p-6 sm:p-8 space-y-6">
            <h2 className="text-lg font-bold text-amber-200 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              Atölye & Laboratuvar Yerleşkesi
            </h2>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-amber-100">Atölye & Sevkiyat Adresi</div>
                  <div className="text-amber-200/70 mt-0.5 leading-relaxed">{companyInfo.address}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-amber-100">Doğrudan Sipariş & Danışma</div>
                  <a href={`tel:${companyInfo.phone}`} className="text-amber-400 font-medium hover:underline block mt-0.5">
                    {companyInfo.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-amber-100">Teknik & Sipariş E-Posta</div>
                  <a href={`mailto:${companyInfo.salesEmail}`} className="text-amber-400 font-medium hover:underline block mt-0.5">
                    {companyInfo.salesEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-amber-100">Atölye Çalışma Saatleri</div>
                  <div className="text-amber-200/70 mt-0.5">{companyInfo.workingHours}</div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-amber-900/40 text-[11px] text-amber-400/50 space-y-1">
              <div><strong className="text-amber-300/80">Kayıtlı Şirket:</strong> {companyInfo.name}</div>
              <div><strong className="text-amber-300/80">Vergi Dairesi & No:</strong> {companyInfo.taxOffice} - {companyInfo.taxNumber}</div>
              <div><strong className="text-amber-300/80">Mersis:</strong> {companyInfo.mersisNo}</div>
            </div>
          </div>

          {/* Gizli ve Güvenli Sevkiyat Notu */}
          <div className="oak-card rounded-3xl p-6 space-y-3 border-amber-500/30">
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs">
              <Truck className="w-4 h-4" />
              <span>Gizli & Korunaklı Özel Ambalaj</span>
            </div>
            <p className="text-xs text-amber-200/70 leading-relaxed">
              Tüm 5L, 10L ve 20L siparişleriniz çift katmanlı darbe emici kutularda, dışarıdan içeriği belli olmayacak gizli kargo standartlarında aynı gün yola çıkarılır.
            </p>
          </div>
        </div>

        {/* Teklif Formu */}
        <div className="lg:col-span-7">
          <InquiryForm />
        </div>
      </div>
    </main>
  );
}

