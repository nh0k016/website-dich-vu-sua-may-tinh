"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

function ProductsContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const [productsData, setProductsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);
  const [categoryData, setCategoryData] = useState<any>(null);

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category?.slug,
      quantity: 1
    });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  useEffect(() => {
    setLoading(true);
    
    // 1. Tải danh sách sản phẩm
    const url = category ? `/api/products?category=${category}` : '/api/products';
    fetch(url, { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        setProductsData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi khi tải sản phẩm:", err);
        setLoading(false);
      });

    // 2. Tải dữ liệu danh mục để lấy tên chính xác cho tiêu đề
    if (category) {
      fetch(`/api/categories?slug=${category}`)
        .then(res => res.json())
        .then(data => setCategoryData(data))
        .catch(err => console.error("Lỗi khi tải danh mục:", err));
    } else {
      setCategoryData(null);
    }
  }, [category]);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header Section */}
      <section className="relative pt-24 pb-32 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight uppercase">
            {categoryData ? categoryData.name : (category ? category.replace(/-/g, ' ') : 'Tất cả Sản phẩm')}
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Cung cấp linh kiện máy tính chính hãng và các gói bản quyền phần mềm uy tín, giá tốt nhất.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20 pb-32">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : productsData.length === 0 ? (
          <div className="bg-white rounded-[40px] p-20 text-center shadow-xl border border-slate-100">
            <div className="text-6xl mb-6">📦</div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Chưa có sản phẩm nào</h3>
            <p className="text-slate-500">Chúng tôi sẽ sớm cập nhật sản phẩm trong danh mục này.</p>
            <Link href="/san-pham" className="mt-8 inline-block text-cyan-600 font-bold hover:underline">Xem tất cả sản phẩm</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {productsData.map((item) => {
              let specs: string[] = [];
              try {
                if (item.specs) {
                  if (typeof item.specs === 'string') {
                    if (item.specs.trim().startsWith('[') && item.specs.trim().endsWith(']')) {
                      specs = JSON.parse(item.specs);
                    } else {
                      specs = item.specs.split('\n').map((s: any) => s.trim()).filter((s: any) => s !== '');
                    }
                  } else if (Array.isArray(item.specs)) {
                    specs = item.specs;
                  }
                }
              } catch (e) {
                if (item.specs && typeof item.specs === 'string') {
                  specs = item.specs.split('\n').map((s: any) => s.trim()).filter((s: any) => s !== '');
                }
              }

              return (
                <div key={item.id} className="bg-white border border-slate-100 rounded-[32px] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 group flex flex-col h-full transform hover:-translate-y-2">
                  <Link href={`/san-pham/${item.slug}`} className="relative aspect-square overflow-hidden bg-slate-50 block">
                    <Image
                      src={item.image || '/product-placeholder.png'}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black text-slate-900 uppercase tracking-widest shadow-sm">
                      {item.category?.name || 'Linh kiện'}
                    </div>
                    {item.originalPrice && item.originalPrice > item.price && (
                      <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-gradient-to-r from-orange-500 to-red-600 text-white px-3 py-1.5 rounded-full text-[11px] font-black shadow-lg animate-flash border border-white/20">
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span className="uppercase tracking-tighter">Giảm {Math.round((1 - item.price / item.originalPrice) * 100)}%</span>
                      </div>
                    )}
                  </Link>

                  <div className="p-8 flex flex-col flex-grow">
                    <Link href={`/san-pham/${item.slug}`}>
                      <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-cyan-600 transition-colors h-14 cursor-pointer">
                        {item.name}
                      </h3>
                    </Link>

                    <div className="mb-6 space-y-2">
                      {specs.slice(0, 3).map((spec, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-500">
                          <span className="w-1 h-1 rounded-full bg-cyan-500"></span>
                          {spec}
                        </div>
                      ))}
                    </div>

                    <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between gap-4">
                      <div className="flex flex-col">
                        {item.originalPrice && item.originalPrice > item.price && (
                          <span className="text-xs text-slate-400 line-through mb-1 font-medium">
                            {item.originalPrice.toLocaleString('vi-VN')}₫
                          </span>
                        )}
                        <div className="text-2xl font-black text-slate-900">
                          {item.price.toLocaleString('vi-VN')}₫
                        </div>
                      </div>
                      <button
                        onClick={(e) => handleAddToCart(e, item)}
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-lg transform hover:scale-110 ${addedId === item.id
                            ? 'bg-green-500 text-white shadow-green-500/30'
                            : 'bg-slate-900 text-white shadow-slate-900/10 hover:bg-cyan-500 hover:shadow-cyan-500/30'
                          }`}
                      >
                        {addedId === item.id ? (
                          <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                        ) : (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
