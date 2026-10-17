import { createFileRoute, notFound } from "@tanstack/react-router";
import { products } from "@/demlab/data/products";
import ProductDetails from "@/components/demlab/ProductDetails";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = products.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const title = loaderData ? `${loaderData.product.name} | DEMLAB` : "Ürün Bulunamadı | DEMLAB";
    const description = loaderData?.product.shortDescription ?? "DEMLAB ürün detayı";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
        ...(loaderData ? [] : [{ name: "robots", content: "noindex" }]),
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-16">
      <ProductDetails product={product} />
    </main>
  );
}
