import { products } from "@/data/products";

export const VAT_RATE = 0.2;
export const SHIPPING_FEE = 250;
export const FREE_SHIPPING_THRESHOLD = 5000;

export type CartLineInput = {
  slug: string;
  size: string;
  quantity: number;
};

export type PricedCartLine = CartLineInput & {
  name: string;
  unitPrice: number;
  lineTotal: number;
};

export class CartValidationError extends Error {}

export function calculateTotals(subtotal: number) {
  const vatAmount = Math.round(subtotal * VAT_RATE);
  const shippingFee = subtotal > FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_FEE;
  return {
    subtotal,
    vatAmount,
    shippingFee,
    grandTotal: subtotal + vatAmount + shippingFee,
  };
}

/** Prices are always resolved from the server-side catalogue, never from the browser. */
export function priceCart(lines: CartLineInput[]) {
  if (!Array.isArray(lines) || lines.length === 0 || lines.length > 50) {
    throw new CartValidationError("Sepetinizde geçerli ürün bulunmuyor.");
  }

  const merged = new Map<string, PricedCartLine>();

  for (const line of lines) {
    if (!line || typeof line.slug !== "string" || typeof line.size !== "string") {
      throw new CartValidationError("Sepet ürünlerinden biri geçersiz.");
    }
    if (!Number.isInteger(line.quantity) || line.quantity < 1 || line.quantity > 99) {
      throw new CartValidationError("Ürün adedi 1 ile 99 arasında olmalıdır.");
    }

    const product = products.find((candidate) => candidate.slug === line.slug);
    const packaging = product?.packagingOptions.find(
      (option) => option.size === line.size && option.inStock,
    );
    if (!product || !packaging) {
      throw new CartValidationError("Sepetinizdeki bir ürün artık satışta değil. Sepeti güncelleyin.");
    }

    const key = `${product.slug}:${packaging.size}`;
    const existing = merged.get(key);
    const quantity = (existing?.quantity ?? 0) + line.quantity;
    if (quantity > 99) {
      throw new CartValidationError("Bir üründen en fazla 99 adet sipariş verebilirsiniz.");
    }

    merged.set(key, {
      slug: product.slug,
      name: product.name,
      size: packaging.size,
      quantity,
      unitPrice: packaging.price,
      lineTotal: packaging.price * quantity,
    });
  }

  const items = [...merged.values()];
  const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
  return { items, ...calculateTotals(subtotal) };
}
