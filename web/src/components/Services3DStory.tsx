"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// ─── Config ───────────────────────────────────────────────────────────────────
const TOTAL = 150;
const SCROLL_H = "350vh";
const LERP = 0.3;

// ─── Services-specific panels: Blueprint → Completed ─────────────────────────
const PANELS = [
  {
    tag: "01 — Blueprint",
    h: "Blueprint",
    sub: "Engineering + Architecture concept — authority-compliant drawings, initial assessment and jurisdiction mapping.",
    from: 0.0,
    to: 0.16,
    side: "l" as const,
  },
  {
    tag: "02 — Structure",
    h: "Structure",
    sub: "Structural validation and coordination — load paths, Dubai Municipality & DCD life-safety compliance.",
    from: 0.17,
    to: 0.33,
    side: "r" as const,
  },
  {
    tag: "03 — MEP",
    h: "MEP",
    sub: "Mechanical, Electrical & Plumbing engineering — integrated systems, DEWA and technical authority alignment.",
    from: 0.34,
    to: 0.5,
    side: "l" as const,
  },
  {
    tag: "04 — Envelope",
    h: "Envelope",
    sub: "Building envelope & façade — exterior systems, thermal and regulatory envelope coordination.",
    from: 0.51,
    to: 0.66,
    side: "r" as const,
  },
  {
    tag: "05 — Interior",
    h: "Interior",
    sub: "Fit-Out delivery — commercial, retail, office and specialist interiors executed to approval.",
    from: 0.67,
    to: 0.83,
    side: "l" as const,
  },
  {
    tag: "06 — Completed",
    h: "Completed",
    sub: "Approvals → NOC → Handover — final inspections, certificates and project close-out. One continuous story.",
    from: 0.84,
    to: 1.0,
    side: "c" as const,
    cta: true,
  },
] as const;

// ─── Helpers ──────────────────────────────────────────────────────────────────
function Loader({ pct }: { pct: number }) {
  return (
    <>
      <p
        style={{
          color: "#C9A544",
          fontSize: 11,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          fontWeight: 700,
          margin: "0 0 28px",
        }}
      >
        Goldland — 3D Storytelling
      </p>
      <div
        style={{
          width: 200,
          height: 2,
          background: "rgba(255,255,255,0.08)",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            background: "#C9A544",
            borderRadius: 2,
            transition: "width 0.2s",
          }}
        />
      </div>
      <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, margin: "14px 0 0", letterSpacing: "0.05em" }}>
        {pct}%
      </p>
    </>
  );
}

function ScrollHint({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: "absolute",
            bottom: 32,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            pointerEvents: "none",
            zIndex: 10,
          }}
        >
          <span
            style={{
              fontFamily: "Inter,sans-serif",
              fontSize: 10,
              color: "rgba(255,255,255,0.45)",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            Scroll to explore
          </span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
            <svg width="22" height="34" viewBox="0 0 22 34" fill="none">
              <rect x="1.5" y="1.5" width="19" height="31" rx="9.5" stroke="rgba(201,165,68,0.55)" strokeWidth="1.5" />
              <rect x="9" y="6" width="4" height="7" rx="2" fill="#C9A544" />
            </svg>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

type PanelType = (typeof PANELS)[number];
function Panel({ p, active, mobile, reduced }: { p: PanelType; active: boolean; mobile: boolean; reduced: boolean }) {
  const isC = p.side === "c",
    isR = p.side === "r";
  const verticalOffset = "-56%";
  const pos: React.CSSProperties = isC
    ? { top: "50%", left: "50%", transform: `translate(-50%, ${verticalOffset})`, textAlign: "center", alignItems: "center" }
    : isR
      ? mobile
        ? { bottom: "18%", right: "6%" }
        : { top: "50%", right: "6%", transform: `translateY(${verticalOffset})`, textAlign: "right", alignItems: "flex-end" }
      : mobile
        ? { bottom: "18%", left: "6%" }
        : { top: "50%", left: "6%", transform: `translateY(${verticalOffset})` };
  const jc = isC ? "center" : isR ? "flex-end" : "flex-start";

  // reduced-motion: no blur/translate animation, just opacity
  const animate = reduced ? { opacity: active ? 1 : 0 } : { opacity: active ? 1 : 0, y: active ? 0 : 28, filter: active ? "blur(0px)" : "blur(6px)" };
  const transition = reduced ? { duration: 0.2 } : { duration: active ? 0.6 : 0.38, ease: [0.22, 1, 0.36, 1] as any };

  return (
    <motion.div
      animate={animate}
      transition={transition}
      style={{
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        maxWidth: mobile ? "86vw" : "36vw",
        pointerEvents: "cta" in p && (p as any).cta ? "auto" : "none",
        ...pos,
      }}
    >
      <span
        style={{
          alignSelf: jc as any,
          display: "inline-block",
          fontFamily: "Inter,sans-serif",
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "#C9A544",
          background: "rgba(201,165,68,0.1)",
          border: "1px solid rgba(201,165,68,0.28)",
          borderRadius: 4,
          padding: "5px 11px",
        }}
      >
        {p.tag}
      </span>
      <h3
        style={{
          fontFamily: "Inter,sans-serif",
          fontWeight: 800,
          letterSpacing: "-0.04em",
          lineHeight: 1.03,
          color: "#fff",
          fontSize: "clamp(2rem,4vw,3.8rem)",
          margin: 0,
          textShadow: "0 4px 40px rgba(0,0,0,0.8)",
          whiteSpace: "pre-line",
        }}
      >
        {p.h}
      </h3>
      <p
        style={{
          fontFamily: "Inter,sans-serif",
          fontWeight: 400,
          lineHeight: 1.65,
          color: "rgba(255,255,255,0.72)",
          fontSize: "clamp(0.88rem,1.3vw,1.02rem)",
          margin: 0,
          textShadow: "0 2px 16px rgba(0,0,0,0.55)",
          maxWidth: 420,
          alignSelf: jc as any,
        }}
      >
        {p.sub}
      </p>
      {"cta" in p && (p as any).cta && (
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: jc, marginTop: 4 }}>
          <a
            href="/#assessment"
            style={{
              padding: "14px 28px",
              background: "#C9A544",
              color: "#080808",
              fontFamily: "Inter,sans-serif",
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              borderRadius: 6,
              textDecoration: "none",
              boxShadow: "0 0 32px rgba(201,165,68,0.45)",
            }}
          >
            Start Assessment →
          </a>
          <a
            href="/services"
            style={{
              padding: "14px 28px",
              background: "transparent",
              color: "rgba(255,255,255,0.82)",
              fontFamily: "Inter,sans-serif",
              fontWeight: 600,
              fontSize: 13,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              borderRadius: 6,
              textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.22)",
            }}
          >
            All Services
          </a>
        </div>
      )}
    </motion.div>
  );
}

export default function Services3DStory() {
  const outerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgs = useRef<HTMLImageElement[]>([]);

  const [loadedCount, setLoadedCount] = useState(0);
  const ready = loadedCount >= TOTAL;
  const pct = Math.round((loadedCount / TOTAL) * 100);

  const rawProg = useRef(0);
  const dispProg = useRef(0);
  const rafId = useRef(0);
  const looping = useRef(false);
  const drawnIdx = useRef(-1);

  const [scrollProg, setScrollProg] = useState(0);
  const [showHint, setShowHint] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isInView, setIsInView] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  // Load frames (same shard_frames as homepage, reversed)
  useEffect(() => {
    const list: HTMLImageElement[] = [];
    let done = 0;
    for (let n = 0; n < TOTAL; n++) {
      const img = new Image();
      const frameN = TOTAL - 1 - n;
      const padded = String(frameN).padStart(3, "0");
      img.onload = img.onerror = () => {
        done++;
        setLoadedCount(done);
      };
      img.src = `/shard_frames/SaveClip.App_AQP-L4rTlIYou_5UBjdXftOOEVCNBW7ZiB7lhJp44-QIYlZ0Vz9Um1YcEjkgQESOq4uuwkiYV_AUYStpitViA1QFnfhfUFAJmKZycPc_${padded}.jpg`;
      list.push(img);
    }
    imgs.current = list;
    return () => {
      list.forEach((i) => {
        i.onload = null;
        i.onerror = null;
      });
    };
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  // reduced-motion: just draw first frame, hide scrubber/hint, no scroll binding
  useEffect(() => {
    if (!ready) return;
    if (shouldReduceMotion) {
      const c = canvasRef.current;
      if (!c) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1);
      c.width = Math.floor(window.innerWidth * dpr);
      c.height = Math.floor(window.innerHeight * dpr);
      const img = imgs.current[0];
      if (img && img.complete && img.naturalWidth) {
        const ctx = c.getContext("2d", { alpha: false });
        if (ctx) {
          const s = Math.max(c.width / img.naturalWidth, c.height / img.naturalHeight);
          const w = img.naturalWidth * s,
            h = img.naturalHeight * s;
          ctx.drawImage(img, (c.width - w) / 2, (c.height - h) / 2, w, h);
        }
      }
      setScrollProg(0);
      setShowHint(false);
      return;
    }

    const c = canvasRef.current;
    const el = outerRef.current;
    if (!c || !el) return;

    const sizeCanvas = () => {
      const maxDpr = isMobile ? 1 : 2;
      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
      c.width = Math.floor(window.innerWidth * dpr);
      c.height = Math.floor(window.innerHeight * dpr);
    };
    sizeCanvas();

    const draw = (idx: number): boolean => {
      const img = imgs.current[idx];
      if (!img || !img.complete || img.naturalWidth === 0) return false;
      const ctx = c.getContext("2d", { alpha: false });
      if (!ctx) return false;
      const s = Math.max(c.width / img.naturalWidth, c.height / img.naturalHeight);
      const w = img.naturalWidth * s,
        h = img.naturalHeight * s;
      ctx.drawImage(img, (c.width - w) / 2, (c.height - h) / 2, w, h);
      drawnIdx.current = idx;
      return true;
    };

    draw(0);
    setScrollProg(0);

    const animate = () => {
      const diff = rawProg.current - dispProg.current;
      if (Math.abs(diff) < 0.0002) {
        dispProg.current = rawProg.current;
        looping.current = false;
        rafId.current = 0;
        draw(Math.min(TOTAL - 1, Math.max(0, Math.round(dispProg.current * (TOTAL - 1)))));
        setScrollProg(dispProg.current);
        return;
      }
      dispProg.current += diff * LERP;
      draw(Math.min(TOTAL - 1, Math.max(0, Math.round(dispProg.current * (TOTAL - 1)))));
      setScrollProg(dispProg.current);
      rafId.current = requestAnimationFrame(animate);
    };

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height - vh;
      const scrolled = -rect.top;
      const inView = rect.top <= 2 && rect.bottom >= vh - 2;
      setIsInView(inView);
      if (total <= 0 || !inView) return;
      const p = Math.min(1, Math.max(0, scrolled / total));
      rawProg.current = p;
      if (p > 0.01) setShowHint(false);
      if (!looping.current) {
        looping.current = true;
        rafId.current = requestAnimationFrame(animate);
      }
    };

    onScroll();
    let rTimer: ReturnType<typeof setTimeout> | null = null;
    const onResize = () => {
      if (rTimer) clearTimeout(rTimer);
      rTimer = setTimeout(() => {
        sizeCanvas();
        if (drawnIdx.current >= 0) draw(drawnIdx.current);
      }, 100);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      if (rTimer) clearTimeout(rTimer);
      looping.current = false;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [ready, isMobile, shouldReduceMotion]);

  // reduced-motion active index is always 0 (Blueprint) — static fallback
  const activeFrom = shouldReduceMotion ? 0 : scrollProg;

  return (
    <>
      <div ref={outerRef} style={{ position: "relative", height: shouldReduceMotion ? "100vh" : SCROLL_H, flexShrink: 0 }} />
      <div
        aria-hidden={!isInView && ready}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "#080808",
          zIndex: 15,
          pointerEvents: isInView ? "auto" : "none",
          opacity: !ready || isInView ? 1 : 0,
          transition: shouldReduceMotion ? "none" : "opacity 0.4s ease",
        }}
      >
        <canvas ref={canvasRef} aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }} />
        <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 5, background: ["radial-gradient(ellipse 72% 60% at 50% 50%, transparent 25%, rgba(0,0,0,0.62) 100%)", "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 12%, transparent 88%, rgba(0,0,0,0.6) 100%)"].join(",") }} />

        {/* progress scrubber — hidden when reduced */}
        {ready && !shouldReduceMotion && (
          <div style={{ position: "absolute", right: 18, top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, pointerEvents: "none", zIndex: 10 }}>
            <div style={{ width: 2, height: 130, background: "rgba(255,255,255,0.07)", borderRadius: 2, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, width: "100%", borderRadius: 2, background: "#C9A544", height: `${scrollProg * 100}%`, transition: "height 0.05s linear" }} />
            </div>
            <span style={{ fontSize: 9, fontFamily: "Inter,sans-serif", color: "rgba(255,255,255,0.28)", letterSpacing: "0.05em" }}>{Math.round(scrollProg * 100)}%</span>
          </div>
        )}

        {ready && (
          <div style={{ position: "absolute", inset: 0, zIndex: 8 }}>
            {PANELS.map((p, i) => {
              const active = shouldReduceMotion ? i === 0 : activeFrom >= p.from && activeFrom < p.to;
              return <Panel key={i} p={p} mobile={isMobile} active={active} reduced={!!shouldReduceMotion} />;
            })}
          </div>
        )}

        <ScrollHint show={!!(showHint && ready && isInView && !shouldReduceMotion)} />

        {!ready && (
          <div style={{ position: "absolute", inset: 0, zIndex: 50, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "Inter,sans-serif" }}>
            <Loader pct={pct} />
          </div>
        )}
      </div>

      {/* accessible fallback for reduced motion / no-js */}
      {shouldReduceMotion && (
        <noscript>
          <div style={{ padding: 24, background: "#0A0A0A", color: "white" }}>
            {PANELS.map((p) => (
              <div key={p.tag} style={{ marginBottom: 16 }}>
                <strong>{p.tag}</strong>: {p.h} — {p.sub}
              </div>
            ))}
          </div>
        </noscript>
      )}
    </>
  );
}
