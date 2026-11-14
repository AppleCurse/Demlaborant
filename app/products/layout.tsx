import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ürün Kataloğu & %96 Çözeltiler | DEMLAB",
  description:
    "1 L amber cam şişeden 20 L HDPE endüstriyel bidonlara kadar yüksek saflıkta %96 laboratuvar çözeltileri ve fermantasyon hammaddeleri.",
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    title: "Ürün Kataloğu & %96 Çözeltiler | DEMLAB",
    description:
      "1 L amber cam şişeden 20 L HDPE endüstriyel bidonlara kadar yüksek saflıkta %96 laboratuvar çözeltileri ve fermantasyon hammaddeleri.",
    url: "/products",
    images: ["/images/product-1l-amber.jpg"],
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
