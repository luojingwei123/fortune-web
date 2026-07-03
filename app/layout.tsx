import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "四种传承术数，一次娱乐体验 · Fortune",
  description: "塔罗 · 梅花易数 · 六爻 · 紫微斗数。四种传承术数，一次娱乐体验。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
