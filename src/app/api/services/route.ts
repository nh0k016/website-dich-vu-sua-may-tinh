import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { order: 'asc' }
    });
    return NextResponse.json(services);
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi khi tải dịch vụ' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, slug, description, content, icon, color, price, order, template, contentJson } = body;
    
    const service = await prisma.service.create({
      data: { 
        title, 
        slug, 
        description, 
        content, 
        icon, 
        price,
        color, 
        template: template || 'default',
        contentJson: contentJson || null,
        order: Number(order) || 0 
      }
    });
    
    return NextResponse.json(service, { status: 201 });
  } catch (error: any) {
    console.error('Lỗi khi tạo dịch vụ:', error);
    return NextResponse.json({ error: error.message || 'Lỗi server' }, { status: 500 });
  }
}
