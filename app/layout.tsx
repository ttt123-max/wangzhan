import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '法治先锋 · 科小獬',
  description: '以科小獬 IP 为核心的全场景网信普法网站'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
