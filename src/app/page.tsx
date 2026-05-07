"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import RemoteSupportMockup from '@/components/RemoteSupportMockup';
import { ServiceSkeleton } from '@/components/Skeleton';
import { ScrollReveal } from '@/components/ScrollReveal';
import { SITE_CONFIG } from '@/lib/config';

export default function Home() {
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/services', { cache: 'no-store' })
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(err => console.error("Lỗi khi tải dịch vụ:", err));
  }, []);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'monitor':
        return <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
      case 'home':
        return <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
      case 'upload':
        return <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>;
      case 'sparkles':
        return <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" /></svg>;
      case 'shield':
        return <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>;
      case 'bolt':
        return <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
      default:
        return <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
    }
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'cyan': return { border: 'hover:border-cyan-200', bg: 'bg-cyan-50', text: 'text-cyan-600', shadow: 'hover:shadow-cyan-500/10' };
      case 'blue': return { border: 'hover:border-blue-200', bg: 'bg-blue-50', text: 'text-blue-600', shadow: 'hover:shadow-blue-500/10' };
      case 'purple': return { border: 'hover:border-purple-200', bg: 'bg-purple-50', text: 'text-purple-600', shadow: 'hover:shadow-purple-500/10' };
      case 'orange': return { border: 'hover:border-orange-200', bg: 'bg-orange-50', text: 'text-orange-600', shadow: 'hover:shadow-orange-500/10' };
      case 'amber': return { border: 'hover:border-amber-200', bg: 'bg-amber-50', text: 'text-amber-600', shadow: 'hover:shadow-amber-500/10' };
      case 'green': return { border: 'hover:border-green-200', bg: 'bg-green-50', text: 'text-green-600', shadow: 'hover:shadow-green-500/10' };
      default: return { border: 'hover:border-cyan-200', bg: 'bg-cyan-50', text: 'text-cyan-600', shadow: 'hover:shadow-cyan-500/10' };
    }
  };
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-48 sm:pb-32">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-slate-50 to-white"></div>
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[120px]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-left animate-in fade-in slide-in-from-left duration-1000">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-700 text-sm font-bold mb-8 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                Hỗ trợ kỹ thuật Online (8:30 - 22:00)
              </div>

              <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8 leading-[1.1] text-slate-900">
                Sửa máy tính online <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-700">
                  Nhanh chóng - Chuyên nghiệp
                </span>
              </h1>

              <p className="max-w-xl text-lg md:text-xl text-slate-600 mb-10 leading-relaxed">
                Giải quyết mọi lỗi Windows, phần mềm, virus và tối ưu máy tính <strong>chỉ trong 30 phút</strong>. Không cần mang máy đi, bảo mật tuyệt đối qua UltraViewer/TeamView.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
                <a href={SITE_CONFIG.social.zalo} target="_blank" rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-10 py-5 rounded-2xl font-black text-xl transition-all shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 flex items-center justify-center gap-3 transform hover:-translate-y-1">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  LIÊN HỆ NGAY
                </a>
                <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <div className="flex -space-x-2">
                    {['vn1.png', 'vn2.png', 'vn3.png'].map((img, i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden relative shadow-sm">
                        <Image src={`/customers/${img}`} alt="User" fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                  <div className="text-sm">
                    <div className="font-bold text-slate-900">1,000+ Khách hàng</div>
                    <div className="text-slate-500 text-xs">Đã tin dùng dịch vụ</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 border-t border-slate-100 pt-10">
                <div className="flex items-center gap-2 text-slate-600 font-medium text-sm">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  Nhanh chóng
                </div>
                <div className="flex items-center gap-2 text-slate-600 font-medium text-sm">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  Bảo mật
                </div>
                <div className="flex items-center gap-2 text-slate-600 font-medium text-sm">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  Giá hợp lý
                </div>
              </div>
            </div>

            <div className="hidden lg:block relative animate-in zoom-in duration-1000">
              <RemoteSupportMockup />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Stats Section */}
      <section className="py-16 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-500 to-transparent"></div>
          <div className="absolute top-0 left-2/4 w-px h-full bg-gradient-to-b from-transparent via-blue-500 to-transparent"></div>
          <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-purple-500 to-transparent"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div className="hover:scale-110 transition-transform cursor-default">
              <div className="text-4xl md:text-5xl font-black text-cyan-400 mb-2">5+</div>
              <div className="text-slate-400 font-medium uppercase tracking-widest text-xs">Năm kinh nghiệm</div>
            </div>
            <div className="hover:scale-110 transition-transform cursor-default">
              <div className="text-4xl md:text-5xl font-black text-blue-400 mb-2">1,000+</div>
              <div className="text-slate-400 font-medium uppercase tracking-widest text-xs">Khách hài lòng</div>
            </div>
            <div className="hover:scale-110 transition-transform cursor-default">
              <div className="text-4xl md:text-5xl font-black text-purple-400 mb-2">30 Phút</div>
              <div className="text-slate-400 font-medium uppercase tracking-widest text-xs">Thời gian xử lý</div>
            </div>
            <div className="hover:scale-110 transition-transform cursor-default">
              <div className="text-4xl md:text-5xl font-black text-orange-400 mb-2">14H</div>
              <div className="text-slate-400 font-medium uppercase tracking-widest text-xs">Mỗi ngày (8:30-22h)</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-6xl font-black mb-6 text-slate-900 tracking-tight">Dịch Vụ Của Chúng Tôi</h2>
            <p className="text-slate-500 text-lg md:text-xl leading-relaxed">
              Từ hỗ trợ cài đặt phần mềm, vệ sinh bảo dưỡng đến xử lý sự cố từ xa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.length === 0 ? (
              <>
                <ServiceSkeleton />
                <ServiceSkeleton />
                <ServiceSkeleton />
                <ServiceSkeleton />
              </>
            ) : services.map((service, index) => {
              const colors = getColorClasses(service.color);
              return (
                <ScrollReveal key={service.id} delay={index * 0.1}>
                  <div className={`group bg-white border border-slate-100 ${colors.border} rounded-[32px] p-8 transition-all duration-300 hover:-translate-y-2 shadow-sm ${colors.shadow} flex flex-col items-start text-left h-full`}>
                    <div className={`w-16 h-16 ${colors.bg} rounded-2xl flex items-center justify-center mb-8 ${colors.text} group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 border border-slate-100`}>
                      {getServiceIcon(service.icon)}
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-4">{service.title}</h3>
                    <p className="text-slate-500 leading-relaxed mb-8 text-sm flex-grow">{service.description}</p>
                    <Link href={`/dich-vu/${service.slug}`} className={`${colors.text} font-black flex items-center gap-2 group-hover:gap-4 transition-all`}>
                      Tìm hiểu thêm <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </Link>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="py-32 bg-slate-50 border-y border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6">Quy Trình 3 Bước Đơn Giản</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">Chỉ mất vài phút để chúng tôi kết nối và giải quyết vấn đề của bạn.</p>
          </div>

          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-cyan-200 via-blue-200 to-purple-200 -translate-y-1/2"></div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
              {[
                { step: "01", title: "Liên Hệ Zalo", desc: "Chụp ảnh lỗi hoặc mô tả tình trạng máy qua Zalo cho chúng tôi.", color: "bg-cyan-500", link: SITE_CONFIG.social.zalo },
                { step: "02", title: "Kết Nối Từ Xa", desc: "Mở UltraViewer hoặc TeamViewer để kỹ thuật viên đăng nhập xử lý.", color: "bg-blue-500" },
                { step: "03", title: "Xử Lý & Nghiệm Thu", desc: "Chúng tôi fix lỗi, bạn kiểm tra máy ok mới tiến hành thanh toán.", color: "bg-purple-500" },
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-10 rounded-[40px] shadow-xl border border-slate-100 text-center relative group hover:shadow-2xl transition-all duration-500">
                  <div className={`w-16 h-16 ${item.color} text-white rounded-2xl flex items-center justify-center text-2xl font-black mx-auto mb-8 shadow-lg group-hover:scale-110 transition-all`}>
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-4">{item.title}</h3>
                  <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 leading-tight">Khách Hàng Nói Gì Về <span className="text-cyan-500">FastFix</span></h2>
              <p className="text-slate-500 text-lg mb-12">Hơn 1,000+ khách hàng đã tin tưởng và hài lòng với dịch vụ hỗ trợ từ xa của chúng tôi.</p>
              <div className="flex gap-4">
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex-1">
                  <div className="text-3xl font-black text-slate-900 mb-1">4.9/5</div>
                  <div className="text-slate-500 text-sm">Đánh giá trung bình</div>
                </div>
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex-1">
                  <div className="text-3xl font-black text-slate-900 mb-1">98%</div>
                  <div className="text-slate-500 text-sm">Khách hàng quay lại</div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {[
                { 
                  name: "Anh Minh", 
                  role: "Designer", 
                  image: "/customers/minh.png",
                  content: "Lúc đang gấp deadline mà máy bị lỗi Photoshop, may có FastFix hỗ trợ online chỉ trong 15p là xong. Cực kỳ chuyên nghiệp!" 
                },
                { 
                  name: "Chị Lan", 
                  role: "Nhân viên văn phòng", 
                  image: "/customers/chau.png",
                  content: "Cài lại Windows và Office từ xa rất nhanh, giá lại rẻ hơn mang ra tiệm. Mình rất yên tâm." 
                },
                { 
                  name: "Chị Châu", 
                  role: "Sinh viên ĐH Văn Hiến", 
                  image: "/customers/chau_student.png",
                  content: "Máy tính nhà mình ở Quận 8 bị lỗi Windows, gọi dịch vụ sửa máy tính tại nhà TP HCM rất nhanh. Kỹ thuật viên đến tận nơi, làm việc chuyên nghiệp và giá hợp lý. Rất hài lòng!" 
                },
              ].map((t, i) => (
                <div key={i} className="p-8 bg-white rounded-3xl border border-slate-100 shadow-lg hover:border-cyan-200 transition-all">
                  <div className="flex text-orange-400 mb-4">
                    {[1, 2, 3, 4, 5].map(s => <svg key={s} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
                  </div>
                  <p className="text-slate-600 italic mb-6">"{t.content}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-slate-100 overflow-hidden relative border-2 border-white shadow-md">
                      <Image src={t.image} alt={t.name} fill className="object-cover" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">{t.name}</div>
                      <div className="text-slate-400 text-sm">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-cyan-600 to-blue-700 rounded-[50px] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-blue-500/20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl -ml-32 -mb-32"></div>

          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 relative z-10 leading-tight">Máy Tính Đang Gặp Lỗi? <br className="hidden md:block" /> Đừng Lo Lắng!</h2>
          <p className="text-white/80 text-xl mb-12 max-w-2xl mx-auto relative z-10">Liên hệ ngay để nhận tư vấn miễn phí và sửa lỗi nhanh nhất có thể.</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
            <a href={SITE_CONFIG.social.zalo} target="_blank" rel="noopener noreferrer"
              className="w-full sm:w-auto bg-white text-blue-700 px-12 py-5 rounded-2xl font-black text-xl hover:bg-slate-100 transition-all shadow-xl flex items-center justify-center gap-3 transform hover:scale-105 transition-transform">
              LIÊN HỆ NGAY
            </a>
            <div className="text-white font-bold flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 2V3z" /></svg>
              </div>
              Hotline: {SITE_CONFIG.phone}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
