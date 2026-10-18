import productLineupImage from "@/assets/demlab-96-pack-lineup.webp";
import product5LImage from "@/assets/demlab-96-pack-5l.webp";
import product5LPortraitImage from "@/assets/demlab-96-pack-5l-portrait.webp";
import product20LImage from "@/assets/demlab-96-pack-20l.jpg";
import glasswareImage from "@/assets/demlab-96-glassware.jpg";
import certificateImage from "@/assets/demlab-analysis-certificate.jpg";
import labHandlingImage from "@/assets/demlab-lab-handling.jpg";

export type PackagingOption = {
  size: string;
  price: number; // TL cinsinden KDV hariç veya dahil birim fiyat
  inStock: boolean;
};

export type ProductImage = {
  src: string;
  alt: string;
  caption: string;
};

export type Product = {
  slug: string;
  name: string;
  category: "Endüstriyel Temizlik" | "Organik Çözücüler" | "Kozmetik & Esans Hammaddeleri" | "Özel Kimyasallar";
  shortDescription: string;
  description: string;
  casNo?: string;
  appearance?: string;
  purity?: string;
  basePrice: number; // En küçük ambalaj başlangıç fiyatı
  packagingOptions: PackagingOption[];
  documents: {
    title: string;
    type: "TDS" | "SDS" | "COA" | "GUIDE";
    size: string;
  }[];
  specifications: Record<string, string>;
  applications: string[];
  safetyNotes: string[];
  images?: ProductImage[];
  isFeatured?: boolean;
};

export const products: Product[] = [
  {
    slug: "endustriyel-yuzey-temizleyici",
    name: "Endüstriyel Ağır Kir & Yağ Çözücü Yüzey Temizleyici",
    category: "Endüstriyel Temizlik",
    shortDescription: "Sanayi tesisleri, talaşlı imalat, oto servis ve ağır makine temizliğinde yüksek konsantrasyonlu alkali temizleyici.",
    description:
      "Formülündeki özel yüzey aktif maddeler ve korozyon inhibitörleri sayesinde metal, beton ve seramik zeminlerde birikmiş mineral yağları, karbonlaşmış kirleri ve gres kalıntılarını hızla parçalar. Otomat makineleri ve basınçlı yıkama sistemleri ile tam uyumludur.",
    appearance: "Şeffaf, hafif sarımsı berrak sıvı",
    purity: "%100 Aktif Bileşen Konsantresi",
    basePrice: 420,
    packagingOptions: [
      { size: "5 L Endüstriyel Bidon", price: 420, inStock: true },
      { size: "20 L HDPE Bidon", price: 1450, inStock: true },
      { size: "210 L Saç/Plastik Varil", price: 13200, inStock: true },
      { size: "1000 L IBC Konteyner", price: 54000, inStock: true },
    ],
    documents: [
      { title: "Teknik Veri Formu (TDS)", type: "TDS", size: "380 KB" },
      { title: "Güvenlik Bilgi Formu (GBF / SDS)", type: "SDS", size: "1.2 MB" },
      { title: "Endüstriyel Uygulama & Seyreltme Kılavuzu", type: "GUIDE", size: "640 KB" },
    ],
    specifications: {
      "pH (Konsantre)": "12.5 ± 0.5",
      "Yoğunluk (20°C)": "1.08 ± 0.02 g/cm³",
      "Çözünürlük": "Su ile her oranda homojen karışır",
      "Köpük Özelliği": "Kontrollü düşük köpük",
      "Biyolojik Parçalanabilirlik": "> %90 (OECD 301E standartlarına uygun)"
    },
    applications: [
      "Fabrika ve atölye zeminlerinin günlük ve periyodik derin temizliği",
      "Talaşlı imalat sonrası metal parça üzerindeki yağ alma prosesleri",
      "Gıda dışı üretim hatlarının bakım ve revizyon temizliği",
      "Baskı silindirleri ve matbaa ekipmanlarının dış temizliği"
    ],
    safetyNotes: [
      "Alkali yapıdadır; kullanım sırasında koruyucu gözlük ve nitril eldiven takılmalıdır.",
      "Asidik ürünlerle veya klorlu ağartıcılarla kesinlikle karıştırmayınız.",
      "Göz ve cilt temasında bol su ile durulayınız."
    ],
    isFeatured: true,
  },
  {
    slug: "organik-cozucu-izopropanol",
    name: "İzopropil Alkol (IPA) %99.9 Saf Teknik / Sanayi Tipi",
    category: "Organik Çözücüler",
    shortDescription: "Elektronik temizlik, matbaa, reçine çözme ve yüzey dezenfeksiyonu için yüksek saflıkta organik çözücü.",
    description:
      "Hızlı buharlaşma kabiliyeti ve yüksek çözücülük gücü ile ardında tortu bırakmayan premium saflıkta izopropanol. Optik lensler, hassas elektronik kartlar ve kaplama öncesi yüzey hazırlığı için idealdir.",
    casNo: "67-63-0",
    appearance: "Renksiz, karakteristik alkol kokulu berrak sıvı",
    purity: "%99.9 Min. Teknik Derece",
    basePrice: 165,
    packagingOptions: [
      { size: "1 L Özel Şişe", price: 165, inStock: true },
      { size: "5 L HDPE Bidon", price: 680, inStock: true },
      { size: "20 L HDPE Bidon", price: 2350, inStock: true },
      { size: "160 kg Metal Varil", price: 17500, inStock: true },
      { size: "800 kg IBC", price: 78000, inStock: true },
    ],
    documents: [
      { title: "Teknik Veri Formu (TDS)", type: "TDS", size: "290 KB" },
      { title: "Güvenlik Bilgi Formu (GBF / SDS)", type: "SDS", size: "1.1 MB" },
      { title: "Analiz Sertifikası (CoA Örneği)", type: "COA", size: "220 KB" }
    ],
    specifications: {
      "CAS Numarası": "67-63-0",
      "Molekül Formülü": "C3H8O",
      "Saflık": "≥ %99.9 (GC)",
      "Kaynama Noktası": "82.5 °C",
      "Yoğunluk (20°C)": "0.785 - 0.786 g/cm³",
      "Su Miktarı (Karl Fischer)": "≤ %0.1"
    },
    applications: [
      "PCB devre kartları ve elektronik komponent hassas temizliği",
      "Matbaa sektöründe nemlendirme solventi ve merdane temizliği",
      "Boya ve vernik formülasyonlarında seyreltici ve taşıyıcı faz",
      "Kozmetik ve dezenfektan ara ürün hazırlama"
    ],
    safetyNotes: [
      "Alevlenebilir sıvı ve buhar (H225). Açık ateş ve kıvılcım kaynaklarından uzak tutunuz.",
      "İyi havalandırılan ortamlarda kullanınız; buharını solumaktan kaçınınız.",
      "Statik elektrik yüklenmesine karşı kapları topraklayınız."
    ],
    isFeatured: true,
  },
  {
    slug: "propilen-glikol-usp",
    name: "Propilen Glikol (USP / Kozmetik Derece)",
    category: "Kozmetik & Esans Hammaddeleri",
    shortDescription: "Kozmetik formülasyonlar, koku taşıyıcı sistemler ve nem tutucu uygulamalar için yüksek saflıkta glikol.",
    description:
      "Uluslararası farmasötik ve kozmetik kalite standartlarına uygun, kokusuz, renksiz ve viskoz taşıyıcı hammadde. Parfüm, oda kokusu ve cilt bakım ürünlerinde esansiyel yağların homojen dağılımını sağlar ve nemlendirici etki sunar.",
    casNo: "57-55-6",
    appearance: "Renksiz, kokusuz, berrak viskoz sıvı",
    purity: "%99.8 Min. USP Derecesi",
    basePrice: 220,
    packagingOptions: [
      { size: "1 L Şişe", price: 220, inStock: true },
      { size: "5 L HDPE Bidon", price: 890, inStock: true },
      { size: "25 L HDPE Bidon", price: 3850, inStock: true },
      { size: "215 kg Varil", price: 28500, inStock: true },
      { size: "1050 kg IBC", price: 125000, inStock: true },
    ],
    documents: [
      { title: "Teknik Şartname (TDS)", type: "TDS", size: "320 KB" },
      { title: "Güvenlik Bilgi Formu (GBF / SDS)", type: "SDS", size: "950 KB" },
      { title: "Kozmetik Uygunluk Beyanı", type: "GUIDE", size: "410 KB" }
    ],
    specifications: {
      "CAS Numarası": "57-55-6",
      "Derece": "USP / EP / Kozmetik",
      "Saflık": "≥ %99.8",
      "Yoğunluk (20°C)": "1.036 g/cm³",
      "Kırılma İndisi": "1.432 - 1.434",
      "Ağır Metaller": "< 5 ppm"
    },
    applications: [
      "Parfüm ve ortam kokusu difüzörlerinde taşıyıcı solvent",
      "Cilt losyonları, kremler ve şampuanlarda nemlendirici (humectant)",
      "Gıda aromaları ve esansiyel yağ ekstraksiyonu",
      "Isı transfer akışkanları ve soğutma sistemleri (non-toksik)"
    ],
    safetyNotes: [
      "Oda sıcaklığında, ağzı sıkıca kapalı kaplarda ve nemden uzak saklayınız.",
      "Gıda ve kozmetik üretiminde formül talimatlarına riayet ediniz."
    ],
    isFeatured: true,
  },
  {
    slug: "denature-etanol-kozmetik-sanayi",
    name: "Kozmetik & Parfüm Tipi Denatüre Etanol (%96 v/v)",
    category: "Kozmetik & Esans Hammaddeleri",
    shortDescription: "Kozmetik, kolonya, ortam kokusu ve dezenfektan üretimi için Ege Tepe & Karalar Grup standartlarında resmi denatüre taşıyıcı hammadde.",
    description:
      "Tarımsal kökenli saf alkolden üretilmiş, Tarım ve Orman Bakanlığı ile Sağlık Bakanlığı Kozmetik Yönetmeliği'ne uygun formülasyonda denatüre edilmiş (Bitrex / Tert-bütil alkol denatürantlı) berrak, kokusuzlaştırılmış çözücü ve esans taşıyıcı hammadde. Sadece Sanayi Sicil Belgesi ve Kapasite Raporu ibraz eden kurumsal üreticilere sevk edilir.",
    casNo: "64-17-5",
    appearance: "Renksiz, berrak, homojen akışkan sıvı",
    purity: "%96.0 - %96.5 v/v (Tarımsal Kökenli)",
    basePrice: 1950,
    packagingOptions: [
      { size: "20 L Mühürlü HDPE Bidon", price: 1950, inStock: true },
      { size: "200 L Çelik Varil", price: 16500, inStock: true },
      { size: "1000 L Mühürlü IBC Tanker", price: 74000, inStock: true },
    ],
    documents: [
      { title: "Teknik Veri Formu (TDS)", type: "TDS", size: "340 KB" },
      { title: "Güvenlik Bilgi Formu (GBF / SDS)", type: "SDS", size: "1.4 MB" },
      { title: "Kozmetik Denatürasyon & Analiz Belgesi (CoA)", type: "COA", size: "390 KB" }
    ],
    specifications: {
      "CAS Numarası": "64-17-5",
      "Alkol Derecesi (20°C)": "Min. %96.0 v/v",
      "Yoğunluk (20°C)": "0.805 - 0.810 g/cm³",
      "Denatürasyon Tipi": "Kozmetik Genel Denatürasyon (Bitrex / TBA)",
      "Kalıntı / Uçucu Olmayan": "< %0.002",
      "Tedarik Şartı": "Bakanlık Tahsis İzni / Kapasite Raporu Zorunlu"
    },
    applications: [
      "Parfüm, edt, kolonya ve ortam kokusu difüzör formülasyonları",
      "El ve cilt dezenfektanı ara ürün üretimi",
      "Kozmetik ekstrakt ve bitkisel etken madde ekstraksiyonu",
      "Aerosol ve sprey bazlı kozmetik ürün dolumu"
    ],
    safetyNotes: [
      "Alevlenir sıvı ve buhardır (H225). Kıvılcım, açık alev ve sıcak yüzeylerden uzak tutunuz.",
      "Yalnızca endüstriyel ve kozmetik imalat içindir; içilmez, gıda olarak kullanılamaz.",
      "Kurumsal tahsisat ve mevzuat gereği perakende şahıs satışı kesinlikle yapılmaz."
    ],
    isFeatured: true,
  },
  {
    slug: "sanayi-tipi-ozel-denature-cozucu-alkol",
    name: "Sanayi Tipi Özel Denatüre Çözücü Alkol (Flexo & Matbaa)",
    category: "Organik Çözücüler",
    shortDescription: "Matbaa mürekkepleri, flexo baskı, reçine çözme ve sanayi yüzey hazırlığı için yüksek buharlaşma hızlı teknik çözücü.",
    description:
      "Ambalaj sanayi, fleksografik baskı tesisleri ve vernik üretim prosesleri için Ege Tepe & Karalar Grup normlarına uygun, teknik denatürantlarla stabilize edilmiş solvent sınıfı endüstriyel çözücü. Hızlı kuruma, minimum koku ve yüksek pigment çözünürlüğü sağlar.",
    casNo: "64-17-5",
    appearance: "Renksiz, karakteristik hafif kokulu berrak çözücü",
    purity: "%95 - %96 Teknik Derece Solvent",
    basePrice: 1750,
    packagingOptions: [
      { size: "20 L Mühürlü Bidon", price: 1750, inStock: true },
      { size: "200 L Çelik Varil", price: 15200, inStock: true },
      { size: "1000 L IBC Konteyner", price: 68000, inStock: true },
    ],
    documents: [
      { title: "Teknik Veri Formu (TDS)", type: "TDS", size: "295 KB" },
      { title: "Güvenlik Bilgi Formu (SDS)", type: "SDS", size: "1.2 MB" },
      { title: "Baskı & Çözücü Uygulama Kılavuzu", type: "GUIDE", size: "480 KB" }
    ],
    specifications: {
      "CAS Numarası": "64-17-5",
      "Alkol İçeriği": "Min. %95.5",
      "Buharlaşma Sayısı (Eter=1)": "8.3 (Hızlı kuruma)",
      "Parlama Noktası": "12 °C (Kapalı kap)",
      "Sevkiyat Standardı": "ADR Sınıf 3, UN 1170 Sevk Kodu",
      "Kurumsal Evrak": "Sanayi Sicil & Firma Vergi Levhası Doğrulamalı"
    },
    applications: [
      "Ambalaj ve etiket sektöründe flekso ve tifdruk baskı mürekkepleri seyreltmesi",
      "Boya, cila ve ahşap vernik üretiminde çözücü faz",
      "Oto cam suyu, kışlık antifriz ve silecek kimyasalları imalatı",
      "Endüstriyel parça yıkama ve optik temizleme hatları"
    ],
    safetyNotes: [
      "Ex-proof havalandırmalı sanayi depolama alanlarında muhafaza edilmelidir.",
      "Statik elektrik topraklaması olan paslanmaz tesisatlarda transfer edilmelidir.",
      "Yalnızca sanayi sicil belgeli imalatçı tüzel kişilere sevk edilir."
    ],
    isFeatured: true,
  },
  {
    slug: "96-laboratuvar-cozeltisi-ozel-fermantasyon",
    name: "%96 Laboratuvar Çözeltisi (Özel Fermantasyon Tipi)",
    category: "Özel Kimyasallar",
    shortDescription: "Özel fermantasyon prosesleriniz, biyokimyasal reaksiyonlar ve hassas laboratuvar çalışmaları için yüksek saflıkta %96'lık çözelti.",
    description:
      "Özel fermantasyon çalışmaları, botanik ekstraksiyon prosesleri ve analitik laboratuvar uygulamaları için özel olarak formüle edilmiş yüksek saflıkta %96 teknik laboratuvar çözeltisi. Homojen yapısı, kontrollü saflığı ve tortusuz içeriğiyle hassas fermantasyon ortamlarında maksimum verim sağlar.",
    images: [
      {
        src: product5LImage,
        alt: "Demlab %96 laboratuvar çözeltisi için 5 litrelik mühürlü HDPE ambalaj",
        caption: "5 L mühürlü HDPE bidon",
      },
      {
        src: productLineupImage,
        alt: "Demlab %96 laboratuvar çözeltisinin farklı ambalaj boyları",
        caption: "DemlaB ambalaj serisi · temsili görsel",
      },
      {
        src: product5LPortraitImage,
        alt: "Demlab etiketli beyaz HDPE laboratuvar bidonu",
        caption: "Demlab 96° · laboratuvar çözeltisi",
      },
      {
        src: product20LImage,
        alt: "Demlab %96 laboratuvar çözeltisi için 20 litrelik HDPE bidon",
        caption: "20 L HDPE bidon",
      },
      {
        src: glasswareImage,
        alt: "Demlab 96° etiketli cam şişe ve beher",
        caption: "Cam laboratuvar ekipmanında Demlab 96°",
      },
      {
        src: labHandlingImage,
        alt: "Laborantın eldivenle Demlab 96° işaretli beherde numune ölçümü",
        caption: "Laboratuvarda numune ölçümü",
      },
      {
        src: certificateImage,
        alt: "Mühürlü laboratuvar analiz sertifikası ve numune tüpü",
        caption: "Laboratuvar analiz sertifikası · temsili görsel",
      },
    ],
    casNo: "64-17-5",
    appearance: "Renksiz, berrak, homojen akışkan sıvı",
    purity: "%96.0 v/v Laboratuvar / Teknik Derece",
    basePrice: 1750,
    packagingOptions: [
      { size: "5 L Laboratuvar Bidonu", price: 1750, inStock: true },
      { size: "10 L HDPE Bidon", price: 3000, inStock: true },
      { size: "20 L HDPE Bidon", price: 5500, inStock: true },
    ],
    documents: [
      { title: "Teknik Veri Formu (TDS)", type: "TDS", size: "320 KB" },
      { title: "Güvenlik Bilgi Formu (GBF / SDS)", type: "SDS", size: "1.2 MB" },
      { title: "Analiz Sertifikası (CoA Örneği)", type: "COA", size: "250 KB" },
    ],
    specifications: {
      "Konsantrasyon / Saflık": "Min. %96.0 v/v (20°C)",
      "Yoğunluk (20°C)": "0.806 - 0.812 g/cm³",
      "Kullanım Amacı": "Özel Fermantasyon & Laboratuvar Uygulamaları",
      "Görünüm": "Berrak, tortusuz, homojen sıvı",
      "Ambalaj Türü": "Mühürlü emniyet kapaklı HDPE bidon",
    },
    applications: [
      "Özel fermantasyon prosesleri ve biyokimyasal kültür ortamları",
      "Bitkisel özütleme, tentür ve aktif bileşen ekstraksiyonu",
      "Analitik laboratuvar testleri ve reaktif çözeltisi hazırlama",
      "Koku, aroma ve etken madde taşıyıcı faz uygulamaları",
    ],
    safetyNotes: [
      "Alevlenebilir sıvı ve buhardır (H225). Açık ateş, kıvılcım ve yüksek ısı kaynaklarından uzak tutunuz.",
      "İyi havalandırılan ortamlarda muhafaza ediniz ve kullanınız.",
      "Laboratuvar ve teknik prosesler içindir; doğrudan gıda olarak tüketilmez.",
    ],
    isFeatured: true,
  },
  {
    slug: "d-limonen-dogal-cozucu",
    name: "D-Limonen (Doğal Portakal Terpeni Çözücü)",
    category: "Organik Çözücüler",
    shortDescription: "Biyolojik olarak parçalanabilir, çevre dostu doğal narenciye bazlı ağır katran ve yapışkan sökücü.",
    description:
      "Doğal portakal kabuklarından distilasyonla elde edilen %100 biyolojik solvent. Petrol türevi toksik klorlu çözücülerin yerine çevre dostu yeşil kimya alternatifi olarak asfalt, reçine, yapışkan ve etiket kalıntılarında olağanüstü performans sağlar.",
    casNo: "5989-27-5",
    appearance: "Açık sarı, taze narenciye kokulu sıvı",
    purity: "≥ %95 Terpen Derecesi",
    basePrice: 650,
    packagingOptions: [
      { size: "1 L Şişe", price: 650, inStock: true },
      { size: "5 L Bidon", price: 2900, inStock: true },
      { size: "20 L HDPE Bidon", price: 10500, inStock: true },
      { size: "180 kg Varil", price: 82000, inStock: true },
    ],
    documents: [
      { title: "Teknik Veri Formu (TDS)", type: "TDS", size: "310 KB" },
      { title: "Güvenlik Bilgi Formu (SDS)", type: "SDS", size: "1.0 MB" },
      { title: "Eko-Sertifika Beyanı", type: "GUIDE", size: "180 KB" }
    ],
    specifications: {
      "CAS Numarası": "5989-27-5",
      "Yoğunluk": "0.84 g/cm³",
      "Koku": "Karakteristik güçlü taze narenciye",
      "Parlama Noktası": "48 °C"
    },
    applications: [
      "Asfalt, zift ve katran temizliği",
      "Bant ve yapışkan kalıntılarının sökülmesi",
      "Doğal esans ve oda kokusu formülasyonları",
      "Endüstriyel parça yıkama tankları"
    ],
    safetyNotes: [
      "Doğal narenciye terpenidir; konsantre formda cilt hassasiyetine yol açabilir.",
      "İyi havalandırılan alanda depolanmalıdır."
    ],
    isFeatured: true,
  },
  {
    slug: "gliserin-farma-usp",
    name: "Gliserin %99.7 (Bitkisel Bazlı Farma / USP)",
    category: "Kozmetik & Esans Hammaddeleri",
    shortDescription: "Kozmetik, gıda ve ilaç endüstrisi için %100 saf bitkisel nemlendirici ve tatlandırıcı hammadde.",
    description:
      "Yüksek saflıkta bitkisel yağ asitlerinden rafine edilmiş, renksiz, berrak ve kokusuz USP/EP kalitesinde gliserol. Nem tutucu gücüyle tüm kozmetik ve kişisel bakım formüllerinin ana yapı taşıdır.",
    casNo: "56-81-5",
    appearance: "Renksiz, kokusuz, tatlımsı viskoz şeffaf sıvı",
    purity: "≥ %99.7 Bitkisel Kaynaklı",
    basePrice: 190,
    packagingOptions: [
      { size: "1 L Şişe", price: 190, inStock: true },
      { size: "5 L Bidon", price: 780, inStock: true },
      { size: "30 L Bidon", price: 4200, inStock: true },
      { size: "250 kg Varil", price: 31000, inStock: true },
      { size: "1250 kg IBC", price: 138000, inStock: true },
    ],
    documents: [
      { title: "Teknik Veri Formu (TDS)", type: "TDS", size: "280 KB" },
      { title: "Güvenlik Bilgi Formu (SDS)", type: "SDS", size: "890 KB" },
      { title: "Helal & Koşer Sertifikası", type: "GUIDE", size: "450 KB" }
    ],
    specifications: {
      "CAS Numarası": "56-81-5",
      "Yoğunluk (20°C)": "1.261 g/cm³",
      "Klorürler": "< 10 ppm",
      "Ağır Metaller": "< 5 ppm"
    },
    applications: [
      "Cilt ve saç bakım ürünleri",
      "Diş macunu ve gargara formülasyonları",
      "Sabun yapımı ve köpük stabilizasyonu",
      "Farmasötik şurup ve merhem bazları"
    ],
    safetyNotes: [
      "Kuru, serin ve doğrudan güneş ışığı almayan depolarda saklayınız."
    ],
    isFeatured: false,
  },
  {
    slug: "etildigliserin-trietanolamin",
    name: "Trietanolamin (TEA %85 / %99) Endüstriyel & Kozmetik",
    category: "Özel Kimyasallar",
    shortDescription: "Deterjan, kozmetik, emülsiyon ve tekstil yardımcı kimyasallarında pH ayarlayıcı ve yüzey aktif ajan.",
    description:
      "Tersiyer amin yapısıyla asitleri nötralize ederek suda çözünür sabunlar ve tuzlar oluşturur. Yağ/su emülsiyonlarında mükemmel stabilizatör olarak görev alır ve korozyon önleyici özellikleri bulunur.",
    casNo: "102-71-6",
    appearance: "Açık saman sarısı, hafif viskoz higroskopik sıvı",
    purity: "Min %85 / Min %99 Seçenekleri",
    basePrice: 850,
    packagingOptions: [
      { size: "5 L Bidon", price: 850, inStock: true },
      { size: "25 L Bidon", price: 3800, inStock: true },
      { size: "230 kg Çelik Varil", price: 32000, inStock: true },
      { size: "1100 kg IBC", price: 142000, inStock: true },
    ],
    documents: [
      { title: "Teknik Veri Formu (TDS)", type: "TDS", size: "260 KB" },
      { title: "Güvenlik Bilgi Formu (SDS)", type: "SDS", size: "1.3 MB" }
    ],
    specifications: {
      "CAS Numarası": "102-71-6",
      "pH (%1 sulu çözelti)": "10.5 - 11.5",
      "Parlama Noktası": "> 180 °C",
      "Donma Noktası": "20.5 °C"
    },
    applications: [
      "Kişisel bakım ürünlerinde ve jellerde karbomer nötralizasyonu",
      "Endüstriyel sıvı sabun ve el temizleyicilerde emülgatör",
      "Metal işleme sıvılarında korozyon inhibitörü",
      "Tekstil terbiyesinde yumuşatıcı ara madde"
    ],
    safetyNotes: [
      "Hafif bazik yapılıdır. Göz ile doğrudan temasından kaçınınız.",
      "20°C altında kristalleşebilir; ılık ortamda homojenize edilerek kullanılabilir."
    ],
    isFeatured: false,
  }
];

export const categories = [
  "Tümü",
  "Endüstriyel Temizlik",
  "Organik Çözücüler",
  "Kozmetik & Esans Hammaddeleri",
  "Özel Kimyasallar"
] as const;
