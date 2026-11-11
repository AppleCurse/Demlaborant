"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { calculateTotals } from "@/lib/commerce";
import { track } from "@vercel/analytics";

export type CartItem = {
  id: string;
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
  const [isLoaded, setIsLoaded] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        const saved = JSON.parse(localStorage.getItem("demlab_cart") ?? "[]") as unknown;
        if (Array.isArray(saved)) {
          setItems(
            saved.filter(
              (item): item is CartItem =>
                item && typeof item.id === "string" && typeof item.slug === "string" &&
                typeof item.size === "string" && Number.isInteger(item.quantity) && item.quantity > 0,
            ),
          );
        }
      } catch {
        localStorage.removeItem("demlab_cart");
      } finally {
        setIsLoaded(true);
      }
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("demlab_cart", JSON.stringify(items));
    } catch (error) {
      console.error("Cart save error", error);
    }
  }, [items, isLoaded]);

  const addToCart = (item: Omit<CartItem, "id" | "quantity">, quantity = 1) => {
    const id = `${item.slug}-${item.size}`;
    const safeQuantity = Math.max(1, Math.min(99, Math.floor(quantity)));
    track("add_to_cart", { product: item.slug, package: item.size, price: item.price, quantity: safeQuantity });
    setItems((previous) => {
      const existing = previous.find((candidate) => candidate.id === id);
      if (existing) {
        return previous.map((candidate) =>
          candidate.id === id
            ? { ...candidate, quantity: Math.min(99, candidate.quantity + safeQuantity) }
            : candidate,
        );
      }
      return [...previous, { ...item, id, quantity: safeQuantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => setItems((previous) => previous.filter((item) => item.id !== id));

  const updateQuantity = (id: string, delta: number) => {
    setItems((previous) =>
      previous
        .map((item) => {
          if (item.id !== id) return item;
          const quantity = Math.min(99, item.quantity + delta);
          return quantity > 0 ? { ...item, quantity } : null;
        })
        .filter((item): item is CartItem => item !== null),
    );
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const { vatAmount, shippingFee, grandTotal } = calculateTotals(subtotal);

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart: () => setItems([]),
      totalItems,
      subtotal,
      vatAmount,
      shippingFee,
      grandTotal,
      isCartOpen,
      setIsCartOpen,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
