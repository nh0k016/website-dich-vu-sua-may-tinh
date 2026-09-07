async function checkImages() {
  const urls = [
    'https://images.pexels.com/photos/39192424/pexels-photo-39192424.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&q=80&w=1200'
  ];
  for (const url of urls) {
    try {
      const res = await fetch(url, { method: 'HEAD' });
      console.log(url.slice(0, 50), '=> status:', res.status);
    } catch (e: any) {
      console.log(url.slice(0, 50), '=> error:', e.message);
    }
  }
}
checkImages();
