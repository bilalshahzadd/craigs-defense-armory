import { AngularButton } from "@/components/ui/AngularButton";
import { LogoMark } from "@/components/ui/Logo";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-ink">
      <div className="absolute inset-0 diag-lines opacity-10" />
      <div className="container-site relative text-center">
        <LogoMark className="mx-auto h-14 w-14 text-gold" />
        <p className="mt-8 font-display text-8xl font-bold text-white">404</p>
        <h1 className="mt-2 font-display text-2xl font-semibold uppercase tracking-widest text-gold">
          Off Target
        </h1>
        <p className="mx-auto mt-4 max-w-md text-muted-light">
          The page you&apos;re looking for has been moved, decommissioned, or
          never existed. Let&apos;s get you back on the line.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <AngularButton href="/">Back to Home</AngularButton>
          <AngularButton href="/rifles" variant="outline">
            Shop Rifles
          </AngularButton>
        </div>
      </div>
    </section>
  );
}
