import React, { createContext, useContext, useState, useEffect } from "react";

export type CartItem = {
  id: string; // slug + size kombinasyonu
  slug: string;
  name: string;
  category: string;
  size: string;
  price: number;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "id" | "quantity">, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  vatAmount: number;
  shippingFee: number;
  grandTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // LocalStorage senkronizasyonu
  useEffect(() => {
    try {
      const saved = localStorage.getItem("demlab_cart");
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Cart load error", e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("demlab_cart", JSON.stringify(items));
    } catch (e) {
      console.error("Cart save error", e);
    }
  }, [items]);

  const addToCart = (item: Omit<CartItem, "id" | "quantity">, quantity = 1) => {
    const id = `${item.slug}-${item.size}`;
    setItems((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing) {
        return prev.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { ...item, id, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) => {
          if (i.id === id) {
            const newQty = i.quantity + delta;
            return newQty > 0 ? { ...i, quantity: newQty } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const vatAmount = Math.round(subtotal * 0.20); // %20 KDV
  const shippingFee = subtotal > 5000 || subtotal === 0 ? 0 : 250; // 5000 TL üzeri ücretsiz getirim
  const grandTotal = subtotal + vatAmount + shippingFee;

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        vatAmount,
        shippingFee,
        grandTotal,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
