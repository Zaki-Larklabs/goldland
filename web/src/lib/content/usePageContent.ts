"use client";

import { useEffect, useState } from "react";

/**
 * Portal-managed frontend texts for client components.
 * Renders `defaults` immediately (SSR-safe, no empty flash), then merges
 * live overrides from /api/content. Falls back silently on any error.
 */
export function usePageContent<T extends Record<string, string>>(page: string, defaults: T): T {
  const [copy, setCopy] = useState<T>(defaults);
  useEffect(() => {
    let cancelled = false;
    fetch(`/api/content?page=${encodeURIComponent(page)}`, { cache: "force-cache" })
      .then((r) => (r.ok ? r.json() : {}))
      .then((data) => {
        if (!cancelled && data && typeof data === "object") {
          setCopy((prev) => ({ ...prev, ...data }));
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);
  return copy;
}
