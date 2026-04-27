import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categorySlug = searchParams.get('category');

    let where = {};
    if (categorySlug) {
      // Tìm danh mục được chọn và các danh mục con của nó
      const selectedCategory = await prisma.category.findUnique({
        where: { slug: categorySlug },
        include: { children: true }
      });

      if (selectedCategory) {
        // Lấy danh sách ID gồm chính nó và tất cả con trực tiếp
        const categoryIds = [selectedCategory.id, ...selectedCategory.children.map(c => c.id)];
        where = {
          categoryId: {
            in: categoryIds
          }
        };
      } else {
        // Nếu không tìm thấy slug, trả về mảng trống để tránh lỗi
        return NextResponse.json([]);
      }
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        category: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error('Lỗi khi lấy sản phẩm:', error);
    return NextResponse.json({ error: 'Lỗi server khi lấy dữ liệu sản phẩm' }, { status: 500 });
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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const slug = body.slug || generateSlug(body.name || 'san-pham');

    const product = await prisma.product.create({
      data: {
        name: body.name,
        slug: slug,
        price: body.price,
        originalPrice: body.originalPrice,
        image: body.image,
        description: body.description,
        content: body.content,
        specs: body.specs,
        categoryId: body.categoryId
      }
    });
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Lỗi khi tạo sản phẩm:', error);
    return NextResponse.json({ error: 'Lỗi server khi tạo sản phẩm' }, { status: 500 });
  }
}
