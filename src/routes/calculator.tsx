import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Calculator, Sparkles, AlertCircle, ArrowRight, Check, FlaskConical, Boxes } from "lucide-react";
import { Link } from "@tanstack/react-router";

function CalculatorPage() {
  const [targetVolume, setTargetVolume] = useState<number>(20); // Hedef toplam Litre (örn: 20L fıçı)
  const [targetABV, setTargetABV] = useState<number>(45); // Hedef derece (% ABV)
  const [barrelType, setBarrelType] = useState<string>("oak45");

  // Gay-Lussac Seyreltme Formülü: 96% Çözeltiden Hedef Dereceye
  // V_cozelti = (Hedef_ABV * Hedef_Hacim) / 96
  const sourceABV = 96;
  const safeTargetABV = Math.min(Math.max(targetABV, 1), 95);
  const solutionNeeded = Number(((safeTargetABV * targetVolume) / sourceABV).toFixed(2));
  const waterNeeded = Number((targetVolume - solutionNeeded).toFixed(2));
  const ratio = (waterNeeded / (solutionNeeded || 1)).toFixed(2);

  const presets = [
    { id: "oak45", label: "Meşe Fıçı Dinlendirme", abv: 45, volume: 20, desc: "Meşe tanen ve vanilin ekstraksiyonu için ideal derece." },
    { id: "extract70", label: "Botanik Tentür / Ekstrakt", abv: 70, volume: 10, desc: "Bitkisel yağ ve reçinelerin homojen çözünmesi için." },
    { id: "ferm18", label: "Fermantasyon Kültür Ortamı", abv: 18, volume: 50, desc: "Özel maya ve biyokimyasal kültür stabilizasyonu." },
    { id: "barrel225", label: "Büyük Meşe Barrique (225L)", abv: 55, volume: 225, desc: "Tam boy Fransız/Amerikan meşe fıçı dolumu." },
  ];

  const handleSelectPreset = (p: typeof presets[0]) => {
    setBarrelType(p.id);
    setTargetABV(p.abv);
    setTargetVolume(p.volume);
  };

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-8 py-10 sm:py-16 space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#e59840]">
          DEMLAB Zanaat Mühendisliği
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#fff5ea] font-serif">
          Meşe Fıçı & %96 Fermantasyon Seyreltme Hesaplayıcı
        </h1>
        <p className="text-xs sm:text-sm text-[#c6ad97] leading-relaxed">
          %96 saflıktaki DEMLAB laboratuvar çözeltisini kullanarak fıçı veya fermantör hacminize göre tam su ve çözelti miktarını hesaplayın.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Sol Kolon - Girdiler */}
        <div className="md:col-span-7 oak-card rounded-3xl p-6 sm:p-8 space-y-6">
          {/* 1. Hazır Reçeteler */}
          <div>
            <label className="block text-xs font-bold text-[#f7ede2] mb-2 font-serif">
              1. Hazır Proses / Reçete Seçimi:
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {presets.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleSelectPreset(p)}
                  className={`p-3 rounded-xl border text-left text-xs transition ${
                    barrelType === p.id
                      ? "border-[#e59840] bg-[#e59840]/15 text-[#ffd79a] shadow-inner"
                      : "border-[#3e2315] bg-[#1a0e08] text-[#cbb29c] hover:border-[#5a341e]"
                  }`}
                >
                  <div className="font-bold font-serif">{p.label}</div>
                  <div className="text-[10px] text-[#9a7d67] mt-0.5">Hedef: %{p.abv} ABV • {p.volume}L</div>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Toplam Hedef Hacim */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold text-[#f7ede2] font-serif">
                2. Fıçı / Fermantör Toplam Hacmi:
              </label>
              <span className="text-xs font-black text-[#f3bd68] font-mono">
                {targetVolume} Litre
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="250"
              step="5"
              value={targetVolume}
              onChange={(e) => {
                setTargetVolume(Number(e.target.value));
                setBarrelType("custom");
              }}
              className="w-full accent-[#e59840] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#8e7460] mt-1">
              <span>5 L (Küçük Bidon)</span>
              <span>20 L (Standart Bidon)</span>
              <span>100 L</span>
              <span>225 L (Fıçı)</span>
            </div>
          </div>

          {/* 3. Hedef Alkol Derecesi */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold text-[#f7ede2] font-serif">
                3. Hedef Nihai Derece:
              </label>
              <span className="text-xs font-black text-[#f3bd68] font-mono">
                %{safeTargetABV} ABV (Hacimce)
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="90"
              step="1"
              value={targetABV}
              onChange={(e) => {
                setTargetABV(Number(e.target.value));
                setBarrelType("custom");
              }}
              className="w-full accent-[#e59840] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#8e7460] mt-1">
              <span>%10 (Düşük)</span>
              <span>%40 - %45 (Fıçı Standardı)</span>
              <span>%70 (Ekstraksiyon)</span>
              <span>%90</span>
            </div>
          </div>

          {/* Bilgi Notu */}
          <div className="p-3.5 bg-[#160c07] rounded-xl border border-[#3e2315] text-[11px] text-[#baa08a] flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-[#e59840] shrink-0 mt-0.5" />
            <p>
              Gay-Lussac kontrüksiyon yasası uyarınca alkol ve su karışımlarında hacim daralması (kontraksiyon) meydana gelebilir. Hassas analizler için distile veya osmoz arıtılmış su kullanınız.
            </p>
          </div>
        </div>

        {/* Sağ Kolon - Sonuç Kartı */}
        <div className="md:col-span-5 oak-card rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-[#d8892f]/20 text-[#f3bd68] text-[10px] font-bold px-3 py-1 rounded-bl-xl border-l border-b border-[#e59840]/30 uppercase">
            Analitik Reçete
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#e59840]">
              Sonuç Tablosu
            </span>
            <h3 className="text-lg font-bold text-[#fef5ec] font-serif mt-1">
              Gereken Karışım Miktarları
            </h3>
            <p className="text-xs text-[#a98f7b] mt-0.5">
              {targetVolume} Litre @ %{safeTargetABV} nihai karışım için:
            </p>
          </div>

          <div className="space-y-3">
            {/* Gereken %96 Çözelti */}
            <div className="p-4 bg-[#190d07] rounded-2xl border border-[#4a2b18] space-y-1">
              <span className="text-[11px] font-bold text-[#e59840] uppercase tracking-wider block">
                1. DEMLAB %96 Laboratuvar Çözeltisi:
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-[#fff4ea] font-mono">
                  {solutionNeeded}
                </span>
                <span className="text-sm font-bold text-[#f3bd68]">Litre</span>
              </div>
              <p className="text-[10px] text-[#937b67]">
                Tavsiye edilen ambalaj: {solutionNeeded <= 5 ? "1 x 5L Bidon" : solutionNeeded <= 10 ? "1 x 10L Bidon" : solutionNeeded <= 20 ? "1 x 20L Bidon" : `${Math.ceil(solutionNeeded / 20)} x 20L Bidon`}
              </p>
            </div>

            {/* Gereken Su */}
            <div className="p-4 bg-[#190d07] rounded-2xl border border-[#3e2315] space-y-1">
              <span className="text-[11px] font-bold text-[#bda18b] uppercase tracking-wider block">
                2. Eklenecek Saf / Distile Su:
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-[#d6bda7] font-mono">
                  {waterNeeded}
                </span>
                <span className="text-xs font-bold text-[#baa08a]">Litre</span>
              </div>
              <p className="text-[10px] text-[#7a6452]">
                1 Litre %96 çözelti başına yaklaşık {ratio} Litre su eklenir.
              </p>
            </div>
          </div>

          <div className="pt-2">
            <Link
              to="/products/96-laboratuvar-cozeltisi-ozel-fermantasyon"
              className="w-full inline-flex items-center justify-center gap-2 btn-amber font-bold py-3.5 px-4 rounded-xl shadow-lg transition text-xs"
            >
              <span>%96 Çözelti Sipariş Et (5L/10L/20L)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export const Route = createFileRoute("/calculator")({
  head: () => ({ meta: [] }),
  component: CalculatorPage,
});
