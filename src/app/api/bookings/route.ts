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
