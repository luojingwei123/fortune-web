"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Flower2 } from "lucide-react";

type CastMethod = "time" | "number" | "text";

const methods: {
  key: CastMethod;
  name: string;
  desc: string;
  hint: string;
}[] = [
  {
    key: "time",
    name: "时间起卦",
    desc: "用此刻的年月日时",
    hint: "最简单也最讲究缘分 · 只需按下开始按钮",
  },
  {
    key: "number",
    name: "数字起卦",
    desc: "报两个心中的数字",
    hint: "凭直觉写下两个数字（1-100）",
  },
  {
    key: "text",
    name: "字数起卦",
    desc: "写一句真诚的话",
    hint: "问题本身即卦象 · 前半为上卦，后半为下卦",
  },
];

export default function MeihuaIntro() {
  const router = useRouter();
  const [method, setMethod] = useState<CastMethod>("time");
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [text, setText] = useState("");
  const [question, setQuestion] = useState("");

  const canStart = () => {
    if (method === "time") return true;
    if (method === "number") {
      const a = parseInt(num1, 10);
      const b = parseInt(num2, 10);
      return !isNaN(a) && !isNaN(b) && a > 0 && b > 0 && a <= 100 && b <= 100;
    }
    if (method === "text") return text.trim().length >= 2;
    return false;
  };

  const handleStart = () => {
    if (!canStart()) return;
    const q = question.trim();
    const params = new URLSearchParams();
    params.set("m", method);
    if (method === "number") {
      params.set("n1", num1);
      params.set("n2", num2);
    } else if (method === "text") {
      params.set("t", text.trim());
    }
    if (q) params.set("q", q);
    router.push(`/meihua/cast?${params.toString()}`);
  };

  return (
    <main className="max-w-4xl mx-auto px-6 md:px-12 py-10 md:py-16">
      {/* 标题 */}
      <section className="text-center mb-10 md:mb-14">
        <div
          className="text-xs tracking-[0.4em] mb-3 opacity-60"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          — MEIHUA YI SHU —
        </div>
        <h1
          className="text-4xl md:text-6xl mb-4"
          style={{
            fontFamily: "'Ma Shan Zheng', 'Noto Serif SC', serif",
            color: "var(--meihua-red)",
          }}
        >
          一花一世界
        </h1>
        <p
          className="text-sm md:text-base opacity-80 leading-loose max-w-lg mx-auto"
          style={{ fontFamily: "'Noto Serif SC', serif" }}
        >
          梅花易数 · 宋代邵雍（邵康节）所创
          <br />
          万物皆可起卦 · 起卦即断
        </p>
      </section>

      {/* 说明：什么是梅花易数 */}
      <section
        className="mb-10 md:mb-14 p-5 md:p-7 rounded-lg border-2 bg-white/40"
        style={{
          borderColor: "var(--meihua-border)",
        }}
      >
        <div
          className="text-xs tracking-[0.3em] mb-3"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: "var(--meihua-red)",
          }}
        >
          ABOUT THIS METHOD
        </div>
        <div
          className="text-sm md:text-[15px] opacity-90 leading-loose space-y-2"
          style={{ fontFamily: "'Noto Serif SC', serif" }}
        >
          <p>
            <span style={{ color: "var(--meihua-red)" }}>梅花易数</span>是宋代大儒邵雍创立的簡易占卜法。相传邵雍在梅花下见人折花，以时刻起卦推算而得名。它不需铜钱不需工具，万物皆可起卦——日期可以、数字可以、字数可以、声音可以、方位也可以。
          </p>
          <p>本站提供三种起卦方式，其背后的数学原理均源自《梅花易数》原书：</p>
          <div className="pl-2 space-y-1.5">
            <p>
              <span style={{ color: "var(--meihua-red)" }}>② 时间起卦</span>：取当前年支序数 + 月 + 日，除 8 取余得上卦；再加时辰除 8 得下卦；上下相加除 6 得动爻。
            </p>
            <p>
              <span style={{ color: "var(--meihua-red)" }}>② 数字起卦</span>：你写两个数字，分别除 8 取余为上卦下卦，两数相加除 6 为动爻。
            </p>
            <p>
              <span style={{ color: "var(--meihua-red)" }}>② 字数起卦</span>：你写一句话，前半字数除 8 为上卦，后半除 8 为下卦，总字数除 6 为动爻。
            </p>
          </div>
          <p>
            起卦得本卦后，动爻变化得变卦，以本卦、变卦、动爻位置以及体用五行生克判断吉凶。
          </p>
        </div>
      </section>

      {/* Step 1 · 选起卦方式 */}
      <section className="mb-10 md:mb-14">
        <div className="flex items-center gap-3 mb-6">
          <span
            className="w-8 h-8 flex items-center justify-center rounded-full border border-[var(--meihua-red)] text-sm"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: "var(--meihua-red)",
            }}
          >
            1
          </span>
          <h2
            className="text-lg md:text-xl"
            style={{ fontFamily: "'Noto Serif SC', serif" }}
          >
            选一种起卦方式
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {methods.map((m) => {
            const selected = method === m.key;
            return (
              <button
                key={m.key}
                onClick={() => setMethod(m.key)}
                className={`text-left p-5 md:p-6 rounded transition-all duration-300 border-2 ${
                  selected
                    ? "border-[var(--meihua-red)] bg-white shadow-md"
                    : "border-[var(--meihua-border)] hover:border-[var(--meihua-red)]/60 bg-white/40"
                }`}
              >
                <div
                  className="text-lg md:text-xl mb-2"
                  style={{ fontFamily: "'Noto Serif SC', serif" }}
                >
                  {m.name}
                </div>
                <div className="text-xs md:text-sm opacity-75 mb-3">
                  {m.desc}
                </div>
                <div className="text-[11px] opacity-55 leading-relaxed">
                  {m.hint}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Step 2 · 输入 */}
      {method !== "time" && (
        <section className="mb-10 md:mb-14">
          <div className="flex items-center gap-3 mb-6">
            <span
              className="w-8 h-8 flex items-center justify-center rounded-full border border-[var(--meihua-red)] text-sm"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: "var(--meihua-red)",
              }}
            >
              2
            </span>
            <h2
              className="text-lg md:text-xl"
              style={{ fontFamily: "'Noto Serif SC', serif" }}
            >
              {method === "number" ? "凭直觉写下两个数字" : "写一句心中的话"}
            </h2>
          </div>

          {method === "number" && (
            <div className="flex gap-4 items-center justify-center">
              <input
                type="number"
                inputMode="numeric"
                min={1}
                max={100}
                value={num1}
                onChange={(e) => setNum1(e.target.value)}
                placeholder="第一个"
                className="w-32 md:w-40 h-16 md:h-20 text-center text-2xl md:text-3xl bg-white border-2 border-[var(--meihua-border)] focus:border-[var(--meihua-red)] rounded outline-none transition-colors"
                style={{ fontFamily: "'Noto Serif SC', serif" }}
              />
              <span
                className="text-2xl md:text-3xl opacity-40"
                style={{ fontFamily: "'Noto Serif SC', serif" }}
              >
                ·
              </span>
              <input
                type="number"
                inputMode="numeric"
                min={1}
                max={100}
                value={num2}
                onChange={(e) => setNum2(e.target.value)}
                placeholder="第二个"
                className="w-32 md:w-40 h-16 md:h-20 text-center text-2xl md:text-3xl bg-white border-2 border-[var(--meihua-border)] focus:border-[var(--meihua-red)] rounded outline-none transition-colors"
                style={{ fontFamily: "'Noto Serif SC', serif" }}
              />
            </div>
          )}

          {method === "text" && (
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="写一句你此刻真实的心声，字数不限"
              rows={3}
              maxLength={80}
              className="w-full bg-white border-2 border-[var(--meihua-border)] focus:border-[var(--meihua-red)] rounded p-4 text-base md:text-lg outline-none transition-colors resize-none"
              style={{ fontFamily: "'Noto Serif SC', serif" }}
            />
          )}
        </section>
      )}

      {/* Step 3 · 问题（可选） */}
      <section className="mb-10 md:mb-14">
        <div className="flex items-center gap-3 mb-6">
          <span
            className="w-8 h-8 flex items-center justify-center rounded-full border border-[var(--meihua-red)] text-sm"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: "var(--meihua-red)",
            }}
          >
            {method === "time" ? "2" : "3"}
          </span>
          <h2
            className="text-lg md:text-xl"
            style={{ fontFamily: "'Noto Serif SC', serif" }}
          >
            心中一个问题
            <span className="text-xs opacity-60 ml-3">（可选）</span>
          </h2>
        </div>

        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="例如：这个决定该不该做？"
          rows={2}
          maxLength={200}
          className="w-full bg-white/60 border border-[var(--meihua-border)] focus:border-[var(--meihua-red)] rounded p-4 text-sm md:text-base outline-none transition-colors resize-none"
          style={{ fontFamily: "'Noto Serif SC', serif" }}
        />
      </section>

      {/* Start */}
      <section className="flex flex-col items-center gap-4">
        <button
          onClick={handleStart}
          disabled={!canStart()}
          className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            background: canStart() ? "var(--meihua-red)" : undefined,
          }}
        >
          <Flower2 className="w-4 h-4" strokeWidth={1.5} />
          <span style={{ fontFamily: "'Noto Serif SC', serif" }}>起卦</span>
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
