import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "塔罗牌 · Tarot | 窥",
  description: "78 张韦特塔罗，抽一张问一次心。",
};

export default function TarotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="theme-tarot relative">
      <div className="tarot-stars" />
      <header className="relative z-10 w-full py-5 px-6 md:px-12 flex items-center justify-between border-b border-[rgba(212,175,55,0.15)]">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-[var(--tarot-ink)] hover:gold transition-colors"
          style={{ fontFamily: "'Noto Serif SC', serif" }}
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
          返回
        </Link>
        <div
          className="flex items-baseline gap-3"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          <span className="text-xl md:text-2xl gold italic">Tarot</span>
          <span
            className="text-xs tracking-[0.3em] text-[var(--tarot-ink)] opacity-70"
            style={{ fontFamily: "'Noto Serif SC', serif" }}
          >
            塔罗
          </span>
        </div>
      </header>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
