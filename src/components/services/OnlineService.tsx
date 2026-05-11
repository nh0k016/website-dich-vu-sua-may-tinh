'use client';

import React from 'react';
import RemoteSupportMockup from '@/components/RemoteSupportMockup';
import FAQAccordion from '@/components/FAQAccordion';

interface OnlineServiceProps {
  service: {
    title: string;
    description: string;
    process: { step: string; text: string }[];
  };
}

export default function OnlineService({ service }: OnlineServiceProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Sửa Máy Tính Online Chuyên Nghiệp",
    "description": "Dịch vụ sửa máy tính online qua UltraViewer/AnyDesk chuyên nghiệp, xử lý xong sau 15 phút.",
    "provider": {
      "@type": "LocalBusiness",
      "name": "FastFix Online"
    }
  };

  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-48 sm:pb-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-slate-50 to-white"></div>
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-[120px]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-left animate-in fade-in slide-in-from-left duration-1000">
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-700 text-sm font-bold shadow-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                  </span>
                  Hỗ trợ: 8h30-22h
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-bold shadow-sm">
                  Cam kết hiệu quả – Thanh toán khi hài lòng
                </div>
              </div>

              <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8 leading-[1.1] text-slate-900">
                Sửa Máy Tính Online <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-700">
                  Hỗ Trợ Từ Xa Sau 15 Phút
                </span>
              </h1>

              <p className="max-w-xl text-lg md:text-xl text-slate-600 mb-10 leading-relaxed font-medium">
                {service.description}
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
                <a href="https://zalo.me/0877023032" target="_blank" rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-10 py-5 rounded-2xl font-black text-xl transition-all shadow-xl shadow-cyan-500/25 flex items-center justify-center gap-3 transform hover:-translate-y-1">
                  LIÊN HỆ NGAY
                </a>
                <a href="https://ultraviewer.net/vi/download.html" target="_blank" rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-white text-slate-700 border-2 border-slate-200 px-10 py-5 rounded-2xl font-black text-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-3 transform hover:-translate-y-1">
                  TẢI ULTRAVIEWER
                </a>
              </div>
            </div>

            <div className="hidden lg:block relative animate-in fade-in zoom-in duration-1000">
              <RemoteSupportMockup />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Nỗi đau khách hàng */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-16 text-center">Bạn Có Đang Gặp Phải?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              "Máy tính bỗng dưng chậm chạp, giật lag khi đang làm việc quan trọng?",
              "Gặp lỗi màn hình xanh, lỗi phần mềm Office, Adobe không thể mở được?",
              "Cảnh báo virus liên tục hoặc dính phần mềm quảng cáo khó chịu?",
              "Bạn ở xa trung tâm hoặc ngại mang máy đi sửa cồng kềnh, chờ lâu?"
            ].map((q, i) => (
              <div key={i} className="flex gap-6 p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 shrink-0 bg-red-50 rounded-2xl flex items-center justify-center text-xl">❓</div>
                <p className="text-lg font-bold text-slate-700 leading-relaxed">{q}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Dịch vụ chuyên sâu */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-black text-center mb-20 text-slate-900 tracking-tight">Dịch Vụ Chuyên Sâu</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Cấp cứu phần mềm", desc: "Fix lỗi windows, cài đặt driver, xử lí lỗi phần mềm.", icon: "monitor", color: "cyan" },
              { title: "Cài đặt phần mềm", desc: "Cài Adobe, Office, AutoCAD, Mastercam, phần mềm kế toán.", icon: "upload", color: "blue" },
              { title: "Tăng tốc hệ thống", desc: "Dọn rác, tối ưu hệ thống, giúp máy chạy ổn định.", icon: "bolt", color: "amber" },
              { title: "Tư vấn nâng cấp", desc: "Kiểm tra cấu hình, tư vấn nâng cấp RAM, SSD giúp máy chạy nhanh nhất.", icon: "search", color: "purple" }
            ].map((s, i) => {
              const colors = {
                cyan: "bg-cyan-50/50 border-cyan-100 text-cyan-600 shadow-cyan-500/10",
                blue: "bg-blue-50/50 border-blue-100 text-blue-600 shadow-blue-500/10",
                amber: "bg-amber-50/50 border-amber-100 text-amber-600 shadow-amber-500/10",
                purple: "bg-purple-50/50 border-purple-100 text-purple-600 shadow-purple-500/10"
              }[s.color as 'cyan' | 'blue' | 'amber' | 'purple'];

              return (
                <div key={i} className={`p-8 ${colors} border rounded-[32px] transition-all duration-500 shadow-sm group hover:shadow-xl hover:-translate-y-2 flex flex-col items-start`}>
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform">
                    {s.icon === 'monitor' && <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
                    {s.icon === 'upload' && <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>}
                    {s.icon === 'bolt' && <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
                    {s.icon === 'search' && <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>}
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-4 leading-tight">{s.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm font-medium">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Quy trình 4 bước */}
      <section className="py-32 bg-slate-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-black text-center mb-20 text-white uppercase tracking-tight">Quy Trình 4 Bước chuyên nghiệp</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {service.process.map((p, i) => {
              const parts = p.text.split(':');
              const title = parts[0];
              const desc = parts[1] || '';
              return (
                <div key={i} className="p-10 bg-white/5 border border-white/10 rounded-[40px] hover:bg-white/10 transition-all group">
                  <div className="text-6xl font-black text-white/20 mb-6 group-hover:text-cyan-500/20 transition-colors">{p.step}</div>
                  <h3 className="text-2xl font-black text-cyan-400 mb-4 uppercase tracking-tight">{title}</h3>
                  <p className="text-slate-400 font-medium leading-relaxed">{desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Bảng giá */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-black text-center mb-20 text-slate-900">Bảng Giá Tham Khảo</h2>

          <div className="mt-12 max-w-4xl mx-auto overflow-hidden rounded-[40px] border border-slate-200 shadow-2xl bg-white">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="p-6 md:p-8 text-left font-black uppercase tracking-wider text-sm md:text-base border-b border-slate-700 w-[60%]">
                    Hạng mục dịch vụ
                  </th>
                  <th className="p-6 md:p-8 text-center font-black uppercase tracking-wider text-sm md:text-base border-b border-slate-700">
                    Giá tham khảo
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Cài đặt Windows 10/11 + Driver & Office", price: "150.000đ - 200.000đ" },
                  { name: "Cài đặt phần mềm Adobe / Autodesk", price: "Từ 100.000đ / App" },
                  { name: "Sửa lỗi phần mềm / Cài driver máy in", price: "Từ 100.000đ" },
                  { name: "Diệt virus / Tối ưu hệ thống", price: "100.000đ" },
                  { name: "Tư vấn kỹ thuật / Nâng cấp", price: "Miễn phí" }
                ].map((item, idx) => (
                  <tr key={idx} className="hover:bg-cyan-50/50 transition-colors group">
                    <td className="p-6 md:p-8 text-slate-700 font-bold border-b border-slate-100 text-sm md:text-lg leading-relaxed">
                      {item.name}
                    </td>
                    <td className="p-6 md:p-8 text-slate-900 font-black text-center border-b border-slate-100 text-sm md:text-xl">
                      {item.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 6. FAQ */}
      <section className="py-32 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-black text-center mb-16 text-slate-900">Câu Hỏi Thường Gặp</h2>
          <FAQAccordion
            items={[
              { q: "Sửa máy tính từ xa có an toàn không?", a: "Cực kỳ an toàn. Bạn có thể theo dõi toàn bộ thao tác của kỹ thuật viên trên màn hình. Bạn có thể ngắt kết nối bất cứ lúc nào." },
              { q: "Dữ liệu của tôi có bị xem trộm không?", a: "Hoàn toàn KHÔNG. Chúng tôi chỉ truy cập các file cần thiết để fix lỗi. Bạn trực tiếp giám sát 100% quá trình qua UltraViewer." },
              { q: "Thời gian xử lý lỗi mất khoảng bao lâu?", a: "Tùy độ phức tạp, thường từ 15 - 45 phút. Với cài Windows online, thời gian khoảng 1 - 1.5 tiếng." },
              { q: "Có cần thanh toán trước không?", a: "KHÔNG CẦN. FastFix chỉ nhận thanh toán sau khi lỗi đã được xử lý thành công và bạn hài lòng." }
            ]}
          />
        </div>
      </section>

      {/* 7. CTA Final */}
      <section className="py-24 px-4 bg-white pb-32">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-cyan-600 to-blue-700 rounded-[50px] p-12 md:p-20 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl -ml-32 -mb-32"></div>

          <h2 className="text-4xl md:text-6xl font-black mb-8 relative z-10">Liên Hệ Ngay!</h2>
          <p className="text-xl opacity-90 mb-12 font-bold relative z-10">Hỗ trợ từ 08:30 - 22:00 kể cả ngày lễ và cuối tuần.</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
            <a href="https://zalo.me/0877023032" target="_blank" className="inline-block bg-white text-blue-700 px-12 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-transform shadow-xl">
              CHAT ZALO NGAY
            </a>
            <a href="https://ultraviewer.net/vi/download.html" target="_blank" className="inline-block bg-transparent text-white border-2 border-white/30 px-12 py-5 rounded-2xl font-black text-xl hover:bg-white/10 transition-all">
              TẢI ULTRAVIEWER
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
