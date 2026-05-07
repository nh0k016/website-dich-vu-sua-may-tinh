import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, serviceName, notes } = body;

    // Validate
    if (!name || !phone || !serviceName) {
      return NextResponse.json({ error: 'Thiếu thông tin bắt buộc (Tên, SĐT, Dịch vụ)' }, { status: 400 });
    }

    // Create Booking
    const booking = await prisma.booking.create({
      data: {
        name,
        phone,
        serviceName,
        notes: notes || '',
        status: 'pending'
      }
    });

    // Gửi thông báo Telegram nếu có cấu hình
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (token && chatId) {
      const message = `
🔔 *CÓ YÊU CẦU ĐẶT LỊCH MỚI!*
──────────────────
👤 *Khách hàng:* ${name}
📞 *Điện thoại:* ${phone}
🛠️ *Dịch vụ:* ${serviceName}
📝 *Ghi chú:* ${notes || 'Không có'}
──────────────────
🌐 [Xem trong Admin](https://www.suamaytinhfastfix.com/vinh09112000/bookings)
      `.trim();

      try {
        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: 'Markdown',
          }),
        });
      } catch (tgError) {
        console.error('Lỗi gửi Telegram:', tgError);
      }
    }

    return NextResponse.json({ success: true, booking }, { status: 201 });
  } catch (error) {
    console.error('Lỗi khi tạo yêu cầu đặt lịch:', error);
    return NextResponse.json({ error: 'Lỗi server khi tạo yêu cầu' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(bookings);
  } catch (error) {
    console.error('Lỗi khi lấy danh sách yêu cầu:', error);
    return NextResponse.json({ error: 'Lỗi server khi lấy dữ liệu' }, { status: 500 });
  }
}
