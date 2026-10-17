import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Banknote,
  Check,
  Clock,
  CreditCard,
  Loader2,
  PackageCheck,
  Search,
  ShieldCheck,
  Truck,
  X,
} from "lucide-react";
import { DemlabMark, SectionMark, WaxSeal } from "./marks";
import DilutionVessel from "./DilutionVessel";
import { getDistricts, lookupLot as lookupLotFn, createOrder } from "@/demlab/api.functions";
import heroPlate from "@/assets/hero-plate.jpg";
import coaPlate from "@/assets/coa-plate.jpg";
import packagePlate from "@/assets/package-plate.jpg";

type PackageItem = {
  id: string;
  volume: number;
  price: number;
  badge?: string;
  isPopular?: boolean;
  courierEligible: boolean;
  description: string;
};

const PACKAGES: PackageItem[] = [
  {
    id: "pkg-5l",
    volume: 5,
    price: 1750,
    badge: "Giriş / Deneme Boyu",
    courierEligible: false,
    description:
      "Kompakt atölye ve laboratuvar çalışmaları için optimize edilmiş sızdırmaz HDPE ambalaj.",
  },
  {
    id: "pkg-10l",
    volume: 10,
    price: 3000,
    badge: "En çok satan • İstanbul motokurye",
    isPopular: true,
    courierEligible: true,
    description:
      "Hızlı tüketime uygun, İstanbul içinde aynı gün kapıya motokurye teslimatına özel hacim.",
  },
  {
    id: "pkg-20l",
    volume: 20,
    price: 5500,
    badge: "Maksimum tasarruf",
    courierEligible: false,
    description:
      "Büyük ölçekli ekstraksiyon ve zanaatkar dinlendirmeler için endüstriyel takviyeli bidon.",
  },
];

const FALLBACK_DISTRICTS = [
  { name: "Kadıköy", etaMin: 45, etaMax: 60 },
  { name: "Üsküdar", etaMin: 50, etaMax: 65 },
  { name: "Beşiktaş", etaMin: 60, etaMax: 75 },
  { name: "Şişli", etaMin: 60, etaMax: 80 },
  { name: "Pendik", etaMin: 60, etaMax: 80 },
  { name: "Bakırköy", etaMin: 75, etaMax: 90 },
  { name: "Sarıyer", etaMin: 75, etaMax: 95 },
  { name: "Beylikdüzü", etaMin: 90, etaMax: 120 },
];

type District = { name: string; etaMin: number; etaMax: number; note?: string | null };

type LotRecord = {
  lotCode: string;
  abv: string;
  residue: string;
  volatileAcidity: string;
  heavyMetals: string;
  testDate: string;
  method: string;
  status: string;
};

const REFRAIN =
  "Kurbağa prense, bal kabağı arabaya — 96 derece de dönüşüme. Mutluysan yanında, üzgünsen karşında, yalnızsan arkanda.";

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function DemlabLanding() {
  const reduce = useReducedMotion();

  // --- state ---
  const [pkgId, setPkgId] = useState("pkg-10l");
  const selected = useMemo(
    () => PACKAGES.find((p) => p.id === pkgId) ?? PACKAGES[1],
    [pkgId],
  );

  const [districts, setDistricts] = useState<District[]>(FALLBACK_DISTRICTS);
  const [district, setDistrict] = useState("Kadıköy");

  const [targetVolume, setTargetVolume] = useState(10);
  const [targetABV, setTargetABV] = useState(45);

  const [lotInput, setLotInput] = useState("DLM-96-2026-B4");
  const [lotState, setLotState] = useState<
    | { status: "idle" }
    | { status: "loading" }
    | { status: "found"; lot: LotRecord }
    | { status: "error"; message: string }
  >({ status: "idle" });

  const [orderOpen, setOrderOpen] = useState(false);
  const [orderState, setOrderState] = useState<
    | { status: "idle" }
    | { status: "sending" }
    | { status: "done"; orderNo: string; courier: boolean }
    | { status: "error"; message: string }
  >({ status: "idle" });

  const [deliveryType, setDeliveryType] = useState<"courier" | "cargo">("courier");
  const [paymentType, setPaymentType] = useState<"door-card" | "door-cash">("door-card");
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    city: "İstanbul",
    district: "Kadıköy",
    address: "",
  });
  const [heroOk, setHeroOk] = useState(true);
  const [pkgOk, setPkgOk] = useState(true);
  const [coaOk, setCoaOk] = useState(true);

  // --- data ---
  useEffect(() => {
    let alive = true;
    getDistricts()
      .then((rows) => {
        if (alive && rows.length) {
          setDistricts(rows);
        }
      })
      .catch(() => {
        /* offline / first boot: keep the ledger defaults */
      });
    return () => {
      alive = false;
    };
  }, []);

  const solutionNeeded = Number(((targetABV * targetVolume) / 96).toFixed(2));
  const waterNeeded = Number((targetVolume - solutionNeeded).toFixed(2));
  const activeDistrict = districts.find((d) => d.name === district) ?? districts[0];

  async function lookupLot(code: string) {
    const clean = code.trim().toUpperCase();
    if (!clean) {
      setLotState({ status: "error", message: "Lot numarası boş olamaz." });
      return;
    }
    setLotState({ status: "loading" });
    try {
      const data = await lookupLotFn({ data: { code: clean } });
      if (data.found) setLotState({ status: "found", lot: data.lot });
      else setLotState({ status: "error", message: data.error });
    } catch {
      setLotState({ status: "error", message: "Analiz sunucusuna ulaşılamadı." });
    }
  }

  async function submitOrder(e: React.FormEvent) {
    e.preventDefault();
    setOrderState({ status: "sending" });
    try {
      if (form.fullName.trim().length < 3 || form.phone.trim().length < 7 || form.address.trim().length < 8) {
        setOrderState({ status: "error", message: "Lütfen ad soyad, telefon ve açık adres alanlarını eksiksiz doldurun." });
        return;
      }
      const data = await createOrder({
        data: {
          items: [{ name: "%96 Laboratuvar Çözeltisi", size: `${selected.volume} L`, price: selected.price, quantity: 1 }],
          total: selected.price,
          fullName: form.fullName,
          phone: form.phone,
          city: form.city,
          district: form.district,
          address: form.address,
          deliveryType: deliveryType === "courier" ? "courier" : "cargo",
          paymentType,
        },
      });
      setOrderState({
        status: "done",
        orderNo: data.orderNo,
        courier: deliveryType === "courier",
      });
    } catch {
      setOrderState({ status: "error", message: "Bağlantı hatası, lütfen tekrar deneyin." });
    }
  }

  const fill = (v: number, min: number, max: number) =>
    ({ "--fill": `${((v - min) / (max - min)) * 100}%` }) as CSSProperties;

  return (
    <div className="min-h-screen">
      {/* ── fixed refrain rail ─────────────────────────────── */}
      <div className="hidden xl:flex fixed left-0 top-0 z-40 h-screen w-14 flex-col items-center justify-between border-r border-ink/15 bg-paper-deep/60 py-6">
        <DemlabMark className="h-7 w-7 text-ink" />
        <p
          className="label whitespace-nowrap text-mute"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          Kurbağa prense · Bal kabağı arabaya · 96 derece dönüşüme
        </p>
        <span className="label text-ember">96</span>
      </div>

      <div className="xl:pl-14">
        {/* ── ticker ───────────────────────────────────────── */}
        <div className="overflow-hidden bg-bottle text-paper/85">
          <div className="flex w-max py-2 dl-marquee">
            {[0, 1].map((i) => (
              <span key={i} className="label flex shrink-0 items-center gap-6 pr-6">
                <span className="text-ember-soft">Parti serisi aktif — %96.2 v/v analitik saflık onaylı</span>
                <span className="opacity-40">✦</span>
                <span>{REFRAIN}</span>
                <span className="opacity-40">✦</span>
                <span className="text-ember-soft">81 ile mühürlü sevkiyat</span>
                <span className="opacity-40">✦</span>
                <span>İstanbul içi 10L aynı gün motokurye</span>
                <span className="opacity-40">✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* ── header ───────────────────────────────────────── */}
        <header className="sticky top-0 z-30 border-b border-ink/20 bg-paper/92 backdrop-blur-sm">
          <div className="mx-auto flex h-[72px] max-w-[1240px] items-center justify-between gap-6 px-5 sm:px-8">
            <a href="#" className="flex items-center gap-3">
              <DemlabMark className="h-9 w-9 text-ink" />
              <span>
                <span className="display block text-[26px] font-black leading-none">
                  Demla<span className="text-ember">B</span>
                </span>
                <span className="label block text-[9px] text-mute">Demlenme Laboratuvarı</span>
              </span>
            </a>

            <nav className="hidden items-center gap-7 lg:flex">
              {[
                ["#fiyatlar", "Fiyat Listesi"],
                ["#motokurye", "Motokurye"],
                ["#hesaplayici", "Seyreltme Motoru"],
                ["#analiz", "Sertifika"],
              ].map(([href, label]) => (
                <a
                  key={href}
                  href={href}
                  className="label border-b border-transparent pb-1 text-ink/70 transition-colors hover:border-ember hover:text-ember"
                >
                  {label}
                </a>
              ))}
            </nav>

            <button
              onClick={() => {
                setOrderState({ status: "idle" });
                setOrderOpen(true);
              }}
              className="group flex items-center gap-2 bg-ember px-4 py-2.5 text-paper transition-colors hover:bg-ink"
            >
              <span className="label text-paper">Sipariş</span>
              <span className="tnum font-mono text-sm font-semibold">
                {selected.price.toLocaleString("tr-TR")} ₺
              </span>
            </button>
          </div>
        </header>

        {/* ── hero ─────────────────────────────────────────── */}
        <section className="mx-auto max-w-[1240px] px-5 pb-16 pt-12 sm:px-8 lg:pt-16">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <Reveal>
                <SectionMark n="00" title="Akredite parti sertifikalı · test garantili" />
              </Reveal>

              <Reveal delay={0.05}>
                <p className="display mt-6 max-w-[22ch] text-[clamp(1.15rem,2.4vw,1.65rem)] italic leading-snug text-mute">
                  “{REFRAIN}”
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <h1 className="display mt-5 text-[clamp(3rem,7.6vw,6.6rem)] font-black">
                  <span className="block font-light">%96 Analitik Saflıkta</span>
                  <span className="block italic text-ember">Laboratuvar Çözeltisi.</span>
                </h1>
              </Reveal>

              <Reveal delay={0.15}>
                <p className="mt-7 max-w-[58ch] text-[17px] leading-[1.75] text-ink/80">
                  Zanaat fermantasyonları, botanik tentür ekstraksiyonları ve hassas laboratuvar
                  reaksiyonları için üretilmiş en yüksek saflık standardı. Her siparişte{" "}
                  <strong className="font-semibold text-ink">kalibre edilmiş test kiti hediye</strong> ve
                  kapıda kontrol güvencesiyle.
                </p>
              </Reveal>

              {/* promises — ruled ledger, hanging numerals */}
              <Reveal delay={0.2}>
                <div className="mt-9 grid grid-cols-1 border-t border-ink/20 sm:grid-cols-2">
                  {[
                    ["01", "Kapıda Kontrol", "Mührü açıp kontrol edin", ShieldCheck],
                    ["02", "Hediye Test Kiti", "Her siparişte 0 TL", Check],
                    ["03", "Kapıda Nakit / Kart", "Ön ödemesiz güven", Banknote],
                    ["04", "VIP Motokurye", "İstanbul içi anında teslim", Truck],
                  ].map(([num, title, sub, Icon], i) => {
                    const I = Icon as typeof ShieldCheck;
                    return (
                      <div
                        key={num as string}
                        className={`flex items-start gap-4 border-b border-ink/20 py-4 sm:py-5 ${
                          i % 2 === 0 ? "sm:border-r sm:pr-6" : "sm:pl-6"
                        }`}
                      >
                        <span className="tnum label pt-1 text-ember">{num as string}</span>
                        <div>
                          <div className="flex items-center gap-2">
                            <I className="h-4 w-4 text-bottle" />
                            <span className="font-display text-[17px] font-semibold">{title as string}</span>
                          </div>
                          <p className="mt-0.5 text-[13px] text-mute">{sub as string}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Reveal>

              <Reveal delay={0.25}>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#fiyatlar"
                    className="group inline-flex items-center justify-center gap-2 bg-ink px-7 py-4 text-paper transition-colors hover:bg-ember"
                  >
                    <span className="label text-paper">Paket seç & kapıda öde</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                  <a
                    href="#hesaplayici"
                    className="inline-flex items-center justify-center gap-2 border border-ink/30 px-7 py-4 transition-colors hover:border-ember hover:text-ember"
                  >
                    <span className="label">Seyreltme oranını hesapla</span>
                  </a>
                </div>
              </Reveal>
            </div>

            {/* hero plate + overlapping certificate */}
            <Reveal delay={0.18} className="lg:col-span-5">
              <div className="relative">
                <div
                  className="relative -rotate-[1.5deg] border border-ink/20 p-2 paper-card"
                  style={{
                    background:
                      "linear-gradient(150deg, #e9d9be 0%, #d8c39f 55%, #c9b189 100%)",
                  }}
                >
                  {heroOk ? (
                    <img
                      src={heroPlate}
                      alt="Mühürlü amber laboratuvar cam şişesi, küçük bal kabağı ve cam terlik — gravür plaka"
                      className="h-[420px] w-full object-cover object-center sm:h-[500px]"
                      onError={() => setHeroOk(false)}
                    />
                  ) : (
                    <div className="flex h-[420px] w-full items-center justify-center bg-paper-deep sm:h-[500px]">
                      <DemlabMark className="h-24 w-24 text-ink/40" />
                    </div>
                  )}
                  <div className="pointer-events-none absolute inset-2 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5">
                    <p className="label text-paper/85">Şekil 1 — Mühürlü numune şişesi</p>
                  </div>
                </div>

                <div className="absolute -bottom-10 -left-2 w-[248px] rotate-[2.5deg] paper-card p-5 sm:-left-10">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="label text-mute">Parti no</p>
                      <p className="tnum font-mono text-[15px] font-semibold">DLM-96-2026-B4</p>
                    </div>
                    <WaxSeal className="h-12 w-12 -rotate-12" />
                  </div>
                  <div className="mt-3 space-y-1.5 border-t border-ink/20 pt-3">
                    {[
                      ["Saflık", "≥ %96.0 v/v"],
                      ["Kalıntı", "< %0.001"],
                      ["Sevkiyat", "Çift katman mühürlü"],
                    ].map(([k, v]) => (
                      <div key={k} className="flex items-baseline justify-between gap-3">
                        <span className="label text-mute">{k}</span>
                        <span className="tnum font-mono text-[12px] font-semibold">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── technical strip ──────────────────────────────── */}
        <div className="border-y border-bottle-deep bg-bottle">
          <div className="mx-auto grid max-w-[1240px] grid-cols-2 px-5 sm:px-8 lg:grid-cols-4">
            {[
              ["Saflık derecesi", "≥ %96.0 v/v"],
              ["Uçucu olmayan kalıntı", "< %0.001"],
              ["Kutu içeriği", "+ Hediye test kiti"],
              ["Sevkiyat güvenliği", "Çift katman mühürlü HDPE"],
            ].map(([k, v], i) => (
              <div
                key={k}
                className={`border-paper/15 py-6 lg:pl-7 ${
                  i % 2 === 0 ? "border-r" : ""
                } ${i < 2 ? "border-b" : ""} lg:border-b-0 lg:first:border-l-0 lg:last:border-r-0 ${
                  i === 0 ? "lg:pl-0" : ""
                }`}
              >
                <p className="label text-paper/75">{k}</p>
                <p className="tnum mt-2 font-mono text-[15px] font-semibold text-paper">{v}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── price ledger ─────────────────────────────────── */}
        <section id="fiyatlar" className="mx-auto max-w-[1240px] scroll-mt-24 px-5 py-20 sm:px-8">
          <Reveal>
            <SectionMark n="01" title="Şeffaf & koşulsuz fiyatlandırma" />
            <div className="mt-6 grid grid-cols-1 items-end gap-6 lg:grid-cols-12">
              <h2 className="display text-[clamp(2.4rem,5vw,4.1rem)] font-black lg:col-span-7">
                İhtiyacınıza uygun <span className="italic text-ember">ambalaj seçimi</span>
              </h2>
              <p className="text-[15px] leading-relaxed text-ink/75 lg:col-span-5">
                Tüm paketlerde <strong className="font-semibold text-ink">alkol test kiti hediye</strong>,
                kapıda kontrollü teslimat ve 81 ile mühürlü kargo güvencesi standarttır. Liste fiyatı
                dışında sürpriz kalem yoktur.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 border-t border-ink/25">
            {PACKAGES.map((pkg, i) => {
              const unit = (pkg.price / pkg.volume).toFixed(0);
              const popular = pkg.isPopular;
              return (
                <Reveal key={pkg.id} delay={i * 0.06}>
                  <div
                    className={`group grid grid-cols-1 items-center gap-6 border-b border-ink/25 px-4 py-8 transition-colors sm:px-6 lg:grid-cols-12 ${
                      popular
                        ? "bg-bottle text-paper hover:bg-bottle-deep"
                        : "hover:bg-paper-deep/70"
                    }`}
                  >
                    <div className="flex items-end gap-3 lg:col-span-3">
                      <span
                        className={`display tnum text-[clamp(3.4rem,7vw,5.2rem)] font-black leading-[0.8] ${
                          popular ? "text-ember-soft" : "text-ink"
                        }`}
                      >
                        {pkg.volume}
                      </span>
                      <span className={`label pb-2 ${popular ? "text-paper/70" : "text-mute"}`}>
                        Litre
                      </span>
                    </div>

                    <div className="lg:col-span-5">
                      {pkg.badge && (
                        <p
                          className={`label ${
                            popular ? "text-ember-soft" : "text-ember"
                          }`}
                        >
                          {pkg.badge}
                        </p>
                      )}
                      <h3 className="display mt-2 text-[26px] font-bold">
                        {pkg.volume} Litre HDPE
                      </h3>
                      <p
                        className={`mt-2 max-w-[46ch] text-[14px] leading-relaxed ${
                          popular ? "text-paper/75" : "text-ink/70"
                        }`}
                      >
                        {pkg.description}
                      </p>
                      <div
                        className={`mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-mono uppercase tracking-[0.12em] ${
                          popular ? "text-paper/65" : "text-mute"
                        }`}
                      >
                        <span>Test kiti dahil</span>
                        <span className="opacity-40">/</span>
                        <span>Kapıda kontrol</span>
                        <span className="opacity-40">/</span>
                        <span>Nakit veya kart</span>
                        <span className="opacity-40">/</span>
                        <span>{pkg.courierEligible ? "Aynı gün motokurye" : "81 ile kargo"}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-5 lg:col-span-4 lg:justify-end">
                      <div className="text-right">
                        <p className={`label ${popular ? "text-paper/75" : "text-mute"}`}>
                          Litre: {unit} ₺
                        </p>
                        <p className="tnum mt-1 font-mono text-[clamp(1.8rem,3.4vw,2.5rem)] font-bold leading-none">
                          {pkg.price.toLocaleString("tr-TR")}
                          <span className="ml-1 text-[15px] font-medium opacity-70">TL</span>
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setPkgId(pkg.id);
                          setOrderState({ status: "idle" });
                          setOrderOpen(true);
                        }}
                        className={`shrink-0 border px-5 py-3 transition-colors ${
                          popular
                            ? "border-ember-soft bg-ember text-paper hover:bg-ember-soft"
                            : "border-ink/30 hover:border-ember hover:bg-ember hover:text-paper"
                        }`}
                      >
                        <span className="label">Sipariş ver</span>
                      </button>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ── courier band ─────────────────────────────────── */}
        <section id="motokurye" className="scroll-mt-24 border-y border-bottle-deep bg-bottle text-paper">
          <div className="mx-auto max-w-[1240px] px-5 py-20 sm:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <Reveal>
                  <SectionMark n="02" title="İstanbul içi aynı gün VIP servis" tone="paper" />
                  <h2 className="display mt-6 text-[clamp(2.2rem,4.6vw,3.6rem)] font-black">
                    10 litre siparişlerinizde{" "}
                    <span className="italic text-ember-soft">saatler içinde kapıda motokurye</span>
                  </h2>
                  <p className="mt-5 max-w-[52ch] text-[15px] leading-[1.8] text-paper/80">
                    İstanbul sınırları içindeki atölye, laboratuvar ve zanaatkârlar için beklemek yok.
                    10 litrelik mühürlü ambalaj seçildiğinde özel kuryemiz anında sevkiyata çıkar.
                  </p>
                </Reveal>

                <Reveal delay={0.08}>
                  <p className="label mt-8 text-paper/75">İlçenizi seçin, varış süresini görün</p>
                  <div className="mt-3 grid grid-cols-1 border-t border-paper/20 sm:grid-cols-2">
                    {districts.map((d, i) => {
                      const active = d.name === district;
                      return (
                        <button
                          key={d.name}
                          onClick={() => setDistrict(d.name)}
                          className={`flex items-baseline justify-between gap-3 border-b border-paper/20 px-2 py-3 text-left transition-colors ${
                            i % 2 === 0 ? "sm:border-r sm:border-paper/20" : "sm:pl-4"
                          } ${active ? "bg-ember text-paper" : "hover:bg-paper/10"}`}
                        >
                          <span className="font-display text-[18px] font-semibold">{d.name}</span>
                          <span className="tnum font-mono text-[12px] opacity-80">
                            {d.etaMin}–{d.etaMax} dk
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </Reveal>
              </div>

              {/* ETA panel */}
              <Reveal delay={0.12} className="lg:col-span-6">
                <div className="paper-card p-7 text-ink">
                  <div className="flex items-start justify-between border-b border-ink/20 pb-5">
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-bottle text-paper">
                        <Truck className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="label text-mute">Hedef bölge</p>
                        <p className="font-display text-[20px] font-bold">
                          {district} / İstanbul
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="label text-mute">Tahmini teslimat</p>
                      <p className="tnum font-mono text-[18px] font-bold text-ember">
                        {activeDistrict.etaMin} – {activeDistrict.etaMax} dakika
                      </p>
                    </div>
                  </div>

                  {/* route */}
                  <svg viewBox="0 0 420 74" className="mt-4 w-full" aria-hidden="true">
                    <line x1="24" y1="40" x2="396" y2="40" stroke="#191410" strokeWidth="1" opacity="0.25" />
                    <line
                      x1="24"
                      y1="40"
                      x2="396"
                      y2="40"
                      stroke="#c2571b"
                      strokeWidth="2"
                      strokeDasharray="10 8"
                      className="dl-dash"
                    />
                    <circle cx="24" cy="40" r="7" fill="#123f2c" />
                    <circle cx="396" cy="40" r="7" fill="#c2571b" />
                    <text x="24" y="22" fontFamily="IBM Plex Mono, monospace" fontSize="11" fill="#7a6b57" letterSpacing="1.5">
                      ZANAAT VADİSİ
                    </text>
                    <text
                      x="396"
                      y="22"
                      textAnchor="end"
                      fontFamily="IBM Plex Mono, monospace"
                      fontSize="11"
                      fill="#c2571b"
                      letterSpacing="1.5"
                    >
                      {district.toUpperCase()}
                    </text>
                    <text x="24" y="64" fontFamily="IBM Plex Mono, monospace" fontSize="11" fill="#7a6b57">
                      10L mühürlü kurye bidonu
                    </text>
                    <text x="396" y="64" textAnchor="end" fontFamily="IBM Plex Mono, monospace" fontSize="11" fill="#7a6b57">
                      + hediye test kiti
                    </text>
                  </svg>

                  <div className="mt-5 space-y-2.5 border-t border-ink/20 pt-5 font-mono text-[12px]">
                    {[
                      ["Ödeme yöntemi", "Kapıda nakit veya kredi kartı POS"],
                      ["Güvenlik", "Çift katman mühür + darbe emici"],
                      ["Sevk durumu", "Aynı gün çıkışlı"],
                    ].map(([k, v]) => (
                      <div key={k} className="flex items-baseline justify-between gap-4">
                        <span className="label text-mute">{k}</span>
                        <span className="text-right font-medium">{v}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      setPkgId("pkg-10l");
                      setDeliveryType("courier");
                      setForm((f) => ({ ...f, district }));
                      setOrderState({ status: "idle" });
                      setOrderOpen(true);
                    }}
                    className="mt-6 flex w-full items-center justify-center gap-2 bg-ember px-6 py-4 text-paper transition-colors hover:bg-ink"
                  >
                    <Clock className="h-4 w-4" />
                    <span className="label">
                      {district} için motokurye çağır — 3.000 ₺
                    </span>
                  </button>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── dilution engine ──────────────────────────────── */}
        <section id="hesaplayici" className="mx-auto max-w-[1240px] scroll-mt-24 px-5 py-20 sm:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-4">
              <Reveal>
                <SectionMark n="03" title="Gay-Lussac formülü" />
                <h2 className="display mt-6 text-[clamp(2.2rem,4.4vw,3.4rem)] font-black">
                  Hassas <span className="italic text-ember">seyreltme</span> hesaplama motoru
                </h2>
                <p className="mt-5 text-[15px] leading-[1.8] text-ink/75">
                  %96 saflıktaki çözeltinizi meşe fıçı dinlendirmesi, botanik ekstrakt veya tentür için
                  hedeflenen dereceye getirmek için gereken saf su ve çözelti miktarını hesaplayın.
                </p>
              </Reveal>

              <Reveal delay={0.08}>
                <p className="label mt-8 text-mute">Hızlı senaryolar</p>
                <div className="mt-3 border-t border-ink/20">
                  {[
                    ["Meşe Fıçı Dinlendirme", "%45 derece · 10 L", 45, 10],
                    ["Botanik Tentür / Ekstrakt", "%70 derece · 5 L", 70, 5],
                    ["Zanaat Fermantasyon Ön", "%18 derece · 20 L", 18, 20],
                  ].map(([label, meta, abv, vol]) => (
                    <button
                      key={label as string}
                      onClick={() => {
                        setTargetABV(abv as number);
                        setTargetVolume(vol as number);
                      }}
                      className="group flex w-full items-baseline justify-between gap-4 border-b border-ink/20 py-3.5 text-left transition-colors hover:bg-paper-deep/70"
                    >
                      <span className="font-display text-[17px] font-semibold group-hover:text-ember">
                        {label as string}
                      </span>
                      <span className="tnum font-mono text-[11px] uppercase tracking-[0.14em] text-ember">
                        {meta as string}
                      </span>
                    </button>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.12}>
                <p className="mt-8 border-l-2 border-ember pl-4 font-mono text-[12px] leading-relaxed text-mute">
                  Formül: V₁ × C₁ = V₂ × C₂ — baz alkol %96 olarak alınmıştır. Sonucu kendi test
                  kitinizle doğrulayın.
                </p>
              </Reveal>
            </div>

            {/* controls */}
            <div className="lg:col-span-4">
              <Reveal delay={0.06}>
                <div className="paper-card p-7">
                  <div>
                    <div className="flex items-baseline justify-between">
                      <span className="label text-mute">Hedef nihai hacim</span>
                      <span className="tnum font-mono text-[26px] font-bold text-ember">
                        {targetVolume} L
                      </span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={50}
                      value={targetVolume}
                      onChange={(e) => setTargetVolume(Number(e.target.value))}
                      className="dl-range mt-2"
                      style={fill(targetVolume, 1, 50)}
                      aria-label="Hedef nihai hacim (litre)"
                    />
                    <div className="flex justify-between font-mono text-[10px] text-mute">
                      <span>1 L</span>
                      <span>50 L</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="flex items-baseline justify-between">
                      <span className="label text-mute">Hedef derece</span>
                      <span className="tnum font-mono text-[26px] font-bold text-ember">
                        %{targetABV} ABV
                      </span>
                    </div>
                    <input
                      type="range"
                      min={5}
                      max={95}
                      value={targetABV}
                      onChange={(e) => setTargetABV(Number(e.target.value))}
                      className="dl-range mt-2"
                      style={fill(targetABV, 5, 95)}
                      aria-label="Hedef alkol derecesi"
                    />
                    <div className="flex justify-between font-mono text-[10px] text-mute">
                      <span>%5</span>
                      <span>%95</span>
                    </div>
                  </div>

                  <div className="mt-7 border-t border-ink/20 pt-6">
                    <div className="flex items-baseline justify-between gap-4">
                      <div>
                        <p className="label text-mute">Gereken %96 çözelti</p>
                        <p className="tnum font-mono text-[34px] font-bold leading-none">
                          {solutionNeeded} L
                        </p>
                        <p className="mt-1 font-mono text-[11px] text-mute">DemlaB çözeltisi</p>
                      </div>
                      <div className="h-16 w-px bg-ink/20" />
                      <div className="text-right">
                        <p className="label text-mute">Eklenecek saf su</p>
                        <p className="tnum font-mono text-[34px] font-bold leading-none text-bottle">
                          {waterNeeded} L
                        </p>
                        <p className="mt-1 font-mono text-[11px] text-mute">Distile / arıtılmış</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between gap-3 bg-paper-deep/70 px-4 py-3">
                    <span className="font-mono text-[11px] text-mute">
                      V₁ × C₁ = V₂ × C₂ (96% baz)
                    </span>
                    <span className="label text-ember">Kendi kitinizle doğrulayın</span>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* the vessel */}
            <Reveal delay={0.1} className="lg:col-span-4">
              <div className="relative h-full">
                <div className="sticky top-28">
                  <DilutionVessel
                    solution={solutionNeeded}
                    water={waterNeeded}
                    target={targetVolume}
                    abv={96}
                  />
                  <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-mute">
                    Şekil 2 — Seyreltme haznesi · 50 L ölçekli
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── CoA verification ─────────────────────────────── */}
        <section id="analiz" className="scroll-mt-24 border-y border-ink/20 bg-paper-deep/60">
          <div className="mx-auto max-w-[1240px] px-5 py-20 sm:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <Reveal>
                  <SectionMark n="04" title="Şeffaflık & güvenilirlik" />
                  <h2 className="display mt-6 text-[clamp(2.2rem,4.4vw,3.4rem)] font-black">
                    Parti analiz sertifikası <span className="italic text-ember">(CoA)</span> doğrulama
                  </h2>
                  <p className="mt-4 max-w-[56ch] text-[15px] leading-[1.8] text-ink/75">
                    Kutunuzun üzerindeki lot numarasını girerek laboratuvar kromatografi ve saflık
                    verilerini anında görüntüleyin.
                  </p>
                </Reveal>

                <Reveal delay={0.06}>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-mute" />
                      <input
                        value={lotInput}
                        onChange={(e) => setLotInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && lookupLot(lotInput)}
                        placeholder="Örn: DLM-96-2026-B4"
                        aria-label="Lot numarası"
                        className="field pl-10"
                      />
                    </div>
                    <button
                      onClick={() => lookupLot(lotInput)}
                      className="flex items-center justify-center gap-2 bg-ink px-7 py-3.5 text-paper transition-colors hover:bg-ember"
                    >
                      {lotState.status === "loading" ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Search className="h-4 w-4" />
                      )}
                      <span className="label text-paper">Sorgula</span>
                    </button>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="label text-mute">Kayıtlı lotlar:</span>
                    {["DLM-96-2026-B4", "DLM-96-2026-A2", "DLM-96-2025-C7"].map((c) => (
                      <button
                        key={c}
                        onClick={() => {
                          setLotInput(c);
                          lookupLot(c);
                        }}
                        className="border border-ink/25 px-2.5 py-1 font-mono text-[11px] text-ink/70 transition-colors hover:border-ember hover:text-ember"
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </Reveal>

                {/* result states */}
                <div className="mt-8">
                  {lotState.status === "idle" && (
                    <p className="border border-dashed border-ink/25 px-5 py-6 text-[13px] text-mute">
                      Lot numarası girildiğinde akredite laboratuvar kayıtları burada listelenir.
                    </p>
                  )}

                  {lotState.status === "loading" && (
                    <p className="flex items-center gap-2 border border-ink/25 px-5 py-6 font-mono text-[13px] text-mute">
                      <Loader2 className="h-4 w-4 animate-spin" /> Laboratuvar kaydı sorgulanıyor…
                    </p>
                  )}

                  {lotState.status === "error" && (
                    <div className="border-l-4 border-ember bg-paper px-5 py-5">
                      <p className="label text-ember">Kayıt bulunamadı</p>
                      <p className="mt-2 text-[14px] text-ink/80">{lotState.message}</p>
                    </div>
                  )}

                  {lotState.status === "found" && (
                    <motion.div
                      key={lotState.lot.lotCode}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="relative paper-card p-6 sm:p-7"
                    >
                      <div className="absolute -right-4 -top-6">
                        <WaxSeal className="dl-seal h-20 w-20" />
                      </div>
                      <p className="label text-mute">Doğrulanan parti</p>
                      <p className="tnum mt-1 font-mono text-[18px] font-bold text-bottle">
                        {lotState.lot.lotCode} — {lotState.lot.status}
                      </p>
                      <p className="mt-1 font-mono text-[11px] text-mute">
                        Test tarihi {lotState.lot.testDate} · {lotState.lot.method}
                      </p>

                      <div className="mt-6 border-t border-ink/20">
                        {[
                          ["Etil alkol (v/v)", lotState.lot.abv],
                          ["Kalıntı / kül", lotState.lot.residue],
                          ["Uçucu asitlik", lotState.lot.volatileAcidity],
                          ["Ağır metal (Pb/Cd)", lotState.lot.heavyMetals],
                        ].map(([k, v]) => (
                          <div
                            key={k}
                            className="flex items-baseline justify-between gap-4 border-b border-ink/15 py-3"
                          >
                            <span className="label text-mute">{k}</span>
                            <span className="tnum font-mono text-[15px] font-semibold">{v}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              <Reveal delay={0.1} className="lg:col-span-5">
                <div
                  className="relative h-full min-h-[380px] border border-ink/20 p-2"
                  style={{
                    background: "linear-gradient(160deg, #e9d9be, #cdb68f)",
                  }}
                >
                  {coaOk ? (
                    <img
                      src={coaPlate}
                      alt="Mühürlü analiz föyü, büyütme camı ve pipet — arşiv natürmort"
                      className="h-full min-h-[364px] w-full object-cover"
                      onError={() => setCoaOk(false)}
                    />
                  ) : (
                    <div className="flex h-full min-h-[364px] items-center justify-center bg-paper-deep">
                      <WaxSeal className="h-24 w-24" />
                    </div>
                  )}
                  <div className="pointer-events-none absolute inset-2 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
                  <p className="absolute bottom-5 left-5 right-5 label text-paper/85">
                    Şekil 3 — Parti analiz föyü ve mühür
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── process ledger ───────────────────────────────── */}
        <section className="mx-auto max-w-[1240px] px-5 py-20 sm:px-8">
          <Reveal>
            <SectionMark n="05" title="Kapıda kontrollü güvenlik süreci" />
            <h2 className="display mt-6 max-w-[18ch] text-[clamp(2.2rem,4.4vw,3.4rem)] font-black">
              Nasıl çalışır? <span className="italic text-ember">Sıfır risk</span> prensibiyle.
            </h2>
          </Reveal>

          <div className="mt-12 border-t border-ink/25">
            {[
              [
                "01",
                "Sipariş oluşturulur",
                "Ön ödeme yapmadan; 5L, 10L veya 20L paketinizi seçip adres bilgilerinizi girersiniz. Siparişiniz aynı gün güvenlik mühürleriyle paketlenir.",
                PackageCheck,
              ],
              [
                "02",
                "Kapıda kontrol edilir",
                "Kurye kapınıza geldiğinde paketi açabilir, HDPE ambalajın mühürlerini ve hediye test kitinizi bizzat kontrol edebilirsiniz.",
                ShieldCheck,
              ],
              [
                "03",
                "Kapıda güvenle ödenir",
                "Ürünü onayladıktan sonra kuryeye ister nakit, ister kredi kartı ile tek çekim ödeme yaparak teslim alırsınız.",
                CreditCard,
              ],
            ].map(([num, title, body, Icon], i) => {
              const I = Icon as typeof ShieldCheck;
              return (
                <Reveal key={num as string} delay={i * 0.07}>
                  <div className="group grid grid-cols-1 items-start gap-6 border-b border-ink/25 py-8 transition-colors hover:bg-paper-deep/50 lg:grid-cols-12">
                    <div className="flex items-center gap-4 lg:col-span-3">
                      <span className="display tnum text-[clamp(3rem,6vw,4.4rem)] font-black leading-[0.8] text-ember">
                        {num as string}
                      </span>
                      <I className="h-6 w-6 text-bottle" />
                    </div>
                    <h3 className="display text-[26px] font-bold lg:col-span-4">{title as string}</h3>
                    <p className="max-w-[62ch] text-[15px] leading-[1.85] text-ink/75 lg:col-span-5">
                      {body as string}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* package plate */}
          <Reveal delay={0.1}>
            <div className="mt-14 grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
              <div
                className="relative border border-ink/20 p-2 lg:col-span-5"
                style={{ background: "linear-gradient(150deg, #e9d9be, #cdb68f)" }}
              >
                {pkgOk ? (
                  <img
                    src={packagePlate}
                    alt="Mühürlü HDPE bidon — katalog gravürü"
                    className="h-[320px] w-full object-cover"
                    onError={() => setPkgOk(false)}
                  />
                ) : (
                  <div className="flex h-[320px] items-center justify-center bg-paper-deep">
                    <DemlabMark className="h-20 w-20 text-ink/40" />
                  </div>
                )}
              </div>
              <div className="lg:col-span-7">
                <p className="label text-mute">Şekil 4 — Sevkiyat ambalajı</p>
                <h3 className="display mt-3 text-[clamp(1.8rem,3.4vw,2.6rem)] font-bold">
                  Çift katman mühürlü, darbe emici HDPE bidon
                </h3>
                <p className="mt-4 max-w-[58ch] text-[15px] leading-[1.85] text-ink/75">
                  Her ambalaj, sızdırmazlık testinden geçirildikten sonra güvenlik mührü ile kapatılır ve
                  darbe emici kasa içine yerleştirilir. Teslimatta mührü siz açarsınız; kontrol sizde.
                </p>
                <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-4 border-t border-ink/20 pt-6 sm:grid-cols-4">
                  {[
                    ["Sızdırmazlık", "Test edildi"],
                    ["Mühür", "Tek kullanımlık"],
                    ["Kasa", "Darbe emici"],
                    ["Kargo", "81 il"],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <p className="label text-mute">{k}</p>
                      <p className="mt-1 font-mono text-[13px] font-semibold">{v}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ── footer ───────────────────────────────────────── */}
        <footer className="border-t border-bottle-deep bg-bottle-deep text-paper/75">
          <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <div className="flex items-center gap-3">
                  <DemlabMark className="h-10 w-10 text-paper" />
                  <div>
                    <p className="display text-[24px] font-black text-paper">
                      Demla<span className="text-ember-soft">B</span>
                    </p>
                    <p className="label text-paper/70">Demlenme Laboratuvarı</p>
                  </div>
                </div>
                <p className="display mt-6 max-w-[34ch] text-[19px] italic leading-snug text-paper/85">
                  “{REFRAIN}”
                </p>
              </div>

              <div className="lg:col-span-3">
                <p className="label text-ember-soft">Bölümler</p>
                <ul className="mt-4 space-y-2.5">
                  {[
                    ["#fiyatlar", "Fiyat Listesi"],
                    ["#motokurye", "İstanbul Motokurye"],
                    ["#hesaplayici", "Seyreltme Motoru"],
                    ["#analiz", "Parti Sertifikası"],
                  ].map(([href, label]) => (
                    <li key={href}>
                      <a href={href} className="text-[14px] transition-colors hover:text-ember-soft">
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-4">
                <p className="label text-ember-soft">Atölye</p>
                <div className="mt-4 space-y-2 font-mono text-[12px] leading-relaxed">
                  <p>Kadıköy Zanaat Vadisi · İstanbul</p>
                  <p>Mühürlü & parti kontrollü sevkiyat</p>
                  <p className="tnum">Parti hattı: DLM-96</p>
                  <p className="tnum">Sipariş kayıt: 7/24 çevrimiçi</p>
                </div>
                <button
                  onClick={() => {
                    setOrderState({ status: "idle" });
                    setOrderOpen(true);
                  }}
                  className="mt-6 inline-flex items-center gap-2 border border-paper/30 px-5 py-3 transition-colors hover:border-ember-soft hover:bg-ember hover:text-paper"
                >
                  <span className="label">Kapıda ödeme siparişi</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-paper/15 pt-6 sm:flex-row sm:items-center">
              <p className="font-mono text-[11px] text-paper/70">
                © 2026 DemlaB Zanaat Laboratuvarı — Tüm hakları saklıdır.
              </p>
              <p className="font-mono text-[11px] text-paper/60">
                Yalnızca laboratuvar ve zanaat amaçlı kullanım içindir.
              </p>
            </div>
          </div>
        </footer>
      </div>

      {/* ── order modal ────────────────────────────────────── */}
      {orderOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-ink/70 p-4 backdrop-blur-sm sm:items-center"
          onClick={(e) => e.target === e.currentTarget && setOrderOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 26, scale: reduce ? 1 : 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="paper-card relative my-8 w-full max-w-lg p-7 sm:p-9"
          >
            <button
              onClick={() => setOrderOpen(false)}
              aria-label="Kapat"
              className="absolute right-4 top-4 text-mute transition-colors hover:text-ember"
            >
              <X className="h-5 w-5" />
            </button>

            {orderState.status === "done" ? (
              <div className="py-6 text-center">
                <div className="flex justify-center">
                  <WaxSeal className="dl-seal h-28 w-28" />
                </div>
                <h3 className="display mt-6 text-[30px] font-black">Siparişiniz alındı</h3>
                <div className="mx-auto mt-4 max-w-[300px] border border-ink/20 bg-paper-deep/60 px-5 py-3">
                  <p className="label text-mute">Takip kodunuz</p>
                  <p className="tnum font-mono text-[20px] font-bold text-ember">
                    {orderState.orderNo}
                  </p>
                </div>
                <p className="mx-auto mt-5 max-w-[38ch] text-[14px] leading-relaxed text-ink/75">
                  {orderState.courier
                    ? "İstanbul içi motokuryemiz ürününüzü hazırlayıp yola çıkmak üzere. Kapıda kontrollü nakit/kart ödemenizi yapabilirsiniz."
                    : "81 il kargo ekibimiz mühürlü kutunuzu hazırladı. Takip numaranız SMS ile iletilecektir."}
                </p>
                <button
                  onClick={() => setOrderOpen(false)}
                  className="mt-7 w-full bg-ink px-6 py-3.5 text-paper transition-colors hover:bg-ember"
                >
                  <span className="label text-paper">Tamam</span>
                </button>
              </div>
            ) : (
              <form onSubmit={submitOrder} className="space-y-6">
                <div>
                  <SectionMark n="—" title="Kapıda ödeme siparişi" />
                  <h3 className="display mt-4 text-[28px] font-black">Hızlı sipariş formu</h3>
                  <p className="mt-1 text-[13px] text-mute">
                    Ön ödeme gerekmez. Ürünü kapıda kontrol edip ödeyin.
                  </p>
                </div>

                <div className="flex items-baseline justify-between gap-4 border-y border-ink/20 py-4">
                  <div>
                    <p className="font-display text-[18px] font-bold">
                      {selected.volume} Litre %96 çözelti
                    </p>
                    <p className="label text-ember">+ hediye alkol test kiti</p>
                  </div>
                  <p className="tnum font-mono text-[22px] font-bold">
                    {selected.price.toLocaleString("tr-TR")} ₺
                  </p>
                </div>

                <div>
                  <p className="label text-mute">Teslimat yöntemi</p>
                  <div className="mt-2 grid grid-cols-2 gap-3">
                    {[
                      ["courier", "İstanbul motokurye", "Bugün kapınızda", Truck],
                      ["cargo", "81 ile mühürlü kargo", "1–2 iş günü", PackageCheck],
                    ].map(([value, title, sub, Icon]) => {
                      const I = Icon as typeof Truck;
                      const active = deliveryType === value;
                      return (
                        <button
                          type="button"
                          key={value as string}
                          onClick={() => setDeliveryType(value as "courier" | "cargo")}
                          className={`border px-3 py-3 text-left transition-colors ${
                            active
                              ? "border-ember bg-ember/10"
                              : "border-ink/20 hover:border-ink/40"
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <I className={`h-4 w-4 ${active ? "text-ember" : "text-mute"}`} />
                            <span className="text-[13px] font-semibold">{title as string}</span>
                          </span>
                          <span className="label mt-1 block text-mute">{sub as string}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <p className="label text-mute">Kapıda ödeme şekli</p>
                  <div className="mt-2 grid grid-cols-2 gap-3">
                    {[
                      ["door-card", "Kredi kartı", CreditCard],
                      ["door-cash", "Nakit", Banknote],
                    ].map(([value, title, Icon]) => {
                      const I = Icon as typeof Banknote;
                      const active = paymentType === value;
                      return (
                        <button
                          type="button"
                          key={value as string}
                          onClick={() => setPaymentType(value as "door-card" | "door-cash")}
                          className={`flex items-center gap-2 border px-3 py-3 transition-colors ${
                            active
                              ? "border-ember bg-ember/10 font-semibold"
                              : "border-ink/20 hover:border-ink/40"
                          }`}
                        >
                          <I className={`h-4 w-4 ${active ? "text-ember" : "text-mute"}`} />
                          <span className="text-[13px]">{title as string}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="label text-mute" htmlFor="dl-name">
                      Adınız soyadınız
                    </label>
                    <input
                      id="dl-name"
                      required
                      className="field"
                      placeholder="Ahmet Yılmaz"
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="label text-mute" htmlFor="dl-phone">
                      Telefon (kurye teyidi)
                    </label>
                    <input
                      id="dl-phone"
                      required
                      type="tel"
                      className="field"
                      placeholder="05XX XXX XX XX"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="label text-mute" htmlFor="dl-city">
                        İl
                      </label>
                      <input
                        id="dl-city"
                        className="field"
                        value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="label text-mute" htmlFor="dl-district">
                        İlçe
                      </label>
                      <input
                        id="dl-district"
                        className="field"
                        value={form.district}
                        onChange={(e) => setForm({ ...form, district: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="label text-mute" htmlFor="dl-address">
                      Açık adres (kapı / daire no)
                    </label>
                    <textarea
                      id="dl-address"
                      required
                      rows={2}
                      className="field"
                      placeholder="Mahalle, cadde, no, daire…"
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                    />
                  </div>
                </div>

                {orderState.status === "error" && (
                  <p className="border-l-4 border-ember bg-ember/10 px-4 py-3 text-[13px] text-ink/80">
                    {orderState.message}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={orderState.status === "sending"}
                  className="flex w-full items-center justify-center gap-2 bg-ember px-6 py-4 text-paper transition-colors hover:bg-ink disabled:opacity-70"
                >
                  {orderState.status === "sending" && (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  )}
                  <span className="label text-paper">
                    Siparişi onayla — {selected.price.toLocaleString("tr-TR")} ₺ kapıda öde
                  </span>
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}
