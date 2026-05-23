const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const article = await prisma.article.findUnique({
    where: { slug: 've-sinh-may-tinh-laptop-quan-12' },
  }) || await prisma.article.findUnique({
    where: { slug: 've-sinh-may-tinh-laptop-tan-noi-quan-12' },
  });

  if (!article) {
    console.error('Không tìm thấy bài viết');
    return;
  }

  let content = article.content;

  // Bảng với inline CSS được sửa lỗi font
  const newPriceTable = `<div style="overflow-x: auto; margin: 2rem 0; border: 1px solid #e2e8f0; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
  <table style="width: 100%; border-collapse: collapse; text-align: left; margin: 0; font-family: inherit;">
    <thead>
      <tr style="background-color: #ecfeff; border-bottom: 2px solid #cffafe;">
        <th style="padding: 16px 24px; color: #164e63; font-weight: 700; text-transform: uppercase; font-size: 14px; letter-spacing: 0.05em; border: none;">Loại Máy</th>
        <th style="padding: 16px 24px; color: #164e63; font-weight: 700; text-transform: uppercase; font-size: 14px; letter-spacing: 0.05em; border: none;">Mức Giá (VNĐ)</th>
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

  // Tìm và thay thế table cũ
  const startIndex = content.indexOf('<div style="overflow-x: auto;');
  let endIndex = content.indexOf('</table>\n</div>') + 15;
  
  if (startIndex !== -1) {
      const textToReplace = content.substring(startIndex, endIndex);
      content = content.replace(textToReplace, newPriceTable);
  }

  await prisma.article.update({
    where: { id: article.id },
    data: { content: content },
  });

  console.log('Sửa font table thành công!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
