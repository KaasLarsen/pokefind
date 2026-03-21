import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  /** Prioritér LCP på fx første kort */
  priority?: boolean;
};

/**
 * Feed-billeder har forskellige aspect ratios og opløsninger.
 * Vi bruger next/image (AVIF/WebP) + fast ramme + object-contain så motivet er skarpt og helt synligt.
 */
export function ProductCardImage({ src, alt, priority = false }: Props) {
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-pk-blue/10 bg-gradient-to-b from-white to-pk-cream/90 ring-1 ring-black/[0.04]">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
        quality={88}
        priority={priority}
        className="object-contain object-center p-3 transition duration-500 group-hover:scale-[1.03]"
      />
    </div>
  );
}
