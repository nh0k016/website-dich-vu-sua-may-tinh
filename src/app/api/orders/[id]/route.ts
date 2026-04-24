import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const order = await prisma.order.findUnique({
      where: { id },
      include: { items: { include: { product: true } } }
    });
    
    if (!order) {
      return NextResponse.json({ error: 'Không tìm thấy đơn hàng' }, { status: 404 });
    }
    
    return NextResponse.json(order);
  } catch (error) {
    console.error('Lỗi khi lấy thông tin đơn hàng:', error);
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const order = await prisma.order.update({
      where: { id },
      data: { status: body.status }
    });
    return NextResponse.json(order);
  } catch (error) {
    console.error('Lỗi khi cập nhật đơn hàng:', error);
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Kiểm tra trạng thái đơn hàng trước khi xóa
    const order = await prisma.order.findUnique({
      where: { id }
    });

    if (!order) {
      return NextResponse.json({ error: 'Không tìm thấy đơn hàng' }, { status: 404 });
    }

    // Xóa các sản phẩm liên quan trong đơn hàng trước
    await prisma.orderItem.deleteMany({
      where: { orderId: id }
    });

    // Sau đó mới xóa đơn hàng
    await prisma.order.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Lỗi khi xóa đơn hàng:', error);
    return NextResponse.json({ error: 'Lỗi server khi xóa đơn hàng' }, { status: 500 });
  }
}
