export type PackagingOption = {
  size: string;
  price: number;
  inStock: boolean;
};

export type Product = {
  slug: string;
  name: string;
  category: "Özel Çözeltiler";
  shortDescription: string;
  description: string;
  image: string;
  appearance?: string;
  purity?: string;
  basePrice: number;
  packagingOptions: PackagingOption[];
  documents: {
    title: string;
    type: "TDS" | "SDS" | "COA" | "GUIDE";
    size: string;
  }[];
  specifications: Record<string, string>;
  applications: string[];
  safetyNotes: string[];
  isFeatured?: boolean;
};

export const products: Product[] = [
  {
    slug: "demlab-96-cozelti-1l",
    name: "DEMLAB 96° Çözelti (1 L / 1 KG Denemelik & Numunelik)",
    category: "Özel Çözeltiler",
    shortDescription: "Özel formülasyonlarınızı ve reçetelerinizi test etmeniz için 1 litrelik emniyet kilitli amber cam şişede denemelik numune ambalajı.",
    description:
      "Özel fermantasyon prosesleriniz, biyokimyasal kültürler ve hassas botanik ekstraksiyonlar için özel olarak optimize edilmiş %96 teknik laboratuvar çözeltisi. 1 litrelik numunelik boyutu ile reçete denemeleri ve laboratuvar analizleri için idealdir.",
    image: "/images/product-1l-amber.jpg",
    appearance: "Renksiz, berrak, homojen akışkan sıvı",
    purity: "%96.0 v/v Laboratuvar / Teknik Derece",
    basePrice: 450,
    packagingOptions: [
      { size: "1 L Amber Cam Şişe", price: 450, inStock: true }
    ],
    documents: [
      { title: "Teknik Veri Formu (TDS)", type: "TDS", size: "320 KB" },
      { title: "Güvenlik Bilgi Formu (GBF / SDS)", type: "SDS", size: "1.2 MB" },
      { title: "Analiz Sertifikası (CoA Örneği)", type: "COA", size: "250 KB" }
    ],
    specifications: {
      "Konsantrasyon / Saflık": "Min. %96.0 v/v (20°C)",
      "Yoğunluk (20°C)": "0.806 - 0.812 g/cm³",
      "Kullanım Amacı": "Özel Fermantasyon & Ekstraksiyon Prosesleri",
      "Görünüm": "Berrak, tortusuz, homojen sıvı",
      "Ambalaj Türü": "Kilitli emniyet kapaklı amber cam şişe"
    },
    applications: [
      "Reçete testleri ve küçük ölçekli denemeler",
      "Özel fermantasyon prosesleri ve biyokimyasal kültür ortamları",
      "Bitkisel özütleme, tentür ve aktif bileşen ekstraksiyonu",
      "Analitik laboratuvar testleri ve reaktif çözeltisi hazırlama"
    ],
    safetyNotes: [
      "Alevlenebilir sıvı ve buhardır (H225). Açık ateş ve kıvılcım kaynaklarından uzak tutunuz.",
      "İyi havalandırılan ortamlarda muhafaza ediniz ve kullanınız.",
      "Göz ve cilt temasında bol su ile durulayınız."
    ],
    isFeatured: true
  },
  {
    slug: "demlab-96-cozelti-5l",
    name: "DEMLAB 96° Çözelti (5 L / 5 KG Standart Bidon)",
    category: "Özel Çözeltiler",
    shortDescription: "Atölye ve laboratuvar tipi düzenli çalışmalar için 5 litrelik kilitli emniyet kapaklı mühürlü HDPE bidon.",
    description:
      "Özel fermantasyon çalışmaları, botanik ekstraksiyon prosesleri ve analitik laboratuvar uygulamaları için özel olarak formüle edilmiş yüksek saflıkta %96 teknik laboratuvar çözeltisi. Homojen yapısı, kontrollü saflığı ve tortusuz içeriğiyle hassas fermantasyon ortamlarında maksimum verim sağlar.",
    image: "/images/hero-plate.jpg",
    appearance: "Renksiz, berrak, homojen akışkan sıvı",
    purity: "%96.0 v/v Laboratuvar / Teknik Derece",
    basePrice: 1750,
    packagingOptions: [
      { size: "5 L Mühürlü HDPE Bidon", price: 1750, inStock: true }
    ],
    documents: [
      { title: "Teknik Veri Formu (TDS)", type: "TDS", size: "320 KB" },
      { title: "Güvenlik Bilgi Formu (GBF / SDS)", type: "SDS", size: "1.2 MB" },
      { title: "Analiz Sertifikası (CoA Örneği)", type: "COA", size: "250 KB" }
    ],
    specifications: {
      "Konsantrasyon / Saflık": "Min. %96.0 v/v (20°C)",
      "Yoğunluk (20°C)": "0.806 - 0.812 g/cm³",
      "Kullanım Amacı": "Özel Fermantasyon & Ekstraksiyon Prosesleri",
      "Görünüm": "Berrak, tortusuz, homojen sıvı",
      "Ambalaj Türü": "Mühürlü emniyet kapaklı HDPE bidon"
    },
    applications: [
      "Özel fermantasyon prosesleri ve biyokimyasal kültür ortamları",
      "Bitkisel özütleme, tentür ve aktif bileşen ekstraksiyonu",
      "Analitik laboratuvar testleri ve reaktif çözeltisi hazırlama",
      "Meşe fıçı maserasyonları ve botanik ekstrakt hazırlama"
    ],
    safetyNotes: [
      "Alevlenebilir sıvı ve buhardır (H225). Açık ateş, kıvılcım ve yüksek ısı kaynaklarından uzak tutunuz.",
      "İyi havalandırılan ortamlarda muhafaza ediniz ve kullanınız.",
      "Laboratuvar ve teknik prosesler içindir; doğrudan gıda olarak tüketilmez."
    ],
    isFeatured: true
  },
  {
    slug: "demlab-96-cozelti-10l",
    name: "DEMLAB 96° Çözelti (10 L / 10 KG Atölye Bidonu)",
    category: "Özel Çözeltiler",
    shortDescription: "Orta ölçekli üretimler ve sürekli prosesler için 10 litrelik çift tutma kulplu, sızdırmaz mühürlü HDPE ambalaj.",
    description:
      "Özel fermantasyon çalışmaları, botanik ekstraksiyon prosesleri ve zanaat atölyeleri için optimize edilmiş yüksek saflıkta %96 çözelti. Orijinal güvenlik kilitli HDPE ambalajında güvenli teslimat.",
    image: "/images/product-10l-hdpe.jpg",
    appearance: "Renksiz, berrak, homojen akışkan sıvı",
    purity: "%96.0 v/v Laboratuvar / Teknik Derece",
    basePrice: 3000,
    packagingOptions: [
      { size: "10 L Mühürlü HDPE Bidon", price: 3000, inStock: true }
    ],
    documents: [
      { title: "Teknik Veri Formu (TDS)", type: "TDS", size: "320 KB" },
      { title: "Güvenlik Bilgi Formu (GBF / SDS)", type: "SDS", size: "1.2 MB" },
      { title: "Analiz Sertifikası (CoA Örneği)", type: "COA", size: "250 KB" }
    ],
    specifications: {
      "Konsantrasyon / Saflık": "Min. %96.0 v/v (20°C)",
      "Yoğunluk (20°C)": "0.806 - 0.812 g/cm³",
      "Kullanım Amacı": "Özel Fermantasyon & Ekstraksiyon Prosesleri",
      "Görünüm": "Berrak, tortusuz, homojen sıvı",
      "Ambalaj Türü": "Mühürlü emniyet kapaklı 10L HDPE bidon"
    },
    applications: [
      "Orta ölçekli zanaat atölye üretimleri",
      "Büyük hacimli botanik maserasyon ve ekstraksiyon",
      "Özel fermantasyon ortamları ve analitik prosesler"
    ],
    safetyNotes: [
      "Alevlenebilir sıvı ve buhardır (H225). Açık ateşten ve statik elektrikten uzak tutunuz.",
      "İyi havalandırılan ortamlarda depolayınız."
    ],
    isFeatured: true
  },
  {
    slug: "demlab-96-cozelti-20l",
    name: "DEMLAB 96° Çözelti (20 L / 20 KG Ağır Hizmet Sanayi Bidonu)",
    category: "Özel Çözeltiler",
    shortDescription: "Yüksek hacimli tüketim ve seri zanaat üretimi için 20 litrelik güçlendirilmiş ağır hizmet tipi mühürlü HDPE bidon.",
    description:
      "Büyük ölçekli ekstraksiyon, meşe fıçı maserasyonları ve sürekli prosesler için yüksek saflıkta %96 çözelti. Orijinal parti analiz sertifikası (CoA) ve sızdırmaz mühürlü güvenlik kapağı ile teslim edilir.",
    image: "/images/product-20l-hdpe.jpg",
    appearance: "Renksiz, berrak, homojen akışkan sıvı",
    purity: "%96.0 v/v Laboratuvar / Teknik Derece",
    basePrice: 5500,
    packagingOptions: [
      { size: "20 L Ağır Hizmet HDPE Bidon", price: 5500, inStock: true }
    ],
    documents: [
      { title: "Teknik Veri Formu (TDS)", type: "TDS", size: "320 KB" },
      { title: "Güvenlik Bilgi Formu (GBF / SDS)", type: "SDS", size: "1.2 MB" },
      { title: "Analiz Sertifikası (CoA Örneği)", type: "COA", size: "250 KB" }
    ],
    specifications: {
      "Konsantrasyon / Saflık": "Min. %96.0 v/v (20°C)",
      "Yoğunluk (20°C)": "0.806 - 0.812 g/cm³",
      "Kullanım Amacı": "Yüksek Hacimli Zanaat & Laboratuvar Prosesleri",
      "Görünüm": "Berrak, tortusuz, homojen sıvı",
      "Ambalaj Türü": "20L Ağır Hizmet Mühürlü HDPE Bidon"
    },
    applications: [
      "Büyük ölçekli ekstraksiyon tesisleri ve atölyeler",
      "Seri fermantasyon ve fıçı dinlendirme prosesleri",
      "Sürekli analitik laboratuvar tedariki"
    ],
    safetyNotes: [
      "Alevlenebilir sıvı ve buhardır (H225).",
      "Statik elektrik topraklaması olan ortamlarda transfer edilmelidir.",
      "Orijinal mühürlü ambalajında serin yerde muhafaza ediniz."
    ],
    isFeatured: true
  }
];

export const categories = [
  "Tümü",
  "Özel Çözeltiler"
] as const;
