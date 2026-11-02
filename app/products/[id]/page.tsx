import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PRODUCTS } from '@/data/products';
import { ProductDetailClient } from '@/components/product/ProductDetailClient';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    id: product.id,
  }));
}

export function generateMetadata({ params }: ProductPageProps): Metadata {
  const product = PRODUCTS.find((p) => p.id === params.id);
  if (!product) {
    return {
      title: 'Product Not Found — VIRTUO',
    };
  }

  return {
    title: `${product.name} — VIRTUO 3D Studio`,
    description: product.description,
  };
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const product = PRODUCTS.find((p) => p.id === params.id);
  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
