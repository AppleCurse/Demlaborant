import { companyInfo } from "@/data/company";
import { products } from "@/data/products";

export type AssistantAnswer = {
  text: string;
  href?: string;
  linkLabel?: string;
};

function normalize(value: string) {
  return value.toLocaleLowerCase("tr-TR").trim();
}

export function answerQuestion(question: string): AssistantAnswer {
  const query = normalize(question).slice(0, 500);

  if (/(seyrelt|dozaj|su ekle)/.test(query)) {
    return {
      text: "DEMLAB ürünü seyreltilerek farklı dereceler elde edilen bir ürün değildir. Tek formülasyonumuz 9 derecedir ve 1, 5, 10 ve 20 litre ambalajlarda sunulur.",
      href: "/products",
      linkLabel: "9° Ürünü İncele",
    };
  }

  if (/(derece|alkol oranı)/.test(query)) {
    return {
      text: "DEMLAB tek formülasyondur ve 9 derecedir. Farklı derece veya seyreltme seçeneği bulunmaz; yalnızca 1, 5, 10 ve 20 litre ambalaj seçenekleri vardır.",
      href: "/products",
      linkLabel: "9° Ürünü İncele",
    };
  }

  if (/(fiyat|ücret|kaç para|kaç tl|maliyet)/.test(query)) {
    const prices = products.map((product) => {
      const size = product.packagingOptions[0]?.size.split(" ").slice(0, 2).join(" ") ?? product.name;
      return `${size}: ${product.basePrice.toLocaleString("tr-TR")} TL`;
    }).join(", ");
    return {
      text: `Güncel KDV hariç başlangıç fiyatları: ${prices}. Sepette KDV ve varsa teslimat ücreti otomatik hesaplanır.`,
      href: "/products",
      linkLabel: "Ürünleri ve Fiyatları Gör",
    };
  }

  if (/(takip|siparişim|kargom nerede|sipariş no)/.test(query)) {
    return {
      text: "Sipariş takip sayfasında DLM ile başlayan sipariş numaranızı ve siparişte verdiğiniz telefon numarasını birlikte girin. Güncel operasyon durumunu görebilirsiniz.",
      href: "/tracking",
      linkLabel: "Sipariş Takibine Git",
    };
  }

  if (/(kurye|kargo|teslimat|ne zaman gelir|gönderi)/.test(query)) {
    return {
      text: "İstanbul içi siparişlerde motokurye, diğer illerde kargo seçeneği kullanılır. 5.000 TL üzerindeki ürün ara toplamında teslimat ücreti alınmaz; altında 250 TL uygulanır. Kesin teslimat planını operasyon ekibi sipariş sonrasında netleştirir.",
      href: "/products",
      linkLabel: "Sipariş Oluştur",
    };
  }

  if (/(coa|sertifika|analiz|belge|sds|tds|güvenlik formu)/.test(query)) {
    return {
      text: "TDS, SDS ve parti bazlı CoA belgelerini doküman sayfasındaki Talep Et düğmesiyle WhatsApp üzerinden isteyebilirsiniz. Parti kodunuzu mesaja eklemeyi unutmayın.",
      href: "/documents",
      linkLabel: "Belge Merkezine Git",
    };
  }

  if (/(ödeme|kapıda|havale|eft|kredi kart)/.test(query)) {
    return {
      text: "Kapıda kart, kapıda nakit, havale veya EFT ve kurumsal cari ödeme seçenekleri var. Sipariş tamamlanırken size uygun yöntemi seçebilirsiniz.",
      href: "/products",
      linkLabel: "Ürünleri İncele",
    };
  }

  if (/(telefon|iletişim|whatsapp|arama|numara)/.test(query)) {
    return {
      text: `Telefon ve WhatsApp numaramız ${companyInfo.phone}. Satış ve teknik destek için bu kanallardan bize ulaşabilirsiniz.`,
      href: "/contact",
      linkLabel: "İletişim Bilgileri",
    };
  }

  if (/(güvenli|yanıcı|depolama|saklama|tüketil|içil)/.test(query)) {
    return {
      text: "Ürün alevlenebilir sıvı ve buhar içerir. Açık ateş ve kıvılcımdan uzak tutun, iyi havalandırılan serin bir yerde orijinal ambalajında saklayın. Teknik prosesler içindir; doğrudan gıda olarak tüketilmez.",
      href: "/documents",
      linkLabel: "Güvenlik Belgesi Talep Et",
    };
  }

  if (/(1 ?l|5 ?l|10 ?l|20 ?l|ambalaj|ürün|şişe|bidon)/.test(query)) {
    return {
      text: "DEMLAB 9° ürününü 1 litre amber cam şişe ile 5, 10 ve 20 litre mühürlü HDPE bidon seçenekleriyle sunuyoruz. Ürün kartlarından ambalaj ve fiyat detaylarını inceleyebilirsiniz.",
      href: "/products",
      linkLabel: "Ambalajları İncele",
    };
  }

  if (/(merhaba|selam|iyi günler|naber|nasılsın)/.test(query)) {
    return {
      text: "Merhaba, ben DEMLAB sesli asistanım. 9° ürünümüz, fiyatlar, teslimat, belgeler ve sipariş takibi konularında size yardımcı olabilirim.",
    };
  }

  return {
    text: "Size en iyi şekilde yardımcı olmak için sorunuzu ürün derecesi, fiyat, ambalaj, teslimat, belge veya sipariş takibi başlıklarından biriyle yazabilir misiniz? Örneğin: Ürün kaç derece veya 10 litre fiyatı.",
    href: "/contact",
    linkLabel: "Ekibimize Sor",
  };
}
