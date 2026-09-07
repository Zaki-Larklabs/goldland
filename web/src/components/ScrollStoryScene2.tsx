"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/**
 * ScrollStoryScene2
 * ─────────────────
 * A 100-frame canvas scrollytelling sequence used as the background for the
 * "Five Simple Steps" dark section, replacing the OptimizedVideo component.
 * The parent section just renders this and positions content on top via z-index.
 */

const SCENE2_FRAMES = 100;
const SCENE2_LERP   = 0.12;

function coverFit(cW: number, cH: number, iW: number, iH: number) {
  const s = Math.max(cW / iW, cH / iH);
  const dW = iW * s, dH = iH * s;
  return { dW, dH, oX: (cW - dW) / 2, oY: (cH - dH) / 2 };
}

export default function ScrollStoryScene2({ children }: { children?: React.ReactNode }) {
  const outerRef  = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);
  const rawProg   = useRef(0);
  const dispProg  = useRef(0);
  const lastIdx   = useRef(-1);
  const looping   = useRef(false);

  const framesRef  = useRef<(HTMLImageElement | null)[]>(new Array(SCENE2_FRAMES).fill(null));
  const loadedMask = useRef<boolean[]>(new Array(SCENE2_FRAMES).fill(false));
  const [ready, setReady] = useState(false);

  // Load all frames; first 8 priority
  useEffect(() => {
    let cancelled = false;
    const load = (n: number) => new Promise<void>(res => {
      const img = new Image();
      img.onload  = () => { if (!cancelled) { framesRef.current[n]=img; loadedMask.current[n]=true; } res(); };
      img.onerror = () => res();
      img.src = `/scene2/scene2_frame_${n}.jpg`;
    });

    Promise.all(Array.from({ length: 8 }, (_, n) => load(n))).then(() => {
      if (!cancelled) setReady(true);
      const rest = Array.from({ length: SCENE2_FRAMES - 8 }, (_, i) => i + 8);
      let idx = 0;
      const next = () => {
        if (cancelled || idx >= rest.length) return;
        const b = rest.slice(idx, idx + 10); idx += 10;
        Promise.all(b.map(load)).then(next);
      };
      next();
    });
    return () => { cancelled = true; };
  }, []);

  const sizeCanvas = useCallback(() => {
    const c = canvasRef.current; if (!c) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    c.width  = Math.floor(window.innerWidth  * dpr);
    c.height = Math.floor(c.offsetHeight * dpr);
  }, []);

  const drawFrame = useCallback((ti: number) => {
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext("2d", { alpha: false }); if (!ctx) return;
    let img: HTMLImageElement | null = null;
    for (let i = ti; i >= 0; i--) {
      if (loadedMask.current[i] && framesRef.current[i]) { img = framesRef.current[i]; break; }
    }
    if (!img) return;
    const { dW, dH, oX, oY } = coverFit(c.width, c.height, img.naturalWidth, img.naturalHeight);
    ctx.drawImage(img, oX, oY, dW, dH);
    lastIdx.current = ti;
  }, [framesRef, loadedMask]);

  const getProgress = useCallback(() => {
    const el = outerRef.current; if (!el) return 0;
    const rect = el.getBoundingClientRect();
    const vh   = window.innerHeight;
    // progress through the outer element as it scrolls into view
    const scrolled = vh - rect.top;
    const total    = rect.height + vh;
    return Math.min(1, Math.max(0, scrolled / total));
  }, []);

  const startLoop = useCallback(() => {
    if (looping.current) return;
    looping.current = true;
    const tick = () => {
      const raw    = rawProg.current;
      const cur    = dispProg.current;
      const lerped = cur + (raw - cur) * SCENE2_LERP;
      const diff   = Math.abs(lerped - cur);
      dispProg.current = diff < 0.0001 ? raw : lerped;
      const idx = Math.min(SCENE2_FRAMES - 1, Math.max(0, Math.round(dispProg.current * (SCENE2_FRAMES - 1))));
      drawFrame(idx);
      if (diff > 0.0001) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        looping.current = false; rafRef.current = 0;
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [drawFrame]);

  useEffect(() => {
    if (!ready) return;
    sizeCanvas();
    drawFrame(0);

    const onScroll = () => { rawProg.current = getProgress(); startLoop(); };
    let rt: ReturnType<typeof setTimeout> | null = null;
    const onResize = () => {
      if (rt) clearTimeout(rt);
      rt = setTimeout(() => { sizeCanvas(); if (lastIdx.current >= 0) drawFrame(lastIdx.current); }, 120);
    };

    // Intersection observer — only run loop when in view
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        window.addEventListener("scroll", onScroll, { passive: true });
      } else {
        window.removeEventListener("scroll", onScroll);
        if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = 0; looping.current = false; }
      }
    }, { threshold: 0.01 });

    if (outerRef.current) io.observe(outerRef.current);
    window.addEventListener("resize", onResize);
    return () => {
      io.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (rt) clearTimeout(rt);
      looping.current = false;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [ready, sizeCanvas, drawFrame, getProgress, startLoop]);

  return (
    <div ref={outerRef} style={{ position: "relative", overflow: "hidden" }}>
      {/* Canvas background */}
      <canvas ref={canvasRef} aria-hidden="true" style={{
        position: "absolute", inset: 0, width: "100%", height: "100%",
        display: "block", willChange: "transform", objectFit: "cover",
      }} />
      {/* Dark overlay so text stays legible — left side only */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, zIndex: 1,
        background: `
          linear-gradient(to right, rgba(8,8,8,0.75) 0%, rgba(8,8,8,0.3) 40%, transparent 100%)
        `,
      }} />
      {/* Content on top */}
      <div style={{ position: "relative", zIndex: 2 }}>
        {children}
      </div>
    </div>
  );
}
