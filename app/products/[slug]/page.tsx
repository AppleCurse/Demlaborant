import { notFound } from "next/navigation";
import { products } from "@/data/products";
import ProductDetails from "@/components/ProductDetails";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const product = products.find((p) => p.slug === resolvedParams.slug);

  if (!product) {
    return {
      title: "Ürün Bulunamadı | DEMLAB",
    };
  }

  return {
    title: `${product.name} | Zanaat & Fermantasyon | DEMLAB`,
    description: product.shortDescription || product.description,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const product = products.find((p) => p.slug === resolvedParams.slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-16">
      <ProductDetails product={product} />
    </main>
  );
}
