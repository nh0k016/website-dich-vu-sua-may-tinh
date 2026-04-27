import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const product = await prisma.product.findUnique({
      where: { slug: slug },
      include: {
        category: true
      }
    });

    if (!product) {
      return NextResponse.json({ error: 'Sản phẩm không tồn tại' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Lỗi khi lấy chi tiết sản phẩm:', error);
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();
    
    // Loại bỏ id khỏi body nếu có để tránh lỗi Prisma
    const { id: _, ...updateData } = body;

    const product = await prisma.product.update({
      where: { slug: slug },
      data: updateData
    });
    return NextResponse.json(product);
  } catch (error) {
    console.error('Lỗi khi cập nhật sản phẩm:', error);
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    await prisma.product.delete({
      where: { slug: slug }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Lỗi khi xóa sản phẩm:', error);
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
  }
}
