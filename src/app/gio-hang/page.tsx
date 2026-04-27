"use client";

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="py-24 max-w-3xl mx-auto px-4 text-center">
        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Giỏ hàng của bạn đang trống</h2>
        <p className="text-slate-500 mb-8 text-lg">Có vẻ như bạn chưa chọn sản phẩm nào. Hãy quay lại trang sản phẩm để tiếp tục mua sắm nhé!</p>
        <Link href="/san-pham" className="inline-flex bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
          Tiếp tục mua sắm
        </Link>
      </div>
    );
  }

  return (
    <div className="py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black text-slate-900 mb-10 tracking-tight">Giỏ hàng</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map(item => (
              <div key={item.id} className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col sm:flex-row gap-6 items-center shadow-sm relative pr-12">
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors p-2"
                  title="Xóa"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                
                <div className="w-24 h-24 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 shrink-0 relative overflow-hidden">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  ) : item.category === 'ram' ? (
                    <Image src="/ram.png" alt={item.name} fill className="object-cover" />
                  ) : item.category === 'ssd' ? (
                    <Image src="/ssd.png" alt={item.name} fill className="object-cover" />
                  ) : (
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
                    </div>
                  )}
                </div>
                
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{item.name}</h3>
                  <div className="text-cyan-600 font-bold text-lg mb-4">{item.price.toLocaleString('vi-VN')}đ</div>
                  <div className="flex items-center justify-center sm:justify-start gap-4">
                    <span className="text-sm text-slate-500 font-semibold">Số lượng:</span>
                    <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-white hover:text-cyan-600 transition-colors border-r border-slate-200"
                      >
                        -
                      </button>
                      <span className="w-10 h-8 flex items-center justify-center text-sm font-bold bg-white text-slate-900">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-white hover:text-cyan-600 transition-colors border-l border-slate-200"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white border border-slate-200 rounded-3xl p-8 sticky top-32 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">Tổng cộng</h3>
              
              <div className="space-y-4 mb-6 text-slate-600">
                <div className="flex justify-between">
                  <span>Tạm tính</span>
                  <span className="font-semibold text-slate-900">{totalPrice.toLocaleString('vi-VN')}đ</span>
                </div>
                <div className="flex justify-between">
                  <span>Vận chuyển</span>
                  <span className="text-cyan-600 font-semibold">Miễn phí</span>
                </div>
              </div>
              
              <div className="border-t border-slate-100 pt-6 mb-8">
                <div className="flex justify-between items-end">
                  <span className="text-slate-900 font-semibold text-lg">Tổng tiền</span>
                  <span className="text-3xl font-black text-cyan-600">{totalPrice.toLocaleString('vi-VN')}đ</span>
                </div>
              </div>
              
              <Link href="/thanh-toan" className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
                Tiến hành thanh toán
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
