import { Link } from "@tanstack/react-router";
import { Product } from "@/demlab/data/products";
import { Package, FileText, ArrowRight, ShoppingCart, Sparkles } from "lucide-react";
import { useCart } from "@/demlab/context/CartContext";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const defaultOption = product.packagingOptions[0];

  const getBadgeColor = (category: string) => {
    switch (category) {
      case "Özel Fermantasyon":
        return "bg-[#d8892f]/20 text-[#ffd79a] border-[#e59840]/40";
      case "Özel Kimyasallar":
        return "bg-[#9e591b]/25 text-[#f5caa0] border-[#c87930]/35";
      case "Organik Çözücüler":
        return "bg-[#6d3e17]/30 text-[#e9bd97] border-[#8a4e1e]/40";
      default:
        return "bg-[#382012]/40 text-[#dfc3ab] border-[#5a341d]/40";
    }
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (defaultOption) {
      addToCart({
        slug: product.slug,
        name: product.name,
        category: product.category,
        size: defaultOption.size,
        price: defaultOption.price,
      });
    }
  };

  return (
    <article className="group relative flex flex-col oak-card rounded-2xl transition-all duration-300 overflow-hidden">
      {product.images?.[0] && (
        <Link
          to="/products/$slug"
          params={{ slug: product.slug }}
          className="block overflow-hidden bg-[#f9f8f5]"
          aria-label={`${product.name} görsellerini incele`}
        >
          <img
            src={product.images[0].src}
            alt={product.images[0].alt}
            loading="lazy"
            decoding="async"
            className="aspect-[16/10] w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </Link>
      )}

      {/* Üst Kategori & Durum */}
      <div className="p-5 pb-0 flex items-start justify-between gap-2">
        <span className={`inline-block text-[11px] font-semibold px-2.5 py-1 rounded-full border ${getBadgeColor(product.category)}`}>
          {product.category}
        </span>
        {product.casNo && (
          <span className="text-[11px] text-[#bda189] font-mono bg-[#180d07] px-2 py-0.5 rounded border border-[#3e2315]">
            CAS: {product.casNo}
          </span>
        )}
      </div>

      {/* Başlık & Açıklama */}
      <div className="p-5 flex-1 flex flex-col">
        <Link to="/products/$slug" params={{ slug: product.slug }} className="focus:outline-none">
          <h3 className="text-base font-bold text-[#fef5ec] group-hover:text-[#f3bd68] transition-colors line-clamp-2 font-serif">
            {product.name}
          </h3>
        </Link>
        <p className="mt-2 text-xs text-[#c6ad97] line-clamp-2 leading-relaxed flex-1">
          {product.shortDescription || product.description}
        </p>

        {/* Ambalaj Seçenekleri Özeti */}
        <div className="mt-4 pt-3 border-t border-[#3e2315] flex flex-wrap gap-1.5">
          {product.packagingOptions.map((opt, i) => (
            <span
              key={i}
              className="text-[10px] bg-[#1a0e08] text-[#d6b89e] px-2 py-0.5 rounded border border-[#442616]"
            >
              {opt.size}
            </span>
          ))}
        </div>
      </div>

      {/* Alt Fiyat & Eylem */}
      <div className="p-5 pt-3 bg-[#160c07]/80 border-t border-[#3e2315] flex items-center justify-between gap-3">
        <div>
          <span className="block text-[10px] uppercase tracking-wider text-[#a88d77]">Başlangıç</span>
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-black text-[#f3bd68]">
              {product.basePrice.toLocaleString("tr-TR")} ₺
            </span>
            <span className="text-[10px] text-[#8f7560]">+KDV</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleQuickAdd}
            className="p-2.5 rounded-xl bg-[#2d180d] hover:bg-[#3d2213] text-[#f3bd68] border border-[#e59840]/30 transition active:scale-95 shadow-sm"
            title="Hızlı Sepete Ekle"
            aria-label="Sepete Ekle"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
          <Link
            to="/products/$slug" params={{ slug: product.slug }}
            className="inline-flex items-center gap-1 btn-amber text-xs font-bold px-3.5 py-2.5 rounded-xl shadow-sm"
          >
            <span>İncele</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
