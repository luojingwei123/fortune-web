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
          className="text-sm md:text-base leading-loose opacity-90 space-y-3"
          style={{ fontFamily: "'Noto Serif SC', serif" }}
        >
          <p>· 请先静心片刻，把你想问的事清晰地放在心里。</p>
          <p>· 系统会代你连续掷 6 次铜钱，从初爻到上爻依次成卦。</p>
          <p>
            · 三阳为老阳（动，变阴）、三阴为老阴（动，变阳），其余为静爻。
          </p>
          <p>· 断卦时会给出本卦、变卦、动爻、世应、用神与吉凶综合。</p>
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
