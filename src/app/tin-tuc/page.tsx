import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tin tức & Thủ thuật Máy tính | FastFix Blog',
  description: 'Chia sẻ các thủ thuật máy tính, tin tức công nghệ mới nhất và hướng dẫn sửa lỗi máy tính tại nhà từ các chuyên gia FastFix.',
};

export default async function BlogPage() {
  const articles = await prisma.article.findMany({
    where: { published: true } as any,
    orderBy: { createdAt: 'desc' }
  }) as any[];

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-100 text-cyan-700 rounded-full text-sm font-black uppercase tracking-widest mb-4">
            Blog & Tin tức
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
            Chia sẻ kiến thức & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">Thủ thuật</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-slate-600">
            Cập nhật tin tức công nghệ mới nhất và những mẹo hay giúp bạn sử dụng máy tính hiệu quả, an toàn hơn.
          </p>
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200">
            <p className="text-slate-400 font-bold italic">Chưa có bài viết nào được đăng tải.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link key={article.id} href={`/tin-tuc/${article.id}`} className="group bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full">
                <div className="relative h-64 overflow-hidden">
                  {article.image ? (
                    <Image 
                      src={article.image} 
                      alt={article.title} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300">
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-black text-slate-900 shadow-sm uppercase tracking-wider">
                      Thủ thuật
                    </span>
                  </div>
                </div>
                
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 text-slate-400 text-sm mb-4 font-bold">
                    <span>{new Date(article.createdAt).toLocaleDateString('vi-VN')}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    <span>Admin</span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-4 line-clamp-2 group-hover:text-cyan-600 transition-colors leading-tight">
                    {article.title}
                  </h3>
                  <p className="text-slate-500 line-clamp-3 mb-6 font-medium leading-relaxed">
                    {article.description}
                  </p>
                  <div className="mt-auto flex items-center gap-2 text-cyan-600 font-black text-sm uppercase tracking-widest">
                    Đọc chi tiết
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
