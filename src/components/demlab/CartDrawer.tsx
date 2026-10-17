import { useCart } from "@/demlab/context/CartContext";
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, Truck } from "lucide-react";
import { Link } from "@tanstack/react-router";

export default function CartDrawer() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    subtotal,
    vatAmount,
    shippingFee,
    grandTotal,
    isCartOpen,
    setIsCartOpen,
    totalItems,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Arka Plan Karartması */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#160c07] border-l border-[#e59840]/30 shadow-2xl flex flex-col text-[#f7ede2]">
          {/* Header */}
          <div className="p-5 border-b border-[#3a2012] flex items-center justify-between bg-[#1f1109]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#e59840]" />
              <h2 className="text-base font-bold text-[#fef5ec] font-serif">
                DEMLAB Sipariş Sepeti ({totalItems})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-[#a88e79] hover:text-[#f3bd68] hover:bg-[#2c170d] transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Hızlı Getirim Rozeti */}
          <div className="bg-[#24140c] px-5 py-2.5 border-b border-[#3e2315] text-xs text-[#ffd79a] flex items-center gap-2">
            <Truck className="w-4 h-4 text-[#e59840] shrink-0" />
            <span>
              {subtotal > 5000
                ? "🎉 5.000 TL üzeri Mühürlü Özel Teslimat Ücretsiz!"
                : `5.000 TL üzeri Ücretsiz Getirim için ${(5000 - subtotal).toLocaleString("tr-TR")} ₺ kaldı.`}
            </span>
          </div>

          {/* Ürün Listesi */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#24140c] text-[#a88e79] border border-[#3e2315] flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-semibold text-[#f0ded0] font-serif">Sepetiniz Boş</h3>
                <p className="text-xs text-[#a98f7b] max-w-xs mx-auto">
                  Kataloğumuzdan %96 çözelti veya istediğiniz ambalajı seçerek ekleyebilirsiniz.
                </p>
                <div className="pt-2">
                  <Link
                    to="/products"
                    onClick={() => setIsCartOpen(false)}
                    className="inline-block btn-amber text-xs font-bold px-4 py-2 rounded-xl transition shadow"
                  >
                    Ürünleri İncele
                  </Link>
                </div>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 p-3.5 rounded-xl border border-[#3e2315] bg-[#1e1009] hover:border-[#e59840]/40 transition"
                >
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-[#fef5ec] truncate font-serif">
                      {item.name}
                    </h4>
                    <span className="text-[10px] text-[#f3bd68] font-semibold bg-[#2c170d] px-2 py-0.5 rounded inline-block mt-1 border border-[#e59840]/30">
                      {item.size}
                    </span>
                    <div className="mt-2 text-xs font-bold text-[#f3bd68]">
                      {item.price.toLocaleString("tr-TR")} ₺{" "}
                      <span className="text-[10px] text-[#937b67] font-normal">/ adet</span>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between items-end">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-[#a88e79] hover:text-red-400 transition p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="flex items-center border border-[#442616] rounded-lg overflow-hidden bg-[#160c07]">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1 hover:bg-[#2c170d] text-[#cbb29c] transition"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-2.5 text-xs font-bold text-[#f0ded0]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1 hover:bg-[#2c170d] text-[#cbb29c] transition"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Özet ve Ödeme */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[#3e2315] bg-[#1a0e08] space-y-3">
              <div className="space-y-1.5 text-xs text-[#cbb29c]">
                <div className="flex justify-between">
                  <span>Ara Toplam</span>
                  <span className="font-semibold text-[#f7ede2]">{subtotal.toLocaleString("tr-TR")} ₺</span>
                </div>
                <div className="flex justify-between">
                  <span>KDV (%20)</span>
                  <span>{vatAmount.toLocaleString("tr-TR")} ₺</span>
                </div>
                <div className="flex justify-between">
                  <span>Mühürlü Lojistik Getirim</span>
                  <span className={shippingFee === 0 ? "text-[#f3bd68] font-bold" : ""}>
                    {shippingFee === 0 ? "ÜCRETSİZ" : `${shippingFee} ₺`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#fef5ec] pt-2 border-t border-[#3e2315]">
                  <span>Genel Toplam</span>
                  <span className="text-[#f3bd68] text-base font-black">{grandTotal.toLocaleString("tr-TR")} ₺</span>
                </div>
              </div>

              <Link
                to="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 btn-amber font-bold py-3.5 px-4 rounded-xl shadow-lg transition text-xs active:scale-[0.99]"
              >
                <span>Siparişi Tamamla & Kapıya İste</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
