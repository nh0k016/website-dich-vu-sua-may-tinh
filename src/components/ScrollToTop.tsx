"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Tắt cơ chế tự động ghi nhớ vị trí cuộn của trình duyệt
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Đợi một nhịp cực ngắn để trang mới render xong rồi mới cuộn
    const timer = setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'auto'
      });
    }, 0);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
