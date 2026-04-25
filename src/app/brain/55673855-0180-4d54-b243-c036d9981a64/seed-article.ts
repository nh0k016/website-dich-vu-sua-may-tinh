import { PrismaClient } from '@prisma/client';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function main() {
  console.log('--- ĐANG TRIỂN KHAI BÀI VIẾT LÊN WEBSITE ---');

  // 1. Upload ảnh lên Supabase
  const imagePath = 'C:\\Users\\Vinh\\.gemini\\antigravity\\brain\\55673855-0180-4d54-b243-c036d9981a64\\blog_cover_sua_may_tinh_uy_tin_1777064116508.png';
  const fileBuffer = fs.readFileSync(imagePath);
  const fileName = `blog-cover-${Date.now()}.png`;

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('products')
    .upload(fileName, fileBuffer, {
      contentType: 'image/png'
    });

  if (uploadError) {
    console.error('Lỗi upload ảnh:', uploadError);
    return;
  }

  const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/products/${fileName}`;
  console.log('1. Đã upload ảnh thành công:', imageUrl);

  // 2. Chèn bài viết vào Database
  const articleContent = `
<div class="prose prose-slate max-w-none">
    <p style="font-size: 18px; color: #64748b; line-height: 1.8; margin-bottom: 30px;">
        Máy tính của bạn đột nhiên "dở chứng" ngay lúc công việc đang ngập đầu? Bạn lo lắng không biết nơi nào <strong>sửa máy tính uy tín</strong>, giá cả minh bạch và bảo mật dữ liệu? Đừng lo, FastFix sẽ giúp bạn gỡ rối với 5 kinh nghiệm quý báu dưới đây.
    </p>

    <div style="background: #f8fafc; padding: 30px; border-radius: 24px; border-left: 6px solid #06b6d4; margin-bottom: 40px;">
        <h2 style="color: #0f172a; font-size: 24px; font-weight: 800; margin-bottom: 15px;">🛡️ 1. Quy trình minh bạch - Quan sát trực tiếp</h2>
        <p>Một đơn vị uy tín sẽ không bao giờ "giấu" máy của bạn vào phòng kín. Tại FastFix, chúng tôi khuyến khích khách hàng quan sát trực tiếp hoặc ký tên lên linh kiện. Điều này đảm bảo tính minh bạch 100%.</p>
    </div>

    <div style="background: #f8fafc; padding: 30px; border-radius: 24px; border-left: 6px solid #f97316; margin-bottom: 40px;">
        <h2 style="color: #0f172a; font-size: 24px; font-weight: 800; margin-bottom: 15px;">💰 2. Báo giá trọn gói - Không phí ẩn</h2>
        <p>Hãy tránh xa những nơi "vẽ bệnh" để thu thêm tiền. Một địa chỉ <strong>sửa máy tính uy tín</strong> luôn kiểm tra kỹ lưỡng và báo giá chính xác trước khi thực hiện. Nếu không sửa được, tuyệt đối không thu phí!</p>
    </div>

    <div style="background: #f8fafc; padding: 30px; border-radius: 24px; border-left: 6px solid #10b981; margin-bottom: 40px;">
        <h2 style="color: #0f172a; font-size: 24px; font-weight: 800; margin-bottom: 15px;">✅ 3. Bảo hành "1 đổi 1" dài hạn</h2>
        <p>Dịch vụ tốt phải đi kèm hậu mãi tốt. FastFix tự hào mang đến chế độ bảo hành từ 6-36 tháng cho linh kiện thay thế. Lỗi là đổi mới ngay, không chờ đợi lâu.</p>
    </div>
    
    <div style="background: #f8fafc; padding: 30px; border-radius: 24px; border-left: 6px solid #6366f1; margin-bottom: 40px;">
        <h2 style="color: #0f172a; font-size: 24px; font-weight: 800; margin-bottom: 15px;">👨‍🔧 4. Đội ngũ kỹ thuật chuyên môn cao</h2>
        <p>Không chỉ giỏi về phần cứng, kỹ thuật viên tại những nơi <strong>sửa máy tính uy tín</strong> còn am hiểu sâu về phần mềm, giúp tối ưu hóa máy tính của bạn chạy mượt mà nhất.</p>
    </div>

    <div style="background: #f8fafc; padding: 30px; border-radius: 24px; border-left: 6px solid #ec4899; margin-bottom: 40px;">
        <h2 style="color: #0f172a; font-size: 24px; font-weight: 800; margin-bottom: 15px;">⭐ 5. Đánh giá tích cực từ cộng đồng</h2>
        <p>Hãy tin vào những khách hàng đã trải nghiệm trước đó. Những đánh giá 5 sao chính là minh chứng sống động nhất cho uy tín của một trung tâm sửa chữa.</p>
    </div>

    <div style="background: #0f172a; color: white; padding: 40px; border-radius: 30px; text-align: center; margin: 50px 0; border: 4px solid #06b6d4;">
        <h3 style="color: #06b6d4; font-size: 28px; font-weight: 900; margin-bottom: 15px;">BẠN CẦN SỬA MÁY TÍNH NGAY?</h3>
        <p style="font-size: 18px; opacity: 0.9; margin-bottom: 25px;">Đừng để sự cố làm gián đoạn công việc của bạn. Hãy liên hệ FastFix để được hỗ trợ tận tâm nhất!</p>
        <a href="https://zalo.me/0877023032" style="display: inline-block; background: #06b6d4; color: #0f172a; padding: 15px 40px; border-radius: 15px; font-weight: 900; text-decoration: none; font-size: 18px;">CHAT ZALO NGAY</a>
    </div>

    <p style="font-style: italic; color: #94a3b8; text-align: center;">
        * Bài viết được thực hiện bởi đội ngũ chuyên gia FastFix - Hệ thống sửa chữa máy tính hàng đầu.
    </p>
</div>
  `;

  const article = await prisma.article.create({
    data: {
      title: 'Mách Bạn 5 Tiêu Chí Lựa Chọn Địa Chỉ Sửa Máy Tính Uy Tín Tại TP.HCM',
      slug: 'sua-may-tinh-uy-tin-tai-tphcm-' + Date.now(),
      description: 'Khám phá bí quyết chọn nơi sửa máy tính uy tín, tránh luộc đồ và báo giá ảo. FastFix chia sẻ kinh nghiệm giúp bạn yên tâm sửa chữa laptop, PC.',
      content: articleContent,
      image: imageUrl,
      published: true
    }
  });

  console.log('2. Đã lưu bài viết vào Database thành công!');
  console.log('--- HOÀN TẤT TRIỂN KHAI ---');
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
