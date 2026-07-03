import Link from "next/link";
import { Sparkles, Flower2, Coins, Star } from "lucide-react";

const methods = [
  {
    key: "meihua",
    name: "梅花易数",
    subtitle: "Meihua Yi",
    desc: "根据时间 / 数字 / 文字算命",
    href: "/meihua",
    icon: Flower2,
    status: "available",
  },
  {
    key: "liuyao",
    name: "六爻起卦",
    subtitle: "Liu Yao",
    desc: "三枚铜钱，六次摇卦",
    href: "/liuyao",
    icon: Coins,
    status: "available",
  },
  {
    key: "ziwei",
    name: "紫微斗数",
    subtitle: "Zi Wei",
    desc: "根据出生年月日算命",
    href: "/ziwei",
    icon: Star,
    status: "available",
  },
  {
    key: "tarot",
    name: "塔罗牌",
    subtitle: "Tarot",
    desc: "78 张韦特塔罗，抽一张问一次心",
    href: "/tarot",
    icon: Sparkles,
    status: "available",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full py-3 md:py-6 px-5 md:px-12 flex items-center justify-between border-b border-[var(--border-home)]">
        <div className="flex items-baseline gap-2">
          <span
            className="text-xl md:text-3xl font-semibold tracking-wide"
            style={{ fontFamily: "'Noto Serif SC', serif" }}
          >
            窥
          </span>
          <span
            className="text-[10px] md:text-sm tracking-[0.3em] text-[var(--ink-muted)]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            FORTUNE
          </span>
        </div>
        <div className="text-[10px] md:text-xs text-[var(--ink-muted)] tracking-widest">
          仅供娱乐参考
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center px-4 md:px-6 py-5 md:py-24">
        <section className="max-w-2xl text-center mb-6 md:mb-24 mt-2 md:mt-0">
          <h1
            className="text-2xl md:text-6xl font-normal leading-tight mb-2 md:mb-6 tracking-wide"
            style={{ fontFamily: "'Noto Serif SC', serif" }}
          >
            四种传承术数
            <span className="hidden md:inline">
              <br />
            </span>
            <span className="md:hidden"> · </span>
            <span className="text-[var(--accent-red)]">一次娱乐体验</span>
          </h1>
          <p
            className="text-[11px] md:text-base text-[var(--ink-soft)] tracking-widest"
            style={{ fontFamily: "'Noto Serif SC', serif" }}
          >
            梅花易 · 六爻 · 紫微斗数 · 塔罗
          </p>
        </section>

        {/* Methods Grid */}
        <section className="w-full max-w-5xl grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {methods.map((m, idx) => {
            const Icon = m.icon;
            const disabled = m.status === "coming";
            return (
              <Link
                key={m.key}
                href={disabled ? "#" : m.href}
                className={`group relative overflow-hidden rounded-lg border border-[var(--border-home)] bg-white transition-all duration-300 flex flex-col justify-between p-4 md:p-6 lg:aspect-[3/4] ${
                  disabled
                    ? "opacity-60 pointer-events-none"
                    : "hover:bg-[var(--bg-home-alt)] active:bg-[var(--bg-home-alt)] hover:-translate-y-1 hover:shadow-lg"
                }`}
                aria-disabled={disabled}
              >
                {/* Number（右上角，避免占空间） */}
                <div
                  className="absolute top-2.5 md:top-4 right-2.5 md:right-4 text-[9px] md:text-[10px] tracking-[0.3em] text-[var(--ink-muted)]"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {String(idx + 1).padStart(2, "0")}
                </div>

                {/* Icon */}
                <div className="flex-1 flex items-center justify-center py-2 md:py-4">
                  <Icon
                    className="w-8 h-8 md:w-12 md:h-12 text-[var(--ink)] group-hover:text-[var(--accent-red)] transition-colors"
                    strokeWidth={1.2}
                  />
                </div>

                {/* Text */}
                <div>
                  <div
                    className="text-sm md:text-xl font-medium mb-0.5 md:mb-1"
                    style={{ fontFamily: "'Noto Serif SC', serif" }}
                  >
                    {m.name}
                  </div>
                  <div
                    className="text-[9px] md:text-[10px] tracking-[0.2em] text-[var(--ink-muted)] mb-1.5 md:mb-3"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {m.subtitle.toUpperCase()}
                  </div>
                  <div className="text-[11px] md:text-xs text-[var(--ink-soft)] leading-relaxed">
                    {m.desc}
                  </div>
                </div>

                {/* Status badge */}
                {disabled && (
                  <div className="absolute top-2 right-2 md:top-4 md:right-4 text-[9px] md:text-[10px] tracking-widest text-[var(--ink-muted)] border border-[var(--border-home)] px-1.5 py-0.5 rounded">
                    敬请期待
                  </div>
                )}
              </Link>
            );
          })}
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-3 md:py-6 px-5 md:px-12 border-t border-[var(--border-home)] text-[10px] md:text-xs text-[var(--ink-muted)] text-center leading-relaxed">
        <div>本站为传统术数文化展示 · 仅供娱乐参考</div>
        <div className="mt-0.5 hidden md:block">不构成任何指导意见 · 请理性对待</div>
      </footer>
    </div>
  );
}
