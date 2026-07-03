import type { Metadata } from "next";
import "./globals.css";
import HydrationDebug from "@/components/HydrationDebug";

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@300;400;500;600;700;900&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Ma+Shan+Zheng&family=ZCOOL+XiaoWei&family=Cinzel:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <HydrationDebug />
        {children}
      </body>
    </html>
  );
}
