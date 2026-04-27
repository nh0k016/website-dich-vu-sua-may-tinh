import React from 'react';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="py-16 bg-white min-h-[70vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Điều Khoản Sử Dụng</h1>
          <p className="text-xl text-slate-600">Cập nhật lần cuối: 22/04/2026</p>
        </div>

        <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Chấp nhận các Điều khoản</h2>
            <p>Bằng việc truy cập và sử dụng trang web FastFix, bạn đồng ý tuân thủ các điều khoản và điều kiện được nêu tại đây. Nếu bạn không đồng ý với bất kỳ phần nào của các điều khoản này, vui lòng không sử dụng dịch vụ của chúng tôi.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Dịch vụ cung cấp</h2>
            <p>FastFix cung cấp dịch vụ sửa chữa máy tính tận nơi, bảo trì hệ thống mạng, nâng cấp phần cứng và phần mềm, cùng các thiết bị linh kiện điện tử liên quan.</p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-slate-600">
              <li>Mọi báo giá sẽ được xác nhận lại trước khi tiến hành dịch vụ.</li>
              <li>Thời gian sửa chữa tùy thuộc vào mức độ hư hỏng thực tế.</li>
              <li>Chúng tôi có quyền từ chối sửa chữa đối với các thiết bị vi phạm pháp luật hoặc không còn khả năng phục hồi.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Chính sách bảo hành</h2>
            <p>Tất cả các linh kiện thay thế và dịch vụ sửa chữa tại FastFix đều được bảo hành theo tiêu chuẩn của nhà sản xuất hoặc thỏa thuận rõ ràng lúc bàn giao.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Trách nhiệm của người dùng</h2>
            <p>Bạn có trách nhiệm sao lưu (backup) tất cả dữ liệu quan trọng trước khi giao máy cho kỹ thuật viên. FastFix không chịu trách nhiệm đối với bất kỳ sự cố mất mát dữ liệu nào trong quá trình sửa chữa phần cứng hoặc cài đặt phần mềm.</p>
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
