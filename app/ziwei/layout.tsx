import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "紫微斗数 · Zi Wei | 窥",
  description: "十二宫命盘，星辰定位，中国星象命理术。",
};

export default function ZiweiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="theme-ziwei relative">
      {/* 星光背景 */}
      <div className="tarot-stars" style={{ opacity: 0.7 }} />
      <header className="relative z-10 w-full py-5 px-6 md:px-12 flex items-center justify-between border-b border-[var(--ziwei-purple)]/20">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm hover:text-[var(--ziwei-gold)] transition-colors"
          style={{ fontFamily: "'Noto Serif SC', serif" }}
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
          返回
        </Link>
        <div className="flex items-baseline gap-3">
          <span
            className="text-2xl md:text-3xl"
            style={{
              fontFamily: "'Cinzel', 'Noto Serif SC', serif",
              color: "var(--ziwei-gold)",
            }}
          >
            紫微
          </span>
          <span
            className="text-xs tracking-[0.3em] opacity-60"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            ZI WEI DOU SHU
          </span>
        </div>
      </header>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
