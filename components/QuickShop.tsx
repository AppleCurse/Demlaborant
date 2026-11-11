"use client";

import Image from "next/image";
import { MessageCircle, ShoppingCart } from "lucide-react";
import { track } from "@vercel/analytics";
import { products } from "@/data/products";
import { companyInfo } from "@/data/company";
import { useCart } from "@/context/CartContext";

export default function QuickShop() {
  const { addToCart } = useCart();

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => {
        const option = product.packagingOptions[0];
        const volume = option.size.split(" ").slice(0, 2).join(" ");
        const message = `Merhaba, DEMLAB 96° ${volume} ambalaj için hızlı sipariş vermek istiyorum. Liste fiyatı: ${product.basePrice.toLocaleString("tr-TR")} TL + KDV. Adet: 1. Teslimat ve ödeme bilgisi alabilir miyim?`;
        const whatsappUrl = `${companyInfo.whatsappUrl}?text=${encodeURIComponent(message)}`;

        return (
          <article key={product.slug} className="oak-card rounded-3xl overflow-hidden flex flex-col border border-[#e59840]/20">
            <div className="relative h-48 bg-[#0c0603]">
              <Image src={product.image} alt={`DEMLAB 96 derece ${volume}`} fill sizes="(max-width: 768px) 100vw, 25vw" className="object-contain p-4" />
              <span className="absolute left-3 top-3 rounded-full bg-[#180d07]/90 border border-[#e59840]/40 px-3 py-1 text-xs font-black text-[#f3bd68]">96° • {volume}</span>
            </div>
            <div className="p-5 flex flex-1 flex-col">
              <h3 className="font-serif text-lg font-bold text-[#fff5ea]">{volume} Ambalaj</h3>
              <p className="mt-1 min-h-10 text-xs leading-relaxed text-[#c6ad97]">{option.size}</p>
              <div className="my-4 flex items-end gap-2">
                <span className="text-2xl font-black text-[#f3bd68]">{product.basePrice.toLocaleString("tr-TR")} ₺</span>
                <span className="pb-1 text-[11px] text-[#a98f7b]">+ KDV</span>
              </div>
              <button
                type="button"
                onClick={() => addToCart({ slug: product.slug, name: product.name, category: product.category, size: option.size, price: option.price })}
                className="btn-amber flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold"
              >
                <ShoppingCart className="h-4 w-4" /> Hemen Satın Al
              </button>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("whatsapp_order", { product: product.slug, package: volume, price: product.basePrice })}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-500/35 bg-emerald-500/10 px-4 py-2.5 text-xs font-bold text-emerald-300 transition hover:bg-emerald-500/20"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp Hızlı Sipariş
              </a>
            </div>
          </article>
        );
      })}
    </div>
  );
}
