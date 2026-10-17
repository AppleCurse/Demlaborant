import { useState } from "react";
import { Product, PackagingOption } from "@/demlab/data/products";
import {
  FileText,
  Download,
  Package,
  ShieldCheck,
  CheckCircle,
  Truck,
  ShoppingCart,
  CreditCard,
  Building,
  Info,
  Clock,
  Sparkles
} from "lucide-react";
import { useCart } from "@/demlab/context/CartContext";
import InquiryForm from "./InquiryForm";

export default function ProductDetails({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [selectedPackaging, setSelectedPackaging] = useState<PackagingOption>(
    product.packagingOptions[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"buy" | "inquiry">("buy");

  const handleAddToCart = () => {
    addToCart(
      {
        slug: product.slug,
        name: product.name,
        category: product.category,
        size: selectedPackaging.size,
        price: selectedPackaging.price,
      },
      quantity
    );
  };

  const totalPrice = selectedPackaging.price * quantity;
  const vatTotal = Math.round(totalPrice * 0.20);
  const grandTotal = totalPrice + vatTotal;

  return (
    <div className="space-y-12">
      {/* Üst Başlık Bölümü - Meşe Mahzen Işıltısı */}
      <div className="oak-card rounded-3xl p-6 sm:p-10 relative overflow-hidden border border-[#e59840]/35">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="bg-[#e59840]/20 text-[#ffd79a] border border-[#e59840]/40 text-xs font-semibold px-3 py-1 rounded-full">
              {product.category}
            </span>
            {product.casNo && (
              <span className="text-xs font-mono bg-[#180d07] text-[#cbb29c] px-3 py-1 rounded-full border border-[#3e2315]">
                CAS No: {product.casNo}
              </span>
            )}
            {product.purity && (
              <span className="text-xs bg-[#d8892f]/20 text-[#f3bd68] border border-[#e59840]/40 px-3 py-1 rounded-full">
                Saflık: {product.purity}
              </span>
            )}
            <span className="text-xs bg-[#2d180d] text-[#e0cbba] border border-[#442616] px-3 py-1 rounded-full flex items-center gap-1">
              <Truck className="w-3 h-3 text-[#e59840]" />
              <span>Mühürlü Hızlı Getirim</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-[#fff5ea] font-serif leading-tight">
            {product.name}
          </h1>

          <p className="text-sm sm:text-base text-[#d8c2ad] leading-relaxed">
            {product.description}
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs text-[#baa08b]">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#e59840]" />
              <span>Orijinal Mühürlü Laboratuvar Bidonu</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#f3bd68]" />
              <span>Aynı Gün Kargoya / Sevkiyata Teslim</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <CreditCard className="w-4 h-4 text-[#d8892f]" />
              <span>3D Güvenli Ödeme & Havale</span>
            </span>
          </div>
        </div>
      </div>

      {/* İki Kolonlu Detay Alanı */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sol Kolon - Spesifikasyonlar & Dokümanlar */}
        <div className="lg:col-span-7 space-y-8">
          {/* Teknik Spesifikasyonlar */}
          <section className="oak-card rounded-2xl p-6 sm:p-8">
            <h2 className="text-lg font-bold text-[#fef5ec] font-serif mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-[#e59840]" />
              <span>Teknik Spesifikasyonlar & Analiz Değerleri</span>
            </h2>
            <div className="divide-y divide-[#3e2315] border border-[#3e2315] rounded-xl overflow-hidden bg-[#180d07]">
              {Object.entries(product.specifications).map(([key, value], idx) => (
                <div
                  key={key}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between p-3.5 text-xs ${
                    idx % 2 === 0 ? "bg-[#180d07]" : "bg-[#201109]"
                  }`}
                >
                  <span className="font-semibold text-[#f0ded0]">{key}</span>
                  <span className="text-[#f3bd68] font-mono mt-1 sm:mt-0">{value}</span>
                </div>
              ))}
              {product.appearance && (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 text-xs bg-[#180d07]">
                  <span className="font-semibold text-[#f0ded0]">Görünüm & Form</span>
                  <span className="text-[#d8c0ad]">{product.appearance}</span>
                </div>
              )}
            </div>
          </section>

          {/* Kullanım Alanları */}
          <section className="oak-card rounded-2xl p-6 sm:p-8">
            <h2 className="text-lg font-bold text-[#fef5ec] font-serif mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-[#e59840]" />
              <span>Kullanım Alanları ve Fermantasyon Prosesleri</span>
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {product.applications.map((app, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-[#d8c2ad] bg-[#1a0e08] p-3 rounded-xl border border-[#3e2315]">
                  <div className="w-2 h-2 rounded-full bg-[#e59840] mt-1 shrink-0" />
                  <span>{app}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Güvenlik Notları */}
          <section className="bg-[#24130a] border border-[#522d18] rounded-2xl p-6 sm:p-8">
            <h2 className="text-base font-bold text-[#ffd79a] font-serif mb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#e59840]" />
              <span>İş Güvenliği & Muhafaza Şartları</span>
            </h2>
            <ul className="space-y-2 text-xs text-[#d6bda7]">
              {product.safetyNotes.map((note, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="font-bold text-[#e59840]">•</span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Dokümanlar */}
          <section id="dokumanlar" className="oak-card rounded-2xl p-6 sm:p-8">
            <h2 className="text-lg font-bold text-[#fef5ec] font-serif mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#e59840]" />
              <span>Resmi Analiz ve Güvenlik Belgeleri</span>
            </h2>
            <div className="space-y-3">
              {product.documents.map((doc, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3.5 rounded-xl border border-[#3e2315] bg-[#180d07] hover:border-[#e59840]/50 transition group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded bg-[#2c170d] text-[#f3bd68] border border-[#e59840]/30 font-bold text-[10px]">
                      {doc.type}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#fef5ec] group-hover:text-[#f3bd68] transition">
                        {doc.title}
                      </div>
                      <div className="text-[11px] text-[#9a7f6a]">Boyut: {doc.size} | PDF</div>
                    </div>
                  </div>

                  <a
                    href={`/docs/${product.slug}-${doc.type.toLowerCase()}.pdf`}
                    download
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#f3bd68] bg-[#24140c] hover:bg-[#341d11] border border-[#e59840]/30 px-3 py-1.5 rounded-lg transition"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>İndir</span>
                  </a>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sağ Kolon - Satın Alma Paneli */}
        <div className="lg:col-span-5 sticky top-24 space-y-4">
          <div className="oak-card rounded-3xl p-6 sm:p-8 shadow-2xl">
            {/* Sekme Seçimi */}
            <div className="flex rounded-xl bg-[#180d07] p-1 mb-6 border border-[#3e2315]">
              <button
                onClick={() => setActiveTab("buy")}
                className={`flex-1 text-xs font-bold py-2 rounded-lg transition flex items-center justify-center gap-1.5 ${
                  activeTab === "buy"
                    ? "bg-[#2d180d] text-[#f3bd68] border border-[#e59840]/40 shadow-sm"
                    : "text-[#a88d77] hover:text-[#f0ded0]"
                }`}
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Online Sipariş Ver</span>
              </button>
              <button
                onClick={() => setActiveTab("inquiry")}
                className={`flex-1 text-xs font-bold py-2 rounded-lg transition flex items-center justify-center gap-1.5 ${
                  activeTab === "inquiry"
                    ? "bg-[#2d180d] text-[#f3bd68] border border-[#e59840]/40 shadow-sm"
                    : "text-[#a88d77] hover:text-[#f0ded0]"
                }`}
              >
                <Building className="w-3.5 h-3.5" />
                <span>Özel / Toptan Teklif</span>
              </button>
            </div>

            {activeTab === "buy" ? (
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-[#f7ede2] mb-2 font-serif">
                    1. Ambalaj Seçeneğini Belirleyin:
                  </label>
                  <div className="grid grid-cols-1 gap-2.5">
                    {product.packagingOptions.map((opt) => (
                      <button
                        key={opt.size}
                        onClick={() => setSelectedPackaging(opt)}
                        className={`p-3.5 rounded-xl border text-left transition flex items-center justify-between ${
                          selectedPackaging.size === opt.size
                            ? "border-[#e59840] bg-[#e59840]/15 ring-1 ring-[#e59840]"
                            : "border-[#3e2315] hover:border-[#5a341e] bg-[#180d07]"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Package className={`w-4 h-4 ${selectedPackaging.size === opt.size ? "text-[#f3bd68]" : "text-[#8e7460]"}`} />
                          <div>
                            <div className="text-xs font-bold text-[#fef5ec] font-serif">{opt.size}</div>
                            <div className="text-[10px] text-[#e59840] font-medium">Mühürlü Stok • Adrese Teslim</div>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-sm font-black text-[#f3bd68]">
                            {opt.price.toLocaleString("tr-TR")} ₺
                          </span>
                          <span className="text-[10px] text-[#967f6c] block">+KDV</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Adet Seçimi */}
                <div>
                  <label className="block text-xs font-bold text-[#f7ede2] mb-2 font-serif">
                    2. Sipariş Adedi:
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-[#442616] rounded-xl overflow-hidden bg-[#180d07]">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-4 py-2 hover:bg-[#2c170d] text-[#cbb29c] font-bold"
                      >
                        -
                      </button>
                      <span className="px-4 py-2 text-sm font-bold text-[#fef5ec] bg-[#22130b] min-w-[40px] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-4 py-2 hover:bg-[#2c170d] text-[#cbb29c] font-bold"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-xs text-[#baa08a]">
                      Toplam: <strong className="text-[#f3bd68]">{(totalPrice).toLocaleString("tr-TR")} ₺</strong> (+KDV)
                    </div>
                  </div>
                </div>

                {/* Fiyat Özeti */}
                <div className="bg-[#180d07] p-4 rounded-xl space-y-2 text-xs border border-[#3e2315]">
                  <div className="flex justify-between text-[#c6ad97]">
                    <span>Ürün Bedeli</span>
                    <span className="text-[#f7ede2] font-semibold">{totalPrice.toLocaleString("tr-TR")} ₺</span>
                  </div>
                  <div className="flex justify-between text-[#c6ad97]">
                    <span>KDV (%20)</span>
                    <span>{vatTotal.toLocaleString("tr-TR")} ₺</span>
                  </div>
                  <div className="flex justify-between text-[#c6ad97]">
                    <span>Kapıya Getirim</span>
                    <span className="text-[#f3bd68] font-bold">
                      {totalPrice > 5000 ? "ÜCRETSİZ" : "Standart Kargo"}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-extrabold text-[#fef5ec] pt-2 border-t border-[#3e2315]">
                    <span>Ödenecek Tutar</span>
                    <span className="text-[#f3bd68] text-lg font-black">{grandTotal.toLocaleString("tr-TR")} ₺</span>
                  </div>
                </div>

                {/* Satın Alma Butonu */}
                <button
                  onClick={handleAddToCart}
                  className="w-full inline-flex items-center justify-center gap-2 btn-amber font-bold py-3.5 px-6 rounded-xl shadow-lg transition active:scale-[0.99] text-sm"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Sepete Ekle & Adresime Getir</span>
                </button>

                <div className="text-[11px] text-[#8e7460] text-center space-y-1">
                  <div>🔒 256-Bit SSL ve 3D Güvenli Ödeme</div>
                  <div>🚚 Orijinal güvenlik mührüyle hızlı adrese sevkiyat</div>
                </div>
              </div>
            ) : (
              <InquiryForm defaultProduct={product.name} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
