"use client";

import { useId } from "react";

type Props = {
  /** Vis kun ikon (for favicon-lignende brug) eller ikon + tekst */
  variant?: "mark" | "wordmark";
  className?: string;
};

/**
 * PokéFind-brand: forstørrelsesglas + P (“find”) — ikke officielt Pokémon-branding.
 */
export function PokeFindLogo({ variant = "wordmark", className = "" }: Props) {
  const uid = useId().replace(/:/g, "");
  const gid = `pk-lens-${uid}`;
  const fid = `pk-sh-${uid}`;

  const mark = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      aria-hidden={variant === "wordmark"}
      role={variant === "mark" ? "img" : undefined}
    >
      {variant === "mark" ? <title>PokéFind</title> : null}
      <defs>
        <linearGradient id={gid} x1="6" y1="4" x2="28" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0c1e3d" />
          <stop offset="1" stopColor="#1e4a8a" />
        </linearGradient>
        <filter id={fid} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="0.8" floodOpacity="0.25" />
        </filter>
      </defs>
      <circle
        cx="17"
        cy="17"
        r="12"
        fill={`url(#${gid})`}
        stroke="#ffcb05"
        strokeWidth="2"
        filter={`url(#${fid})`}
      />
      <circle cx="17" cy="17" r="5" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
      <path d="M26 26l9 9" stroke="#ffcb05" strokeWidth="4" strokeLinecap="round" />
      <path
        fill="#ffffff"
        d="M11.5 11h5.8c3.4 0 5.7 2 5.7 5 0 3-2.3 5-5.8 5h-2.2v6h-3.5V11zm3.5 7.2h2.1c1.9 0 3-1 3-2.5s-1.1-2.5-3-2.5h-2.1v5z"
      />
    </svg>
  );

  if (variant === "mark") {
    return mark;
  }

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <span className="flex h-11 w-11 shrink-0 items-center justify-center [&>svg]:h-full [&>svg]:w-full">
        {mark}
      </span>
      <span className="font-display text-xl font-extrabold tracking-tight text-white">
        Poké<span className="text-pk-electric">Find</span>
        <span className="ml-1 block text-xs font-normal text-white/70">
          Købsguide &amp; katalog
        </span>
      </span>
    </span>
  );
}

