"use client";

import { useEffect, useState } from "react";

/**
 * 诊断组件：显示 JS/hydration 是否激活
 */
export default function HydrationDebug() {
  const [mounted, setMounted] = useState(false);
  const [clicks, setClicks] = useState(0);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      (window as any).__HYDRATED__ = true;
      console.log("[fortune-web] hydration OK · React mounted");
    }
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 8,
        left: 8,
        zIndex: 99999,
        background: mounted ? "#10b981" : "#ef4444",
        color: "white",
        padding: "6px 12px",
        borderRadius: 6,
        fontSize: 12,
        fontFamily: "monospace",
        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
        cursor: "pointer",
        userSelect: "none",
        WebkitTapHighlightColor: "transparent",
      }}
      onClick={() => setClicks((c) => c + 1)}
    >
      {mounted ? `✓ JS OK · 点击: ${clicks}` : "✗ NO JS"}
    </div>
  );
}
