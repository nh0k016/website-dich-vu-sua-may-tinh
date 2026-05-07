"use client";

import React from 'react';
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import FloatingContact from "@/components/FloatingContact";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/vinh09112000');

  return (
    <>
      {!isAdminPage && (
        <>
          <ScrollToTop />
          <FloatingContact />
          <Header />
        </>
      )}
      
      <main className="flex-1 flex flex-col">
        {children}
      </main>

      {!isAdminPage && <Footer />}
    </>
  );
}
