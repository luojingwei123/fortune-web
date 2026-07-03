"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

/**
 * 掷一次三枚铜钱
 * 每枚：0.5 概率字（阳，1），0.5 概率背（阴，0）
 * 记录字面数 → 爻性
 *   3 字 → 老阳（值 3）→ 阳 1，动
 *   2 字 → 少阳（值 1）→ 阳 1，静
 *   1 字 → 少阴（值 2）→ 阴 0，静
 *   0 字 → 老阴（值 0）→ 阴 0，动
 */
export interface YaoRoll {
  coins: [number, number, number]; // 每枚：1=字（阳）0=背（阴）
  zi: number; // 字数
  type: "oldYin" | "youngYin" | "youngYang" | "oldYang";
  value: number; // 0=阴 1=阳
  isDong: boolean;
}

function rollThreeCoins(): YaoRoll {
  const coins: [number, number, number] = [
    Math.random() < 0.5 ? 1 : 0,
    Math.random() < 0.5 ? 1 : 0,
    Math.random() < 0.5 ? 1 : 0,
  ];
  const zi = coins.reduce((a, b) => a + b, 0);
  let type: YaoRoll["type"];
  let value: number;
  let isDong: boolean;
  if (zi === 3) {
    type = "oldYang";
    value = 1;
    isDong = true;
  } else if (zi === 2) {
    type = "youngYang";
    value = 1;
    isDong = false;
  } else if (zi === 1) {
    type = "youngYin";
    value = 0;
    isDong = false;
  } else {
    type = "oldYin";
    value = 0;
    isDong = true;
  }
  return { coins, zi, type, value, isDong };
}

const yaoNames = ["初爻", "二爻", "三爻", "四爻", "五爻", "上爻"];

function LiuyaoCastInner() {
  const params = useSearchParams();
  const router = useRouter();
  const question = params.get("q") || "";

  const [step, setStep] = useState(0); // 0..6，当前正在摇第 step+1 爻
  const [rolls, setRolls] = useState<YaoRoll[]>([]);
  const [isRolling, setIsRolling] = useState(false);
  const [autoMode] = useState(true); // 自动连续摇

  const rollNext = () => {
    if (isRolling || step >= 6) return;
    setIsRolling(true);
    // 摇动 1s 后落地
    setTimeout(() => {
      const roll = rollThreeCoins();
      setRolls((prev) => [...prev, roll]);
      setStep((s) => s + 1);
      setIsRolling(false);
    }, 900);
  };

  useEffect(() => {
    if (step === 0 && rolls.length === 0 && !isRolling) {
      // 首次进入，延迟 600ms 开始
      const t = setTimeout(() => rollNext(), 600);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (autoMode && rolls.length > 0 && rolls.length < 6 && !isRolling) {
      const t = setTimeout(() => rollNext(), 800);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rolls, isRolling]);

  useEffect(() => {
    if (rolls.length === 6) {
      // 摇完了，1.2s 后跳转
      const t = setTimeout(() => {
        // 编码：每爻用一个字符 O=老阳 Y=少阳 y=少阴 o=老阴
        const code = rolls
          .map((r) => {
            if (r.type === "oldYang") return "O";
            if (r.type === "youngYang") return "Y";
            if (r.type === "youngYin") return "y";
            return "o";
          })
          .join("");
        const url = `/liuyao/result?c=${code}${
          question ? `&q=${encodeURIComponent(question)}` : ""
        }`;
        router.push(url);
      }, 1400);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rolls]);

  return (
    <main className="max-w-4xl mx-auto px-6 py-8 md:py-12 min-h-[70vh] flex flex-col items-center">
      {/* Progress */}
      <section className="text-center mb-8">
        <div
          className="text-xs tracking-[0.3em] mb-3 opacity-50"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: "var(--liuyao-bronze)",
          }}
        >
          — CASTING · {rolls.length} / 6 —
        </div>
        <h1
          className="text-2xl md:text-4xl mb-3"
          style={{
            fontFamily: "'ZCOOL XiaoWei', 'Noto Serif SC', serif",
            color: "var(--liuyao-bronze)",
          }}
        >
          {rolls.length < 6
            ? `正在摇 ${yaoNames[step]}`
            : "六爻已成 · 即将解卦"}
        </h1>
        {question && (
          <p
            className="text-sm opacity-70 italic max-w-xl mx-auto"
            style={{ fontFamily: "'Noto Serif SC', serif" }}
          >
            &ldquo;{question}&rdquo;
          </p>
        )}
      </section>

      {/* 已摇爻显示（从下到上） */}
      <section
        className="mb-8 md:mb-10 p-5 md:p-6 rounded-lg border w-full max-w-md"
        style={{
          borderColor: "rgba(176,141,87,0.25)",
          background: "rgba(176,141,87,0.05)",
        }}
      >
        <div className="flex flex-col-reverse gap-2 md:gap-3">
          {Array.from({ length: 6 }).map((_, i) => {
            const roll = rolls[i];
            return (
              <div key={i} className="flex items-center gap-3">
                <span
                  className="text-xs opacity-60 w-8 text-right"
                  style={{
                    fontFamily: "'ZCOOL XiaoWei', 'Noto Serif SC', serif",
                  }}
                >
                  {yaoNames[i]}
                </span>
                {roll ? (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3 flex-1"
                  >
                    {/* 爻符号 */}
                    <div className="flex-1 flex items-center gap-1">
                      {roll.value === 1 ? (
                        <div
                          className="w-full h-1.5 rounded-sm"
                          style={{ background: "var(--liuyao-bronze)" }}
                        />
                      ) : (
                        <>
                          <div
                            className="flex-1 h-1.5 rounded-sm"
                            style={{ background: "var(--liuyao-bronze)" }}
                          />
                          <div
                            className="flex-1 h-1.5 rounded-sm"
                            style={{ background: "var(--liuyao-bronze)" }}
                          />
                        </>
                      )}
                    </div>
                    {/* 标记 */}
                    <span
                      className={`text-xs w-16 ${
                        roll.isDong ? "" : "opacity-50"
                      }`}
                      style={{
                        color: roll.isDong
                          ? "var(--liuyao-bronze)"
                          : "var(--liuyao-ink)",
                      }}
                    >
                      {roll.isDong ? (roll.type === "oldYang" ? "○ 老阳" : "× 老阴") : roll.type === "youngYang" ? "少阳" : "少阴"}
                    </span>
                  </motion.div>
                ) : (
                  <div className="flex-1 h-1.5 rounded-sm opacity-15 bg-[var(--liuyao-bronze)]" />
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 铜钱动画 */}
      <section className="relative w-full h-40 md:h-48 flex items-center justify-center gap-6 md:gap-10">
        <AnimatePresence mode="wait">
          {isRolling ? (
            <motion.div
              key="rolling"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex gap-4 md:gap-8"
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    rotateY: [0, 360, 720, 1080],
                    y: [0, -30, 0, -20, 0],
                  }}
                  transition={{
                    duration: 0.9,
                    times: [0, 0.3, 0.55, 0.8, 1],
                    delay: i * 0.08,
                  }}
                  className="w-14 h-14 md:w-20 md:h-20 rounded-full flex items-center justify-center text-xl md:text-2xl font-bold"
                  style={{
                    background:
                      "radial-gradient(circle, #d4b380 0%, #8b6f42 100%)",
                    border: "2px solid var(--liuyao-bronze)",
                    color: "#3a2810",
                    boxShadow:
                      "0 6px 12px rgba(0,0,0,0.5), inset 0 0 8px rgba(0,0,0,0.25)",
                  }}
                >
                  ✦
                </motion.div>
              ))}
            </motion.div>
          ) : rolls.length > 0 && rolls.length <= 6 ? (
            <motion.div
              key={`landed-${rolls.length}`}
              initial={{ opacity: 0, y: 20, scale: 0.7 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex gap-4 md:gap-8"
            >
              {rolls[rolls.length - 1].coins.map((c, i) => (
                <div
                  key={i}
                  className="w-14 h-14 md:w-20 md:h-20 rounded-full flex items-center justify-center text-xs md:text-sm"
                  style={{
                    background:
                      c === 1
                        ? "radial-gradient(circle, #d4b380 0%, #8b6f42 100%)"
                        : "radial-gradient(circle, #6b5730 0%, #3a2810 100%)",
                    border: "2px solid var(--liuyao-bronze)",
                    color: c === 1 ? "#3a2810" : "var(--liuyao-bronze)",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
                    fontFamily: "'ZCOOL XiaoWei', serif",
                  }}
                >
                  {c === 1 ? "字" : "背"}
                </div>
              ))}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </section>

      <div
        className="mt-8 text-xs opacity-50 text-center leading-relaxed"
        style={{ fontFamily: "'Noto Serif SC', serif" }}
      >
        {rolls.length < 6
          ? "让心念集中在你所问之事，铜钱自会给出答案"
          : "六爻俱全 · 正在解卦…"}
      </div>
    </main>
  );
}

export default function LiuyaoCast() {
  return (
    <Suspense
      fallback={
        <main className="max-w-3xl mx-auto px-6 py-16 text-center opacity-60">
          准备摇卦…
        </main>
      }
    >
      <LiuyaoCastInner />
    </Suspense>
  );
}
