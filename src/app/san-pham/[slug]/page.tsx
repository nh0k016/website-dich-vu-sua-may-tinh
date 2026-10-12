import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import ProductDetailView from '@/components/products/ProductDetailView';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug } });

  if (!product) {
    return { title: 'Sản phẩm không tồn tại - FastFix' };
  }

  return {
    title: `${product.name} | Chính hãng, giá tốt nhất`,
    description: product.description || undefined,
    openGraph: {
      title: product.name,
      description: product.description || undefined,
      images: product.image ? [product.image] : [],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });

  if (!product) {
    notFound();
  }

  return <ProductDetailView slug={slug} initialProduct={product} />;
}
