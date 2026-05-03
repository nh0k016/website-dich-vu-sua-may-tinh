import { prisma } from '@/lib/prisma';
import CleaningService from '@/components/services/CleaningService';
import SoftwareService from '@/components/services/SoftwareService';
import OnlineService from '@/components/services/OnlineService';
import OnsiteService from '@/components/services/OnsiteService';
import { Metadata } from 'next';
import Link from 'next/link';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await prisma.service.findUnique({ where: { slug } });

  if (!service) return { title: 'Dịch vụ không tồn tại - FastFix' };

  let contentJson: any = {};
  if (service.contentJson) {
    try {
      contentJson = typeof service.contentJson === 'string' ? JSON.parse(service.contentJson) : service.contentJson;
    } catch (e) {
      console.error('Lỗi parse JSON meta:', slug);
    }
  }

  return {
    title: contentJson.metaTitle || service.title,
    description: contentJson.metaDesc || service.description,
  };
}

export default async function ServiceDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dbService = await prisma.service.findUnique({ where: { slug } });

  if (!dbService) {
    return (
      <div className='min-h-screen bg-slate-50 flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-4xl font-black text-slate-300 mb-4'>404</h1>
          <p className='text-slate-500 font-bold mb-8'>Dịch vụ này không tồn tại.</p>
          <Link href='/' className='bg-slate-900 text-white px-8 py-3 rounded-xl font-bold'>Quay lại trang chủ</Link>
        </div>
      </div>
    );
  }

  // Phân tích dữ liệu JSON từ database
  let contentJson: any = {};
  if (dbService.contentJson) {
    try {
      contentJson = typeof dbService.contentJson === 'string' 
        ? JSON.parse(dbService.contentJson) 
        : dbService.contentJson;
    } catch (e) {
      console.error('Lỗi parse JSON cho dịch vụ:', slug);
    }
  }

  // Gom dữ liệu từ Database và JSON thành 1 object thống nhất cho các Component
  const serviceData = {
    title: dbService.title,
    description: dbService.description,
    icon: dbService.icon,
    color: dbService.color,
    price: dbService.price,
    process: contentJson.process || [],
    benefits: contentJson.benefits || [],
    details: contentJson.details || [],
    ...contentJson, // Ghi đè các trường đặc biệt nếu có trong JSON
  };

  const template = dbService.template || 'default';

  // Điều hướng tới đúng Component (Layout) dựa vào trường template
  if (template === 'cleaning') return <CleaningService service={serviceData as any} />;
  if (template === 'software') return <SoftwareService service={serviceData as any} />;
  if (template === 'online') return <OnlineService service={serviceData as any} />;
  if (template === 'onsite') return <OnsiteService service={serviceData as any} />;

  // Default fallback layout nếu không khớp template nào
  return (
    <div className='bg-white min-h-screen pt-24'>
      <div className='max-w-7xl mx-auto px-4 py-20 text-center'>
        <h1 className='text-5xl font-black mb-8'>{serviceData.title}</h1>
        <p className='text-xl text-slate-600 max-w-3xl mx-auto'>{serviceData.description}</p>
        <div className='mt-12'>
          <a href='https://zalo.me/0877023032' className='bg-cyan-600 text-white px-10 py-5 rounded-2xl font-black text-xl'>Liên hệ tư vấn</a>
        </div>
      </div>
    </div>
  );
}
