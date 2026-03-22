const KELZOR_CLICK_URL =
  "https://www.partner-ads.com/dk/klikbanner.php?partnerid=56431&bannerid=95333";
const KELZOR_IMAGE_URL =
  "https://www.partner-ads.com/dk/visbanner.php?partnerid=56431&bannerid=95333";

type Props = {
  /** `footer`: mørk baggrund (footer); `default`: lys side */
  variant?: "footer" | "default";
  className?: string;
};

/**
 * Partner-ads display-banner (Kelz0r). Klik og visning følger Partner-ads’ tracking.
 */
export default function PartnerAdsDisplayBanner({
  variant = "default",
  className = "",
}: Props) {
  const isFooter = variant === "footer";

  return (
    <aside
      className={`mx-auto w-full max-w-xl ${className}`.trim()}
      aria-label="Reklamebanner"
    >
      <p
        className={
          isFooter ?
            "mb-2 text-center text-[0.65rem] font-bold uppercase tracking-[0.2em] text-pk-yellow/90"
          : "mb-2 text-center text-[0.65rem] font-bold uppercase tracking-[0.2em] text-pk-navy/55"
        }
      >
        Reklame
      </p>
      <a
        href={KELZOR_CLICK_URL}
        target="_blank"
        rel="nofollow sponsored noopener noreferrer"
        className={`block overflow-hidden rounded-2xl border shadow-sm transition hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
          isFooter ?
            "border-white/15 bg-white/5 focus-visible:outline-pk-yellow"
          : "border-pk-blue/15 bg-white focus-visible:outline-pk-blue"
        }`}
        aria-label="Åbn Kelz0r (reklamelink i nyt vindue)"
      >
        {/* eslint-disable-next-line @next/next/no-img-element — ekstern Partner-ads dynamisk banner-URL */}
        <img
          src={KELZOR_IMAGE_URL}
          alt="Kelz0r — reklame"
          width={468}
          height={120}
          className="h-auto w-full max-w-full border-0 object-contain"
          loading="lazy"
          decoding="async"
        />
      </a>
    </aside>
  );
}
