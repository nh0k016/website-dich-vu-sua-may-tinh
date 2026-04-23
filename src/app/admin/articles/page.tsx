"use client";

import React, { useState, useEffect } from 'react';

export default function AdminArticles() {
  const [articles, setArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
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
      description: article.description || '',
      content: article.content,
      image: article.image || '',
      published: article.published ?? true
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa bài viết này?')) return;
    
    try {
      const res = await fetch(`/api/articles/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchArticles();
      }
    } catch (error) {
      alert('Lỗi khi xóa bài viết');
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
        setFormData({ title: '', slug: '', description: '', content: '', image: '', published: true });
        fetchArticles();
      }
    } catch (error) {
      alert('Lỗi khi lưu bài viết');
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
                      <button onClick={() => handleEdit(article)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 00-2 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                      </button>
                      <button onClick={() => handleDelete(article.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
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
            
            <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Tiêu đề bài viết *</label>
                  <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-500 outline-none transition-all" placeholder="Nhập tiêu đề" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Slug *</label>
                  <input required type="text" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-500 outline-none transition-all" placeholder="tieu-de-bai-viet" />
                </div>
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
                <textarea required rows={2} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-500 outline-none transition-all font-medium text-sm" placeholder="Nhập mô tả ngắn hiển thị ở danh sách tin tức..."></textarea>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Nội dung bài viết (Markdown hoặc HTML) *</label>
                <textarea required rows={10} value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-500 outline-none transition-all font-mono text-sm" placeholder="Nhập nội dung bài viết..."></textarea>
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
    </div>
  );
}
