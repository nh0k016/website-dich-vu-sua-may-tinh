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
import ProductDetailView from '@/components/products/ProductDetailView';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  // 1. Thử tìm trong bảng Dịch vụ
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

  // 2. Tìm trong bảng Sản phẩm
  const product = await prisma.product.findUnique({ where: { slug } });
  if (product) {
    return {
      title: `${product.name} | Chính hãng, giá tốt nhất`,
      description: product.description || undefined,
      openGraph: {
        title: product.name,
        description: product.description || undefined,
        images: product.image ? [product.image] : [],
      }
    };
  }

  // 3. Tìm trong bảng Bài viết
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

  // 2. Kiểm tra xem có phải Sản phẩm không
  const product = await prisma.product.findUnique({ where: { slug } });
  if (product) {
    return <ProductDetailView slug={slug} />;
  }

  // 3. Kiểm tra xem có phải Bài viết không
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
            className="custom-prose w-full max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content.replace(/&nbsp;|\u00A0/g, ' ') }}
          />

          {/* Call to Action (CTA) Section */}
          <div className="mt-20 p-8 md:p-12 bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2rem] text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="relative z-10 text-center">
              <h3 className="text-2xl md:text-4xl font-black mb-6 leading-tight">
                Bạn Cần Sửa Máy Tính <span className="text-cyan-400">Ngay Bây Giờ?</span>
              </h3>
              <p className="text-slate-300 mb-10 text-lg font-medium max-w-2xl mx-auto">
                Máy tính của bạn gặp sự cố? Hãy để FastFix giúp bạn kiểm tra và đưa ra giải pháp tối ưu nhất. Đội ngũ kỹ thuật viên luôn sẵn sàng lắng nghe và hỗ trợ bạn!
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <a 
                  href="tel:0877023032" 
                  className="bg-cyan-600 hover:bg-cyan-500 text-white px-10 py-5 rounded-2xl font-black text-xl transition-all shadow-xl shadow-cyan-900/20 transform hover:-translate-y-1 flex items-center justify-center gap-3"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  GỌI NGAY
                </a>
                <a 
                  href="https://zalo.me/0877023032" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white text-slate-900 px-10 py-5 rounded-2xl font-black text-xl hover:bg-slate-50 transition-all shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-3"
                >
                  <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg" alt="Zalo" className="w-6 h-6" />
                  CHAT ZALO NGAY
                </a>
              </div>
              <p className="mt-8 text-slate-400 text-sm font-bold uppercase tracking-widest">
                Hỗ trợ nhanh chóng - Sắp xếp lịch hẹn linh hoạt
              </p>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // 3. Nếu không phải cả hai thì 404
  notFound();
}
