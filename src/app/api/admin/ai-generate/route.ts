import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Vui lòng cung cấp từ khóa hoặc yêu cầu' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Chưa cấu hình GEMINI_API_KEY' }, { status: 500 });
    }

    // Câu lệnh (prompt) tối ưu cho việc viết bài SEO
    const systemInstruction = `Bạn là một chuyên gia viết bài SEO xuất sắc cho website dịch vụ máy tính. 
    Hãy viết một bài viết chuẩn SEO dựa trên từ khóa hoặc yêu cầu sau: "${prompt}".
    Yêu cầu:
    1. Trình bày bằng HTML (chỉ trả về phần nội dung bên trong <body>, không trả về <html> hay <body>, không dùng markdown \`\`\`html).
    2. Bài viết phải có Heading 2 (<h2>), Heading 3 (<h3>) phân chia rõ ràng.
    3. Có sử dụng in đậm (<strong>) cho các từ khóa quan trọng.
    4. Có danh sách (<ul><li>) nếu cần liệt kê.
    5. Giọng văn chuyên nghiệp, khách quan, đáng tin cậy, chuẩn kỹ thuật máy tính và có tính thuyết phục cao.
    6. Độ dài khoảng 800 - 1000 từ. Hãy phân tích sâu sắc, chia sẻ nhiều kiến thức bổ ích và thông tin chi tiết.
    7. Có đoạn mở bài hấp dẫn và kết luận (kêu gọi hành động liên hệ).
    8. Hãy chèn từ 2 đến 3 hình ảnh minh họa hợp lý xen kẽ vào bài viết bằng thẻ <img src="https://loremflickr.com/800/600/{keyword}" alt="{mô tả ảnh chuẩn SEO}" class="my-4 rounded-lg shadow-md max-w-full h-auto" />. Thay {keyword} bằng từ khóa tiếng Anh liên quan đến ảnh (ví dụ: computer-repair, technician, laptop, pc-hardware) để hệ thống tự lấy ảnh minh họa phù hợp.`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: systemInstruction }]
        }],
        generationConfig: {
          temperature: 0.7,
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API Error:', errorData);
      return NextResponse.json({ error: 'Lỗi khi gọi API AI' }, { status: 500 });
    }

    const data = await response.json();
    let text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    // Loại bỏ markdown format nếu AI vô tình trả về
    text = text.replace(/^```html\s*/i, '').replace(/\s*```$/i, '');

    return NextResponse.json({ content: text });
  } catch (error) {
    console.error('Error generating AI content:', error);
    return NextResponse.json({ error: 'Đã xảy ra lỗi hệ thống' }, { status: 500 });
  }
}
