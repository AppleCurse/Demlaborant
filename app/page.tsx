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
  CheckCircle2,
  Boxes,
  Award,
  CreditCard,
  Clock,
  Phone,
  Zap,
  CheckCircle
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

          {/* Sağ Kolon: Kullanıcının Özel Ürünü Vitrin Kartı */}
          <div className="lg:col-span-5">
            <div className="oak-card p-6 sm:p-7 rounded-3xl relative overflow-hidden shadow-2xl border border-[#e59840]/35">
              <div className="absolute top-0 right-0 bg-gradient-to-l from-[#d8892f] to-[#b3691d] text-white text-[11px] font-black px-4 py-1.5 rounded-bl-2xl uppercase tracking-widest shadow z-10">
                FLAGSHIP 96°
              </div>

              {/* Ürün Görseli */}
              <div className="relative h-48 -mx-6 -mt-6 sm:-mx-7 sm:-mt-7 mb-5 overflow-hidden border-b border-[#3e2315] bg-[#0c0603] group">
                <img
                  src={featuredProduct.image}
                  alt={featuredProduct.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#140b06] via-transparent to-transparent opacity-80 pointer-events-none" />
                <div className="absolute bottom-3 left-4 flex items-center gap-2">
                  <span className="text-[11px] font-bold text-[#ffd79a] bg-[#1a0e08]/90 px-3 py-1 rounded-full border border-[#e59840]/40 backdrop-blur-md shadow">
                    %96 Özel Fermantasyon Serisi
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-[#e59840]/20 flex items-center justify-center text-[#f3bd68] border border-[#e59840]/30">
                  <Flame className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#e59840]">
                  Zanaat & Ekstraksiyon
                </span>
              </div>

              <h3 className="text-xl font-bold text-[#fef5ec] font-serif mb-2 leading-snug">
                {featuredProduct.name}
              </h3>
              <p className="text-xs text-[#cbb29c] mb-5 leading-relaxed">
                {featuredProduct.shortDescription}
              </p>

              {/* 5L, 10L, 20L Özel Fiyat Tablosu */}
              <div className="space-y-2 mb-5">
                {featuredProduct.packagingOptions.map((opt, i) => (
                  <div
                    key={i}
                    className="p-2.5 bg-[#180d07]/90 rounded-xl border border-[#442616] hover:border-[#e59840]/50 transition flex justify-between items-center text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <Boxes className="w-3.5 h-3.5 text-[#d8892f]" />
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

              <div className="pt-1 flex gap-3">
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

      {/* 4. İstanbul İçi 7/24 Özel Motokurye Servisi */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="oak-card rounded-3xl overflow-hidden border border-[#e59840]/35 grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Sol: Orijinal Kurye Posteri */}
          <div className="lg:col-span-5 relative min-h-[320px] bg-[#0c0603] flex items-center justify-center p-4">
            <img
              src="/images/courier-poster-demlab.jpg"
              alt="DEMLAB İstanbul İçi 7/24 Motokurye"
              className="w-full h-full max-h-[420px] object-contain rounded-2xl shadow-2xl"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Sağ: Kurye Detayları ve Ödeme Avantajları */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2d180d] border border-[#e59840]/40 text-[#f3bd68] text-xs font-bold w-fit">
              <Zap className="w-3.5 h-3.5 text-[#e59840]" />
              <span>İSTANBUL İÇİ 7/24 EKSPRES MOTOKURYE</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-extrabold text-[#fff5ea] font-serif leading-tight">
              Gündüz, Gece, Yağmurlu Fark Etmez: <br />
              <span className="amber-title">Mühürlü Kutuda Kapınızda</span>
            </h3>

            <p className="text-xs sm:text-sm text-[#d6bda6] leading-relaxed">
              Acil laboratuvar ve zanaat ihtiyaçlarınız için İstanbul genelinde 7 gün 24 saat kesintisiz motokurye sevkiyatı. Özel korumalı, dışarıdan içeriği görünmeyen çift mühürlü ambalajında güvenli teslimat.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-[#180d07] rounded-xl border border-[#3e2315] flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-[#e59840] shrink-0" />
                <div>
                  <div className="text-xs font-bold text-[#fef5ec]">Kapıda Mobil POS</div>
                  <div className="text-[11px] text-[#9b806b]">Kredi Kartı / Temassız</div>
                </div>
              </div>

              <div className="p-3 bg-[#180d07] rounded-xl border border-[#3e2315] flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-[#f3bd68] shrink-0" />
                <div>
                  <div className="text-xs font-bold text-[#fef5ec]">Mühürlü Gizli Kutu</div>
                  <div className="text-[11px] text-[#9b806b]">Sızdırmaz & Tam Güvenlik</div>
                </div>
              </div>

              <div className="p-3 bg-[#180d07] rounded-xl border border-[#3e2315] flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#d8892f] shrink-0" />
                <div>
                  <div className="text-xs font-bold text-[#fef5ec]">7/24 Nöbetçi Kurye</div>
                  <div className="text-[11px] text-[#9b806b]">Gece & Yağmurlu Sevk</div>
                </div>
              </div>

              <div className="p-3 bg-[#180d07] rounded-xl border border-[#3e2315] flex items-center gap-3">
                <Boxes className="w-5 h-5 text-[#e59840] shrink-0" />
                <div>
                  <div className="text-xs font-bold text-[#fef5ec]">Nakit & Havale Kolaylığı</div>
                  <div className="text-[11px] text-[#9b806b]">Hızlı Sipariş Onayı</div>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="https://wa.me/905300000000?text=Merhaba,%207/24%20acil%20kurye%20hakkinda%20bilgi%20almak%20istiyorum."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 btn-amber font-bold text-xs px-5 py-3 rounded-xl shadow-md"
              >
                <span>7/24 Kurye Çağır & WhatsApp</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <Link
                href="/products/96-laboratuvar-cozeltisi-ozel-fermantasyon"
                className="inline-flex items-center gap-2 bg-[#25140b] hover:bg-[#341d10] text-[#f5dfce] border border-[#e59840]/30 font-semibold text-xs px-5 py-3 rounded-xl transition"
              >
                Ürünü Seç ve Sipariş Ver
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Masalı Bırak, Dereceye Bak: Analitik Güvence */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#e59840] mb-1 block">
            Analitik Güvence & Laboratuvar Hassasiyeti
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#fef5ec] font-serif">
            Masalı Bırak, Dereceye Bak
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#c6ad97] leading-relaxed">
            96°’de laf değil, dansimetre ve gaz kromatografisi konuşur. Her partimiz bağımsız analiz sertifikalıdır.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Sol Kolon: Blueprint Kampanya Posteri */}
          <div className="lg:col-span-6">
            <div className="oak-card p-4 rounded-3xl overflow-hidden border border-[#e59840]/40 shadow-2xl group">
              <img
                src="/images/blueprint-campaign-poster.jpg"
                alt="DEMLAB Blueprint - Masalı Bırak Dereceye Bak"
                className="w-full h-auto rounded-2xl group-hover:scale-[1.02] transition-transform duration-500"
                loading="lazy"
              />
            </div>
          </div>

          {/* Sağ Kolon: Hidrometre Makro & Analiz Değerleri */}
          <div className="lg:col-span-6 space-y-6">
            <div className="oak-card p-4 rounded-3xl overflow-hidden border border-[#3e2315] relative">
              <img
                src="/images/coa-plate.jpg"
                alt="DEMLAB 96 Derece Hidrometre Dansimetre Doğrulaması"
                className="w-full h-64 sm:h-72 object-cover rounded-2xl"
                loading="lazy"
              />
              <div className="absolute bottom-6 left-6 right-6 bg-[#180d07]/95 p-4 rounded-xl border border-[#e59840]/40 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-[#f3bd68] font-mono">20°C KALİBRE HİDROMETRE</div>
                    <div className="text-[11px] text-[#cbb29c]">Net %96.0 - %96.4 Hacimsel Yoğunluk</div>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-[#2e180d] text-[#e59840] font-black text-xs border border-[#e59840]/30 font-mono">
                    0.806 g/cm³
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-4 bg-[#1b0f08] rounded-2xl border border-[#3e2315] flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#e59840] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#fef5ec]">Sıfır Uçucu Olmayan Kalıntı</h4>
                  <p className="text-[11px] text-[#baa08b] mt-0.5">
                    Buharlaşma sonrası tortu bırakmayan ultra saf yapı sayesinde fermantasyonunuzda istenmeyen tat ve koku oluşmaz.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-[#1b0f08] rounded-2xl border border-[#3e2315] flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#e59840] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#fef5ec]">Lot Analiz Sertifikası (CoA) Eşliğinde</h4>
                  <p className="text-[11px] text-[#baa08b] mt-0.5">
                    Her siparişinizde ilgili partiye ait gaz kromatografisi analiz değerleri ve parti numarası yer alır.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Dozaj & Fıçı Hesaplayıcı Bannerı */}
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

      {/* 7. Simya & Zanaat Hikayesi */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="oak-card rounded-3xl overflow-hidden border border-[#e59840]/30 grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-5 p-4 sm:p-6 bg-[#0a0502] flex justify-center">
            <img
              src="/images/fairy-alchemy-story.png"
              alt="DEMLAB Simya ve Dönüşüm Hikayesi"
              className="w-full max-w-md h-auto rounded-2xl shadow-2xl"
              loading="lazy"
            />
          </div>

          <div className="lg:col-span-7 p-6 sm:p-12 space-y-5">
            <span className="text-xs font-bold uppercase tracking-widest text-[#e59840] block">
              Zanaatın Kadim Felsefesi
            </span>

            <h3 className="text-2xl sm:text-4xl font-extrabold text-[#fff5ea] font-serif leading-tight">
              Masallarda Kurbağa Prense... <br />
              <span className="amber-title">Demlab ile Dönüşüm Senin Ellerinde</span>
            </h3>

            <p className="text-xs sm:text-sm text-[#d6bda6] leading-relaxed">
              Gerçek ustalık; en doğru bileşenleri sabır, tutku ve kusursuz bir oranla bir araya getirmektir. DEMLAB olarak meşe fıçılardan laboratuvar deney tüplerine kadar uzanan bu yolculukta, her zanaatkârın en saf yapı taşı olmayı hedefliyoruz.
            </p>

            <div className="pt-2">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 btn-amber font-bold text-xs px-6 py-3.5 rounded-xl shadow-md"
              >
                <span>Tüm Ürün Koleksiyonunu İncele</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Kurumsal Teklif & SSS */}
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
