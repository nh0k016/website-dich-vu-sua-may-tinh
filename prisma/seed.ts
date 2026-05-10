import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Xóa dữ liệu cũ để tránh trùng lặp khi seed lại
  await prisma.orderItem.deleteMany({})
  await prisma.order.deleteMany({})
  await prisma.product.deleteMany({})
  await prisma.category.deleteMany({})

  // Tạo danh mục RAM
  const catRamPc = await prisma.category.create({
    data: {
      name: 'RAM PC',
      slug: 'ram-pc',
    },
  })

  const catRamLaptop = await prisma.category.create({
    data: {
      name: 'RAM Laptop',
      slug: 'ram-laptop',
    },
  })

  // Tạo danh mục SSD theo yêu cầu mới
  const catSsdSata = await prisma.category.create({
    data: {
      name: 'SSD SATA 2.5"',
      slug: 'ssd-sata',
    },
  })

  const catSsdNvme = await prisma.category.create({
    data: {
      name: 'SSD NVMe M.2',
      slug: 'ssd-nvme',
    },
  })

  const catKey = await prisma.category.create({
    data: {
      name: 'Key Phần mềm',
      slug: 'key',
    },
  })

  // Tạo sản phẩm
  const products = [
    {
      name: "RAM Kingston Fury Beast 8GB DDR4 3200MHz",
      price: 650000,
      image: "/ram.png",
      description: "RAM PC Hiệu năng cao",
      specs: '["Tản nhiệt nhôm", "Độ trễ CL16", "Bảo hành 36 tháng"]',
      categoryId: catRamPc.id,
    },
    {
      name: "RAM Corsair Vengeance LPX 16GB DDR4 3200MHz",
      price: 1250000,
      image: "/ram.png",
      description: "RAM PC Chất lượng cao",
      specs: '["Tản nhiệt nhôm", "Độ trễ CL16", "Bảo hành 36 tháng"]',
      categoryId: catRamPc.id,
    },
    {
      name: "RAM Laptop Samsung 8GB DDR4 3200MHz",
      price: 550000,
      image: "/ram.png",
      description: "RAM Laptop chính hãng",
      specs: '["Tiết kiệm điện", "Tương thích cao", "Bảo hành 36 tháng"]',
      categoryId: catRamLaptop.id,
    },
    {
      name: "RAM Laptop Crucial 16GB DDR4 3200MHz",
      price: 1100000,
      image: "/ram.png",
      description: "RAM Laptop nâng cấp",
      specs: '["Chip nhớ Micron", "Hiệu năng ổn định", "Bảo hành 36 tháng"]',
      categoryId: catRamLaptop.id,
    },
    // SSD NVMe
    {
      name: "SSD Samsung 980 500GB M.2 NVMe",
      price: 1450000,
      image: "/ssd.png",
      description: "SSD NVMe Gen 3x4",
      specs: '["Đọc: 3100 MB/s", "Ghi: 2600 MB/s", "Bảo hành 60 tháng"]',
      categoryId: catSsdNvme.id,
    },
    {
      name: "SSD Kingston NV2 1TB M.2 NVMe",
      price: 1650000,
      image: "/ssd.png",
      description: "SSD NVMe Gen 4x4",
      specs: '["Đọc: 3500 MB/s", "Ghi: 2100 MB/s", "Bảo hành 36 tháng"]',
      categoryId: catSsdNvme.id,
    },
    // SSD SATA
    {
      name: "SSD Crucial BX500 240GB 2.5 SATA",
      price: 550000,
      image: "/ssd.png",
      description: "SSD SATA 2.5 inch",
      specs: '["Đọc: 540 MB/s", "Ghi: 500 MB/s", "Bảo hành 36 tháng"]',
      categoryId: catSsdSata.id,
    },
    {
      name: "Windows 11 Pro",
      price: 250000,
      image: "/win11.png",
      description: "Key Bản Quyền Kỹ Thuật Số",
      specs: '["Sử dụng vĩnh viễn 1 PC", "Kích hoạt online", "Bảo hành trọn đời"]',
      categoryId: catKey.id,
    },
    {
      name: "Microsoft Office 365 (1 Năm)",
      price: 350000,
      image: "/office.png",
      description: "Tài khoản Office bản quyền",
      specs: '["1TB OneDrive", "Sử dụng trên 5 thiết bị", "Hỗ trợ Windows/Mac"]',
      categoryId: catKey.id,
    }
  ]

  console.log('Seeding products...')
  for (const p of products) {
    const slug = p.name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[đĐ]/g, 'd')
      .replace(/([^0-9a-z\s-])/g, '')
      .replace(/(\s+)/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');

    await prisma.product.create({
      data: {
        ...p,
        slug
      }
    })
  }
  console.log('Seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
