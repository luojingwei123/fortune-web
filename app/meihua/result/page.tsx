"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { RotateCcw, Home, Flower2 } from "lucide-react";
import {
  buildMeihuaResult,
  buildMeihuaInterpretation,
} from "@/data/meihua";

interface HexLineProps {
  filled: number; // 1 阳（连线） 0 阴（断线）
  isDong?: boolean;
}

function HexLine({ filled, isDong }: HexLineProps) {
  return (
    <div className="w-full flex items-center justify-center relative h-4 md:h-5">
      {filled === 1 ? (
        <div
          className="w-32 md:w-40 h-1.5 md:h-2 rounded-sm"
          style={{ background: "var(--meihua-ink)" }}
        />
      ) : (
        <div className="flex gap-2 md:gap-3">
          <div
            className="w-14 md:w-[70px] h-1.5 md:h-2 rounded-sm"
            style={{ background: "var(--meihua-ink)" }}
          />
          <div
            className="w-14 md:w-[70px] h-1.5 md:h-2 rounded-sm"
            style={{ background: "var(--meihua-ink)" }}
          />
        </div>
      )}
      {isDong && (
        <span
          className="absolute -right-8 md:-right-10 text-xs md:text-sm"
          style={{ color: "var(--meihua-red)" }}
        >
          ○ 动
        </span>
      )}
    </div>
  );
}

function GuaColumn({
  title,
  lines,
  dongYao,
  guaName,
  upperSymbol,
  lowerSymbol,
}: {
  title: string;
  lines: number[]; // 从下到上
  dongYao?: number;
  guaName: string;
  upperSymbol: string;
  lowerSymbol: string;
}) {
  return (
    <div className="text-center">
      <div
        className="text-xs md:text-sm mb-3 opacity-70 tracking-widest"
        style={{ fontFamily: "'Noto Serif SC', serif" }}
      >
        {title}
      </div>
      <div className="flex flex-col-reverse gap-1.5 md:gap-2 items-center mb-4 py-2">
        {lines.map((f, i) => (
          <HexLine
            key={i}
            filled={f}
            isDong={dongYao === i + 1}
          />
        ))}
      </div>
      <div className="flex items-center justify-center gap-2 text-2xl md:text-3xl mb-1">
        <span>{upperSymbol}</span>
        <span>{lowerSymbol}</span>
      </div>
      <div
        className="text-lg md:text-2xl"
        style={{ fontFamily: "'Ma Shan Zheng', 'Noto Serif SC', serif" }}
      >
        {guaName}
      </div>
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
            fontFamily: "'Cormorant Garamond', serif",
            color: "var(--meihua-red)",
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

function MeihuaResultInner() {
  const params = useSearchParams();
  const up = parseInt(params.get("up") || "0", 10);
  const down = parseInt(params.get("down") || "0", 10);
  const yao = parseInt(params.get("yao") || "0", 10);
  const question = params.get("q") || "";
  const method = params.get("m") || "time";

  const data = useMemo(() => {
    const result = buildMeihuaResult(up, down, yao);
    if (!result) return null;
    const interp = buildMeihuaInterpretation(result, question, method);
    return { result, interp };
  }, [up, down, yao, question, method]);

  if (!data) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-16 text-center">
        <p className="mb-6 opacity-70">起卦参数错误</p>
        <Link href="/meihua" className="btn-primary">
          重新起卦
        </Link>
      </main>
    );
  }

  const { result, interp } = data;

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
          className="text-xs tracking-[0.3em] mb-3 opacity-60"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          — YOUR CAST —
        </div>
        <h1
          className="text-3xl md:text-5xl mb-4"
          style={{
            fontFamily: "'Ma Shan Zheng', 'Noto Serif SC', serif",
            color: "var(--meihua-red)",
          }}
        >
          落定一卦
        </h1>
        {question && (
          <p
            className="mt-4 text-sm md:text-base italic opacity-80 max-w-2xl mx-auto"
            style={{ fontFamily: "'Noto Serif SC', serif" }}
          >
            &ldquo;{question}&rdquo;
          </p>
        )}
      </motion.section>

      {/* 卦象展示 */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="mb-10 md:mb-14 bg-white/60 border-2 border-[var(--meihua-border)] rounded-lg p-6 md:p-10"
      >
        <div className="grid grid-cols-2 gap-6 md:gap-12">
          <GuaColumn
            title="本卦（当下之象）"
            lines={result.benLines}
            dongYao={result.dongYao}
            guaName={result.benGua.name}
            upperSymbol={result.upper.symbol}
            lowerSymbol={result.lower.symbol}
          />
          {result.bianGua && (
            <GuaColumn
              title="变卦（未来趋势）"
              lines={result.bianLines}
              guaName={result.bianGua.name}
              upperSymbol={result.bianGua.upper === result.upper.name ? result.upper.symbol : "☰☱☲☳☴☵☶☷"[["乾","兑","离","震","巽","坎","艮","坤"].indexOf(result.bianGua.upper)]}
              lowerSymbol={"☰☱☲☳☴☵☶☷"[["乾","兑","离","震","巽","坎","艮","坤"].indexOf(result.bianGua.lower)]}
            />
          )}
        </div>

        <div
          className="mt-8 pt-6 border-t border-[var(--meihua-border)] text-center text-xs md:text-sm opacity-75"
          style={{ fontFamily: "'Noto Serif SC', serif" }}
        >
          <div className="mb-1">
            体卦：<span className="font-medium">{result.ti.name}</span>（属{result.ti.element}）
            <span className="mx-3 opacity-40">·</span>
            用卦：<span className="font-medium">{result.yong.name}</span>（属{result.yong.element}）
          </div>
          <div style={{ color: "var(--meihua-red)" }}>
            {result.tiYong === "yong_sheng_ti" && "用生体 · 吉"}
            {result.tiYong === "ti_sheng_yong" && "体生用 · 泄气"}
            {result.tiYong === "yong_ke_ti" && "用克体 · 凶"}
            {result.tiYong === "ti_ke_yong" && "体克用 · 可胜"}
            {result.tiYong === "bihe" && "体用比和 · 吉"}
          </div>
        </div>
      </motion.section>

      {/* 解读段落 */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="mb-10 bg-white/50 border border-[var(--meihua-border)] rounded-lg p-6 md:p-9"
      >
        <Section label="OVERVIEW" title="概览">
          {interp.overview}
        </Section>
        <Section label="BEN GUA" title={`本卦 · ${result.benGua.name}`}>
          {interp.benGuaReading}
        </Section>
        <Section label="DONG YAO" title="动爻解读">
          {interp.dongYaoReading}
        </Section>
        <Section
          label="BIAN GUA"
          title={`变卦 · ${result.bianGua ? result.bianGua.name : "无"}`}
        >
          {interp.bianGuaReading}
        </Section>
        <Section label="TI-YONG" title="体用生克">
          {interp.tiYongReading}
        </Section>
      </motion.section>

      {/* 综合建议 */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mb-12 p-6 md:p-9 rounded-lg border-2 border-[var(--meihua-red)]/40 bg-gradient-to-b from-red-50/60 to-transparent"
      >
        <div className="flex items-center gap-2 mb-4">
          <Flower2 className="w-4 h-4" strokeWidth={1.5} style={{ color: "var(--meihua-red)" }} />
          <div
            className="text-xs tracking-[0.3em]"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: "var(--meihua-red)",
            }}
          >
            OVERALL · 综合断卦
          </div>
        </div>
        <p
          className="text-sm md:text-base leading-loose"
          style={{ fontFamily: "'Noto Serif SC', serif" }}
        >
          {interp.overall}
        </p>
      </motion.section>

      {/* 操作 */}
      <section className="flex flex-col sm:flex-row gap-3 justify-center items-center">
        <Link
          href="/meihua"
          className="btn-primary"
          style={{ background: "var(--meihua-red)" }}
        >
          <RotateCcw className="w-4 h-4" strokeWidth={1.5} />
          <span style={{ fontFamily: "'Noto Serif SC', serif" }}>再起一卦</span>
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
        结果仅供娱乐参考 · 卦不定命，人自定命
      </div>
    </main>
  );
}

export default function MeihuaResult() {
  return (
    <Suspense
      fallback={
        <main className="max-w-4xl mx-auto px-6 py-16 text-center opacity-60">
          解卦中…
        </main>
      }
    >
      <MeihuaResultInner />
    </Suspense>
  );
}
