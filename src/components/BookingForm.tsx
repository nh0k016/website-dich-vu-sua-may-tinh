'use client';

import React, { useState } from 'react';

export default function BookingForm({ serviceName }: { serviceName: string }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      serviceName: formData.get('serviceName'),
      notes: formData.get('notes'),
    };

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Lỗi khi đặt lịch:', error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-emerald-50 border-2 border-emerald-200 p-10 rounded-[32px] text-center animate-in zoom-in duration-500">
        <div className="w-20 h-20 bg-emerald-500 text-white rounded-full flex items-center justify-center text-4xl mx-auto mb-6 shadow-lg shadow-emerald-200">
          ✓
        </div>
        <h3 className="text-2xl font-black text-slate-900 mb-2">Đăng ký thành công!</h3>
        <p className="text-slate-600 font-medium mb-8">Kỹ thuật viên FastFix sẽ liên hệ với bạn trong vòng 15-30 phút để xác nhận lịch hẹn.</p>
        <button 
          onClick={() => setStatus('idle')}
          className="text-emerald-600 font-black uppercase tracking-widest text-sm hover:underline"
        >
          Gửi yêu cầu khác
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 md:p-12 rounded-[40px] border border-slate-200 shadow-2xl relative overflow-hidden group">
      {status === 'error' && (
        <div className="absolute inset-0 z-50 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-300">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-2xl mb-4">✕</div>
          <h3 className="text-xl font-black text-slate-900 mb-2">Đã có lỗi xảy ra!</h3>
          <p className="text-slate-500 text-sm mb-6 font-medium">Không thể gửi yêu cầu lúc này. Vui lòng thử lại hoặc gọi trực tiếp Hotline.</p>
          <button 
            onClick={() => setStatus('idle')}
            className="bg-slate-900 text-white px-6 py-2 rounded-xl font-bold text-sm"
          >
            Thử lại
          </button>
        </div>
      )}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700"></div>
      
      <div className="relative z-10">
        <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">Đặt Lịch Nhanh</h3>
        <p className="text-slate-500 font-medium mb-8">Vui lòng để lại thông tin, chúng tôi sẽ gọi lại ngay!</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Họ tên của bạn</label>
            <input 
              required
              name="name"
              type="text" 
              placeholder="Ví dụ: Nguyễn Văn A"
              className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none font-bold text-slate-700 placeholder:text-slate-300"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Số điện thoại</label>
              <input 
                required
                name="phone"
                type="tel" 
                placeholder="090x xxx xxx"
                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none font-bold text-slate-700 placeholder:text-slate-300"
              />
            </div>
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Dịch vụ cần làm</label>
              <select 
                name="serviceName"
                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none font-bold text-slate-700"
                defaultValue={serviceName}
              >
                <option value="Sửa máy tính tận nơi">Sửa máy tính tận nơi</option>
                <option value="Vệ sinh máy tính">Vệ sinh máy tính</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Địa chỉ hoặc Ghi chú</label>
            <textarea 
              name="notes"
              rows={3}
              placeholder="Địa chỉ của bạn hoặc yêu cầu cụ thể..."
              className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none font-bold text-slate-700 placeholder:text-slate-300 resize-none"
            ></textarea>
          </div>

          <button 
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-slate-900 hover:bg-blue-600 text-white py-5 rounded-2xl font-black text-xl transition-all shadow-xl shadow-slate-200 disabled:opacity-50 flex items-center justify-center gap-3 group/btn"
          >
            {status === 'loading' ? (
              <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <>
                XÁC NHẬN ĐẶT LỊCH
                <svg className="w-6 h-6 transition-transform group-hover/btn:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </>
            )}
          </button>

          <p className="text-center text-slate-400 text-[10px] font-bold uppercase tracking-widest">Cam kết bảo mật thông tin 100%</p>
        </form>
      </div>
    </div>
  );
}
