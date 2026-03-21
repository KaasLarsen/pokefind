"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { PokeFindLogo } from "./PokeFindLogo";
import SearchBar from "./SearchBar";

export default function SiteHeader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const defaultQ =
    pathname === "/soeg" ? (searchParams.get("q") ?? "") : "";

  return (
    <header className="sticky top-0 z-40 overflow-x-hidden border-b border-white/10 bg-gradient-to-r from-pk-ink via-pk-navy to-pk-blue shadow-xl shadow-pk-navy/30">
      <div className="mx-auto flex min-w-0 max-w-6xl flex-col gap-5 px-4 py-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
        <Link
          href="/"
          className="group flex shrink-0 items-center transition hover:opacity-95"
        >
          <PokeFindLogo />
        </Link>

        <div className="w-full min-w-0 lg:max-w-2xl xl:max-w-3xl">
          <SearchBar
            key={`${pathname}-${defaultQ}`}
            variant="header"
            defaultValue={defaultQ}
            inputId="global-search"
          />
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-2 text-sm font-semibold text-white/90 lg:justify-end">
          <Link
            href="/soeg"
            className="rounded-full border border-white/10 px-3 py-2 transition hover:border-pk-electric/40 hover:bg-white/10"
          >
            Søg
          </Link>
          <Link
            href="/kategorier"
            className="rounded-full border border-white/10 px-3 py-2 transition hover:border-pk-electric/40 hover:bg-white/10"
          >
            Kategorier
          </Link>
          <Link
            href="/guider"
            className="rounded-full border border-white/10 px-3 py-2 transition hover:border-pk-electric/40 hover:bg-white/10"
          >
            Guider
          </Link>
        </nav>
      </div>
    </header>
  );
}
