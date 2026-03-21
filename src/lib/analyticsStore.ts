import fs from "fs";
import path from "path";

type AnalyticsState = {
  pageViews: Record<string, number>;
  affiliateClicks: Record<string, number>;
};

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "analytics.json");

function ensureStore(): AnalyticsState {
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(
        DATA_FILE,
        JSON.stringify({ pageViews: {}, affiliateClicks: {} }, null, 2),
        "utf-8",
      );
    }
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    const parsed = JSON.parse(raw) as Partial<AnalyticsState>;
    return {
      pageViews: parsed.pageViews ?? {},
      affiliateClicks: parsed.affiliateClicks ?? {},
    };
  } catch {
    return { pageViews: {}, affiliateClicks: {} };
  }
}

function writeStore(next: AnalyticsState) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(next, null, 2), "utf-8");
}

export function incrementEvent(args: {
  type: "page_view" | "affiliate_click";
  categorySlug?: string;
}) {
  const { type, categorySlug } = args;
  if (!categorySlug) return;

  const store = ensureStore();
  if (type === "page_view") {
    store.pageViews[categorySlug] = (store.pageViews[categorySlug] ?? 0) + 1;
  }
  if (type === "affiliate_click") {
    store.affiliateClicks[categorySlug] =
      (store.affiliateClicks[categorySlug] ?? 0) + 1;
  }
  writeStore(store);
}

export function getAnalytics(): AnalyticsState {
  return ensureStore();
}

