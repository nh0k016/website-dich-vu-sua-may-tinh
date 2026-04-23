"use client";

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useCart } from '@/context/CartContext';

function ProductsContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const { addToCart } = useCart();
  const [productsData, setProductsData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const url = category ? `/api/products?category=${category}` : '/api/products';
        const res = await fetch(url, { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          setProductsData(data);
        }
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, [category]);

  const handleAddToCart = (e: React.MouseEvent, item: any) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      category: item.category?.slug || 'generic',
      quantity: 1
    });
    alert(`Đã thêm ${item.name} vào giỏ hàng!`);
  };

  if (isLoading) {
    return (
      <div className="py-24 text-center">
        <div className="inline-block animate-spin w-12 h-12 border-4 border-cyan-200 border-t-cyan-600 rounded-full"></div>
        <p className="mt-4 text-slate-500 font-semibold">Đang tải sản phẩm...</p>
      </div>
    );
  }

  const currentCategoryName = productsData.length > 0 && category 
    ? productsData[0].category?.name 
    : (category ? 'Đang tải...' : 'Sản Phẩm & Linh Kiện');

  return (
    <div className="py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            {currentCategoryName}
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Nâng cấp sức mạnh máy tính của bạn với linh kiện chính hãng, bảo hành dài hạn.
          </p>
        </div>

        {productsData.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
            <p className="text-slate-400 font-medium italic">Không tìm thấy sản phẩm nào trong danh mục này.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {productsData.map((item) => {
              let specs = [];
              try {
                if (item.specs) specs = JSON.parse(item.specs);
              } catch(e) {}

              return (
                <div key={item.id} className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full transform hover:-translate-y-1">
                  <Link href={`/san-pham/${item.id}`} className="relative h-64 bg-slate-50 p-6 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-100/50 to-transparent z-0"></div>
                    {item.image ? (
                      <div className="relative w-full h-full z-10 transition-transform duration-500 group-hover:scale-110">
                        <Image 
                          src={item.image} 
                          alt={item.name} 
                          fill 
                          className="object-contain drop-shadow-md" 
                        />
                      </div>
                    ) : item.category?.slug === 'key' ? (
                      <div className="relative w-full h-full z-10 transition-transform duration-500 group-hover:scale-110 flex items-center justify-center">
                        <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-200 rotate-3 group-hover:rotate-6 transition-all">
                          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
                        </div>
                      </div>
                    ) : (
                      <div className="relative w-full h-full z-10 transition-transform duration-500 group-hover:scale-110">
                        <Image 
                          src="/ssd.png" 
                          alt={item.name} 
                          fill 
                          className="object-contain drop-shadow-md opacity-50" 
                        />
                      </div>
                    )}
                    
                    <div className="absolute top-4 left-4 z-20">
                      <span className="bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm border border-slate-100 uppercase">
                        {item.description || item.category?.name || 'Sản phẩm'}
                      </span>
                    </div>
                  </Link>
                  
                  <div className="p-6 flex flex-col flex-1 relative z-10 bg-white">
                    <Link href={`/san-pham/${item.id}`}>
                      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-cyan-600 transition-colors line-clamp-2">{item.name}</h3>
                    </Link>
                    
                    {specs.length > 0 && (
                      <ul className="mt-3 mb-6 space-y-2 flex-1">
                        {specs.slice(0, 3).map((spec: string, idx: number) => (
                          <li key={idx} className="flex items-start text-sm text-slate-600">
                            <svg className="w-5 h-5 text-cyan-500 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            {spec}
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
                      <div className="text-2xl font-black text-slate-900">{item.price.toLocaleString('vi-VN')}đ</div>
                      <button 
                        onClick={(e) => handleAddToCart(e, item)}
                        className="bg-slate-900 hover:bg-cyan-600 text-white w-12 h-12 rounded-xl flex items-center justify-center transition-all hover:shadow-lg hover:shadow-cyan-200 transform hover:-translate-y-1"
                        title="Thêm vào giỏ"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
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
      <div className="py-32 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"></div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
