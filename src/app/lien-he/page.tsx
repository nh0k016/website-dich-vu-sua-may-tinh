"use client";

import { SITE_CONFIG } from '@/lib/config';

export default function ContactPage() {
  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-slate-900">Liên hệ với Fast Fix</h1>
          <p className="text-xl text-slate-600">
            Chúng tôi luôn sẵn sàng hỗ trợ bạn. Gửi tin nhắn hoặc gọi điện trực tiếp để nhận tư vấn nhanh nhất.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-2xl font-bold text-slate-900 mb-8">Thông tin liên hệ</h3>
            <ul className="space-y-8 text-lg text-slate-600">
              <li className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-full bg-cyan-50 border border-cyan-100 flex items-center justify-center shrink-0 text-cyan-600 shadow-sm">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div>
                  <div className="font-bold text-slate-900 mb-1">Địa chỉ</div>
                  <span>51/34 Vườn Lài nối dài, An Phú Đông, Quận 12, TP HCM (cũ)</span>
                </div>
              </li>
              <li className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-full bg-cyan-50 border border-cyan-100 flex items-center justify-center shrink-0 text-cyan-600 shadow-sm">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <div>
                  <div className="font-bold text-slate-900 mb-1">Điện thoại</div>
                  <span className="font-semibold text-cyan-600 text-xl">{SITE_CONFIG.phone}</span>
                </div>
              </li>
              <li className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-full bg-cyan-50 border border-cyan-100 flex items-center justify-center shrink-0 text-cyan-600 shadow-sm">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <div className="font-bold text-slate-900 mb-1">Email</div>
                  <span>{SITE_CONFIG.email}</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Contact Form Placeholder */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Nhắn tin cho chúng tôi</h3>
            <p className="text-slate-600 mb-8">
              Để được tư vấn và giải quyết vấn đề nhanh nhất, vui lòng liên hệ trực tiếp qua Zalo. Chuyên viên kỹ thuật sẽ phản hồi ngay lập tức.
            </p>
            <a href="https://zalo.me/0877023032" target="_blank" rel="noopener noreferrer" className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center gap-3">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12c0 2.453.738 4.73 2.002 6.6L.484 23.518l5.127-1.442A11.956 11.956 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
              Chat qua Zalo ngay
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
