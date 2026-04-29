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
    title: 'CÀI ĐẶT PHẦN MỀM ONLINE TỪ XA – XỬ LÝ NGAY TRONG 15-30 PHÚT',
    metaTitle: 'Cài Đặt Phần Mềm Máy Tính Online | Fix Lỗi Adobe, Office Lấy Liền',
    metaDesc:
      'Dịch vụ cài đặt phần mềm máy tính từ xa qua UltraViewer/AnyDesk. Cài Adobe CC 2024, AutoCAD, Office nhanh chóng, an toàn, bảo mật dữ liệu. Hỗ trợ ngay sau 15-30 phút.',
    description:
      'Đừng để lỗi phần mềm làm gián đoạn tiến độ công việc của bạn. Đội ngũ kỹ thuật viên chuyên nghiệp tại FastFix hỗ trợ cài đặt và xử lý từ xa qua UltraViewer/AnyDesk – Nhanh chóng, An toàn và Bảo mật tuyệt đối.',
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
      'Không truy cập file riêng tư của khách hàng.',
      'Không cài đặt phần mềm độc hại, virus.',
      'Backup dữ liệu quan trọng trước khi xử lý.',
      'Hỗ trợ cài đặt lại miễn phí trong vòng 30 ngày.',
    ],
    process: [
      { step: '01', text: 'Liên hệ: Bạn liên hệ FastFix và gửi tên phần mềm cần cài qua Zalo 0877.023.032.' },
      { step: '02', text: 'Tư vấn: Kỹ thuật viên kiểm tra cấu hình máy và tư vấn phiên bản phần mềm phù hợp nhất.' },
      { step: '03', text: 'Cài đặt: Gửi ID/Pass UltraViewer để kỹ thuật viên tiến hành cài đặt và tinh chỉnh từ xa.' },
      { step: '04', text: 'Thanh toán: Sau khi cài xong, bạn kiểm tra máy hoạt động tốt mới tiến hành thanh toán.' },
    ],
    details: [
      'Trọn bộ Adobe CC: Photoshop, Illustrator, Premiere, After Effects, InDesign...',
      'Phần mềm thiết kế: AutoCAD, SketchUp + Vray, 3ds Max, Revit.',
      'Phần mềm văn phòng: Office 2016 - 2024, Office 365, PDF Acrobat Pro.',
      'Phần mềm kỹ thuật: Mastercam, SolidWorks, ArtiosCAD, Matlab.',
      'Phần mềm kế toán, chữ ký số, khai thuế...',
    ],
  },
  've-sinh-may-tinh': {
    title: 'VỆ SINH LAPTOP & PC TẬN NƠI – GIẢM NGAY 15°C – MÁY MÁT NHƯ MỚI',
    metaTitle: 'Vệ Sinh Laptop Tại Nhà | Vệ Sinh Máy Tính PC Chuyên Nghiệp Tận Nơi',
    metaDesc:
      'Dịch vụ vệ sinh laptop, PC tận nơi uy tín. Sử dụng keo tản nhiệt MX-4 chính hãng, dọn dẹp bụi bẩn, giúp máy giảm nhiệt độ, chạy êm và bền bỉ hơn.',
    description:
      'Máy nóng ran, quạt kêu to, hay sập nguồn đột ngột? Xử lý ngay tại nhà với keo tản nhiệt MX-4 chính hãng. Giúp máy bạn hoạt động mát mẻ và bền bỉ như ngày đầu.',
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

  // Specialized Landing Page for Computer Cleaning (Vệ Sinh Máy Tính)
  if (slug === 've-sinh-may-tinh') {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Vệ Sinh Máy Tính & Laptop Tận Nơi",
      "description": "Dịch vụ vệ sinh laptop, PC tại nhà chuyên nghiệp, sử dụng keo tản nhiệt MX-4, giảm nhiệt ngay 15 độ C.",
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
              <div className="text-left">
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
                    Giảm Ngay 15°C
                  </span>
                </h1>

                <p className="max-w-xl text-lg md:text-xl text-slate-600 mb-10 leading-relaxed font-medium">
                  Máy nóng ran, quạt kêu to, hay sập nguồn đột ngột? Xử lý ngay tại nhà với keo tản nhiệt MX-4 chính hãng. Giúp máy bạn hoạt động mát mẻ và bền bỉ như ngày đầu.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
                  <a href="tel:0877023032"
                    className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white px-10 py-5 rounded-2xl font-black text-xl transition-all shadow-xl flex items-center justify-center gap-3 transform hover:-translate-y-1">
                    🚀 ĐẶT LỊCH NGAY
                  </a>
                  <a href="https://zalo.me/0877023032" target="_blank" rel="noopener noreferrer"
                    className="w-full sm:w-auto bg-white text-slate-700 border-2 border-slate-200 px-10 py-5 rounded-2xl font-black text-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-3 transform hover:-translate-y-1">
                    💬 CHAT ZALO NGAY
                  </a>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    "Giảm nhiệt CPU/GPU tức thì",
                    "Tra keo tản nhiệt MX-4 xịn",
                    "Làm sạch bụi bẩn 100%",
                    "Hỗ trợ tận nơi tại HCM"
                  ].map((t, i) => (
                    <div key={i} className="flex items-center gap-2 text-slate-600 font-bold">
                      <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                      {t}
                    </div>
                  ))}
                </div>
              </div>

              <div className="hidden lg:block relative">
                <div className="relative rounded-[40px] overflow-hidden shadow-2xl border-8 border-white group">
                  <img src="/cleaning-hero.png" alt="Vệ sinh máy tính tận nơi" className="w-full h-[600px] object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-10 left-10 right-10 p-8 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20">
                    <div className="flex items-center gap-4 text-white">
                      <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                      </div>
                      <div>
                        <div className="font-black text-xl leading-tight">Giải cứu máy nóng</div>
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
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-16 text-center">Máy Tính Bạn Đang Gào Thét?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                "Máy nóng ran, sờ vào vỏ cảm thấy bỏng tay?",
                "Quạt kêu to như máy cày, gây khó chịu khi làm việc?",
                "Treo máy, giật lag hoặc tự động sập nguồn khi đang dùng?",
                "Dùng lâu ngày bụi bẩn bám đầy, có nguy cơ cháy nổ linh kiện?"
              ].map((q, i) => (
                <div key={i} className="flex gap-6 p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                  <div className="w-12 h-12 shrink-0 bg-orange-50 rounded-2xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform">🔥</div>
                  <p className="text-lg font-bold text-slate-700 leading-relaxed">{q}</p>
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
                { title: "Keo MX-4 Chính Hãng", desc: "Cam kết sử dụng keo tản nhiệt Arctic MX-4/MX-6 tốt nhất hiện nay.", icon: "beaker" },
                { title: "Vệ Sinh Tỉ Mỉ", desc: "Làm sạch kỹ từng khe tản nhiệt, cánh quạt và toàn bộ mainboard.", icon: "sparkles" },
                { title: "Xem Trực Tiếp", desc: "Bạn có thể giám sát toàn bộ quá trình vệ sinh ngay tại nhà.", icon: "eye" },
                { title: "Dán Tem Bảo Hành", desc: "Bảo hành kỹ thuật và hỗ trợ kiểm tra nhiệt độ sau dịch vụ.", icon: "shield-check" }
              ].map((item, i) => (
                <div key={i} className="p-8 bg-blue-50/30 border border-blue-100 rounded-[32px] text-center hover:bg-blue-50 transition-all">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                    {item.icon === 'beaker' && <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.673.337a4 4 0 01-2.509.37l-1.54-.154a4 4 0 01-3.14-3.14l-.154-1.54a4 4 0 01.37-2.509l.337-.673a6 6 0 00.517-3.86l-.477-2.387a2 2 0 00-2.399-1.565l-2.387.477a2 2 0 00-1.565 2.399l.477 2.387a6 6 0 00.517 3.86l-.337.673a4 4 0 01-.37 2.509l.154 1.54a4 4 0 013.14 3.14l1.54.154a4 4 0 012.509-.37l.673-.337a6 6 0 003.86-.517l2.387.477a2 2 0 001.022-.547z" /></svg>}
                    {item.icon === 'sparkles' && <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" /></svg>}
                    {item.icon === 'eye' && <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>}
                    {item.icon === 'shield-check' && <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>}
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 font-medium text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Quy trình 4 bước */}
        <section className="py-32 bg-slate-900 text-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl md:text-6xl font-black text-center mb-20 text-white">Quy Trình 5 Bước Chuyên Nghiệp</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {service.process.map((p, i) => {
                const [title, desc] = p.text.split(':');
                return (
                  <div key={i} className="p-10 bg-white/5 border border-white/10 rounded-[40px] hover:bg-white/10 transition-all group">
                    <div className="text-6xl font-black text-white/10 mb-6 group-hover:text-blue-500/20 transition-colors">{p.step}</div>
                    <h3 className="text-2xl font-black text-blue-400 mb-4 uppercase tracking-tight">{title}</h3>
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
            <h2 className="text-4xl md:text-6xl font-black text-center mb-6 text-slate-900">Bảng giá vệ sinh máy</h2>
            <p className="text-xl text-center text-slate-500 font-bold mb-20">Trọn gói bao gồm: Vệ sinh + Tra keo MX-4 chính hãng.</p>

            <div className="mt-12 max-w-4xl mx-auto overflow-hidden rounded-3xl border border-slate-200 shadow-2xl bg-white">
              <table className="w-full border-collapse table-fixed">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="p-4 md:p-6 text-left font-black uppercase tracking-wider text-[10px] md:text-base border border-slate-700 w-[55%]">
                      Dòng máy
                    </th>
                    <th className="p-4 md:p-6 text-center font-black uppercase tracking-wider text-[10px] md:text-base border border-slate-700">
                      Giá niêm yết
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "Vệ sinh Laptop văn phòng (Dell, HP, Asus...)", price: "150.000đ" },
                    { name: "Vệ sinh Laptop Gaming / Workstation", price: "200.000đ" },
                    { name: "Vệ sinh PC Văn phòng / Case thường", price: "150.000đ" },
                    { name: "Vệ sinh PC Gaming / Case nhiều fan", price: "200.000đ - 250.000đ" },
                    { name: "Combo: Vệ sinh + Cài Windows + Soft", price: "Chỉ 350.000đ" }
                  ].map((item, idx) => (
                    <tr key={idx} className="hover:bg-blue-50/50 transition-colors group">
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
            <h2 className="text-4xl font-black text-center mb-16 text-slate-900">Giải Đáp Thắc Mắc</h2>
            <FAQAccordion
              items={[
                { q: "Bao lâu thì nên vệ sinh máy một lần?", a: "Với môi trường tại Việt Nam, bạn nên vệ sinh máy định kỳ từ 6 - 12 tháng/lần để đảm bảo keo tản nhiệt không bị khô và bụi bẩn không làm kẹt quạt." },
                { q: "Vệ sinh tận nơi có lâu không?", a: "Thời gian vệ sinh thường mất từ 30 - 45 phút tùy vào độ phức tạp của dòng máy. Kỹ thuật viên sẽ làm sạch kỹ lưỡng nhất cho bạn." },
                { q: "Tại sao nên dùng keo MX-4?", a: "Arctic MX-4 là dòng keo tản nhiệt cao cấp, dẫn nhiệt cực tốt và có độ bền lên đến 8 năm. Nó giúp giảm nhiệt độ CPU/GPU sâu hơn các loại keo thông thường." }
              ]}
            />
          </div>
        </section>

        {/* 7. CTA Final */}
        <section className="py-24 px-4 bg-white">
          <div className="max-w-5xl mx-auto bg-gradient-to-br from-blue-600 to-cyan-700 rounded-[50px] p-12 md:p-20 text-center text-white shadow-2xl">
            <h2 className="text-4xl md:text-6xl font-black mb-8">🚀 Giải Cứu Máy Nóng Ngay!</h2>
            <p className="text-xl opacity-90 mb-12 font-bold">Đặt lịch ngay hôm nay để nhận ưu đãi vệ sinh sạch sẽ, máy chạy êm ru.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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

  // Specialized Landing Page for Software Installation (Cài Phần Mềm)
  if (slug === 'cai-dat-phan-mem') {
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
              <div className="text-left">
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
                  Đừng để lỗi phần mềm làm gián đoạn tiến độ công việc của bạn. Đội ngũ kỹ thuật viên chuyên nghiệp tại FastFix hỗ trợ cài đặt và xử lý từ xa qua UltraViewer/AnyDesk – Nhanh chóng, An toàn và Bảo mật tuyệt đối.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
                  <a href="https://zalo.me/0877023032" target="_blank" rel="noopener noreferrer"
                    className="w-full sm:w-auto bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-10 py-5 rounded-2xl font-black text-xl transition-all shadow-xl flex items-center justify-center gap-3 transform hover:-translate-y-1">
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
                    "Hỗ trợ tận nơi tại HCM"
                  ].map((t, i) => (
                    <div key={i} className="flex items-center gap-2 text-slate-600 font-bold">
                      <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                      {t}
                    </div>
                  ))}
                </div>
              </div>

              <div className="hidden lg:block relative">
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

        {/* 3. Khối Niềm Tin (Bắt buộc có) */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "Bảo mật tuyệt đối", desc: "Tuyệt đối không truy cập file riêng tư, ảnh, video của khách hàng.", icon: "shield-check", color: "blue" },
                { title: "Nguồn file Tin cậy", desc: "Phần mềm được tuyển chọn và tối ưu sạch sẽ, loại bỏ hoàn toàn các tool rác, quảng cáo ẩn.", icon: "check-badge", color: "emerald" },
                { title: "Bảo hành Cài đặt", desc: "Hỗ trợ cài đặt lại hoàn toàn miễn phí nếu phần mềm phát sinh lỗi trong vòng 30 ngày.", icon: "arrow-path", color: "amber" },
                { title: "Thanh toán khi hài lòng", desc: "Bạn chỉ thanh toán sau khi phần mềm đã được cài đặt thành công và hoạt động hoàn hảo.", icon: "currency-dollar", color: "indigo" }
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
                    {item.icon === 'check-badge' && <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>}
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
            <h2 className="text-3xl md:text-5xl font-black text-center mb-16 text-slate-900 uppercase">Danh Sách Phần Mềm Phổ Biến</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {[
                { name: "Adobe", apps: "Photoshop, AI, Premiere...", logo: "https://img.icons8.com/color/144/adobe-creative-cloud.png" },
                { name: "Microsoft Office", apps: "Word, Excel, PowerPoint...", logo: "https://img.icons8.com/color/144/microsoft-office-2019.png" },
                { name: "Autodesk", apps: "AutoCAD, Revit, Maya, 3ds Max...", logo: "https://img.icons8.com/color/144/autocad.png" },
                { name: "CorelDRAW", apps: "Thiết kế đồ họa vector...", logo: "https://img.icons8.com/color/144/coreldraw.png" },
                { name: "SketchUp / V-Ray", apps: "Dựng hình 3D, kiến trúc...", logo: "https://img.icons8.com/color/144/google-sketchup.png" },
                { name: "Tiện ích Văn phòng", apps: "PDF, Font, Unikey, Chrome...", logo: "https://img.icons8.com/color/144/software-installer.png" }
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

        {/* 4. Quy trình 4 bước */}
        <section className="py-32 bg-slate-900 text-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl md:text-6xl font-black text-center mb-20 text-white uppercase">Quy Trình 4 Bước Chuyên Nghiệp</h2>
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
            <h2 className="text-4xl md:text-6xl font-black text-center mb-6 text-slate-900">Bảng giá dịch vụ</h2>
            <p className="text-xl text-center text-slate-500 font-bold mb-20">Bảng giá niêm yết – Cam kết minh bạch, không phát sinh thêm chi phí</p>

            <div className="mt-12 max-w-4xl mx-auto overflow-hidden rounded-3xl border border-slate-200 shadow-2xl bg-white">
              <table className="w-full border-collapse table-fixed">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="p-4 md:p-6 text-left font-black uppercase tracking-wider text-[10px] md:text-base border border-slate-700 w-[55%]">
                      Dịch vụ cài đặt
                    </th>
                    <th className="p-4 md:p-6 text-center font-black uppercase tracking-wider text-[10px] md:text-base border border-slate-700">
                      Giá niêm yết
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "Cài đặt bộ phần mềm Adobe (Photoshop, AI, Premiere...)", price: "100.000đ / App (Giảm 10% từ App thứ 3)" },
                    { name: "Cài đặt Microsoft Office (2016 - 2024, Office 365)", price: "100.000đ" },
                    { name: "Cài đặt bộ Autodesk (AutoCAD, Revit, Maya...)", price: "150.000đ / App (Giảm 10% từ App thứ 3)" },
                    { name: "Cài đặt CorelDRAW (Các phiên bản)", price: "120.000đ" },
                    { name: "Combo SketchUp + V-Ray (Dựng hình & Render 3D)", price: "150.000đ" },
                    { name: "Cài đặt trọn bộ Tiện ích Văn phòng (PDF, Font, Unikey...)", price: "50.000đ" },
                    { name: "Các phần mềm chuyên ngành khác...", price: "Liên hệ" }
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
            <h2 className="text-4xl font-black text-center mb-16 text-slate-900">Giải Đáp Thắc Mắc</h2>
            <FAQAccordion
              items={[
                { q: "Tôi có cần mang máy đến tận nơi không?", a: "KHÔNG CẦN. Chỉ cần máy bạn có kết nối Internet, kỹ thuật viên sẽ xử lý mọi thứ qua UltraViewer hoặc AnyDesk (nếu có) ngay tại chỗ, giúp bạn tiết kiệm tối đa thời gian và công sức di chuyển." },
                { q: "Dữ liệu cá nhân của tôi có được bảo mật không?", a: "Bảo mật thông tin khách hàng là ưu tiên số 1 của FastFix. Bạn có thể giám sát 100% mọi thao tác của kỹ thuật viên trực tiếp trên màn hình theo thời gian thực. Chúng tôi chỉ thực hiện mở các file mẫu để kiểm tra tính ổn định của phần mềm sau khi cài. Tuyệt đối không xâm phạm, sao chép hay truy cập vào bất kỳ hình ảnh, video hay dữ liệu riêng tư nào của bạn." },
                { q: "Thời gian cài đặt một phần mềm mất bao lâu?", a: "Thông thường chỉ mất từ 15 - 30 phút cho các phần mềm cơ bản phổ biến. Với các bộ phần mềm nặng như Adobe hay Autodesk, thời gian có thể lâu hơn một chút tùy thuộc vào tốc độ mạng và cấu hình máy của bạn." },
                { q: "Tôi cần chuẩn bị gì trước khi kỹ thuật viên bắt đầu cài đặt?", a: "Rất đơn giản, bạn chỉ cần chuẩn bị một chiếc máy tính có kết nối Internet ổn định và cài đặt sẵn phần mềm UltraViewer hoặc AnyDesk. Sau đó, hãy gửi ID và mật khẩu cho chúng tôi qua Zalo, kỹ thuật viên sẽ tiếp nhận và xử lý ngay." },
                { q: "Tôi có cần phải thanh toán tiền trước khi cài đặt không?", a: "KHÔNG CẦN. Tại FastFix, chúng tôi làm việc dựa trên sự tin tưởng và uy tín. Bạn chỉ tiến hành thanh toán sau khi kỹ thuật viên đã cài đặt xong, bạn đã kiểm tra phần mềm hoạt động tốt và hoàn toàn hài lòng với dịch vụ." },
                { q: "Nếu không cài đặt phần mềm từ xa được thì phải làm sao?", a: "Trong trường hợp hiếm hoi không thể xử lý từ xa (do lỗi Windows quá nặng hoặc xung đột phần mềm), FastFix sẽ tư vấn phương án tối ưu: Hỗ trợ kỹ thuật viên đến tận nơi xử lý hoặc bạn có thể gửi máy về phòng kỹ thuật của chúng tôi để được kiểm tra và xử lý. Đặc biệt, chúng tôi cam kết KHÔNG THU PHÍ nếu không cài đặt thành công." }
              ]}
            />
          </div>
        </section>

        {/* 7. CTA Final */}
        <section className="py-24 px-4 bg-white">
          <div className="max-w-5xl mx-auto bg-gradient-to-br from-cyan-600 to-blue-700 rounded-[50px] p-12 md:p-20 text-center text-white shadow-2xl">
            <h2 className="text-4xl md:text-6xl font-black mb-8">Liên Hệ Ngay!</h2>
            <p className="text-xl opacity-90 mb-12 font-bold">Hỗ trợ từ 8h30 - 22h00 kể cả cuối tuần. Xử lý ngay, nghiệm thu mới thanh toán.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://zalo.me/0877023032" target="_blank" className="inline-block bg-white text-blue-700 px-12 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-transform shadow-xl">
                LIÊN HỆ NGAY
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
                  Đội ngũ kỹ thuật viên trình độ cao hỗ trợ trực tiếp qua UltraViewer/AnyDesk. Tiết kiệm thời gian, an toàn tuyệt đối, bảo mật dữ liệu.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
                  <a href="https://zalo.me/0877023032" target="_blank" rel="noopener noreferrer"
                    className="w-full sm:w-auto bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-10 py-5 rounded-2xl font-black text-xl transition-all shadow-xl flex items-center justify-center gap-3 transform hover:-translate-y-1">
                    LIÊN HỆ NGAY
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
                  cyan: { bg: "bg-cyan-50/50", border: "border-cyan-100", iconColor: "text-cyan-600", shadow: "hover:shadow-cyan-500/10" },
                  blue: { bg: "bg-blue-50/50", border: "border-blue-100", iconColor: "text-blue-600", shadow: "hover:shadow-blue-500/10" },
                  amber: { bg: "bg-amber-50/50", border: "border-amber-100", iconColor: "text-amber-600", shadow: "hover:shadow-amber-500/10" },
                  purple: { bg: "bg-purple-50/50", border: "border-purple-100", iconColor: "text-purple-600", shadow: "hover:shadow-purple-500/10" }
                };
                const c = colorMap[s.color as keyof typeof colorMap];

                return (
                  <div key={i} className={`p-8 ${c.bg} border ${c.border} rounded-[32px] transition-all duration-500 shadow-sm ${c.shadow} group hover:shadow-xl hover:-translate-y-2 min-h-[294px] flex flex-col items-start text-left w-full`}>
                    <div className={`w-16 h-16 bg-white ${c.iconColor} rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform`}>
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
            <h2 className="text-4xl md:text-6xl font-black mb-8">Liên Hệ Ngay!</h2>
            <p className="text-xl opacity-90 mb-12">Hỗ trợ từ 08:30 - 22:00 kể cả ngày lễ và cuối tuần.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://zalo.me/0877023032" target="_blank" className="inline-block bg-white text-blue-700 px-12 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-transform shadow-xl">
                LIÊN HỆ NGAY
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

  // Specialized Landing Page for On-site Repair (Tận Nơi)
  if (slug === 'sua-may-tinh-tan-noi') {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Sửa Máy Tính Tận Nơi Chuyên Nghiệp",
      "description": "Dịch vụ sửa máy tính tận nơi, sửa máy tính tại nhà uy tín tại Quận 12, Gò Vấp, Tân Bình, TP.HCM. Có mặt sau 30-45 phút, chuyên nghiệp, sòng phẳng.",
      "provider": {
        "@type": "LocalBusiness",
        "name": "FastFix Tận Nơi",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "TP.HCM",
          "addressCountry": "VN"
        }
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
              <div className="text-left">
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
                    Sửa Máy Tính Tại Nhà
                  </span>
                </h1>

                <p className="max-w-xl text-lg md:text-xl text-slate-600 mb-10 leading-relaxed font-medium">
                  Dịch vụ sửa máy tính tại nhà uy tín. Kỹ thuật viên đến tận nơi kiểm tra & sửa ngay tại Quận 12, Gò Vấp, Tân Bình – Có mặt sau 30-45 phút.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
                  <a href="tel:0877023032"
                    className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white px-10 py-5 rounded-2xl font-black text-xl transition-all shadow-xl flex items-center justify-center gap-3 transform hover:-translate-y-1">
                    LIÊN HỆ NGAY
                  </a>
                  <a href="https://zalo.me/0877023032" target="_blank" rel="noopener noreferrer"
                    className="w-full sm:w-auto bg-white text-slate-700 border-2 border-slate-200 px-10 py-5 rounded-2xl font-black text-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-3 transform hover:-translate-y-1">
                    CHAT ZALO NGAY
                  </a>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-8 border-t border-slate-200/60">
                  <div>
                    <div className="text-2xl font-black text-slate-900">500+</div>
                    <div className="text-sm text-slate-500 font-bold">Khách hàng tin dùng</div>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-slate-900">30 Phút</div>
                    <div className="text-sm text-slate-500 font-bold">Thời gian có mặt</div>
                  </div>
                  <div className="hidden sm:block">
                    <div className="text-2xl font-black text-slate-900">100%</div>
                    <div className="text-sm text-slate-500 font-bold">Hài lòng tuyệt đối</div>
                  </div>
                </div>
              </div>

              <div className="hidden lg:block relative">
                <div className="relative rounded-[40px] overflow-hidden shadow-2xl border-8 border-white group">
                  <img src="https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=1000&auto=format&fit=crop" alt="Sửa máy tính tận nơi" className="w-full h-[600px] object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-10 left-10 right-10 p-8 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20">
                    <div className="flex items-center gap-4 text-white">
                      <div className="w-12 h-12 bg-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      </div>
                      <div>
                        <div className="font-black text-xl leading-tight">Sửa máy tính tận nơi - Tại nhà</div>
                        <div className="text-white/70 font-bold">Có mặt sau 30-45 phút</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Nỗi đau khách hàng - Lỗi cụ thể */}
        <section className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-16 text-center">Máy Tính Bạn Đang Gặp Lỗi Nào?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { q: "Máy không lên nguồn, bật không lên hình?", icon: "🔌" },
                { q: "Không vào được mạng Wifi, báo lỗi limited?", icon: "🌐" },
                { q: "Máy chạy cực chậm, treo máy liên tục?", icon: "🐢" },
                { q: "Bị virus xóa file, nhảy quảng cáo khó chịu?", icon: "🦠" },
                { q: "Lỗi màn hình xanh chữ trắng (BSOD)?", icon: "💎" },
                { q: "Máy kêu to, nóng ran, hay sập nguồn?", icon: "🔥" }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 p-8 bg-white rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:bg-cyan-50/50 hover:border-cyan-200 transition-all group hover:-translate-y-1">
                  <div className="w-14 h-14 shrink-0 bg-slate-50 rounded-2xl flex items-center justify-center text-2xl group-hover:bg-cyan-100 transition-colors">{item.icon}</div>
                  <p className="text-lg font-bold text-slate-700 leading-relaxed self-center group-hover:text-cyan-900 transition-colors">{item.q}</p>
                </div>
              ))}
            </div>
            <div className="mt-16 text-center">
              <a href="tel:0877023032" className="inline-flex items-center gap-3 text-cyan-600 font-black text-2xl hover:gap-5 transition-all">
                Đừng để lỗi nặng thêm, gọi ngay hỗ trợ <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
            </div>
          </div>
        </section>

        {/* 3. Dịch vụ chuyên sâu */}
        <section className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl md:text-6xl font-black text-center mb-20 text-slate-900">Dịch Vụ Tại Nhà</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "Khắc Phục Sự Cố", desc: "Xử lý máy treo, lag, lỗi phần mềm, thay thế linh kiện tận nơi.", icon: "monitor", color: "cyan" },
                { title: "Cài Windows Tận Nơi", desc: "Cài Windows 10, 11 + Full Soft trọn gói, nhanh chóng & ổn định.", icon: "upload", color: "blue" },
                { title: "Nâng Cấp Máy", desc: "Kiểm tra tận nơi, tư vấn nâng cấp linh kiện (SSD, RAM, VGA...) phù hợp nhu cầu, bảo hành uy tín.", icon: "bolt", color: "amber" },
                { title: "Vệ Sinh & Tối Ưu", desc: "Vệ sinh laptop, PC, thay keo tản nhiệt chất lượng cao, dọn sạch bụi bẩn giúp máy chạy êm và mát mẻ.", icon: "sparkles", color: "purple" }
              ].map((s, i) => {
                const colorMap = {
                  cyan: { bg: "bg-cyan-50/50", border: "border-cyan-100", hover: "hover:border-cyan-500", iconBg: "bg-cyan-100", iconColor: "text-cyan-600", shadow: "hover:shadow-cyan-500/10" },
                  blue: { bg: "bg-blue-50/50", border: "border-blue-100", hover: "hover:border-blue-500", iconBg: "bg-blue-100", iconColor: "text-blue-600", shadow: "hover:shadow-blue-500/10" },
                  amber: { bg: "bg-amber-50/50", border: "border-amber-100", hover: "hover:border-amber-500", iconBg: "bg-amber-100", iconColor: "text-amber-600", shadow: "hover:shadow-amber-500/10" },
                  purple: { bg: "bg-purple-50/50", border: "border-purple-100", hover: "hover:border-purple-500", iconBg: "bg-purple-100", iconColor: "text-purple-600", shadow: "hover:shadow-purple-100/20" }
                };
                const c = colorMap[s.color as keyof typeof colorMap];

                return (
                  <div key={i} className={`p-8 ${c.bg} border ${c.border} rounded-[32px] transition-all duration-500 shadow-sm ${c.shadow} group hover:shadow-xl hover:-translate-y-2 min-h-[294px] flex flex-col items-start text-left w-full`}>
                    <div className={`w-16 h-16 bg-white ${c.iconColor} rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform`}>
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

        {/* 4. Quy trình 5 bước chuyên nghiệp */}
        <section className="py-32 bg-slate-900 text-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl md:text-6xl font-black text-center mb-20 text-white">Quy Trình 5 Bước Chuyên Nghiệp</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {[
                { step: '01', title: 'LIÊN HỆ', desc: 'Bạn gọi Hotline 0877.023.032 hoặc nhắn Zalo mô tả tình trạng máy.' },
                { step: '02', title: 'DI CHUYỂN', desc: 'Kỹ thuật viên di chuyển và có mặt tại nhà bạn sau 30-45 phút.' },
                { step: '03', title: 'KIỂM TRA', desc: 'Kỹ thuật viên tiến hành kiểm tra, chẩn đoán lỗi, xác định nguyên nhân và tư vấn phương án xử lý tối ưu.' },
                { step: '04', title: 'BÁO GIÁ', desc: 'Báo giá minh bạch, tư vấn giải pháp xử lý hợp lý và hiệu quả nhất. Chỉ thực hiện khi khách hàng đồng ý.' },
                { step: '05', title: 'SỬA CHỮA', desc: 'Tiến hành xử lý, cam kết máy hoạt động ổn định và bàn giao máy sau khi khách hàng đã nghiệm thu hoàn tất.' }
              ].map((p, i) => (
                <div key={i} className="p-10 bg-white/5 border border-white/10 rounded-[40px] hover:bg-white/10 transition-all group">
                  <div className="text-6xl font-black text-white/10 mb-6 group-hover:text-cyan-500/20 transition-colors">{p.step}</div>
                  <h3 className="text-2xl font-black text-cyan-400 mb-4 uppercase tracking-tight">{p.title}</h3>
                  <p className="text-slate-400 font-medium leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-20 text-center">
              <a href="tel:0877023032" className="inline-block bg-white text-slate-900 px-12 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-transform">GỌI HỖ TRỢ NGAY</a>
            </div>
          </div>
        </section>

        {/* 5. Bảng giá minh bạch */}
        <section className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6">Bảng Giá Sửa Tận Nơi</h2>
              <p className="text-xl text-slate-500 font-bold">Kiểm tra tận nơi & Báo giá chính xác – Phụ phí di chuyển linh hoạt theo khu vực & thời gian.</p>
            </div>

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
                    { name: "Cài đặt Windows 10/11 + Full Driver & Office", price: "200.000đ - 250.000đ" },
                    { name: "Cài đặt Microsoft Office (2016 - 2024)", price: "130.000đ" },
                    { name: "Cài đặt phần mềm Adobe (Photoshop, AI, Premiere...)", price: "Từ 120.000đ / App (Giảm 10% từ app thứ 3)" },
                    { name: "Cài phần mềm kỹ thuật (AutoCAD, 3DMax...)", price: "Từ 150.000đ / App" },
                    { name: "Vệ sinh Máy tính / Laptop (Keo MX4)", price: "Từ 200.000đ" },
                    { name: "Sửa lỗi phần mềm / Cài Driver", price: "Từ 100.000đ" },
                    { name: "Nâng cấp / Thay SSD (120GB - 1TB)", price: "Từ 550.000đ" },
                    { name: "Nâng cấp / Thay RAM (4GB - 16GB)", price: "Liên hệ" },
                    { name: "Khắc phục lỗi mạng / Wifi tại nhà", price: "Liên hệ" }
                  ].map((item, idx) => (
                    <tr key={idx} className="hover:bg-blue-50/50 transition-colors group">
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

        {/* 6. Section Khu Vực (Ăn SEO Local) */}
        <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500 rounded-full blur-[150px]"></div>
          </div>
          <div className="relative max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-black mb-12">Hỗ Trợ Sửa Máy Tính Tận Nơi Tại</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap justify-center gap-3 md:gap-4">
              {["Quận 1", "Quận 3", "Quận 4", "Quận 5", "Quận 6", "Quận 7", "Quận 8", "Quận 10", "Quận 11", "Quận 12", "Bình Thạnh", "Gò Vấp", "Phú Nhuận", "Tân Bình", "Tân Phú", "Bình Tân", "Thủ Đức", "Hóc Môn", "Bình Chánh", "Củ Chi", "Nhà Bè"].map((area, i) => (
                <div key={i} className="px-4 md:px-8 py-3 md:py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl font-black text-base md:text-xl text-cyan-400 hover:scale-105 hover:bg-white/20 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] transition-all duration-300 cursor-default flex items-center justify-center text-center">
                  {area}
                </div>
              ))}
            </div>
            <p className="mt-12 text-slate-400 text-xl font-medium max-w-3xl mx-auto">
              Có mặt nhanh chóng sau 30-45 phút tại tất cả các khu vực thuộc TP. Hồ Chí Minh. Kỹ thuật viên túc trực để hỗ trợ bạn nhanh nhất.
            </p>
          </div>
        </section>

        {/* 7. FAQ Section */}
        <section className="py-32 bg-white border-y border-slate-100">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-4xl md:text-6xl font-black text-center mb-16 text-slate-900">Câu Hỏi Thường Gặp</h2>
            <FAQAccordion
              items={[
                { q: "Bao lâu thì kỹ thuật viên có mặt tại nhà?", a: "Thông thường từ 30 - 45 phút tùy vào khoảng cách và tình trạng giao thông. Kỹ thuật viên sẽ chủ động sắp xếp lộ trình và di chuyển ngay để hỗ trợ bạn sớm nhất có thể." },
                { q: "Có hỗ trợ cài phần mềm chuyên ngành (Đồ họa, Kỹ thuật...) không?", a: "CÓ. Mình hỗ trợ cài đặt đầy đủ từ các ứng dụng văn phòng đến các bộ phần mềm chuyên sâu như Adobe, AutoCAD, 3dsMax... đảm bảo máy chạy ổn định và tối ưu hiệu suất." },
                { q: "Linh kiện thay thế có phải là hàng chính hãng không?", a: "Linh kiện (SSD, RAM...) được mình tuyển chọn kỹ lưỡng, đảm bảo độ bền và tính tương thích cao. Tất cả đều đi kèm chế độ bảo hành dài hạn và bên mình luôn sẵn sàng hỗ trợ xử lý nhanh nhất nếu có bất kỳ sự cố nào phát sinh trong thời gian bảo hành." },
                { q: "Sửa tận nơi có được bảo hành không?", a: "CÓ. Các hạng mục phần cứng và linh kiện đều được bảo hành rõ ràng qua hóa đơn (từ 1 - 36 tháng). Riêng với cài đặt Windows và phần mềm, bên mình luôn hỗ trợ kỹ thuật để đảm bảo máy bạn hoạt động ổn định nhất." },
                { q: "Tôi có phải trả thêm phí di chuyển không?", a: "Tùy khu vực. Phí dịch vụ tận nhà sẽ có phụ thu xăng xe linh hoạt dựa trên khoảng cách và khung giờ, mình sẽ báo trước rõ ràng để bạn yên tâm." }
              ]}
            />
          </div>
        </section>

        {/* 8. CTA Final */}
        <section className="py-24 px-4 bg-white">
          <div className="max-w-5xl mx-auto bg-gradient-to-br from-cyan-600 to-blue-700 rounded-[50px] p-12 md:p-20 text-center text-white shadow-2xl">
            <h2 className="text-4xl md:text-6xl font-black mb-8">Liên Hệ Ngay!</h2>
            <p className="text-xl opacity-90 mb-12 font-bold">
              Dịch vụ sửa máy tính tại nhà chuyên nghiệp. Có mặt sau 30 - 45 phút.<br />
              Giải cứu máy tính của bạn ngay tại nhà. Không cần mang máy đi xa, không cần chờ đợi lâu!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:0877023032" className="inline-block bg-white text-blue-700 px-12 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-transform shadow-xl">
                LIÊN HỆ NGAY
              </a>
              <a href="https://zalo.me/0877023032" target="_blank" className="inline-block bg-transparent text-white border-2 border-white/30 px-12 py-5 rounded-2xl font-black text-xl hover:bg-white/10 transition-all">
                HỖ TRỢ TRỰC TUYẾN
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
