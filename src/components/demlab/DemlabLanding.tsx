import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  FlaskConical,
  PackageCheck,
  Truck,
  Sun,
  Moon,
  Plus,
  Minus,
  Check,
  Calculator,
} from "lucide-react";
import { useCart } from "@/demlab/context/CartContext";
import { products } from "@/demlab/data/products";

const image = (name: string) => `/images/demlab/${name}.webp`;
const product = products.find((p) => p.slug === "96-laboratuvar-cozeltisi-ozel-fermantasyon")!;
const campaigns = [
  { name: "story", title: "Dönüşümün hikâyesi" },
  { name: "manifesto", title: "Demlab manifestosu" },
  { name: "campaign", title: "96 derece" },
  { name: "precision", title: "Hassasiyetin estetiği" },
  { name: "courier-comparison", title: "Gündüzden geceye" },
];
const questions = [
  [
    "Demlab 96° hangi uygulamalar için uygundur?",
    "Laboratuvar çalışmaları, teknik prosesler ve botanik ekstraksiyon uygulamaları için sunulur. Ürünün prosesinize uygunluğunu teknik veri ve güvenlik bilgi formlarıyla değerlendirin. Doğrudan gıda olarak tüketilmez.",
  ],
  [
    "İstanbul içi teslimat nasıl planlanır?",
    "10 L ambalaj için İstanbul içi motokurye seçeneğini iletişim ekibimizle görüşebilirsiniz. Bölge, stok ve kurye uygunluğuna göre teslimat zamanı sipariş onayında netleştirilir.",
  ],
  [
    "Parti analiz belgesine nasıl ulaşabilirim?",
    "Ambalajınızdaki lot numarasıyla Kalite & Analiz sayfasından belge talep edebilirsiniz. Bu sayfadaki kampanya görselleri temsilidir; analiz belgesi yerine geçmez.",
  ],
  [
    "Hangi ambalaj seçenekleri mevcut?",
    "5 L, 10 L ve 20 L seçeneklerini inceleyebilir, ihtiyacınıza uygun ambalajı sepete ekleyebilirsiniz. Fiyatlara KDV ve teslimat bedeli ödeme aşamasında eklenir.",
  ],
];

export default function DemlabLanding() {
  const [night, setNight] = useState(true);
  const [size, setSize] = useState(1);
  const [faq, setFaq] = useState<number | null>(0);
  const [campaign, setCampaign] = useState(0);
  const { addToCart } = useCart();
  const selected = product.packagingOptions[size] ?? product.packagingOptions[0]!;
  const activeCampaign = campaigns[campaign] ?? campaigns[0]!;
  return (
    <main className="premium-home" id="top">
      <section className="premium-hero">
        <div className="premium-hero-art">
          <img
            src={image("laboratory")}
            alt="Siyah mühürlü laboratuvar ambalajı ve cam ölçüm ekipmanı"
            fetchPriority="high"
          />
          <div className="hero-art-shade" />
        </div>
        <div className="premium-container hero-content">
          <div className="eyebrow">
            <span /> DEMLAB 96° · LABORATUVAR SERİSİ
          </div>
          <h1>
            Masalı bırak.
            <br />
            Dereceye <em>bak.</em>
          </h1>
          <p className="hero-subtitle">96’da saf. 96’da net.</p>
          <p className="hero-description">
            Hassasiyetin bilimle, saflığın özenle buluştuğu yer.
            <br className="desktop-break" /> Çalışmalarınız için yüksek saflıkta laboratuvar
            çözeltisi.
          </p>
          <div className="hero-buttons">
            <a className="premium-button" href="#koleksiyon">
              Koleksiyonu Keşfet <ArrowUpRight size={18} />
            </a>
            <Link className="premium-text-link" to="/documents">
              Kaliteyi İncele <ArrowRight size={17} />
            </Link>
          </div>
          <div className="hero-proof">
            <ShieldCheck size={19} />
            <span>Mühürlü ambalaj</span>
            <i />
            <span>Parti bazlı izlenebilirlik</span>
          </div>
        </div>
        <div className="hero-image-caption">
          <span>ÖZEN HER DETAYDA.</span>
          <strong>
            Demlab <i>96°</i>
          </strong>
          <span>LABORATUVAR & TEKNİK UYGULAMALAR</span>
        </div>
        <div className="hero-bottom">
          <span>SAFLIK BİR DETAY DEĞİL, BAŞLANGIÇ NOKTASI.</span>
          <a href="#standart">
            KEŞFETMEYE DEVAM ET <span>↓</span>
          </a>
        </div>
      </section>

      <section className="premium-trust premium-container" aria-label="Demlab standartları">
        {[
          {
            icon: FlaskConical,
            title: "%96 Konsantrasyon",
            desc: "Teknik ve laboratuvar uygulamaları",
          },
          {
            icon: ShieldCheck,
            title: "Parti İzlenebilirliği",
            desc: "Lot bazlı analiz belgesi talebi",
          },
          { icon: PackageCheck, title: "Güvenlik Mührü", desc: "Kontrollü, özenli ambalajlama" },
          { icon: Truck, title: "Özenli Teslimat", desc: "İstanbul içi motokurye seçeneği" },
        ].map((item) => (
          <div key={item.title}>
            <item.icon size={25} strokeWidth={1.2} />
            <span>
              <strong>{item.title}</strong>
              <small>{item.desc}</small>
            </span>
          </div>
        ))}
      </section>

      <section className="premium-container premium-standard premium-section" id="standart">
        <div className="standard-photo">
          <img
            src={image("purity")}
            alt="96 yüzde işaretli hidrometrenin yakın plan kampanya görseli"
            loading="lazy"
          />
          <div className="photo-label">
            HASSASİYETİN GÖRÜNÜR HÂLİ <span>01 / 96</span>
          </div>
        </div>
        <div className="standard-copy">
          <span className="eyebrow">01 — DEMLAB STANDARDI</span>
          <h2>
            Gerçek dönüşüm,
            <br />
            <em>saflıkla başlar.</em>
          </h2>
          <p>
            Bizim için kalite, yalnızca bir sonuç değil. Doğru hammaddeden özenli ambalajlamaya
            kadar her adımda gösterilen dikkattir.
          </p>
          <p>
            Demlab 96°, laboratuvar ve teknik çalışmalarınızda ihtiyacınız olan tutarlılık için
            tasarlandı. Şeffaf bilgi, izlenebilir partiler ve güvenli sevkiyatla.
          </p>
          <div className="standard-stats">
            <div>
              <strong>
                96<span>%</span>
              </strong>
              <small>v/v konsantrasyon</small>
            </div>
            <div>
              <strong>3</strong>
              <small>farklı ambalaj seçeneği</small>
            </div>
            <div>
              <strong>Lot</strong>
              <small>bazlı izlenebilirlik</small>
            </div>
          </div>
          <Link to="/about" className="premium-text-link">
            Demlab’ı Yakından Tanıyın <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>

      <section className="collection-section premium-section" id="koleksiyon">
        <div className="premium-container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">02 — KOLEKSİYON</span>
              <h2>
                İhtiyacınıza göre.
                <br />
                <em>Aynı özenle.</em>
              </h2>
            </div>
            <Link to="/products" className="premium-text-link">
              Tüm Ürünler <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className="collection-layout">
            <div className="collection-photo">
              <img
                src={image("laboratory")}
                alt="Demlab laboratuvar serisinin temsili ambalaj ve ölçüm ekipmanı"
                loading="lazy"
              />
              <span className="collection-image-note">DEMLAB 96° / TEMSİLİ GÖRSEL</span>
            </div>
            <div className="collection-details">
              <span className="eyebrow">İMZA SERİSİ</span>
              <h3>Demlab 96°</h3>
              <p className="product-type">Yüksek Saflıkta Laboratuvar Çözeltisi</p>
              <p>
                Hassas laboratuvar uygulamaları ve teknik prosesler için. Emniyet kapaklı HDPE
                ambalajda.
              </p>
              <div className="size-label">AMBALAJ SEÇİN</div>
              <div className="size-options">
                {product.packagingOptions.map((p, i) => (
                  <button
                    key={p.size}
                    onClick={() => setSize(i)}
                    aria-pressed={size === i}
                    className={size === i ? "selected" : ""}
                  >
                    {[5, 10, 20][i]} <span>L</span>
                    {size === i && <Check size={13} />}
                  </button>
                ))}
              </div>
              <div className="product-features">
                <span>
                  <Check size={14} /> Mühürlü HDPE ambalaj
                </span>
                <span>
                  <Check size={14} /> Lot numarasıyla takip
                </span>
                {size === 1 && (
                  <span>
                    <Truck size={14} /> İstanbul içi motokurye seçeneği
                  </span>
                )}
              </div>
              <div className="product-price">
                <strong>
                  {selected.price.toLocaleString("tr-TR")} <span>₺</span>
                </strong>
                <small>KDV ve teslimat hariç</small>
              </div>
              <button
                className="premium-button"
                onClick={() =>
                  addToCart({
                    slug: product.slug,
                    name: product.name,
                    category: product.category,
                    size: selected.size,
                    price: selected.price,
                  })
                }
              >
                Sepete Ekle <Plus size={18} />
              </button>
              <Link
                to="/products/$slug"
                params={{ slug: product.slug }}
                className="product-detail-link"
              >
                Ürün detaylarını ve güvenlik bilgilerini incele <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="premium-delivery premium-section" id="teslimat">
        <div className="premium-container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">03 — ŞEHRİN RİTMİNDE</span>
              <h2>
                Gündüz de, gece de.
                <br />
                <em>Aynı özen.</em>
              </h2>
            </div>
            <div className="delivery-tabs" role="group" aria-label="Teslimat görseli">
              <button
                className={!night ? "active" : ""}
                aria-pressed={!night}
                onClick={() => setNight(false)}
              >
                <Sun size={15} /> Gündüz
              </button>
              <button
                className={night ? "active" : ""}
                aria-pressed={night}
                onClick={() => setNight(true)}
              >
                <Moon size={15} /> Gece
              </button>
            </div>
          </div>
          <div className="delivery-scene">
            <img
              src={image(night ? "courier-night" : "courier-day")}
              alt={`Kadıköy’de mühürlü Demlab kutusu teslim eden motokurye, ${night ? "yağmurlu gece" : "gündüz"} temsili sahnesi`}
              loading="lazy"
            />
            <div className="delivery-overlay">
              <span className="eyebrow">KADIKÖY’DEN İSTANBUL’A</span>
              <h3>
                Size ulaşana kadar,
                <br />
                bizim sorumluluğumuz.
              </h3>
              <Link to="/contact" className="premium-text-link">
                Teslimat Bilgisi Alın <ArrowUpRight size={17} />
              </Link>
            </div>
            <span className="scene-location">
              <span /> İSTANBUL · KADIKÖY / {night ? "GECE" : "GÜNDÜZ"}
            </span>
          </div>
          <div className="delivery-notes">
            <span>
              <PackageCheck size={19} /> Mühürlü teslimat
            </span>
            <span>
              <Truck size={19} /> 10 L için motokurye seçeneği
            </span>
            <p>Teslimat süresi ve bölge uygunluğu sipariş onayında netleştirilir.</p>
          </div>
        </div>
      </section>

      <section className="premium-analysis">
        <div className="premium-container analysis-inner">
          <FlaskConical size={40} strokeWidth={1} />
          <div>
            <span className="eyebrow">GÜVEN, ŞEFFAFLIKLA BAŞLAR.</span>
            <h2>
              Sadece söze değil,
              <br />
              <em>analize bakın.</em>
            </h2>
            <p>
              Teknik veriler, güvenlik bilgileri ve parti analiz talepleri.
              <br />
              Çalışmanız için gereken bilgiye tek noktadan ulaşın.
            </p>
          </div>
          <Link to="/documents" className="premium-button outline">
            Belge Merkezine Git <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>

      <section className="premium-container premium-section campaign-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">04 — DEMLAB DÜNYASI</span>
            <h2>
              Bilimden ilham.
              <br />
              <em>Özenden doğan estetik.</em>
            </h2>
          </div>
          <p className="section-aside">
            Saflık, denge ve dönüşüm.
            <br />
            Markamızın görsel hikâyesini keşfedin.
          </p>
        </div>
        <div className="campaign-layout">
          <div className="campaign-preview">
            <a
              href={image(activeCampaign.name)}
              target="_blank"
              rel="noreferrer"
              aria-label={`${activeCampaign.title} görselini tam boyutta aç`}
            >
              <img
                src={image(activeCampaign.name)}
                alt={`Demlab kampanya afişi: ${activeCampaign.title}`}
                loading="lazy"
              />
            </a>
          </div>
          <div className="campaign-list">
            {campaigns.map((c, i) => (
              <button
                key={c.name}
                className={i === campaign ? "active" : ""}
                onClick={() => setCampaign(i)}
                aria-pressed={i === campaign}
              >
                <span>0{i + 1}</span>
                <strong>{c.title}</strong>
                <ArrowUpRight size={20} />
              </button>
            ))}
            <small>
              Kampanya görselleri temsilidir; ürün etiketi veya analiz sertifikası yerine geçmez.
            </small>
          </div>
        </div>
      </section>

      <section className="premium-container premium-faq premium-section">
        <div>
          <span className="eyebrow">AKLINIZDA SORU KALMASIN.</span>
          <h2>
            Bilmek
            <br />
            <em>istedikleriniz.</em>
          </h2>
          <Link to="/contact" className="premium-text-link">
            Bize Ulaşın <ArrowUpRight size={16} />
          </Link>
        </div>
        <div>
          {questions.map(([q, a], i) => (
            <div className="faq-item" key={q}>
              <h3>
                <button
                  aria-expanded={faq === i}
                  aria-controls={`faq-answer-${i}`}
                  onClick={() => setFaq(faq === i ? null : i)}
                >
                  {q}
                  {faq === i ? <Minus size={18} /> : <Plus size={18} />}
                </button>
              </h3>
              <div id={`faq-answer-${i}`} hidden={faq !== i}>
                <p>{a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <div className="premium-calculator premium-container">
        <Calculator size={23} />
        <span>Doğru oran, doğru başlangıç.</span>
        <Link to="/calculator">
          Seyreltme Hesaplayıcı <ArrowUpRight size={16} />
        </Link>
      </div>
      <div className="premium-safety premium-container">
        Yalnızca laboratuvar ve teknik uygulamalar içindir. Doğrudan gıda olarak tüketilmez.
        Alevlenebilir sıvı ve buhardır; ısı ve ateş kaynaklarından uzak tutunuz. Kullanmadan önce
        güvenlik bilgi formunu inceleyiniz.
      </div>
    </main>
  );
}
