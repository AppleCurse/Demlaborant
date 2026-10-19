"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "%96 Laboratuvar çözeltisi fermantasyon ve meşe fıçı maserasyonuna uygun mudur?",
      a: "Evet. DEMLAB %96 çözeltimiz, özel fermantasyon prosesleri, meşe fıçı dinlendirmeleri ve botanik ekstraksiyonlar için özel olarak optimize edilmiştir. Yüksek saflık profili sayesinde meşe ağacından gelen doğal vanilin, lakton ve tanen bileşenlerini bozmadan homojen çözünürlük sağlar."
    },
    {
      q: "5 Litre, 10 Litre ve 20 Litre ambalajlar sızdırmaz mühürlü müdür?",
      a: "Tüm ürünlerimiz, sızdırmaz emniyet kilitli ve korozyona dayanıklı birinci sınıf HDPE kaplarda, özel laboratuvar güvenlik mührü uygulanarak sevk edilir. Ambalaj kapağı ilk kez kullanıcı tarafından kırılır."
    },
    {
      q: "Analiz Sertifikası (CoA) ve TDS belgeleri ürünle birlikte geliyor mu?",
      a: "Kesinlikle. İstisnasız her parti için gaz kromatografisi (GC) saflık testlerini içeren orijinal parti Analiz Sertifikası (CoA) koli içinde fiziksel olarak ve dijital olarak tarafınıza iletilmektedir."
    },
    {
      q: "Teslimat ve getirim süresi ne kadardır?",
      a: "Siparişiniz onaylandığı gün lot kontrolünden geçerek hazırlanır ve 1-2 iş günü içerisinde korumalı sevkiyatla adresinize ulaştırılır."
    },
    {
      q: "Dozaj ve seyreltme oranları için teknik destek alabilir miyim?",
      a: "Evet. Sitemizdeki Dozaj Hesaplayıcı aracını kullanarak tank veya fıçı hacminize göre tam hesap yapabilir veya sağ alttaki WhatsApp hattımızdan teknik kimyagerimizle birebir görüşebilirsiniz."
    }
  ];

  return (
    <div className="oak-card p-6 sm:p-8 rounded-3xl space-y-6">
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#e59840]">
          <Sparkles className="w-4 h-4" />
          <span>Merak Edilenler</span>
        </div>
        <h3 className="text-xl font-bold text-[#fef5ec] font-serif">
          Sıkça Sorulan Sorular
        </h3>
        <p className="text-xs text-[#bda18b]">
          Fermantasyon çözeltileri, meşe dinlendirme ve teslimat süreçleri.
        </p>
      </div>

      <div className="space-y-2.5">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="bg-[#180d07] rounded-xl border border-[#3e2315] overflow-hidden transition"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full text-left p-4 text-xs sm:text-sm font-bold text-[#f0ded0] flex justify-between items-center gap-4 hover:text-[#f3bd68] transition"
              >
                <span className="flex items-center gap-2.5">
                  <HelpCircle className="w-4 h-4 text-[#e59840] shrink-0" />
                  <span>{faq.q}</span>
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-[#e59840] shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-4 pb-4 pt-1 text-xs text-[#c6ad97] leading-relaxed border-t border-[#2e170c]">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
