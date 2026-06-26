import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({ subsets: ['latin', 'vietnamese'], variable: '--font-playfair', display: 'swap' });
const inter = Inter({ subsets: ['latin', 'vietnamese'], variable: '--font-inter', display: 'swap' });

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000');

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: 'SpiceHome — Trợ lý ảo 24/7',
  description: 'Trợ lý ảo của SpiceHome — hỗ trợ khách lưu trú 24/7. SpiceHome virtual assistant for guests.',
  icons: {
    icon: [
      { url: '/logo/favicon.svg', type: 'image/svg+xml' },
      { url: '/logo/favicon-64.png', sizes: '64x64', type: 'image/png' },
    ],
    apple: { url: '/logo/apple-touch-icon.png' },
    shortcut: '/logo/favicon-64.png',
  },
  openGraph: {
    title: 'SpiceHome — Trợ lý ảo 24/7',
    description: 'Hỏi chúng mình bất cứ điều gì · Ask us anything · 24/7',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: 'SpiceHome — Trợ lý ảo 24/7' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${playfair.variable} ${inter.variable}`}>
      <body style={{ margin: 0, fontFamily: 'Inter, sans-serif' }}>{children}</body>
    </html>
  );
}
