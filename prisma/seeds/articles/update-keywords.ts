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

  const addition = `
<p>Nếu bạn đang tìm kiếm địa chỉ <strong>vệ sinh máy tính Quận 12</strong> uy tín, chuyên nghiệp và nhanh chóng, FastFix chính là sự lựa chọn hàng đầu. Chúng tôi nhận vệ sinh tất cả các dòng máy từ PC đồng bộ, máy ráp, đến các dòng laptop mỏng nhẹ và laptop gaming cấu hình cao. Hãy liên hệ ngay để chiếc máy tính của bạn được "hồi sinh" phong độ!</p>
`;

  // Chèn đoạn mới vào trước phần Kết Luận
  content = content.replace('<h3>Kết Luận</h3>', addition + '\n<h3>Kết Luận</h3>');

  await prisma.article.update({
    where: { slug: 've-sinh-may-tinh-laptop-tan-noi-quan-12' },
    data: { content: content },
  });

  console.log('Bổ sung từ khóa thành công!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
