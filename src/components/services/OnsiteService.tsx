'use client';

import React from 'react';
import FAQAccordion from '@/components/FAQAccordion';
import BookingForm from '@/components/BookingForm';

interface OnsiteServiceProps {
  service: {
    title: string;
    description: string;
    process: { step: string; text: string }[];
  };
}

export default function OnsiteService({ service }: OnsiteServiceProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Sửa Máy Tính Tận Nơi Chuyên Nghiệp",
    "description": "Dịch vụ sửa máy tính tận nơi, sửa máy tính tại nhà uy tín tại TP.HCM. Có mặt sau 30-45 phút.",
    "provider": {
      "@type": "LocalBusiness",
      "name": "FastFix Tận Nơi"
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
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[120px]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-left animate-in fade-in slide-in-from-left duration-1000">
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-700 text-sm font-bold shadow-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                  </span>
                  Hỗ trợ: 08:30 - 22:00
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-bold shadow-sm">
                  Báo giá trước – Bảo hành dài hạn
                </div>
              </div>

              <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8 leading-[1.1] text-slate-900">
                Sửa Máy Tính Tận Nơi <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-700">
                  Tại Nhà & Văn Phòng
                </span>
              </h1>

              <p className="max-w-xl text-lg md:text-xl text-slate-600 mb-10 leading-relaxed font-medium">
                {service.description}
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
                <a href="tel:0877023032"
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white px-10 py-5 rounded-2xl font-black text-xl transition-all shadow-xl shadow-blue-500/25 flex items-center justify-center gap-3 transform hover:-translate-y-1">
                  🚀 ĐẶT LỊCH NGAY
                </a>
                <a href="https://zalo.me/0877023032" target="_blank" rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-white text-slate-700 border-2 border-slate-200 px-10 py-5 rounded-2xl font-black text-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-3 transform hover:-translate-y-1">
                  💬 CHAT ZALO NGAY
                </a>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-200/60">
                <div>
                  <div className="text-2xl font-black text-slate-900">500+</div>
                  <div className="text-sm text-slate-500 font-bold">Khách hàng</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900">30 Phút</div>
                  <div className="text-sm text-slate-500 font-bold">Có mặt sau</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900">100%</div>
                  <div className="text-sm text-slate-500 font-bold">Hài lòng</div>
                </div>
              </div>
            </div>

            <div className="hidden lg:block relative animate-in fade-in zoom-in duration-1000">
              <div className="relative rounded-[40px] overflow-hidden shadow-2xl border-8 border-white group">
                <img src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=1000&auto=format&fit=crop" alt="Sửa máy tính tận nơi" className="w-full h-[600px] object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-10 left-10 right-10 p-8 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20">
                  <div className="flex items-center gap-4 text-white">
                    <div className="w-12 h-12 bg-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </div>
                    <div>
                      <div className="font-black text-xl leading-tight">Sửa máy tính tại nhà</div>
                      <div className="text-white/70 font-bold">Có mặt sau 30-45 phút</div>
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
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-16 text-center">Máy Tính Bạn Đang Gặp Lỗi Nào?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { q: "Máy không lên nguồn, bật không lên hình?", icon: "🔌" },
              { q: "Không vào được mạng Wifi, báo lỗi limited?", icon: "🌐" },
              { q: "Máy chạy cực chậm, treo máy liên tục?", icon: "🐢" },
              { q: "Bị virus xóa file, nhảy quảng cáo?", icon: "🦠" },
              { q: "Lỗi màn hình xanh chữ trắng (BSOD)?", icon: "💎" },
              { q: "Máy kêu to, nóng ran, hay sập nguồn?", icon: "🔥" }
            ].map((item, i) => (
              <div key={i} className="flex gap-6 p-8 bg-white rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:bg-cyan-50/50 transition-all group hover:-translate-y-1">
                <div className="w-14 h-14 shrink-0 bg-slate-50 rounded-2xl flex items-center justify-center text-2xl group-hover:bg-cyan-100 transition-colors">{item.icon}</div>
                <p className="text-lg font-bold text-slate-700 leading-relaxed self-center group-hover:text-cyan-900 transition-colors">{item.q}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Dịch vụ tại nhà */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-black text-center mb-20 text-slate-900 tracking-tight uppercase">Dịch Vụ Tại Nhà</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Sửa Lỗi Phần Mềm", desc: "Xử lý máy treo, lag, lỗi windows, cài đặt phần mềm tận nơi.", icon: "monitor", color: "cyan" },
              { title: "Cài Windows", desc: "Cài Windows 10, 11 + Full Soft trọn gói, nhanh chóng & ổn định.", icon: "upload", color: "blue" },
              { title: "Nâng Cấp Máy", desc: "Tư vấn nâng cấp linh kiện (SSD, RAM, VGA...) phù hợp nhu cầu.", icon: "bolt", color: "amber" },
              { title: "Vệ Sinh Máy", desc: "Vệ sinh laptop, PC tận nơi, thay keo tản nhiệt chất lượng cao.", icon: "sparkles", color: "purple" }
            ].map((s, i) => {
              const colors = {
                cyan: "bg-cyan-50/50 border-cyan-100 text-cyan-600",
                blue: "bg-blue-50/50 border-blue-100 text-blue-600",
                amber: "bg-amber-50/50 border-amber-100 text-amber-600",
                purple: "bg-purple-50/50 border-purple-100 text-purple-600"
              }[s.color as 'cyan' | 'blue' | 'amber' | 'purple'];

              return (
                <div key={i} className={`p-8 ${colors} border rounded-[32px] transition-all duration-500 shadow-sm group hover:shadow-xl hover:-translate-y-2 flex flex-col items-start`}>
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform">
                    {s.icon === 'monitor' && <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
                    {s.icon === 'upload' && <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>}
                    {s.icon === 'bolt' && <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
                    {s.icon === 'sparkles' && <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" /></svg>}
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-4 leading-tight">{s.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm font-medium">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Quy trình 5 bước */}
      <section className="py-32 bg-slate-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-black text-center mb-20 text-white uppercase tracking-tight">Quy Trình 5 Bước chuyên nghiệp</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {[
              { step: '01', title: 'LIÊN HỆ', desc: 'Bạn gọi Hotline hoặc nhắn Zalo mô tả tình trạng máy.' },
              { step: '02', title: 'DI CHUYỂN', desc: 'Kỹ thuật viên di chuyển và có mặt sau 30-45 phút.' },
              { step: '03', title: 'KIỂM TRA', desc: 'Tiến hành kiểm tra, chẩn đoán lỗi & báo giá minh bạch.' },
              { step: '04', title: 'SỬA CHỮA', desc: 'Thực hiện xử lý lỗi khi khách hàng đã đồng ý giá.' },
              { step: '05', title: 'BÀN GIAO', desc: 'Khách hàng nghiệm thu, dán tem bảo hành & thanh toán.' }
            ].map((p, i) => (
              <div key={i} className="p-10 bg-white/5 border border-white/10 rounded-[40px] hover:bg-white/10 transition-all group">
                <div className="text-6xl font-black text-white/10 mb-6 group-hover:text-cyan-500/20 transition-colors">{p.step}</div>
                <h3 className="text-2xl font-black text-cyan-400 mb-4 uppercase tracking-tight">{p.title}</h3>
                <p className="text-slate-400 font-medium leading-relaxed">{p.desc}</p>
              </div>
            ))}
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
                  { name: "Cài đặt Windows 10/11 + Soft", price: "200.000đ - 250.000đ" },
                  { name: "Vệ sinh Laptop / PC (Keo MX4)", price: "200.000đ" },
                  { name: "Cài đặt phần mềm chuyên ngành", price: "Từ 150.000đ" },
                  { name: "Sửa lỗi mạng / Cài driver máy in", price: "Từ 100.000đ" },
                  { name: "Thay SSD / RAM (Linh kiện + Công)", price: "Từ 550.000đ" }
                ].map((item, idx) => (
                  <tr key={idx} className="hover:bg-blue-50/50 transition-colors group">
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

      {/* 6. Quick Booking Form Section */}
      <section id="booking-form" className="py-24 bg-white relative overflow-hidden scroll-mt-24">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-50 rounded-full blur-[120px] -z-10"></div>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-100 text-cyan-700 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                Liên hệ ngay
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 tracking-tight leading-tight">
                Đặt Lịch Sửa Chữa <br />
                <span className="text-cyan-600">Trong 30 Giây</span>
              </h2>
              <p className="text-lg text-slate-600 font-medium mb-10 leading-relaxed">
                Để lại thông tin, đội ngũ kỹ thuật của FastFix sẽ chủ động liên hệ lại với bạn trong thời gian sớm nhất để tư vấn và sắp xếp lịch hẹn phù hợp nhất.
              </p>
              
              <div className="space-y-6">
                {[
                  { t: "Xác nhận lịch hẹn nhanh chóng", d: "Gọi lại sau 5-10 phút đăng ký." },
                  { t: "Kỹ thuật viên chuyên nghiệp", d: "Tay nghề cao, thái độ phục vụ tận tâm." },
                  { t: "Tận nơi - Tiện lợi", d: "Sắp xếp lịch hẹn linh hoạt, đúng giá niêm yết." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 shrink-0 bg-cyan-600 text-white rounded-xl flex items-center justify-center font-black">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900">{item.t}</h4>
                      <p className="text-sm text-slate-500 font-medium">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <BookingForm serviceName="Sửa máy tính tận nơi" />
          </div>
        </div>
      </section>

      {/* 7. Local SEO Areas */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500 rounded-full blur-[150px]"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-12">Hỗ Trợ Nhanh Tại TP. Hồ Chí Minh</h2>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {["Quận 1", "Quận 3", "Quận 4", "Quận 5", "Quận 7", "Quận 8", "Quận 10", "Quận 11", "Quận 12", "Bình Thạnh", "Gò Vấp", "Phú Nhuận", "Tân Bình", "Tân Phú", "Bình Tân", "Thủ Đức"].map((area, i) => (
              <div key={i} className="px-6 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl font-black text-sm md:text-lg text-cyan-400 hover:scale-105 hover:bg-white/20 transition-all cursor-default">
                {area}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-black text-center mb-16 text-slate-900">Câu Hỏi Thường Gặp</h2>
          <FAQAccordion
            items={[
              { q: "Bao lâu thì kỹ thuật viên có mặt tại nhà?", a: "Thông thường từ 30 - 45 phút tùy vào khoảng cách và tình trạng giao thông. Chúng tôi luôn cố gắng hỗ trợ sớm nhất." },
              { q: "Có hỗ trợ cài phần mềm đồ họa không?", a: "CÓ. FastFix hỗ trợ cài đặt đầy đủ các bộ Adobe, AutoCAD, 3dsMax... đảm bảo máy chạy ổn định." },
              { q: "Sửa tận nơi có được bảo hành không?", a: "CÓ. Các hạng mục thay thế linh kiện được bảo hành từ 12-36 tháng. Cài đặt phần mềm hỗ trợ kỹ thuật trong 30 ngày." },
              { q: "Kiểm tra máy mà không sửa có mất phí không?", a: "Tùy khu vực, phí kiểm tra tận nơi dao động từ 50.000đ - 100.000đ (hỗ trợ xăng xe cho kỹ thuật)." }
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
          <p className="text-xl opacity-90 mb-12 font-bold relative z-10">Giải cứu máy tính ngay tại nhà. Không cần mang máy đi xa!</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
            <a href="tel:0877023032" className="inline-block bg-white text-blue-700 px-12 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-transform shadow-xl">
              GỌI NGAY: 0877.023.032
            </a>
            <a href="https://zalo.me/0877023032" target="_blank" className="inline-block bg-transparent text-white border-2 border-white/30 px-12 py-5 rounded-2xl font-black text-xl hover:bg-white/10 transition-all">
              HỖ TRỢ ZALO
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
