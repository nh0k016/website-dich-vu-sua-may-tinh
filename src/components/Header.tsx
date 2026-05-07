"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { SITE_CONFIG } from '@/lib/config';

export default function Header() {
  const { totalItems } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/categories', { cache: 'no-store' })
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error("Lỗi khi tải danh mục:", err));
  }, []);

  const toggleSubmenu = (menu: string) => {
    if (openSubmenu === menu) {
      setOpenSubmenu(null);
    } else {
      setOpenSubmenu(menu);
    }
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 cursor-pointer group">
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center font-black text-2xl text-white shadow-lg shadow-cyan-500/30 group-hover:shadow-xl group-hover:shadow-cyan-500/40 transition-all">FF</div>
          <span className="text-2xl font-bold tracking-wider text-slate-900 hidden sm:block">FAST<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">FIX</span></span>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10 text-sm font-semibold text-slate-600">
          <Link href="/" className="hover:text-cyan-600 transition-colors">Trang chủ</Link>
          <div className="relative group">
            <Link href="/san-pham" className="hover:text-cyan-600 transition-colors flex items-center gap-1">
              Sản phẩm
              <svg className="w-4 h-4 text-slate-400 group-hover:text-cyan-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </Link>
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-5 hidden group-hover:block w-56 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-white border border-slate-200 rounded-xl shadow-xl flex flex-col py-2 relative">
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-l border-t border-slate-200 rotate-45"></div>
                
                {categories.length > 0 ? (
                  categories.map((cat) => (
                    <div key={cat.id} className="group/item relative">
                      <Link 
                        href={`/san-pham?category=${cat.slug}`} 
                        className="px-5 py-3 hover:bg-slate-50 hover:text-cyan-600 transition-colors border-b border-slate-100 flex items-center justify-between font-bold"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span> {cat.name}
                        </div>
                        {cat.children && cat.children.length > 0 && (
                          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        )}
                      </Link>
                      
                      {cat.children && cat.children.length > 0 && (
                        <div className="absolute top-0 left-full hidden group-hover/item:block w-48 pl-1">
                          <div className="bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden flex flex-col py-2">
                            {cat.children.map((child: any) => (
                              <Link 
                                key={child.id}
                                href={`/san-pham?category=${child.slug}`}
                                className="px-5 py-3 hover:bg-slate-50 hover:text-cyan-600 transition-colors border-b border-slate-100 last:border-0 flex items-center gap-2 text-sm font-semibold"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span> {child.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <Link href="/san-pham" className="px-5 py-3 hover:bg-slate-50 hover:text-cyan-600 transition-colors flex items-center gap-2 font-bold">
                    Tất cả sản phẩm
                  </Link>
                )}
              </div>
            </div>
          </div>
          <Link href="/dich-vu" className="hover:text-cyan-600 transition-colors">Dịch vụ</Link>
          <Link href="/bai-viet" className="hover:text-cyan-600 transition-colors">Bài viết</Link>
          <Link href="/lien-he" className="hover:text-cyan-600 transition-colors">Liên hệ</Link>
        </nav>

        <div className="flex items-center gap-2 sm:gap-6">
          {/* Hotline Desktop */}
          <a href={`tel:${SITE_CONFIG.phone.replace(/\./g, '')}`} className="hidden lg:flex items-center gap-3 px-4 py-2 rounded-full bg-slate-50 border border-slate-100 group hover:border-cyan-200 hover:bg-white transition-all shadow-sm hover:shadow-md">
            <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-white animate-pulse group-hover:scale-110 transition-transform">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 2V3z" /></svg>
            </div>
            <div className="text-right">
              <div className="text-[10px] uppercase tracking-widest text-slate-400 font-bold leading-none mb-1">Hotline 8:30 - 22:00</div>
              <div className="text-sm font-black text-slate-900 group-hover:text-cyan-600 transition-colors">{SITE_CONFIG.phone}</div>
            </div>
          </a>

          <Link href="/gio-hang" className="relative p-2 text-slate-600 hover:text-cyan-600 transition-colors group">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 w-5 h-5 bg-orange-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white group-hover:bg-orange-600 transition-colors shadow-sm">
                {totalItems}
              </span>
            )}
          </Link>
          
          <a href={SITE_CONFIG.social.zalo} target="_blank" rel="noopener noreferrer" 
             className="hidden sm:inline-flex bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transform hover:-translate-y-0.5 items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            ĐẶT LỊCH NGAY
          </a>
          
          {/* Mobile Menu Toggle Button */}
          <button 
            className="md:hidden p-2 text-slate-600 hover:text-cyan-600 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-xl max-h-[calc(100vh-5rem)] overflow-y-auto">
          <div className="px-4 py-6 flex flex-col gap-4 font-semibold text-slate-700">
            <Link href="/" className="px-4 py-3 hover:bg-cyan-50 hover:text-cyan-600 rounded-xl transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Trang chủ</Link>
            
            <div className="flex flex-col">
              <button 
                onClick={() => toggleSubmenu('san-pham')} 
                className="flex items-center justify-between px-4 py-3 hover:bg-cyan-50 hover:text-cyan-600 rounded-xl transition-colors w-full text-left"
              >
                Sản phẩm
                <svg className={`w-5 h-5 transition-transform ${openSubmenu === 'san-pham' ? 'rotate-180 text-cyan-600' : 'text-slate-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              
              {openSubmenu === 'san-pham' && (
                <div className="pl-6 pr-4 py-2 flex flex-col gap-2 border-l-2 border-cyan-100 ml-6 mt-2">
                  <Link 
                    href="/san-pham" 
                    className="py-2 px-4 hover:bg-cyan-50 text-cyan-600 rounded-lg transition-colors flex items-center gap-2 font-black" 
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-600"></span> Tất cả sản phẩm
                  </Link>
                  {categories.map((cat) => (
                    <React.Fragment key={cat.id}>
                      <Link 
                        href={`/san-pham?category=${cat.slug}`} 
                        className="py-2 px-4 hover:bg-cyan-50 text-slate-900 hover:text-cyan-600 rounded-lg transition-colors flex items-center gap-2 font-bold" 
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span> {cat.name}
                      </Link>
                      {cat.children && cat.children.map((child: any) => (
                        <Link 
                          key={child.id}
                          href={`/san-pham?category=${child.slug}`} 
                          className="py-2 px-4 pl-10 hover:bg-cyan-50 text-slate-600 hover:text-cyan-600 rounded-lg transition-colors flex items-center gap-2 text-sm" 
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-300"></span> {child.name}
                        </Link>
                      ))}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>

            <Link href="/dich-vu" className="px-4 py-3 hover:bg-cyan-50 hover:text-cyan-600 rounded-xl transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Dịch vụ</Link>
            <Link href="/bai-viet" className="px-4 py-3 hover:bg-cyan-50 hover:text-cyan-600 rounded-xl transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Bài viết</Link>
            <Link href="/lien-he" className="px-4 py-3 hover:bg-cyan-50 hover:text-cyan-600 rounded-xl transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Liên hệ</Link>
            
            <a href={SITE_CONFIG.social.zalo} target="_blank" rel="noopener noreferrer" className="mt-4 sm:hidden bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white px-7 py-3 rounded-xl font-bold transition-all shadow-md text-center">
              Đặt lịch sửa máy ngay
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
