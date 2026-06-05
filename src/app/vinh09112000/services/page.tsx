"use client";

import React, { useState, useEffect } from 'react';
import { convertToSlug } from '@/lib/utils';
import Toast from '@/components/admin/Toast';

export default function AdminServices() {
  const [services, setServices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);
  const [serviceToDelete, setServiceToDelete] = useState<string | null>(null);
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error' | 'info'} | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    content: '',
    icon: 'monitor',
    price: '',
    color: 'cyan',
    template: 'cleaning',
    contentJson: '',
    order: 0
  });

  const [promoConfig, setPromoConfig] = useState({
    show: false,
    title: '',
    description: '',
    hours: 2,
    minutes: 14,
    seconds: 55,
    buttonText: 'NHẬN ƯU ĐÃI',
    buttonLink: 'https://zalo.me/0877023032'
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/services', { cache: 'no-store' });
      if (res.ok) {
        setServices(await res.json());
      }
    } catch (error) {
      console.error('Lỗi khi tải dịch vụ:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (service: any) => {
    setEditingService(service);

    let promo = {
      show: false,
      title: '',
      description: '',
      hours: 2,
      minutes: 14,
      seconds: 55,
      buttonText: 'NHẬN ƯU ĐÃI',
      buttonLink: 'https://zalo.me/0877023032'
    };

    if (service.contentJson && typeof service.contentJson === 'object') {
      if (service.contentJson.promo) {
        promo = { ...promo, ...service.contentJson.promo };
      }
    }
    setPromoConfig(promo);

    setFormData({
      title: service.title,
      slug: service.slug,
      description: service.description || '',
      content: service.content || '',
      icon: service.icon || 'monitor',
      price: service.price || '',
      color: service.color || 'cyan',
      template: service.template || 'cleaning',
      contentJson: service.contentJson ? JSON.stringify(service.contentJson, null, 2) : '',
      order: service.order || 0
    });
    setIsModalOpen(true);
  };

  const handleAddClick = () => {
    setEditingService(null);
    setPromoConfig({
      show: false,
      title: '',
      description: '',
      hours: 2,
      minutes: 14,
      seconds: 55,
      buttonText: 'NHẬN ƯU ĐÃI',
      buttonLink: 'https://zalo.me/0877023032'
    });
    setFormData({
      title: '', slug: '', description: '', content: '', icon: 'monitor', price: '', color: 'cyan', template: 'cleaning', contentJson: '', order: 0
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/services/${id}`, { method: 'DELETE' });
      const data = await res.json();
      
      if (res.ok) {
        setNotification({ message: 'Đã xóa dịch vụ thành công!', type: 'success' });
        fetchServices();
      } else {
        setNotification({ message: 'Lỗi: ' + (data.error || 'Không thể xóa dịch vụ'), type: 'error' });
      }
    } catch (error) {
      console.error('Lỗi khi xóa dịch vụ:', error);
      setNotification({ message: 'Lỗi kết nối khi xóa dịch vụ', type: 'error' });
    } finally {
      setServiceToDelete(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingService ? `/api/services/${editingService.id}` : '/api/services';
    const method = editingService ? 'PATCH' : 'POST';
    
    let parsedJson: any = {};
    if (formData.contentJson) {
      try {
        parsedJson = JSON.parse(formData.contentJson);
      } catch (e) {
        setNotification({ message: 'Lỗi: Nội dung JSON không hợp lệ. Vui lòng kiểm tra lại!', type: 'error' });
        return;
      }
    }

    const finalJson = {
      ...parsedJson,
      promo: promoConfig
    };

    const payload = { ...formData, contentJson: finalJson };

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (res.ok) {
        setNotification({ 
          message: editingService ? 'Đã cập nhật dịch vụ thành công!' : 'Đã thêm dịch vụ mới thành công!', 
          type: 'success' 
        });
        setIsModalOpen(false);
        setEditingService(null);
        setPromoConfig({
          show: false,
          title: '',
          description: '',
          hours: 2,
          minutes: 14,
          seconds: 55,
          buttonText: 'NHẬN ƯU ĐÃI',
          buttonLink: 'https://zalo.me/0877023032'
        });
        setFormData({
          title: '', slug: '', description: '', content: '', icon: 'monitor', price: '', color: 'cyan', template: 'cleaning', contentJson: '', order: 0
        });
        fetchServices();
      } else {
        const errorData = await res.json();
        setNotification({ message: 'Lỗi: ' + (errorData.error || 'Không thể lưu'), type: 'error' });
      }
    } catch (error) {
      setNotification({ message: 'Lỗi kết nối', type: 'error' });
    }
  };

  if (isLoading) return <div className="p-8 text-center text-slate-500 font-bold">Đang tải dữ liệu...</div>;

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
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Quản lý dịch vụ</h1>
          <p className="text-slate-500">Chỉnh sửa các gói dịch vụ hiển thị trên trang chủ và trang dịch vụ.</p>
        </div>
        <button 
          onClick={handleAddClick}
          className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-cyan-200"
        >
          + Thêm dịch vụ
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-sm uppercase font-bold tracking-wider">
                <th className="px-6 py-4">Thứ tự</th>
                <th className="px-6 py-4">Dịch vụ</th>
                <th className="px-6 py-4">Mô tả ngắn</th>
                <th className="px-6 py-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {services.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-400 italic">Chưa có dịch vụ nào. Hãy thêm mới!</td>
                </tr>
              ) : (
                services.map((service) => (
                  <tr key={service.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-slate-400">{service.order}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white bg-cyan-500`}>
                          {service.title.charAt(0)}
                        </div>
                        <div className="font-bold text-slate-900">{service.title}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500 max-w-md truncate">{service.description}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          type="button"
                          onClick={() => handleEdit(service)} 
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 00-2 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        </button>
                        <button 
                          type="button"
                          onClick={() => setServiceToDelete(service.id)} 
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {serviceToDelete && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl animate-in fade-in zoom-in duration-200 text-center">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Xác nhận xóa?</h3>
            <p className="text-slate-500 mb-8">Hành động này không thể hoàn tác. Bạn có chắc chắn muốn xóa dịch vụ này không?</p>
            <div className="flex gap-3">
              <button onClick={() => setServiceToDelete(null)} className="flex-1 px-6 py-3 border border-slate-200 rounded-xl font-bold hover:bg-slate-50 transition-colors">Hủy</button>
              <button onClick={() => handleDelete(serviceToDelete)} className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-200">Xóa ngay</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-900">{editingService ? 'Sửa dịch vụ' : 'Thêm dịch vụ mới'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Tên dịch vụ *</label>
                  <input required type="text" value={formData.title} onChange={e => {
                    const title = e.target.value;
                    setFormData({...formData, title, slug: convertToSlug(title)});
                  }} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Slug *</label>
                  <input required type="text" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-500 outline-none transition-all font-mono text-sm" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Mô tả ngắn</label>
                <textarea rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-500 outline-none transition-all" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Giao diện (Template) *</label>
                  <select value={formData.template} onChange={e => setFormData({...formData, template: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-500 outline-none transition-all bg-white">
                    <option value="cleaning">Mẫu Vệ sinh máy tính</option>
                    <option value="software">Mẫu Cài đặt phần mềm</option>
                    <option value="onsite">Mẫu Sửa tận nơi</option>
                    <option value="online">Mẫu Sửa online</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Màu sắc chủ đạo</label>
                  <select value={formData.color} onChange={e => setFormData({...formData, color: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-500 outline-none transition-all bg-white">
                    <option value="cyan">Xanh lơ (Cyan)</option>
                    <option value="blue">Xanh biển (Blue)</option>
                    <option value="emerald">Xanh lá (Emerald)</option>
                    <option value="purple">Tím (Purple)</option>
                    <option value="rose">Hồng (Rose)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Giá hiển thị (Ví dụ: Từ 200.000đ)</label>
                  <input type="text" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Thứ tự hiển thị</label>
                  <input type="number" value={formData.order} onChange={e => setFormData({...formData, order: Number(e.target.value)})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-500 outline-none transition-all" />
                </div>
              </div>

              {/* Cấu hình Banner Ưu đãi */}
              <div className="border-t border-slate-100 pt-6">
                <h3 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
                  Cấu hình Banner Ưu đãi (Khuyến mãi)
                </h3>
                
                <div className="flex items-center gap-2 mb-4">
                  <input 
                    type="checkbox" 
                    id="showPromo" 
                    checked={promoConfig.show} 
                    onChange={e => setPromoConfig({...promoConfig, show: e.target.checked})}
                    className="w-5 h-5 text-cyan-600 rounded border-slate-300 focus:ring-cyan-500 cursor-pointer"
                  />
                  <label htmlFor="showPromo" className="text-sm font-semibold text-slate-700 cursor-pointer select-none">Hiển thị banner ưu đãi trên trang dịch vụ này</label>
                </div>

                {promoConfig.show && (
                  <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-200/60 animate-in fade-in duration-200 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1">Tiêu đề ưu đãi</label>
                        <input 
                          type="text" 
                          value={promoConfig.title} 
                          onChange={e => setPromoConfig({...promoConfig, title: e.target.value})} 
                          placeholder="Ví dụ: ƯU ĐÃI THÁNG 6 RỰC RỠ" 
                          className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-cyan-500 outline-none bg-white font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1">Mô tả ưu đãi ngắn</label>
                        <input 
                          type="text" 
                          value={promoConfig.description} 
                          onChange={e => setPromoConfig({...promoConfig, description: e.target.value})} 
                          placeholder="Ví dụ: Giảm ngay 50k khi đặt lịch vệ sinh Combo 2 máy trở lên!" 
                          className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-cyan-500 outline-none bg-white font-medium"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1">Giờ đếm ngược</label>
                        <input 
                          type="number" 
                          min={0} 
                          value={promoConfig.hours} 
                          onChange={e => setPromoConfig({...promoConfig, hours: Number(e.target.value)})} 
                          className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-cyan-500 outline-none bg-white font-mono font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1">Phút đếm ngược</label>
                        <input 
                          type="number" 
                          min={0} 
                          max={59} 
                          value={promoConfig.minutes} 
                          onChange={e => setPromoConfig({...promoConfig, minutes: Number(e.target.value)})} 
                          className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-cyan-500 outline-none bg-white font-mono font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1">Giây đếm ngược</label>
                        <input 
                          type="number" 
                          min={0} 
                          max={59} 
                          value={promoConfig.seconds} 
                          onChange={e => setPromoConfig({...promoConfig, seconds: Number(e.target.value)})} 
                          className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-cyan-500 outline-none bg-white font-mono font-medium"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1">Chữ trên nút</label>
                        <input 
                          type="text" 
                          value={promoConfig.buttonText} 
                          onChange={e => setPromoConfig({...promoConfig, buttonText: e.target.value})} 
                          placeholder="NHẬN ƯU ĐÃI"
                          className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-cyan-500 outline-none bg-white font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1">Đường dẫn khi click nút</label>
                        <input 
                          type="text" 
                          value={promoConfig.buttonLink} 
                          onChange={e => setPromoConfig({...promoConfig, buttonLink: e.target.value})} 
                          placeholder="Ví dụ: https://zalo.me/..."
                          className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-cyan-500 outline-none bg-white font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Dữ liệu chi tiết (Định dạng JSON)
                  <span className="ml-2 text-xs font-normal text-slate-500">Chứa thông tin Bảng giá, Quy trình...</span>
                </label>
                <textarea 
                  rows={8} 
                  value={formData.contentJson} 
                  onChange={e => setFormData({...formData, contentJson: e.target.value})} 
                  placeholder="{\n  &quot;process&quot;: [],\n  &quot;pricing&quot;: []\n}"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-500 outline-none transition-all font-mono text-sm bg-slate-50" 
                />
              </div>

              <div className="pt-4 flex gap-4 sticky bottom-0 bg-white pb-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-6 py-3 border border-slate-200 rounded-xl font-bold hover:bg-slate-50 transition-colors">Hủy</button>
                <button type="submit" className="flex-1 px-6 py-3 bg-cyan-600 text-white rounded-xl font-bold hover:bg-cyan-700 transition-all shadow-lg shadow-cyan-200">Lưu dịch vụ</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
