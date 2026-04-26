import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import Image from 'next/image';
import RemoteSupportMockup from '@/components/RemoteSupportMockup';
import FAQAccordion from '@/components/FAQAccordion';

interface ServiceData {
  title: string;
  description: string;
  metaTitle: string;
  metaDesc: string;
  benefits: string[];
  process: { step: string; text: string }[];
  details: string[];
  icon: React.ReactNode;
}

const servicesInfo: Record<string, ServiceData> = {
  'sua-may-tinh-online': {
    title: 'Sửa Máy Tính Online Chuyên Nghiệp – Xử Lý Xong Sau 15 Phút',
    metaTitle: 'Sửa Máy Tính Online | Cài Win, Fix Lỗi Từ Xa Sau 15 Phút',
    metaDesc:
      'Dịch vụ sửa máy tính online qua UltraViewer/AnyDesk chuyên nghiệp. Fix lỗi Windows, phần mềm, virus nhanh chóng, an toàn tuyệt đối. Cam kết không sửa được không lấy phí.',
    description:
      'Đội ngũ kỹ thuật viên trình độ cao hỗ trợ trực tiếp qua UltraViewer/AnyDesk. Tiết kiệm thời gian, an toàn tuyệt đối, bảo mật dữ liệu.',
    icon: (
      <svg
        className='w-12 h-12'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
        />
      </svg>
    ),
    benefits: [
      'Hỗ trợ thần tốc chỉ sau 5 phút kết nối.',
      'Bạn trực tiếp giám sát mọi thao tác trên màn hình.',
      'Không mất dữ liệu, bảo mật thông tin cá nhân tuyệt đối.',
      'Giá rẻ hơn 50% so với mang máy ra trung tâm.',
    ],
    process: [
      { step: '01', text: 'Kết nối: Bạn nhắn tin mô tả tình trạng và gửi ID/Pass UltraViewer hoặc Anydesk qua Zalo.' },
      { step: '02', text: 'Kiểm tra: Kỹ thuật viên truy cập và xác định nguyên nhân lỗi trực tiếp trên màn hình của bạn.' },
      { step: '03', text: 'Báo giá & Xử lý: Báo giá rõ ràng theo khung niêm yết. Sau khi bạn đồng ý, chúng tôi sẽ xử lý nhanh.' },
      { step: '04', text: 'Nghiệm thu: Bạn kiểm tra lại máy, hài lòng hoàn toàn mới tiến hành thanh toán chuyển khoản.' },
    ],
    details: [
      'Cài đặt Windows 10, 11 Pro (Full Driver & Office) từ xa.',
      'Khắc phục lỗi máy tính bị treo, lag, màn hình xanh (BSOD).',
      'Diệt virus, mã độc, tối ưu hóa giúp máy chạy nhanh như mới.',
      'Cài đặt trọn bộ Office (2016 - 2024), font tiếng Việt, PDF.',
      'Sửa lỗi máy tính không vào được mạng, lỗi kết nối máy in.',
    ],
  },
  'sua-may-tinh-tan-noi': {
    title: 'Sửa Máy Tính Tận Nơi - Chuyên Nghiệp, Có Mặt Sau 30 Phút',
    metaTitle: 'Sửa Máy Tính Tại Nhà | Sửa Laptop Tận Nơi Uy Tín Tại TP.HCM',
    metaDesc:
      'Dịch vụ sửa máy tính, laptop tận nơi uy tín tại TP.HCM. Cài Win tại nhà, sửa lỗi phần cứng, thay thế linh kiện chính hãng. Có mặt nhanh, giá rẻ, bảo hành dài hạn.',
    description:
      'FastFix cung cấp dịch vụ sửa chữa máy tính tận nhà, văn phòng chuyên nghiệp. Kỹ thuật viên tay nghề cao sẽ giúp bạn xử lý triệt để mọi lỗi phần cứng và phần mềm mà bạn không cần phải tốn công di chuyển.',
    icon: (
      <svg
        className='w-12 h-12'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
        />
      </svg>
    ),
    benefits: [
      'Phục vụ nhanh chóng tại tất cả các quận huyện TP.HCM.',
      'Kiểm tra và báo giá rõ ràng trước khi tiến hành sửa chữa.',
      'Linh kiện chính hãng, cam kết bảo hành uy tín từ 6-36 tháng.',
      'Tiết kiệm thời gian, công sức và rủi ro va đập khi mang máy ra tiệm.',
    ],
    process: [
      { step: '01', text: 'Nhận yêu cầu và địa chỉ qua Hotline 0877.023.032.' },
      { step: '02', text: 'Kỹ thuật viên di chuyển và có mặt tại nhà khách sau 30 phút.' },
      { step: '03', text: 'Kiểm tra tổng thể máy, tư vấn giải pháp tối ưu và báo giá.' },
      { step: '04', text: 'Sửa chữa, dán tem bảo hành và khách hàng nghiệm thu.' },
    ],
    details: [
      'Cài đặt Windows 7, 10, 11 tại nhà cho PC & Laptop.',
      'Sửa chữa phần cứng: Máy không lên nguồn, mất hình, kêu to.',
      'Thay thế linh kiện tận nơi: RAM, ổ cứng SSD.',
      'Xử lý các sự cố mạng: Mất mạng Wifi, có kết nối wifi nhưng không vào được mạng.',
      'Nâng cấp cấu hình máy văn phòng, máy chơi game theo yêu cầu.',
    ],
  },
  'cai-dat-phan-mem': {
    title: 'Dịch Vụ Cài Đặt Phần Mềm Máy Tính - Full Trọn Bộ',
    metaTitle: 'Cài Đặt Phần Mềm Máy Tính | Thiết Kế, Văn Phòng, Kỹ Thuật Uy Tín',
    metaDesc:
      'Nhận cài đặt trọn bộ phần mềm máy tính: Adobe CC 2024, AutoCAD, Corel, bộ Office, ArtiosCAD... Hỗ trợ cài đặt từ xa hoặc tận nơi nhanh chóng, phần mềm ổn định, bảo hành dài hạn.',
    description:
      'Bạn cần công cụ chuyên nghiệp để làm việc nhưng không biết cách cài đặt? FastFix hỗ trợ cài đặt mọi loại phần mềm từ cơ bản đến chuyên dụng, đảm bảo phần mềm chạy mượt, đầy đủ tính năng và không lỗi.',
    icon: (
      <svg
        className='w-12 h-12'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
        />
      </svg>
    ),
    benefits: [
      'Cài đặt đúng phiên bản phù hợp với cấu hình máy tính.',
      'Kích hoạt bản quyền vĩnh viễn, sử dụng ổn định lâu dài.',
      'Hỗ trợ cài đặt lại miễn phí trong vòng 30 ngày nếu gặp lỗi.',
      'Quét virus và tối ưu máy miễn phí sau khi cài đặt.',
    ],
    process: [
      { step: '01', text: 'Cung cấp danh sách các phần mềm cần cài đặt.' },
      { step: '02', text: 'FastFix báo giá trọn gói tiết kiệm cho khách hàng.' },
      { step: '03', text: 'Thực hiện cài đặt qua mạng (UltraView) hoặc tận nơi.' },
      { step: '04', text: 'Khách hàng test tính năng phần mềm và nghiệm thu.' },
    ],
    details: [
      'Trọn bộ Adobe CC: Photoshop, Illustrator, Premiere, After Effects, InDesign...',
      'Phần mềm thiết kế kiến trúc: AutoCAD, SketchUp + Vray, 3ds Max, Revit.',
      'Phần mềm văn phòng: Office 2016 - 2024, Office 365, PDF Acrobat Pro.',
      'Phần mềm đồ họa khác: CorelDraw, Camtasia.',
      'Phần mềm kỹ thuật: Mastercam, SolidWorks, ArtiosCAD, Matlab.',
      'Cài đặt Game, giả lập Android (Bluestacks, LDPlayer).',
    ],
  },
  've-sinh-may-tinh': {
    title: 'Vệ Sinh Máy Tính & Laptop - Giảm Nhiệt, Tăng Tuổi Thọ',
    metaTitle: 'Vệ Sinh Laptop Tại Nhà | Vệ Sinh Máy Tính PC Chuyên Nghiệp Tận Nơi',
    metaDesc:
      'Dịch vụ vệ sinh laptop, PC tận nơi uy tín. Sử dụng keo tản nhiệt MX-4 chính hãng, dọn dẹp bụi bẩn, giúp máy giảm nhiệt độ, chạy êm và bền bỉ hơn.',
    description:
      'Máy tính của bạn nóng ran, quạt kêu to hay bị tắt nguồn đột ngột? Đó là lúc bạn cần vệ sinh máy tính định kỳ. FastFix giúp làm sạch bụi bẩn và thay keo tản nhiệt chất lượng cao ngay tại nhà bạn.',
    icon: (
      <svg
        className='w-12 h-12'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M13 10V3L4 14h7v7l9-11h-7z'
        />
      </svg>
    ),
    benefits: [
      'Giảm ngay 5 - 10 độ C cho CPU và Card đồ họa.',
      'Sử dụng keo tản nhiệt MX-4 chính hãng.',
      'Hạn chế rủi ro cháy nổ, chập cháy linh kiện do quá nhiệt.',
      'Giúp quạt chạy êm ái, máy hoạt động mượt mà hơn.',
    ],
    process: [
      { step: '01', text: 'Kiểm tra nhiệt độ máy bằng phần mềm chuyên dụng.' },
      { step: '02', text: 'Tháo linh kiện, vệ sinh bụi bẩn quạt, khe tản nhiệt và mainboard.' },
      { step: '03', text: 'Lau sạch keo cũ, tra keo tản nhiệt mới MX-4.' },
      { step: '04', text: 'Lắp máy, kiểm tra lại nhiệt độ sau khi vệ sinh và bàn giao.' },
    ],
    details: [
      'Vệ sinh Laptop: Dell, HP, Asus, Acer, Lenovo, MSI.',
      'Vệ sinh PC Gaming, máy trạm (Workstation) chuyên nghiệp.',
      'Tra mỡ quạt giúp quạt chạy êm, không gây tiếng ồn.',
      'Làm sạch toàn bộ linh kiện bên trong và vỏ máy bên ngoài.',
      'Tư vấn nâng cấp SSD/RAM để máy đạt hiệu suất tối đa.',
    ],
  },
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const resolvedParams = await params;
  const service = servicesInfo[resolvedParams.slug];

  if (!service) return { title: 'Dịch vụ không tồn tại - FastFix' };

  return {
    title: service.metaTitle,
    description: service.metaDesc,
    openGraph: {
      title: service.metaTitle,
      description: service.metaDesc,
      type: 'article',
    },
  };
}

export default async function ServiceDetail({
  params,
}: {
  params: { slug: string };
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const service = servicesInfo[slug];

  if (!service) {
    return (
      <div className='min-h-screen bg-slate-50 flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-4xl font-black text-slate-300 mb-4'>404</h1>
          <p className='text-slate-500 font-bold mb-8'>
            Dịch vụ này không tồn tại hoặc đã bị gỡ bỏ.
          </p>
          <Link
            href='/'
            className='bg-slate-900 text-white px-8 py-3 rounded-xl font-bold'
          >
            Quay lại trang chủ
          </Link>
        </div>
      </div>
    );
  }

  // Specialized Landing Page for Online Repair
  if (slug === 'sua-may-tinh-online') {
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
              <div className="text-left">
                <div className="flex flex-wrap items-center gap-3 mb-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-700 text-sm font-bold shadow-sm">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                    </span>
                    Hỗ trợ: 08:30 - 22:00
                  </div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-sm font-bold shadow-sm">
                    Không sửa được – Không lấy phí
                  </div>
                </div>

                <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8 leading-[1.1] text-slate-900">
                  Sửa Máy Tính Online <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-700">
                    Hỗ Trợ Từ Xa Sau 15 Phút
                  </span>
                </h1>

                <p className="max-w-xl text-lg md:text-xl text-slate-600 mb-10 leading-relaxed font-medium">
                  Đội ngũ kỹ thuật viên trình độ cao hỗ trợ trực tiếp qua UltraViewer/AnyDesk. Tiết kiệm thời gian, an toàn tuyệt đối, bảo mật dữ liệu.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
                  <a href="https://zalo.me/0877023032" target="_blank" rel="noopener noreferrer"
                    className="w-full sm:w-auto bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-10 py-5 rounded-2xl font-black text-xl transition-all shadow-xl flex items-center justify-center gap-3 transform hover:-translate-y-1">
                    ZALO TƯ VẤN NGAY
                  </a>
                  <a href="https://ultraviewer.net/vi/download.html" target="_blank" rel="noopener noreferrer"
                    className="w-full sm:w-auto bg-white text-slate-700 border-2 border-slate-200 px-10 py-5 rounded-2xl font-black text-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-3 transform hover:-translate-y-1">
                    TẢI ULTRAVIEWER
                  </a>
                </div>
              </div>

              <div className="hidden lg:block relative">
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
            <h2 className="text-4xl md:text-6xl font-black text-center mb-20 text-slate-900">Dịch Vụ Chuyên Sâu</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "Cấp cứu phần mềm", desc: "Fix lỗi windows, cài đặt driver, xử lí lỗi phần mềm.", icon: "monitor", color: "cyan" },
                { title: "Cài đặt phần mềm", desc: "Cài Adobe, Office, AutoCAD, Mastercam, phần mềm kế toán.", icon: "upload", color: "blue" },
                { title: "Tăng tốc hệ thống", desc: "Dọn rác, tối ưu hệ thống, giúp máy chạy ổn định.", icon: "bolt", color: "amber" },
                { title: "Tư vấn nâng cấp máy", desc: "Kiểm tra cấu hình, tư vấn nâng cấp RAM, SSD giúp máy chạy nhanh với chi phí hợp lý nhất.", icon: "search", color: "purple" }
              ].map((s, i) => {
                const colorMap = {
                  cyan: { bg: "bg-cyan-50/50", border: "border-cyan-100", hover: "hover:border-cyan-500", iconBg: "bg-cyan-100", iconColor: "text-cyan-600", shadow: "hover:shadow-cyan-500/10" },
                  blue: { bg: "bg-blue-50/50", border: "border-blue-100", hover: "hover:border-blue-500", iconBg: "bg-blue-100", iconColor: "text-blue-600", shadow: "hover:shadow-blue-500/10" },
                  amber: { bg: "bg-amber-50/50", border: "border-amber-100", hover: "hover:border-amber-500", iconBg: "bg-amber-100", iconColor: "text-amber-600", shadow: "hover:shadow-amber-500/10" },
                  purple: { bg: "bg-purple-50/50", border: "border-purple-100", hover: "hover:border-purple-500", iconBg: "bg-purple-100", iconColor: "text-purple-600", shadow: "hover:shadow-purple-500/10" }
                };
                const c = colorMap[s.color as keyof typeof colorMap];

                return (
                  <div key={i} className={`p-8 ${c.bg} border ${c.border} ${c.hover} rounded-[40px] transition-all duration-500 shadow-sm ${c.shadow} group hover:-translate-y-2`}>
                    <div className={`w-14 h-14 ${c.iconBg} ${c.iconColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      {s.icon === 'monitor' && <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
                      {s.icon === 'upload' && <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>}
                      {s.icon === 'bolt' && <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
                      {s.icon === 'search' && <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>}
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-4">{s.title}</h3>
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
            <h2 className="text-4xl md:text-6xl font-black text-center mb-20 text-white">Quy Trình 4 Bước Chuyên Nghiệp</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {service.process.map((p, i) => {
                const [title, desc] = p.text.split(':');
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

        {/* 5. Bảng giá */}
        <section className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl md:text-6xl font-black text-center mb-20 text-slate-900">Bảng giá dịch vụ tham khảo</h2>

            {/* Bảng giá chuẩn Excel - Fix 2 cột trên mọi thiết bị */}
            <div className="mt-12 max-w-4xl mx-auto overflow-hidden rounded-3xl border border-slate-200 shadow-2xl bg-white">
              <table className="w-full border-collapse table-fixed">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="p-4 md:p-6 text-left font-black uppercase tracking-wider text-[10px] md:text-base border border-slate-700 w-[55%]">
                      Hạng mục dịch vụ
                    </th>
                    <th className="p-4 md:p-6 text-center font-black uppercase tracking-wider text-[10px] md:text-base border border-slate-700">
                      Giá tham khảo
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "Cài đặt Windows 10/11 + Full Driver & Office", price: "150.000đ - 200.000đ" },
                    { name: "Cài đặt phần mềm Adobe (Photoshop, AI, Premiere...)", price: "Từ 100.000đ / App" },
                    { name: "Cài đặt phần mềm kỹ thuật (AutoCAD, SketchUp...)", price: "Từ 150.000đ / App" },
                    { name: "Cài đặt Microsoft Office (2016 - 2024)", price: "100.000đ" },
                    { name: "Sửa lỗi phần mềm, cài driver máy in", price: "Từ 100.000đ" }
                  ].map((item, idx) => (
                    <tr key={idx} className="hover:bg-cyan-50/50 transition-colors group">
                      <td className="p-4 md:p-6 text-slate-700 font-bold border border-slate-200 text-[11px] md:text-base break-words leading-relaxed">
                        {item.name}
                      </td>
                      <td className="p-4 md:p-6 text-slate-900 font-black text-center border border-slate-200 text-[11px] md:text-base break-words leading-relaxed">
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
        <section className="py-32 bg-slate-50 border-y border-slate-200">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-4xl font-black text-center mb-16 text-slate-900">Câu Hỏi Thường Gặp</h2>
            <FAQAccordion
              items={[
                { q: "Sửa máy tính từ xa có an toàn không?", a: "Cực kỳ an toàn. Bạn có thể theo dõi toàn bộ thao tác của kỹ thuật viên trên màn hình. Bạn cũng có thể ngắt kết nối bất cứ lúc nào nếu cảm thấy không an tâm." },
                { q: "Dữ liệu cá nhân của tôi có bị xem trộm không?", a: "Hoàn toàn KHÔNG. Bạn có thể giám sát 100% mọi thao tác của kỹ thuật viên trực tiếp trên màn hình. Chúng tôi cam kết chỉ truy cập vào các file cần thiết để cài đặt hoặc test lỗi (như mở file văn bản để test máy in). Tuyệt đối không xâm phạm vào ảnh, video hay dữ liệu riêng tư của khách hàng." },
                { q: "Thời gian xử lý lỗi mất khoảng bao lâu?", a: "Tùy độ phức tạp của lỗi, thường từ 15 - 45 phút. Với dịch vụ cài Windows hoặc phần mềm nặng, thời gian có thể từ 1 - 2 tiếng." }
              ]}
            />
          </div>
        </section>

        {/* 7. CTA */}
        <section className="py-24 px-4 bg-white">
          <div className="max-w-5xl mx-auto bg-gradient-to-br from-cyan-600 to-blue-700 rounded-[50px] p-12 md:p-20 text-center text-white shadow-2xl">
            <h2 className="text-4xl md:text-6xl font-black mb-8">Liên hệ ngay!</h2>
            <p className="text-xl opacity-90 mb-12">Hỗ trợ từ 08:30 - 22:00 kể cả ngày lễ và cuối tuần.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://zalo.me/0877023032" target="_blank" className="inline-block bg-white text-blue-700 px-12 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-transform shadow-xl">
                NHẮN ZALO TƯ VẤN
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

  // Default Layout for other services
  return (
    <div className='bg-white min-h-screen'>
      {/* Hero Section */}
      <section className='bg-slate-900 pt-24 pb-20 relative overflow-hidden'>
        <div className='absolute top-0 left-0 w-full h-full opacity-10'>
          <div className='absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-500 rounded-full blur-[120px]'></div>
          <div className='absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500 rounded-full blur-[120px]'></div>
        </div>

        <div className='max-w-7xl mx-auto px-4 relative z-10'>
          <div className='max-w-3xl'>
            <div className='inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-cyan-400 text-sm font-black uppercase tracking-widest mb-8'>
              Dịch vụ chuyên nghiệp
            </div>
            <h1 className='text-4xl md:text-6xl font-black text-white mb-8 leading-[1.1]'>
              {service.title}
            </h1>
            <p className='text-xl text-slate-400 leading-relaxed mb-10'>
              {service.description}
            </p>
            <div className='flex flex-wrap gap-4'>
              <a
                href='https://zalo.me/0877023032'
                target='_blank'
                className='bg-gradient-to-r from-orange-500 to-red-600 text-white px-10 py-5 rounded-2xl font-black text-lg shadow-xl shadow-orange-500/20 hover:scale-105 transition-transform'
              >
                Đặt lịch hỗ trợ ngay
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className='py-24'>
        <div className='max-w-7xl mx-auto px-4'>
          <div className='grid grid-cols-1 lg:grid-cols-12 gap-16'>
            {/* Left Column: Details */}
            <div className='lg:col-span-7 space-y-16'>
              {/* Service List */}
              <div className='bg-slate-50 p-10 md:p-14 rounded-[3rem] border border-slate-100'>
                <h2 className='text-3xl font-black text-slate-900 mb-10 flex items-center gap-4'>
                  Các hạng mục hỗ trợ
                </h2>
                <ul className='space-y-6'>
                  {service.details.map((item, idx) => (
                    <li key={idx} className='flex items-start gap-5'>
                      <div className='w-8 h-8 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center shrink-0 mt-1'>
                        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={3} d='M5 13l4 4L19 7' /></svg>
                      </div>
                      <span className='text-xl text-slate-700 font-medium leading-tight'>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Process Section */}
              <div>
                <h2 className='text-3xl font-black text-slate-900 mb-12'>Quy trình chuyên nghiệp</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                  {service.process.map((p, idx) => (
                    <div key={idx} className='flex gap-6 items-start p-6 rounded-2xl hover:bg-slate-50 transition-colors group'>
                      <span className='text-4xl font-black text-slate-200 group-hover:text-cyan-500 transition-colors leading-none'>{p.step}</span>
                      <p className='text-lg text-slate-600 font-bold leading-snug'>{p.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Benefits */}
            <div className='lg:col-span-5 space-y-10'>
              <div className='bg-gradient-to-br from-cyan-600 to-blue-700 p-10 md:p-12 rounded-[3rem] text-white shadow-2xl shadow-cyan-200'>
                <h3 className='text-2xl font-black mb-8 leading-tight'>Tại sao nên chọn FastFix?</h3>
                <div className='space-y-6'>
                  {service.benefits.map((benefit, idx) => (
                    <div key={idx} className='flex items-center gap-4'>
                      <div className='w-6 h-6 bg-white/20 rounded-full flex items-center justify-center'><div className='w-2 h-2 bg-white rounded-full'></div></div>
                      <p className='text-lg font-bold opacity-90'>{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
