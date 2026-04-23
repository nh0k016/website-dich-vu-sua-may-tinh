import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const order = await prisma.order.update({
      where: { id: params.id },
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
  { params }: { params: { id: string } }
) {
  try {
    await prisma.order.delete({
      where: { id: params.id }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Lỗi khi xóa đơn hàng:', error);
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
  }
}
