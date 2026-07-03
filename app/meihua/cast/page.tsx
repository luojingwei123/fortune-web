"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { trigramByNum } from "@/data/iching";

/**
 * 计算梅花起卦
 * 返回：上卦数、下卦数、动爻位（1-6）
 */
function castMeihua(method: string, params: URLSearchParams) {
  let a = 0,
    b = 0,
    c = 0;

  if (method === "time") {
    // 时间起卦：用当前时间
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const hour = now.getHours();
    // 时辰序：子=1(23-1) 丑=2(1-3) 寅=3(3-5)...
    const shichen = Math.floor(((hour + 1) % 24) / 2) + 1; // 1-12
    // 年数：取年 mod 12 + 1（近似地支）
    const yearNum = ((year - 4) % 12) + 1;
    a = yearNum + month + day;
    b = a + shichen;
    c = b;
  } else if (method === "number") {
    const n1 = parseInt(params.get("n1") || "0", 10);
    const n2 = parseInt(params.get("n2") || "0", 10);
    a = n1;
    b = n2;
    c = n1 + n2;
  } else if (method === "text") {
    const t = params.get("t") || "";
    // 字数（去除空格）
    const chars = t.replace(/\s/g, "");
    const total = chars.length;
    const half = Math.ceil(total / 2);
    a = half; // 上卦：前半
    b = total - half; // 下卦：后半
    if (b === 0) b = a; // 单字兜底
    c = total;
  }

  const upNum = a % 8 || 8;
  const downNum = b % 8 || 8;
  const dongYao = c % 6 || 6;
  return { upNum, downNum, dongYao, a, b, c };
}

function MeihuaCastInner() {
  const params = useSearchParams();
  const router = useRouter();
  const method = params.get("m") || "time";
  const question = params.get("q") || "";
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const { upNum, downNum, dongYao } = castMeihua(method, params);
    // 2 秒动画后跳转
    const timer = setTimeout(() => {
      const q = question;
      const url = `/meihua/result?up=${upNum}&down=${downNum}&yao=${dongYao}${
        q ? `&q=${encodeURIComponent(q)}` : ""
      }&m=${method}`;
      router.push(url);
    }, 2400);
    setReady(true);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="max-w-3xl mx-auto px-6 py-16 md:py-24 min-h-[70vh] flex flex-col items-center justify-center">
      <div className="text-center mb-10">
        <div
          className="text-xs tracking-[0.4em] mb-3 opacity-50"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          — CASTING —
        </div>
        <h1
          className="text-3xl md:text-4xl"
          style={{
            fontFamily: "'Ma Shan Zheng', 'Noto Serif SC', serif",
            color: "var(--meihua-red)",
          }}
        >
          正在起卦
        </h1>
      </div>

      {/* 水墨晕开动画 */}
      <div className="relative w-56 h-56 md:w-72 md:h-72 flex items-center justify-center">
        {/* 三层墨圈 */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1.4, 1],
              opacity: [0, 0.7, 0.15],
            }}
            transition={{
              duration: 2,
              delay: i * 0.35,
              ease: "easeOut",
              repeat: Infinity,
              repeatDelay: 0.3,
            }}
            className="absolute rounded-full"
            style={{
              width: `${60 + i * 20}%`,
              height: `${60 + i * 20}%`,
              border: "1px solid var(--meihua-ink)",
              background:
                i === 0
                  ? "radial-gradient(circle, rgba(14,14,14,0.15) 0%, transparent 60%)"
                  : "transparent",
            }}
          />
        ))}

        {/* 中心太极 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
          animate={{ opacity: 1, scale: 1, rotate: 360 }}
          transition={{ duration: 2.4, ease: "easeOut" }}
          className="relative z-10 text-6xl md:text-7xl"
          style={{ color: "var(--meihua-ink)" }}
        >
          ☯
        </motion.div>
      </div>

      <div
        className="mt-10 text-sm md:text-base opacity-60 text-center"
        style={{ fontFamily: "'Noto Serif SC', serif" }}
      >
        {ready && (
          <>
            静心片刻
            <br />
            让此刻的天地为你落一卦
          </>
        )}
      </div>
    </main>
  );
}

export default function MeihuaCast() {
  return (
    <Suspense
      fallback={
        <main className="max-w-3xl mx-auto px-6 py-16 text-center opacity-60">
          起卦中…
        </main>
      }
    >
      <MeihuaCastInner />
    </Suspense>
  );
}
