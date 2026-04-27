import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await props.params;
    const body = await request.json();
    
    // Loại bỏ id khỏi body nếu có để tránh lỗi Prisma
    const { id: _, ...updateData } = body;

    const article = await prisma.article.update({
      where: { id },
      data: updateData
    });
    return NextResponse.json(article);
  } catch (error: any) {
    console.error('Lỗi khi cập nhật bài viết:', error);
    return NextResponse.json({ error: 'Lỗi server: ' + error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await props.params;
    
    const existingArticle = await prisma.article.findUnique({
      where: { id }
    });

    if (!existingArticle) {
      return NextResponse.json({ error: 'Bài viết không tồn tại' }, { status: 404 });
    }

    await prisma.article.delete({
      where: { id }
    });
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Lỗi khi xóa bài viết:', error);
    return NextResponse.json({ error: 'Lỗi server: ' + error.message }, { status: 500 });
  }
}
