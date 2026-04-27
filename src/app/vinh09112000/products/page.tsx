"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import Toast from '@/components/admin/Toast';

const RichTextEditor = dynamic(() => import('@/components/admin/RichTextEditor'), { ssr: false });

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ message: string, type: 'success' | 'error' | 'info' } | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    originalPrice: 0,
    image: '',
    description: '',
    content: '',
    specs: '[]',
    categoryId: ''
  });
  const [newSpec, setNewSpec] = useState('');
  const [specsList, setSpecsList] = useState<string[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [prodRes, catRes] = await Promise.all([
        fetch('/api/products', { cache: 'no-store' }),
        fetch('/api/categories?flat=true', { cache: 'no-store' })
      ]);

      if (prodRes.ok && catRes.ok) {
        setProducts(await prodRes.json());
        const cats = await catRes.json();

        // Sắp xếp danh mục theo phân cấp: Cha xong đến các con của nó
        const sortedCats: any[] = [];
        const parents = cats.filter((c: any) => !c.parentId);
        parents.forEach((parent: any) => {
          sortedCats.push(parent);
          const children = cats.filter((c: any) => c.parentId === parent.id);
          sortedCats.push(...children);
        });

        setCategories(sortedCats);
        if (sortedCats.length > 0 && !formData.categoryId) {
          setFormData(prev => ({ ...prev, categoryId: sortedCats[0].id }));
        }
      }
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice || 0,
      image: product.image,
      description: product.description || '',
      content: product.content || '',
      specs: product.specs || '[]',
      categoryId: product.categoryId
    });

    // Parse specs string to array for the UI
    try {
      const parsed = JSON.parse(product.specs || '[]');
      setSpecsList(Array.isArray(parsed) ? parsed : []);
    } catch (e) {
      setSpecsList(product.specs ? product.specs.split('\n').filter((s: string) => s.trim()) : []);
    }

    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      const data = await res.json();

      if (res.ok) {
        setNotification({ message: 'Đã xóa sản phẩm thành công!', type: 'success' });
        fetchData();
      } else {
        setNotification({ message: 'Lỗi: ' + (data.error || 'Không thể xóa sản phẩm'), type: 'error' });
      }
    } catch (error) {
      console.error('Lỗi khi xóa sản phẩm:', error);
      setNotification({ message: 'Lỗi kết nối khi xóa sản phẩm', type: 'error' });
    } finally {
      setProductToDelete(null);
    }
  };

  const addSpec = () => {
    if (newSpec.trim()) {
      const updatedList = [...specsList, newSpec.trim()];
      setSpecsList(updatedList);
      setFormData({ ...formData, specs: JSON.stringify(updatedList) });
      setNewSpec('');
    }
  };

  const removeSpec = (index: number) => {
    const updatedList = specsList.filter((_, i) => i !== index);
    setSpecsList(updatedList);
    setFormData({ ...formData, specs: JSON.stringify(updatedList) });
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formDataUpload = new FormData();
    formDataUpload.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload
      });
      const data = await res.json();
      if (data.url) {
        setFormData(prev => ({ ...prev, image: data.url }));
      }
    } catch (error) {
      alert('Lỗi khi tải ảnh lên');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Kiểm tra logic giá
    if (formData.originalPrice > 0 && formData.originalPrice <= formData.price) {
      setNotification({ message: 'Giá gốc phải lớn hơn giá bán để hiển thị giảm giá', type: 'error' });
      return;
    }

    setIsSubmitting(true);
    const url = editingProduct ? `/api/products/${editingProduct.id}` : '/api/products';
    const method = editingProduct ? 'PATCH' : 'POST';

    try {
      console.log('Sending data:', { ...formData, price: Number(formData.price) });

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          originalPrice: formData.originalPrice ? Number(formData.originalPrice) : null
        })
      });

      const data = await res.json();

      if (res.ok) {
        setNotification({
          message: editingProduct ? 'Đã cập nhật sản phẩm thành công!' : 'Đã thêm sản phẩm mới thành công!',
          type: 'success'
        });
        setIsModalOpen(false);
        setEditingProduct(null);
        setFormData({
          name: '',
          price: 0,
          originalPrice: 0,
          image: '',
          description: '',
          content: '',
          specs: '[]',
          categoryId: categories[0]?.id || ''
        });
        setSpecsList([]);
        fetchData();
      } else {
        setNotification({
          message: 'Lỗi từ server: ' + (data.error || 'Không thể lưu sản phẩm'),
          type: 'error'
        });
      }
    } catch (error: any) {
      console.error('Lỗi khi lưu sản phẩm:', error);
      setNotification({
        message: 'Lỗi kết nối: ' + (error.message || 'Không thể kết nối tới server'),
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div className="p-8 text-center">Đang tải...</div>;

  return (
    <div className="space-y-8 relative">
      {notification && (
        <Toast
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Quản lý sản phẩm</h1>
          <p className="text-slate-500">Thêm, sửa, xóa sản phẩm trong hệ thống.</p>
        </div>
        <button
          onClick={() => { setEditingProduct(null); setIsModalOpen(true); }}
          className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-cyan-200"
        >
          + Thêm sản phẩm
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-sm uppercase font-bold tracking-wider">
                <th className="px-6 py-4">Sản phẩm</th>
                <th className="px-6 py-4">Danh mục</th>
                <th className="px-6 py-4">Giá</th>
                <th className="px-6 py-4">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-100 rounded-lg relative overflow-hidden shrink-0 border border-slate-200">
                        {product.image ? (
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover" onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://placehold.co/100x100?text=No+Image';
                          }} />
                        ) : (
                          <div className="flex items-center justify-center h-full text-slate-300">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                          </div>
                        )}
                      </div>
                      <div className="font-bold text-slate-900">{product.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-cyan-100 text-cyan-600 rounded-full text-xs font-bold">
                      {product.category?.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-900">{product.price.toLocaleString('vi-VN')}đ</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => handleEdit(product)}
                        className="flex items-center justify-center w-10 h-10 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
                        title="Sửa"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 00-2 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => setProductToDelete(product.id)}
                        className="flex items-center justify-center w-10 h-10 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-colors shadow-sm"
                        title="Xóa sản phẩm"
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
      {productToDelete && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl animate-in fade-in zoom-in duration-200 text-center">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Xác nhận xóa?</h3>
            <p className="text-slate-500 mb-8">Hành động này không thể hoàn tác. Bạn có chắc chắn muốn xóa sản phẩm này không?</p>
            <div className="flex gap-3">
              <button
                onClick={() => setProductToDelete(null)}
                className="flex-1 px-6 py-3 border border-slate-200 rounded-xl font-bold hover:bg-slate-50 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={() => handleDelete(productToDelete)}
                className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-200"
              >
                Xóa ngay
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-900">{editingProduct ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Tên sản phẩm *</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-500 outline-none transition-all" placeholder="Nhập tên sản phẩm" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Giá bán (VNĐ) *</label>
                  <input required type="number" value={formData.price} onChange={e => setFormData({ ...formData, price: Number(e.target.value) })} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-500 outline-none transition-all font-bold text-orange-600" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Giá gốc (VNĐ - Để trống nếu không giảm)</label>
                  <input type="number" value={formData.originalPrice} onChange={e => setFormData({ ...formData, originalPrice: Number(e.target.value) })} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-500 outline-none transition-all text-slate-400 line-through" placeholder="Ví dụ: 500000" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Danh mục *</label>
                  <select required value={formData.categoryId} onChange={e => setFormData({ ...formData, categoryId: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-500 outline-none transition-all">
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.parentId ? `— ${cat.name}` : cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Ảnh sản phẩm</label>
                  <div className="flex gap-2">
                    <input type="text" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-500 outline-none transition-all" placeholder="/ram.png" />
                    <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-3 rounded-xl font-bold transition-all flex items-center justify-center">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                      <input type="file" className="hidden" accept="image/*" onChange={handleUpload} />
                    </label>
                  </div>
                  {formData.image && (
                    <div className="mt-2 relative w-20 h-20 rounded-lg overflow-hidden border border-slate-200">
                      <Image src={formData.image} alt="Preview" fill className="object-cover" />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Mô tả ngắn</label>
                <input type="text" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-500 outline-none transition-all" placeholder="Dành cho PC, Laptop..." />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Thông số kỹ thuật</label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newSpec}
                    onChange={e => setNewSpec(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addSpec())}
                    className="flex-1 px-4 py-2 rounded-xl border border-slate-200 focus:border-cyan-500 outline-none transition-all text-sm"
                    placeholder="VD: RAM 16GB, SSD 512GB..."
                  />
                  <button
                    type="button"
                    onClick={addSpec}
                    className="bg-slate-900 text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-cyan-600 transition-all"
                  >
                    Thêm
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 min-h-[40px] p-3 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  {specsList.length === 0 && <span className="text-slate-400 text-xs italic">Chưa có thông số nào...</span>}
                  {specsList.map((spec, index) => (
                    <div key={index} className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm group animate-in fade-in slide-in-from-bottom-1">
                      <span className="text-sm font-medium text-slate-700">{spec}</span>
                      <button
                        type="button"
                        onClick={() => removeSpec(index)}
                        className="text-slate-400 hover:text-red-500 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Mô tả chi tiết</label>
                <RichTextEditor
                  value={formData.content}
                  onChange={(content) => setFormData({ ...formData, content })}
                  placeholder="Nhập mô tả chi tiết sản phẩm..."
                />
              </div>

              <div className="pt-4 flex gap-4 sticky bottom-0 bg-white pb-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-6 py-3 border border-slate-200 rounded-xl font-bold hover:bg-slate-50 transition-colors">Hủy</button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex-1 px-6 py-3 text-white rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2 ${isSubmitting ? 'bg-slate-400 cursor-not-allowed' : 'bg-cyan-600 hover:bg-cyan-700 shadow-cyan-200'
                    }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Đang lưu...
                    </>
                  ) : 'Lưu sản phẩm'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
