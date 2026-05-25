import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const servicesInfo: Record<string, any> = {
  'sua-may-tinh-online': {
    template: 'online',
    price: 'Từ 100.000đ',
    contentJson: {
      metaTitle: 'Sửa Máy Tính Online | Hỗ Trợ Từ Xa Chuyên Nghiệp Bằng UltraViewer',
      metaDesc: 'Dịch vụ sửa máy tính online từ xa. Xử lý phần mềm, diệt virus, cài đặt máy in nhanh chóng qua Ultraviewer/Teamviewer.',
      benefits: [
        'Hỗ trợ ngay lập tức, không cần mang máy ra tiệm.',
        'Bảo mật dữ liệu tuyệt đối qua phần mềm điều khiển từ xa.',
        'Khắc phục hầu hết các lỗi phần mềm, máy in, mạng.',
      ],
      process: [
        { step: '01', text: 'YÊU CẦU: Bạn liên hệ và mô tả lỗi đang gặp phải qua Zalo/Hotline.' },
        { step: '02', text: 'KẾT NỐI: Cung cấp ID và Pass UltraViewer/TeamViewer cho kỹ thuật viên.' },
        { step: '03', text: 'XỬ LÝ: Kỹ thuật viên tiến hành kiểm tra và khắc phục lỗi trực tiếp.' },
        { step: '04', text: 'THANH TOÁN: Khách hàng kiểm tra lại máy và thanh toán chuyển khoản.' },
      ],
      details: [
        'Cài đặt ứng dụng văn phòng, thiết kế đồ họa.',
        'Sửa lỗi Windows, phần mềm bị crash, giật lag.',
        'Diệt virus, tối ưu hóa hệ thống máy tính.',
        'Cài đặt driver máy in, máy scan, kết nối mạng LAN.',
      ],
    }
  },
  'sua-may-tinh-tan-noi': {
    template: 'onsite',
    price: 'Từ 150.000đ',
    contentJson: {
      metaTitle: 'Sửa Máy Tính Tận Nơi | Dịch Vụ Sửa Máy Tính Tại Nhà Uy Tín',
      metaDesc: 'Dịch vụ sửa máy tính tận nơi chuyên nghiệp. Kỹ thuật viên tay nghề cao đến tận nhà/văn phòng kiểm tra và khắc phục mọi sự cố.',
      benefits: [
        'Tiết kiệm thời gian, công sức di chuyển.',
        'Kỹ thuật viên chuyên nghiệp, báo giá rõ ràng trước khi làm.',
        'Linh kiện thay thế chính hãng, bảo hành tận nơi chu đáo.',
      ],
      process: [
        { step: '01', text: 'LIÊN HỆ: Bạn gọi Hotline hoặc nhắn Zalo mô tả tình trạng máy.' },
        { step: '02', text: 'DI CHUYỂN: Kỹ thuật viên di chuyển và có mặt sau 30-45 phút.' },
        { step: '03', text: 'KIỂM TRA: Tiến hành kiểm tra, chẩn đoán lỗi & báo giá minh bạch.' },
        { step: '04', text: 'SỬA CHỮA: Thực hiện xử lý lỗi khi khách hàng đã đồng ý giá.' },
        { step: '05', text: 'BÀN GIAO: Khách hàng nghiệm thu, dán tem bảo hành & thanh toán.' }
      ],
      details: [
        'Xử lý lỗi máy tính không lên nguồn, sập nguồn.',
        'Nâng cấp RAM, SSD, thay thế linh kiện phần cứng.',
        'Khắc phục lỗi mạng không vào được, mất kết nối.',
        'Lắp ráp PC cấu hình theo yêu cầu, thi công mạng LAN.',
      ],
    }
  },
  'cai-dat-phan-mem': {
    template: 'software',
    price: 'Từ 50.000đ',
    contentJson: {
      metaTitle: 'Cài Đặt Phần Mềm Máy Tính | Windows, Office, Adobe, AutoCAD',
      metaDesc: 'Nhận cài đặt phần mềm máy tính theo yêu cầu: Windows, Office, Adobe CC, AutoCAD, SketchUp. Hỗ trợ cài đặt từ xa qua mạng.',
      benefits: [
        'Cài đặt đầy đủ các phiên bản theo yêu cầu của khách hàng.',
        'Phần mềm sạch, không chứa virus hay mã độc.',
        'Bảo hành lỗi phần mềm, hỗ trợ kích hoạt lại nếu lỗi.',
      ],
      process: [
        { step: '01', text: 'YÊU CẦU: Bạn gửi tên phần mềm cần cài qua Zalo.' },
        { step: '02', text: 'CHUẨN BỊ: Bạn tải UltraViewer và gửi ID/Pass cho kỹ thuật.' },
        { step: '03', text: 'CÀI ĐẶT: Kỹ thuật viên tiến hành cài đặt và tinh chỉnh từ xa.' },
        { step: '04', text: 'THANH TOÁN: Kiểm tra máy hoạt động tốt mới thanh toán.' },
      ],
      details: [
        'Trọn bộ Adobe CC: Photoshop, AI, Premiere...',
        'Phần mềm thiết kế: AutoCAD, SketchUp, Revit.',
        'Phần mềm văn phòng: Office, PDF, Font.',
      ],
    }
  },
  've-sinh-may-tinh': {
    template: 'cleaning',
    price: 'Từ 200.000đ',
    contentJson: {
      metaTitle: 'Vệ Sinh Laptop Tại Nhà | Vệ Sinh Máy Tính PC Chuyên Nghiệp Tận Nơi',
      metaDesc: 'Dịch vụ vệ sinh laptop, PC tận nơi uy tín. Sử dụng keo tản nhiệt chính hãng, giúp máy giảm nhiệt độ tức thì.',
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
    }
  },
};

async function main() {
  for (const [slug, data] of Object.entries(servicesInfo)) {
    await prisma.service.updateMany({
      where: { slug },
      data: {
        template: data.template,
        price: data.price,
        contentJson: data.contentJson
      }
    });
  }
  console.log('Đã cập nhật dữ liệu JSON và giá cho các dịch vụ thành công!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
