"use client";

import React, { useState, useEffect } from 'react';

export default function AnalyticsTab() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const res = await fetch('/api/vinh09112000/analytics');
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu phân tích:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchAnalytics();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"></div>
      </div>
    );
  }

  if (!data) return <div className="text-center text-slate-500 py-10">Không có dữ liệu phân tích</div>;

  const maxViews = Math.max(...data.dailyChartData.map((d: any) => d.pageViews), 1);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm flex flex-col items-start">
          <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
          </div>
          <p className="text-sm font-bold text-slate-400 mb-1 uppercase tracking-wider">Lượt xem trang (30 ngày)</p>
          <p className="text-3xl font-black text-slate-900">{data.overview.totalPageViews30d.toLocaleString('vi-VN')}</p>
        </div>

        <div className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm flex flex-col items-start">
          <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 mb-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          </div>
          <p className="text-sm font-bold text-slate-400 mb-1 uppercase tracking-wider">Khách truy cập (30 ngày)</p>
          <p className="text-3xl font-black text-slate-900">{data.overview.totalVisitors30d.toLocaleString('vi-VN')}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden p-8">
        <h2 className="text-xl font-black text-slate-900 mb-6">Lưu lượng 30 ngày qua</h2>
        
        <div className="h-64 flex items-end gap-1 md:gap-2">
          {data.dailyChartData.map((day: any, i: number) => {
            const heightPercent = maxViews > 0 ? (day.pageViews / maxViews) * 100 : 0;
            const dateObj = new Date(day.date);
            const displayDate = `${dateObj.getDate()}/${dateObj.getMonth() + 1}`;
            
            return (
              <div key={i} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                {/* Tooltip */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-12 bg-slate-900 text-white text-xs py-1.5 px-3 rounded-lg whitespace-nowrap pointer-events-none z-10 shadow-lg">
                  <p className="font-bold mb-0.5">{displayDate}</p>
                  <p className="text-slate-300">{day.pageViews} lượt xem</p>
                  <p className="text-slate-300">{day.visitors} khách</p>
                  {/* Mũi tên tooltip */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
                </div>
                
                {/* Thanh cột */}
                <div 
                  className="w-full bg-cyan-100 group-hover:bg-cyan-500 rounded-t-sm transition-colors duration-300"
                  style={{ height: `${Math.max(heightPercent, 2)}%` }} // Tối thiểu 2% để luôn thấy cột
                ></div>
                
                {/* Nhãn ngày (chỉ hiện một số ngày để không bị rối) */}
                {(i % 5 === 0 || i === data.dailyChartData.length - 1) && (
                  <div className="absolute -bottom-6 text-[10px] font-medium text-slate-400">
                    {displayDate}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="mt-8 text-center flex items-center justify-center gap-4 text-sm text-slate-500 font-medium">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-cyan-500 rounded-sm"></div> Lượt xem trang
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Pages */}
        <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-8 border-b border-slate-100">
            <h2 className="text-xl font-black text-slate-900">Trang xem nhiều nhất</h2>
            <p className="text-sm text-slate-500 mt-1">Các liên kết thu hút nhất</p>
          </div>
          <div className="overflow-x-auto p-2">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">Đường dẫn</th>
                  <th className="px-6 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider text-right border-b border-slate-100">Lượt xem</th>
                  <th className="px-6 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider text-right border-b border-slate-100">Khách</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {data.topPages.map((page: any, i: number) => (
                  <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-sm text-slate-900 truncate max-w-[200px] md:max-w-[300px]" title={page.url}>
                        {page.url}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="font-black text-slate-900">{page.pageViews}</div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="font-medium text-slate-500">{page.visitors}</div>
                    </td>
                  </tr>
                ))}
                {data.topPages.length === 0 && (
                  <tr><td colSpan={3} className="p-10 text-center text-slate-400 italic">Chưa có dữ liệu</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Referrers */}
        <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-8 border-b border-slate-100">
            <h2 className="text-xl font-black text-slate-900">Nguồn truy cập</h2>
            <p className="text-sm text-slate-500 mt-1">Khách hàng đến từ đâu</p>
          </div>
          <div className="overflow-x-auto p-2">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">Nguồn</th>
                  <th className="px-6 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider text-right border-b border-slate-100">Lượt xem</th>
                  <th className="px-6 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider text-right border-b border-slate-100">Khách</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {data.topReferrers.map((ref: any, i: number) => (
                  <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4 flex items-center gap-3">
                      {/* Biểu tượng phụ thuộc vào nguồn */}
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 text-slate-500">
                        {ref.referrer.includes('google') ? 'G' : ref.referrer.includes('facebook') ? 'f' : '🔗'}
                      </div>
                      <div className="font-medium text-sm text-slate-900 truncate max-w-[150px] md:max-w-[250px]" title={ref.referrer}>
                        {ref.referrer}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="font-black text-slate-900">{ref.pageViews}</div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="font-medium text-slate-500">{ref.visitors}</div>
                    </td>
                  </tr>
                ))}
                {data.topReferrers.length === 0 && (
                  <tr><td colSpan={3} className="p-10 text-center text-slate-400 italic">Chưa có dữ liệu</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
