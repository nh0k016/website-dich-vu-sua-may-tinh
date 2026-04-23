import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const resolvedParams = await params;
  const article = await prisma.article.findUnique({
    where: { id: resolvedParams.id }
  }) as any;

  if (!article) return { title: 'Không tìm thấy bài viết' };

  return {
    title: `${article.title} | FastFix Blog`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      images: article.image ? [article.image] : [],
    }
  };
}

export default async function ArticleDetailPage({ params }: { params: { id: string } }) {
  const resolvedParams = await params;
  const article = await prisma.article.findUnique({
    where: { id: resolvedParams.id }
  }) as any;

  if (!article) notFound();

  return (
    <article className="bg-white min-h-screen">
      {/* Header */}
      <header className="pt-24 pb-12 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-[100px]"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <Link href="/tin-tuc" className="inline-flex items-center gap-2 text-cyan-400 font-bold mb-8 hover:text-cyan-300 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Quay lại tin tức
          </Link>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight tracking-tight">
            {article.title}
          </h1>
          <div className="flex items-center justify-center gap-6 text-slate-400 font-bold">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              {new Date(article.createdAt).toLocaleDateString('vi-VN')}
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              Admin
            </span>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      {article.image && (
        <div className="max-w-5xl mx-auto px-4 -mt-16 relative z-20 mb-16">
          <div className="relative h-[300px] md:h-[500px] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
            <Image src={article.image} alt={article.title} fill className="object-cover" priority />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 pb-24">
        <div 
          className="prose prose-slate prose-lg max-w-none prose-headings:font-black prose-headings:text-slate-900 prose-p:text-slate-600 prose-strong:text-slate-900 prose-a:text-cyan-600 prose-img:rounded-3xl shadow-slate-100"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
        
        {/* Footer of Article */}
        <div className="mt-20 pt-10 border-t border-slate-100">
          <div className="bg-slate-50 p-10 rounded-[3rem] flex flex-col md:flex-row items-center gap-8 justify-between">
            <div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">Bài viết này có hữu ích không?</h3>
              <p className="text-slate-500 font-bold">Hãy chia sẻ cho bạn bè nếu bạn thấy hay nhé!</p>
            </div>
            <div className="flex gap-4">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20">Facebook</button>
              <button className="bg-cyan-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-cyan-600 transition-all shadow-lg shadow-cyan-500/20">Zalo</button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
