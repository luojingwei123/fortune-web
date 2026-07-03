"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface CollapsibleIntroProps {
  /** 主题色（章节标题、按钮）*/
  themeColor?: string;
  /** 章节小标题：ABOUT THIS METHOD 之类 */
  label?: string;
  /** 展开状态下的完整内容 */
  children: React.ReactNode;
  /** 默认显示的简短摘要（2 行内） */
  summary: React.ReactNode;
}

export default function CollapsibleIntro({
  themeColor = "#8B0000",
  label = "ABOUT THIS METHOD",
  children,
  summary,
}: CollapsibleIntroProps) {
  const [open, setOpen] = useState(false);

  return (
    <section
      className="mb-8 md:mb-14 rounded-lg border p-4 md:p-7"
      style={{
        borderColor: `${themeColor}33`,
        background: `${themeColor}0a`,
      }}
    >
      <div
        className="text-[10px] md:text-xs tracking-[0.25em] md:tracking-[0.3em] mb-2 md:mb-3"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          color: themeColor,
        }}
      >
        {label}
      </div>

      {/* 摘要（永久显示，两行内） */}
      <div
        className="text-[13px] md:text-[15px] leading-relaxed md:leading-loose opacity-90"
        style={{ fontFamily: "'Noto Serif SC', serif" }}
      >
        {summary}
      </div>

      {/* 展开的完整内容 */}
      {open && (
        <div
          className="mt-3 md:mt-4 pt-3 md:pt-4 border-t text-[13px] md:text-[15px] leading-relaxed md:leading-loose opacity-90 space-y-2"
          style={{
            fontFamily: "'Noto Serif SC', serif",
            borderColor: `${themeColor}22`,
          }}
        >
          {children}
        </div>
      )}

      {/* 展开/收起按钮 */}
      <button
        onClick={() => setOpen(!open)}
        className="mt-3 md:mt-4 inline-flex items-center gap-1 text-xs md:text-sm transition-opacity hover:opacity-80 active:opacity-60"
        style={{
          color: themeColor,
          fontFamily: "'Noto Serif SC', serif",
        }}
      >
        {open ? (
          <>
            <span>收起</span>
            <ChevronUp className="w-3.5 h-3.5" strokeWidth={2} />
          </>
        ) : (
          <>
            <span>查看详情</span>
            <ChevronDown className="w-3.5 h-3.5" strokeWidth={2} />
          </>
        )}
      </button>
    </section>
  );
}
