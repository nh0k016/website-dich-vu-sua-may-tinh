# Hướng dẫn cấu hình Bot thanh toán tự động (SePay)

Tài liệu này hướng dẫn bạn cách kết nối website FastFix với dịch vụ SePay để tự động xác nhận đơn hàng khi khách hàng chuyển khoản thành công.

## 1. Cơ chế hoạt động
- Khách hàng quét mã QR trên web và chuyển khoản với nội dung là **Số điện thoại** của họ.
- SePay theo dõi biến động số dư tài khoản ngân hàng của bạn.
- Khi nhận được tiền, SePay gửi một thông báo (Webhook) về website.
- Website đối soát Số điện thoại + Số tiền, nếu khớp sẽ tự động chuyển đơn hàng sang trạng thái **"Đã thanh toán"**.

## 2. Các bước cấu hình trên SePay

### Bước 1: Lấy URL Webhook
URL Webhook của bạn có cấu trúc: 
`https://domain-cua-ban.com/api/webhooks/payment`

*(Thay `domain-cua-ban.com` bằng tên miền thực tế của bạn sau khi deploy)*

### Bước 2: Thêm Webhook vào SePay
1. Truy cập [SePay.vn](https://sepay.vn) và đăng nhập.
2. Menu trái -> **Tích hợp Webhook**.
3. Bấm **Thêm Webhook**.
4. Cấu hình các thông số:
   - **URL Webhook**: Nhập URL ở Bước 1.
   - **Tài khoản ngân hàng**: Chọn tài khoản TPBank (78799728888).
   - **Sự kiện**: Chọn "Giao dịch mới (Tiền vào)".
   - **Kiểu dữ liệu**: JSON.
5. Bấm **Lưu**.

## 3. Lưu ý quan trọng
- **Nội dung chuyển khoản**: Hệ thống hiện tại nhận diện qua SĐT khách hàng. Đừng thay đổi logic này trong Code trừ khi bạn muốn đổi cách đối soát.
- **Số tiền**: Khách phải chuyển đúng 100% số tiền đơn hàng (bao gồm cả số lẻ nếu có).
- **Trạng thái**: Website chỉ xác nhận các đơn hàng đang ở trạng thái `pending` (Chờ thanh toán).

## 4. Kiểm tra thử (Test)
Bạn có thể dùng Postman hoặc Terminal để gửi dữ liệu giả lập về API Webhook của mình để kiểm tra logic mà không cần chuyển tiền thật.

---
*Tài liệu được tạo bởi Antigravity AI Assistant.*
