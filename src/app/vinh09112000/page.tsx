"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AnalyticsTab from '@/components/AnalyticsTab';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    completedOrders: 0,
    totalBookings: 0,
    pendingBookings: 0
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [ordersRes, bookingsRes] = await Promise.all([
          fetch('/api/orders'),
          fetch('/api/bookings')
        ]);

        let ordersData = [];
        let bookingsData = [];

        if (ordersRes.ok) {
          ordersData = await ordersRes.json();
          setRecentOrders(ordersData.slice(0, 5));
        }

        if (bookingsRes.ok) {
          bookingsData = await bookingsRes.json();
          setRecentBookings(bookingsData.slice(0, 5));
        }

        const totalRevenue = ordersData.reduce((acc: number, order: any) => acc + order.totalPrice, 0);
        const pendingOrders = ordersData.filter((o: any) => o.status === 'pending').length;
        const completedOrders = ordersData.filter((o: any) => o.status === 'completed' || o.status === 'paid').length;
        const pendingBookings = bookingsData.filter((b: any) => b.status === 'pending').length;

        setStats({
          totalOrders: ordersData.length,
          totalRevenue,
          pendingOrders,
          completedOrders,
          totalBookings: bookingsData.length,
          pendingBookings
        });

      } catch (error) {
        console.error('Lỗi khi tải dữ liệu dashboard:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 md:space-y-10 max-w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="break-words">
          <h1 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">Dashboard</h1>
          <p className="text-sm md:text-base text-slate-500 leading-relaxed mt-1">Chào mừng trở lại! Dưới đây là tổng quan hoạt động của FastFix.</p>
        </div>
        
        {/* Tabs */}
        <div className="flex p-1 bg-slate-200/50 rounded-2xl w-fit">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'overview' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}
          >
            Tổng quan
          </button>
          <button 
            onClick={() => setActiveTab('analytics')}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'analytics' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}
          >
            Phân tích truy cập
          </button>
        </div>
      </div>
      
      {activeTab === 'overview' ? (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {/* Revenue Card */}
            <div className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm flex flex-col items-start hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <p className="text-sm font-bold text-slate-400 mb-1 uppercase tracking-wider">Doanh thu</p>
              <p className="text-2xl font-black text-slate-900">{stats.totalRevenue.toLocaleString('vi-VN')}đ</p>
            </div>
            
            {/* Orders Card */}
            <Link href="/vinh09112000/orders" className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm flex flex-col items-start hover:shadow-md transition-all hover:-translate-y-1">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
              </div>
              <p className="text-sm font-bold text-slate-400 mb-1 uppercase tracking-wider">Đơn hàng</p>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-black text-slate-900">{stats.totalOrders}</p>
                {stats.pendingOrders > 0 && <span className="text-xs font-black text-orange-500 bg-orange-50 px-2 py-0.5 rounded-full">{stats.pendingOrders} mới</span>}
              </div>
            </Link>
            
            {/* Bookings Card */}
            <Link href="/vinh09112000/bookings" className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm flex flex-col items-start hover:shadow-md transition-all hover:-translate-y-1">
              <div className="w-12 h-12 bg-violet-100 rounded-2xl flex items-center justify-center text-violet-600 mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
              <p className="text-sm font-bold text-slate-400 mb-1 uppercase tracking-wider">Đặt lịch sửa</p>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-black text-slate-900">{stats.totalBookings}</p>
                {stats.pendingBookings > 0 && <span className="text-xs font-black text-cyan-500 bg-cyan-50 px-2 py-0.5 rounded-full">{stats.pendingBookings} mới</span>}
              </div>
            </Link>
            
            {/* Completed Card */}
            <div className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm flex flex-col items-start">
              <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <p className="text-sm font-bold text-slate-400 mb-1 uppercase tracking-wider">Đã hoàn tất</p>
              <p className="text-2xl font-black text-slate-900">{stats.completedOrders}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Recent Orders */}
            <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
              <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                <h2 className="text-xl font-black text-slate-900">Đơn hàng mới</h2>
                <Link href="/vinh09112000/orders" className="text-blue-600 text-sm font-bold hover:underline">Tất cả</Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <tbody className="divide-y divide-slate-100">
                    {recentOrders.length > 0 ? recentOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-8 py-5">
                          <div className="font-bold text-slate-900">{order.name}</div>
                          <div className="text-xs text-slate-400 font-mono mt-0.5">#{order.id.slice(-6).toUpperCase()}</div>
                        </td>
                        <td className="px-8 py-5">
                          <div className="font-black text-slate-900">{order.totalPrice.toLocaleString('vi-VN')}đ</div>
                          <div className="text-[10px] text-slate-400 uppercase font-bold">{order.paymentMethod}</div>
                        </td>
                        <td className="px-8 py-5 text-right">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                            order.status === 'pending' ? 'bg-orange-100 text-orange-600' : 
                            order.status === 'completed' || order.status === 'paid' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {order.status === 'pending' ? 'Chờ' : order.status === 'paid' ? 'Đã trả' : 'Xong'}
                          </span>
                        </td>
                      </tr>
                    )) : (
                      <tr><td className="p-10 text-center text-slate-400 italic">Chưa có đơn hàng nào</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
              <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                <h2 className="text-xl font-black text-slate-900">Yêu cầu sửa máy mới</h2>
                <Link href="/vinh09112000/bookings" className="text-violet-600 text-sm font-bold hover:underline">Tất cả</Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <tbody className="divide-y divide-slate-100">
                    {recentBookings.length > 0 ? recentBookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-8 py-5">
                          <div className="font-bold text-slate-900">{booking.name}</div>
                          <div className="text-xs text-slate-400 mt-0.5">{booking.phone}</div>
                        </td>
                        <td className="px-8 py-5">
                          <div className="text-sm font-bold text-slate-700">{booking.serviceName}</div>
                          <div className="text-[10px] text-slate-400 font-medium">{new Date(booking.createdAt).toLocaleDateString('vi-VN')}</div>
                        </td>
                        <td className="px-8 py-5 text-right">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                            booking.status === 'pending' ? 'bg-cyan-100 text-cyan-600' : 
                            booking.status === 'confirmed' ? 'bg-blue-100 text-blue-600' :
                            booking.status === 'completed' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
                          }`}>
                            {booking.status === 'pending' ? 'Mới' : booking.status === 'confirmed' ? 'Đã nhận' : booking.status === 'completed' ? 'Xong' : 'Hủy'}
                          </span>
                        </td>
                      </tr>
                    )) : (
                      <tr><td className="p-10 text-center text-slate-400 italic">Chưa có yêu cầu nào</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      ) : (
        <AnalyticsTab />
      )}
    </div>
  );
}
