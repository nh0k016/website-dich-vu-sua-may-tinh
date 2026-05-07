"use client";

import React, { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    completedOrders: 0
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/orders');
        if (res.ok) {
          const orders = await res.json();
          
          const totalRevenue = orders.reduce((acc: number, order: any) => acc + order.totalPrice, 0);
          const pending = orders.filter((o: any) => o.status === 'pending').length;
          const completed = orders.filter((o: any) => o.status === 'completed' || o.status === 'paid').length;
          
          setStats({
            totalOrders: orders.length,
            totalRevenue,
            pendingOrders: pending,
            completedOrders: completed
          });
          
          setRecentOrders(orders.slice(0, 5));
        }
      } catch (error) {
        console.error('Lỗi khi tải thống kê:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 md:space-y-8 max-w-full">
      <div className="break-words">
        <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Dashboard</h1>
        <p className="text-sm md:text-base text-slate-500 leading-relaxed">Chào mừng trở lại, đây là thống kê tình hình kinh doanh của FastFix.</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-white p-5 md:p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-start">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-cyan-100 rounded-2xl flex items-center justify-center text-cyan-600 mb-4">
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <p className="text-xs md:text-sm font-semibold text-slate-500 mb-1">Tổng doanh thu</p>
          <p className="text-xl md:text-2xl font-black text-slate-900">{stats.totalRevenue.toLocaleString('vi-VN')}đ</p>
        </div>
        
        <div className="bg-white p-5 md:p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-start">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-4">
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
          </div>
          <p className="text-xs md:text-sm font-semibold text-slate-500 mb-1">Tổng đơn hàng</p>
          <p className="text-xl md:text-2xl font-black text-slate-900">{stats.totalOrders}</p>
        </div>
        
        <div className="bg-white p-5 md:p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-start">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 mb-4">
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <p className="text-xs md:text-sm font-semibold text-slate-500 mb-1">Chờ xử lý</p>
          <p className="text-xl md:text-2xl font-black text-slate-900">{stats.pendingOrders}</p>
        </div>
        
        <div className="bg-white p-5 md:p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-start">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 mb-4">
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <p className="text-xs md:text-sm font-semibold text-slate-500 mb-1">Đã hoàn tất</p>
          <p className="text-xl md:text-2xl font-black text-slate-900">{stats.completedOrders}</p>
        </div>
      </div>
      
      {/* Recent Orders Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-900">Đơn hàng gần đây</h2>
          <button className="text-cyan-600 font-bold hover:text-cyan-700 transition-colors">Xem tất cả</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-sm uppercase tracking-wider font-bold">
                <th className="px-6 py-4">Mã đơn</th>
                <th className="px-6 py-4">Khách hàng</th>
                <th className="px-6 py-4">Tổng tiền</th>
                <th className="px-6 py-4">Trạng thái</th>
                <th className="px-6 py-4">Ngày đặt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-mono text-sm text-slate-500">#{order.id.slice(-6).toUpperCase()}</td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900">{order.name}</div>
                    <div className="text-xs text-slate-500">{order.phone}</div>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-900">{order.totalPrice.toLocaleString('vi-VN')}đ</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      order.status === 'pending' ? 'bg-orange-100 text-orange-600' : 
                      order.status === 'completed' ? 'bg-green-100 text-green-600' :
                      order.status === 'paid' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {order.status === 'pending' ? 'Chờ xử lý' : 
                       order.status === 'completed' ? 'Hoàn tất' :
                       order.status === 'paid' ? 'Đã thanh toán' : order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-sm">
                    {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
