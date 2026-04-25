import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Định nghĩa các đường dẫn công khai (không cần đăng nhập)
  const isPublicPath = path === '/vinh09112000/login';
  
  // Chỉ kiểm tra các đường dẫn bắt đầu bằng /vinh09112000
  if (path.startsWith('/vinh09112000')) {
    const token = request.cookies.get('admin_token')?.value;

    // Nếu vào trang login mà đã có token -> Chuyển về trang chủ admin
    if (isPublicPath && token) {
      return NextResponse.redirect(new URL('/vinh09112000', request.url));
    }

    // Nếu vào các trang admin khác mà chưa có token -> Chuyển về login
    if (!isPublicPath && !token) {
      return NextResponse.redirect(new URL('/vinh09112000/login', request.url));
    }
  }

  return NextResponse.next();
}

// Cấu hình để middleware chỉ chạy cho các route admin
export const config = {
  matcher: ['/vinh09112000/:path*'],
};
