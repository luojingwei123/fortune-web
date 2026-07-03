"use client";

import { useEffect, useState } from "react";

/**
 * 诊断组件：显示 JS/hydration 是否激活 + 捕获全局错误
 */
export default function HydrationDebug() {
  const [mounted, setMounted] = useState(false);
  const [clicks, setClicks] = useState(0);
  const [errors, setErrors] = useState<string[]>([]);
  const [ua, setUa] = useState("");

  useEffect(() => {
    setMounted(true);
    setUa(navigator.userAgent.slice(0, 80));
    (window as any).__HYDRATED__ = true;
    console.log("[fortune-web] hydration OK · React mounted");

    const onError = (e: ErrorEvent) => {
      setErrors((prev) => [...prev, `ERR: ${e.message} @ ${e.filename}:${e.lineno}`]);
    };
    const onRejection = (e: PromiseRejectionEvent) => {
      setErrors((prev) => [
        ...prev,
        `REJECT: ${e.reason?.message || String(e.reason)}`,
      ]);
    };
    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);
    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 8,
        left: 8,
        right: 8,
        zIndex: 99999,
        background: mounted ? "#10b981" : "#ef4444",
        color: "white",
        padding: "6px 12px",
        borderRadius: 6,
        fontSize: 11,
        fontFamily: "monospace",
        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
        userSelect: "none",
        WebkitTapHighlightColor: "transparent",
        maxHeight: 200,
        overflow: "auto",
      }}
      onClick={() => setClicks((c) => c + 1)}
    >
      <div>{mounted ? `✓ JS OK · 点击: ${clicks}` : "✗ NO JS"}</div>
      {ua && (
        <div style={{ marginTop: 4, opacity: 0.8, fontSize: 10 }}>
          UA: {ua}
        </div>
      )}
      {errors.length > 0 && (
        <div style={{ marginTop: 4, fontSize: 10 }}>
          <b>{errors.length} 个错误:</b>
          {errors.slice(-3).map((e, i) => (
            <div key={i}>{e}</div>
          ))}
        </div>
      )}
    </div>
  );
}
