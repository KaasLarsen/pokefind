import type { ReactNode } from "react";

type Props = {
  title: ReactNode;
  subtitle?: string;
  kicker?: string;
};

export default function SectionTitle({ title, subtitle, kicker }: Props) {
  return (
    <div className="mb-6">
      {kicker ? (
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-pk-blue/80">
          {kicker}
        </p>
      ) : null}
      <div className="pk-heading-line mb-3" aria-hidden />
      <h2 className="font-display text-2xl font-extrabold tracking-tight text-pk-navy md:text-3xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-2 max-w-2xl text-sm font-medium text-pk-navy/70">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
