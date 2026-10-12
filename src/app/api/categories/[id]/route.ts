import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAuthenticatedAdmin } from '@/lib/auth';

export async function PATCH(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  const isAdmin = await isAuthenticatedAdmin(request);
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized: Bạn không có quyền sửa danh mục' }, { status: 401 });
  }

  try {
    const { id } = await props.params;
    const body = await request.json();
    const { id: _, ...updateData } = body;

    // Chuyển parentId trống thành null
    if (updateData.parentId === '') {
      updateData.parentId = null;
    }

    const category = await prisma.category.update({
      where: { id },
      data: updateData
    });
    return NextResponse.json(category);
  } catch (error: any) {
    console.error('Lỗi khi cập nhật danh mục:', error);
    return NextResponse.json({ error: 'Lỗi server: ' + error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  const isAdmin = await isAuthenticatedAdmin(request);
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized: Bạn không có quyền xóa danh mục' }, { status: 401 });
  }

  try {
    const { id } = await props.params;
    // Lưu ý: Việc xóa danh mục có thể bị lỗi nếu có sản phẩm đang thuộc danh mục đó
    await prisma.category.delete({
      where: { id }
    });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Lỗi khi xóa danh mục:', error);
    return NextResponse.json({ error: 'Không thể xóa danh mục đang có sản phẩm' }, { status: 400 });
  }
}
