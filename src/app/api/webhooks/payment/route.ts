import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * API Webhook tiếp nhận thông báo từ SePay
 * Tài liệu SePay: https://docs.sepay.vn/tich-hop-webhook.html
 */
export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Trích xuất các thông tin cần thiết từ SePay
    // content: Nội dung chuyển khoản
    // transferAmount: Số tiền nhận được
    const { content, transferAmount, transactionDate } = data;

    if (!content || !transferAmount) {
      return NextResponse.json({ error: 'Dữ liệu không hợp lệ' }, { status: 400 });
    }



    // 1. Tìm các đơn hàng đang chờ thanh toán (chỉ lấy các đơn trong vòng 24h để tối ưu)
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const pendingOrders = await prisma.order.findMany({
      where: {
        status: 'pending',
        paymentMethod: 'banking',
        createdAt: { gte: oneDayAgo }
      }
    });

    // 2. Đối soát tìm đơn hàng khớp
    const matchedOrder = pendingOrders.find(order => {
      // Làm sạch nội dung chuyển khoản và SĐT để so sánh (chỉ giữ lại số)
      const cleanContent = content.replace(/\D/g, '');
      const cleanPhone = order.phone.replace(/\D/g, '');
      
      // Kiểm tra xem SĐT có xuất hiện trong nội dung chuyển khoản không
      const isPhoneMatch = content.includes(order.phone) || (cleanPhone && cleanContent.includes(cleanPhone));
      
      // Kiểm tra số tiền (Cho phép lệch dưới 100đ để linh hoạt hơn)
      const isAmountMatch = Math.abs(order.totalPrice - Number(transferAmount)) < 100;

      console.log(`Đang check ĐH ${order.id}: PhoneMatch=${isPhoneMatch}, AmountMatch=${isAmountMatch} (Web:${order.totalPrice} - Bank:${transferAmount})`);

      return isPhoneMatch && isAmountMatch;
    });

    if (matchedOrder) {
      console.log(`==> Khớp đơn hàng: ${matchedOrder.id}. Tiến hành cập nhật...`);
      // 3. Cập nhật trạng thái đơn hàng sang 'paid'
      await prisma.order.update({
        where: { id: matchedOrder.id },
        data: { 
          status: 'paid',
          notes: matchedOrder.notes 
            ? `${matchedOrder.notes}\n[Auto] Thanh toán qua SePay lúc ${transactionDate}`
            : `[Auto] Thanh toán qua SePay lúc ${transactionDate}`
        }
      });
      
      return NextResponse.json({ success: true, message: 'Order updated to paid' });
    }

    console.log('==> Không tìm thấy đơn hàng nào khớp với giao dịch này.');


    return NextResponse.json({ success: false, message: 'No matching order found' });

  } catch (error) {
    console.error('Lỗi Webhook SePay:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
