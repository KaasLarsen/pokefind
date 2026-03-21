import { categories } from "../../../src/lib/content";
import { getAnalytics } from "../../../src/lib/analyticsStore";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function DebugStatsPage() {
  const analytics = getAnalytics();
  const pageViews = analytics.pageViews ?? {};
  const affiliateClicks = analytics.affiliateClicks ?? {};

  return (
    <div>
      <h1 className="text-2xl font-semibold">Debug: CTR pr. kategori</h1>
      <p className="mt-2 text-sm text-slate-700">
        Tæller sideviews og affiliate-klik server-side i{" "}
        <code>data/analytics.json</code>. Åbn en kategoriside, klik på en{" "}
        “Reklamelink”, og tjek tabellen igen.
      </p>

      <div className="mt-6 overflow-x-auto rounded border border-slate-200">
        <table className="min-w-[620px] text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-2 text-left">Kategori</th>
              <th className="px-4 py-2 text-left">Pageviews</th>
              <th className="px-4 py-2 text-left">Affiliate-klik</th>
              <th className="px-4 py-2 text-left">CTR</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => {
              const views = pageViews[c.slug] ?? 0;
              const clicks = affiliateClicks[c.slug] ?? 0;
              const ctr = views > 0 ? clicks / views : 0;

              return (
                <tr key={c.slug} className="border-t border-slate-100">
                  <td className="px-4 py-2 font-medium">{c.title}</td>
                  <td className="px-4 py-2">{views}</td>
                  <td className="px-4 py-2">{clicks}</td>
                  <td className="px-4 py-2">
                    {ctr === 0 ? "0%" : `${(ctr * 100).toFixed(1)}%`}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

