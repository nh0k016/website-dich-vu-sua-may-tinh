# FastFix - Website Dịch Vụ Sửa Chữa Máy Tính

Chào mừng bạn đến với dự án **FastFix**! Đây là một ứng dụng web chuyên nghiệp được xây dựng bằng Next.js để quản lý và giới thiệu dịch vụ sửa chữa máy tính, cung cấp linh kiện và tin tức công nghệ.

## *** Tính năng nổi bật ***

-  **Trang chủ hiện đại**: Giao diện đẹp mắt, tối ưu trải nghiệm người dùng.
-  **Quản lý sản phẩm/dịch vụ**: Hệ thống phân loại sản phẩm linh hoạt (RAM, SSD, v.v.).
-  **Tin tức & Blog**: Chia sẻ kiến thức và tin tức công nghệ.
-  **Trang Admin**: Quản trị nội dung, sản phẩm và đơn hàng chuyên nghiệp.
-  **Responsive**: Hiển thị tốt trên mọi thiết bị (Mobile, Tablet, Desktop).

## 🛠 Công nghệ sử dụng

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Database**: [Prisma](https://www.prisma.io/) với SQLite (dễ dàng chuyển sang PostgreSQL/MySQL)
- **Styling**: Vanilla CSS & Tailwind CSS
- **Language**: TypeScript

##  Hướng dẫn cài đặt

1. **Clone project**:
   ```bash
   git clone <your-repository-url>
   cd sua-may-tinh
   ```

2. **Cài đặt dependencies**:
   ```bash
   npm install
   ```

3. **Thiết lập Database**:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Chạy môi trường phát triển**:
   ```bash
   npm run dev
   ```

5. **Truy cập**:
   Mở [http://localhost:3000](http://localhost:3000) trên trình duyệt.

## 📁 Cấu trúc thư mục

- `src/app`: Chứa các route và page của ứng dụng.
- `src/components`: Các component dùng chung.
- `prisma`: Schema database và cấu hình Prisma.
- `public`: Chứa tài nguyên tĩnh (hình ảnh, icons).

---
Được phát triển bởi Antigravity AI.
