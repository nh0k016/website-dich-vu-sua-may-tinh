import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await props.params;
    
    // Tìm theo slug hoặc id
    const product = await prisma.product.findFirst({
      where: {
        OR: [
          { id: id },
          { slug: id }
        ]
      },
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

// Hàm tạo slug chuẩn
const generateSlug = (text: string) => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .replace(/([^0-9a-z\s-])/g, '')
    .replace(/(\s+)/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export async function PATCH(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await props.params;
    const body = await request.json();
    
    const { id: _, ...updateData } = body;

    if (updateData.price) updateData.price = Number(updateData.price);
    if (updateData.originalPrice) updateData.originalPrice = Number(updateData.originalPrice);

    // Nếu có tên mới mà không có slug mới, tự tạo slug từ tên
    if (updateData.name && !updateData.slug) {
      updateData.slug = generateSlug(updateData.name);
    }

    const product = await prisma.product.update({
      where: { id },
      data: updateData
    });
    return NextResponse.json(product);
  } catch (error: any) {
    console.error('Lỗi khi cập nhật sản phẩm:', error);
    return NextResponse.json({ error: 'Lỗi server: ' + error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await props.params;

    // Kiểm tra xem sản phẩm có tồn tại không trước khi xóa
    const existingProduct = await prisma.product.findUnique({
      where: { id }
    });

    if (!existingProduct) {
      return NextResponse.json({ error: 'Sản phẩm không tồn tại' }, { status: 404 });
    }

    await prisma.product.delete({
      where: { id }
    });
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Lỗi khi xóa sản phẩm:', error);
    return NextResponse.json({ error: 'Lỗi server: ' + error.message }, { status: 500 });
  }
}
