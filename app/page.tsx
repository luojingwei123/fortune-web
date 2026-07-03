import Link from "next/link";
import { Sparkles, Flower2, Coins, Star } from "lucide-react";

const methods = [
  {
    key: "meihua",
    name: "梅花易数",
    subtitle: "Meihua Yi",
    desc: "一花一世界，起卦即断",
    href: "/meihua",
    icon: Flower2,
    accent: "from-stone-500 to-stone-700",
    status: "available",
  },
  {
    key: "liuyao",
    name: "六爻起卦",
    subtitle: "Liu Yao",
    desc: "三枚铜钱，六次摇卦",
    href: "/liuyao",
    icon: Coins,
    accent: "from-slate-700 to-slate-900",
    status: "available",
  },
  {
    key: "ziwei",
    name: "紫微斗数",
    subtitle: "Zi Wei",
    desc: "十二宫命盘，星辰定位",
    href: "/ziwei",
    icon: Star,
    accent: "from-violet-900 to-slate-950",
    status: "available",
  },
  {
    key: "tarot",
    name: "塔罗牌",
    subtitle: "Tarot",
    desc: "78 张韦特塔罗，抽一张问一次心",
    href: "/tarot",
    icon: Sparkles,
    accent: "from-purple-900 to-indigo-950",
    status: "available",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full py-6 px-6 md:px-12 flex items-center justify-between border-b border-[var(--border-home)]">
        <div className="flex items-baseline gap-2">
          <span
            className="text-2xl md:text-3xl font-semibold tracking-wide"
            style={{ fontFamily: "'Noto Serif SC', serif" }}
          >
            窥
          </span>
          <span
            className="text-xs md:text-sm tracking-[0.3em] text-[var(--ink-muted)]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            FORTUNE
          </span>
        </div>
        <div className="text-xs text-[var(--ink-muted)] tracking-widest hidden sm:block">
          仅供娱乐参考
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center px-6 py-12 md:py-24">
        <section className="max-w-2xl text-center mb-16 md:mb-24">
          <h1
            className="text-4xl md:text-6xl font-normal leading-tight mb-6 tracking-wide"
            style={{ fontFamily: "'Noto Serif SC', serif" }}
          >
            四种传承术数
            <br />
            <span className="text-[var(--accent-red)]">一次娱乐体验</span>
          </h1>
          <p
            className="text-sm md:text-base text-[var(--ink-soft)] tracking-widest"
            style={{ fontFamily: "'Noto Serif SC', serif" }}
          >
            梅花易 · 六爻 · 紫微斗数 · 塔罗
          </p>
        </section>

        {/* Methods Grid */}
        <section className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {methods.map((m) => {
            const Icon = m.icon;
            const disabled = m.status === "coming";
            const card = (
              <div
                className={`group relative overflow-hidden rounded-lg border border-[var(--border-home)] bg-white hover:bg-[var(--bg-home-alt)] transition-all duration-300 aspect-[3/4] flex flex-col justify-between p-6 ${
                  disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer hover:-translate-y-1 hover:shadow-lg"
                }`}
              >
                {/* Number */}
                <div
                  className="text-[10px] tracking-[0.3em] text-[var(--ink-muted)]"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {String(methods.indexOf(m) + 1).padStart(2, "0")}
                </div>

                {/* Icon */}
                <div className="flex-1 flex items-center justify-center">
                  <Icon
                    className="w-10 h-10 md:w-12 md:h-12 text-[var(--ink)] group-hover:text-[var(--accent-red)] transition-colors"
                    strokeWidth={1.2}
                  />
                </div>

                {/* Text */}
                <div>
                  <div
                    className="text-lg md:text-xl font-medium mb-1"
                    style={{ fontFamily: "'Noto Serif SC', serif" }}
                  >
                    {m.name}
                  </div>
                  <div
                    className="text-[10px] tracking-[0.2em] text-[var(--ink-muted)] mb-3"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {m.subtitle.toUpperCase()}
                  </div>
                  <div className="text-xs text-[var(--ink-soft)] leading-relaxed">
                    {m.desc}
                  </div>
                </div>

                {/* Status badge */}
                {disabled && (
                  <div className="absolute top-4 right-4 text-[10px] tracking-widest text-[var(--ink-muted)] border border-[var(--border-home)] px-2 py-0.5 rounded">
                    敬请期待
                  </div>
                )}
              </div>
            );
            return disabled ? (
              <div key={m.key}>{card}</div>
            ) : (
              <Link key={m.key} href={m.href}>
                {card}
              </Link>
            );
          })}
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 px-6 md:px-12 border-t border-[var(--border-home)] text-xs text-[var(--ink-muted)] text-center leading-relaxed">
        <div>本站所有算命方式均为传统术数文化展示 · 仅供娱乐参考</div>
        <div className="mt-1">不构成任何指导意见 · 请理性对待</div>
      </footer>
    </div>
  );
}
