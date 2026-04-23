import React from 'react';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="py-16 bg-white min-h-[70vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Chính Sách Bảo Mật</h1>
          <p className="text-xl text-slate-600">Cập nhật lần cuối: 22/04/2026</p>
        </div>
        
        <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Thu thập thông tin</h2>
            <p>Chúng tôi chỉ thu thập các thông tin cá nhân cần thiết phục vụ cho quá trình giao dịch và liên hệ, bao gồm: Họ tên, Số điện thoại, Địa chỉ email và Địa chỉ nhận hàng (nếu có).</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Bảo mật dữ liệu máy tính khách hàng</h2>
            <p>Đây là ưu tiên số một của FastFix. Trong quá trình kiểm tra và sửa chữa, kỹ thuật viên tuyệt đối tuân thủ:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-slate-600">
              <li>Không truy cập vào các thư mục cá nhân không liên quan đến lỗi kỹ thuật.</li>
              <li>Không sao chép, phát tán bất kỳ dữ liệu nào của khách hàng.</li>
              <li>Nếu cần backup dữ liệu để cài lại hệ điều hành, sẽ có sự đồng ý rõ ràng từ khách hàng.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Sử dụng thông tin</h2>
            <p>Thông tin cá nhân được sử dụng nhằm mục đích:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-slate-600">
              <li>Cung cấp dịch vụ, thông báo tiến độ sửa chữa.</li>
              <li>Hỗ trợ kỹ thuật, giải đáp thắc mắc.</li>
              <li>Gửi thông tin bảo hành, hóa đơn điện tử.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Chia sẻ thông tin</h2>
            <p>Chúng tôi cam kết KHÔNG bán, trao đổi hoặc chia sẻ thông tin cá nhân của bạn cho bất kỳ bên thứ ba nào vì mục đích thương mại, ngoại trừ trường hợp có yêu cầu từ cơ quan pháp luật có thẩm quyền.</p>
          </section>
        </div>
        
        <div className="mt-16 pt-8 border-t border-slate-200 text-center">
          <Link href="/" className="inline-flex text-cyan-600 font-bold items-center gap-2 hover:text-cyan-700 transition-all">
            <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            Quay lại trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}
