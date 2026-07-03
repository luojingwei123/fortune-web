"use client";

import { useEffect, useState } from "react";

/**
 * 临时诊断组件：显示 JS/hydration 是否激活
 * 部署验证完删除
 */
export default function HydrationDebug() {
  const [mounted, setMounted] = useState(false);
  const [clicks, setClicks] = useState(0);

  useEffect(() => {
    setMounted(true);
    // 挂个全局标记，方便控制台检查
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
        zIndex: 9999,
        background: mounted ? "#10b981" : "#ef4444",
        color: "white",
        padding: "4px 10px",
        borderRadius: 4,
        fontSize: 11,
        fontFamily: "monospace",
        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
        cursor: "pointer",
      }}
      onClick={() => setClicks((c) => c + 1)}
    >
      {mounted ? `✓ JS OK · 点击测试: ${clicks}` : "✗ NO JS"}
    </div>
  );
}
