"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Config ───────────────────────────────────────────────────────────────────
const TOTAL   = 100;
const SCROLL_H = "250vh"; // scroll space
const LERP    = 0.35;

// ─── Story panels — Goldland content overlaid on the dark left mask ──────────
// All "left" panels anchor to the left column (over the masked source text).
// "right" panels go to the right side where the building/architecture is clear.
const PANELS = [
  {
    tag: "Step 01",
    h: "Project\nAssessment",
    sub: "We thoroughly review your space and timeline to determine the exact authority requirements.",
    from: 0.00, to: 0.16, side: "l",
    accent: "#C9A544",
  },
  {
    tag: "Step 02",
    h: "Authority\nMapping",
    sub: "We identify the exact jurisdictions involved, whether it's DM, DCD, DDA, Trakhees, or DEWA.",
    from: 0.17, to: 0.33, side: "l",
    accent: "#C9A544",
  },
  {
    tag: "Step 03",
    h: "Engineering\n& Drawings",
    sub: "Our team drafts architectural, structural, and MEP drawings fully compliant with the Dubai Building Code.",
    from: 0.34, to: 0.50, side: "l",
    accent: "#C9A544",
  },
  {
    tag: "Step 04",
    h: "Authority\nSubmission",
    sub: "We formally file the technical paperwork and actively follow up with the respective governing bodies.",
    from: 0.51, to: 0.66, side: "l",
    accent: "#C9A544",
  },
  {
    tag: "Step 05",
    h: "Comments\n& Revision",
    sub: "We handle all authority feedback and make necessary technical revisions to secure rapid clearance.",
    from: 0.67, to: 0.83, side: "l",
    accent: "#C9A544",
  },
  {
    tag: "Step 06",
    h: "Final\nApproval",
    sub: "We coordinate all necessary site inspections to secure the final completion certificate for your project.",
    from: 0.84, to: 1.00, side: "l",
    accent: "#C9A544",
  },
] as const;

// ─── Helpers ──────────────────────────────────────────────────────────────────
function Loader({ pct }: { pct: number }) {
  return (
    <>
      <p style={{ color: "#C9A544", fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", fontWeight: 700, margin: "0 0 28px" }}>
        Approval in Progress
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
          <span style={{ fontFamily: "Inter,sans-serif", fontSize: 10, color: "rgba(255,255,255,0.45)", letterSpacing: "0.22em", textTransform: "uppercase" }}>Continue scrolling</span>
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

function Panel({ p, active, mobile, scrollProg }: { p: PanelType; active: boolean; mobile: boolean; scrollProg: number }) {
  const range = p.to - p.from;
  const localProg = Math.max(0, Math.min(1, (scrollProg - p.from) / range));

  // RIGHT BOTTOM side positioning
  const pos: React.CSSProperties = mobile
    ? { bottom: "8%", right: "4%", left: "4%", textAlign: "right" }
    : { bottom: "12%", right: "6%", width: "42vw", maxWidth: 520, textAlign: "right" };

  return (
    <motion.div
      animate={{
        opacity: active ? 1 : 0,
        x: active ? 0 : 28,
        filter: active ? "blur(0px)" : "blur(10px)",
      }}
      transition={{ duration: active ? 0.6 : 0.3, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        gap: mobile ? 10 : 16,
        pointerEvents: "none",
        alignItems: "flex-end",
        ...pos,
      }}
    >
      {/* Eyebrow */}
      <span style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        alignSelf: "flex-end",
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: mobile ? 9 : 10,
        fontWeight: 700,
        letterSpacing: "0.20em",
        textTransform: "uppercase",
        color: "#C9A544",
        textShadow: "0 1px 8px rgba(0,0,0,0.8)",
        flexDirection: "row-reverse",
      }}>
        {p.tag}
        <span style={{ width: 20, height: 1.5, background: "#C9A544", display: "inline-block", borderRadius: 1 }} />
      </span>

      {/* Headline */}
      <h2 style={{
        fontFamily: "'Space Grotesk', 'IBM Plex Sans', sans-serif",
        fontWeight: 800,
        letterSpacing: "-0.03em",
        lineHeight: 1.0,
        color: "#ffffff",
        fontSize: mobile ? "clamp(2.4rem,11vw,3.2rem)" : "clamp(3rem,5vw,5.2rem)",
        margin: 0,
        whiteSpace: "pre-line",
        textShadow: "0 2px 24px rgba(0,0,0,0.9), 0 1px 4px rgba(0,0,0,0.7)",
        textAlign: "right",
      }}>
        {p.h}
      </h2>

      {/* Animated gold rule */}
      <div style={{
        height: 2,
        width: `${Math.round(32 + localProg * 60)}px`,
        background: "linear-gradient(to left, #C9A544, rgba(201,165,68,0.2))",
        borderRadius: 2,
        transition: "width 0.08s linear",
        alignSelf: "flex-end",
      }} />

      {/* Body copy */}
      <p style={{
        fontFamily: "'IBM Plex Sans', sans-serif",
        fontWeight: 400,
        lineHeight: 1.7,
        color: "rgba(255,255,255,0.92)",
        fontSize: mobile ? "clamp(0.85rem,3.8vw,0.95rem)" : "clamp(0.95rem,1.1vw,1.05rem)",
        margin: 0,
        maxWidth: mobile ? "none" : 420,
        textShadow: "0 1px 12px rgba(0,0,0,0.85)",
        textAlign: "right",
      }}>
        {p.sub}
      </p>
    </motion.div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function PremiumScroll() {
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
  const [isInView,   setIsInView]   = useState(true);

  // ── Load all premium frames ────────────────────────────────────────────────
  useEffect(() => {
    const list: HTMLImageElement[] = [];
    let done = 0;
    for (let n = 0; n < TOTAL; n++) {
      const img = new Image();
      const frameN = String(n).padStart(3, '0'); // Format as 000, 001, etc.
      img.onload = img.onerror = () => { done++; setLoadedCount(done); };
      img.src = `/about_scroll_1/Skyscraper_deconstructing_in_zer…_1080p_202609031320_${frameN}.jpg`;
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

  // ── Canvas + scroll ─────────────────────────────────────────────────────────
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

    // Draw one frame 
    const draw = (idx: number): boolean => {
      const img = imgs.current[idx];
      if (!img || !img.complete || img.naturalWidth === 0) return false;
      const ctx = c.getContext("2d", { alpha: false });
      if (!ctx) return false;

      // Draw the source frame (cover-fit)
      const s = Math.max(c.width / img.naturalWidth, c.height / img.naturalHeight);
      const w = img.naturalWidth * s, h = img.naturalHeight * s;
      const ox = (c.width - w) / 2, oy = (c.height - h) / 2;
      ctx.drawImage(img, ox, oy, w, h);

      // ── LEFT HALF: Reduced opacity — shows background frames while still covering source text ──
      ctx.fillStyle = "rgba(8,10,18,0.72)";
      ctx.fillRect(0, 0, c.width * 0.42, c.height);

      // Feather zone: 42%→65% — softer blend into the image
      const feather = ctx.createLinearGradient(c.width * 0.42, 0, c.width * 0.65, 0);
      feather.addColorStop(0,    "rgba(8,10,18,0.72)");
      feather.addColorStop(0.25, "rgba(8,10,18,0.52)");
      feather.addColorStop(0.55, "rgba(8,10,18,0.22)");
      feather.addColorStop(0.85, "rgba(8,10,18,0.06)");
      feather.addColorStop(1,    "rgba(8,10,18,0)");
      ctx.fillStyle = feather;
      ctx.fillRect(c.width * 0.42, 0, c.width * 0.23, c.height);

      // (Bottom-right dark contrast mask removed as requested by user)

      // ── TOP EDGE: Subtle vignette ──────────────────────────────────────
      const topGrad = ctx.createLinearGradient(0, 0, 0, c.height * 0.14);
      topGrad.addColorStop(0,   "rgba(0,0,0,0.70)");
      topGrad.addColorStop(1,   "rgba(0,0,0,0)");
      ctx.fillStyle = topGrad;
      ctx.fillRect(0, 0, c.width, c.height * 0.14);

      // ── BOTTOM EDGE: Vignette ──────────────────────────────────────────
      const botGrad = ctx.createLinearGradient(0, c.height * 0.82, 0, c.height);
      botGrad.addColorStop(0,   "rgba(0,0,0,0)");
      botGrad.addColorStop(1,   "rgba(0,0,0,0.65)");
      ctx.fillStyle = botGrad;
      ctx.fillRect(0, c.height * 0.82, c.width, c.height * 0.18);

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

    // Scroll handler
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh   = window.innerHeight;
      const total = rect.height - vh;
      const scrolled = -rect.top;

      // InView with generous ±1vh buffer on both entry and exit so the
      // canvas stays visible slightly before entry and slightly after exit —
      // this prevents the background flashing between the dark sections.
      const BUFFER = vh * 0.04; // 4% viewport height overlap
      const inView = rect.top <= BUFFER && rect.bottom >= vh - BUFFER;
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

    // Initial visibility check
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
      {/* OUTER DIV — creates the scroll space. Must be dark so page bg doesn't bleed. */}
      <div
        ref={outerRef}
        style={{ position: "relative", height: SCROLL_H, flexShrink: 0, background: "#0A0A0A" }}
      />

      {/* FIXED CANVAS LAYER — only mounted in DOM while section is relevant */}
      <div
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: "100vw", height: "100vh",
          background: "#0A0A0A",
          zIndex: 15,
          pointerEvents: isInView ? "auto" : "none",
          // Use visibility instead of opacity to avoid any flash:
          // opacity fade from 0→1 reveals the white page bg behind it.
          // visibility:hidden is instant & composited — no visible transition.
          visibility: (!ready || isInView) ? "visible" : "hidden",
        }}
      >
        {/* Canvas — vignette & watermark masking done in draw() at pixel level */}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          style={{ 
            position: "absolute", 
            inset: 0, 
            width: "100%", 
            height: "100%", 
            display: "block",
            backgroundImage: "url('/about_scroll_1/Skyscraper_deconstructing_in_zer…_1080p_202609031320_000.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />

        {/* Enhanced progress scrubber */}
        {ready && (
          <div style={{ position: "absolute", right: 24, top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, pointerEvents: "none", zIndex: 10 }}>
            <div style={{ width: 3, height: 140, background: "rgba(255,255,255,0.08)", borderRadius: 3, position: "relative", overflow: "hidden", border: "1px solid rgba(201,165,68,0.15)" }}>
              <div style={{ position: "absolute", top: 0, width: "100%", borderRadius: 3, background: "linear-gradient(to bottom, #C9A544, #B8941A)", height: `${scrollProg * 100}%`, transition: "height 0.1s ease-out", boxShadow: "0 0 10px rgba(201,165,68,0.4)" }} />
            </div>
            <span style={{ fontSize: 10, fontFamily: "Inter,sans-serif", color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", fontWeight: 500 }}>
              {Math.round(scrollProg * 100)}%
            </span>
          </div>
        )}

        {/* Story panels */}
        {ready && (
          <div style={{ position: "absolute", inset: 0, zIndex: 6 }}>
            {PANELS.map((p, i) => (
              <Panel key={i} p={p} mobile={isMobile} scrollProg={scrollProg} active={scrollProg >= p.from && scrollProg < p.to} />
            ))}
          </div>
        )}

        {/* Scroll hint */}
        <ScrollHint show={showHint && ready && isInView && scrollProg < 0.05} />

        {/* Loading overlay */}
        {!ready && (
          <div style={{ position: "absolute", inset: 0, zIndex: 50, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "Inter,sans-serif", background: "rgba(0,0,0,0.95)" }}>
            <Loader pct={pct} />
          </div>
        )}
      </div>
    </>
  );
}