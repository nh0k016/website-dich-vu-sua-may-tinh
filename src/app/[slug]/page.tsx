import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

// Import các layout dịch vụ
import CleaningService from '@/components/services/CleaningService';
import SoftwareService from '@/components/services/SoftwareService';
import OnlineService from '@/components/services/OnlineService';
import OnsiteService from '@/components/services/OnsiteService';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  // Thử tìm trong bảng Dịch vụ trước
  const service = await prisma.service.findUnique({ where: { slug } });
  if (service) {
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
      description: contentJson.metaDesc || service.description || undefined,
    };
  }

  // Nếu không thấy dịch vụ, tìm trong bảng Bài viết
  const article = await prisma.article.findUnique({ where: { slug } });
  if (article) {
    return {
      title: `${article.title} | FastFix Blog`,
      description: article.description || undefined,
      openGraph: {
        title: article.title,
        description: article.description || undefined,
        images: article.image ? [article.image] : [],
      }
    };
  }

  return { title: 'Nội dung không tồn tại - FastFix' };
}

export default async function DynamicSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // 1. Kiểm tra xem có phải Dịch vụ không
  const dbService = await prisma.service.findUnique({ where: { slug } });
  if (dbService) {
    let contentJson: any = {};
    if (dbService.contentJson) {
      try {
        contentJson = typeof dbService.contentJson === 'string' ? JSON.parse(dbService.contentJson) : dbService.contentJson;
      } catch (e) {
        console.error('Lỗi parse JSON:', slug);
      }
    }

    const serviceData = {
      title: dbService.title,
      description: dbService.description,
      icon: dbService.icon,
      color: dbService.color,
      price: dbService.price,
      ...contentJson,
    };

    const template = dbService.template || 'default';
    if (template === 'cleaning') return <CleaningService service={serviceData as any} />;
    if (template === 'software') return <SoftwareService service={serviceData as any} />;
    if (template === 'online') return <OnlineService service={serviceData as any} />;
    if (template === 'onsite') return <OnsiteService service={serviceData as any} />;

    // Fallback cho dịch vụ
    return (
      <div className='bg-white min-h-screen pt-24'>
        <div className='max-w-7xl mx-auto px-4 py-20 text-center'>
          <h1 className='text-5xl font-black mb-8'>{serviceData.title}</h1>
          <p className='text-xl text-slate-600 max-w-3xl mx-auto'>{serviceData.description}</p>
        </div>
      </div>
    );
  }

  // 2. Kiểm tra xem có phải Bài viết không
  const article = await prisma.article.findUnique({ where: { slug } });
  if (article) {
    return (
      <article className="bg-white min-h-screen">
        <header className="pt-24 pb-32 bg-slate-900 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-[100px]"></div>
          </div>
          <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
            <Link href="/bai-viet" className="inline-flex items-center gap-2 text-cyan-400 font-bold mb-8 hover:text-cyan-300 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              Quay lại tin tức
            </Link>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight tracking-tight">{article.title}</h1>
            <div className="flex items-center justify-center gap-6 text-slate-400 font-bold">
              <span>{new Date(article.createdAt).toLocaleDateString('vi-VN')}</span>
              <span>Admin</span>
            </div>
          </div>
        </header>

        {article.image && (
          <div className="max-w-5xl mx-auto px-4 -mt-20 relative z-20 mb-16">
            <div className="relative h-[300px] md:h-[500px] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
              <Image src={article.image} alt={article.title} fill className="object-cover" priority />
            </div>
          </div>
        )}

        <div className="max-w-4xl mx-auto px-4 pb-24">
          <div 
            className="prose prose-slate prose-lg max-w-none prose-headings:font-black prose-headings:text-slate-900 prose-p:text-slate-600 prose-img:rounded-3xl"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      </article>
    );
  }

  // 3. Nếu không phải cả hai thì 404
  notFound();
}
