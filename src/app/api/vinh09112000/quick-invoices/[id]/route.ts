import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!id) {
      return NextResponse.json({ error: 'Thiếu mã hóa đơn' }, { status: 400 });
    }

    await prisma.quickInvoice.delete({
      where: { orderId: id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Lỗi khi xóa hóa đơn:', error);
    return NextResponse.json({ error: error.message || 'Lỗi server khi xóa hóa đơn' }, { status: 500 });
  }
}
