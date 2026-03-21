"use client";

import { useEffect } from "react";

const STORAGE_KEY = "pokemon_analytics_v1";

function readPageViews(): Record<string, number> {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as {
      pageViews?: Record<string, number>;
      affiliateClicks?: Record<string, number>;
    };
    return parsed.pageViews ?? {};
  } catch {
    return {};
  }
}

function writePageViews(pageViews: Record<string, number>) {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  const parsed = raw ? (JSON.parse(raw) as any) : {};
  const next = {
    pageViews,
    affiliateClicks: parsed.affiliateClicks ?? {},
  };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

export default function PageViewTracker({
  categorySlug,
}: {
  categorySlug: string;
}) {
  useEffect(() => {
    if (!categorySlug) return;
    const pageViews = readPageViews();
    pageViews[categorySlug] = (pageViews[categorySlug] ?? 0) + 1;
    writePageViews(pageViews);
  }, [categorySlug]);

  return null;
}

