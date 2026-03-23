"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { getSuggestions, type SuggestionItem } from "../lib/suggestions";
import { IconBook, IconBolt, IconPackage, IconSearch } from "./icons";

type Variant = "hero" | "header";

function suggestionIcon(item: SuggestionItem) {
  if (item.kind === "category") {
    return (
      <IconPackage className="h-5 w-5 shrink-0 text-pk-blue" />
    );
  }
  if (item.kind === "guide") {
    return <IconBook className="h-5 w-5 shrink-0 text-pk-mint" />;
  }
  return <IconBolt className="h-5 w-5 shrink-0 text-pk-yellow" />;
}

export default function SearchBar({
  variant,
  defaultValue = "",
  inputId: inputIdProp,
}: {
  variant: Variant;
  defaultValue?: string;
  inputId?: string;
}) {
  const router = useRouter();
  const genId = useId();
  const inputId = inputIdProp ?? `pk-search-${variant}-${genId}`;
  const listId = `${inputId}-listbox`;

  const [query, setQuery] = useState(defaultValue);
  const [debouncedQuery, setDebouncedQuery] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQuery(defaultValue);
    setDebouncedQuery(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    const t = window.setTimeout(() => setDebouncedQuery(query), 200);
    return () => window.clearTimeout(t);
  }, [query]);

  const suggestions = useMemo(
    () => getSuggestions(debouncedQuery, 8),
    [debouncedQuery],
  );

  useEffect(() => {
    setActiveIndex(-1);
  }, [debouncedQuery]);

  useEffect(() => {
    function closeIfOutside(e: Event) {
      const target = e.target as Node | null;
      if (!target || !containerRef.current?.contains(target)) {
        /* Udskyd så vi ikke afbryder klik på links under søgefeltet (mobil) */
        queueMicrotask(() => setOpen(false));
      }
    }
    /* pointerdown + mousedown: bedre touch-support end kun mousedown */
    document.addEventListener("pointerdown", closeIfOutside);
    document.addEventListener("mousedown", closeIfOutside);
    return () => {
      document.removeEventListener("pointerdown", closeIfOutside);
      document.removeEventListener("mousedown", closeIfOutside);
    };
  }, []);

  const navigateTo = useCallback(
    (href: string) => {
      setOpen(false);
      router.push(href);
    },
    [router],
  );

  const onPick = useCallback(
    (item: SuggestionItem) => {
      navigateTo(item.href);
    },
    [navigateTo],
  );

  const submitSearch = useCallback(() => {
    const q = query.trim();
    setOpen(false);
    router.push(`/soeg?q=${encodeURIComponent(q)}`);
  }, [query, router]);

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (open && suggestions.length > 0 && activeIndex >= 0) {
        const item = suggestions[activeIndex];
        if (item) onPick(item);
        return;
      }
      submitSearch();
      return;
    }
    if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      setOpen(true);
      setActiveIndex(0);
      e.preventDefault();
      return;
    }
    if (!open || suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) =>
        i + 1 >= suggestions.length ? 0 : i + 1,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) =>
        i <= 0 ? suggestions.length - 1 : i - 1,
      );
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
    }
  };

  const isHero = variant === "hero";
  const inputClass = isHero
    ? "w-full rounded-2xl border-2 border-white/30 bg-white py-5 pl-16 pr-6 text-lg text-pk-ink shadow-glow-lg outline-none ring-pk-electric/35 transition placeholder:text-slate-400 focus:border-pk-electric focus:ring-4 focus:ring-pk-electric/30"
    : "w-full rounded-2xl border-2 border-white/25 bg-white/98 py-3.5 pl-12 pr-4 text-base text-pk-ink shadow-inner outline-none ring-pk-electric/40 transition placeholder:text-slate-400 focus:border-pk-electric focus:ring-4 focus:ring-pk-electric/25";

  const btnClass = isHero
    ? "rounded-2xl bg-pk-electric px-10 py-5 text-lg font-bold text-pk-ink shadow-glow transition hover:bg-pk-yellow-bright hover:shadow-glow-lg active:scale-[0.99]"
    : "shrink-0 rounded-2xl bg-pk-electric px-5 py-3.5 text-sm font-bold text-pk-ink shadow-md transition hover:bg-pk-yellow-bright hover:shadow-lg active:scale-[0.98]";

  const iconWrapClass = isHero
    ? "pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-pk-blue"
    : "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-pk-electric";

  return (
    <div ref={containerRef} className="relative w-full">
      <form
        action="/soeg"
        method="get"
        className={
          isHero
            ? "mx-auto flex max-w-3xl flex-col gap-3 sm:flex-row sm:items-stretch"
            : "flex w-full flex-1 items-center gap-2"
        }
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          submitSearch();
        }}
      >
        <label htmlFor={inputId} className="sr-only">
          Søg efter Pokémon-produkter og guides
        </label>
        <div className={isHero ? "relative flex-1" : "relative min-w-0 flex-1"}>
          <span className={iconWrapClass} aria-hidden>
            {isHero ? (
              <IconBolt className="h-7 w-7 drop-shadow-sm" />
            ) : (
              <IconSearch className="h-5 w-5" />
            )}
          </span>
          <input
            id={inputId}
            name="q"
            type="search"
            autoComplete="off"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setOpen(true)}
            onKeyDown={onInputKeyDown}
            aria-expanded={open}
            aria-controls={open ? listId : undefined}
            aria-activedescendant={
              open && activeIndex >= 0
                ? `${listId}-opt-${activeIndex}`
                : undefined
            }
            aria-autocomplete="list"
            role="combobox"
            placeholder={
              isHero
                ? "Prøv: booster box, sleeves, ETB, Scarlet…"
                : "Søg: booster, ETB, sleeves, Charizard…"
            }
            className={inputClass}
          />

          {open && suggestions.length > 0 && (
            <ul
              id={listId}
              role="listbox"
              className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-50 max-h-80 overflow-auto rounded-2xl border border-pk-blue/15 bg-white/98 py-2 shadow-2xl shadow-pk-navy/20 backdrop-blur-md"
            >
              <li className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-pk-navy/45">
                {debouncedQuery.trim() ? "Forslag" : "Populært lige nu"}
              </li>
              {suggestions.map((item, idx) => (
                <li key={item.id} role="presentation">
                  <button
                    type="button"
                    role="option"
                    aria-selected={idx === activeIndex}
                    id={`${listId}-opt-${idx}`}
                    className={`flex w-full items-start gap-3 px-3 py-2.5 text-left text-sm transition hover:bg-pk-cream/80 ${
                      idx === activeIndex ? "bg-pk-cream" : ""
                    }`}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => onPick(item)}
                  >
                    {suggestionIcon(item)}
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold text-pk-navy">
                        {item.kind === "popular" ? item.label : item.title}
                      </span>
                      {item.kind !== "popular" && (
                        <span className="mt-0.5 block text-xs text-pk-navy/60">
                          {item.subtitle}
                        </span>
                      )}
                      {item.kind === "popular" && (
                        <span className="mt-0.5 block text-xs text-pk-navy/55">
                          Søg i katalog og guides
                        </span>
                      )}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <button type="submit" className={btnClass}>
          {isHero ? "Søg nu" : "Søg"}
        </button>
      </form>
    </div>
  );
}
