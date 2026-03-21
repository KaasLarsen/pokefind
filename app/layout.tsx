import type { Metadata } from "next";
import { Nunito, Fredoka } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import CookieConsentBanner from "../src/components/CookieConsentBanner";
import ClickAnalytics from "../src/components/ClickAnalytics";
import SiteHeader from "../src/components/SiteHeader";
import { PokeFindLogo } from "../src/components/PokeFindLogo";

const fontSans = Nunito({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fontDisplay = Fredoka({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pokefind.dk"),
  icons: {
    icon: "/logo-pokefind.svg",
    apple: "/logo-pokefind.svg",
  },
  title: "PokéFind — Danmarks Pokémon-købsguide",
  description:
    "Find Pokémon TCG og tilbehør: søgning, kategorier og danske guides. Vi samler det, du ellers skal lede efter på mange webshops. Reklamelinks markeres tydeligt.",
  openGraph: {
    title: "PokéFind — Danmarks Pokémon-købsguide",
    description:
      "Kuratér Pokémon TCG og tilbehør med søgning, kategorier og guides til danske købere. Reklamelinks markeres tydeligt.",
    url: "https://pokefind.dk",
    siteName: "PokéFind",
    locale: "da_DK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PokéFind — Danmarks Pokémon-købsguide",
    description:
      "Kuratér Pokémon TCG og tilbehør med søgning, kategorier og guides til danske købere.",
  },
};

function HeaderFallback() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-gradient-to-r from-pk-ink via-pk-navy to-pk-blue py-4 shadow-xl shadow-pk-navy/30">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo-pokefind.svg"
          alt=""
          width={44}
          height={44}
          className="h-11 w-11 shrink-0 opacity-90"
        />
        <div className="h-10 flex-1 animate-pulse rounded-2xl bg-white/10" />
      </div>
    </header>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="da" className={`${fontSans.variable} ${fontDisplay.variable}`}>
      <body className="min-h-screen font-sans text-pk-navy antialiased">
        <div className="flex min-h-screen flex-col">
          <Suspense fallback={<HeaderFallback />}>
            <SiteHeader />
          </Suspense>

          <main className="flex-1 px-4 py-8">
            <div className="mx-auto max-w-6xl">{children}</div>
          </main>

          <footer className="mt-auto border-t border-pk-navy/10 bg-pk-navy text-white/90">
            <div className="mx-auto max-w-6xl px-4 py-8 text-sm">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex gap-3">
                  <PokeFindLogo variant="mark" className="h-10 w-10 shrink-0" />
                  <div>
                    <p className="font-display font-bold text-white">PokéFind</p>
                    <p className="mt-1 text-xs text-white/70">
                      Uafhængig købsguide. Ikke officielt forbundet med The Pokémon
                      Company.
                    </p>
                  </div>
                </div>
                <div className="text-xs text-white/75">
                  <p>
                    Links kan være reklame/affiliate.{" "}
                    <a className="underline hover:text-pk-yellow" href="/affiliate-disclosure">
                      Læs mere
                    </a>
                    .
                  </p>
                  <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                    <a className="underline hover:text-pk-yellow" href="/soeg">
                      Søg
                    </a>
                    <span className="text-white/40">·</span>
                    <a className="underline hover:text-pk-yellow" href="/kategorier">
                      Kategorier
                    </a>
                    <span className="text-white/40">·</span>
                    <a className="underline hover:text-pk-yellow" href="/guider">
                      Guider
                    </a>
                    <span className="text-white/40">·</span>
                    <a className="underline hover:text-pk-yellow" href="/om">
                      Om
                    </a>
                    <span className="text-white/40">·</span>
                    <a className="underline hover:text-pk-yellow" href="/kontakt">
                      Kontakt
                    </a>
                  </p>
                  <p className="mt-2">
                    <a className="underline hover:text-pk-yellow" href="/cookies">
                      Cookies
                    </a>{" "}
                    ·{" "}
                    <a className="underline hover:text-pk-yellow" href="/privacy">
                      Privatliv
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </footer>

          <CookieConsentBanner />
          <ClickAnalytics />
        </div>
      </body>
    </html>
  );
}

