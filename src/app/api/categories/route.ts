import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const flat = searchParams.get('flat') === 'true';

  try {
    if (flat) {
      const categories = await prisma.category.findMany({
        orderBy: { name: 'asc' }
      });
      return NextResponse.json(categories);
    }

    const categories = await prisma.category.findMany({
      where: { parentId: null }, // Chỉ lấy danh mục gốc
      include: { children: true },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Lỗi khi lấy danh mục:', error);
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, slug, parentId } = body;
    
    const category = await prisma.category.create({
      data: { 
        name, 
        slug,
        parentId: (parentId && parentId.trim() !== "") ? parentId : null
      }
    });
    

    return NextResponse.json(category, { status: 201 });
  } catch (error: any) {
    console.error('Lỗi chi tiết khi tạo danh mục:', error);
    return NextResponse.json({ error: error.message || 'Lỗi server' }, { status: 500 });
  }
}
