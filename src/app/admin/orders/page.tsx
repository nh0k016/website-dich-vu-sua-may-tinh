"use client";

import React, { useState, useEffect } from 'react';

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

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
        if (selectedOrder?.id === id) {
          setSelectedOrder({...selectedOrder, status});
        }
      } else {
        const errorData = await res.json();
        alert('Lỗi: ' + (errorData.error || 'Không thể cập nhật trạng thái'));
      }
    } catch (error) {
      console.error('Lỗi PATCH:', error);
      alert('Lỗi kết nối server');
    }
  };

  const deleteOrder = async (id: string) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa đơn hàng này không? Hành động này không thể hoàn tác.')) return;
    
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setSelectedOrder(null);
        fetchOrders();
      } else {
        alert('Lỗi khi xóa đơn hàng');
      }
    } catch (error) {
      alert('Lỗi kết nối server');
    }
  };

  if (isLoading) return <div className="p-8 text-center">Đang tải...</div>;

  return (
    <div className="space-y-8">
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
                <span className="font-mono text-slate-500">#{selectedOrder.id.toUpperCase()}</span>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">Thông tin khách hàng</h3>
                  <div className="bg-slate-50 p-4 rounded-2xl space-y-2">
                    <p><span className="text-slate-500">Họ tên:</span> <span className="font-bold text-slate-900">{selectedOrder.name}</span></p>
                    <p><span className="text-slate-500">SĐT:</span> <span className="font-bold text-slate-900">{selectedOrder.phone}</span></p>
                    {selectedOrder.email && <p><span className="text-slate-500">Email:</span> <span className="font-bold text-slate-900">{selectedOrder.email}</span></p>}
                    <p><span className="text-slate-500">Địa chỉ:</span> <span className="font-bold text-slate-900">{selectedOrder.address}</span></p>
                    {selectedOrder.notes && <p><span className="text-slate-500">Ghi chú:</span> <span className="font-bold text-slate-900">{selectedOrder.notes}</span></p>}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">Sản phẩm</h3>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item: any) => (
                      <div key={item.id} className="flex justify-between items-center border-b border-slate-100 pb-2">
                        <div className="flex-1">
                          <p className="font-bold text-slate-900 text-sm">{item.product.name}</p>
                          <p className="text-xs text-slate-500">SL: {item.quantity} x {item.price.toLocaleString('vi-VN')}đ</p>
                        </div>
                        <div className="font-bold text-cyan-600">{(item.quantity * item.price).toLocaleString('vi-VN')}đ</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-slate-900 font-bold">Tổng cộng:</span>
                    <span className="text-2xl font-black text-orange-600">{selectedOrder.totalPrice.toLocaleString('vi-VN')}đ</span>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">Cập nhật trạng thái</h3>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <button 
                        onClick={() => updateStatus(selectedOrder.id, 'paid')}
                        className={`py-2 rounded-xl text-xs font-bold transition-all ${selectedOrder.status === 'paid' ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}
                      >
                        Đã thanh toán
                      </button>
                      <button 
                        onClick={() => updateStatus(selectedOrder.id, 'completed')}
                        className={`py-2 rounded-xl text-xs font-bold transition-all ${selectedOrder.status === 'completed' ? 'bg-green-600 text-white' : 'bg-green-50 text-green-600 hover:bg-green-100'}`}
                      >
                        Hoàn tất
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => deleteOrder(selectedOrder.id)}
                      className="w-full py-2 rounded-xl text-xs font-bold bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all border border-red-100"
                    >
                      Xóa đơn hàng này
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[300px] border-2 border-dashed border-slate-200 rounded-3xl flex items-center justify-center text-slate-400 font-medium italic">
              Chọn một đơn hàng để xem chi tiết
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
