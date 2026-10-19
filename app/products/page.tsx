"use client";

import { useState } from "react";
import { products, categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Search, Filter, Sparkles } from "lucide-react";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Tümü");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategory === "Tümü" || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.casNo && p.casNo.includes(searchQuery));
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-16 space-y-10">
      {/* Başlık Bölümü */}
      <div className="border-b border-[#3e2315] pb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#e59840]">
              DEMLAB Zanaat Kataloğu
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#fff5ea] font-serif mt-1">
              Özel Fermantasyon, Ekstraksiyon & Çözelti Çözümleri
            </h1>
            <p className="text-xs sm:text-sm text-[#c6ad97] mt-2 max-w-2xl leading-relaxed">
              Özel fermantasyon prosesleriniz, botanik ekstrakt ve meşe fıçı uygulamalarınız için analiz sertifikalı yüksek saflıkta çözelti serisi.
            </p>
          </div>

          <div className="text-xs text-[#a98f7b] font-medium">
            Toplam <span className="text-[#f3bd68] font-bold">{filteredProducts.length}</span> ürün listeleniyor
          </div>
        </div>

        {/* Filtre ve Arama Çubuğu */}
        <div className="mt-8 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          {/* Arama Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#8f7561] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="%96 çözelti, terpen, CAS no veya ürün ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border border-[#442616] bg-[#190d07] text-[#f7ede2] focus:outline-none focus:border-[#e59840] transition"
            />
          </div>

          {/* Kategori Sekmeleri */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-3.5 py-2 rounded-xl font-semibold whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? "btn-amber shadow-sm"
                    : "bg-[#1f1109] text-[#cbb29c] hover:bg-[#2d180d] border border-[#3e2315]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Ürün Listesi */}
      {filteredProducts.length === 0 ? (
        <div className="oak-card text-center py-20 rounded-3xl space-y-4">
          <Sparkles className="w-12 h-12 text-[#e59840] mx-auto opacity-70" />
          <h3 className="text-lg font-bold text-[#fef5ec] font-serif">Aramanızla Eşleşen Ürün Bulunamadı</h3>
          <p className="text-xs text-[#a98f7b] max-w-md mx-auto">
            Farklı bir arama terimi deneyebilir veya özel reçeteniz için doğrudan teknik ekibimizle iletişime geçebilirsiniz.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("Tümü");
              setSearchQuery("");
            }}
            className="text-xs font-semibold text-[#f3bd68] underline"
          >
            Filtreleri Temizle
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}
