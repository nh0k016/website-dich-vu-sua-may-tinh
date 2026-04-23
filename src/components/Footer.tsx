import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-50 pt-20 pb-12 border-t border-slate-200 relative overflow-hidden mt-auto">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-100/50 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-12 relative z-10">
        <div className="col-span-1 md:col-span-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center font-black text-xl text-white">FF</div>
            <span className="text-2xl font-bold tracking-wider text-slate-900">FAST<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">FIX</span></span>
          </div>
          <p className="text-slate-500 text-base mb-8 leading-relaxed pr-8">
            Dịch vụ sửa chữa máy tính trực tuyến hàng đầu. Uy tín, nhanh chóng, bảo mật dữ liệu tuyệt đối. Chúng tôi mang giải pháp công nghệ đến tận nhà bạn.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-cyan-500 hover:border-cyan-500 hover:text-white transition-all shadow-sm">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
            </a>
            <a href="#" className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-all shadow-sm">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
          </div>
        </div>
        <div className="col-span-1 md:col-span-2 md:col-start-7">
          <h4 className="text-slate-900 font-bold text-lg mb-6">Về chúng tôi</h4>
          <ul className="space-y-4 text-base text-slate-600">
            <li><Link href="/" className="hover:text-cyan-600 transition-colors">Trang chủ</Link></li>
            <li><Link href="/san-pham" className="hover:text-cyan-600 transition-colors">Sản phẩm</Link></li>
            <li><Link href="/dich-vu" className="hover:text-cyan-600 transition-colors">Dịch vụ</Link></li>
            <li><Link href="/tin-tuc" className="hover:text-cyan-600 transition-colors">Tin tức</Link></li>
            <li><Link href="/lien-he" className="hover:text-cyan-600 transition-colors">Liên hệ</Link></li>
          </ul>
        </div>
        <div className="col-span-1 md:col-span-4">
          <h4 className="text-slate-900 font-bold text-lg mb-6">Liên hệ</h4>
          <ul className="space-y-4 text-base text-slate-600">
            <li className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 text-cyan-600 shadow-sm">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <span className="mt-2 text-slate-600">51/34 Vườn Lài nối dài, An Phú Đông, Quận 12, TP HCM (cũ)</span>
            </li>
            <li className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 text-cyan-600 shadow-sm">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              </div>
              <span className="font-semibold text-slate-900 text-lg">0877.023.032</span>
            </li>
            <li className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 text-cyan-600 shadow-sm">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <span>support@fastfix.com</span>
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
