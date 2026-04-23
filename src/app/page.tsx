"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-28 sm:py-36">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-slate-50 to-white"></div>
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-cyan-400/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-orange-400/10 rounded-full blur-[100px]"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 text-cyan-600 text-sm font-semibold mb-8 shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
            </span>
            Hỗ trợ kỹ thuật 24/7
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight text-slate-900">
            Sửa máy tính Online <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">
              Nhanh chóng - Chuyên nghiệp
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 mb-12 leading-relaxed">
            Giải quyết mọi vấn đề phần mềm, cài đặt Windows, tối ưu hệ thống từ xa mà không cần mang máy đến tiệm. Tiết kiệm thời gian, bảo mật tuyệt đối.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <a href="https://zalo.me/0877023032" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto bg-cyan-500 hover:bg-cyan-400 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40 flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              Liên hệ ngay
            </a>
            <Link href="/dich-vu" className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-sm flex items-center justify-center gap-2 hover:shadow-md">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              Tìm hiểu thêm
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white border-y border-slate-200 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col sm:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900">Dịch vụ nổi bật</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mb-6"></div>
              <p className="text-slate-500 text-lg">Giải pháp toàn diện cho thiết bị của bạn</p>
            </div>
            <Link href="/dich-vu" className="inline-flex text-cyan-600 font-semibold items-center gap-2 hover:text-cyan-700 transition-colors bg-cyan-50 px-6 py-3 rounded-full border border-cyan-100 hover:bg-cyan-100">
              Xem tất cả dịch vụ <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Service 1 */}
            <div className="group bg-slate-50 border border-slate-200 hover:border-cyan-300 rounded-3xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/10 relative overflow-hidden flex flex-col">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-100/50 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-cyan-200/50 transition-colors"></div>
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-2xl flex items-center justify-center mb-6 text-cyan-600 group-hover:scale-110 group-hover:rotate-3 transition-all border border-cyan-200">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Sửa máy tính online</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">Hỗ trợ chẩn đoán và khắc phục sự cố phần mềm, tối ưu hóa hệ thống từ xa chuyên nghiệp, nhanh chóng qua UltraViewer.</p>
              <Link href="/dich-vu/sua-may-tinh-online" className="inline-flex text-cyan-600 font-semibold items-center gap-2 hover:text-cyan-700 group-hover:gap-3 transition-all mt-auto">
                Tìm hiểu thêm <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </Link>
            </div>

            {/* Service 2 */}
            <div className="group bg-slate-50 border border-slate-200 hover:border-blue-300 rounded-3xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/10 relative overflow-hidden flex flex-col">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/50 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-blue-200/50 transition-colors"></div>
              <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mb-6 text-blue-600 group-hover:scale-110 group-hover:rotate-3 transition-all border border-blue-200">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Sửa máy tính tận nơi</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">Kiểm tra, chẩn đoán và khắc phục sự cố phần cứng/phần mềm ngay tại nhà hoặc văn phòng của bạn.</p>
              <Link href="/dich-vu/sua-may-tinh-tan-noi" className="inline-flex text-blue-600 font-semibold items-center gap-2 hover:text-blue-700 group-hover:gap-3 transition-all mt-auto">
                Tìm hiểu thêm <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </Link>
            </div>

            {/* Service 3 */}
            <div className="group bg-slate-50 border border-slate-200 hover:border-purple-300 rounded-3xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-500/10 relative overflow-hidden flex flex-col">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100/50 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-purple-200/50 transition-colors"></div>
              <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mb-6 text-purple-600 group-hover:scale-110 group-hover:rotate-3 transition-all border border-purple-200">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Cài đặt phần mềm</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">Hỗ trợ cài đặt phần mềm đồ họa (Photoshop, AutoCAD), Office, phần mềm diệt virus chuyên nghiệp.</p>
              <Link href="/dich-vu/cai-dat-phan-mem" className="inline-flex text-purple-600 font-semibold items-center gap-2 hover:text-purple-700 group-hover:gap-3 transition-all mt-auto">
                Tìm hiểu thêm <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </Link>
            </div>

            {/* Service 4 */}
            <div className="group bg-slate-50 border border-slate-200 hover:border-orange-300 rounded-3xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-orange-500/10 relative overflow-hidden flex flex-col">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100/50 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-orange-200/50 transition-colors"></div>
              <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl flex items-center justify-center mb-6 text-orange-600 group-hover:scale-110 group-hover:rotate-3 transition-all border border-orange-200">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Vệ sinh máy tính</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">Dịch vụ vệ sinh PC/Laptop tận nơi. Tra keo tản nhiệt xịn, dọn dẹp bụi bẩn, giảm nhiệt độ tức thì.</p>
              <Link href="/dich-vu/ve-sinh-may-tinh" className="inline-flex text-orange-600 font-semibold items-center gap-2 hover:text-orange-700 group-hover:gap-3 transition-all mt-auto">
                Tìm hiểu thêm <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>


    </>
  );
}
