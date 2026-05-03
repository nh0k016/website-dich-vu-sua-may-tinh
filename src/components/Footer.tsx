import React from 'react';
import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/config';

export default function Footer() {
  return (
    <footer className="bg-slate-50 pt-20 pb-12 border-t border-slate-200 relative overflow-hidden mt-auto">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-100/50 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-16 border-b border-slate-200">
          <div className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600 shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            </div>
            <div>
              <h5 className="font-bold text-slate-900">Bảo mật tuyệt đối</h5>
              <p className="text-sm text-slate-500">Cam kết bảo mật dữ liệu khách hàng tuyệt đối.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-cyan-50 rounded-xl flex items-center justify-center text-cyan-600 shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <div>
              <h5 className="font-bold text-slate-900">Xử lý nhanh chóng</h5>
              <p className="text-sm text-slate-500">Tiết kiệm thời gian, hỗ trợ tức thì qua mạng.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div>
              <h5 className="font-bold text-slate-900">Bảo hành uy tín</h5>
              <p className="text-sm text-slate-500">Hỗ trợ hậu mãi chu đáo sau khi sửa máy.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-12 relative z-10">
        <div className="col-span-1 md:col-span-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center font-black text-xl text-white">FF</div>
            <span className="text-2xl font-bold tracking-wider text-slate-900">FAST<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">FIX</span></span>
          </div>
          <p className="text-slate-500 text-base mb-8 leading-relaxed pr-8">
            Dịch vụ sửa chữa máy tính trực tuyến hàng đầu Việt Nam. Chúng tôi mang đến giải pháp kỹ thuật chuyên nghiệp ngay tại bàn làm việc của bạn.
          </p>
          <div className="flex gap-4">
            <a href={SITE_CONFIG.social.facebook} target="_blank" className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-all shadow-sm">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href={SITE_CONFIG.social.zalo} target="_blank" className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-cyan-500 hover:border-cyan-500 hover:text-white transition-all shadow-sm">
              <span className="font-bold text-xs">Zalo</span>
            </a>
            <a href={SITE_CONFIG.social.googleMaps} target="_blank" className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-red-500 hover:border-red-500 hover:text-white transition-all shadow-sm">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </a>
          </div>
        </div>
        <div className="col-span-1 md:col-span-2 md:col-start-7">
          <h4 className="text-slate-900 font-bold text-lg mb-6">Liên kết nhanh</h4>
          <ul className="space-y-4 text-base text-slate-600">
            <li><Link href="/" className="hover:text-cyan-600 transition-colors flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-slate-300"></span> Trang chủ</Link></li>
            <li><Link href="/san-pham" className="hover:text-cyan-600 transition-colors flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-slate-300"></span> Sản phẩm</Link></li>
            <li><Link href="/dich-vu" className="hover:text-cyan-600 transition-colors flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-slate-300"></span> Dịch vụ</Link></li>
            <li><Link href="/bai-viet" className="hover:text-cyan-600 transition-colors flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-slate-300"></span> Bài viết</Link></li>
            <li><Link href="/lien-he" className="hover:text-cyan-600 transition-colors flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-slate-300"></span> Liên hệ</Link></li>
          </ul>
        </div>
        <div className="col-span-1 md:col-span-4">
          <h4 className="text-slate-900 font-bold text-lg mb-6">Thông tin liên hệ</h4>
          <ul className="space-y-6 text-base text-slate-600">
            <li className="group">
              <a 
                href={SITE_CONFIG.social.googleMaps} 
                target="_blank" 
                className="flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center shrink-0 text-cyan-600 group-hover:bg-cyan-500 group-hover:text-white transition-all">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <span className="text-slate-600 group-hover:text-cyan-600 transition-colors">{SITE_CONFIG.address}</span>
              </a>
            </li>
            <li className="flex items-center gap-4 group">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center shrink-0 text-cyan-600 group-hover:bg-cyan-500 group-hover:text-white transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              </div>
              <span className="font-black text-slate-900 text-xl tracking-tight">{SITE_CONFIG.phone}</span>
            </li>
            <li className="flex items-center gap-4 group">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center shrink-0 text-cyan-600 group-hover:bg-cyan-500 group-hover:text-white transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <span className="font-medium">{SITE_CONFIG.email}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-slate-200 text-center flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500 relative z-10">
        <div>&copy; {new Date().getFullYear()} FastFix. All rights reserved.</div>
        <div className="flex gap-6">
          <Link href="/dieu-khoan" className="hover:text-slate-800 transition-colors">Điều khoản</Link>
          <Link href="/chinh-sach-bao-mat" className="hover:text-slate-800 transition-colors">Bảo mật</Link>
        </div>
      </div>
    </footer>
  );
}
