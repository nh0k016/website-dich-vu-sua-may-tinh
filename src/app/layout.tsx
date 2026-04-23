import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ["vietnamese", "latin"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Fast Fix - Sửa máy tính Online",
  description: "Dịch vụ sửa chữa máy tính trực tuyến, nhanh chóng, chuyên nghiệp.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${roboto.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-cyan-500/30">
        <CartProvider>
          <Header />
          <main className="flex-1 flex flex-col">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
