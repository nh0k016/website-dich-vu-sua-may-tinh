import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(articles);
  } catch (error) {
    console.error('Lỗi khi lấy bài viết:', error);
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Tự động tạo slug nếu không có
    const slug = body.slug || body.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[đĐ]/g, 'd')
      .replace(/([^0-9a-z-\s])/g, '')
      .replace(/(\s+)/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');

    const article = await prisma.article.create({
      data: {
        ...body,
        slug: slug
      }
    });
    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    console.error('Lỗi khi tạo bài viết:', error);
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
  }
}
