import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'Không tìm thấy tệp tin' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Tạo thư mục uploads nếu chưa tồn tại
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (e) {
      // Thư mục đã tồn tại hoặc lỗi khác
    }

    // Tạo tên tệp tin duy nhất
    const fileExtension = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExtension}`;
    const path = join(uploadDir, fileName);

    await writeFile(path, buffer);
    
    const publicPath = `/uploads/${fileName}`;

    return NextResponse.json({ success: true, url: publicPath });
  } catch (error) {
    console.error('Lỗi khi upload ảnh:', error);
    return NextResponse.json({ error: 'Lỗi server khi upload' }, { status: 500 });
  }
}
