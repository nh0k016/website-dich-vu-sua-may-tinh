import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

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
    title: 'Sửa Máy Tính Online - Giải Pháp Nhanh Chóng Từ Xa',
    metaTitle: 'Sửa Máy Tính Online | Cài Win, Phần Mềm Từ Xa Uy Tín',
    metaDesc: 'Dịch vụ sửa máy tính online qua UltraView/AnyDesk chuyên nghiệp. Cài đặt Win, phần mềm, fix lỗi hệ thống nhanh chóng, giá rẻ, cam kết bảo mật 100%.',
    description: 'Bạn đang bận rộn hoặc ở xa? Không cần mang máy đi đâu cả! Với công nghệ điều khiển từ xa, chúng tôi sẽ xử lý mọi vấn đề phần mềm ngay trên màn hình máy tính của bạn.',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
    ),
    benefits: [
      'Tiết kiệm thời gian & chi phí đi lại.',
      'An toàn tuyệt đối - Bạn quan sát trực tiếp mọi thao tác.',
      'Hỗ trợ ngay lập tức chỉ sau 5-10 phút kết nối.',
      'Giá dịch vụ cực rẻ, minh bạch.',
    ],
    process: [
      { step: '01', text: 'Kết nối qua Zalo/Hotline để mô tả lỗi.' },
      { step: '02', text: 'Mở UltraView/AnyDesk và gửi ID/Pass.' },
      { step: '03', text: 'Kỹ thuật viên thực hiện xử lý lỗi.' },
      { step: '04', text: 'Kiểm tra lại máy và thanh toán sau khi xong.' },
    ],
    details: [
      'Cài đặt Windows 10/11 Pro bản quyền không mất dữ liệu.',
      'Cài đặt bộ Microsoft Office 2016-2021, 365.',
      'Fix lỗi máy tính chạy chậm, treo máy, lỗi xanh màn hình.',
      'Diệt virus, dọn dẹp file rác giúp tăng tốc hệ thống.',
      'Hỗ trợ cài đặt phần mềm chuyên ngành (Đồ họa, Kế toán...).'
    ]
  },
  'sua-may-tinh-tan-noi': {
    title: 'Sửa Máy Tính Tận Nơi - Chuyên Nghiệp & Tin Cậy',
    metaTitle: 'Sửa Máy Tính Tại Nhà | Sửa Máy Tính Tận Nơi Uy Tín Giá Rẻ',
    metaDesc: 'Dịch vụ sửa máy tính tận nhà tại TP.HCM. Thay thế linh kiện, sửa lỗi phần cứng, phần mềm chuyên nghiệp. Có mặt sau 30 phút, bảo hành dài hạn.',
    description: 'Đội ngũ kỹ thuật viên giàu kinh nghiệm của FastFix sẽ có mặt tận nơi để khắc phục mọi sự cố máy tính của bạn một cách nhanh chóng nhất.',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
    ),
    benefits: [
      'Phục vụ tận nhà, văn phòng chỉ sau 30 phút.',
      'Linh kiện chính hãng, bảo hành từ 6-36 tháng.',
      'Kiểm tra báo giá trước khi thực hiện.',
      'Không hài lòng không thu tiền.',
    ],
    process: [
      { step: '01', text: 'Tiếp nhận thông tin và địa chỉ khách hàng.' },
      { step: '02', text: 'Kỹ thuật viên tới kiểm tra tình trạng máy.' },
      { step: '03', text: 'Báo lỗi và giá chi tiết cho khách hàng.' },
      { step: '04', text: 'Tiến hành sửa chữa và bàn giao, viết phiếu bảo hành.' },
    ],
    details: [
      'Cứu dữ liệu ổ cứng bị xóa nhầm, format.',
      'Thay thế RAM, SSD, Màn hình, Bàn phím laptop.',
      'Sửa lỗi Mainboard, nguồn máy tính không lên.',
      'Xử lý lỗi mạng LAN, Wifi nội bộ văn phòng.',
      'Nâng cấp cấu hình máy tính theo nhu cầu.'
    ]
  },
  'cai-dat-phan-mem': {
    title: 'Cài Đặt Phần Mềm Chuyên Nghiệp Theo Yêu Cầu',
    metaTitle: 'Cài Đặt Phần Mềm Máy Tính | Photoshop, AutoCad, Office Bản Quyền',
    metaDesc: 'Nhận cài đặt tất cả phần mềm máy tính: Adobe, Office, AutoCAD, Corel... Hỗ trợ cài online hoặc tận nơi. Phần mềm ổn định, không lỗi.',
    description: 'Chúng tôi hỗ trợ cài đặt mọi loại phần mềm từ cơ bản đến nâng cao, đảm bảo hoạt động ổn định và tối ưu nhất cho hiệu suất công việc của bạn.',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
    ),
    benefits: [
      'Cài đặt đúng phiên bản phù hợp với cấu hình máy.',
      'Hỗ trợ kích hoạt bản quyền ổn định, lâu dài.',
      'Tặng kèm dọn dẹp rác hệ thống miễn phí.',
      'Hỗ trợ cài lại miễn phí nếu phát sinh lỗi trong 7 ngày.',
    ],
    process: [
      { step: '01', text: 'Gửi danh sách phần mềm cần cài đặt.' },
      { step: '02', text: 'Kỹ thuật viên báo giá trọn gói.' },
      { step: '03', text: 'Tiến hành cài đặt qua mạng hoặc tận nơi.' },
      { step: '04', text: 'Hướng dẫn sử dụng cơ bản và bàn giao.' },
    ],
    details: [
      'Trọn bộ Adobe: Photoshop, Illustrator, Premiere, After Effects...',
      'Phần mềm kỹ thuật: AutoCAD, SketchUp, 3ds Max, Revit.',
      'Bộ Office văn phòng: 2010, 2016, 2019, 2021, Office 365.',
      'Phần mềm kế toán, từ điển, gõ tiếng Việt.',
      'Phần mềm diệt virus chính hãng bảo mật dữ liệu.'
    ]
  },
  've-sinh-may-tinh': {
    title: 'Vệ Sinh Máy Tính & Laptop - Tăng Tốc, Giảm Nhiệt',
    metaTitle: 'Vệ Sinh Laptop Tại Nhà | Vệ Sinh Máy Tính Bàn Chuyên Nghiệp',
    metaDesc: 'Dịch vụ vệ sinh laptop, PC tận nơi chuyên nghiệp. Thay keo tản nhiệt cao cấp MX4, làm sạch bụi bẩn, giúp máy chạy mát và bền hơn.',
    description: 'Máy tính của bạn đang bị nóng, quạt kêu to hay hay bị sập nguồn đột ngột? Đó là dấu hiệu cần phải vệ sinh và thay keo tản nhiệt ngay lập tức.',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
    ),
    benefits: [
      'Giảm ngay 10-20 độ C sau khi vệ sinh.',
      'Sử dụng keo tản nhiệt MX4 hoặc Thermal Grizzly cao cấp.',
      'Tăng tuổi thọ cho CPU và Chipset VGA.',
      'Tránh rủi ro cháy nổ linh kiện do quá nhiệt.',
    ],
    process: [
      { step: '01', text: 'Kiểm tra nhiệt độ và tình trạng máy trước khi tháo.' },
      { step: '02', text: 'Tháo linh kiện, hút bụi và làm sạch quạt, tản nhiệt.' },
      { step: '03', text: 'Lau sạch keo cũ, tra keo tản nhiệt mới chất lượng.' },
      { step: '04', text: 'Lắp lại máy và kiểm tra lại nhiệt độ vận hành.' },
    ],
    details: [
      'Vệ sinh toàn bộ hệ thống quạt và khe thoát nhiệt.',
      'Làm sạch mainboard bằng dung dịch chuyên dụng.',
      'Tra mỡ bôi trơn cho trục quạt giúp máy chạy êm.',
      'Làm sạch bàn phím, vỏ máy và màn hình.',
      'Kiểm tra sức khỏe ổ cứng (HDD/SSD) miễn phí.'
    ]
  }
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const resolvedParams = await params;
  const service = servicesInfo[resolvedParams.slug];
  
  if (!service) return { title: 'Dịch vụ không tồn tại - FastFix' };

  return {
    title: service.metaTitle,
    description: service.metaDesc,
    keywords: service.title.toLowerCase().split(' ').join(', '),
    openGraph: {
      title: service.metaTitle,
      description: service.metaDesc,
      type: 'article',
    }
  };
}

export default async function ServiceDetail({ params }: { params: { slug: string } }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const service = servicesInfo[slug];

  if (!service) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black text-slate-300 mb-4">404</h1>
          <p className="text-slate-500 font-bold mb-8">Dịch vụ này không tồn tại hoặc đã bị gỡ bỏ.</p>
          <Link href="/" className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold">Quay lại trang chủ</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-slate-900 pt-24 pb-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-500 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500 rounded-full blur-[120px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-cyan-400 text-sm font-black uppercase tracking-widest mb-8">
              Dịch vụ chuyên nghiệp
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-8 leading-[1.1]">
              {service.title}
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed mb-10">
              {service.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="https://zalo.me/0877023032" target="_blank" className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-10 py-5 rounded-2xl font-black text-lg shadow-xl shadow-orange-500/20 hover:scale-105 transition-transform">
                Đặt lịch hỗ trợ ngay
              </a>
              <div className="flex items-center gap-3 px-6 text-white font-bold">
                <span className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                </span>
                Có mặt sau 30 phút
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Left Column: Details */}
            <div className="lg:col-span-7 space-y-16">
              
              {/* Service List */}
              <div className="bg-slate-50 p-10 md:p-14 rounded-[3rem] border border-slate-100">
                <h2 className="text-3xl font-black text-slate-900 mb-10 flex items-center gap-4">
                  <span className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                  </span>
                  Các hạng mục hỗ trợ
                </h2>
                <ul className="space-y-6">
                  {service.details.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-5">
                      <div className="w-8 h-8 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center shrink-0 mt-1">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <span className="text-xl text-slate-700 font-medium leading-tight">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Process Section */}
              <div>
                <h2 className="text-3xl font-black text-slate-900 mb-12">Quy trình chuyên nghiệp tại FastFix</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {service.process.map((p, idx) => (
                    <div key={idx} className="flex gap-6 items-start p-6 rounded-2xl hover:bg-slate-50 transition-colors group">
                      <span className="text-4xl font-black text-slate-200 group-hover:text-cyan-500 transition-colors leading-none">{p.step}</span>
                      <p className="text-lg text-slate-600 font-bold leading-snug">{p.text}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Benefits & Sidebar */}
            <div className="lg:col-span-5 space-y-10">
              
              {/* Benefits Card */}
              <div className="bg-gradient-to-br from-cyan-600 to-blue-700 p-10 md:p-12 rounded-[3rem] text-white shadow-2xl shadow-cyan-200">
                <h3 className="text-2xl font-black mb-8 leading-tight">Tại sao nên chọn dịch vụ của FastFix?</h3>
                <div className="space-y-6">
                  {service.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <p className="text-lg font-bold opacity-90">{benefit}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-12 pt-10 border-t border-white/20">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-cyan-600 shadow-lg">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
                    </div>
                    <div>
                      <p className="text-sm opacity-60 font-bold uppercase tracking-widest">Hotline 24/7</p>
                      <p className="text-2xl font-black">0877.023.032</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Related/Sidebar Link */}
              <div className="p-10 border-2 border-dashed border-slate-200 rounded-[3rem]">
                <h4 className="text-xl font-black text-slate-900 mb-6">Bạn cần linh kiện thay thế?</h4>
                <p className="text-slate-500 font-medium mb-8">Chúng tôi cung cấp RAM, SSD, Key bản quyền chính hãng với giá ưu đãi cho khách hàng sử dụng dịch vụ.</p>
                <Link href="/san-pham" className="text-cyan-600 font-black hover:underline flex items-center gap-2 text-lg">
                  Xem ngay cửa hàng
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
