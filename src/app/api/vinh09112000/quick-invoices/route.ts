import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const invoices = await prisma.quickInvoice.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(invoices);
  } catch (error) {
    console.error('Lỗi khi lấy danh sách hóa đơn:', error);
    return NextResponse.json({ error: 'Lỗi server khi tải lịch sử hóa đơn' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      orderId,
      custName,
      custPhone,
      custAddress,
      payMethod,
      payStatus,
      orderNotes,
      grandTotalStr,
      dateStr,
      timeStr,
      products,
      warrantyNotes,
    } = body;

    if (!orderId) {
      return NextResponse.json({ error: 'Thiếu mã hóa đơn (orderId)' }, { status: 400 });
    }

    const invoice = await prisma.quickInvoice.upsert({
      where: { orderId },
      update: {
        custName: custName || 'Khách hàng lẻ',
        custPhone: custPhone || 'N/A',
        custAddress: custAddress || 'N/A',
        payMethod: payMethod || 'Chuyển khoản',
        payStatus: payStatus || 'Đã thanh toán',
        orderNotes: orderNotes || '',
        grandTotalStr: grandTotalStr || '0',
        dateStr: dateStr || '',
        timeStr: timeStr || '',
        products: products || [],
        warrantyNotes: warrantyNotes || '',
      },
      create: {
        orderId,
        custName: custName || 'Khách hàng lẻ',
        custPhone: custPhone || 'N/A',
        custAddress: custAddress || 'N/A',
        payMethod: payMethod || 'Chuyển khoản',
        payStatus: payStatus || 'Đã thanh toán',
        orderNotes: orderNotes || '',
        grandTotalStr: grandTotalStr || '0',
        dateStr: dateStr || '',
        timeStr: timeStr || '',
        products: products || [],
        warrantyNotes: warrantyNotes || '',
      },
    });

    return NextResponse.json(invoice, { status: 200 });
  } catch (error: any) {
    console.error('Lỗi khi lưu hóa đơn:', error);
    return NextResponse.json({ error: error.message || 'Lỗi server khi lưu hóa đơn' }, { status: 500 });
  }
}
