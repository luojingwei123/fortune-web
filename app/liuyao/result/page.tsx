"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { RotateCcw, Home, Coins } from "lucide-react";
import {
  buildLiuyaoResult,
  buildLiuyaoInterpretation,
} from "@/data/liuyao";
import { trigrams } from "@/data/iching";
import AiInterpretation from "@/components/AiInterpretation";

const yaoNames = ["初爻", "二爻", "三爻", "四爻", "五爻", "上爻"];

function GuaDisplay({
  title,
  lines,
  dongPositions,
  shiPos,
  yingPos,
  guaName,
  upperName,
  lowerName,
}: {
  title: string;
  lines: number[];
  dongPositions?: number[];
  shiPos?: number;
  yingPos?: number;
  guaName: string;
  upperName?: string;
  lowerName?: string;
}) {
  const upperTri = upperName ? trigrams[upperName] : null;
  const lowerTri = lowerName ? trigrams[lowerName] : null;

  return (
    <div className="text-center">
      <div
        className="text-xs md:text-sm mb-4 opacity-70 tracking-widest"
        style={{ fontFamily: "'Noto Serif SC', serif" }}
      >
        {title}
      </div>
      <div className="flex flex-col-reverse gap-2 items-center mb-4 py-2 relative">
        {lines.map((f, i) => {
          const pos = i + 1;
          const isDong = dongPositions?.includes(pos);
          const isShi = shiPos === pos;
          const isYing = yingPos === pos;
          return (
            <div
              key={i}
              className="w-full flex items-center justify-center relative h-4 md:h-5"
            >
              <span
                className="absolute left-0 md:left-2 text-[10px] md:text-xs opacity-60"
                style={{
                  color: "var(--liuyao-bronze)",
                }}
              >
                {isShi ? "世" : isYing ? "应" : ""}
              </span>
              {f === 1 ? (
                <div
                  className="w-32 md:w-40 h-1.5 md:h-2 rounded-sm"
                  style={{ background: "var(--liuyao-bronze)" }}
                />
              ) : (
                <div className="flex gap-2 md:gap-3">
                  <div
                    className="w-14 md:w-[70px] h-1.5 md:h-2 rounded-sm"
                    style={{ background: "var(--liuyao-bronze)" }}
                  />
                  <div
                    className="w-14 md:w-[70px] h-1.5 md:h-2 rounded-sm"
                    style={{ background: "var(--liuyao-bronze)" }}
                  />
                </div>
              )}
              {isDong && (
                <span
                  className="absolute right-0 md:right-2 text-[10px] md:text-xs"
                  style={{ color: "var(--liuyao-bronze)" }}
                >
                  ○ 动
                </span>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-center gap-2 text-2xl md:text-3xl mb-1">
        {upperTri && <span>{upperTri.symbol}</span>}
        {lowerTri && <span>{lowerTri.symbol}</span>}
      </div>
      <div
        className="text-lg md:text-2xl"
        style={{
          fontFamily: "'ZCOOL XiaoWei', 'Noto Serif SC', serif",
          color: "var(--liuyao-bronze)",
        }}
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
            color: "var(--liuyao-bronze)",
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
        style={{
          fontFamily: "'Noto Serif SC', serif",
          color: "var(--liuyao-ink)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function LiuyaoResultInner() {
  const params = useSearchParams();
  const code = params.get("c") || "";
  const question = params.get("q") || "";

  const data = useMemo(() => {
    const result = buildLiuyaoResult(code);
    if (!result) return null;
    const interp = buildLiuyaoInterpretation(result, question);
    return { result, interp };
  }, [code, question]);

  if (!data) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-16 text-center">
        <p className="mb-6 opacity-70">摇卦结果参数错误</p>
        <Link href="/liuyao" className="btn-primary">
          重新摇卦
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
          className="text-xs tracking-[0.3em] mb-3 opacity-50"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: "var(--liuyao-bronze)",
          }}
        >
          — YOUR CAST —
        </div>
        <h1
          className="text-3xl md:text-5xl mb-4"
          style={{
            fontFamily: "'ZCOOL XiaoWei', 'Noto Serif SC', serif",
            color: "var(--liuyao-bronze)",
          }}
        >
          六爻已成
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
        className="mb-10 md:mb-14 rounded-lg p-6 md:p-10 border"
        style={{
          borderColor: "rgba(176,141,87,0.25)",
          background: "rgba(176,141,87,0.05)",
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <GuaDisplay
            title="本卦（当下之象）"
            lines={result.benLines}
            dongPositions={result.dongYaoPositions}
            shiPos={result.shiPos}
            yingPos={result.yingPos}
            guaName={result.benGua.name}
            upperName={result.benGua.upper}
            lowerName={result.benGua.lower}
          />
          {result.bianGua && (
            <GuaDisplay
              title="变卦（发展趋势）"
              lines={result.bianLines}
              guaName={result.bianGua.name}
              upperName={result.bianGua.upper}
              lowerName={result.bianGua.lower}
            />
          )}
        </div>

        <div
          className="mt-8 pt-6 border-t text-center text-xs md:text-sm opacity-75 flex flex-wrap gap-x-6 gap-y-2 justify-center"
          style={{
            borderColor: "rgba(176,141,87,0.2)",
            fontFamily: "'Noto Serif SC', serif",
          }}
        >
          <span>
            世爻：{yaoNames[result.shiPos - 1]}
          </span>
          <span>
            应爻：{yaoNames[result.yingPos - 1]}
          </span>
          <span>
            动爻：
            {result.dongYaoPositions.length === 0
              ? "无"
              : result.dongYaoPositions.map((p) => yaoNames[p - 1]).join("、")}
          </span>
        </div>
      </motion.section>

      {/* 解读段落 */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="mb-10 rounded-lg p-6 md:p-9 border"
        style={{
          borderColor: "rgba(176,141,87,0.15)",
          background: "rgba(255,255,255,0.02)",
        }}
      >
        <Section label="OVERVIEW" title="概览">
          {interp.overview}
        </Section>
        <Section label="BEN GUA" title={`本卦 · ${result.benGua.name}`}>
          {interp.benReading}
        </Section>
        <Section label="DONG YAO" title="动爻解读">
          {interp.dongReading}
        </Section>
        <Section
          label="BIAN GUA"
          title={`变卦 · ${result.bianGua ? result.bianGua.name : "无"}`}
        >
          {interp.bianReading}
        </Section>
        <Section label="SHI YING" title="世应关系">
          {interp.shiYingReading}
        </Section>
      </motion.section>

      {/* 综合建议 */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mb-12 p-6 md:p-9 rounded-lg border-2"
        style={{
          borderColor: "rgba(176,141,87,0.5)",
          background:
            "linear-gradient(180deg, rgba(176,141,87,0.15) 0%, transparent 100%)",
        }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Coins
            className="w-4 h-4"
            strokeWidth={1.5}
            style={{ color: "var(--liuyao-bronze)" }}
          />
          <div
            className="text-xs tracking-[0.3em]"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: "var(--liuyao-bronze)",
            }}
          >
            OVERALL · 综合断卦
          </div>
        </div>
        <p
          className="text-sm md:text-base leading-loose"
          style={{
            fontFamily: "'Noto Serif SC', serif",
            color: "var(--liuyao-ink)",
          }}
        >
          {interp.overall}
        </p>
      </motion.section>

      {/* AI 深度解读 */}
      <AiInterpretation
        method="liuyao"
        question={question}
        themeColor="#B08D57"
        themeLabel="六爻"
        loadingSymbol="⚯"
        data={{
          benGuaName: result.benGua.name,
          upperName: result.benGua.upper,
          lowerName: result.benGua.lower,
          benGuaCi: result.benGua.guaci,
          benXiangCi: result.benGua.xiangci,
          bianGuaName: result.bianGua?.name || "",
          bianGuaCi: result.bianGua?.guaci || "",
          bianXiangCi: result.bianGua?.xiangci || "",
          dongYaoNames:
            result.dongYaoPositions.length === 0
              ? "无动爻"
              : result.dongYaoPositions.map((p) => yaoNames[p - 1]).join("、"),
          shiName: yaoNames[result.shiPos - 1],
          yingName: yaoNames[result.yingPos - 1],
        }}
      />

      {/* 操作 */}
      <section className="flex flex-col sm:flex-row gap-3 justify-center items-center">
        <Link
          href="/liuyao"
          className="inline-flex items-center gap-2 px-6 py-3 rounded font-medium transition-all hover:brightness-110 hover:-translate-y-0.5"
          style={{
            background:
              "linear-gradient(135deg, var(--liuyao-bronze) 0%, var(--liuyao-bronze-soft) 100%)",
            color: "#0F1A24",
          }}
        >
          <RotateCcw className="w-4 h-4" strokeWidth={1.5} />
          <span
            style={{ fontFamily: "'ZCOOL XiaoWei', 'Noto Serif SC', serif" }}
          >
            再摇一卦
          </span>
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded border transition-all"
          style={{
            borderColor: "rgba(176,141,87,0.4)",
            color: "var(--liuyao-ink)",
          }}
        >
          <Home className="w-4 h-4" strokeWidth={1.5} />
          <span
            style={{ fontFamily: "'ZCOOL XiaoWei', 'Noto Serif SC', serif" }}
          >
            返回首页
          </span>
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

export default function LiuyaoResult() {
  return (
    <Suspense
      fallback={
        <main className="max-w-4xl mx-auto px-6 py-16 text-center opacity-60">
          解卦中…
        </main>
      }
    >
      <LiuyaoResultInner />
    </Suspense>
  );
}
