"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Toast from '@/components/admin/Toast';

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [orderToDelete, setOrderToDelete] = useState<string | null>(null);
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  
  // Search state
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/orders');
      if (res.ok) {
        setOrders(await res.json());
      }
    } catch (error) {
      console.error('Lỗi khi tải đơn hàng:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter orders by phone or name
  const filteredOrders = useMemo(() => {
    if (!searchTerm) return orders;
    const term = searchTerm.toLowerCase();
    return orders.filter(o => 
      o.phone.includes(term) || 
      o.name.toLowerCase().includes(term) ||
      o.id.toLowerCase().includes(term)
    );
  }, [orders, searchTerm]);

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        fetchOrders();
        setNotification({ message: 'Cập nhật trạng thái thành công!', type: 'success' });
        if (selectedOrder?.id === id) {
          setSelectedOrder({...selectedOrder, status});
        }
      } else {
        const errorData = await res.json();
        setNotification({ message: 'Lỗi: ' + (errorData.error || 'Không thể cập nhật'), type: 'error' });
      }
    } catch (error) {
      console.error('Lỗi PATCH:', error);
      setNotification({ message: 'Lỗi kết nối server', type: 'error' });
    }
  };

  const handleDeleteOrder = async (id: string) => {
    try {
      const res = await fetch(`/api/orders/${id}`, { method: 'DELETE' });
      const data = await res.json();
      
      if (res.ok) {
        setNotification({ message: 'Đã xóa đơn hàng thành công!', type: 'success' });
        setSelectedOrder(null);
        fetchOrders();
      } else {
        setNotification({ message: 'Lỗi: ' + (data.error || 'Không thể xóa đơn hàng'), type: 'error' });
      }
    } catch (error) {
      console.error('Lỗi khi xóa đơn hàng:', error);
      setNotification({ message: 'Lỗi kết nối khi xóa đơn hàng', type: 'error' });
    } finally {
      setOrderToDelete(null);
    }
  };

  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'pending': return 'bg-orange-100 text-orange-600 border-orange-200';
      case 'paid': return 'bg-green-100 text-green-600 border-green-200';
      case 'completed': return 'bg-cyan-100 text-cyan-600 border-cyan-200';
      case 'cancelled': return 'bg-red-100 text-red-600 border-red-200';
      default: return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case 'pending': return 'Chờ xử lý';
      case 'paid': return 'Đã thanh toán';
      case 'completed': return 'Hoàn tất';
      case 'cancelled': return 'Đã hủy';
      default: return status;
    }
  };

  if (isLoading) return <div className="p-8 text-center text-slate-500 font-bold">Đang tải dữ liệu đơn hàng...</div>;

  return (
    <div className="space-y-8 relative">
      {notification && (
        <Toast 
          message={notification.message} 
          type={notification.type} 
          onClose={() => setNotification(null)} 
        />
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Quản lý đơn hàng</h1>
          <p className="text-slate-500">Xem chi tiết và cập nhật trạng thái đơn hàng.</p>
        </div>
        
        {/* Search Bar */}
        <div className="relative w-full md:max-w-xs">
          <input 
            type="text" 
            placeholder="Tìm theo SĐT hoặc Tên..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-sm font-medium"
          />
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Orders List */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-sm uppercase font-bold tracking-wider">
                    <th className="px-6 py-4">Mã đơn</th>
                    <th className="px-6 py-4">Khách hàng</th>
                    <th className="px-6 py-4">Tổng tiền</th>
                    <th className="px-6 py-4">Trạng thái</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredOrders.length > 0 ? filteredOrders.map((order) => (
                    <tr 
                      key={order.id} 
                      onClick={() => setSelectedOrder(order)}
                      className={`cursor-pointer transition-colors ${selectedOrder?.id === order.id ? 'bg-cyan-50' : 'hover:bg-slate-50'}`}
                    >
                      <td className="px-6 py-4 font-mono text-xs text-slate-400">#{order.id.slice(-6).toUpperCase()}</td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-900">{order.name}</div>
                        <div className="text-xs text-slate-500">{order.phone}</div>
                      </td>
                      <td className="px-6 py-4 font-black text-slate-900">{order.totalPrice.toLocaleString('vi-VN')}đ</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${getStatusStyle(order.status)}`}>
                          {getStatusText(order.status)}
                        </span>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={4} className="px-6 py-20 text-center text-slate-400 italic">Không tìm thấy đơn hàng phù hợp</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="lg:col-span-5">
          {selectedOrder ? (
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm sticky top-8">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Chi tiết đơn hàng</h2>
                  <p className="text-xs text-slate-400 font-mono mt-1">#{selectedOrder.id.toUpperCase()}</p>
                </div>
                <span className={`px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${getStatusStyle(selectedOrder.status)}`}>
                  {getStatusText(selectedOrder.status)}
                </span>
              </div>
              
              <div className="space-y-8">
                <div className="bg-slate-50 p-6 rounded-2xl space-y-3 text-sm border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-slate-400 shadow-sm">👤</div>
                    <span className="font-bold text-slate-900">{selectedOrder.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-slate-400 shadow-sm">📞</div>
                    <span className="font-bold text-slate-900">{selectedOrder.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-slate-400 shadow-sm">📍</div>
                    <span className="font-bold text-slate-900">{selectedOrder.address}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
                    Danh sách sản phẩm
                  </h3>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item: any) => (
                      <div key={item.id} className="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-50 shadow-sm text-sm">
                        <div className="flex-1">
                          <p className="font-bold text-slate-900">{item.product.name}</p>
                          <p className="text-xs text-slate-500">SL: {item.quantity} x {item.price.toLocaleString('vi-VN')}đ</p>
                        </div>
                        <div className="font-bold text-cyan-600">{(item.quantity * item.price).toLocaleString('vi-VN')}đ</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <div className="flex justify-between items-center mb-8">
                    <span className="text-slate-500 font-bold uppercase text-xs tracking-widest">Tổng tiền thanh toán</span>
                    <span className="text-3xl font-black text-orange-600">{selectedOrder.totalPrice.toLocaleString('vi-VN')}đ</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <button 
                      onClick={() => updateStatus(selectedOrder.id, 'paid')}
                      className={`py-3 rounded-xl text-xs font-bold transition-all border ${selectedOrder.status === 'paid' ? 'bg-green-600 text-white border-green-700 shadow-lg shadow-green-100' : 'bg-green-50 text-green-600 border-green-100 hover:bg-green-100'}`}
                    >
                      Đã thanh toán
                    </button>
                    <button 
                      onClick={() => updateStatus(selectedOrder.id, 'completed')}
                      className={`py-3 rounded-xl text-xs font-bold transition-all border ${selectedOrder.status === 'completed' ? 'bg-cyan-600 text-white border-cyan-700 shadow-lg shadow-cyan-100' : 'bg-cyan-50 text-cyan-600 border-cyan-100 hover:bg-cyan-100'}`}
                    >
                      Hoàn tất
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => updateStatus(selectedOrder.id, 'cancelled')}
                      className={`py-3 rounded-xl text-xs font-bold transition-all border ${selectedOrder.status === 'cancelled' ? 'bg-red-600 text-white border-red-700 shadow-lg shadow-red-100' : 'bg-red-50 text-red-600 border-red-100 hover:bg-red-100'}`}
                    >
                      Hủy đơn hàng
                    </button>
                    <button 
                      onClick={() => setOrderToDelete(selectedOrder.id)}
                      className="py-3 bg-white text-slate-400 rounded-xl text-xs font-bold hover:bg-slate-900 hover:text-white transition-all border border-slate-200"
                    >
                      Xóa vĩnh viễn
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-slate-400 p-12 border-2 border-dashed border-slate-200 rounded-[40px] bg-slate-50/50">
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-xl mb-6 animate-bounce">📦</div>
              <p className="font-black text-slate-900 mb-2">Chưa chọn đơn hàng</p>
              <p className="text-sm text-slate-400 text-center max-w-[200px]">Hãy chọn một đơn hàng ở danh sách bên trái để xử lý</p>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {orderToDelete && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <div className="bg-white rounded-[40px] p-10 max-w-sm w-full shadow-2xl animate-in fade-in zoom-in duration-200 text-center">
            <div className="w-20 h-20 bg-red-100 text-red-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">Xác nhận xóa?</h3>
            <p className="text-slate-500 mb-8 leading-relaxed">Hành động này sẽ xóa vĩnh viễn đơn hàng khỏi cơ sở dữ liệu và không thể hoàn tác.</p>
            <div className="flex gap-4">
              <button onClick={() => setOrderToDelete(null)} className="flex-1 px-6 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-colors">Hủy</button>
              <button onClick={() => handleDeleteOrder(orderToDelete)} className="flex-1 px-6 py-4 bg-red-600 text-white rounded-2xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-200">Xóa ngay</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
