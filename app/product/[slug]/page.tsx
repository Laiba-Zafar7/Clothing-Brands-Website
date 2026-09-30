import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { getProduct, productDetailImage, productImage, related } from "@/lib/products";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductInfo } from "@/components/products/ProductInfo";
import { ProductCard } from "@/components/products/ProductCard";
import { Reveal } from "@/components/ui/Reveal";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    openGraph: { images: [productImage(product.slug)] },
  };
}

export default async function ProductPage({ params }: Params) {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  const frames = [
    { src: productImage(product.slug), alt: product.alt, position: product.focus },
    { src: productDetailImage(product.slug), alt: `${product.name}, detail` },
  ];
  const more = related(product);

  return (
    <>
      <section data-header="light" className="bg-background pt-header lg:grid lg:grid-cols-2">
        <ProductGallery frames={frames} />
        <div className="px-gutter pb-16 pt-10 lg:px-[5vw] lg:pb-24 lg:pt-16">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+3rem)]">
            <ProductInfo product={product} />
          </div>
        </div>
      </section>

      {more.length > 0 && (
        <section data-header="light" aria-labelledby="related-title" className="bg-background px-inset py-section">
          <Reveal as="h2" mask id="related-title" className="display-md">
            You may also like
          </Reveal>
          <ul className="mt-12 grid grid-cols-2 gap-2 lg:grid-cols-4">
            {more.map((p, i) => (
              <li key={p.slug}>
                <Reveal delay={i * 70} className="h-full">
                  <ProductCard product={p} className="h-full" />
                </Reveal>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
