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
  metadataBase: new URL('https://fastfix.vercel.app'),
  title: {
    default: "FastFix - Sửa máy tính Online & Tận nơi chuyên nghiệp",
    template: "%s | FastFix"
  },
  description: "Dịch vụ sửa chữa máy tính trực tuyến, cài đặt phần mềm, vệ sinh laptop và cứu hộ máy tính tận nơi nhanh chóng trong 30 phút.",
  keywords: ["sửa máy tính online", "sửa laptop tận nơi", "cài win tại nhà", "vệ sinh máy tính", "fastfix", "sửa máy tính tphcm"],
  authors: [{ name: "FastFix Team" }],
  creator: "FastFix",
  publisher: "FastFix",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: 'https://fastfix.vercel.app',
    siteName: 'FastFix',
    title: 'FastFix - Dịch vụ sửa máy tính Online & Tận nơi',
    description: 'Chuyên sửa chữa PC, Laptop, cài đặt phần mềm và cứu hộ máy tính từ xa uy tín hàng đầu.',
    images: [
      {
        url: '/icon.png',
        width: 1200,
        height: 630,
        alt: 'FastFix Service',
      },
    ],
  },
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
