'use client';

import React from 'react';
import FAQAccordion from '@/components/FAQAccordion';

import BookingForm from '@/components/BookingForm';

interface CleaningServiceProps {
  service: {
    title: string;
    description: string;
    process: { step: string; text: string }[];
  };
}

export default function CleaningService({ service }: CleaningServiceProps) {
  const [timeLeft, setTimeLeft] = React.useState({ hours: 2, minutes: 14, seconds: 55 });

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) {
          seconds--;
        } else {
          if (minutes > 0) {
            minutes--;
            seconds = 59;
          } else {
            if (hours > 0) {
              hours--;
              minutes = 59;
              seconds = 59;
            } else {
              // Reset to 2:14:55 when reaches 0 for demo purposes
              return { hours: 2, minutes: 14, seconds: 55 };
            }
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNumber = (n: number) => n.toString().padStart(2, '0');

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Vệ Sinh Máy Tính & Laptop Tận Nơi",
    "description": "Dịch vụ vệ sinh laptop, PC tại nhà chuyên nghiệp, sử dụng keo tản nhiệt chính hãng, giúp máy giảm nhiệt độ từ 5-10 độ C.",
    "provider": {
      "@type": "LocalBusiness",
      "name": "FastFix Cleaning"
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
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[120px]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-left animate-in fade-in slide-in-from-left duration-1000">
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-bold shadow-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                  </span>
                  Có mặt sau 30-45 phút
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-bold shadow-sm">
                  Keo MX-4 Chính Hãng
                </div>
              </div>

              <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8 leading-[1.1] text-slate-900">
                Vệ Sinh Máy Tính <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                  Giảm Ngay 5-10°C
                </span>
              </h1>

              <p className="max-w-xl text-lg md:text-xl text-slate-600 mb-10 leading-relaxed font-medium">
                {service.description}
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
                <a href="https://zalo.me/0877023032" target="_blank" rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white px-10 py-5 rounded-2xl font-black text-xl transition-all shadow-xl shadow-blue-500/25 flex items-center justify-center transition-all transform hover:-translate-y-1">
                  LIÊN HỆ NGAY
                </a>
                <a href="#booking-form"
                  className="w-full sm:w-auto bg-white text-slate-700 border-2 border-slate-200 px-10 py-5 rounded-2xl font-black text-xl hover:bg-slate-50 transition-all flex items-center justify-center transition-all transform hover:-translate-y-1">
                  ĐẶT LỊCH NGAY
                </a>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  "Giảm nhiệt CPU/GPU tức thì",
                  'Thay keo tản nhiệt Arctic MX-4.',
                  "Làm sạch bụi bẩn",
                  "Hỗ trợ tận nơi tại HCM"
                ].map((t, i) => (
                  <div key={i} className="flex items-center gap-2 text-slate-600 font-bold">
                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    {t}
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:block relative animate-in fade-in zoom-in duration-1000">
              <div className="relative rounded-[40px] overflow-hidden shadow-2xl border-8 border-white group">
                <img src="/cleaning-hero.png" alt="Vệ sinh máy tính tận nơi" className="w-full h-[600px] object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-10 left-10 right-10 p-8 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20">
                  <div className="flex items-center gap-4 text-white">
                    <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                    <div>
                      <div className="font-black text-xl leading-tight">Bảo vệ linh kiện</div>
                      <div className="text-white/70 font-bold">Mát mẻ - Êm ái - Bền bỉ</div>
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
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-16 text-center tracking-tight">Máy Tính Bạn Đang Gào Thét?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { q: "Máy nóng ran, sờ vào vỏ cảm thấy bỏng tay?", icon: "🔥" },
              { q: "Quạt kêu to như máy cày, gây khó chịu khi làm việc?", icon: "🔊" },
              { q: "Treo máy, giật lag hoặc tự động sập nguồn khi đang dùng?", icon: "❄️" },
              { q: "Dùng lâu ngày bụi bẩn bám đầy, có nguy cơ cháy nổ linh kiện?", icon: "⚠️" }
            ].map((item, i) => (
              <div key={i} className="flex gap-6 p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                <div className="w-12 h-12 shrink-0 bg-orange-50 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">{item.icon}</div>
                <p className="text-lg font-bold text-slate-700 leading-relaxed self-center">{item.q}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW: Limited Time Offer Banner */}
      <section className="py-8 bg-gradient-to-r from-red-600 to-orange-600 overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-4xl animate-pulse">✨</div>
            <div className="text-white">
              <h3 className="text-2xl md:text-3xl font-black mb-1 uppercase tracking-tighter">ƯU ĐÃI THÁNG 5 RỰC RỠ</h3>
              <p className="text-white/90 font-bold">Giảm ngay 50k khi đặt lịch vệ sinh Combo 2 máy trở lên!</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <div className="text-white/70 text-xs font-black uppercase">Kết thúc sau</div>
              <div className="text-white font-black text-xl tabular-nums tracking-widest">
                {formatNumber(timeLeft.hours)} : {formatNumber(timeLeft.minutes)} : {formatNumber(timeLeft.seconds)}
              </div>
            </div>
            <a href="https://zalo.me/0877023032" target="_blank" className="bg-white text-red-600 px-8 py-4 rounded-xl font-black text-lg hover:scale-105 transition-transform shadow-xl">NHẬN ƯU ĐÃI</a>
          </div>
        </div>
      </section>

      {/* 3. Khối Niềm Tin */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Keo MX-4", desc: "Cam kết sử dụng keo tản nhiệt Arctic MX-4 tốt nhất hiện nay.", icon: "beaker" },
              { title: "Vệ Sinh Tỉ Mỉ", desc: "Làm sạch kỹ từng khe tản nhiệt, cánh quạt và toàn bộ mainboard.", icon: "sparkles" },
              { title: "Xem Trực Tiếp", desc: "Bạn có thể giám sát toàn bộ quá trình vệ sinh ngay tại nhà.", icon: "eye" },
              { title: "Nghiệm Thu Tại Chỗ", desc: "Kiểm tra nhiệt độ và độ ổn định của máy cùng khách hàng trước khi bàn giao.", icon: "check-badge" }
            ].map((item, i) => (
              <div key={i} className="p-8 bg-blue-50/30 border border-blue-100 rounded-[32px] text-center hover:bg-blue-50 transition-all group">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  {item.icon === 'beaker' && <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.673.337a4 4 0 01-2.509.37l-1.54-.154a4 4 0 01-3.14-3.14l-.154-1.54a4 4 0 01.37-2.509l.337-.673a6 6 0 00.517-3.86l-.477-2.387a2 2 0 00-2.399-1.565l-2.387.477a2 2 0 00-1.565 2.399l.477 2.387a6 6 0 00.517 3.86l-.337.673a4 4 0 01-.37 2.509l.154 1.54a4 4 0 013.14 3.14l1.54.154a4 4 0 012.509-.37l.673-.337a6 6 0 003.86-.517l2.387.477a2 2 0 001.022-.547z" /></svg>}
                  {item.icon === 'sparkles' && <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" /></svg>}
                  {item.icon === 'eye' && <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>}
                  {item.icon === 'check-badge' && <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 font-medium text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Comparison Section */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-6">Đừng Để Máy "Chết Oan" Vì Keo Rẻ Tiền</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium">Sự khác biệt giữa keo tản nhiệt Arctic MX-4 chính hãng và các loại keo thông thường.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="p-8 bg-white/5 border border-white/10 rounded-[32px] relative overflow-hidden group">
                <div className="absolute top-0 right-0 px-6 py-2 bg-blue-500 text-white font-black text-xs uppercase rounded-bl-2xl">Đề xuất</div>
                <h3 className="text-2xl font-black text-blue-400 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center text-lg">💎</span>
                  Keo Arctic MX-4
                </h3>
                <ul className="space-y-4">
                  {[
                    "Dẫn nhiệt cực nhanh (8.5 W/mk)",
                    "Độ bền lên đến 8 năm không khô",
                    "Không chứa kim loại, an toàn 100%",
                    "Giảm ngay 5-10°C cho CPU/GPU"
                  ].map((t, i) => (
                    <li key={i} className="flex items-center gap-3 font-bold">
                      <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-8 bg-white/5 border border-white/10 rounded-[32px] opacity-60">
                <h3 className="text-2xl font-black text-slate-400 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-slate-500/20 rounded-full flex items-center justify-center text-lg">⚠️</span>
                  Keo thường (Hũ trắng/xám)
                </h3>
                <ul className="space-y-4">
                  {[
                    "Dẫn nhiệt kém, nhanh khô sau 1-2 tháng",
                    "Dễ gây chập mạch nếu tràn ra ngoài",
                    "Hiệu quả giảm nhiệt không đáng kể",
                    "Máy vẫn nóng sau khi vệ sinh"
                  ].map((t, i) => (
                    <li key={i} className="flex items-center gap-3 font-medium text-slate-400">
                      <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-[40px] overflow-hidden border-8 border-white/5 relative">
                <img src="https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=1000&auto=format&fit=crop" alt="Tra keo tản nhiệt MX-4" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="p-6 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20">
                    <div className="text-3xl font-black text-white mb-2">5-10°C</div>
                    <div className="text-white/70 font-bold">Nhiệt độ giảm trung bình sau khi sử dụng MX-4 tại FastFix</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Quy trình 5 bước */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-black text-center mb-20 text-slate-900">Quy Trình 5 Bước Chuyên Nghiệp</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {service.process.map((p, i) => {
              const parts = p.text.split(':');
              const title = parts[0];
              const desc = parts[1] || '';
              return (
                <div key={i} className="p-6 bg-slate-50 border border-slate-100 rounded-[32px] hover:bg-blue-50 hover:border-blue-200 transition-all group flex flex-col">
                  <div className="text-5xl font-black text-slate-200 group-hover:text-blue-500/20 transition-colors mb-6">{p.step}</div>
                  <h3 className="text-xl font-black text-blue-600 mb-4 uppercase tracking-tight">{title}</h3>
                  <p className="text-slate-500 font-medium leading-relaxed text-sm">{desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Bảng giá */}
      <section className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-black text-center mb-6 text-slate-900">Bảng Giá Vệ Sinh</h2>
          <p className="text-xl text-center text-slate-500 font-bold mb-20">Trọn gói bao gồm: Vệ sinh + Tra keo MX-4 chính hãng.</p>

          <div className="mt-12 max-w-4xl mx-auto overflow-hidden rounded-[40px] border border-slate-200 shadow-2xl bg-white">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="p-6 md:p-8 text-left font-black uppercase tracking-wider text-sm md:text-base border-b border-slate-700 border-r border-slate-700 w-[60%]">
                    Dòng máy
                  </th>
                  <th className="p-6 md:p-8 text-center font-black uppercase tracking-wider text-sm md:text-base border-b border-slate-700">
                    Giá trọn gói
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Vệ sinh Laptop văn phòng (Dell, HP, Asus...)", price: "200.000đ" },
                  { name: "Vệ sinh Laptop Gaming / Workstation", price: "Từ 250.000đ" },
                  { name: "Vệ sinh PC Văn phòng / Case thường", price: "200.000đ" },
                  { name: "Vệ sinh PC Gaming / Case nhiều fan", price: "Từ 250.000đ" },
                  { name: "Combo: Vệ sinh + Cài Windows + Office", price: "Chỉ 400.000đ" }
                ].map((item, idx) => (
                  <tr key={idx} className="hover:bg-blue-50/50 transition-colors group">
                    <td className="p-6 md:p-8 text-slate-700 font-bold border-b border-slate-100 border-r border-slate-100 text-sm md:text-lg leading-relaxed">
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

          <div className="mt-12 text-center">
            </div>
        </div>
      </section>

      {/* NEW: Quick Booking Form Section */}
      <section id="booking-form" className="py-24 bg-white relative overflow-hidden scroll-mt-24">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-50 rounded-full blur-[120px] -z-10"></div>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                Liên hệ ngay
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 tracking-tight leading-tight">
                Đặt Lịch Vệ Sinh <br />
                <span className="text-blue-600">Trong 30 Giây</span>
              </h2>
              <p className="text-lg text-slate-600 font-medium mb-10 leading-relaxed">
                Để lại thông tin, đội ngũ kỹ thuật của FastFix sẽ chủ động liên hệ lại với bạn trong thời gian sớm nhất để tư vấn và sắp xếp lịch hẹn phù hợp nhất.
              </p>
              
              <div className="space-y-6">
                {[
                  { t: "Xác nhận lịch hẹn nhanh chóng", d: "Gọi lại sau 5-10 phút đăng ký." },
                  { t: "Kỹ thuật viên chuyên nghiệp", d: "Tay nghề cao, thái độ phục vụ tận tâm." },
                  { t: "Đúng giờ - Đúng giá", d: "Tuyệt đối không phát sinh chi phí ẩn." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 shrink-0 bg-blue-600 text-white rounded-xl flex items-center justify-center font-black">
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
            
            <BookingForm serviceName="Vệ sinh máy tính" />
          </div>
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-black text-center mb-16 text-slate-900">Giải Đáp Thắc Mắc</h2>
          <FAQAccordion
            items={[
              { q: "Bao lâu thì nên vệ sinh máy một lần?", a: "Với môi trường tại Việt Nam, bạn nên vệ sinh máy định kỳ từ 6 - 12 tháng/lần để đảm bảo keo tản nhiệt không bị khô và bụi bẩn không làm kẹt quạt giúp máy hoạt động ổn định hơn." },
              { q: "Vệ sinh tận nơi có lâu không?", a: "Thời gian vệ sinh thường mất từ 30 - 45 phút tùy vào độ phức tạp của dòng máy. Kỹ thuật viên sẽ làm sạch kỹ lưỡng nhất cho bạn." },
              { q: "Tại sao nên dùng keo MX-4?", a: "Arctic MX-4 là dòng keo tản nhiệt cao cấp, dẫn nhiệt cực tốt và có độ bền lên đến 8 năm. Nó giúp giảm nhiệt độ CPU/GPU sâu hơn các loại keo thông thường." },
              { q: "Vệ sinh máy có bao gồm cài lại Windows hay dọn rác phần mềm không?", a: "Gói này tập trung làm sạch phần cứng. Tuy nhiên, nếu bạn muốn máy 'sạch từ trong ra ngoài', FastFix có gói Combo (Vệ sinh + Tối ưu phần mềm) với giá cực kỳ ưu đãi để máy đạt hiệu suất cao nhất." }
            ]}
          />
        </div>
      </section>

      {/* 8. CTA Final */}
      <section className="py-24 px-4 bg-white pb-32">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-blue-600 to-cyan-700 rounded-[50px] p-12 md:p-20 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl -ml-32 -mb-32"></div>

          <h2 className="text-4xl md:text-6xl font-black mb-8 relative z-10">Giải Cứu Máy Nóng Ngay!</h2>
          <p className="text-xl opacity-90 mb-12 font-bold relative z-10">Đặt lịch ngay hôm nay để nhận ưu đãi vệ sinh sạch sẽ, máy chạy êm ru như mới.</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
            <a href="tel:0877023032" className="inline-block bg-white text-blue-700 px-12 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-transform shadow-xl">
              GỌI NGAY: 0877.023.032
            </a>
            <a href="https://zalo.me/0877023032" target="_blank" className="inline-block bg-transparent text-white border-2 border-white/30 px-12 py-5 rounded-2xl font-black text-xl hover:bg-white/10 transition-all">
              CHAT ZALO NGAY
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
