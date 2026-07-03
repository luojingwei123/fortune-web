import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "梅花易数 · Meihua Yi | 窥",
  description: "宋代邵雍所创，取数即卦，一花一世界。",
};

export default function MeihuaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="theme-meihua">
      <header className="relative z-10 w-full py-5 px-6 md:px-12 flex items-center justify-between border-b border-[var(--meihua-border)]">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm hover:text-[var(--meihua-red)] transition-colors"
          style={{ fontFamily: "'Noto Serif SC', serif" }}
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
          返回
        </Link>
        <div className="flex items-baseline gap-3">
          <span
            className="text-2xl md:text-3xl"
            style={{
              fontFamily: "'Ma Shan Zheng', 'Noto Serif SC', serif",
              color: "var(--meihua-red)",
            }}
          >
            梅花
          </span>
          <span
            className="text-xs tracking-[0.3em] opacity-70"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            MEIHUA YI
          </span>
        </div>
      </header>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
