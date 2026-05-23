const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const articles = await prisma.article.findMany({
    where: { 
        content: {
            contains: '<div class="overflow-x-auto my-8 border border-slate-200 rounded-2xl shadow-sm">'
        }
    },
  });

  if (articles.length === 0) {
    console.error('Không tìm thấy bài viết nào chứa bảng cần sửa');
    return;
  }

  for (const article of articles) {
      let content = article.content;

      // Xóa các class thừa và bọc lại bằng table-wrapper
      const newPriceTable = `<div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Loại Máy</th>
            <th>Mức Giá (VNĐ)</th>
          </tr>
        </thead>
        <tbody>
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
    </div>`;

      const startIndex = content.indexOf('<div class="overflow-x-auto my-8 border border-slate-200 rounded-2xl shadow-sm">');
      const endIndex = content.indexOf('</div>', startIndex) + 6;
      
      if (startIndex !== -1 && endIndex !== -1) {
        const textToReplace = content.substring(startIndex, endIndex);
        content = content.replace(textToReplace, newPriceTable);
        
        await prisma.article.update({
            where: { id: article.id },
            data: { content: content },
        });
        console.log('Sửa lỗi table thành công cho:', article.slug);
      }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
