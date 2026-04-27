"use client";

import React, { useState, useEffect } from 'react';
import Toast from '@/components/admin/Toast';

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [orderToDelete, setOrderToDelete] = useState<string | null>(null);
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);

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

      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Quản lý đơn hàng</h1>
        <p className="text-slate-500">Xem chi tiết và cập nhật trạng thái đơn hàng của khách hàng.</p>
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
                  {orders.map((order) => (
                    <tr 
                      key={order.id} 
                      onClick={() => setSelectedOrder(order)}
                      className={`cursor-pointer transition-colors ${selectedOrder?.id === order.id ? 'bg-cyan-50' : 'hover:bg-slate-50'}`}
                    >
                      <td className="px-6 py-4 font-mono text-sm text-slate-500">#{order.id.slice(-6).toUpperCase()}</td>
                      <td className="px-6 py-4 font-bold text-slate-900">{order.name}</td>
                      <td className="px-6 py-4 font-bold text-slate-900">{order.totalPrice.toLocaleString('vi-VN')}đ</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                          order.status === 'pending' ? 'bg-orange-100 text-orange-600' : 
                          order.status === 'completed' ? 'bg-green-100 text-green-600' :
                          order.status === 'paid' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {order.status === 'pending' ? 'Chờ xử lý' : 
                           order.status === 'completed' ? 'Hoàn tất' :
                           order.status === 'paid' ? 'Đã thanh toán' : order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="lg:col-span-5">
          {selectedOrder ? (
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm sticky top-8">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-xl font-bold text-slate-900">Chi tiết đơn hàng</h2>
                <span className="font-mono text-slate-500 text-xs">#{selectedOrder.id.toUpperCase()}</span>
              </div>
              
              <div className="space-y-6">
                <div className="bg-slate-50 p-4 rounded-2xl space-y-2 text-sm">
                  <p><span className="text-slate-500">Khách hàng:</span> <span className="font-bold text-slate-900">{selectedOrder.name}</span></p>
                  <p><span className="text-slate-500">SĐT:</span> <span className="font-bold text-slate-900">{selectedOrder.phone}</span></p>
                  <p><span className="text-slate-500">Địa chỉ:</span> <span className="font-bold text-slate-900">{selectedOrder.address}</span></p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Sản phẩm</h3>
                  {selectedOrder.items.map((item: any) => (
                    <div key={item.id} className="flex justify-between items-center border-b border-slate-100 pb-2 text-sm">
                      <div className="flex-1">
                        <p className="font-bold text-slate-900">{item.product.name}</p>
                        <p className="text-xs text-slate-500">SL: {item.quantity} x {item.price.toLocaleString('vi-VN')}đ</p>
                      </div>
                      <div className="font-bold text-cyan-600">{(item.quantity * item.price).toLocaleString('vi-VN')}đ</div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-slate-900 font-bold">Tổng cộng:</span>
                    <span className="text-2xl font-black text-orange-600">{selectedOrder.totalPrice.toLocaleString('vi-VN')}đ</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <button 
                      onClick={() => updateStatus(selectedOrder.id, 'paid')}
                      className={`py-2.5 rounded-xl text-xs font-bold transition-all ${selectedOrder.status === 'paid' ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}
                    >
                      Đã thanh toán
                    </button>
                    <button 
                      onClick={() => updateStatus(selectedOrder.id, 'completed')}
                      className={`py-2.5 rounded-xl text-xs font-bold transition-all ${selectedOrder.status === 'completed' ? 'bg-green-600 text-white' : 'bg-green-50 text-green-600 hover:bg-green-100'}`}
                    >
                      Hoàn tất
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => setOrderToDelete(selectedOrder.id)}
                    className="w-full py-2.5 bg-red-50 text-red-600 rounded-xl text-xs font-bold hover:bg-red-600 hover:text-white transition-all border border-red-100 shadow-sm"
                  >
                    Xóa đơn hàng này
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 p-12 border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50">
              <svg className="w-16 h-16 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 00-2 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
              <p className="font-medium">Chọn một đơn hàng để xem chi tiết</p>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {orderToDelete && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl animate-in fade-in zoom-in duration-200 text-center">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Xác nhận xóa đơn hàng?</h3>
            <p className="text-slate-500 mb-8 text-sm">Dữ liệu đơn hàng này sẽ bị xóa vĩnh viễn khỏi hệ thống.</p>
            <div className="flex gap-3">
              <button onClick={() => setOrderToDelete(null)} className="flex-1 px-6 py-3 border border-slate-200 rounded-xl font-bold hover:bg-slate-50 transition-colors">Hủy</button>
              <button onClick={() => handleDeleteOrder(orderToDelete)} className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-200">Xóa đơn</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
