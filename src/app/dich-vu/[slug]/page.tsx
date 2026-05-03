import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import CleaningService from '@/components/services/CleaningService';
import SoftwareService from '@/components/services/SoftwareService';
import OnlineService from '@/components/services/OnlineService';
import OnsiteService from '@/components/services/OnsiteService';

interface ServiceData {
  title: string;
  description: string;
  metaTitle: string;
  metaDesc: string;
  benefits: string[];
  process: { step: string; text: string }[];
  details: string[];
  icon: string;
  color: string;
}

const servicesInfo: Record<string, ServiceData> = {
  'sua-may-tinh-online': {
    title: 'Sửa Máy Tính Online Chuyên Nghiệp – Xử Lý Xong Sau 15 Phút',
    metaTitle: 'Sửa Máy Tính Online | Cài Win, Fix Lỗi Từ Xa Sau 15 Phút',
    metaDesc: 'Dịch vụ sửa máy tính online qua UltraViewer/AnyDesk chuyên nghiệp. Fix lỗi Windows, phần mềm, virus nhanh chóng, an toàn tuyệt đối.',
    description: 'Đội ngũ kỹ thuật viên trình độ cao hỗ trợ trực tiếp qua UltraViewer/AnyDesk. Tiết kiệm thời gian, an toàn tuyệt đối, bảo mật dữ liệu.',
    icon: 'monitor',
    color: 'cyan',
    benefits: [
      'Hỗ trợ thần tốc chỉ sau 5 phút kết nối.',
      'Bạn trực tiếp giám sát mọi thao tác trên màn hình.',
      'Không mất dữ liệu, bảo mật thông tin cá nhân tuyệt đối.',
      'Giá rẻ hơn 50% so với mang máy ra trung tâm.',
    ],
    process: [
      { step: '01', text: 'Kết nối: Bạn nhắn tin mô tả tình trạng và gửi ID/Pass UltraViewer hoặc Anydesk qua Zalo.' },
      { step: '02', text: 'Kiểm tra: Kỹ thuật viên truy cập và xác định nguyên nhân lỗi trực tiếp trên màn hình.' },
      { step: '03', text: 'Báo giá: Báo giá rõ ràng theo khung niêm yết. Sau khi bạn đồng ý, chúng tôi sẽ xử lý nhanh.' },
      { step: '04', text: 'Nghiệm thu: Bạn kiểm tra lại máy, hài lòng hoàn toàn mới tiến hành thanh toán.' },
    ],
    details: [
      'Cài đặt Windows 10, 11 Pro từ xa.',
      'Khắc phục lỗi máy tính bị treo, lag, màn hình xanh.',
      'Diệt virus, mã độc, tối ưu hóa máy tính.',
      'Cài đặt trọn bộ Office, font, PDF.',
    ],
  },
  'sua-may-tinh-tan-noi': {
    title: 'Sửa Máy Tính Tận Nơi - Chuyên Nghiệp, Có Mặt Sau 30 Phút',
    metaTitle: 'Sửa Máy Tính Tại Nhà | Sửa Laptop Tận Nơi Uy Tín Tại TP.HCM',
    metaDesc: 'Dịch vụ sửa máy tính, laptop tận nơi uy tín tại TP.HCM. Cài Win tại nhà, sửa lỗi phần cứng, thay thế linh kiện chính hãng.',
    description: 'FastFix cung cấp dịch vụ sửa chữa máy tính tận nhà, văn phòng chuyên nghiệp. Kỹ thuật viên tay nghề cao sẽ giúp bạn xử lý triệt để mọi lỗi.',
    icon: 'home',
    color: 'blue',
    benefits: [
      'Phục vụ nhanh chóng tại tất cả các quận huyện TP.HCM.',
      'Kiểm tra và báo giá rõ ràng trước khi tiến hành sửa chữa.',
      'Linh kiện chính hãng, cam kết bảo hành uy tín.',
    ],
    process: [
      { step: '01', text: 'Liên hệ: Nhận yêu cầu và địa chỉ qua Hotline 0877.023.032.' },
      { step: '02', text: 'Di chuyển: Kỹ thuật viên di chuyển và có mặt sau 30-45 phút.' },
      { step: '03', text: 'Tư vấn: Kiểm tra tổng thể máy, tư vấn giải pháp tối ưu và báo giá.' },
      { step: '04', text: 'Hoàn tất: Sửa chữa, dán tem bảo hành và bàn giao máy.' },
    ],
    details: [
      'Cài đặt Windows 7, 10, 11 tại nhà.',
      'Sửa chữa phần cứng PC & Laptop.',
      'Thay thế linh kiện: RAM, SSD, bàn phím...',
      'Xử lý sự cố mạng, wifi.',
    ],
  },
  'cai-dat-phan-mem': {
    title: 'CÀI ĐẶT PHẦN MỀM ONLINE TỪ XA – XỬ LÝ NGAY TRONG 15-30 PHÚT',
    metaTitle: 'Cài Đặt Phần Mềm Máy Tính Online | Fix Lỗi Adobe, Office Lấy Liền',
    metaDesc: 'Dịch vụ cài đặt phần mềm máy tính từ xa qua UltraViewer/AnyDesk. Cài Adobe, AutoCAD, Office nhanh chóng, an toàn.',
    description: 'Đội ngũ kỹ thuật viên chuyên nghiệp tại FastFix hỗ trợ cài đặt và xử lý từ xa qua UltraViewer/AnyDesk – Nhanh chóng và Bảo mật.',
    icon: 'upload',
    color: 'cyan',
    benefits: [
      'Không truy cập file riêng tư của khách hàng.',
      'Nguồn phần mềm sạch, không virus.',
      'Bảo hành cài đặt trong 30 ngày.',
    ],
    process: [
      { step: '01', text: 'Yêu cầu: Bạn liên hệ và gửi tên phần mềm cần cài qua Zalo.' },
      { step: '02', text: 'Chuẩn bị: Bạn tải UltraViewer và gửi ID/Pass cho kỹ thuật.' },
      { step: '03', text: 'Cài đặt: Kỹ thuật viên tiến hành cài đặt và tinh chỉnh từ xa.' },
      { step: '04', text: 'Thanh toán: Kiểm tra máy hoạt động tốt mới thanh toán.' },
    ],
    details: [
      'Trọn bộ Adobe CC: Photoshop, AI, Premiere...',
      'Phần mềm thiết kế: AutoCAD, SketchUp, Revit.',
      'Phần mềm văn phòng: Office, PDF, Font.',
    ],
  },
  've-sinh-may-tinh': {
    title: 'VỆ SINH LAPTOP & PC TẬN NƠI – GIẢM NGAY 5-10°C – MÁY MÁT NHƯ MỚI',
    metaTitle: 'Vệ Sinh Laptop Tại Nhà | Vệ Sinh Máy Tính PC Chuyên Nghiệp Tận Nơi',
    metaDesc: 'Dịch vụ vệ sinh laptop, PC tận nơi uy tín. Sử dụng keo tản nhiệt chính hãng, giúp máy giảm nhiệt độ tức thì.',
    description: 'Máy nóng ran, quạt kêu to, hay sập nguồn đột ngột? Xử lý ngay tại nhà với keo tản nhiệt chính hãng. Giúp máy bạn hoạt động mát mẻ.',
    icon: 'sparkles',
    color: 'blue',
    benefits: [
      'Giảm ngay 10 - 15 độ C cho CPU và GPU.',
      'Sử dụng keo tản nhiệt chính hãng chất lượng cao.',
      'Làm sạch bụi bẩn, tra mỡ quạt êm ái.',
    ],
    process: [
      { step: '01', text: 'Kiểm tra: Kiểm tra nhiệt độ và tình trạng quạt của máy.' },
      { step: '02', text: 'Vệ sinh & Tra keo: Làm sạch bụi bẩn linh kiện và tra keo tản nhiệt mới.' },
      { step: '03', text: 'Lắp máy: Lắp lại máy và kiểm tra nhiệt độ sau khi vệ sinh.' },
      { step: '04', text: 'Bàn giao: Khách hàng kiểm tra máy, nghiệm thu và thanh toán.' },
    ],
    details: [
      'Vệ sinh Laptop văn phòng, Gaming.',
      'Vệ sinh PC, máy trạm chuyên nghiệp.',
      'Thay keo tản nhiệt chính hãng.',
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
          <p className='text-slate-500 font-bold mb-8'>Dịch vụ này không tồn tại.</p>
          <Link href='/' className='bg-slate-900 text-white px-8 py-3 rounded-xl font-bold'>Quay lại trang chủ</Link>
        </div>
      </div>
    );
  }

  // Use specialized components for key services
  if (slug === 've-sinh-may-tinh') return <CleaningService service={service} />;
  if (slug === 'cai-dat-phan-mem') return <SoftwareService service={service} />;
  if (slug === 'sua-may-tinh-online') return <OnlineService service={service} />;
  if (slug === 'sua-may-tinh-tan-noi') return <OnsiteService service={service} />;

  // Default fallback layout
  return (
    <div className='bg-white min-h-screen pt-24'>
      <div className='max-w-7xl mx-auto px-4 py-20 text-center'>
        <h1 className='text-5xl font-black mb-8'>{service.title}</h1>
        <p className='text-xl text-slate-600 max-w-3xl mx-auto'>{service.description}</p>
        <div className='mt-12'>
          <a href='https://zalo.me/0877023032' className='bg-cyan-600 text-white px-10 py-5 rounded-2xl font-black text-xl'>Liên hệ tư vấn</a>
        </div>
      </div>
    </div>
  );
}
