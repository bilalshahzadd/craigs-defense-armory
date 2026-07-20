import { cn } from "@/lib/utils";

/** Angular tactical delta mark. */
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
