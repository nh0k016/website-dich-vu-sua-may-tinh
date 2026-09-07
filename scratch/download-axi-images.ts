import fs from 'fs';
import path from 'path';

async function downloadAxiImages() {
  const images = [
    { url: 'https://axi.vn/demo/bai/d29af6e47cb4483a/sp-image-1', name: 'cai-dat-phan-mem-online.png' },
    { url: 'https://axi.vn/demo/bai/d29af6e47cb4483a/sp-image-2', name: 'office-2016-pro-plus.png' },
    { url: 'https://axi.vn/demo/bai/d29af6e47cb4483a/sp-image', name: 'sua-may-tinh-online-tu-xa.jpg' },
  ];

  for (const img of images) {
    const res = await fetch(img.url);
    const buffer = Buffer.from(await res.arrayBuffer());
    const filePath = path.join(process.cwd(), 'public', 'articles', img.name);
    fs.writeFileSync(filePath, buffer);
    console.log(`Saved ${img.name} (${buffer.length} bytes)`);
  }
}

downloadAxiImages().catch(console.error);
