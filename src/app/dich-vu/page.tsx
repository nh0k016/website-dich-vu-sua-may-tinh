"use client";

import React from 'react';
import Link from 'next/link';

export default function ServicesPage() {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-slate-900">Dịch vụ sửa chữa chuyên nghiệp</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Chúng tôi cung cấp các giải pháp toàn diện cho máy tính của bạn, từ cài đặt phần mềm, vệ sinh bảo dưỡng đến xử lý sự cố từ xa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {/* Service 1 */}
          <div className="group bg-white border border-slate-200 hover:border-cyan-300 rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/10 relative overflow-hidden flex flex-col shadow-sm">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-100/50 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-cyan-200/50 transition-colors"></div>
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-2xl flex items-center justify-center mb-8 text-cyan-600 group-hover:scale-110 group-hover:rotate-3 transition-all border border-cyan-200">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Sửa máy tính online</h3>
            <p className="text-slate-600 text-base leading-relaxed mb-8 flex-grow">Hỗ trợ chẩn đoán và khắc phục sự cố phần mềm, tối ưu hóa hệ thống từ xa chuyên nghiệp, nhanh chóng qua UltraViewer.</p>
            <Link href="/dich-vu/sua-may-tinh-online" className="inline-flex text-cyan-600 font-bold items-center gap-2 hover:text-cyan-700 group-hover:gap-3 transition-all mt-auto text-lg">
              Tìm hiểu thêm <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </Link>
          </div>

          {/* Service 2 */}
          <div className="group bg-white border border-slate-200 hover:border-blue-300 rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/10 relative overflow-hidden flex flex-col shadow-sm">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/50 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-blue-200/50 transition-colors"></div>
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mb-8 text-blue-600 group-hover:scale-110 group-hover:rotate-3 transition-all border border-blue-200">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Sửa máy tính tận nơi</h3>
            <p className="text-slate-600 text-base leading-relaxed mb-8 flex-grow">Kiểm tra, chẩn đoán và khắc phục sự cố phần cứng/phần mềm ngay tại nhà hoặc văn phòng của bạn.</p>
            <Link href="/dich-vu/sua-may-tinh-tan-noi" className="inline-flex text-blue-600 font-bold items-center gap-2 hover:text-blue-700 group-hover:gap-3 transition-all mt-auto text-lg">
              Tìm hiểu thêm <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </Link>
          </div>

          {/* Service 3 */}
          <div className="group bg-white border border-slate-200 hover:border-purple-300 rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-500/10 relative overflow-hidden flex flex-col shadow-sm">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100/50 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-purple-200/50 transition-colors"></div>
            <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mb-8 text-purple-600 group-hover:scale-110 group-hover:rotate-3 transition-all border border-purple-200">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Cài đặt phần mềm</h3>
            <p className="text-slate-600 text-base leading-relaxed mb-8 flex-grow">Hỗ trợ cài đặt phần mềm đồ họa (Photoshop, AutoCAD), Office, phần mềm diệt virus chuyên nghiệp.</p>
            <Link href="/dich-vu/cai-dat-phan-mem" className="inline-flex text-purple-600 font-bold items-center gap-2 hover:text-purple-700 group-hover:gap-3 transition-all mt-auto text-lg">
              Tìm hiểu thêm <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </Link>
          </div>

          {/* Service 4 */}
          <div className='group bg-white border border-slate-200 hover:border-orange-300 rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-orange-500/10 relative overflow-hidden flex flex-col shadow-sm'>
            <div className='absolute top-0 right-0 w-32 h-32 bg-orange-100/50 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-orange-200/50 transition-colors'></div>
            <div className='w-16 h-16 bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl flex items-center justify-center mb-8 text-orange-600 group-hover:scale-110 group-hover:rotate-3 transition-all border border-orange-200'>
              <svg
                className='w-8 h-8'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z'
                />
              </svg>
            </div>
            <h3 className='text-2xl font-bold text-slate-900 mb-4'>Vệ sinh máy tính</h3>
            <p className='text-slate-600 text-base leading-relaxed mb-8 flex-grow'>
              Dịch vụ vệ sinh PC/Laptop tận nơi. Tra keo tản nhiệt xịn, dọn dẹp bụi bẩn,
              giảm nhiệt độ tức thì.
            </p>
            <Link
              href='/dich-vu/ve-sinh-may-tinh'
              className='inline-flex text-orange-600 font-bold items-center gap-2 hover:text-orange-700 group-hover:gap-3 transition-all mt-auto text-lg'
            >
              Tìm hiểu thêm{' '}
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M14 5l7 7m0 0l-7 7m7-7H3'
                />
              </svg>
            </Link>
          </div>;


        </div>
      </div>
    </div>
  );
}
