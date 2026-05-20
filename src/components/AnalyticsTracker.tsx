"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Không track các trang admin
    if (pathname?.startsWith('/vinh09112000')) {
      return;
    }

    const trackPageView = async () => {
      try {
        // Lấy hoặc tạo visitorId
        let visitorId = localStorage.getItem('fastfix_visitor_id');
        if (!visitorId) {
          visitorId = 'visitor_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
          localStorage.setItem('fastfix_visitor_id', visitorId);
        }

        const url = pathname || '/';
        const referrer = document.referrer;

        await fetch('/api/analytics', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url, referrer, visitorId }),
        });
      } catch (error) {
        console.error('Lỗi theo dõi lượt truy cập:', error);
      }
    };

    // Timeout nhỏ để đảm bảo trang đã render xong
    const timeoutId = setTimeout(trackPageView, 500);

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return null; // Component ẩn, không render giao diện
}
