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
    title: 'Dịch Vụ Sửa Máy Tính Online - Hỗ Trợ Từ Xa (8:30 - 22:00)',
    metaTitle: 'Sửa Máy Tính Online | Cài Win, Fix Lỗi Từ Xa Uy Tín Toàn Quốc',
    metaDesc:
      'Dịch vụ sửa máy tính online, hỗ trợ từ xa qua UltraView/AnyDesk chuyên nghiệp. Xử lý cài Win, phần mềm, fix lỗi hệ thống, diệt virus nhanh chóng, cam kết bảo mật dữ liệu khách hàng.',
    description:
      'Máy tính gặp sự cố nhưng bạn không muốn mang ra tiệm? FastFix cung cấp giải pháp sửa máy tính online thần tốc. Chỉ cần kết nối mạng, kỹ thuật viên sẽ xử lý mọi vấn đề ngay lập tức trên màn hình của bạn.',
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
      { step: '01', text: 'Liên hệ Hotline/Zalo 0877.023.032 để mô tả tình trạng lỗi.' },
      { step: '02', text: 'Cài đặt UltraView hoặc AnyDesk và gửi ID/Pass cho kỹ thuật viên.' },
      { step: '03', text: 'Kỹ thuật viên kiểm tra, báo giá và tiến hành sửa chữa trực tiếp.' },
      { step: '04', text: 'Khách hàng kiểm tra kết quả và thanh toán qua chuyển khoản/QR.' },
    ],
    details: [
      'Cài đặt Windows 10, 11 Pro (Full Driver & Office) từ xa.',
      'Khắc phục lỗi máy tính bị treo, lag, màn hình xanh (BSOD).',
      'Diệt virus, mã độc, tối ưu hóa giúp máy chạy nhanh như mới.',
      'Cài đặt trọn bộ Office (2016 - 2024), font tiếng Việt, PDF.',
      'Sửa lỗi máy tính không vào được mạng, lỗi kết nối máy in.',
      'Hỗ trợ cứu dữ liệu bị xóa nhầm hoặc format (tùy trường hợp).',
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
    keywords: service.title.toLowerCase().split(' ').join(', '),
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
              <div className='flex items-center gap-3 px-6 text-white font-bold'>
                <span className='w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500'>
                  <svg
                    className='w-6 h-6'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                      clipRule='evenodd'
                    />
                  </svg>
                </span>
                {slug === 'sua-may-tinh-online' ? 'Hỗ trợ ngay sau 5 phút' : 'Có mặt sau 30 phút'}
              </div>
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
                  <span className='w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center'>
                    <svg
                      className='w-6 h-6'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
                      />
                    </svg>
                  </span>
                  Các hạng mục hỗ trợ
                </h2>
                <ul className='space-y-6'>
                  {service.details.map((item, idx) => (
                    <li key={idx} className='flex items-start gap-5'>
                      <div className='w-8 h-8 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center shrink-0 mt-1'>
                        <svg
                          className='w-5 h-5'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={3}
                            d='M5 13l4 4L19 7'
                          />
                        </svg>
                      </div>
                      <span className='text-xl text-slate-700 font-medium leading-tight'>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Process Section */}
              <div>
                <h2 className='text-3xl font-black text-slate-900 mb-12'>
                  Quy trình chuyên nghiệp tại FastFix
                </h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                  {service.process.map((p, idx) => (
                    <div
                      key={idx}
                      className='flex gap-6 items-start p-6 rounded-2xl hover:bg-slate-50 transition-colors group'
                    >
                      <span className='text-4xl font-black text-slate-200 group-hover:text-cyan-500 transition-colors leading-none'>
                        {p.step}
                      </span>
                      <p className='text-lg text-slate-600 font-bold leading-snug'>
                        {p.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Benefits & Sidebar */}
            <div className='lg:col-span-5 space-y-10'>
              {/* Benefits Card */}
              <div className='bg-gradient-to-br from-cyan-600 to-blue-700 p-10 md:p-12 rounded-[3rem] text-white shadow-2xl shadow-cyan-200'>
                <h3 className='text-2xl font-black mb-8 leading-tight'>
                  Tại sao nên chọn dịch vụ của FastFix?
                </h3>
                <div className='space-y-6'>
                  {service.benefits.map((benefit, idx) => (
                    <div key={idx} className='flex items-center gap-4'>
                      <div className='w-6 h-6 bg-white/20 rounded-full flex items-center justify-center'>
                        <div className='w-2 h-2 bg-white rounded-full'></div>
                      </div>
                      <p className='text-lg font-bold opacity-90'>{benefit}</p>
                    </div>
                  ))}
                </div>
                <div className='mt-12 pt-10 border-t border-white/20'>
                  <div className='flex items-center gap-4'>
                    <div className='w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-cyan-600 shadow-lg'>
                      <svg
                        className='w-6 h-6'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                      >
                        <path d='M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z' />
                      </svg>
                    </div>
                    <div>
                      <p className='text-sm opacity-60 font-bold uppercase tracking-widest'>
                        Hotline 8:30 - 22:00
                      </p>
                      <p className='text-2xl font-black'>0877.023.032</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Related/Sidebar Link */}
              <div className='p-10 border-2 border-dashed border-slate-200 rounded-[3rem]'>
                <h4 className='text-xl font-black text-slate-900 mb-6'>
                  Bạn cần linh kiện thay thế?
                </h4>
                <p className='text-slate-500 font-medium mb-8'>
                  Chúng tôi cung cấp RAM, SSD, Key bản quyền chính hãng với giá
                  ưu đãi cho khách hàng sử dụng dịch vụ.
                </p>
                <Link
                  href='/san-pham'
                  className='text-cyan-600 font-black hover:underline flex items-center gap-2 text-lg'
                >
                  Xem ngay cửa hàng
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
                      d='M17 8l4 4m0 0l-4 4m4-4H3'
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
