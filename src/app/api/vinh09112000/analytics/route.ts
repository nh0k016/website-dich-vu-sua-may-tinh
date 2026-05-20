import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    // 1. Lấy dữ liệu 30 ngày gần nhất
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentViews = await prisma.pageView.findMany({
      where: {
        createdAt: {
          gte: thirtyDaysAgo,
        }
      },
      select: {
        createdAt: true,
        visitorId: true,
        url: true,
        referrer: true
      },
      orderBy: {
        createdAt: 'asc'
      }
    });

    // 2. Phân tích và gom nhóm dữ liệu
    const dailyStats: Record<string, { pageViews: number, visitors: Set<string> }> = {};
    const topUrlsMap: Record<string, { pageViews: number, visitors: Set<string> }> = {};
    const topReferrersMap: Record<string, { pageViews: number, visitors: Set<string> }> = {};

    recentViews.forEach(view => {
      // Chuỗi ngày dạng YYYY-MM-DD
      const dateStr = view.createdAt.toISOString().split('T')[0];
      
      // Nhóm theo ngày
      if (!dailyStats[dateStr]) {
        dailyStats[dateStr] = { pageViews: 0, visitors: new Set() };
      }
      dailyStats[dateStr].pageViews++;
      dailyStats[dateStr].visitors.add(view.visitorId);

      // Nhóm theo URL
      if (!topUrlsMap[view.url]) {
        topUrlsMap[view.url] = { pageViews: 0, visitors: new Set() };
      }
      topUrlsMap[view.url].pageViews++;
      topUrlsMap[view.url].visitors.add(view.visitorId);

      // Nhóm theo Nguồn (Referrer)
      const ref = view.referrer || 'Direct';
      if (!topReferrersMap[ref]) {
        topReferrersMap[ref] = { pageViews: 0, visitors: new Set() };
      }
      topReferrersMap[ref].pageViews++;
      topReferrersMap[ref].visitors.add(view.visitorId);
    });

    // 3. Chuẩn bị định dạng trả về cho Frontend
    
    // Đảm bảo có đủ 30 ngày ngay cả khi ngày đó không có lượt xem
    const dailyChartData = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      
      if (dailyStats[dateStr]) {
        dailyChartData.push({
          date: dateStr,
          pageViews: dailyStats[dateStr].pageViews,
          visitors: dailyStats[dateStr].visitors.size
        });
      } else {
        dailyChartData.push({
          date: dateStr,
          pageViews: 0,
          visitors: 0
        });
      }
    }

    const topPages = Object.keys(topUrlsMap).map(url => ({
      url,
      pageViews: topUrlsMap[url].pageViews,
      visitors: topUrlsMap[url].visitors.size
    })).sort((a, b) => b.pageViews - a.pageViews).slice(0, 15);

    const topReferrers = Object.keys(topReferrersMap).map(referrer => ({
      referrer,
      pageViews: topReferrersMap[referrer].pageViews,
      visitors: topReferrersMap[referrer].visitors.size
    })).sort((a, b) => b.pageViews - a.pageViews).slice(0, 15);

    // 4. Tổng quan 30 ngày
    const totalVisitors30d = new Set(recentViews.map(v => v.visitorId)).size;
    const totalPageViews30d = recentViews.length;

    return NextResponse.json({
      overview: {
        totalPageViews30d,
        totalVisitors30d,
      },
      dailyChartData,
      topPages,
      topReferrers
    });
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu thống kê:', error);
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
  }
}
