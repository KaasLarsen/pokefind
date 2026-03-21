"use client";

import { useEffect, useMemo, useState } from "react";

type ConsentValue = "all" | "essential";
const STORAGE_KEY = "pokemon_cookie_consent";

function getStoredConsent(): ConsentValue | undefined {
  if (typeof window === "undefined") return undefined;
  const v = window.localStorage.getItem(STORAGE_KEY);
  if (v === "all" || v === "essential") return v;
  return undefined;
}

export default function CookieConsentBanner() {
  const [consent, setConsent] = useState<ConsentValue | undefined>(undefined);

  useEffect(() => {
    setConsent(getStoredConsent());
  }, []);

  const visible = consent == null;

  const bannerId = useMemo(() => `cookie-consent-${Math.random()}`, []);

  if (!visible) return null;

  return (
    <div
      id={bannerId}
      className="fixed inset-x-0 bottom-0 z-50 overflow-x-hidden border-t border-pk-navy/20 bg-pk-navy p-4 text-white shadow-2xl"
      role="dialog"
      aria-modal="false"
      aria-label="Cookievalg"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-white/90">
          <div className="font-bold text-pk-yellow">Cookievalg</div>
          <div className="mt-1 text-white/80">
            Vi bruger cookies til at forbedre oplevelsen. Vælg om du vil
            aktivere nødvendige cookies alene eller også statistiske cookies.
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            className="rounded-xl bg-pk-yellow px-4 py-2 text-sm font-bold text-pk-navy shadow hover:bg-pk-yellow-bright"
            onClick={() => {
              window.localStorage.setItem(STORAGE_KEY, "all");
              setConsent("all");
            }}
          >
            Accepter alle
          </button>
          <button
            className="rounded-xl border border-white/25 px-4 py-2 text-sm text-white hover:bg-white/10"
            onClick={() => {
              window.localStorage.setItem(STORAGE_KEY, "essential");
              setConsent("essential");
            }}
          >
            Nødvendige cookies
          </button>
          <button
            className="rounded-xl border border-white/25 px-4 py-2 text-sm text-white hover:bg-white/10"
            onClick={() => {
              window.localStorage.setItem(STORAGE_KEY, "essential");
              setConsent("essential");
            }}
          >
            Afvis
          </button>
        </div>
      </div>

      <div className="mx-auto mt-3 max-w-6xl text-xs text-white/65">
        <a className="underline hover:text-pk-yellow" href="/cookies">
          Se cookiepolitik
        </a>{" "}
        ·{" "}
        <a className="underline hover:text-pk-yellow" href="/privacy">
          Læs privacy policy
        </a>
      </div>
    </div>
  );
}

