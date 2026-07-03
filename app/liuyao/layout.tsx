import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "六爻 · Liu Yao | 窥",
  description: "三枚铜钱，六次摇卦，周易本源。",
};

export default function LiuyaoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="theme-liuyao">
      <header className="relative z-10 w-full py-5 px-6 md:px-12 flex items-center justify-between border-b border-[var(--liuyao-bronze)]/20">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm hover:text-[var(--liuyao-bronze)] transition-colors"
          style={{ fontFamily: "'Noto Serif SC', serif" }}
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
          返回
        </Link>
        <div className="flex items-baseline gap-3">
          <span
            className="text-2xl md:text-3xl"
            style={{
              fontFamily: "'ZCOOL XiaoWei', 'Noto Serif SC', serif",
              color: "var(--liuyao-bronze)",
            }}
          >
            六爻
          </span>
          <span
            className="text-xs tracking-[0.3em] opacity-60"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            LIU YAO
          </span>
        </div>
      </header>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
