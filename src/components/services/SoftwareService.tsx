'use client';

import React from 'react';
import FAQAccordion from '@/components/FAQAccordion';

interface SoftwareServiceProps {
  service: {
    title: string;
    description: string;
    process: { step: string; text: string }[];
  };
}

export default function SoftwareService({ service }: SoftwareServiceProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Dịch Vụ Cài Đặt Phần Mềm Máy Tính Online",
    "description": "Cài đặt phần mềm máy tính từ xa qua UltraViewer/AnyDesk chuyên nghiệp, xử lý ngay trong 15-30 phút.",
    "provider": {
      "@type": "LocalBusiness",
      "name": "FastFix Software"
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-50 via-slate-50 to-white"></div>
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
                Cài đặt phần mềm online từ xa <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-700">
                  Xử lý ngay trong 15-30 phút
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

              <div className="grid grid-cols-2 gap-4">
                {[
                  "Không truy cập file riêng tư",
                  "Cài đúng phiên bản theo yêu cầu",
                  "Bảo hành cài lại miễn phí",
                  "Hỗ trợ 24/7 qua Zalo"
                ].map((t, i) => (
                  <div key={i} className="flex items-center gap-2 text-slate-600 font-bold">
                    <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    {t}
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:block relative animate-in fade-in zoom-in duration-1000">
              <div className="relative rounded-[40px] overflow-hidden shadow-2xl border-8 border-white group">
                <img src="/software-hero.png" alt="Cài đặt phần mềm máy tính" className="w-full h-[600px] object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-10 left-10 right-10 p-8 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20">
                  <div className="flex items-center gap-4 text-white">
                    <div className="w-12 h-12 bg-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                    <div>
                      <div className="font-black text-xl leading-tight">Cài phần mềm siêu tốc</div>
                      <div className="text-white/70 font-bold">An toàn - Bảo mật - Uy tín</div>
                    </div>
                  </div>
                </div>
              </div>
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
              { text: <span>Máy tính báo <span className="text-red-600 font-black">lỗi phần mềm</span> liên tục, <span className="text-red-600 font-black">không thể mở</span> file làm việc?</span> },
              { text: <span>Cần <span className="text-red-600 font-black">cài đặt gấp</span> Adobe, Office, AutoCAD... nhưng <span className="text-red-600 font-black">loay hoay mãi không biết cách?</span></span> },
              { text: <span>Sợ cài phần mềm crack bị dính <span className="text-red-600 font-black">virus, mã độc</span> hoặc <span className="text-red-600 font-black">lộ dữ liệu?</span></span> },
              { text: <span>Ở xa trung tâm hoặc <span className="text-red-600 font-black">không muốn mang máy đi</span> sửa <span className="text-red-600 font-black">cồng kềnh?</span></span> }
            ].map((q, i) => (
              <div key={i} className="flex gap-6 p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                <div className="w-12 h-12 shrink-0 bg-red-50 rounded-2xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform">❓</div>
                <p className="text-lg font-bold text-slate-700 leading-relaxed">{q.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Khối Niềm Tin */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Bảo mật tuyệt đối", desc: "Tuyệt đối không truy cập file riêng tư, ảnh, video của khách hàng.", icon: "shield-check", color: "blue" },
              { title: "Nguồn file Tin cậy", desc: "Phần mềm được tuyển chọn và tối ưu sạch sẽ, loại bỏ hoàn toàn các tool rác.", icon: "check-badge", color: "emerald" },
              { title: "Bảo hành Cài đặt", desc: "Hỗ trợ cài đặt lại hoàn toàn miễn phí nếu phần mềm phát sinh lỗi trong 30 ngày.", icon: "arrow-path", color: "amber" },
              { title: "Thanh toán khi hài lòng", desc: "Bạn chỉ thanh toán sau khi phần mềm đã được cài đặt thành công và hoạt động tốt.", icon: "currency-dollar", color: "indigo" }
            ].map((item, i) => (
              <div key={i} className={`p-8 rounded-[32px] text-left transition-all border shadow-sm hover:shadow-xl hover:-translate-y-2
                ${item.color === 'blue' ? 'bg-blue-50/50 border-blue-100 hover:bg-blue-50' : ''}
                ${item.color === 'emerald' ? 'bg-emerald-50/50 border-emerald-100 hover:bg-emerald-50' : ''}
                ${item.color === 'amber' ? 'bg-amber-50/50 border-amber-100 hover:bg-amber-50' : ''}
                ${item.color === 'indigo' ? 'bg-indigo-50/50 border-indigo-100 hover:bg-indigo-50' : ''}
              `}>
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-md transition-transform group-hover:scale-110 bg-white
                  ${item.color === 'blue' ? 'text-blue-600' : ''}
                  ${item.color === 'emerald' ? 'text-emerald-600' : ''}
                  ${item.color === 'amber' ? 'text-amber-600' : ''}
                  ${item.color === 'indigo' ? 'text-indigo-600' : ''}
                `}>
                  {item.icon === 'shield-check' && <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>}
                  {item.icon === 'check-badge' && <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z" /></svg>}
                  {item.icon === 'arrow-path' && <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>}
                  {item.icon === 'currency-dollar' && <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Các phần mềm phổ biến */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-black text-center mb-16 text-slate-900 uppercase tracking-tight">Danh Sách Phần Mềm Phổ Biến</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: "Adobe CC", apps: "Photoshop, AI, Premiere...", logo: "https://img.icons8.com/color/144/adobe-creative-cloud.png" },
              { name: "Office", apps: "Word, Excel, PowerPoint...", logo: "https://img.icons8.com/color/144/microsoft-office-2019.png" },
              { name: "Autodesk", apps: "AutoCAD, Revit, 3ds Max...", logo: "https://img.icons8.com/color/144/autocad.png" },
              { name: "CorelDRAW", apps: "Thiết kế đồ họa vector...", logo: "https://img.icons8.com/color/144/coreldraw.png" },
              { name: "SketchUp", apps: "Dựng hình 3D, kiến trúc...", logo: "https://img.icons8.com/color/144/google-sketchup.png" },
              { name: "Tiện ích", apps: "PDF, Font, Unikey...", logo: "https://img.icons8.com/color/144/software-installer.png" }
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group hover:-translate-y-2 text-center flex flex-col items-center">
                <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center p-2">
                  <img src={item.logo} alt={item.name} className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="font-black text-slate-900 text-sm mb-1 leading-tight">{item.name}</h3>
                <p className="text-[10px] text-slate-500 font-bold">{item.apps}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Quy trình 4 bước */}
      <section className="py-32 bg-slate-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-black text-center mb-20 text-white uppercase">Quy Trình 4 Bước Chuyên Nghiệp</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {service.process.map((p, i) => {
              const parts = p.text.split(':');
              const title = parts[0];
              const desc = parts[1] || '';
              return (
                <div key={i} className="p-10 bg-white/5 border border-white/10 rounded-[40px] hover:bg-white/10 transition-all group">
                  <div className="text-6xl font-black text-white/10 mb-6 group-hover:text-cyan-500/20 transition-colors">{p.step}</div>
                  <h3 className="text-2xl font-black text-cyan-400 mb-4 uppercase tracking-tight">{title}</h3>
                  <p className="text-slate-400 font-medium leading-relaxed">{desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Bảng giá */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-black text-center mb-6 text-slate-900">Bảng Giá Tham Khảo</h2>
          <p className="text-xl text-center text-slate-500 font-bold mb-20">Hỗ trợ cài đặt từ xa – Thanh toán khi hoàn tất.</p>

          <div className="mt-12 max-w-4xl mx-auto overflow-hidden rounded-[40px] border border-slate-200 shadow-2xl bg-white">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="p-6 md:p-8 text-left font-black uppercase tracking-wider text-sm md:text-base border-b border-slate-700 w-[60%]">
                    Hạng mục cài đặt
                  </th>
                  <th className="p-6 md:p-8 text-center font-black uppercase tracking-wider text-sm md:text-base border-b border-slate-700">
                    Giá tham khảo
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Cài đặt bộ Adobe (Photoshop, AI, Premiere...)", price: "100.000đ / App" },
                  { name: "Cài đặt Microsoft Office (2016 - 2024)", price: "100.000đ" },
                  { name: "Cài đặt bộ Autodesk (AutoCAD, Revit...)", price: "150.000đ / App" },
                  { name: "Cài đặt CorelDRAW / SketchUp + Vray", price: "120.000đ - 150.000đ" },
                  { name: "Combo Tiện ích Văn phòng (PDF, Font, Unikey...)", price: "50.000đ" },
                  { name: "Cài Windows 10/11 Online (Full Driver)", price: "200.000đ" }
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

      {/* 7. FAQ */}
      <section className="py-32 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-black text-center mb-16 text-slate-900">Giải Đáp Thắc Mắc</h2>
          <FAQAccordion
            items={[
              { q: "Tôi có cần mang máy đến tận nơi không?", a: "KHÔNG CẦN. Chỉ cần máy bạn có kết nối Internet, kỹ thuật viên sẽ xử lý mọi thứ qua UltraViewer hoặc AnyDesk ngay tại chỗ." },
              { q: "Dữ liệu của tôi có được bảo mật không?", a: "Bảo mật khách hàng là ưu tiên số 1. Bạn có thể giám sát 100% thao tác của kỹ thuật viên trực tiếp trên màn hình. Chúng tôi tuyệt đối không xâm phạm dữ liệu riêng tư." },
              { q: "Thời gian cài đặt một phần mềm mất bao lâu?", a: "Thông thường từ 15 - 30 phút cho các phần mềm cơ bản phổ biến. Các bộ phần mềm nặng có thể lâu hơn tùy tốc độ mạng." },
              { q: "Nếu không cài đặt thành công thì sao?", a: "FastFix cam kết KHÔNG THU PHÍ nếu không cài đặt thành công hoặc không xử lý được lỗi cho khách hàng." }
            ]}
          />
        </div>
      </section>

      {/* 8. CTA Final */}
      <section className="py-24 px-4 bg-white pb-32">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-cyan-600 to-blue-700 rounded-[50px] p-12 md:p-20 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl -ml-32 -mb-32"></div>

          <h2 className="text-4xl md:text-6xl font-black mb-8 relative z-10">Liên Hệ Ngay!</h2>
          <p className="text-xl opacity-90 mb-12 font-bold relative z-10">Hỗ trợ từ 8h30 - 22h00 kể cả cuối tuần. Xử lý ngay, nghiệm thu mới thanh toán.</p>
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
