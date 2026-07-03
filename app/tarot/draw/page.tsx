"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { tarotDeck } from "@/data/tarot";
import { getSpread } from "@/data/spreads";

interface DrawnCard {
  cardId: number;
  reversed: boolean; // 是否逆位
  positionIndex: number; // 对应牌阵第几个位置
}

function TarotDrawInner() {
  const params = useSearchParams();
  const router = useRouter();
  const spreadKey = params.get("spread") || "three";
  const question = params.get("q") || "";
  const spread = getSpread(spreadKey);

  const [shuffled, setShuffled] = useState(false);
  const [drawn, setDrawn] = useState<DrawnCard[]>([]);
  const [availableIds, setAvailableIds] = useState<number[]>([]);

  // 洗牌：初始化打乱牌堆
  useEffect(() => {
    const ids = tarotDeck.map((c) => c.id);
    // Fisher-Yates
    for (let i = ids.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [ids[i], ids[j]] = [ids[j], ids[i]];
    }
    setAvailableIds(ids);
    const timer = setTimeout(() => setShuffled(true), 1600);
    return () => clearTimeout(timer);
  }, []);

  const cardsToDraw = spread?.count || 3;
  const allDrawn = drawn.length >= cardsToDraw;

  // 牌堆位置：显示为扇形，每张牌绕 y 轴略微错开
  const fanCards = useMemo(() => {
    if (!shuffled) return [];
    const shownCount = Math.min(21, availableIds.length); // 显示 21 张牌，避免太拥挤
    const totalAngle = 60; // 度
    const step = totalAngle / (shownCount - 1);
    return availableIds.slice(0, shownCount).map((id, idx) => ({
      id,
      angle: -totalAngle / 2 + step * idx,
      offsetY: Math.abs(idx - (shownCount - 1) / 2) * 3, // 中间的略低
    }));
  }, [shuffled, availableIds]);

  const handleDrawCard = (cardId: number) => {
    if (drawn.length >= cardsToDraw) return;
    if (drawn.some((d) => d.cardId === cardId)) return;

    const reversed = Math.random() < 0.5;
    const positionIndex = drawn.length + 1;
    const newDrawn = [...drawn, { cardId, reversed, positionIndex }];
    setDrawn(newDrawn);

    // 全部抽完 → 自动跳转
    if (newDrawn.length >= cardsToDraw) {
      setTimeout(() => {
        const cardsParam = newDrawn
          .map((d) => `${d.cardId}${d.reversed ? "r" : "u"}`)
          .join(",");
        const url = `/tarot/result?spread=${spreadKey}&cards=${cardsParam}${
          question ? `&q=${encodeURIComponent(question)}` : ""
        }`;
        router.push(url);
      }, 1500);
    }
  };

  if (!spread) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-16 text-center">
        <p>牌阵参数错误</p>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12">
      {/* Progress */}
      <section className="text-center mb-6 md:mb-10">
        <div
          className="text-xs tracking-[0.3em] gold mb-3"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          — {spread.nameEn.toUpperCase()} —
        </div>
        <h1
          className="text-2xl md:text-4xl mb-3 font-light"
          style={{ fontFamily: "'Noto Serif SC', serif" }}
        >
          {!shuffled
            ? "洗牌中…"
            : allDrawn
            ? "占卜完成"
            : `请抽取第 ${drawn.length + 1} 张牌`}
        </h1>
        {question && shuffled && !allDrawn && (
          <p className="text-sm opacity-70 max-w-xl mx-auto italic mb-3">
            {question}
          </p>
        )}
        <p className="text-xs opacity-60">
          {shuffled && !allDrawn
            ? `已抽取 ${drawn.length} / ${cardsToDraw}`
            : allDrawn
            ? "即将展示结果…"
            : "让心静下来，专注你的问题"}
        </p>
      </section>

      {/* 抽到的牌小图（预览） */}
      {drawn.length > 0 && (
        <section className="flex justify-center gap-2 md:gap-4 mb-6 md:mb-10 flex-wrap">
          {drawn.map((d) => {
            const card = tarotDeck.find((c) => c.id === d.cardId);
            if (!card) return null;
            return (
              <motion.div
                key={d.cardId}
                initial={{ scale: 0, y: -60, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
                className="relative"
              >
                <div className="w-14 h-24 md:w-20 md:h-32 rounded overflow-hidden shadow-[0_0_15px_rgba(212,175,55,0.35)] border border-[var(--tarot-gold)]/40">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={card.image}
                    alt={card.nameCn}
                    className={`w-full h-full object-cover ${
                      d.reversed ? "rotate-180" : ""
                    }`}
                  />
                </div>
                <div className="text-center text-[10px] mt-1 opacity-70">
                  {d.positionIndex}
                </div>
              </motion.div>
            );
          })}
          {/* 剩余占位 */}
          {Array.from({ length: cardsToDraw - drawn.length }).map((_, i) => (
            <div
              key={`empty-${i}`}
              className="w-14 h-24 md:w-20 md:h-32 rounded border border-dashed border-[var(--tarot-gold)]/25"
            />
          ))}
        </section>
      )}

      {/* 牌堆区域 */}
      <section className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center">
        {/* 洗牌动画 */}
        <AnimatePresence>
          {!shuffled && (
            <motion.div
              key="shuffle"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {[...Array(9)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{
                    scale: [0.5, 1, 0.5],
                    opacity: [0, 1, 0],
                    x: Math.cos((i * Math.PI * 2) / 9) * 80,
                    y: Math.sin((i * Math.PI * 2) / 9) * 80,
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                    delay: i * 0.08,
                  }}
                  className="absolute w-16 h-24 md:w-20 md:h-32 rounded"
                  style={{
                    background:
                      "linear-gradient(135deg, #4a2b7a 0%, #1a0f3a 100%)",
                    border: "1px solid var(--tarot-gold)",
                    boxShadow: "0 0 20px rgba(212,175,55,0.3)",
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* 扇形牌堆（洗好后） */}
        <AnimatePresence>
          {shuffled && !allDrawn && (
            <motion.div
              key="fan"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="relative w-full h-full flex items-center justify-center"
            >
              {fanCards.map((c) => {
                const alreadyDrawn = drawn.some((d) => d.cardId === c.id);
                return (
                  <motion.button
                    key={c.id}
                    disabled={alreadyDrawn}
                    onClick={() => handleDrawCard(c.id)}
                    className="absolute"
                    style={{
                      transform: `rotate(${c.angle}deg) translateY(-140px)`,
                      transformOrigin: "center bottom",
                    }}
                    whileHover={
                      alreadyDrawn
                        ? {}
                        : {
                            scale: 1.08,
                            y: -20,
                            transition: { duration: 0.2 },
                          }
                    }
                    animate={
                      alreadyDrawn ? { opacity: 0, scale: 0.9 } : { opacity: 1 }
                    }
                  >
                    <div
                      className="w-16 h-24 md:w-24 md:h-36 rounded shadow-lg cursor-pointer"
                      style={{
                        background:
                          "linear-gradient(135deg, #4a2b7a 0%, #1a0f3a 60%, #0F0724 100%)",
                        border: "1px solid rgba(212,175,55,0.6)",
                        boxShadow:
                          "0 4px 20px rgba(0,0,0,0.5), inset 0 0 15px rgba(212,175,55,0.15)",
                      }}
                    >
                      <div className="w-full h-full flex items-center justify-center">
                        <div
                          className="text-[var(--tarot-gold)] text-xl md:text-2xl opacity-60"
                          style={{
                            fontFamily: "'Cormorant Garamond', serif",
                          }}
                        >
                          ✦
                        </div>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <div
        className="text-center mt-4 md:mt-8 text-xs opacity-50"
        style={{ fontFamily: "'Noto Serif SC', serif" }}
      >
        {shuffled && !allDrawn && "点击一张牌以抽取 · 每张只能抽一次"}
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
