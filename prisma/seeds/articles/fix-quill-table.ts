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

  // Bảng thuần HTML cơ bản nhất để Quill JS không bị lỗi khi người dùng Edit
  const pureHtmlTable = `
<table border="1">
  <tbody>
    <tr>
      <td><strong>LOẠI MÁY</strong></td>
      <td><strong>MỨC GIÁ (VNĐ)</strong></td>
    </tr>
    <tr>
      <td>PC Văn Phòng</td>
      <td>200.000</td>
    </tr>
    <tr>
      <td>PC Gaming</td>
      <td>250.000</td>
    </tr>
    <tr>
      <td>PC Tản Nước</td>
      <td>350.000</td>
    </tr>
    <tr>
      <td>Laptop Văn Phòng</td>
      <td>150.000</td>
    </tr>
    <tr>
      <td>Laptop Gaming</td>
      <td>từ 250.000</td>
    </tr>
    <tr>
      <td>Laptop Workstation</td>
      <td>từ 300.000</td>
    </tr>
  </tbody>
</table>
`;

  // Tìm và thay thế table cũ (bản inline CSS)
  const startIndex = content.indexOf('<div style="overflow-x: auto;');
  let endIndex = content.indexOf('</table>\n</div>');
  
  if (startIndex !== -1 && endIndex !== -1) {
      endIndex += 15;
      const textToReplace = content.substring(startIndex, endIndex);
      content = content.replace(textToReplace, pureHtmlTable);
  } else {
      // Thử tìm theo phiên bản thuần khác nếu người dùng đã save đè bằng Quill
      const start2 = content.indexOf('<table');
      const end2 = content.indexOf('</table>') + 8;
      if (start2 !== -1 && end2 !== -1) {
          const textToReplace = content.substring(start2, end2);
          content = content.replace(textToReplace, pureHtmlTable);
      }
  }

  await prisma.article.update({
    where: { id: article.id },
    data: { content: content },
  });

  console.log('Chuyển bảng về HTML thuần thành công!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
