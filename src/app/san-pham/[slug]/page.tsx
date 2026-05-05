"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useCart } from '@/context/CartContext';

export default function ProductDetailPage() {
  const params = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState<string>('');

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/${params.slug}`, { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          setProduct(data);
          setActiveImage(data.image);
        }
      } catch (error) {
        console.error("Lỗi khi tải chi tiết sản phẩm:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProduct();
  }, [params.slug]);

  if (isLoading) {
    return (
      <div className="py-32 text-center">
        <div className="inline-block animate-spin w-12 h-12 border-4 border-cyan-200 border-t-cyan-600 rounded-full"></div>
        <p className="mt-4 text-slate-500 font-semibold">Đang tải chi tiết sản phẩm...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-32 text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Sản phẩm không tồn tại</h2>
        <Link href="/san-pham" className="text-cyan-600 font-bold hover:underline">Quay lại danh sách sản phẩm</Link>
      </div>
    );
  }

  let specs: string[] = [];
  try {
    if (product.specs) {
      if (typeof product.specs === 'string') {
        if (product.specs.trim().startsWith('[') && product.specs.trim().endsWith(']')) {
          specs = JSON.parse(product.specs);
        } else {
          // Nếu không phải JSON, thử tách theo dòng
          specs = product.specs.split('\n').map((s: string) => s.trim()).filter((s: string) => s !== '');
        }
      } else if (Array.isArray(product.specs)) {
        specs = product.specs;
      }
    }
  } catch (e) {
    console.error("Lỗi khi xử lý specs:", e);
    // Nếu lỗi, vẫn thử tách theo dòng như phương án dự phòng
    if (product.specs && typeof product.specs === 'string') {
      specs = product.specs.split('\n').map((s: string) => s.trim()).filter((s: string) => s !== '');
    }
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category?.slug || 'generic',
      quantity: quantity
    });
    alert(`Đã thêm ${quantity} x ${product.name} vào giỏ hàng!`);
  };

  return (
    <div className="py-16 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-400 mb-10">
          <Link href="/" className="hover:text-cyan-600">Trang chủ</Link>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          <Link href="/san-pham" className="hover:text-cyan-600">Sản phẩm</Link>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          <span className="text-slate-900 font-medium truncate">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Image Gallery */}
          <div className="flex flex-col gap-6">
            <div className="relative aspect-square bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 p-4 flex items-center justify-center group shadow-2xl shadow-slate-200/60">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-50/50 via-transparent to-transparent"></div>
              {activeImage ? (
                <div className="relative w-full h-full animate-in fade-in duration-500">
                  <Image src={activeImage} alt={product.name} fill className="object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105" priority unoptimized />
                </div>
              ) : (
                <div className="text-slate-200">
                  <svg className="w-32 h-32" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
              )}
            </div>
            
            {/* Thumbnails */}
            {product.images && product.images.length > 0 && (
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-4">
                <button 
                  onClick={() => setActiveImage(product.image)}
                  className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all p-2 bg-white ${activeImage === product.image ? 'border-cyan-500 shadow-lg ring-2 ring-cyan-100' : 'border-slate-100 hover:border-slate-200'}`}
                >
                  <img src={product.image} alt="Thumbnail main" className="w-full h-full object-contain" />
                </button>
                {product.images.map((img: string, idx: number) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all p-2 bg-white ${activeImage === img ? 'border-cyan-500 shadow-lg ring-2 ring-cyan-100' : 'border-transparent hover:border-slate-200'}`}
                  >
                    <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-8">
              {product.category && (
                <span className="inline-block px-4 py-1.5 bg-cyan-50 text-cyan-600 rounded-full text-sm font-bold mb-4 uppercase tracking-wider">
                  {product.category.name}
                </span>
              )}
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight leading-tight">
                {product.name}
              </h1>
              <div className="flex flex-col gap-1 mb-6">
                <div className="flex items-center gap-4">
                  <div className="text-4xl font-black text-orange-600">
                    {product.price.toLocaleString('vi-VN')}đ
                  </div>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <div className="flex items-center gap-1.5 bg-gradient-to-r from-orange-500 to-red-600 text-white px-3 py-1.5 rounded-full text-[11px] font-black shadow-lg animate-flash border border-white/20">
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span className="uppercase tracking-tighter">Giảm {Math.round((1 - product.price / product.originalPrice) * 100)}%</span>
                    </div>
                  )}
                  <div className="px-3 py-1 bg-green-50 text-green-600 text-xs font-bold rounded-lg border border-green-100">
                    CÒN HÀNG
                  </div>
                </div>
                {product.originalPrice && product.originalPrice > product.price && (
                  <div className="text-lg text-slate-400 line-through font-medium">
                    {product.originalPrice.toLocaleString('vi-VN')}đ
                  </div>
                )}
              </div>
              <p className="text-xl text-slate-500 leading-relaxed">
                {product.description || "Nâng cấp máy tính của bạn với hiệu năng vượt trội và độ bền đáng tin cậy. Sản phẩm chính hãng, cam kết chất lượng tốt nhất."}
              </p>
            </div>

            {/* Specifications */}
            {specs.length > 0 && (
              <div className="mb-10 bg-slate-50 p-8 rounded-3xl border border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 mb-4 uppercase tracking-widest text-sm">Đặc điểm nổi bật</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {specs.map((spec: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-600 font-medium">
                      <div className="w-6 h-6 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      </div>
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Actions */}
            <div className="mt-auto space-y-6">
              <div className="flex items-center gap-6">
                <div className="flex items-center border-2 border-slate-200 rounded-2xl overflow-hidden bg-white">
                  <button
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    className="px-5 py-3 hover:bg-slate-50 transition-colors text-slate-500 font-bold text-xl"
                  >
                    −
                  </button>
                  <span className="w-12 text-center font-black text-slate-900 text-lg">{quantity}</span>
                  <button
                    onClick={() => setQuantity(prev => prev + 1)}
                    className="px-5 py-3 hover:bg-slate-50 transition-colors text-slate-500 font-bold text-xl"
                  >
                    +
                  </button>
                </div>
                <div className="text-sm text-slate-400 font-medium">
                  Tổng thanh toán: <span className="text-slate-900 font-bold text-lg">{(product.price * quantity).toLocaleString('vi-VN')}đ</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-slate-900 hover:bg-slate-800 text-white py-5 rounded-2xl font-bold text-lg transition-all shadow-xl hover:shadow-slate-200 transform hover:-translate-y-1 flex items-center justify-center gap-3"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  Thêm vào giỏ hàng
                </button>
                <Link
                  href="/thanh-toan"
                  onClick={() => addToCart({ id: product.id, name: product.name, price: product.price, image: product.image, category: product.category?.slug || 'generic', quantity })}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 text-white py-5 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-orange-200 transform hover:-translate-y-1 flex items-center justify-center gap-3 text-center"
                >
                  Mua ngay
                </Link>
              </div>
            </div>

            {/* Guarantees */}
            <div className="mt-12 grid grid-cols-2 gap-6 pt-8 border-t border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Chính hãng 100%</h4>
                  <p className="text-xs text-slate-400">Hoàn tiền nếu phát hiện hàng giả</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Giao hàng nhanh</h4>
                  <p className="text-xs text-slate-400">Ship nội thành trong 2h</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Description */}
        {product.content && (
          <div className="mt-24 max-w-4xl">
            <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
              <span className="w-8 h-1 bg-cyan-600 rounded-full"></span>
              Mô tả chi tiết sản phẩm
            </h2>
            <div
              className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{ __html: product.content }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
