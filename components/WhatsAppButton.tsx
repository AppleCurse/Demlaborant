"use client";

import { useState } from "react";
import { MessageCircle, X, Send, ShieldCheck, Sparkles } from "lucide-react";
import { companyInfo } from "@/data/company";

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState("");

  const predefinedQuestions = [
    "Merhaba, %96 laboratuvar çözeltisi (5L / 10L / 20L) siparişi vermek istiyorum.",
    "İstanbul içi 10L motokurye teslimat süresini ve kapıda ödemeyi danışmak istiyorum.",
    "Parti numaram için Analiz Sertifikası (CoA) ve saflık kromatografisi talep ediyorum.",
    "Meşe fıçı dinlendirmesi ve botanik tentür seyreltme oranları hakkında teknik danışmanlık rica ediyorum."
  ];

  const handleSend = (text: string) => {
    const url = `https://wa.me/${companyInfo.whatsappPhone}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Açılır Sohbet Kartı */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 rounded-2xl bg-[#0f1116] border border-[#e59840]/40 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Üst Bilgi Barı */}
          <div className="bg-gradient-to-r from-[#b04a12] to-[#e59840] text-black p-4 flex items-center justify-between font-sans">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-black text-[#e59840] flex items-center justify-center font-bold text-sm font-serif border border-white/20">
                  DL
                </div>
                <span className="w-3 h-3 bg-emerald-400 border-2 border-black rounded-full absolute bottom-0 right-0 animate-pulse" />
              </div>
              <div>
                <h4 className="font-black text-sm text-black font-serif leading-tight">DemlaB Danışma Hattı</h4>
                <p className="text-[11px] text-black/80 font-mono font-semibold">
                  0850 512 07 37 • Canlı Destek
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-black/80 hover:text-black p-1 rounded-lg transition"
              aria-label="Kapat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* İçerik & Hızlı Sorular */}
          <div className="p-4 space-y-3 bg-[#13151b] text-xs text-[#f4ede4]">
            <div className="bg-[#1b1e27] p-3 rounded-xl border border-white/10 text-white/90 leading-relaxed font-sans">
              DemlaB Zanaat & Laboratuvar Danışmanına hoş geldiniz. %96 çözelti ambalajları, motokurye sevkiyatı veya teknik seyreltme hesaplamalarınız için doğrudan yazabilirsiniz.
            </div>

            <div className="text-[11px] font-mono font-bold text-[#e59840] uppercase tracking-wider">
              Hızlı Danışma Başlıkları:
            </div>
            <div className="space-y-1.5">
              {predefinedQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q)}
                  className="w-full text-left p-2.5 rounded-lg bg-[#181a22] hover:bg-[#222530] border border-white/5 hover:border-[#e59840]/40 text-white/80 transition flex items-center justify-between group"
                >
                  <span className="line-clamp-1">{q}</span>
                  <Send className="w-3.5 h-3.5 text-[#e59840] group-hover:scale-110 shrink-0 ml-1.5" />
                </button>
              ))}
            </div>

            {/* Özel Mesaj Yazma */}
            <div className="pt-2 flex gap-2">
              <input
                type="text"
                placeholder="Mesajınızı yazın..."
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && customMsg && handleSend(customMsg)}
                className="flex-1 text-xs rounded-lg border border-white/15 px-3 py-2 bg-[#0c0d11] text-white outline-none focus:border-[#e59840]"
              />
              <button
                onClick={() => customMsg && handleSend(customMsg)}
                className="bg-[#e59840] text-black font-bold px-3 py-2 rounded-lg hover:bg-[#d88930] transition"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sabit Buton */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 bg-gradient-to-r from-[#b04a12] to-[#e59840] text-black font-bold py-3.5 px-5 rounded-full shadow-2xl transition transform hover:scale-105 active:scale-95 border border-white/20"
        aria-label="WhatsApp Canlı Danışma Hattı 0850 512 07 37"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="hidden sm:inline text-xs font-mono tracking-wider font-extrabold uppercase">
          0850 512 07 37
        </span>
      </button>
    </div>
  );
}
