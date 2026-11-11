import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock3, CreditCard, FileCheck2, MessageCircle, PackageCheck, ShieldCheck, Truck } from "lucide-react";
import QuickShop from "@/components/QuickShop";
import FAQSection from "@/components/FAQSection";
import { companyInfo } from "@/data/company";

export default function HomePage() {
  return (
    <main className="pb-20">
      <section className="relative overflow-hidden border-b border-[#3a2113] px-4 py-12 sm:px-8 sm:py-20">
        <div className="pointer-events-none absolute inset-0 bg-radial from-[#d8892f]/15 via-transparent to-black/60" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#e59840]/40 bg-[#2d180d] px-4 py-2 text-xs font-bold text-[#f3bd68]">
              <PackageCheck className="h-4 w-4" /> TEK FORMÜLASYON • DÖRT AMBALAJ
            </div>
            <h1 className="font-serif text-5xl font-black leading-none text-[#fff5ea] sm:text-7xl lg:text-8xl">
              <span className="amber-title block">96°</span>
              <span className="mt-3 block text-3xl leading-tight sm:text-5xl">DEMLAB Çözelti</span>
            </h1>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-[#d8c2ad] sm:text-base">
              Laboratuvar ve teknik prosesler için yüksek saflıkta çözelti. 1, 5, 10 ve 20 litre orijinal mühürlü ambalajlarda; lot analiz bilgisi ve güvenli teslimatla.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#satin-al" className="btn-amber inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold">Ambalajını Seç <ArrowRight className="h-4 w-4" /></a>
              <a href={`${companyInfo.whatsappUrl}?text=${encodeURIComponent("Merhaba, DEMLAB 96° ürün siparişi için bilgi almak istiyorum.")}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/35 bg-emerald-500/10 px-6 py-3.5 text-sm font-bold text-emerald-300"><MessageCircle className="h-4 w-4" /> WhatsApp Sipariş</a>
            </div>
            <div className="mt-8 grid max-w-xl grid-cols-3 gap-3 text-xs text-[#d8c2ad]">
              <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[#e59840]" /> %96.0 v/v</span>
              <span className="flex items-center gap-2"><FileCheck2 className="h-4 w-4 text-[#e59840]" /> Lot bazlı CoA</span>
              <span className="flex items-center gap-2"><Truck className="h-4 w-4 text-[#e59840]" /> Hızlı teslimat</span>
            </div>
          </div>
          <div className="relative mx-auto h-[360px] w-full max-w-lg sm:h-[470px]">
            <Image src="/images/hero-plate.jpg" alt="DEMLAB 96 derece çözelti ambalajı" fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-contain drop-shadow-[0_25px_55px_rgba(216,137,47,0.22)]" />
          </div>
        </div>
      </section>

      <section id="satin-al" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-14 sm:px-8 sm:py-20">
        <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#e59840]">Hızlı satın alma</span>
            <h2 className="mt-2 font-serif text-3xl font-black text-[#fff5ea] sm:text-4xl">Ambalajını seç, siparişini tamamla</h2>
          </div>
          <p className="max-w-md text-xs leading-relaxed text-[#c6ad97]">Tüm seçenekler aynı 96° üründür. Fiyatlara %20 KDV ve varsa teslimat ücreti sepette eklenir.</p>
        </div>
        <QuickShop />
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="grid overflow-hidden rounded-3xl border border-[#e59840]/30 bg-[#1b0f08] lg:grid-cols-2">
          <div className="p-6 sm:p-10">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#f3bd68]"><Clock3 className="h-4 w-4" /> İstanbul içi teslimat</span>
            <h2 className="mt-4 font-serif text-3xl font-black text-[#fff5ea]">Motokurye ile kapınıza</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#c6ad97]">İstanbul siparişlerinde motokurye, diğer illerde kargo kullanılır. Operasyon ekibi teslimat planını sipariş sonrasında netleştirir.</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-[#3e2315] bg-[#120904] p-4"><Truck className="h-5 w-5 text-[#e59840]" /><strong className="mt-2 block text-sm">Mühürlü teslimat</strong><span className="text-xs text-[#a98f7b]">Sızdırmaz orijinal ambalaj</span></div>
              <div className="rounded-xl border border-[#3e2315] bg-[#120904] p-4"><CreditCard className="h-5 w-5 text-[#e59840]" /><strong className="mt-2 block text-sm">Esnek ödeme</strong><span className="text-xs text-[#a98f7b]">Kapıda kart, nakit veya havale</span></div>
            </div>
          </div>
          <div className="relative min-h-72 bg-[#0c0603]"><Image src="/images/courier-poster-demlab.jpg" alt="DEMLAB İstanbul motokurye teslimatı" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-contain p-4" /></div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-8 sm:py-20 lg:grid-cols-2">
        <div className="oak-card rounded-3xl p-6 sm:p-8">
          <FileCheck2 className="h-8 w-8 text-[#e59840]" />
          <h2 className="mt-4 font-serif text-2xl font-black text-[#fff5ea]">Belgeler ürünle birlikte</h2>
          <p className="mt-3 text-sm leading-relaxed text-[#c6ad97]">Yüklenmiş CoA ve SDS PDF’lerini lot numarasıyla belge merkezinden indirin. Henüz yüklenmemiş belgeler için ekibimize doğrudan talep gönderin.</p>
          <Link href="/documents" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#f3bd68]">Belge merkezine git <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <FAQSection />
      </section>
    </main>
  );
}
