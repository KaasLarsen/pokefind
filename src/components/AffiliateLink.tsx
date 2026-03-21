import React from "react";

export function AffiliateLink({
  href,
  providerName,
  label = "Reklamelink",
  tracking,
  children,
}: {
  href: string;
  providerName: string;
  label?: string;
  tracking?: {
    categorySlug?: string;
    providerId?: string;
  };
  children: React.ReactNode;
}) {
  return (
    <div className="group flex flex-col gap-3 rounded-2xl border-2 border-pk-blue/12 bg-gradient-to-br from-white to-pk-cream/40 p-5 shadow-md transition hover:-translate-y-0.5 hover:border-pk-electric/45 hover:shadow-lg">
      <div className="text-xs font-medium text-pk-navy/60">
        <span className="rounded-lg bg-pk-yellow/95 px-2.5 py-1 font-bold text-pk-navy shadow-sm">
          {label}
        </span>{" "}
        <span className="text-pk-navy/50">·</span> {providerName}
      </div>
      <a
        href={href}
        target="_blank"
        rel="noreferrer sponsored nofollow"
        data-track="affiliate_click"
        data-category-slug={tracking?.categorySlug ?? ""}
        data-provider-id={tracking?.providerId ?? ""}
        className="inline-flex w-fit items-center gap-2 rounded-xl bg-gradient-to-r from-pk-navy to-pk-blue px-4 py-3 text-sm font-extrabold text-white shadow-md transition group-hover:from-pk-blue group-hover:to-pk-navy"
      >
        {children}
        <span aria-hidden className="text-base">
          ↗
        </span>
      </a>
    </div>
  );
}

