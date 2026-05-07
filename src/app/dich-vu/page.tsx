"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ServiceSkeleton } from '@/components/Skeleton';

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/services', { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        setServices(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Lỗi khi tải dịch vụ:", err);
        setIsLoading(false);
      });
  }, []);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'monitor':
        return <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
      case 'home':
        return <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
      case 'upload':
        return <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>;
      case 'sparkles':
        return <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" /></svg>;
      case 'shield':
        return <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>;
      case 'bolt':
        return <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
      default:
        return <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
    }
  };

  const colorStyles: {[key: string]: string} = {
    cyan: "bg-cyan-50 text-cyan-600 border-cyan-100 hover:border-cyan-200 shadow-cyan-100/50",
    blue: "bg-blue-50 text-blue-600 border-blue-100 hover:border-blue-200 shadow-blue-100/50",
    purple: "bg-purple-50 text-purple-600 border-purple-100 hover:border-purple-200 shadow-purple-100/50",
    orange: "bg-orange-50 text-orange-600 border-orange-100 hover:border-orange-200 shadow-orange-100/50",
    amber: "bg-amber-50 text-amber-600 border-amber-100 hover:border-amber-200 shadow-amber-100/50",
    green: "bg-green-50 text-green-600 border-green-100 hover:border-green-200 shadow-green-100/50",
  };

  const textStyles: {[key: string]: string} = {
    cyan: "text-cyan-600",
    blue: "text-blue-600",
    purple: "text-purple-600",
    orange: "text-orange-600",
    amber: "text-amber-600",
    green: "text-green-600",
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-500 to-transparent"></div>
          <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-500 to-transparent"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight">Dịch Vụ <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Chuyên Nghiệp</span></h1>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto leading-relaxed">
            Giải pháp hỗ trợ kỹ thuật máy tính toàn diện, nhanh chóng và bảo mật ngay tại nhà bạn.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20 pb-32">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ServiceSkeleton />
            <ServiceSkeleton />
            <ServiceSkeleton />
            <ServiceSkeleton />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={service.id} className={`group bg-white border rounded-[40px] p-10 transition-all duration-500 hover:-translate-y-2 shadow-xl border-slate-100`}>
                <div className="flex flex-col md:flex-row gap-8 items-start md:items-center mb-8">
                  <div className={`w-20 h-20 rounded-3xl flex items-center justify-center shrink-0 border border-current/10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 ${colorStyles[service.color]}`}>
                    {getServiceIcon(service.icon)}
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-slate-900 mb-3">{service.title}</h3>
                    {service.price && (
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-sm font-bold">
                        {service.price}
                      </div>
                    )}
                  </div>
                </div>
                
                <p className="text-slate-500 text-lg leading-relaxed mb-10 h-20">
                  {service.description}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 mt-auto items-center justify-between">
                  <Link href={`/${service.slug}`} className={`font-black text-lg flex items-center gap-2 group-hover:gap-4 transition-all ${textStyles[service.color]}`}>
                    Tìm hiểu thêm <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </Link>
                  
                  <a href="https://zalo.me/0877023032" className="px-8 py-3 rounded-2xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all">
                    Liên hệ ngay
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
