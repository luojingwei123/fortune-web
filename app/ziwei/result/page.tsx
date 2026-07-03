"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { RotateCcw, Home, Star } from "lucide-react";
import {
  castZiweiClient,
  buildZiweiInterpretation,
  twelvePalaces,
  type ZiweiChartMini,
  type ZiweiInterpretation,
} from "@/data/ziwei";

// 十二地支的相对位置（顺时针从子开始）
// 命盘布局：紫微斗数命盘按地支排（子在正下方偏右，顺时针 12 宫）
// 简化：用 4x4 grid，外圈 12 格，中央 4 格显示概览
const branchPositions: Record<string, { row: number; col: number }> = {
  巳: { row: 0, col: 0 },
  午: { row: 0, col: 1 },
  未: { row: 0, col: 2 },
  申: { row: 0, col: 3 },
  辰: { row: 1, col: 0 },
  酉: { row: 1, col: 3 },
  卯: { row: 2, col: 0 },
  戌: { row: 2, col: 3 },
  寅: { row: 3, col: 0 },
  丑: { row: 3, col: 1 },
  子: { row: 3, col: 2 },
  亥: { row: 3, col: 3 },
};

function PalaceCell({ palace }: { palace: any }) {
  const majors = palace.stars.filter((s: any) => s.type === "major");
  const others = palace.stars.filter((s: any) => s.type !== "major").slice(0, 3);

  const bgClass = palace.isMing
    ? "bg-[rgba(201,162,39,0.15)] border-[var(--ziwei-gold)]"
    : palace.isCurrentDaXian
      ? "bg-[rgba(155,89,182,0.15)] border-[var(--ziwei-purple)]"
      : "bg-[rgba(255,255,255,0.02)] border-[var(--ziwei-purple)]/30";

  return (
    <div
      className={`relative border p-2 md:p-3 rounded ${bgClass} min-h-[100px] md:min-h-[140px] flex flex-col`}
    >
      {/* 主星 */}
      <div className="flex-1 space-y-1">
        {majors.map((s: any, i: number) => (
          <div
            key={i}
            className="text-xs md:text-sm font-medium"
            style={{
              color:
                s.brightness === "bright"
                  ? "var(--ziwei-gold)"
                  : s.brightness === "dim"
                    ? "var(--ziwei-purple-soft)"
                    : "var(--ziwei-star)",
              fontFamily: "'Noto Serif SC', serif",
            }}
          >
            {s.name}
            {s.siHua && (
              <span
                className="ml-1 text-[9px]"
                style={{ color: "var(--ziwei-gold)" }}
              >
                {s.siHua}
              </span>
            )}
          </div>
        ))}
        {majors.length === 0 && (
          <div className="text-[10px] md:text-xs opacity-40">空宫</div>
        )}
      </div>
      {/* 次星（简略） */}
      {others.length > 0 && (
        <div className="mt-1 text-[9px] md:text-[10px] opacity-50 leading-tight">
          {others.map((s: any) => s.name).join(" · ")}
        </div>
      )}
      {/* 宫名 · 地支 */}
      <div
        className="mt-2 pt-1 border-t border-white/10 flex items-center justify-between text-[10px] md:text-xs"
        style={{ fontFamily: "'Cinzel', 'Noto Serif SC', serif" }}
      >
        <span
          style={{
            color: palace.isMing ? "var(--ziwei-gold)" : "inherit",
            fontWeight: palace.isMing ? 600 : 400,
          }}
        >
          {palace.name}
          {palace.isShen && <span className="ml-1 opacity-70">·身</span>}
        </span>
        <span className="opacity-60">
          {palace.stemName}
          {palace.branchName}
        </span>
      </div>
      {palace.isCurrentDaXian && palace.daXianRange && (
        <div
          className="absolute -top-2 right-1 text-[9px] px-1.5 py-0.5 rounded"
          style={{
            background: "var(--ziwei-purple)",
            color: "#fff",
          }}
        >
          {palace.daXianRange[0]}-{palace.daXianRange[1]}
        </div>
      )}
    </div>
  );
}

function Section({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6 md:mb-8">
      <div className="flex items-baseline gap-3 mb-3">
        <span
          className="text-xs tracking-[0.25em]"
          style={{
            fontFamily: "'Cinzel', serif",
            color: "var(--ziwei-gold)",
          }}
        >
          ✦ {label}
        </span>
        <span
          className="text-base md:text-lg"
          style={{ fontFamily: "'Noto Serif SC', serif" }}
        >
          {title}
        </span>
      </div>
      <div
        className="text-sm md:text-[15px] leading-loose opacity-90 whitespace-pre-line pl-1"
        style={{ fontFamily: "'Noto Serif SC', serif" }}
      >
        {children}
      </div>
    </div>
  );
}

function ZiweiResultInner() {
  const params = useSearchParams();
  const [chart, setChart] = useState<ZiweiChartMini | null>(null);
  const [interp, setInterp] = useState<ZiweiInterpretation | null>(null);
  const [error, setError] = useState<string | null>(null);

  const y = parseInt(params.get("y") || "0", 10);
  const m = parseInt(params.get("m") || "0", 10);
  const d = parseInt(params.get("d") || "0", 10);
  const h = parseInt(params.get("h") || "0", 10);
  const g = (params.get("g") || "male") as "male" | "female";
  const question = params.get("q") || "";

  useEffect(() => {
    if (!y || !m || !d) {
      setError("生辰参数错误");
      return;
    }
    (async () => {
      try {
        const c = await castZiweiClient(y, m, d, h, g);
        setChart(c);
        setInterp(buildZiweiInterpretation(c, question));
      } catch (e) {
        console.error(e);
        setError("排盘失败：" + (e as Error).message);
      }
    })();
  }, [y, m, d, h, g, question]);

  if (error) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-16 text-center">
        <p className="mb-6 opacity-70">{error}</p>
        <Link href="/ziwei" className="btn-primary">
          重新排盘
        </Link>
      </main>
    );
  }

  if (!chart || !interp) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-24 text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="inline-block text-6xl mb-4"
          style={{ color: "var(--ziwei-gold)" }}
        >
          ✦
        </motion.div>
        <p className="opacity-70">正在观星排盘…</p>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12">
      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8 md:mb-12"
      >
        <div
          className="text-xs tracking-[0.3em] mb-3 opacity-50"
          style={{ fontFamily: "'Cinzel', serif", color: "var(--ziwei-gold)" }}
        >
          — YOUR CHART —
        </div>
        <h1
          className="text-3xl md:text-5xl mb-3"
          style={{
            fontFamily: "'Cinzel', 'Noto Serif SC', serif",
            color: "var(--ziwei-gold)",
          }}
        >
          十二宫命盘
        </h1>
        <p
          className="text-xs md:text-sm opacity-70"
          style={{ fontFamily: "'Noto Serif SC', serif" }}
        >
          {y} 年 {m} 月 {d} 日 · {g === "male" ? "男" : "女"} · 五行局：{chart.wuxingJuName} · 今年 {chart.currentAge} 岁
        </p>
        {question && (
          <p
            className="mt-4 text-sm md:text-base italic opacity-80 max-w-2xl mx-auto"
            style={{ fontFamily: "'Noto Serif SC', serif" }}
          >
            &ldquo;{question}&rdquo;
          </p>
        )}
      </motion.section>

      {/* 命盘 4x4 */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="mb-10 md:mb-12"
      >
        <div className="grid grid-cols-4 grid-rows-4 gap-1.5 md:gap-2 max-w-4xl mx-auto aspect-square">
          {chart.palaces.map((p) => {
            const pos = branchPositions[p.branchName];
            if (!pos) return null;
            return (
              <div
                key={p.branchName}
                style={{
                  gridColumn: pos.col + 1,
                  gridRow: pos.row + 1,
                }}
              >
                <PalaceCell palace={p} />
              </div>
            );
          })}
          {/* 中央 · 概览 */}
          <div
            className="col-start-2 col-span-2 row-start-2 row-span-2 flex flex-col items-center justify-center border rounded p-4 text-center"
            style={{
              borderColor: "rgba(201,162,39,0.35)",
              background:
                "radial-gradient(circle, rgba(155,89,182,0.15) 0%, transparent 70%)",
            }}
          >
            <div
              className="text-xs md:text-sm opacity-70 mb-2 tracking-widest"
              style={{
                fontFamily: "'Cinzel', serif",
                color: "var(--ziwei-gold)",
              }}
            >
              ZI WEI CHART
            </div>
            <div
              className="text-lg md:text-2xl mb-1"
              style={{ fontFamily: "'Noto Serif SC', serif" }}
            >
              命宫在 {chart.mingGongBranch}
            </div>
            <div className="text-xs md:text-sm opacity-70 mb-3">
              身宫在 {chart.shenGongBranch}
            </div>
            <div className="text-[10px] md:text-xs opacity-50 space-y-1">
              <div>紫微 · {chart.ziweiPos}</div>
              <div>{chart.wuxingJuName}</div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 图例 */}
      <div className="text-center text-[11px] md:text-xs opacity-60 mb-8 flex flex-wrap gap-4 justify-center">
        <span>
          <span
            className="inline-block w-3 h-3 rounded-sm mr-1 align-middle border"
            style={{
              background: "rgba(201,162,39,0.15)",
              borderColor: "var(--ziwei-gold)",
            }}
          />
          命宫
        </span>
        <span>
          <span
            className="inline-block w-3 h-3 rounded-sm mr-1 align-middle border"
            style={{
              background: "rgba(155,89,182,0.15)",
              borderColor: "var(--ziwei-purple)",
            }}
          />
          当前大限
        </span>
        <span style={{ color: "var(--ziwei-gold)" }}>星曜金色 = 庙旺</span>
      </div>

      {/* 解读 */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="mb-10 rounded-lg p-6 md:p-9 border"
        style={{
          borderColor: "rgba(155,89,182,0.25)",
          background: "rgba(255,255,255,0.02)",
        }}
      >
        <Section label="OVERVIEW" title="概览">
          {interp.overview}
        </Section>
        <Section label="MING GONG" title="命宫解读">
          {interp.mingGongReading}
        </Section>
        <Section label="SHEN GONG" title="身宫解读">
          {interp.shenGongReading}
        </Section>
        <Section label="KEY PALACES" title="重点宫位">
          {interp.keyPalacesReading}
        </Section>
        <Section label="DA XIAN" title="当前大限（十年运）">
          {interp.currentDaXian}
        </Section>
      </motion.section>

      {/* 综合建议 */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mb-12 p-6 md:p-9 rounded-lg border-2"
        style={{
          borderColor: "rgba(201,162,39,0.4)",
          background:
            "linear-gradient(180deg, rgba(201,162,39,0.1) 0%, transparent 100%)",
        }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Star
            className="w-4 h-4"
            strokeWidth={1.5}
            style={{ color: "var(--ziwei-gold)" }}
          />
          <div
            className="text-xs tracking-[0.3em]"
            style={{
              fontFamily: "'Cinzel', serif",
              color: "var(--ziwei-gold)",
            }}
          >
            OVERALL · 综合建议
          </div>
        </div>
        <p
          className="text-sm md:text-base leading-loose whitespace-pre-line"
          style={{ fontFamily: "'Noto Serif SC', serif" }}
        >
          {interp.overall}
        </p>
      </motion.section>

      {/* 操作 */}
      <section className="flex flex-col sm:flex-row gap-3 justify-center items-center">
        <Link
          href="/ziwei"
          className="inline-flex items-center gap-2 px-6 py-3 rounded font-medium transition-all hover:brightness-110 hover:-translate-y-0.5"
          style={{
            background:
              "linear-gradient(135deg, var(--ziwei-gold) 0%, #a67e1b 100%)",
            color: "#0A0E27",
          }}
        >
          <RotateCcw className="w-4 h-4" strokeWidth={1.5} />
          <span
            style={{ fontFamily: "'Cinzel', 'Noto Serif SC', serif" }}
          >
            重新排盘
          </span>
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded border transition-all"
          style={{
            borderColor: "rgba(201,162,39,0.4)",
            color: "var(--ziwei-star)",
          }}
        >
          <Home className="w-4 h-4" strokeWidth={1.5} />
          <span style={{ fontFamily: "'Noto Serif SC', serif" }}>
            返回首页
          </span>
        </Link>
      </section>

      <div
        className="mt-10 text-center text-xs opacity-40 leading-relaxed"
        style={{ fontFamily: "'Noto Serif SC', serif" }}
      >
        结果仅供娱乐参考 · 命是天赋，运是选择
      </div>
    </main>
  );
}

export default function ZiweiResult() {
  return (
    <Suspense
      fallback={
        <main className="max-w-4xl mx-auto px-6 py-16 text-center opacity-60">
          排盘中…
        </main>
      }
    >
      <ZiweiResultInner />
    </Suspense>
  );
}
