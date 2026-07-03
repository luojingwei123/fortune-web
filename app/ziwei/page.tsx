"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";

// 时辰
const shichenList = [
  { key: 0, name: "早子时", range: "00:00 - 00:59" },
  { key: 1, name: "丑时", range: "01:00 - 02:59" },
  { key: 2, name: "寅时", range: "03:00 - 04:59" },
  { key: 3, name: "卯时", range: "05:00 - 06:59" },
  { key: 4, name: "辰时", range: "07:00 - 08:59" },
  { key: 5, name: "巳时", range: "09:00 - 10:59" },
  { key: 6, name: "午时", range: "11:00 - 12:59" },
  { key: 7, name: "未时", range: "13:00 - 14:59" },
  { key: 8, name: "申时", range: "15:00 - 16:59" },
  { key: 9, name: "酉时", range: "17:00 - 18:59" },
  { key: 10, name: "戌时", range: "19:00 - 20:59" },
  { key: 11, name: "亥时", range: "21:00 - 22:59" },
  { key: 12, name: "晚子时", range: "23:00 - 23:59" },
];

export default function ZiweiIntro() {
  const router = useRouter();
  const [year, setYear] = useState("1995");
  const [month, setMonth] = useState("6");
  const [day, setDay] = useState("15");
  const [hour, setHour] = useState<number>(6);
  const [gender, setGender] = useState<"male" | "female">("male");
  const [question, setQuestion] = useState("");

  const canStart = () => {
    const y = parseInt(year, 10);
    const m = parseInt(month, 10);
    const d = parseInt(day, 10);
    return (
      y >= 1900 &&
      y <= 2100 &&
      m >= 1 &&
      m <= 12 &&
      d >= 1 &&
      d <= 31 &&
      hour >= 0 &&
      hour <= 12
    );
  };

  const handleStart = () => {
    if (!canStart()) return;
    const q = question.trim();
    const p = new URLSearchParams({
      y: year,
      m: month,
      d: day,
      h: String(hour),
      g: gender,
    });
    if (q) p.set("q", q);
    router.push(`/ziwei/result?${p.toString()}`);
  };

  return (
    <main className="max-w-3xl mx-auto px-6 md:px-12 py-10 md:py-16">
      {/* 标题 */}
      <section className="text-center mb-12 md:mb-16">
        <div
          className="text-xs tracking-[0.4em] mb-3 opacity-60"
          style={{
            fontFamily: "'Cinzel', serif",
            color: "var(--ziwei-gold)",
          }}
        >
          — PURPLE STAR ASTROLOGY —
        </div>
        <h1
          className="text-4xl md:text-6xl mb-4"
          style={{
            fontFamily: "'Cinzel', 'Noto Serif SC', serif",
            color: "var(--ziwei-gold)",
          }}
        >
          紫微斗数
        </h1>
        <p
          className="text-sm md:text-base opacity-80 leading-loose max-w-lg mx-auto"
          style={{ fontFamily: "'Noto Serif SC', serif" }}
        >
          由生辰四柱定位十四主星在十二宫中的分布
          <br />
          一张命盘照见你的性格、机遇与关系
        </p>
      </section>

      {/* 出生日期 */}
      <section className="mb-8 md:mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span
            className="w-8 h-8 flex items-center justify-center rounded-full border text-sm"
            style={{
              fontFamily: "'Cinzel', serif",
              color: "var(--ziwei-gold)",
              borderColor: "var(--ziwei-gold)",
            }}
          >
            1
          </span>
          <h2
            className="text-lg md:text-xl"
            style={{ fontFamily: "'Noto Serif SC', serif" }}
          >
            出生日期（公历）
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-3 md:gap-4">
          <div>
            <label className="text-xs opacity-60 block mb-1.5">年</label>
            <input
              type="number"
              inputMode="numeric"
              min={1900}
              max={2100}
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full h-12 md:h-14 text-center text-lg md:text-xl bg-[rgba(255,255,255,0.03)] border border-[var(--ziwei-purple)]/40 focus:border-[var(--ziwei-gold)] rounded outline-none transition-colors"
              style={{ fontFamily: "'Noto Serif SC', serif" }}
            />
          </div>
          <div>
            <label className="text-xs opacity-60 block mb-1.5">月</label>
            <input
              type="number"
              inputMode="numeric"
              min={1}
              max={12}
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full h-12 md:h-14 text-center text-lg md:text-xl bg-[rgba(255,255,255,0.03)] border border-[var(--ziwei-purple)]/40 focus:border-[var(--ziwei-gold)] rounded outline-none transition-colors"
              style={{ fontFamily: "'Noto Serif SC', serif" }}
            />
          </div>
          <div>
            <label className="text-xs opacity-60 block mb-1.5">日</label>
            <input
              type="number"
              inputMode="numeric"
              min={1}
              max={31}
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="w-full h-12 md:h-14 text-center text-lg md:text-xl bg-[rgba(255,255,255,0.03)] border border-[var(--ziwei-purple)]/40 focus:border-[var(--ziwei-gold)] rounded outline-none transition-colors"
              style={{ fontFamily: "'Noto Serif SC', serif" }}
            />
          </div>
        </div>
      </section>

      {/* 出生时辰 */}
      <section className="mb-8 md:mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span
            className="w-8 h-8 flex items-center justify-center rounded-full border text-sm"
            style={{
              fontFamily: "'Cinzel', serif",
              color: "var(--ziwei-gold)",
              borderColor: "var(--ziwei-gold)",
            }}
          >
            2
          </span>
          <h2
            className="text-lg md:text-xl"
            style={{ fontFamily: "'Noto Serif SC', serif" }}
          >
            出生时辰
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {shichenList.map((s) => {
            const selected = hour === s.key;
            return (
              <button
                key={s.key}
                onClick={() => setHour(s.key)}
                className={`px-3 py-2.5 rounded text-left border transition-all ${
                  selected
                    ? "border-[var(--ziwei-gold)] bg-[rgba(201,162,39,0.1)]"
                    : "border-[var(--ziwei-purple)]/30 hover:border-[var(--ziwei-gold)]/50"
                }`}
                style={{ fontFamily: "'Noto Serif SC', serif" }}
              >
                <div className="text-sm">{s.name}</div>
                <div className="text-[10px] opacity-50">{s.range}</div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 性别 */}
      <section className="mb-8 md:mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span
            className="w-8 h-8 flex items-center justify-center rounded-full border text-sm"
            style={{
              fontFamily: "'Cinzel', serif",
              color: "var(--ziwei-gold)",
              borderColor: "var(--ziwei-gold)",
            }}
          >
            3
          </span>
          <h2
            className="text-lg md:text-xl"
            style={{ fontFamily: "'Noto Serif SC', serif" }}
          >
            性别
          </h2>
        </div>
        <div className="flex gap-3">
          {(["male", "female"] as const).map((g) => (
            <button
              key={g}
              onClick={() => setGender(g)}
              className={`flex-1 py-3 rounded border transition-all ${
                gender === g
                  ? "border-[var(--ziwei-gold)] bg-[rgba(201,162,39,0.1)]"
                  : "border-[var(--ziwei-purple)]/30"
              }`}
              style={{ fontFamily: "'Noto Serif SC', serif" }}
            >
              {g === "male" ? "男" : "女"}
            </button>
          ))}
        </div>
      </section>

      {/* 问题 */}
      <section className="mb-10 md:mb-14">
        <div className="flex items-center gap-3 mb-4">
          <span
            className="w-8 h-8 flex items-center justify-center rounded-full border text-sm"
            style={{
              fontFamily: "'Cinzel', serif",
              color: "var(--ziwei-gold)",
              borderColor: "var(--ziwei-gold)",
            }}
          >
            4
          </span>
          <h2
            className="text-lg md:text-xl"
            style={{ fontFamily: "'Noto Serif SC', serif" }}
          >
            想问的问题
            <span className="text-xs opacity-60 ml-3">（可选）</span>
          </h2>
        </div>

        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="例如：想了解自己的性格特质和事业方向"
          rows={2}
          maxLength={200}
          className="w-full bg-[rgba(255,255,255,0.03)] border border-[var(--ziwei-purple)]/30 focus:border-[var(--ziwei-gold)] rounded p-4 text-sm md:text-base outline-none transition-colors resize-none"
          style={{ fontFamily: "'Noto Serif SC', serif" }}
        />
      </section>

      {/* Start */}
      <section className="flex flex-col items-center gap-4">
        <button
          onClick={handleStart}
          disabled={!canStart()}
          className="inline-flex items-center gap-2 px-7 py-3 rounded font-medium transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110 hover:-translate-y-0.5"
          style={{
            background:
              "linear-gradient(135deg, var(--ziwei-gold) 0%, #a67e1b 100%)",
            color: "#0A0E27",
            border: "1px solid var(--ziwei-gold)",
          }}
        >
          <Star className="w-4 h-4" strokeWidth={1.5} />
          <span
            style={{ fontFamily: "'Cinzel', 'Noto Serif SC', serif" }}
          >
            排盘
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
