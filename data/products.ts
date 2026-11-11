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
  casNo?: string;
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
    slug: "demlab-9-cozelti-1l",
    name: "DEMLAB 9° Çözelti (1 L Denemelik & Numunelik)",
    category: "Özel Çözeltiler",
    shortDescription: "Özel formülasyonlarınızı ve reçetelerinizi test etmeniz için 1 litrelik emniyet kilitli amber cam şişede denemelik numune ambalajı.",
    description:
      "Özel fermantasyon prosesleriniz, biyokimyasal kültürler ve hassas botanik ekstraksiyonlar için özel olarak optimize edilmiş %9 özel çözelti. 1 litrelik numunelik boyutu ile reçete denemeleri ve laboratuvar analizleri için idealdir.",
    image: "/images/product-1l-amber.jpg",
    appearance: "Renksiz, berrak, homojen akışkan sıvı",
    purity: "%9.0 v/v",
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
      "Derece": "%9.0 v/v (20°C)",
      "Kullanım Amacı": "Özel Fermantasyon & Ekstraksiyon Prosesleri",
      "Görünüm": "Berrak, tortusuz, homojen sıvı",
      "Ambalaj Türü": "Kilitli emniyet kapaklı amber cam şişe"
    },
    applications: [
      "Reçete testleri ve küçük ölçekli denemeler",
      "Özel fermantasyon prosesleri ve biyokimyasal kültür ortamları",
      "Bitkisel özütleme, tentür ve aktif bileşen ekstraksiyonu",
      "Atölye ve laboratuvar proseslerinde kontrollü kullanım"
    ],
    safetyNotes: [
      "Güvenlik Bilgi Formu'ndaki kullanım ve depolama talimatlarını izleyiniz.",
      "Çocukların erişemeyeceği, iyi havalandırılan bir ortamda orijinal ambalajında saklayınız.",
      "Göz ve cilt temasından kaçınınız; temas hâlinde bol suyla durulayınız."
    ],
    isFeatured: true
  },
  {
    slug: "demlab-9-cozelti-5l",
    name: "DEMLAB 9° Çözelti (5 L Standart Bidon)",
    category: "Özel Çözeltiler",
    shortDescription: "Atölye ve laboratuvar tipi düzenli çalışmalar için 5 litrelik kilitli emniyet kapaklı mühürlü HDPE bidon.",
    description:
      "Özel fermantasyon çalışmaları, botanik ekstraksiyon prosesleri ve analitik laboratuvar uygulamaları için özel olarak formüle edilmiş %9 özel çözelti. Homojen yapısı, kontrollü saflığı ve tortusuz içeriğiyle hassas fermantasyon ortamlarında maksimum verim sağlar.",
    image: "/images/hero-plate.jpg",
    appearance: "Renksiz, berrak, homojen akışkan sıvı",
    purity: "%9.0 v/v",
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
      "Derece": "%9.0 v/v (20°C)",
      "Kullanım Amacı": "Özel Fermantasyon & Ekstraksiyon Prosesleri",
      "Görünüm": "Berrak, tortusuz, homojen sıvı",
      "Ambalaj Türü": "Mühürlü emniyet kapaklı HDPE bidon"
    },
    applications: [
      "Özel fermantasyon prosesleri ve biyokimyasal kültür ortamları",
      "Bitkisel özütleme, tentür ve aktif bileşen ekstraksiyonu",
      "Atölye ve laboratuvar proseslerinde kontrollü kullanım",
      "Meşe fıçı maserasyonları ve botanik ekstrakt hazırlama"
    ],
    safetyNotes: [
      "Güvenlik Bilgi Formu'ndaki kullanım ve depolama talimatlarını izleyiniz.",
      "Çocukların erişemeyeceği, iyi havalandırılan bir ortamda orijinal ambalajında saklayınız.",
      "Göz ve cilt temasından kaçınınız; temas hâlinde bol suyla durulayınız."
    ],
    isFeatured: true
  },
  {
    slug: "demlab-9-cozelti-10l",
    name: "DEMLAB 9° Çözelti (10 L Atölye Bidonu)",
    category: "Özel Çözeltiler",
    shortDescription: "Orta ölçekli üretimler ve sürekli prosesler için 10 litrelik çift tutma kulplu, sızdırmaz mühürlü HDPE ambalaj.",
    description:
      "Özel fermantasyon çalışmaları, botanik ekstraksiyon prosesleri ve zanaat atölyeleri için optimize edilmiş %9 özel çözelti. Orijinal güvenlik kilitli HDPE ambalajında güvenli teslimat.",
    image: "/images/product-10l-hdpe.jpg",
    appearance: "Renksiz, berrak, homojen akışkan sıvı",
    purity: "%9.0 v/v",
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
      "Derece": "%9.0 v/v (20°C)",
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
      "Güvenlik Bilgi Formu'ndaki kullanım ve depolama talimatlarını izleyiniz.",
      "Çocukların erişemeyeceği, iyi havalandırılan bir ortamda orijinal ambalajında saklayınız.",
      "Göz ve cilt temasından kaçınınız; temas hâlinde bol suyla durulayınız."
    ],
    isFeatured: true
  },
  {
    slug: "demlab-9-cozelti-20l",
    name: "DEMLAB 9° Çözelti (20 L Ağır Hizmet Sanayi Bidonu)",
    category: "Özel Çözeltiler",
    shortDescription: "Yüksek hacimli tüketim ve seri zanaat üretimi için 20 litrelik güçlendirilmiş ağır hizmet tipi mühürlü HDPE bidon.",
    description:
      "Büyük ölçekli ekstraksiyon, meşe fıçı maserasyonları ve sürekli prosesler için %9 özel çözelti. Orijinal parti analiz sertifikası (CoA) ve sızdırmaz mühürlü güvenlik kapağı ile teslim edilir.",
    image: "/images/product-20l-hdpe.jpg",
    appearance: "Renksiz, berrak, homojen akışkan sıvı",
    purity: "%9.0 v/v",
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
      "Derece": "%9.0 v/v (20°C)",
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
      "Güvenlik Bilgi Formu'ndaki kullanım ve depolama talimatlarını izleyiniz.",
      "Çocukların erişemeyeceği, iyi havalandırılan bir ortamda orijinal ambalajında saklayınız.",
      "Göz ve cilt temasından kaçınınız; temas hâlinde bol suyla durulayınız."
    ],
    isFeatured: true
  }
];

export const categories = [
  "Tümü",
  "Özel Çözeltiler"
] as const;
