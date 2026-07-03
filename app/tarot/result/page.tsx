"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { RotateCcw, Home, Sparkles } from "lucide-react";
import { tarotDeck, suitLabels } from "@/data/tarot";
import { getSpread } from "@/data/spreads";
import {
  buildOrientationMeaning,
  buildPositionInterpretation,
  buildActionAdvice,
  buildOverallAdvice,
} from "@/data/interpretation";
import AiInterpretation from "@/components/AiInterpretation";

interface ParsedCard {
  cardId: number;
  reversed: boolean;
}

function parseCardsParam(raw: string | null): ParsedCard[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map((s) => {
      const m = s.match(/^(\d+)(r|u)$/);
      if (!m) return null;
      return { cardId: parseInt(m[1], 10), reversed: m[2] === "r" };
    })
    .filter((x): x is ParsedCard => x !== null);
}

function TarotResultInner() {
  const params = useSearchParams();
  const spreadKey = params.get("spread") || "three";
  const rawCards = params.get("cards");
  const question = params.get("q") || "";

  const spread = getSpread(spreadKey);
  const parsed = parseCardsParam(rawCards);

  const drawnCards = useMemo(() => {
    return parsed
      .map((p, idx) => {
        const card = tarotDeck.find((c) => c.id === p.cardId);
        const position = spread?.positions[idx];
        if (!card || !position) return null;
        return { card, reversed: p.reversed, position };
      })
      .filter((x): x is NonNullable<typeof x> => x !== null);
  }, [parsed, spread]);

  const overallAdvice = useMemo(() => {
    if (!spread || drawnCards.length === 0) return "";
    return buildOverallAdvice(drawnCards, question, spread.name);
  }, [drawnCards, question, spread]);

  if (!spread || drawnCards.length === 0) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-16 text-center">
        <p className="mb-6 opacity-70">未获取到占卜结果</p>
        <Link href="/tarot" className="btn-primary">
          重新开始
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-4 md:px-8 py-8 md:py-12">
      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10 md:mb-14"
      >
        <div
          className="text-xs tracking-[0.3em] gold mb-3"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          — YOUR READING —
        </div>
        <h1
          className="text-3xl md:text-5xl mb-4 font-light"
          style={{ fontFamily: "'Noto Serif SC', serif" }}
        >
          <span className="gold">占卜</span>结果
        </h1>
        <p
          className="text-sm opacity-75"
          style={{ fontFamily: "'Noto Serif SC', serif" }}
        >
          {spread.name}
          <span className="mx-2 opacity-40">·</span>
          共 {drawnCards.length} 张牌
        </p>
        {question && (
          <p className="mt-4 text-sm md:text-base italic opacity-80 max-w-2xl mx-auto">
            &ldquo;{question}&rdquo;
          </p>
        )}
      </motion.section>

      {/* 卡牌详细解读 */}
      <section className="space-y-6 md:space-y-8 mb-12">
        {drawnCards.map((d, idx) => {
          const meaning = d.reversed ? d.card.reversed : d.card.upright;
          const keywords = d.reversed
            ? d.card.keywordsNegative
            : d.card.keywordsPositive;

          return (
            <motion.article
              key={`${d.card.id}-${idx}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 * idx }}
              className="rounded-lg border border-[rgba(212,175,55,0.2)] bg-[rgba(255,255,255,0.02)] backdrop-blur-sm overflow-hidden"
            >
              {/* 位置标签 */}
              <div className="px-5 py-3 border-b border-[rgba(212,175,55,0.15)] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span
                    className="w-7 h-7 flex items-center justify-center rounded-full border border-[var(--tarot-gold)] gold text-xs"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {d.position.index}
                  </span>
                  <div>
                    <div
                      className="text-sm md:text-base"
                      style={{ fontFamily: "'Noto Serif SC', serif" }}
                    >
                      {d.position.label}
                    </div>
                    <div className="text-[10px] opacity-60 mt-0.5">
                      {d.position.hint}
                    </div>
                  </div>
                </div>
                <span
                  className={`text-xs px-2.5 py-1 rounded border flex-shrink-0 ${
                    d.reversed
                      ? "border-red-400/50 text-red-300/90 bg-red-950/20"
                      : "border-[var(--tarot-gold)]/50 gold bg-[rgba(212,175,55,0.08)]"
                  }`}
                >
                  {d.reversed ? "逆位" : "正位"}
                </span>
              </div>

              <div className="p-5 md:p-7 flex flex-col md:flex-row gap-5 md:gap-7">
                {/* 牌图 */}
                <div className="flex-shrink-0 mx-auto md:mx-0 md:sticky md:top-4 self-start">
                  <div className="w-36 md:w-44 rounded-lg overflow-hidden shadow-[0_0_25px_rgba(212,175,55,0.25)] border border-[var(--tarot-gold)]/40">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={d.card.image}
                      alt={d.card.nameCn}
                      className={`w-full ${d.reversed ? "rotate-180" : ""}`}
                    />
                  </div>
                  <div className="text-center mt-3">
                    <div
                      className="text-xl mb-0.5"
                      style={{ fontFamily: "'Noto Serif SC', serif" }}
                    >
                      {d.card.nameCn}
                    </div>
                    <div
                      className="text-xs gold opacity-75 tracking-widest italic"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      {d.card.nameEn}
                    </div>
                    <div className="text-[10px] opacity-50 mt-1">
                      {suitLabels[d.card.suit]}
                    </div>
                  </div>
                </div>

                {/* 六段式解读 */}
                <div className="flex-1 min-w-0 space-y-5">
                  {/* 1. 关键词 */}
                  <div className="p-3 rounded bg-[rgba(212,175,55,0.05)] border border-[rgba(212,175,55,0.12)]">
                    <div
                      className="text-[10px] gold tracking-[0.25em] mb-1.5"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      ✦ KEYWORDS · 关键词
                    </div>
                    <div className="text-sm md:text-[15px] opacity-95 leading-relaxed">
                      {keywords}
                    </div>
                  </div>

                  {/* 2. 传统牌意 */}
                  <div>
                    <div
                      className="text-[10px] gold tracking-[0.25em] mb-1.5"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      ✦ TRADITIONAL MEANING · 传统牌意
                    </div>
                    <p className="text-sm md:text-[15px] leading-loose opacity-90">
                      {meaning}
                    </p>
                  </div>

                  {/* 3. 正/逆位深度含义 */}
                  <div>
                    <div
                      className="text-[10px] gold tracking-[0.25em] mb-1.5"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      ✦ {d.reversed ? "REVERSED" : "UPRIGHT"} DEPTH ·{" "}
                      {d.reversed ? "逆位" : "正位"}深度含义
                    </div>
                    <p className="text-sm md:text-[15px] leading-loose opacity-90">
                      {buildOrientationMeaning(d.card, d.reversed)}
                    </p>
                  </div>

                  {/* 4. 位置结合解读 */}
                  <div className="border-l-2 border-[var(--tarot-gold)]/40 pl-4">
                    <div
                      className="text-[10px] gold tracking-[0.25em] mb-1.5"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      ✦ IN THIS POSITION · 位置结合解读
                    </div>
                    <p className="text-sm md:text-[15px] leading-loose opacity-95">
                      {buildPositionInterpretation(
                        d.card,
                        d.reversed,
                        d.position,
                        spread,
                        question
                      )}
                    </p>
                  </div>

                  {/* 5. 建议行动 */}
                  <div className="p-4 rounded bg-[rgba(212,175,55,0.04)] border border-[rgba(212,175,55,0.15)]">
                    <div
                      className="text-[10px] gold tracking-[0.25em] mb-1.5"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      ✦ ACTION · 建议行动
                    </div>
                    <p className="text-sm md:text-[15px] leading-loose opacity-95">
                      {buildActionAdvice(d.card, d.reversed, d.position)}
                    </p>
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })}
      </section>

      {/* 综合建议（加长） */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 * drawnCards.length }}
        className="mb-12 p-6 md:p-9 rounded-lg border border-[var(--tarot-gold)]/40 bg-gradient-to-b from-[rgba(212,175,55,0.1)] to-transparent"
      >
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 gold" strokeWidth={1.5} />
          <div
            className="text-xs gold tracking-[0.3em]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            OVERALL READING · 综合建议
          </div>
        </div>
        <p
          className="text-sm md:text-base leading-loose whitespace-pre-line"
          style={{ fontFamily: "'Noto Serif SC', serif" }}
        >
          {overallAdvice}
        </p>
      </motion.section>

      {/* AI 深度解读 */}
      <AiInterpretation
        method="tarot"
        question={question}
        themeColor="#D4AF37"
        themeLabel="塔罗"
        loadingSymbol="✦"
        data={{
          spreadName: spread.name,
          spreadDesc: spread.desc,
          cards: drawnCards.map((d) => ({
            positionLabel: d.position.label,
            positionHint: d.position.hint,
            nameCn: d.card.nameCn,
            reversed: d.reversed,
            suitLabel: suitLabels[d.card.suit],
            keywordsPositive: d.card.keywordsPositive,
            keywordsNegative: d.card.keywordsNegative,
            uprightText: d.card.upright,
            reversedText: d.card.reversed,
          })),
        }}
      />

      {/* 操作 */}
      <section className="flex flex-col sm:flex-row gap-3 justify-center items-center">
        <Link href="/tarot" className="btn-primary">
          <RotateCcw className="w-4 h-4" strokeWidth={1.5} />
          <span style={{ fontFamily: "'Noto Serif SC', serif" }}>再抽一次</span>
        </Link>
        <Link href="/" className="btn-ghost">
          <Home className="w-4 h-4" strokeWidth={1.5} />
          <span style={{ fontFamily: "'Noto Serif SC', serif" }}>返回首页</span>
        </Link>
      </section>

      <div
        className="mt-10 text-center text-xs opacity-40 leading-relaxed"
        style={{ fontFamily: "'Noto Serif SC', serif" }}
      >
        结果仅供娱乐参考 · 塔罗不是宿命，它是一面镜子
      </div>
    </main>
  );
}

export default function TarotResult() {
  return (
    <Suspense
      fallback={
        <main className="max-w-4xl mx-auto px-6 py-16 text-center opacity-70">
          解读中…
        </main>
      }
    >
      <TarotResultInner />
    </Suspense>
  );
}
