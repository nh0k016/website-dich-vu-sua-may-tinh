const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const articles = await prisma.article.findMany({
    where: { 
        slug: 've-sinh-may-tinh-laptop-quan-12' // Hoặc slug mà user đang dùng
    },
  });

  let article = articles[0];
  if (!article) {
    article = await prisma.article.findUnique({
      where: { slug: 've-sinh-may-tinh-laptop-tan-noi-quan-12' },
    });
  }

  if (!article) {
    console.error('Không tìm thấy bài viết');
    return;
  }

  let content = article.content;

  // Bảng với inline CSS chắc chắn ăn 100%
  const newPriceTable = `<div style="overflow-x: auto; margin: 2rem 0; border: 1px solid #e2e8f0; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
  <table style="width: 100%; border-collapse: collapse; text-align: left; margin: 0; font-family: sans-serif;">
    <thead>
      <tr style="background-color: #ecfeff; border-bottom: 2px solid #cffafe;">
        <th style="padding: 16px 24px; color: #164e63; font-weight: 800; text-transform: uppercase; font-size: 14px; border: none;">Loại Máy</th>
        <th style="padding: 16px 24px; color: #164e63; font-weight: 800; text-transform: uppercase; font-size: 14px; border: none;">Mức Giá (VNĐ)</th>
      </tr>
    </thead>
    <tbody>
      <tr style="border-bottom: 1px solid #f1f5f9;">
        <td style="padding: 16px 24px; color: #334155; font-weight: 600; border: none;">PC Văn Phòng</td>
        <td style="padding: 16px 24px; color: #0891b2; font-weight: 700; border: none;">200.000</td>
      </tr>
      <tr style="background-color: #f8fafc; border-bottom: 1px solid #f1f5f9;">
        <td style="padding: 16px 24px; color: #334155; font-weight: 600; border: none;">PC Gaming</td>
        <td style="padding: 16px 24px; color: #0891b2; font-weight: 700; border: none;">250.000</td>
      </tr>
      <tr style="border-bottom: 1px solid #f1f5f9;">
        <td style="padding: 16px 24px; color: #334155; font-weight: 600; border: none;">PC Tản Nước</td>
        <td style="padding: 16px 24px; color: #0891b2; font-weight: 700; border: none;">350.000</td>
      </tr>
      <tr style="background-color: #f8fafc; border-bottom: 1px solid #f1f5f9;">
        <td style="padding: 16px 24px; color: #334155; font-weight: 600; border: none;">Laptop Văn Phòng</td>
        <td style="padding: 16px 24px; color: #0891b2; font-weight: 700; border: none;">150.000</td>
      </tr>
      <tr style="border-bottom: 1px solid #f1f5f9;">
        <td style="padding: 16px 24px; color: #334155; font-weight: 600; border: none;">Laptop Gaming</td>
        <td style="padding: 16px 24px; color: #0891b2; font-weight: 700; border: none;">từ 250.000</td>
      </tr>
      <tr style="background-color: #f8fafc;">
        <td style="padding: 16px 24px; color: #334155; font-weight: 600; border: none;">Laptop Workstation</td>
        <td style="padding: 16px 24px; color: #0891b2; font-weight: 700; border: none;">từ 300.000</td>
      </tr>
    </tbody>
  </table>
</div>`;

  // Thay thế nguyên cụm table cũ
  const startIndex = content.indexOf('<div class="overflow-x-auto');
  let endIndex = content.indexOf('</div>', startIndex) + 6;
  
  if (startIndex === -1) {
      // Thử tìm theo table-wrapper (trường hợp đã chạy script fix-table.ts)
      const start2 = content.indexOf('<div class="table-wrapper">');
      if (start2 !== -1) {
          endIndex = content.indexOf('</div>', start2) + 6;
          const textToReplace = content.substring(start2, endIndex);
          content = content.replace(textToReplace, newPriceTable);
      } else {
          // Thử tìm theo thẻ table
          const start3 = content.indexOf('<table');
          const end3 = content.indexOf('</table>') + 8;
          if (start3 !== -1) {
             const textToReplace = content.substring(start3, end3);
             content = content.replace(textToReplace, newPriceTable);
          }
      }
  } else {
      const textToReplace = content.substring(startIndex, endIndex);
      content = content.replace(textToReplace, newPriceTable);
  }

  await prisma.article.update({
    where: { id: article.id },
    data: { content: content },
  });

  console.log('Sửa lỗi table bằng inline CSS thành công!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
