"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { tarotDeck } from "@/data/tarot";
import { getSpread } from "@/data/spreads";

interface DrawnCard {
  cardId: number;
  reversed: boolean;
  positionIndex: number;
}

function TarotDrawInner() {
  const params = useSearchParams();
  const router = useRouter();
  const spreadKey = params.get("spread") || "three";
  const question = params.get("q") || "";
  const spread = getSpread(spreadKey);

  const [phase, setPhase] = useState<"shuffling" | "picking" | "done">(
    "shuffling"
  );
  const [drawn, setDrawn] = useState<DrawnCard[]>([]);
  const [shuffledDeck, setShuffledDeck] = useState<number[]>([]);
  const [pendingCardId, setPendingCardId] = useState<number | null>(null);

  // ⭐ 每次进入都重新洗牌
  useEffect(() => {
    const ids = tarotDeck.map((c) => c.id);
    // Fisher-Yates 打乱
    for (let i = ids.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [ids[i], ids[j]] = [ids[j], ids[i]];
    }
    setShuffledDeck(ids);
    // 洗牌动画持续 2 秒
    const timer = setTimeout(() => setPhase("picking"), 2000);
    return () => clearTimeout(timer);
  }, []);

  const cardsToDraw = spread?.count || 3;

  const handleCardClick = (cardId: number) => {
    if (phase !== "picking") return;
    if (drawn.some((d) => d.cardId === cardId)) return;

    // 第一次点击 → 突出出来，等待确认
    if (pendingCardId !== cardId) {
      setPendingCardId(cardId);
      return;
    }

    // 第二次点击 → 确认选取
    const reversed = Math.random() < 0.5;
    const positionIndex = drawn.length + 1;
    const newDrawn = [...drawn, { cardId, reversed, positionIndex }];
    setDrawn(newDrawn);
    setPendingCardId(null);

    // 全部抽完 → 跳转结果
    if (newDrawn.length >= cardsToDraw) {
      setPhase("done");
      setTimeout(() => {
        const cardsParam = newDrawn
          .map((d) => `${d.cardId}${d.reversed ? "r" : "u"}`)
          .join(",");
        const url = `/tarot/result?spread=${spreadKey}&cards=${cardsParam}${
          question ? `&q=${encodeURIComponent(question)}` : ""
        }`;
        router.push(url);
      }, 1200);
    }
  };

  // 点击空白取消 pending
  const handleClearPending = () => setPendingCardId(null);

  const allDrawn = drawn.length >= cardsToDraw;

  if (!spread) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-16 text-center">
        <p>牌阵参数错误</p>
      </main>
    );
  }

  // ⭐ 分几排铺开，PC 13 列 × 6 排，平板 10 × 8，手机 6 × 13
  // 用 grid 自适应
  return (
    <main className="max-w-6xl mx-auto px-4 md:px-8 py-6 md:py-10">
      {/* Progress */}
      <section className="text-center mb-6 md:mb-8">
        <div
          className="text-xs tracking-[0.3em] gold mb-3"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          — {spread.nameEn.toUpperCase()} —
        </div>
        <h1
          className="text-2xl md:text-4xl mb-2 font-light"
          style={{ fontFamily: "'Noto Serif SC', serif" }}
        >
          {phase === "shuffling"
            ? "正在洗牌…"
            : allDrawn
            ? "占卜完成"
            : pendingCardId !== null
            ? "再次点击以确认"
            : `请凭直觉选一张牌`}
        </h1>
        {question && phase === "picking" && !allDrawn && (
          <p className="text-sm opacity-70 max-w-xl mx-auto italic mb-2">
            &ldquo;{question}&rdquo;
          </p>
        )}
        <p className="text-xs opacity-60">
          {phase === "shuffling"
            ? "让宇宙的能量流经这副牌…"
            : allDrawn
            ? "即将展示结果…"
            : `${drawn.length} / ${cardsToDraw}`}
        </p>
      </section>

      {/* 已抽预览 */}
      {drawn.length > 0 && (
        <section className="flex justify-center gap-2 md:gap-3 mb-6 flex-wrap">
          {Array.from({ length: cardsToDraw }).map((_, i) => {
            const d = drawn[i];
            if (!d) {
              return (
                <div
                  key={`empty-${i}`}
                  className="w-12 h-20 md:w-16 md:h-24 rounded border border-dashed border-[var(--tarot-gold)]/25 flex items-center justify-center"
                >
                  <span
                    className="text-[10px] opacity-40"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {i + 1}
                  </span>
                </div>
              );
            }
            const card = tarotDeck.find((c) => c.id === d.cardId);
            if (!card) return null;
            return (
              <motion.div
                key={`drawn-${d.cardId}`}
                initial={{ scale: 0, y: -50, rotate: -20, opacity: 0 }}
                animate={{ scale: 1, y: 0, rotate: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
                className="relative"
              >
                <div className="w-12 h-20 md:w-16 md:h-24 rounded overflow-hidden shadow-[0_0_15px_rgba(212,175,55,0.4)] border border-[var(--tarot-gold)]/60">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={card.image}
                    alt={card.nameCn}
                    className={`w-full h-full object-cover ${
                      d.reversed ? "rotate-180" : ""
                    }`}
                  />
                </div>
                <div
                  className="text-center text-[10px] mt-1 opacity-70"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {i + 1}
                </div>
              </motion.div>
            );
          })}
        </section>
      )}

      {/* ⭐ 洗牌动画 */}
      <AnimatePresence>
        {phase === "shuffling" && (
          <motion.section
            key="shuffle"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative w-full h-[300px] md:h-[400px] flex items-center justify-center"
          >
            {[...Array(14)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: 0,
                  y: 0,
                  rotate: 0,
                  scale: 1,
                }}
                animate={{
                  x: [
                    0,
                    Math.cos((i * Math.PI * 2) / 14) * 120,
                    Math.cos(((i + 3) * Math.PI * 2) / 14) * 80,
                    0,
                  ],
                  y: [
                    0,
                    Math.sin((i * Math.PI * 2) / 14) * 80,
                    Math.sin(((i + 3) * Math.PI * 2) / 14) * 60,
                    0,
                  ],
                  rotate: [0, 180, 540, 720],
                  scale: [1, 0.85, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  times: [0, 0.35, 0.7, 1],
                  delay: i * 0.03,
                }}
                className="absolute w-16 h-24 md:w-20 md:h-32 rounded"
                style={{
                  background:
                    "linear-gradient(135deg, #4a2b7a 0%, #1a0f3a 100%)",
                  border: "1px solid var(--tarot-gold)",
                  boxShadow:
                    "0 6px 20px rgba(0,0,0,0.6), inset 0 0 15px rgba(212,175,55,0.2)",
                }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <span
                    className="text-[var(--tarot-gold)] text-lg opacity-50"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    ✦
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.section>
        )}
      </AnimatePresence>

      {/* ⭐ 分排铺开的牌堆 */}
      <AnimatePresence>
        {phase !== "shuffling" && (
          <motion.section
            key="grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
            onClick={handleClearPending}
          >
            <div
              className="grid gap-1.5 md:gap-2 justify-center mx-auto"
              style={{
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(clamp(38px, 8vw, 68px), 1fr))",
                maxWidth: "min(100%, 900px)",
              }}
            >
              {shuffledDeck.map((cardId, idx) => {
                const alreadyDrawn = drawn.some((d) => d.cardId === cardId);
                const isPending = pendingCardId === cardId;

                return (
                  <motion.button
                    key={cardId}
                    disabled={alreadyDrawn || allDrawn}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick(cardId);
                    }}
                    initial={{ opacity: 0, y: -20, rotate: -10 }}
                    animate={{
                      opacity: alreadyDrawn ? 0.15 : 1,
                      y: 0,
                      rotate: 0,
                      scale: isPending ? 1.35 : 1,
                      zIndex: isPending ? 20 : 1,
                    }}
                    transition={{
                      delay: 0.005 * idx,
                      type: "spring",
                      stiffness: 180,
                      damping: 20,
                    }}
                    whileHover={
                      alreadyDrawn || allDrawn
                        ? {}
                        : isPending
                        ? {}
                        : { scale: 1.15, y: -6, zIndex: 10 }
                    }
                    className="relative aspect-[2/3] rounded-md cursor-pointer disabled:cursor-not-allowed"
                    style={{
                      background:
                        "linear-gradient(135deg, #4a2b7a 0%, #1a0f3a 60%, #0F0724 100%)",
                      border: isPending
                        ? "2px solid var(--tarot-gold)"
                        : "1px solid rgba(212,175,55,0.5)",
                      boxShadow: isPending
                        ? "0 0 40px rgba(212,175,55,0.6), inset 0 0 20px rgba(212,175,55,0.3)"
                        : "0 2px 8px rgba(0,0,0,0.4), inset 0 0 8px rgba(212,175,55,0.1)",
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span
                        className={`text-[var(--tarot-gold)] transition-opacity ${
                          isPending
                            ? "opacity-100 text-xl md:text-2xl"
                            : "opacity-50 text-sm md:text-lg"
                        }`}
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                        }}
                      >
                        ✦
                      </span>
                    </div>
                    {/* pending 时显示"确认"提示 */}
                    {isPending && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] md:text-xs gold px-2 py-0.5 rounded border border-[var(--tarot-gold)] bg-[#0F0724]"
                        style={{ fontFamily: "'Noto Serif SC', serif" }}
                      >
                        再次点击确认
                      </motion.div>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <div
        className="text-center mt-6 md:mt-10 text-xs opacity-50 leading-relaxed"
        style={{ fontFamily: "'Noto Serif SC', serif" }}
      >
        {phase === "picking" &&
          !allDrawn &&
          "凭直觉点选一张 · 首次点击预览 · 再次点击确认"}
      </div>
    </main>
  );
}

export default function TarotDraw() {
  return (
    <Suspense
      fallback={
        <main className="max-w-4xl mx-auto px-6 py-16 text-center opacity-70">
          洗牌中…
        </main>
      }
    >
      <TarotDrawInner />
    </Suspense>
  );
}
