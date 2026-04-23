import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, address, notes, paymentMethod, totalPrice, items } = body;

    // Validate
    if (!name || !phone || !address || !items || items.length === 0) {
      return NextResponse.json({ error: 'Thiếu thông tin bắt buộc' }, { status: 400 });
    }

    // Create Order with nested OrderItems
    const order = await prisma.order.create({
      data: {
        name,
        phone,
        email,
        address,
        notes,
        paymentMethod,
        totalPrice,
        status: 'pending',
        items: {
          create: items.map((item: any) => ({
            quantity: item.quantity,
            price: item.price,
            product: {
              connect: { id: item.productId }
            }
          }))
        }
      },
      include: {
        items: true
      }
    });

    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch (error) {
    console.error('Lỗi khi tạo đơn hàng:', error);
    return NextResponse.json({ error: 'Lỗi server khi tạo đơn hàng' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        items: {
          include: { product: true }
        }
      }
    });
    return NextResponse.json(orders);
  } catch (error) {
    console.error('Lỗi khi lấy danh sách đơn hàng:', error);
    return NextResponse.json({ error: 'Lỗi server khi lấy dữ liệu' }, { status: 500 });
  }
}
