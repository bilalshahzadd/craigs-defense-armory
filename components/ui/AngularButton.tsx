import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "gold" | "outline" | "dark";
type Size = "sm" | "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2 font-display font-semibold uppercase tracking-widest transition-all duration-200 clip-slant-br select-none";

const variants: Record<Variant, string> = {
  gold: "bg-gold text-ink hover:bg-gold-bright hover:shadow-gold",
  outline:
    "bg-transparent text-white ring-1 ring-inset ring-white/25 hover:ring-gold hover:text-gold",
  dark: "bg-ink-600 text-white hover:bg-ink-500 ring-1 ring-inset ring-white/10",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[11px]",
  md: "h-12 px-7 text-[13px]",
  lg: "h-14 px-9 text-sm",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type AnchorProps = CommonProps &
  Omit<React.ComponentProps<typeof Link>, keyof CommonProps>;
type ButtonProps = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

export function AngularButton(props: AnchorProps | ButtonProps) {
  const { variant = "gold", size = "md", className, children, ...rest } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if (typeof (props as AnchorProps).href === "string") {
    return (
      <Link className={classes} {...(rest as React.ComponentProps<typeof Link>)}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
