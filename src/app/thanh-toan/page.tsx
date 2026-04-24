"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';

// Cấu hình ngân hàng
const BANK_CONFIG = {
  BANK_ID: "tpb", // tpb = TPBank
  ACCOUNT_NO: "78799728888",
  ACCOUNT_NAME: "NGUYEN DUC VINH",
  EXPIRE_MINUTES: 15
};

export default function CheckoutPage() {
  const { cartItems, totalPrice, clearCart, removeFromCart } = useCart();
  const [paymentStep, setPaymentStep] = useState<'form' | 'qr' | 'success'>('form');
  const [currentOrderId, setCurrentOrderId] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(BANK_CONFIG.EXPIRE_MINUTES * 60); // Đếm ngược 15 phút

  const hasKeyProduct = cartItems.some(item => item.category === 'key');

  const handleRemoveItem = (id: string, name: string) => {
    if (window.confirm(`Bạn có muốn xóa sản phẩm "${name}" khỏi đơn hàng không?`)) {
      removeFromCart(id);
    }
  };

  // Hàm định dạng giây thành Phút:Giây (VD: 15:00)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    notes: '',
    paymentMethod: hasKeyProduct ? 'banking' : 'cod'
  });

  React.useEffect(() => {
    if (hasKeyProduct && formData.paymentMethod === 'cod') {
      setFormData(prev => ({ ...prev, paymentMethod: 'banking' }));
    }
  }, [hasKeyProduct, formData.paymentMethod]);

  // Bộ đếm ngược thời gian thanh toán
  React.useEffect(() => {
    if (paymentStep === 'qr') {
      const timer = setInterval(() => {
        setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [paymentStep]);

  // Polling: Tự động kiểm tra trạng thái đơn hàng từ Server
  React.useEffect(() => {
    let interval: NodeJS.Timeout;

    if (paymentStep === 'qr' && currentOrderId) {
      interval = setInterval(async () => {
        try {
          const res = await fetch(`/api/orders/${currentOrderId}`);
          if (res.ok) {
            const order = await res.json();
            if (order.status === 'paid') {
              setPaymentStep('success');
              clearCart();
              clearInterval(interval);
            }
          }
        } catch (error) {
          console.error('Lỗi khi kiểm tra trạng thái đơn hàng:', error);
        }
      }, 5000); // Kiểm tra mỗi 5 giây
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [paymentStep, currentOrderId, clearCart]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length <= 10) {
      setFormData({ ...formData, phone: value });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.phone.length !== 10) {
      alert('Vui lòng nhập số điện thoại hợp lệ (đúng 10 chữ số).');
      return;
    }

    try {
      const orderData = {
        ...formData,
        totalPrice,
        items: cartItems.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price
        }))
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Đặt hàng thất bại');
      }

      if (formData.paymentMethod === 'banking') {
        setCurrentOrderId(data.order.id);
        setPaymentStep('qr');
      } else {
        setPaymentStep('success');
        clearCart();
      }
    } catch (error) {
      console.error('Lỗi khi đặt hàng:', error);
      alert('Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại sau.');
    }
  };

  if (paymentStep === 'success') {
    return (
      <div className="py-24 max-w-3xl mx-auto px-4 text-center">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500 shadow-inner">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
        </div>
        <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Đặt hàng thành công!</h2>
        <p className="text-slate-600 mb-8 text-lg">Cảm ơn bạn đã tin tưởng FastFix. Chúng tôi sẽ sớm liên hệ với bạn qua số điện thoại để xác nhận đơn hàng.</p>
        <Link href="/" className="inline-flex bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
          Quay lại trang chủ
        </Link>
      </div>
    );
  }

  if (paymentStep === 'qr') {
    // VietQR URL format: https://img.vietqr.io/image/<BANK_ID>-<ACCOUNT_NO>-<TEMPLATE>.png?amount=<AMOUNT>&addInfo=<INFO>&accountName=<NAME>
    const qrUrl = `https://img.vietqr.io/image/${BANK_CONFIG.BANK_ID}-${BANK_CONFIG.ACCOUNT_NO}-compact2.png?amount=${totalPrice}&addInfo=${formData.phone}&accountName=${encodeURIComponent(BANK_CONFIG.ACCOUNT_NAME)}`;

    return (
      <div className="py-16 bg-slate-50 min-h-screen">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Thanh toán đơn hàng</h1>
          <p className="text-slate-600 mb-8 text-lg">Quét mã QR dưới đây bằng ứng dụng ngân hàng của bạn</p>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-400 to-blue-600 animate-pulse"></div>

            <div className="flex flex-col items-center justify-center">
              <div className="mb-4">
                <span className="text-sm font-bold text-red-500 bg-red-50 px-4 py-2 rounded-full border border-red-100 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Đơn hàng hết hạn sau: <span className="text-xl font-black">{formatTime(timeLeft)}</span>
                </span>
              </div>

              <div className="relative w-64 h-64 border-4 border-cyan-100 rounded-2xl overflow-hidden mb-6 shadow-sm">
                <Image src={qrUrl} alt="QR Code Thanh Toán" fill className="object-contain p-2 bg-white" unoptimized />
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl w-full text-left border border-slate-100 mb-8">
                <div className="flex justify-between items-center mb-3 pb-3 border-b border-slate-200/60">
                  <span className="text-slate-500">Số tiền:</span>
                  <span className="text-2xl font-black text-cyan-600">{totalPrice.toLocaleString('vi-VN')}đ</span>
                </div>
                <div className="flex justify-between items-center mb-3 pb-3 border-b border-slate-200/60">
                  <span className="text-slate-500">Nội dung chuyển khoản:</span>
                  <span className="font-bold text-slate-900 uppercase">{formData.phone}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Ngân hàng:</span>
                  <span className="font-bold text-slate-900 text-right">
                    TPBank <br />
                    <span className="text-sm text-slate-500">{BANK_CONFIG.ACCOUNT_NO} - {BANK_CONFIG.ACCOUNT_NAME}</span>
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-3 text-orange-600 font-semibold bg-orange-50 px-6 py-3 rounded-full border border-orange-100">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-orange-600"></div>
                  Hệ thống đang tự động kiểm tra...
                </div>
                <p className="text-slate-400 text-sm italic">
                  Vui lòng không tắt trang này. Hệ thống sẽ tự động xác nhận sau khi bạn chuyển khoản thành công.Nếu chờ quá 15 phút chưa nhận được phản hồi vui lòng liên hệ với FastFix để được hỗ trợ.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="py-24 max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Không có sản phẩm nào để thanh toán</h2>
        <Link href="/san-pham" className="inline-flex bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-3 rounded-xl font-bold mt-4">
          Tiếp tục mua sắm
        </Link>
      </div>
    );
  }

  return (
    <div className="py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/gio-hang" className="inline-flex items-center gap-2 text-slate-500 hover:text-cyan-600 font-semibold mb-8 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Quay lại giỏ hàng
        </Link>

        <h1 className="text-4xl font-black text-slate-900 mb-10 tracking-tight">Thanh toán</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Thông tin giao hàng */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center text-sm">1</span>
                Thông tin giao hàng
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Họ và tên *</label>
                    <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all outline-none" placeholder="Nhập họ và tên" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Số điện thoại *</label>
                    <input required type="tel" pattern="[0-9]{10}" title="Vui lòng nhập đúng 10 chữ số" maxLength={10} name="phone" value={formData.phone} onChange={handlePhoneChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all outline-none" placeholder="Nhập đúng 10 chữ số" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Địa chỉ Email (Tùy chọn - Dùng để nhận Key)</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all outline-none" placeholder="nhap-email@gmail.com" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Địa chỉ giao hàng *</label>
                  <input required type="text" name="address" value={formData.address} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all outline-none" placeholder="Số nhà, tên đường, phường/xã, quận/huyện..." />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Ghi chú (Tùy chọn)</label>
                  <textarea name="notes" value={formData.notes} onChange={handleChange} rows={3} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all outline-none" placeholder="Ghi chú thêm về đơn hàng hoặc thời gian giao hàng..."></textarea>
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center text-sm">2</span>
                    Phương thức thanh toán
                  </h2>
                  <div className="space-y-4">
                    <label className={`flex items-center gap-4 p-4 border rounded-xl transition-colors ${hasKeyProduct ? 'border-slate-200 bg-slate-50 opacity-60 cursor-not-allowed' : formData.paymentMethod === 'cod' ? 'border-cyan-500 bg-cyan-50 cursor-pointer' : 'border-slate-200 hover:border-cyan-300 cursor-pointer'}`}>
                      <input type="radio" name="paymentMethod" value="cod" disabled={hasKeyProduct} checked={formData.paymentMethod === 'cod'} onChange={handleChange} className="w-5 h-5 text-cyan-600 focus:ring-cyan-500" />
                      <div className="flex-1 font-semibold text-slate-900">
                        Thanh toán khi nhận hàng (COD)
                        {hasKeyProduct && <div className="text-xs text-red-500 mt-1">Không áp dụng cho sản phẩm Key Bản Quyền Số</div>}
                      </div>
                      <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    </label>

                    <label className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-colors ${formData.paymentMethod === 'banking' ? 'border-cyan-500 bg-cyan-50' : 'border-slate-200 hover:border-cyan-300'}`}>
                      <input type="radio" name="paymentMethod" value="banking" checked={formData.paymentMethod === 'banking'} onChange={handleChange} className="w-5 h-5 text-cyan-600 focus:ring-cyan-500" />
                      <div className="flex-1 font-semibold text-slate-900">
                        Chuyển khoản ngân hàng (Quét mã QR)
                        {formData.paymentMethod === 'banking' && <div className="text-xs text-slate-500 mt-1 font-normal">Mã QR thanh toán sẽ hiện ra sau khi bạn xác nhận đơn hàng.</div>}
                      </div>
                      <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                    </label>
                  </div>
                </div>

                <button type="submit" className="w-full mt-8 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  Xác nhận đặt hàng
                </button>
              </form>
            </div>
          </div>

          {/* Chi tiết đơn hàng */}
          <div className="lg:col-span-5">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm sticky top-32">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Chi tiết đơn hàng ({cartItems.length} sản phẩm)</h3>

              <div className="space-y-4 max-h-96 overflow-y-auto pr-2 mb-6">
                {cartItems.map(item => (
                  <div key={item.id} className="flex gap-4 border-b border-slate-100 pb-4 relative group">
                    <div className="w-16 h-16 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100 shrink-0 relative overflow-hidden">
                      {item.category === 'ram' ? (
                        <Image src="/ram.png" alt={item.name} fill className="object-cover" />
                      ) : item.category === 'ssd' ? (
                        <Image src="/ssd.png" alt={item.name} fill className="object-cover" />
                      ) : (
                        <div className="text-orange-500 text-xs font-bold">KEY</div>
                      )}
                      <span className="absolute -top-1 -right-1 bg-slate-800 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full z-10">{item.quantity}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-semibold text-slate-900 text-sm line-clamp-2 flex-1">{item.name}</h4>
                        <button
                          onClick={() => handleRemoveItem(item.id, item.name)}
                          className="w-6 h-6 rounded-full bg-slate-100 text-slate-400 hover:bg-red-50 hover:text-red-500 flex items-center justify-center transition-all shrink-0"
                          title="Xóa sản phẩm"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
                        </button>
                      </div>
                      <div className="text-cyan-600 font-bold mt-1">{(item.price * item.quantity).toLocaleString('vi-VN')}đ</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 text-slate-600 mb-6">
                <div className="flex justify-between">
                  <span>Tạm tính</span>
                  <span className="font-semibold text-slate-900">{totalPrice.toLocaleString('vi-VN')}đ</span>
                </div>
                <div className="flex justify-between">
                  <span>Phí vận chuyển</span>
                  <span className="text-cyan-600 font-semibold">Miễn phí</span>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-6">
                <div className="flex justify-between items-end">
                  <span className="text-slate-900 font-bold text-lg">Tổng cộng</span>
                  <span className="text-3xl font-black text-orange-600">{totalPrice.toLocaleString('vi-VN')}đ</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
