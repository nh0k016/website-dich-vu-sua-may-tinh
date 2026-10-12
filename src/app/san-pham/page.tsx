import React from 'react';
import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { SITE_CONFIG } from '@/lib/config';
import ProductsClientView from '@/components/products/ProductsClientView';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Linh Kiện Máy Tính & Phần Mềm Bản Quyền Chính Hãng | FastFix',
  description: 'Cung cấp linh kiện máy tính nâng cấp chính hãng (RAM, SSD, bàn phím) và bản quyền phần mềm Windows, Office, đồ họa giá tốt nhất. Hỗ trợ lắp đặt tận nơi.',
  alternates: {
    canonical: `${SITE_CONFIG.domain}/san-pham`,
  },
  openGraph: {
    title: 'Linh Kiện Máy Tính & Phần Mềm Bản Quyền Chính Hãng | FastFix',
    description: 'Cung cấp linh kiện máy tính chính hãng, RAM, SSD, bản quyền phần mềm giá tốt tại TP.HCM.',
    url: `${SITE_CONFIG.domain}/san-pham`,
    siteName: 'FastFix',
    type: 'website',
  },
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: Promise<{ category?: string }>;
}) {
  const resolvedParams = searchParams ? await searchParams : undefined;
  const initialCategory = resolvedParams?.category || 'all';

  const [categories, products] = await Promise.all([
    prisma.category.findMany({
      orderBy: { name: 'asc' },
      include: { children: true }
    }),
    prisma.product.findMany({
      include: { category: true },
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' }
      ]
    })
  ]);

  return (
    <ProductsClientView 
      initialProducts={products} 
      initialCategories={categories}
      initialCategory={initialCategory}
    />
  );
}
