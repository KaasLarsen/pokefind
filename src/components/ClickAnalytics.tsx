"use client";

import { useEffect } from "react";

const STORAGE_KEY = "pokemon_analytics_v1";

type AnalyticsState = {
  pageViews: Record<string, number>;
  affiliateClicks: Record<string, number>;
};

function readState(): AnalyticsState {
  if (typeof window === "undefined") {
    return { pageViews: {}, affiliateClicks: {} };
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { pageViews: {}, affiliateClicks: {} };
    const parsed = JSON.parse(raw) as Partial<AnalyticsState>;
    return {
      pageViews: parsed.pageViews ?? {},
      affiliateClicks: parsed.affiliateClicks ?? {},
    };
  } catch {
    return { pageViews: {}, affiliateClicks: {} };
  }
}

function writeState(next: AnalyticsState) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

export default function ClickAnalytics() {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const a = target?.closest?.('a[data-track="affiliate_click"]');
      if (!(a instanceof HTMLAnchorElement)) return;

      const categorySlug = a.dataset.categorySlug ?? "";
      if (!categorySlug) return;

      const state = readState();
      state.affiliateClicks[categorySlug] =
        (state.affiliateClicks[categorySlug] ?? 0) + 1;
      writeState(state);

      // Fire-and-forget API call (best-effort).
      // In the MVP we mostly use localStorage for measurement.
      try {
        void fetch("/api/events", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "affiliate_click",
            categorySlug,
            href: a.href,
            ts: Date.now(),
          }),
        });
      } catch {
        // ignore
      }
    };

    document.addEventListener("click", handler, { capture: true });
    return () => document.removeEventListener("click", handler, { capture: true } as any);
  }, []);

  return null;
}

