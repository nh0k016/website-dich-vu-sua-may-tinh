const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const article = await prisma.article.findUnique({
    where: { slug: 've-sinh-may-tinh-laptop-tan-noi-quan-12' },
  });

  if (!article) {
    console.error('Không tìm thấy bài viết');
    return;
  }

  let content = article.content;

  const oldPriceSection = `<ul>
    <li><strong>PC văn phòng:</strong> 200.000 VNĐ</li>
    <li><strong>PC gaming:</strong> 250.000 VNĐ</li>
    <li><strong>PC tản nước:</strong> 350.000 VNĐ</li>
    <li><strong>Laptop văn phòng:</strong> 150.000 VNĐ</li>
    <li><strong>Laptop gaming:</strong> từ 250.000 VNĐ</li>
    <li><strong>Laptop workstation:</strong> từ 300.000 VNĐ</li>
</ul>`;

  const newPriceTable = `<div class="overflow-x-auto my-8 border border-slate-200 rounded-2xl shadow-sm">
  <table class="w-full text-left border-collapse">
    <thead>
      <tr class="bg-cyan-50 text-cyan-900 border-b border-cyan-100">
        <th class="py-4 px-6 font-black text-sm uppercase tracking-wider">Loại Máy</th>
        <th class="py-4 px-6 font-black text-sm uppercase tracking-wider">Mức Giá (VNĐ)</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-slate-100">
      <tr class="hover:bg-slate-50 transition-colors">
        <td class="py-4 px-6 font-bold text-slate-800">PC Văn Phòng</td>
        <td class="py-4 px-6 font-medium text-cyan-700">200.000</td>
      </tr>
      <tr class="hover:bg-slate-50 transition-colors bg-slate-50/50">
        <td class="py-4 px-6 font-bold text-slate-800">PC Gaming</td>
        <td class="py-4 px-6 font-medium text-cyan-700">250.000</td>
      </tr>
      <tr class="hover:bg-slate-50 transition-colors">
        <td class="py-4 px-6 font-bold text-slate-800">PC Tản Nước</td>
        <td class="py-4 px-6 font-medium text-cyan-700">350.000</td>
      </tr>
      <tr class="hover:bg-slate-50 transition-colors bg-slate-50/50">
        <td class="py-4 px-6 font-bold text-slate-800">Laptop Văn Phòng</td>
        <td class="py-4 px-6 font-medium text-cyan-700">150.000</td>
      </tr>
      <tr class="hover:bg-slate-50 transition-colors">
        <td class="py-4 px-6 font-bold text-slate-800">Laptop Gaming</td>
        <td class="py-4 px-6 font-medium text-cyan-700">từ 250.000</td>
      </tr>
      <tr class="hover:bg-slate-50 transition-colors bg-slate-50/50">
        <td class="py-4 px-6 font-bold text-slate-800">Laptop Workstation</td>
        <td class="py-4 px-6 font-medium text-cyan-700">từ 300.000</td>
      </tr>
    </tbody>
  </table>
</div>`;

  if (content.includes(oldPriceSection)) {
    content = content.replace(oldPriceSection, newPriceTable);
  } else {
    // Nếu có sai sót về khoảng trắng, mình tìm theo thẻ
    const startIndex = content.indexOf('<h3>Bảng Giá Vệ Sinh Máy Tính Tận Nhà</h3>');
    const endIndex = content.indexOf('<p>Chi phí vệ sinh đã bao gồm việc tháo lắp');
    
    if (startIndex !== -1 && endIndex !== -1) {
        const textToReplace = content.substring(
            startIndex + '<h3>Bảng Giá Vệ Sinh Máy Tính Tận Nhà</h3>'.length, 
            endIndex
        );
        content = content.replace(textToReplace, `\n<p>Dưới đây là bảng giá tham khảo cho dịch vụ vệ sinh máy tính và thay keo tản nhiệt tận nơi (giá có thể thay đổi tùy tình trạng máy):</p>\n${newPriceTable}\n`);
    } else {
        console.error('Không tìm thấy đoạn cần thay thế, kiểm tra lại nội dung.');
        return;
    }
  }

  await prisma.article.update({
    where: { slug: 've-sinh-may-tinh-laptop-tan-noi-quan-12' },
    data: { content: content },
  });

  console.log('Cập nhật thành công thành dạng bảng.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
