"use client";

import React, { useEffect, useState, Suspense, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ProductSkeleton } from '@/components/Skeleton';
import { useCart } from '@/context/CartContext';
import { ScrollReveal } from '@/components/ScrollReveal';

function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentCategory = searchParams.get('category') || 'all';
  const { addToCart } = useCart();

  const [productsData, setProductsData] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // States for search and sort
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest'); // newest, price-asc, price-desc

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const catRes = await fetch('/api/categories?flat=true');
        const catData = await catRes.json();
        setCategories(catData);

        const prodUrl = currentCategory !== 'all' 
          ? `/api/products?category=${currentCategory}` 
          : '/api/products';
        const prodRes = await fetch(prodUrl);
        const prodData = await prodRes.json();
        setProductsData(prodData);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentCategory]);

  const normalizeText = (text: string) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[đĐ]/g, 'd')
      .replace(/[^a-z0-9\s]/g, '');
  };

  const filteredProducts = useMemo(() => {
    let result = [...productsData];

    if (searchTerm) {
      const term = normalizeText(searchTerm);
      result = result.filter(p => 
        normalizeText(p.name).includes(term) || 
        (p.description && normalizeText(p.description).includes(term))
      );
    }

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return result;
  }, [productsData, searchTerm, sortBy]);

  const currentCategoryName = useMemo(() => {
    if (currentCategory === 'all') return 'Linh Kiện & Phần Mềm';
    const cat = categories.find(c => c.slug === currentCategory);
    return cat ? cat.name : 'Linh Kiện & Phần Mềm';
  }, [currentCategory, categories]);

  const currentCategoryDesc = useMemo(() => {
    if (currentCategory === 'all') return 'Cung cấp linh kiện máy tính chính hãng và các gói bản quyền phần mềm uy tín, giá tốt nhất.';
    const cat = categories.find(c => c.slug === currentCategory);
    if (!cat) return 'Cung cấp linh kiện máy tính chính hãng.';
    
    // Custom descriptions for specific categories
    if (cat.slug === 'key' || cat.name.toLowerCase().includes('bản quyền')) {
      return `Tổng hợp các gói ${cat.name} uy tín, kích hoạt nhanh chóng và hỗ trợ cài đặt miễn phí.`;
    }
    
    return `Tổng hợp các mẫu ${cat.name} chất lượng cao, bảo hành dài hạn, hỗ trợ thay thế tận nơi.`;
  }, [currentCategory, categories]);

  const handleCategoryChange = (slug: string) => {
    if (slug === 'all') {
      router.push('/san-pham');
    } else {
      router.push(`/san-pham?category=${slug}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <section className="relative py-16 bg-white border-b border-slate-100 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-cyan-50/50 skew-x-12 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight uppercase">
            {currentCategoryName.split(' ').slice(0, -1).join(' ')} <span className="text-cyan-600">{currentCategoryName.split(' ').slice(-1)}</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            {currentCategoryDesc}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 pb-32">
        <div className="bg-white rounded-[32px] shadow-xl border border-slate-100 p-4 md:p-6 mb-12 space-y-6">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="relative w-full lg:max-w-md">
              <input 
                type="text" 
                placeholder="Tìm sản phẩm bạn cần..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-cyan-500 transition-all font-medium"
              />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>

            <div className="flex items-center gap-3 w-full lg:w-auto">
              <span className="text-sm font-bold text-slate-400 whitespace-nowrap">Sắp xếp:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-cyan-500 font-bold text-slate-700 w-full lg:w-48 cursor-pointer"
              >
                <option value="newest">Mới nhất</option>
                <option value="price-asc">Giá: Thấp đến Cao</option>
                <option value="price-desc">Giá: Cao đến Thấp</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => handleCategoryChange('all')}
              className={`px-6 py-3 rounded-2xl font-bold transition-all ${currentCategory === 'all' ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-200' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
            >
              Tất cả
            </button>
            {categories.map((cat) => (
              <button 
                key={cat.id}
                onClick={() => handleCategoryChange(cat.slug)}
                className={`px-6 py-3 rounded-2xl font-bold transition-all ${currentCategory === cat.slug ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-200' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => <ProductSkeleton key={i} />)}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="bg-white rounded-[40px] p-20 text-center shadow-xl border border-slate-100">
            <div className="text-6xl mb-6">🔍</div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Không tìm thấy sản phẩm</h3>
            <p className="text-slate-500">Thử tìm kiếm với từ khóa khác hoặc chọn danh mục khác nhé.</p>
            <button onClick={() => {setSearchTerm(''); handleCategoryChange('all');}} className="mt-8 text-cyan-600 font-bold hover:underline">Xóa tất cả bộ lọc</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((item, index) => {
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
                specs = [];
              }

              return (
                <ScrollReveal key={item.id} delay={(index % 4) * 0.1}>
                  <div className="group bg-white border border-slate-100 rounded-[32px] overflow-hidden transition-all duration-500 hover:-translate-y-2 shadow-sm hover:shadow-2xl flex flex-col h-full relative">
                    <Link href={`/${item.slug}`} className="relative aspect-square overflow-hidden bg-slate-50 block cursor-pointer group/img">
                      <Image 
                        src={item.image} 
                        alt={item.name}
                        fill
                        className="object-contain p-6 transition-transform duration-700 group-hover:scale-110"
                      />
                      {item.originalPrice && item.originalPrice > item.price && (
                        <div className="absolute top-4 right-4 bg-red-500 text-white text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider z-10 animate-bounce shadow-lg shadow-red-200">
                          Giảm {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
                        </div>
                      )}
                      
                      {/* Nút Mua ngay hiện lên khi Hover (Chỉ hiện trên Desktop) */}
                      <div className="absolute inset-0 bg-black/5 hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-[2px] z-20">
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            addToCart(item);
                            router.push('/thanh-toan');
                          }}
                          className="bg-white/90 hover:bg-white text-slate-900 px-6 py-3 rounded-2xl font-black text-sm shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 flex items-center gap-2 border border-white/50"
                        >
                          <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                          MUA NGAY
                        </button>
                      </div>
                    </Link>

                    <div className="p-6 flex flex-col flex-grow">
                      <div className="mb-4">
                        <Link href={`/${item.slug}`}>
                          <h3 className="text-lg font-black text-slate-900 line-clamp-2 hover:text-cyan-600 transition-colors cursor-pointer min-h-[3.5rem]">
                            {item.name}
                          </h3>
                        </Link>
                      </div>

                      <div className="mb-6 space-y-2 flex-grow">
                        {specs.slice(0, 3).map((spec, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                            {spec}
                          </div>
                        ))}
                      </div>

                      <div className="pt-6 border-t border-slate-50 flex items-center justify-between gap-4">
                        <div className="flex flex-col">
                          {item.originalPrice && item.originalPrice > item.price && (
                            <span className="text-xs text-slate-400 line-through font-bold mb-0.5">
                              {item.originalPrice.toLocaleString('vi-VN')}₫
                            </span>
                          )}
                          <div className="text-xl font-black text-red-600 tracking-tight">
                            {item.price.toLocaleString('vi-VN')}₫
                          </div>
                        </div>
                        <button 
                          onClick={() => addToCart(item)}
                          className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center hover:bg-cyan-600 hover:scale-110 transition-all duration-300 shadow-lg shadow-slate-200"
                          title="Thêm vào giỏ hàng"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
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
      <div className="min-h-screen bg-slate-50 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => <ProductSkeleton key={i} />)}
          </div>
        </div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
