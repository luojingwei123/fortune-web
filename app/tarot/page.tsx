"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { spreads } from "@/data/spreads";
import { Sparkles } from "lucide-react";

export default function TarotIntro() {
  const router = useRouter();
  const [spreadKey, setSpreadKey] = useState<string>("three");
  const [question, setQuestion] = useState("");

  const handleStart = () => {
    const q = question.trim();
    const url = `/tarot/draw?spread=${spreadKey}${q ? `&q=${encodeURIComponent(q)}` : ""}`;
    router.push(url);
  };

  return (
    <main className="max-w-4xl mx-auto px-6 md:px-12 py-10 md:py-16">
      {/* 标题 */}
      <section className="text-center mb-10 md:mb-14">
        <div
          className="text-xs tracking-[0.4em] gold mb-4"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          — TAROT DIVINATION —
        </div>
        <h1
          className="text-4xl md:text-6xl mb-6 font-light tracking-wider"
          style={{ fontFamily: "'Noto Serif SC', serif" }}
        >
          <span className="gold">窥</span>牌问心
        </h1>
        <p
          className="text-sm md:text-base opacity-80 leading-relaxed max-w-lg mx-auto"
          style={{ fontFamily: "'Noto Serif SC', serif" }}
        >
          塔罗牌不是预言未来，而是让你与内心对话。
          <br />
          静下心，想一个问题，选一个牌阵。
        </p>
      </section>

      {/* 说明：什么是塔罗 · 如何抽牌 */}
      <section
        className="mb-10 md:mb-14 p-5 md:p-7 rounded-lg border"
        style={{
          borderColor: "rgba(212,175,55,0.2)",
          background: "rgba(212,175,55,0.03)",
        }}
      >
        <div
          className="text-xs gold tracking-[0.3em] mb-3"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          ABOUT THIS METHOD
        </div>
        <div
          className="text-sm md:text-[15px] opacity-90 leading-loose space-y-2"
          style={{ fontFamily: "'Noto Serif SC', serif" }}
        >
          <p>
            <span className="gold">塔罗牌</span>起源于中世纪欧洲，现代流行的是 1909 年英国玩具商 Rider、作者 Waite、插画师 Smith 合作设计的 <span className="italic gold">Rider-Waite-Smith</span> 牌组，共 78 张（大阿卡纳 22 张 + 小阿卡纳 56 张 · 权杖/圣杯/宝剑/星币四花色）。
          </p>
          <p>
            本站塔罗的抽牌方式：
          </p>
          <ol className="list-decimal list-inside space-y-1 pl-2 opacity-95">
            <li>你选择一个牌阵（单张 / 三张 / 凯尔特十字），写下心中的问题。</li>
            <li>系统完全洗牌（Fisher-Yates 随机打乱 78 张），将牌扇开铺在你面前。</li>
            <li>你凭直觉选择相应数量的牌。每张牌有 50% 概率为逆位（牌面倒置，含义与正位相反）。</li>
            <li>根据牌意 + 正逆位 + 你选的牌阵位置含义，给出完整解读。</li>
          </ol>
        </div>
      </section>

      {/* Step 1: 选牌阵 */}
      <section className="mb-10 md:mb-14">
        <div className="flex items-center gap-3 mb-6">
          <span
            className="w-8 h-8 flex items-center justify-center rounded-full border border-[var(--tarot-gold)] gold text-sm"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            1
          </span>
          <h2
            className="text-lg md:text-xl"
            style={{ fontFamily: "'Noto Serif SC', serif" }}
          >
            选择一个牌阵
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {spreads.map((s) => {
            const selected = spreadKey === s.key;
            return (
              <button
                key={s.key}
                onClick={() => setSpreadKey(s.key)}
                className={`text-left p-5 md:p-6 rounded-lg border transition-all duration-300 ${
                  selected
                    ? "border-[var(--tarot-gold)] bg-[rgba(212,175,55,0.06)] shadow-[0_0_20px_rgba(212,175,55,0.15)]"
                    : "border-[rgba(212,175,55,0.2)] hover:border-[rgba(212,175,55,0.5)] bg-[rgba(255,255,255,0.02)]"
                }`}
              >
                <div className="flex items-baseline justify-between mb-2">
                  <span
                    className="text-lg md:text-xl"
                    style={{ fontFamily: "'Noto Serif SC', serif" }}
                  >
                    {s.name}
                  </span>
                  <span
                    className="text-xs gold opacity-70"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {s.count} 张
                  </span>
                </div>
                <div
                  className="text-xs gold opacity-80 mb-3 tracking-widest"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {s.nameEn}
                </div>
                <div className="text-xs md:text-sm opacity-75 mb-2">
                  {s.desc}
                </div>
                <div className="text-[11px] opacity-50 leading-relaxed">
                  {s.layoutHint}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Step 2: 输入问题 */}
      <section className="mb-10 md:mb-14">
        <div className="flex items-center gap-3 mb-6">
          <span
            className="w-8 h-8 flex items-center justify-center rounded-full border border-[var(--tarot-gold)] gold text-sm"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            2
          </span>
          <h2
            className="text-lg md:text-xl"
            style={{ fontFamily: "'Noto Serif SC', serif" }}
          >
            心中一个问题
            <span
              className="text-xs opacity-60 ml-3"
              style={{ fontFamily: "'Noto Serif SC', serif" }}
            >
              （可选）
            </span>
          </h2>
        </div>

        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="例如：我该不该接受这份新工作？我和 TA 之间会有转机吗？"
          rows={3}
          maxLength={200}
          className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(212,175,55,0.2)] focus:border-[var(--tarot-gold)] rounded-lg p-4 text-sm md:text-base outline-none transition-colors resize-none"
          style={{ fontFamily: "'Noto Serif SC', serif" }}
        />
        <div className="text-right text-xs opacity-50 mt-2">
          {question.length} / 200
        </div>
      </section>

      {/* Step 3: 开始 */}
      <section className="flex flex-col items-center gap-4">
        <button onClick={handleStart} className="btn-primary text-base group">
          <Sparkles
            className="w-4 h-4 group-hover:animate-pulse"
            strokeWidth={1.5}
          />
          <span style={{ fontFamily: "'Noto Serif SC', serif" }}>开始占卜</span>
        </button>
        <div
          className="text-xs opacity-50 mt-2 max-w-md text-center leading-relaxed"
          style={{ fontFamily: "'Noto Serif SC', serif" }}
        >
          结果仅供娱乐参考，请理性对待
        </div>
      </section>
    </main>
  );
}
