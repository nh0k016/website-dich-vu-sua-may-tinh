"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { convertToSlug } from '@/lib/utils';
import Toast from '@/components/admin/Toast';

const RichTextEditor = dynamic(() => import('@/components/admin/RichTextEditor'), { ssr: false });

export default function AdminArticles() {
  const [articles, setArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<any>(null);
  const [articleToDelete, setArticleToDelete] = useState<string | null>(null);
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error' | 'info'} | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Thủ thuật',
    description: '',
    content: '',
    image: '',
    published: true
  });

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/articles');
      if (res.ok) {
        setArticles(await res.json());
      }
    } catch (error) {
      console.error('Lỗi khi tải bài viết:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (article: any) => {
    setEditingArticle(article);
    setFormData({
      title: article.title,
      slug: article.slug,
      category: article.category || 'Thủ thuật',
      description: article.description || '',
      content: article.content,
      image: article.image || '',
      published: article.published ?? true
    });
    setIsModalOpen(true);
  };

  const handleDuplicate = (article: any) => {
    setEditingArticle(null); // null nghĩa là sẽ tạo bài mới hoàn toàn
    setFormData({
      title: article.title + ' (Bản sao)',
      slug: article.slug + '-copy',
      category: article.category || 'Thủ thuật',
      description: article.description || '',
      content: article.content,
      image: article.image || '',
      published: false // Để chế độ Bản nháp để bạn sửa xong mới công khai
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/articles/${id}`, { method: 'DELETE' });
      const data = await res.json();
      
      if (res.ok) {
        setNotification({ message: 'Đã xóa bài viết thành công!', type: 'success' });
        fetchArticles();
      } else {
        setNotification({ message: 'Lỗi: ' + (data.error || 'Không thể xóa bài viết'), type: 'error' });
      }
    } catch (error) {
      console.error('Lỗi khi xóa bài viết:', error);
      setNotification({ message: 'Lỗi kết nối khi xóa bài viết', type: 'error' });
    } finally {
      setArticleToDelete(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingArticle ? `/api/articles/${editingArticle.id}` : '/api/articles';
    const method = editingArticle ? 'PATCH' : 'POST';
    
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        setIsModalOpen(false);
        setEditingArticle(null);
        setFormData({ title: '', slug: '', category: 'Thủ thuật', description: '', content: '', image: '', published: true });
        fetchArticles();
        setNotification({ 
          message: editingArticle ? 'Cập nhật bài viết thành công!' : 'Đã tạo bài viết mới thành công!', 
          type: 'success' 
        });
      } else {
        const data = await res.json();
        setNotification({ message: 'Lỗi: ' + (data.error || 'Không thể lưu bài viết'), type: 'error' });
      }
    } catch (error) {
      setNotification({ message: 'Lỗi kết nối khi lưu bài viết', type: 'error' });
    }
  };

  if (isLoading) return <div className="p-8 text-center">Đang tải...</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Quản lý bài viết</h1>
          <p className="text-slate-500">Viết blog, chia sẻ kiến thức công nghệ lên website.</p>
        </div>
        <button 
          onClick={() => { setEditingArticle(null); setIsModalOpen(true); }}
          className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-cyan-200"
        >
          + Bài viết mới
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-sm uppercase font-bold tracking-wider">
                <th className="px-6 py-4">Tiêu đề bài viết</th>
                <th className="px-6 py-4">Trạng thái</th>
                <th className="px-6 py-4">Ngày tạo</th>
                <th className="px-6 py-4">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {articles.map((article) => (
                <tr key={article.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900">{article.title}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${article.published ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'}`}>
                      {article.published ? 'Đã đăng' : 'Bản nháp'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-sm">{new Date(article.createdAt).toLocaleDateString('vi-VN')}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button 
                        type="button"
                        onClick={() => handleEdit(article)} 
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-xl transition-all"
                        title="Sửa bài viết"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 00-2 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                      </button>
                      <button 
                        type="button"
                        onClick={() => handleDuplicate(article)} 
                        className="p-2 text-emerald-600 hover:bg-emerald-100 rounded-xl transition-all"
                        title="Nhân bản bài viết"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                      </button>
                      <button 
                        type="button"
                        onClick={() => setArticleToDelete(article.id)} 
                        className="p-2 text-red-600 hover:bg-red-100 rounded-xl transition-all"
                        title="Xóa bài viết"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {articleToDelete && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl animate-in fade-in zoom-in duration-200 text-center">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Xác nhận xóa?</h3>
            <p className="text-slate-500 mb-8">Bạn có chắc chắn muốn xóa bài viết này không? Hành động này không thể hoàn tác.</p>
            <div className="flex gap-3">
              <button onClick={() => setArticleToDelete(null)} className="flex-1 px-6 py-3 border border-slate-200 rounded-xl font-bold hover:bg-slate-50 transition-colors">Hủy</button>
              <button onClick={() => handleDelete(articleToDelete)} className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-200">Xóa ngay</button>
            </div>
          </div>
        </div>
      )}
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-900">{editingArticle ? 'Sửa bài viết' : 'Viết bài mới'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Công cụ Thay thế nhanh */}
            <div className="bg-slate-50 p-4 border-b border-slate-200 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-slate-400 uppercase">Tìm:</span>
                <input id="findText" type="text" placeholder="Quận 12" className="px-3 py-1.5 text-sm rounded-lg border border-slate-200 outline-none focus:border-cyan-500 w-32 md:w-48" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-slate-400 uppercase">Thay bằng:</span>
                <input id="replaceText" type="text" placeholder="Quận Bình Tân" className="px-3 py-1.5 text-sm rounded-lg border border-slate-200 outline-none focus:border-cyan-500 w-32 md:w-48" />
              </div>
              <button 
                type="button"
                onClick={() => {
                  const find = (document.getElementById('findText') as HTMLInputElement).value;
                  const replace = (document.getElementById('replaceText') as HTMLInputElement).value;
                  if (!find) return alert('Vui lòng nhập từ khóa cần tìm');
                  
                  const newTitle = formData.title.split(find).join(replace);
                  const newDesc = formData.description.split(find).join(replace);
                  const newContent = formData.content.split(find).join(replace);
                  
                  setFormData({
                    ...formData,
                    title: newTitle,
                    description: newDesc,
                    content: newContent,
                    slug: convertToSlug(newTitle)
                  });
                }}
                className="bg-slate-900 text-white px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-slate-800 transition-all flex items-center gap-2 shadow-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                Thay thế tất cả
              </button>
              <p className="text-[10px] text-slate-400 font-medium italic">Sửa Title, Desc, Content & Slug</p>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Tiêu đề bài viết *</label>
                  <input required type="text" value={formData.title} onChange={e => {
                    const title = e.target.value;
                    setFormData({...formData, title, slug: convertToSlug(title)});
                  }} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-500 outline-none transition-all" placeholder="Nhập tiêu đề" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Slug *</label>
                  <input required type="text" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-500 outline-none transition-all" placeholder="tieu-de-bai-viet" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Chuyên mục bài viết *</label>
                <select 
                  required 
                  value={formData.category} 
                  onChange={e => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-500 outline-none transition-all font-medium"
                >
                  <option value="Thủ thuật">Thủ thuật</option>
                  <option value="Tin tức">Tin tức</option>
                  <option value="Hướng dẫn">Hướng dẫn</option>
                  <option value="Khuyến mãi">Khuyến mãi</option>
                  <option value="Review">Review</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Ảnh bìa</label>
                <div className="flex gap-2">
                  <input type="text" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-500 outline-none transition-all" placeholder="/blog-image.jpg" />
                  <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-3 rounded-xl font-bold transition-all flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                    <input type="file" className="hidden" accept="image/*" onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const uploadFormData = new FormData();
                      uploadFormData.append('file', file);
                      try {
                        const res = await fetch('/api/upload', { method: 'POST', body: uploadFormData });
                        const data = await res.json();
                        if (data.url) setFormData(prev => ({ ...prev, image: data.url }));
                      } catch (error) {
                        alert('Lỗi khi tải ảnh lên');
                      }
                    }} />
                  </label>
                </div>
                {formData.image && (
                  <div className="mt-2 relative w-20 h-20 rounded-lg overflow-hidden border border-slate-200">
                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Mô tả ngắn *</label>
                <textarea required rows={2} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-500 outline-none transition-all font-medium text-sm" placeholder="Nhập mô tả ngắn hiển thị ở danh sách bài viết..."></textarea>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold text-slate-700">Nội dung bài viết *</label>
                </div>
                
                {/* Lời nhắc SEO Local */}
                <div className="mb-4 bg-orange-50 border border-orange-200 rounded-xl p-4">
                  <h4 className="text-sm font-black text-orange-800 flex items-center gap-2 mb-1">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    BÍ KÍP SEO: Tránh lỗi trùng lặp nội dung (Duplicate Content)
                  </h4>
                  <p className="text-xs text-orange-700 leading-relaxed font-medium">
                    Nếu bạn đang "Nhân bản" bài này để làm dịch vụ cho một Quận/Huyện khác, bạn **bắt buộc phải sửa lại đoạn văn Mở bài** và thay đổi một chút ở các tiêu đề để Google không phạt lỗi copy bài nhé! (Phần bảng giá và quy trình thì có thể giữ nguyên).
                  </p>
                </div>

                <RichTextEditor 
                  value={formData.content} 
                  onChange={(content) => setFormData({...formData, content})} 
                  placeholder="Nhập nội dung bài viết..."
                />
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="published" checked={formData.published} onChange={e => setFormData({...formData, published: e.target.checked})} className="w-5 h-5 text-cyan-600 rounded border-slate-300 focus:ring-cyan-500" />
                <label htmlFor="published" className="text-sm font-semibold text-slate-700 cursor-pointer">Công khai bài viết</label>
              </div>

              <div className="pt-4 flex gap-4 sticky bottom-0 bg-white pb-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-6 py-3 border border-slate-200 rounded-xl font-bold hover:bg-slate-50 transition-colors">Hủy</button>
                <button type="submit" className="flex-1 px-6 py-3 bg-cyan-600 text-white rounded-xl font-bold hover:bg-cyan-700 transition-all shadow-lg shadow-cyan-200">Lưu bài viết</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {notification && (
        <Toast 
          message={notification.message} 
          type={notification.type} 
          onClose={() => setNotification(null)} 
        />
      )}
    </div>
  );
}
