import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  /** Prioritér LCP på fx første kort */
  priority?: boolean;
};

/**
 * Feed-billeder har forskellige aspect ratios.
 * - Mobil: fast lav ramme (undgår kæmpe kvadrat — hele motivet med object-contain).
 * - md+: 4:3 fra bredde med loft, så kortene matcher grid.
 */
export function ProductCardImage({ src, alt, priority = false }: Props) {
  return (
    <div
      className="relative mx-auto w-full max-w-full overflow-hidden rounded-2xl border border-pk-blue/10 bg-gradient-to-b from-white to-pk-cream/90 ring-1 ring-black/[0.04]
        h-40 sm:h-44
        md:aspect-[4/3] md:h-auto md:max-h-[13.5rem] md:min-h-0
        lg:max-h-[15rem]"
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 639px) 92vw, (max-width: 1023px) 45vw, 30vw"
        quality={88}
        priority={priority}
        className="object-contain object-center p-2 sm:p-2.5 md:p-3 transition duration-500 md:group-hover:scale-[1.02]"
      />
    </div>
  );
}
