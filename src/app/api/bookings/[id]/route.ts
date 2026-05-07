import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    const booking = await prisma.booking.update({
      where: { id },
      data: { status }
    });

    return NextResponse.json(booking);
  } catch (error) {
    console.error('Lỗi cập nhật đặt lịch:', error);
    return NextResponse.json({ error: 'Lỗi khi cập nhật trạng thái' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.booking.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Lỗi xóa đặt lịch:', error);
    return NextResponse.json({ error: 'Lỗi khi xóa yêu cầu' }, { status: 500 });
  }
}
