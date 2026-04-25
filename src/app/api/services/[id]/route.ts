import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const service = await prisma.service.findUnique({
      where: { id }
    });
    if (!service) return NextResponse.json({ error: 'Không tìm thấy dịch vụ' }, { status: 404 });
    return NextResponse.json(service);
  } catch (error) {
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
    const { id: _, ...updateData } = body;

    if (updateData.order) updateData.order = Number(updateData.order);

    const service = await prisma.service.update({
      where: { id },
      data: updateData
    });
    return NextResponse.json(service);
  } catch (error) {
    console.error('Lỗi khi cập nhật dịch vụ:', error);
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.service.delete({
      where: { id }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Lỗi khi xóa dịch vụ:', error);
    return NextResponse.json({ error: 'Lỗi khi xóa dịch vụ' }, { status: 500 });
  }
}
