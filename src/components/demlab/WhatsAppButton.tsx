import { useState } from "react";
import { MessageCircle, X, Send, ShieldCheck, Sparkles } from "lucide-react";
import { companyInfo } from "@/demlab/data/company";

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState("");

  const predefinedQuestions = [
    "%96 Laboratuvar çözeltisi (5L / 10L / 20L) sipariş vermek istiyorum.",
    "Özel fermantasyon ve meşe fıçı seyreltme oranı danışmak istiyorum.",
    "Parti bazlı Analiz Sertifikası (CoA) ve TDS talep etmek istiyorum.",
    "Bugün verilen sipariş ne zaman teslim edilir?"
  ];

  const handleSend = (text: string) => {
    const phone = "902165550199";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Açılır Sohbet Kartı */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 oak-card rounded-3xl shadow-2xl border border-[#e59840]/40 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Üst Bar */}
          <div className="bg-gradient-to-r from-[#d8892f] via-[#b86d1f] to-[#7a3e11] text-white p-4 flex items-center justify-between border-b border-[#ffd79a]/30">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-black/30 flex items-center justify-center font-bold text-white border border-[#ffd79a]/40 font-serif">
                  DL
                </div>
                <span className="w-3 h-3 bg-emerald-400 border-2 border-[#1c100a] rounded-full absolute bottom-0 right-0" />
              </div>
              <div>
                <h4 className="font-bold text-sm font-serif">DEMLAB Fermantasyon Danışmanı</h4>
                <p className="text-[11px] text-[#ffd79a] flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" /> Çevrimiçi • Teknik Uzman Destek
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* İçerik */}
          <div className="p-4 space-y-3 bg-[#180e08] text-xs text-[#f5dfce]">
            <div className="bg-[#24140c] p-3 rounded-2xl rounded-tl-none border border-[#442616] text-[#e0cbba] leading-relaxed">
              Merhaba! DEMLAB zanaat atölyesine hoş geldiniz. %96 laboratuvar çözeltisi ambalajları, meşe fıçı dozaj oranları veya siparişiniz için hemen yazabilirsiniz.
            </div>

            <div className="text-[11px] font-bold text-[#e59840] pt-1 uppercase tracking-wider">
              Sıkça Danışılan Konular:
            </div>
            <div className="space-y-1.5">
              {predefinedQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q)}
                  className="w-full text-left p-2.5 rounded-xl bg-[#22130b] hover:bg-[#341d11] hover:text-[#f3bd68] border border-[#3e2315] hover:border-[#e59840]/50 text-[#d8c0ad] transition flex items-center justify-between group"
                >
                  <span className="line-clamp-1">{q}</span>
                  <Send className="w-3 h-3 text-[#e59840] group-hover:scale-110 shrink-0 ml-1" />
                </button>
              ))}
            </div>

            {/* Özel Mesaj Yazma */}
            <div className="pt-2 flex gap-2">
              <input
                type="text"
                placeholder="Fermantasyon sorunuzu yazın..."
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && customMsg && handleSend(customMsg)}
                className="flex-1 text-xs rounded-xl border border-[#442616] px-3 py-2 bg-[#120804] text-[#f7ede2] outline-none focus:border-[#e59840]"
              />
              <button
                onClick={() => customMsg && handleSend(customMsg)}
                className="btn-amber p-2 rounded-xl transition"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sabit Yuvarlak Buton */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 bg-gradient-to-r from-[#d8892f] to-[#b3691d] hover:from-[#e59840] hover:to-[#c67825] text-white font-bold py-3.5 px-5 rounded-full shadow-2xl transition transform hover:scale-105 active:scale-95 border border-[#ffd79a]/40"
        aria-label="DEMLAB Teknik Danışman"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="hidden sm:inline text-xs font-serif tracking-wider">Fermantasyon Hattı</span>
      </button>
    </div>
  );
}
