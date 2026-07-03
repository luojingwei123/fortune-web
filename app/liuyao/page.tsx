"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Coins } from "lucide-react";

export default function LiuyaoIntro() {
  const router = useRouter();
  const [question, setQuestion] = useState("");

  const handleStart = () => {
    const q = question.trim();
    router.push(`/liuyao/cast${q ? `?q=${encodeURIComponent(q)}` : ""}`);
  };

  return (
    <main className="max-w-3xl mx-auto px-6 md:px-12 py-10 md:py-16">
      {/* 标题 */}
      <section className="text-center mb-12 md:mb-16">
        <div
          className="text-xs tracking-[0.4em] mb-3 opacity-50"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: "var(--liuyao-bronze)",
          }}
        >
          — LIU YAO DIVINATION —
        </div>
        <h1
          className="text-4xl md:text-6xl mb-4"
          style={{
            fontFamily: "'ZCOOL XiaoWei', 'Noto Serif SC', serif",
            color: "var(--liuyao-bronze)",
          }}
        >
          六爻问卜
        </h1>
        <p
          className="text-sm md:text-base opacity-80 leading-loose max-w-lg mx-auto"
          style={{ fontFamily: "'Noto Serif SC', serif" }}
        >
          三枚铜钱掷六次，从下往上排列成卦。
          <br />
          周易占卜之本源，一次摇动六个变数。
        </p>
      </section>

      {/* 说明 */}
      <section
        className="mb-10 md:mb-14 p-6 md:p-8 rounded-lg border border-[var(--liuyao-bronze)]/25 bg-[rgba(176,141,87,0.05)]"
      >
        <div
          className="text-xs tracking-[0.3em] mb-3"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: "var(--liuyao-bronze)",
          }}
        >
          ABOUT THIS METHOD
        </div>
        <div
          className="text-sm md:text-[15px] leading-loose opacity-95 space-y-2.5"
          style={{ fontFamily: "'Noto Serif SC', serif" }}
        >
          <p>
            <span style={{ color: "var(--liuyao-bronze)" }}>六爻</span>是周易占卜最主流的方法，又称“铜钱占卦”。变式于西汉京房易，衍发于宋明清历代易学流传，直至今日仍是民间最为广泛使用的周易占卒方法。
          </p>
          <p>
            <span style={{ color: "var(--liuyao-bronze)" }}>起卦方式</span>：取三枚铜钱（古时用乾隆/康熙通宝，现代可用三枚一元硬币）。将铜钱捕于掌心，心中想好所问之事，掷向桌面 —— 这就是初爻。共携 6 次，从下往上依次记为初、二、三、四、五、上爻。
          </p>
          <p>每一爻的记录法则：</p>
          <div className="pl-2 opacity-95 text-[13px] md:text-sm space-y-1">
            <p>· 3 枚均字 → <span style={{ color: "var(--liuyao-bronze)" }}>老阳 ○</span>（阳爻，动，阳变阴）</p>
            <p>· 2 字 1 背 → 少阳（阳爻，静）</p>
            <p>· 1 字 2 背 → 少阴（阴爻，静）</p>
            <p>· 3 枚均背 → <span style={{ color: "var(--liuyao-bronze)" }}>老阴 ×</span>（阴爻，动，阴变阳）</p>
          </div>
          <p>
            <span style={{ color: "var(--liuyao-bronze)" }}>断卦依据</span>：本卦、变卦、动爻位置、世应关系（京房八宫定位），配合周易本义卦辞与象曰综合判断。
          </p>
          <p className="opacity-70 text-xs md:text-sm pt-1">
            本站代你自动掷 6 次。请先静心片刻，把你想问的事清晰地放在心里。
          </p>
        </div>
      </section>

      {/* 问题输入 */}
      <section className="mb-10 md:mb-14">
        <div className="flex items-center gap-3 mb-4">
          <span
            className="w-8 h-8 flex items-center justify-center rounded-full border text-sm"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: "var(--liuyao-bronze)",
              borderColor: "var(--liuyao-bronze)",
            }}
          >
            1
          </span>
          <h2
            className="text-lg md:text-xl"
            style={{ fontFamily: "'Noto Serif SC', serif" }}
          >
            心中一个问题
            <span className="text-xs opacity-60 ml-3">（可选，但强烈建议）</span>
          </h2>
        </div>

        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="例如：这个投资该不该出手？两人的缘分还在吗？"
          rows={3}
          maxLength={200}
          className="w-full bg-[rgba(255,255,255,0.03)] border border-[var(--liuyao-bronze)]/25 focus:border-[var(--liuyao-bronze)] rounded p-4 text-sm md:text-base outline-none transition-colors resize-none"
          style={{
            fontFamily: "'Noto Serif SC', serif",
            color: "var(--liuyao-ink)",
          }}
        />
      </section>

      {/* 开始 */}
      <section className="flex flex-col items-center gap-4">
        <button
          onClick={handleStart}
          className="inline-flex items-center gap-2 px-7 py-3 rounded font-medium transition-all duration-200 hover:brightness-110 hover:-translate-y-0.5"
          style={{
            background:
              "linear-gradient(135deg, var(--liuyao-bronze) 0%, var(--liuyao-bronze-soft) 100%)",
            color: "#0F1A24",
            border: "1px solid var(--liuyao-bronze)",
          }}
        >
          <Coins className="w-4 h-4" strokeWidth={1.5} />
          <span
            style={{ fontFamily: "'ZCOOL XiaoWei', 'Noto Serif SC', serif" }}
          >
            开始摇卦
          </span>
        </button>
        <div
          className="text-xs opacity-50 mt-2 max-w-md text-center leading-relaxed"
          style={{ fontFamily: "'Noto Serif SC', serif" }}
        >
          结果仅供娱乐参考 · 请理性对待
        </div>
      </section>
    </main>
  );
}
