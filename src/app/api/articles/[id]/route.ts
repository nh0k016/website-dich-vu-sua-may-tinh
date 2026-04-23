import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const article = await prisma.article.update({
      where: { id },
      data: body
    });
    return NextResponse.json(article);
  } catch (error) {
    console.error('Lỗi khi cập nhật bài viết:', error);
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.article.delete({
      where: { id }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Lỗi khi xóa bài viết:', error);
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
  }
}
