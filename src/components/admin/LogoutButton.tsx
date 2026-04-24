"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    if (window.confirm('Bạn có muốn đăng xuất không?')) {
      try {
        const res = await fetch('/api/admin/logout', { method: 'POST' });
        if (res.ok) {
          router.push('/admin/login');
          router.refresh();
        }
      } catch (error) {
        alert('Lỗi khi đăng xuất');
      }
    }
  };

  return (
    <button 
      onClick={handleLogout}
      className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-all group mt-2"
    >
      <svg className="w-5 h-5 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
      Đăng xuất
    </button>
  );
}
