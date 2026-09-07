"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Config ───────────────────────────────────────────────────────────────────
const TOTAL   = 100;
const SCROLL_H = "350vh"; // scroll space
const LERP    = 0.3;

// ─── Story panels (reverse-aware: panel 0 shows at scroll START) ──────────────
const PANELS = [
  { tag: "Goldland Contracting",      h: "Precision\nEngineering.",      sub: "We transform architectural vision into fully compliant, structurally sound reality.", from: 0.00, to: 0.18, side: "l" },
  { tag: "Dubai Approvals",           h: "Navigating\nComplexity.",      sub: "Direct coordination with DM, DCD, and DEWA to secure your project approvals fast.", from: 0.22, to: 0.38, side: "r" },
  { tag: "Smart Integration",         h: "Advanced\nMEP Systems.",       sub: "Energy-efficient mechanical and electrical designs tailored for Dubai's climate.", from: 0.42, to: 0.58, side: "l" },
  { tag: "End-to-End",                h: "From Blueprint\nto Reality.",  sub: "Comprehensive project management ensuring flawless execution at every phase.", from: 0.62, to: 0.78, side: "r" },
  { tag: "Start Your Build",          h: "Construct with\nConfidence.",  sub: "Partner with Dubai's leading engineering-first contractor today.", from: 0.84, to: 1.00, side: "c", cta: true },
] as const;

// ─── Helpers ──────────────────────────────────────────────────────────────────
function Loader({ pct }: { pct: number }) {
  return (
    <>
      <p style={{ color: "#C9A544", fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", fontWeight: 700, margin: "0 0 28px" }}>
        Goldland Contracting
      </p>
      <div style={{ width: 200, height: 2, background: "rgba(255,255,255,0.08)", borderRadius: 2, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: "#C9A544", borderRadius: 2, transition: "width 0.2s" }} />
      </div>
      <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, margin: "14px 0 0", letterSpacing: "0.05em" }}>{pct}%</p>
    </>
  );
}

function ScrollHint({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, pointerEvents: "none", zIndex: 10 }}>
          <span style={{ fontFamily: "Inter,sans-serif", fontSize: 10, color: "rgba(255,255,255,0.45)", letterSpacing: "0.22em", textTransform: "uppercase" }}>Scroll to explore</span>
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

type PanelType = typeof PANELS[number];
function Panel({ p, active, mobile }: { p: PanelType; active: boolean; mobile: boolean }) {
  const isC = p.side === "c", isR = p.side === "r";

  // Shift text upward — center panels sit higher, side panels also raised
  const verticalOffset = isC ? "-56%" : "-56%";

  const pos: React.CSSProperties = isC
    ? { top: "50%", left: "50%", transform: `translate(-50%, ${verticalOffset})`, textAlign: "center", alignItems: "center" }
    : isR
      ? (mobile ? { bottom: "18%", right: "6%" } : { top: "50%", right: "6%", transform: `translateY(${verticalOffset})`, textAlign: "right", alignItems: "flex-end" })
      : (mobile ? { bottom: "18%", left: "6%" }  : { top: "50%", left: "6%",  transform: `translateY(${verticalOffset})` });
  const jc = isC ? "center" : isR ? "flex-end" : "flex-start";

  return (
    <motion.div
      animate={{ opacity: active ? 1 : 0, y: active ? 0 : 28, filter: active ? "blur(0px)" : "blur(6px)" }}
      transition={{ duration: active ? 0.6 : 0.38, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: "absolute", display: "flex", flexDirection: "column", gap: 14, maxWidth: mobile ? "86vw" : "36vw", pointerEvents: "cta" in p && p.cta ? "auto" : "none", ...pos }}
    >
      <span style={{ alignSelf: jc as React.CSSProperties["alignSelf"], display: "inline-block", fontFamily: "Inter,sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#C9A544", background: "rgba(201,165,68,0.1)", border: "1px solid rgba(201,165,68,0.28)", borderRadius: 4, padding: "5px 11px" }}>
        {p.tag}
      </span>
      <h2 style={{ fontFamily: "Inter,sans-serif", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.03, color: "#fff", fontSize: "clamp(2rem,4vw,3.8rem)", margin: 0, textShadow: "0 4px 40px rgba(0,0,0,0.8)", whiteSpace: "pre-line" }}>
        {p.h}
      </h2>
      <p style={{ fontFamily: "Inter,sans-serif", fontWeight: 400, lineHeight: 1.65, color: "rgba(255,255,255,0.72)", fontSize: "clamp(0.88rem,1.3vw,1.02rem)", margin: 0, textShadow: "0 2px 16px rgba(0,0,0,0.55)", maxWidth: 420, alignSelf: jc as React.CSSProperties["alignSelf"] }}>
        {p.sub}
      </p>
      {"cta" in p && p.cta && (
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: jc, marginTop: 4 }}>
          <a href="/contact" style={{ padding: "14px 28px", background: "#C9A544", color: "#080808", fontFamily: "Inter,sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", borderRadius: 6, textDecoration: "none", boxShadow: "0 0 32px rgba(201,165,68,0.45)" }}>Get Started →</a>
          <a href="/authority-approvals" style={{ padding: "14px 28px", background: "transparent", color: "rgba(255,255,255,0.82)", fontFamily: "Inter,sans-serif", fontWeight: 600, fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", borderRadius: 6, textDecoration: "none", border: "1px solid rgba(255,255,255,0.22)" }}>View Approvals</a>
        </div>
      )}
    </motion.div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function BuildingScroll() {
  const outerRef  = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgs      = useRef<HTMLImageElement[]>([]);

  const [loadedCount, setLoadedCount] = useState(0);
  const ready = loadedCount >= TOTAL;
  const pct   = Math.round((loadedCount / TOTAL) * 100);

  const rawProg  = useRef(0);
  const dispProg = useRef(0);
  const rafId    = useRef(0);
  const looping  = useRef(false);
  const drawnIdx = useRef(-1);

  const [scrollProg, setScrollProg] = useState(0);
  const [showHint,   setShowHint]   = useState(true);
  const [isMobile,   setIsMobile]   = useState(false);
  const [isInView,   setIsInView]   = useState(true); // true on mount (section is at top)

  // ── Load all frames ────────────────────────────────────────────────────────
  // Loads in REVERSE order: imgs[0] = shard_frame_149, imgs[149] = shard_frame_0
  // So scrolling from 0→1 shows the sequence REVERSED (149→0)
  useEffect(() => {
    const list: HTMLImageElement[] = [];
    let done = 0;
    for (let n = 0; n < TOTAL; n++) {
      const img   = new Image();
      const frameN = String(n).padStart(3, '0');
      img.onload = img.onerror = () => { done++; setLoadedCount(done); };
      img.src = `/home_scroll/i_need_an_exact_video_and_pls_${frameN}.jpg`;
      list.push(img);
    }
    imgs.current = list;
    return () => { list.forEach(i => { i.onload = null; i.onerror = null; }); };
  }, []);

  // ── Mobile detection ───────────────────────────────────────────────────────
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  // ── Canvas + scroll — fires once when all 150 frames are loaded ───────────
  useEffect(() => {
    if (!ready) return;

    const c  = canvasRef.current;
    const el = outerRef.current;
    if (!c || !el) return;

    // Size canvas buffer to physical pixels (limit to 1x on mobile for performance)
    const sizeCanvas = () => {
      const maxDpr = isMobile ? 1 : 2;
      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
      c.width  = Math.floor(window.innerWidth  * dpr);
      c.height = Math.floor(window.innerHeight * dpr);
    };
    sizeCanvas();

    // Draw one frame (index into imgs array, NOT raw frame number)
    const draw = (idx: number): boolean => {
      const img = imgs.current[idx];
      if (!img || !img.complete || img.naturalWidth === 0) return false;
      const ctx = c.getContext("2d", { alpha: false });
      if (!ctx) return false;
      const s = Math.max(c.width / img.naturalWidth, c.height / img.naturalHeight);
      const w = img.naturalWidth * s, h = img.naturalHeight * s;
      ctx.drawImage(img, (c.width - w) / 2, (c.height - h) / 2, w, h);
      drawnIdx.current = idx;
      return true;
    };

    // Draw first frame immediately
    draw(0);
    setScrollProg(0);

    // Lerp animation loop
    const animate = () => {
      const diff = rawProg.current - dispProg.current;
      if (Math.abs(diff) < 0.0002) {
        dispProg.current = rawProg.current;
        looping.current  = false;
        rafId.current    = 0;
        draw(Math.min(TOTAL - 1, Math.max(0, Math.round(dispProg.current * (TOTAL - 1)))));
        setScrollProg(dispProg.current);
        return;
      }
      dispProg.current += diff * LERP;
      draw(Math.min(TOTAL - 1, Math.max(0, Math.round(dispProg.current * (TOTAL - 1)))));
      setScrollProg(dispProg.current);
      rafId.current = requestAnimationFrame(animate);
    };

    // Scroll handler — calculates progress AND updates inView
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh   = window.innerHeight;
      const total = rect.height - vh;
      const scrolled = -rect.top;

      // InView: outer div is actively being scrolled through
      const inView = rect.top <= 2 && rect.bottom >= vh - 2;
      setIsInView(inView);

      if (total <= 0 || !inView) return;
      const p = Math.min(1, Math.max(0, scrolled / total));
      rawProg.current = p;
      if (p > 0.01) setShowHint(false);

      if (!looping.current) {
        looping.current = true;
        rafId.current   = requestAnimationFrame(animate);
      }
    };

    // Initial visibility check (page might already be scrolled)
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
      if (rTimer)        clearTimeout(rTimer);
      looping.current = false;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [ready]);

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <>
      {/*
        OUTER DIV — only creates the scroll space.
        No overflow, no sticky. Just height: 700vh so the page is scrollable.
      */}
      <div ref={outerRef} style={{ position: "relative", height: SCROLL_H, flexShrink: 0 }} />

      {/*
        FIXED CANVAS LAYER — position: fixed is immune to any parent overflow:hidden.
        Visible only while the outer div is in the scroll range (isInView).
        Loading overlay shown while frames are still downloading.
      */}
      <div
        aria-hidden={!isInView && ready}
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: "100vw", height: "100vh",
          background: "#080808",
          zIndex: 15,      // above page content, below header (100) & chatbot
          pointerEvents: isInView ? "auto" : "none",
          opacity: (!ready || isInView) ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      >
        {/* Canvas */}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
        />

        {/* Full dark overlay to hide background text on all frames */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(8, 8, 8, 0)",
            pointerEvents: "none",
            zIndex: 4,
          }}
        />

        {/* Fallback Burj Khalifa video background (shows when canvas is loading) */}
        {!ready && (
          <>
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover object-center"
              style={{ filter: "brightness(0.3)" }}
            >
              <source src="/burj%20khalifa.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70" />
          </>
        )}

        {/* Cinematic vignette */}
        <div aria-hidden style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 5,
          background: [
            "radial-gradient(ellipse 72% 60% at 50% 50%, transparent 25%, rgba(0,0,0,0.62) 100%)",
            "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 12%, transparent 88%, rgba(0,0,0,0.6) 100%)",
          ].join(","),
        }} />

        {/* Right-side progress scrubber */}
        {ready && (
          <div style={{ position: "absolute", right: 18, top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, pointerEvents: "none", zIndex: 10 }}>
            <div style={{ width: 2, height: 130, background: "rgba(255,255,255,0.07)", borderRadius: 2, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, width: "100%", borderRadius: 2, background: "#C9A544", height: `${scrollProg * 100}%`, transition: "height 0.05s linear" }} />
            </div>
            <span style={{ fontSize: 9, fontFamily: "Inter,sans-serif", color: "rgba(255,255,255,0.28)", letterSpacing: "0.05em" }}>
              {Math.round(scrollProg * 100)}%
            </span>
          </div>
        )}

        {/* Story panels */}
        {ready && (
          <div style={{ position: "absolute", inset: 0, zIndex: 8 }}>
            {/* (Dark overlay for panel 2 removed as requested by user) */}
            {PANELS.map((p, i) => (
              <Panel key={i} p={p} mobile={isMobile} active={scrollProg >= p.from && scrollProg < p.to} />
            ))}
          </div>
        )}

        {/* Scroll hint */}
        <ScrollHint show={showHint && ready && isInView} />

        {/* Loading overlay */}
        {!ready && (
          <div style={{ position: "absolute", inset: 0, zIndex: 50, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "Inter,sans-serif" }}>
            <Loader pct={pct} />
          </div>
        )}
      </div>
    </>
  );
}
