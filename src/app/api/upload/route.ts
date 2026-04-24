import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
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

    // Tạo tên tệp tin duy nhất
    const fileExtension = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExtension}`;
    const filePath = `${fileName}`;

    // Upload lên Supabase Storage (Bucket: products)
    const { data, error } = await supabase.storage
      .from('products')
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: true
      });

    if (error) {
      console.error('Lỗi Supabase Storage:', error);
      return NextResponse.json({ error: 'Lỗi khi tải ảnh lên Cloud' }, { status: 500 });
    }

    // Lấy URL công khai của ảnh
    const { data: { publicUrl } } = supabase.storage
      .from('products')
      .getPublicUrl(filePath);

    return NextResponse.json({ success: true, url: publicUrl });
  } catch (error) {
    console.error('Lỗi khi upload ảnh:', error);
    return NextResponse.json({ error: 'Lỗi server khi upload' }, { status: 500 });
  }
}
