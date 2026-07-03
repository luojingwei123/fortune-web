"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { RotateCcw, Home, Sparkles } from "lucide-react";
import { tarotDeck, suitLabels } from "@/data/tarot";
import { getSpread } from "@/data/spreads";

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

/**
 * 静态解读生成器（无 LLM）：
 * 根据牌阵位置含义 + 牌意（正/逆）+ 关键词，生成结合上下文的段落。
 */
function buildInterpretation(opts: {
  spreadName: string;
  positionLabel: string;
  positionHint: string;
  cardName: string;
  reversed: boolean;
  meaning: string;
  keywords: string;
}): string {
  const { positionLabel, positionHint, cardName, reversed, meaning, keywords } =
    opts;
  const orient = reversed ? "逆位" : "正位";
  return `在「${positionLabel}」这个位置，你抽到了${cardName}（${orient}）。此位置代表：${positionHint}。${orient}状态下的这张牌暗示：${meaning}关键词：${keywords}。`;
}

/**
 * 综合建议：把所有位置的关键词合并 → 给出一段综合语。
 */
function buildOverallAdvice(
  cards: { card: (typeof tarotDeck)[number]; reversed: boolean }[],
  question: string
): string {
  const posCount = cards.filter((c) => !c.reversed).length;
  const negCount = cards.length - posCount;

  let mood = "";
  if (posCount === cards.length) {
    mood =
      "整体牌面积极正向，能量流动顺畅。当前是行动、投入、把握机会的好时机。";
  } else if (negCount === cards.length) {
    mood =
      "整体牌面偏向阻滞与反思，暗示需要放慢脚步、审视内心，或调整方向。";
  } else if (posCount > negCount) {
    mood =
      "整体正向多于阻碍。虽然存在一些需要面对的挑战，但主线仍是向前推进的。";
  } else if (negCount > posCount) {
    mood =
      "阻碍略多于顺遂。这段时期需要多一些耐心和审视，与其硬闯，不如调整。";
  } else {
    mood = "顺逆并存。牌面提醒你在推进的同时也要留意暗流。";
  }

  const themes = cards
    .flatMap((c) => c.card.keywordsPositive.split("、"))
    .slice(0, 6)
    .join("、");

  const questionPart = question
    ? `围绕你的问题「${question}」，`
    : "综合来看，";

  return `${questionPart}${mood}你需要关注的核心主题包括：${themes}。塔罗从来不预言唯一未来，它是一面镜子，映照出你此刻的状态与可能性。真正的选择权仍在你自己手中。`;
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
    return buildOverallAdvice(
      drawnCards.map((d) => ({ card: d.card, reversed: d.reversed })),
      question
    );
  }, [drawnCards, question]);

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

      {/* 卡牌网格 */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12">
        {drawnCards.map((d, idx) => {
          const meaning = d.reversed ? d.card.reversed : d.card.upright;
          const keywords = d.reversed
            ? d.card.keywordsNegative
            : d.card.keywordsPositive;

          return (
            <motion.div
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
                  <span
                    className="text-sm md:text-base"
                    style={{ fontFamily: "'Noto Serif SC', serif" }}
                  >
                    {d.position.label}
                  </span>
                </div>
                <span
                  className={`text-xs px-2 py-0.5 rounded border ${
                    d.reversed
                      ? "border-red-400/50 text-red-300/90"
                      : "border-[var(--tarot-gold)]/50 gold"
                  }`}
                >
                  {d.reversed ? "逆位" : "正位"}
                </span>
              </div>

              <div className="p-5 md:p-6 flex flex-col md:flex-row gap-5 md:gap-6">
                {/* 牌图 */}
                <div className="flex-shrink-0 mx-auto md:mx-0">
                  <div className="w-28 md:w-36 rounded-lg overflow-hidden shadow-[0_0_25px_rgba(212,175,55,0.2)] border border-[var(--tarot-gold)]/40">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={d.card.image}
                      alt={d.card.nameCn}
                      className={`w-full ${d.reversed ? "rotate-180" : ""}`}
                    />
                  </div>
                </div>

                {/* 牌意 */}
                <div className="flex-1 min-w-0">
                  <div className="mb-3">
                    <div
                      className="text-xl md:text-2xl mb-1"
                      style={{ fontFamily: "'Noto Serif SC', serif" }}
                    >
                      {d.card.nameCn}
                    </div>
                    <div
                      className="text-xs gold opacity-75 tracking-widest italic"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      {d.card.nameEn} · {suitLabels[d.card.suit]}
                    </div>
                  </div>

                  {/* ⚠️ 原本结果（客观牌意） */}
                  <div className="mb-3 p-3 rounded bg-[rgba(212,175,55,0.05)] border border-[rgba(212,175,55,0.12)]">
                    <div
                      className="text-[10px] gold tracking-[0.2em] mb-1"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      KEYWORDS · 关键词
                    </div>
                    <div className="text-xs md:text-sm opacity-90">
                      {keywords}
                    </div>
                  </div>

                  <div className="mb-3">
                    <div
                      className="text-[10px] gold tracking-[0.2em] mb-1"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      CARD MEANING · 牌意
                    </div>
                    <p className="text-xs md:text-sm leading-relaxed opacity-90">
                      {meaning}
                    </p>
                  </div>

                  {/* ⚠️ 解读（结合位置的解释） */}
                  <div>
                    <div
                      className="text-[10px] gold tracking-[0.2em] mb-1"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      INTERPRETATION · 位置解读
                    </div>
                    <p className="text-xs md:text-sm leading-relaxed opacity-80 italic">
                      {buildInterpretation({
                        spreadName: spread.name,
                        positionLabel: d.position.label,
                        positionHint: d.position.hint,
                        cardName: d.card.nameCn,
                        reversed: d.reversed,
                        meaning,
                        keywords,
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </section>

      {/* 综合建议 */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 * drawnCards.length }}
        className="mb-12 p-6 md:p-8 rounded-lg border border-[var(--tarot-gold)]/40 bg-gradient-to-b from-[rgba(212,175,55,0.08)] to-transparent"
      >
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 gold" strokeWidth={1.5} />
          <div
            className="text-xs gold tracking-[0.3em]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            OVERALL · 综合建议
          </div>
        </div>
        <p
          className="text-sm md:text-base leading-loose"
          style={{ fontFamily: "'Noto Serif SC', serif" }}
        >
          {overallAdvice}
        </p>
      </motion.section>

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
