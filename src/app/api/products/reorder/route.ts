import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { ids } = await request.json();

    if (!Array.isArray(ids)) {
      return NextResponse.json({ error: 'Dữ liệu không hợp lệ. Cần danh sách ID sản phẩm.' }, { status: 400 });
    }

    // Thực hiện transaction để cập nhật thứ tự
    await prisma.$transaction(
      ids.map((id, index) =>
        prisma.product.update({
          where: { id },
          data: { order: index }
        })
      )
    );

    return NextResponse.json({ success: true, message: 'Đã cập nhật thứ tự sản phẩm thành công!' });
  } catch (error: any) {
    console.error('Lỗi khi sắp xếp lại sản phẩm:', error);
    return NextResponse.json({ error: 'Lỗi server khi sắp xếp: ' + error.message }, { status: 500 });
  }
}
