import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { url, referrer, visitorId } = body;

    if (!url || !visitorId) {
      return NextResponse.json({ error: 'Thiếu thông tin bắt buộc' }, { status: 400 });
    }

    // Lọc bỏ query parameters nếu có để gom nhóm trang chuẩn xác hơn
    const cleanUrl = url.split('?')[0];
    
    // Rút gọn referrer (chỉ lấy domain) nếu có thể, hoặc giữ nguyên
    let cleanReferrer = referrer;
    if (referrer) {
      try {
        const refUrl = new URL(referrer);
        cleanReferrer = refUrl.hostname;
      } catch (e) {
        // Nếu không phải URL hợp lệ (VD: 'direct'), giữ nguyên
      }
    } else {
      cleanReferrer = 'Direct';
    }

    await prisma.pageView.create({
      data: {
        url: cleanUrl,
        referrer: cleanReferrer,
        visitorId,
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Lỗi khi lưu dữ liệu truy cập:', error);
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
  }
}
