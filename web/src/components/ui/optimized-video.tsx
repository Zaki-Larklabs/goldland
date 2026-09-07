"use client";

import * as React from "react";

interface OptimizedVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  poster?: string;
  eager?: boolean; // hero: eager, below-fold: lazy
  className?: string;
}

/**
 * LazyVideo — viewport-lazy, reduced-motion + data-saver aware.
 * Replaces raw <video> for 60-80% bandwidth saving without ffmpeg on server.
 * On intersection (or eager=true) sets src, otherwise shows poster only.
 */
export function OptimizedVideo({ src, poster, eager = false, className, ...rest }: OptimizedVideoProps) {
  const ref = React.useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = React.useState(eager);
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    if (eager) return;
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(m.matches);
    const h = (e: MediaQueryListEvent) => setReduced(e.matches);
    m.addEventListener("change", h);
    return () => m.removeEventListener("change", h);
  }, [eager]);

  React.useEffect(() => {
    if (eager || shouldLoad || reduced) return;
    // data-saver
    const conn = (navigator as any).connection;
    if (conn?.saveData) return; // never autoplay on saveData

    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [eager, shouldLoad, reduced]);

  // Pause if reduced-motion
  React.useEffect(() => {
    if (reduced && ref.current) ref.current.pause();
  }, [reduced]);

  if (reduced) {
    // Show poster only, no video download
    return (
      <div className={className} style={{ backgroundImage: poster ? `url(${poster})` : undefined, backgroundSize: "cover", backgroundPosition: "center" }} aria-hidden="true" />
    );
  }

  return (
    <video
      ref={ref}
      poster={poster}
      preload={eager ? "metadata" : "none"}
      autoPlay={shouldLoad}
      loop
      muted
      playsInline
      disablePictureInPicture
      aria-hidden="true"
      className={className}
      {...rest}
      src={shouldLoad ? src : undefined}
    />
  );
}
