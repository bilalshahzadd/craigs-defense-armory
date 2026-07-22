import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Full CDA lockup (monogram + "CRAIGS DEFENSE ARMORY").
 * The artwork has transparent background and metallic edges, so it is meant
 * to sit on a dark surface. Native aspect ratio is 808 x 309.
 */
export function Logo({
  className,
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/cda.png"
      alt="Craigs Defense Armory"
      width={808}
      height={309}
      priority={priority}
      className={cn("h-11 w-auto object-contain", className)}
    />
  );
}

/** Compact angular delta mark, kept for tight spaces / icon slots. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={cn("h-8 w-8", className)}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M32 5 L59 59 L40.5 59 L32 39 L23.5 59 L5 59 Z"
        fill="currentColor"
      />
      <path d="M32 5 L41 23 L32 23 Z" fill="currentColor" opacity="0.5" />
    </svg>
  );
}
