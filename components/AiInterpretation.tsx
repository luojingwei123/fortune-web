"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, RefreshCw, AlertCircle } from "lucide-react";

interface AiInterpretationProps {
  method: "tarot" | "meihua" | "liuyao" | "ziwei";
  question: string;
  data: any;
  /** 主题色（用于按钮和标题）*/
  themeColor?: string;
  /** loading 时的旋转符号，默认 ✦ */
  loadingSymbol?: string;
  /** 主题名称（塔罗牌/梅花易/六爻/紫微） */
  themeLabel?: string;
}

/**
 * 极简 markdown 渲染（不引入依赖）
 * 支持：## 标题、**粗体**、段落
 */
function renderMarkdown(text: string): React.ReactNode {
  const lines = text.split("\n");
  const blocks: React.ReactNode[] = [];
  let curPara: string[] = [];

  const flushPara = () => {
    if (curPara.length === 0) return;
    const paraText = curPara.join(" ").trim();
    if (paraText) {
      blocks.push(
        <p key={blocks.length} className="mb-3 leading-loose">
          {renderInline(paraText)}
        </p>
      );
    }
    curPara = [];
  };

  const renderInline = (s: string): React.ReactNode => {
    // 粗体 **xx**
    const parts = s.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((p, i) => {
      if (p.startsWith("**") && p.endsWith("**")) {
        return (
          <strong key={i} className="font-semibold">
            {p.slice(2, -2)}
          </strong>
        );
      }
      return p;
    });
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    if (line.startsWith("### ")) {
      flushPara();
      blocks.push(
        <h4
          key={blocks.length}
          className="text-base md:text-lg font-medium mt-6 mb-2 opacity-95"
        >
          {renderInline(line.slice(4))}
        </h4>
      );
    } else if (line.startsWith("## ")) {
      flushPara();
      blocks.push(
        <h3
          key={blocks.length}
          className="text-lg md:text-xl font-medium mt-6 mb-3"
        >
          {renderInline(line.slice(3))}
        </h3>
      );
    } else if (line.startsWith("# ")) {
      flushPara();
      blocks.push(
        <h2
          key={blocks.length}
          className="text-xl md:text-2xl font-medium mt-6 mb-3"
        >
          {renderInline(line.slice(2))}
        </h2>
      );
    } else if (line.trim() === "") {
      flushPara();
    } else {
      curPara.push(line);
    }
  }
  flushPara();
  return <>{blocks}</>;
}

export default function AiInterpretation({
  method,
  question,
  data,
  themeColor = "#D4AF37",
  loadingSymbol = "✦",
  themeLabel = "AI",
}: AiInterpretationProps) {
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "streaming" | "done" | "error"
  >("idle");
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const requestInterpretation = async () => {
    setContent("");
    setError(null);
    setStatus("loading");

    // 中断上次
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;

    try {
      const res = await fetch("/api/interpret", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ method, question, data }),
        signal: ctrl.signal,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "请求失败" }));
        setError(err.error || `HTTP ${res.status}`);
        setStatus("error");
        return;
      }

      if (!res.body) {
        setError("无响应流");
        setStatus("error");
        return;
      }

      setStatus("streaming");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data:")) continue;
          const payload = trimmed.slice(5).trim();
          if (payload === "[DONE]") continue;
          try {
            const obj = JSON.parse(payload);
            if (obj.error) {
              setError(obj.error);
              continue;
            }
            if (obj.delta) {
              setContent((prev) => prev + obj.delta);
            }
          } catch {
            // ignore
          }
        }
      }
      setStatus("done");
    } catch (e) {
      if ((e as Error).name === "AbortError") return;
      setError((e as Error).message);
      setStatus("error");
    }
  };

  return (
    <section
      className="mb-10 md:mb-12 p-6 md:p-9 rounded-lg border-2"
      style={{
        borderColor: `${themeColor}33`,
        background: `linear-gradient(180deg, ${themeColor}0d 0%, transparent 100%)`,
      }}
    >
      <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
        <div className="flex items-center gap-2">
          <Sparkles
            className="w-4 h-4"
            strokeWidth={1.5}
            style={{ color: themeColor }}
          />
          <div
            className="text-xs tracking-[0.3em]"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: themeColor,
            }}
          >
            AI DEEP READING · {themeLabel} 深度解读
          </div>
        </div>
        {status === "done" && (
          <button
            onClick={requestInterpretation}
            className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded border transition-opacity hover:opacity-80"
            style={{
              borderColor: `${themeColor}66`,
              color: themeColor,
            }}
          >
            <RefreshCw className="w-3 h-3" strokeWidth={1.5} />
            重新生成
          </button>
        )}
      </div>

      {/* idle · 未请求 */}
      {status === "idle" && (
        <div className="text-center py-6">
          <p
            className="text-sm md:text-base opacity-80 mb-5 leading-relaxed"
            style={{ fontFamily: "'Noto Serif SC', serif" }}
          >
            让 AI 根据你的问题与占卜结果生成一段更深入、更个性化的解读。
            <br />
            <span className="text-xs opacity-60">
              使用 DeepSeek V4 Pro · 首次生成约需 5-15 秒
            </span>
          </p>
          <button
            onClick={requestInterpretation}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded font-medium transition-all duration-200 hover:brightness-110 hover:-translate-y-0.5"
            style={{
              background: `linear-gradient(135deg, ${themeColor} 0%, ${themeColor}bb 100%)`,
              color: "#0F0724",
              border: `1px solid ${themeColor}`,
            }}
          >
            <Sparkles className="w-4 h-4" strokeWidth={1.5} />
            <span style={{ fontFamily: "'Noto Serif SC', serif" }}>
              生成 AI 深度解读
            </span>
          </button>
        </div>
      )}

      {/* loading · 首字节前 */}
      {status === "loading" && (
        <div className="text-center py-10 md:py-14">
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.15, 1],
            }}
            transition={{
              rotate: { duration: 2.5, repeat: Infinity, ease: "linear" },
              scale: { duration: 1.4, repeat: Infinity, ease: "easeInOut" },
            }}
            className="inline-block text-5xl md:text-6xl mb-4"
            style={{ color: themeColor }}
          >
            {loadingSymbol}
          </motion.div>
          <div
            className="text-sm md:text-base mb-2"
            style={{
              fontFamily: "'Noto Serif SC', serif",
              color: themeColor,
            }}
          >
            AI 正在分析结果…
          </div>
          <div
            className="text-xs opacity-60 leading-relaxed"
            style={{ fontFamily: "'Noto Serif SC', serif" }}
          >
            正在连接大模型 · 综合你的问题与占卜结果生成个性化解读
          </div>
          <ThinkingDots color={themeColor} />
        </div>
      )}

      {/* streaming 或 done · 显示内容 */}
      {(status === "streaming" || status === "done") && content && (
        <div>
          {status === "streaming" && (
            <div
              className="mb-3 flex items-center gap-2 text-xs"
              style={{ color: themeColor, fontFamily: "'Noto Serif SC', serif" }}
            >
              <motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              >
                ●
              </motion.span>
              AI 生成中…
            </div>
          )}
          <div
            className="text-sm md:text-[15px] leading-loose"
            style={{
              fontFamily: "'Noto Serif SC', serif",
            }}
          >
            {renderMarkdown(content)}
            {status === "streaming" && (
              <motion.span
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block ml-0.5"
                style={{ color: themeColor }}
              >
                ▍
              </motion.span>
            )}
          </div>
        </div>
      )}

      {/* error */}
      {status === "error" && error && (
        <div className="py-6">
          <div className="flex items-start gap-3 p-4 rounded border border-red-400/40 bg-red-950/20 mb-3">
            <AlertCircle
              className="w-4 h-4 mt-0.5 flex-shrink-0"
              strokeWidth={1.5}
              style={{ color: "#ff6b6b" }}
            />
            <div className="text-sm text-red-200 flex-1">
              {error}
            </div>
          </div>
          <div className="text-center">
            <button
              onClick={requestInterpretation}
              className="inline-flex items-center gap-2 px-5 py-2 rounded border transition-opacity hover:opacity-80 text-sm"
              style={{
                borderColor: `${themeColor}66`,
                color: themeColor,
              }}
            >
              <RefreshCw className="w-3.5 h-3.5" strokeWidth={1.5} />
              重试
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

function ThinkingDots({ color }: { color: string }) {
  return (
    <div className="flex justify-center gap-1.5 mt-4">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          animate={{
            y: [0, -6, 0],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
          className="inline-block w-1.5 h-1.5 rounded-full"
          style={{ background: color }}
        />
      ))}
    </div>
  );
}
