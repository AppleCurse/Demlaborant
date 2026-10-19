import Link from "next/link";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import InquiryForm from "@/components/InquiryForm";
import FAQSection from "@/components/FAQSection";
import {
  ShieldCheck,
  FileCheck2,
  Truck,
  ArrowRight,
  Sparkles,
  FlaskConical,
  Flame,
  Boxes,
  Award
} from "lucide-react";

export default function HomePage() {
  const featuredProduct = products.find((p) => p.slug === "96-laboratuvar-cozeltisi-ozel-fermantasyon") || products[0];
  const featuredProducts = products.filter((p) => p.isFeatured);

  return (
    <main className="space-y-16 sm:space-y-24 pb-20">
      {/* 1. Hero Section - Masif Meşe ve Amber Işık Atmosferi */}
      <section className="relative overflow-hidden pt-12 sm:pt-20 pb-16 sm:pb-24 px-4 sm:px-8 border-b border-[#3a2113]">
        {/* Loş Işık & Meşe Vinyet Efekti */}
        <div className="absolute inset-0 bg-radial from-[#d8892f]/10 via-transparent to-black/60 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Sol Kolon: Başlık ve Açıklamalar */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2d180d] border border-[#e59840]/40 text-[#f3bd68] text-xs font-bold tracking-wider shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-[#e59840]" />
              <span>DEMLAB • ZANAAT & ÖZEL FERMANTASYON ATÖLYESİ</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#fff5ea] font-serif leading-[1.12]">
              Meşe Dokusu, Zanaat Damıtma & <span className="amber-title">%96 Özel Fermantasyon</span> Çözeltileri
            </h1>

            <p className="text-sm sm:text-base text-[#d8c2ad] max-w-2xl leading-relaxed">
              Özel fermantasyon prosesleriniz, biyokimyasal kültürler ve hassas botanik ekstraksiyonlar için özel olarak optimize edilmiş yüksek saflıkta çözeltiler. Mühürlü ambalajında, lot analiz sertifikalarıyla kapınıza teslim.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 btn-amber font-bold text-sm px-6 py-3.5 rounded-xl transition active:scale-[0.98]"
              >
                <span>Fermantasyon Kataloğu</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/calculator"
                className="inline-flex items-center gap-2 bg-[#25140b] hover:bg-[#341d10] text-[#f5dfce] border border-[#e59840]/30 font-semibold text-sm px-6 py-3.5 rounded-xl transition"
              >
                Dozaj & Alkol Hesaplayıcı
              </Link>
            </div>

            {/* Güven Rozetleri */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#3e2315] text-xs text-[#cbb29c]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#e59840] shrink-0" />
                <span>%100 Analitik Saflık</span>
              </div>
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-[#d8892f] shrink-0" />
                <span>Onaylı CoA & TDS</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#f3bd68] shrink-0" />
                <span>Mühürlü Hızlı Getirim</span>
              </div>
            </div>
          </div>

          {/* Sağ Kolon: Vitrin Kartı */}
          <div className="lg:col-span-5">
            <div className="oak-card p-6 sm:p-8 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-gradient-to-l from-[#d8892f] to-[#b3691d] text-white text-[11px] font-black px-4 py-1.5 rounded-bl-2xl uppercase tracking-widest shadow">
                ÖZEL ÜRÜN
              </div>

              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-lg bg-[#e59840]/20 flex items-center justify-center text-[#f3bd68] border border-[#e59840]/30">
                  <Flame className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#e59840]">
                  Fermantasyon Serisi
                </span>
              </div>

              <h3 className="text-xl font-bold text-[#fef5ec] font-serif mb-2 leading-snug">
                {featuredProduct.name}
              </h3>
              <p className="text-xs text-[#cbb29c] mb-5 leading-relaxed">
                {featuredProduct.shortDescription}
              </p>

              {/* 5L, 10L, 20L Özel Fiyat Tablosu */}
              <div className="space-y-2.5 mb-6">
                {featuredProduct.packagingOptions.map((opt, i) => (
                  <div
                    key={i}
                    className="p-3 bg-[#180d07]/90 rounded-xl border border-[#442616] hover:border-[#e59840]/50 transition flex justify-between items-center text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <Boxes className="w-4 h-4 text-[#d8892f]" />
                      <span className="text-[#f7ede2] font-semibold">{opt.size}</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="font-mono font-black text-sm text-[#f3bd68]">
                        {opt.price.toLocaleString("tr-TR")} ₺
                      </span>
                      <span className="text-[10px] text-[#937b68]">+KDV</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex gap-3">
                <Link
                  href={`/products/${featuredProduct.slug}`}
                  className="w-full text-center btn-amber font-bold py-3 rounded-xl text-xs shadow-md transition active:scale-[0.98]"
                >
                  Hemen Sipariş Ver & İncele →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Zanaat Değerleri (Meşe, Damıtma, Saflık) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#e59840] mb-2 block">
            DEMLAB Standartları
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#fef5ec] font-serif">
            Neden DEMLAB Zanaat Çözümleri?
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#c6ad97] leading-relaxed">
            Meşe fıçı ortamlarından analitik laboratuvara kadar her damlada saflık, tutarlılık ve şeffaflık.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="oak-card p-6 rounded-2xl relative">
            <div className="text-3xl font-black text-[#3e2315] absolute top-4 right-4 font-serif">01</div>
            <div className="w-10 h-10 rounded-xl bg-[#2d180d] text-[#e59840] border border-[#e59840]/30 flex items-center justify-center mb-4">
              <FlaskConical className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-[#fef5ec] mb-1 font-serif">Özel Fermantasyon</h4>
            <p className="text-xs text-[#c6ad97] leading-relaxed">
              Özel fermantasyon ve biyokimyasal reaksiyonlar için optimum pH, sıfır tortu ve kontrollü saflık profili.
            </p>
          </div>

          <div className="oak-card p-6 rounded-2xl relative">
            <div className="text-3xl font-black text-[#3e2315] absolute top-4 right-4 font-serif">02</div>
            <div className="w-10 h-10 rounded-xl bg-[#2d180d] text-[#e59840] border border-[#e59840]/30 flex items-center justify-center mb-4">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-[#fef5ec] mb-1 font-serif">%96 Analitik Derece</h4>
            <p className="text-xs text-[#c6ad97] leading-relaxed">
              Gaz kromatografisi (GC) ile test edilmiş, buharlaşma kalıntısı minimum seviyede yüksek saflık güvencesi.
            </p>
          </div>

          <div className="oak-card p-6 rounded-2xl relative">
            <div className="text-3xl font-black text-[#3e2315] absolute top-4 right-4 font-serif">03</div>
            <div className="w-10 h-10 rounded-xl bg-[#2d180d] text-[#e59840] border border-[#e59840]/30 flex items-center justify-center mb-4">
              <Boxes className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-[#fef5ec] mb-1 font-serif">Meşe & Fıçı Uyumluluğu</h4>
            <p className="text-xs text-[#c6ad97] leading-relaxed">
              Meşe fıçı maserasyonları ve botanik ekstraktlarda doğal terpen ve aroma dengesini bozmayan özel yapı.
            </p>
          </div>

          <div className="oak-card p-6 rounded-2xl relative">
            <div className="text-3xl font-black text-[#3e2315] absolute top-4 right-4 font-serif">04</div>
            <div className="w-10 h-10 rounded-xl bg-[#2d180d] text-[#e59840] border border-[#e59840]/30 flex items-center justify-center mb-4">
              <Truck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-[#fef5ec] mb-1 font-serif">Mühürlü Ambalaj</h4>
            <p className="text-xs text-[#c6ad97] leading-relaxed">
              5L, 10L ve 20L kilitli güvenlik kapaklı HDPE kaplarda, sızdırmaz parti mührüyle hızlı adrese sevkiyat.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Öne Çıkan Ürünler Vitrini */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#e59840] mb-1 block">
              Zanaat Kataloğu
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#fef5ec] font-serif">
              Fermantasyon & Çözelti Seçenekleri
            </h3>
            <p className="text-xs text-[#c6ad97] mt-1">
              Fermantasyon ve laboratuvar çalışmaları için özenle seçilmiş ürünler.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#f3bd68] bg-[#2d180d] hover:bg-[#3d2213] border border-[#e59840]/30 px-4 py-2.5 rounded-xl transition shadow-sm"
          >
            <span>Tüm Koleksiyonu Gör ({products.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      {/* 4. Dozaj & Fıçı Hesaplayıcı Bannerı */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="oak-card p-8 sm:p-12 rounded-3xl border border-[#e59840]/35 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="max-w-xl space-y-3 relative z-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#e59840]">
              Akıllı Mühendislik Aracı
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#fff4ea] font-serif">
              Meşe Fıçı & Fermantasyon Dozaj Hesaplayıcı
            </h3>
            <p className="text-xs sm:text-sm text-[#d6bda6] leading-relaxed">
              Fıçı veya fermantör hacminize göre tam su ve %96 çözelti oranını saniyeler içinde hesaplayın. İstenen dereceye göre kayıpsız seyreltme yapın.
            </p>
          </div>

          <Link
            href="/calculator"
            className="btn-amber font-bold text-sm px-7 py-4 rounded-xl shrink-0 shadow-lg"
          >
            Hesaplayıcıyı Başlat →
          </Link>
        </div>
      </section>

      {/* 5. Kurumsal Teklif & SSS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7">
          <InquiryForm defaultProduct={featuredProduct.name} />
        </div>
        <div className="lg:col-span-5">
          <FAQSection />
        </div>
      </section>
    </main>
  );
}
