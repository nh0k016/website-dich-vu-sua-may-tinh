async function testAxiImages() {
  const urls = [
    'https://axi.vn/demo/bai/d29af6e47cb4483a/sp-image-1',
    'https://axi.vn/demo/bai/d29af6e47cb4483a/sp-image-2',
    'https://axi.vn/demo/bai/d29af6e47cb4483a/sp-image'
  ];
  for (const u of urls) {
    try {
      const res = await fetch(u, { redirect: 'follow' });
      console.log(u, '=> status:', res.status, 'type:', res.headers.get('content-type'), 'url:', res.url);
    } catch (e: any) {
      console.log(u, '=> error:', e.message);
    }
  }
}
testAxiImages();
