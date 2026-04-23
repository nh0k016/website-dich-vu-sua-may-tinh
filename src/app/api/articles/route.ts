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
    const article = await prisma.article.create({
      data: body
    });
    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    console.error('Lỗi khi tạo bài viết:', error);
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
  }
}
