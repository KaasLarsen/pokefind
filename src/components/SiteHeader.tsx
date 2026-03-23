"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PokeFindLogo } from "./PokeFindLogo";
import SearchBar from "./SearchBar";
import { IconMenu } from "./icons";

export default function SiteHeader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const defaultQ =
    pathname === "/soeg" ? (searchParams.get("q") ?? "") : "";

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

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

        <nav className="flex flex-col items-end text-sm font-semibold text-white/90">
          <button
            type="button"
            aria-label={menuOpen ? "Luk menu" : "Åbn menu"}
            aria-expanded={menuOpen}
            aria-controls="site-header-menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 transition hover:border-pk-electric/40 hover:bg-white/10"
          >
            <IconMenu className="h-5 w-5" />
            <span className="hidden sm:inline">{menuOpen ? "Luk" : "Menu"}</span>
          </button>

          {menuOpen && (
            <div
              id="site-header-menu"
              className="z-50 mt-2 w-56 overflow-hidden rounded-2xl border border-white/10 bg-pk-navy/95 shadow-2xl shadow-pk-navy/30"
            >
              <div className="flex flex-col gap-2 p-2">
                <Link
                  href="/soeg"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl border border-white/10 px-3 py-2 transition hover:border-pk-electric/40 hover:bg-white/10"
                >
                  Søg
                </Link>
                <Link
                  href="/kategorier"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl border border-white/10 px-3 py-2 transition hover:border-pk-electric/40 hover:bg-white/10"
                >
                  Kategorier
                </Link>
                <Link
                  href="/guider"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl border border-white/10 px-3 py-2 transition hover:border-pk-electric/40 hover:bg-white/10"
                >
                  Guider
                </Link>
                <Link
                  href="/faq"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl border border-white/10 px-3 py-2 transition hover:border-pk-electric/40 hover:bg-white/10"
                >
                  FAQ
                </Link>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
