import Image from "next/image";
import { MapPin } from "lucide-react";
import { IMG } from "@/lib/data";
import { AngularButton } from "@/components/ui/AngularButton";

export function DealerBand() {
  return (
    <section className="relative overflow-hidden">
      <Image
        src={IMG.rifleDesert}
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-ink/80" />
      <div className="absolute inset-0 diag-lines opacity-[0.08]" />

      <div className="container-site relative flex flex-col items-center gap-6 py-20 text-center lg:py-24">
        <span className="grid h-14 w-14 place-items-center bg-copper/15 text-copper clip-slant-br">
          <MapPin className="h-7 w-7" />
        </span>
        <h2 className="max-w-2xl font-display text-4xl font-bold uppercase leading-tight tracking-wide text-white lg:text-5xl">
          Find a Dealer Near You
        </h2>
        <p className="max-w-xl text-muted-light">
          Firearms transfer through a licensed FFL dealer. Locate an authorised
          dealer in your area and we&apos;ll handle the rest.
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-4">
          <AngularButton href="/support" size="lg">
            Dealer Locator
          </AngularButton>
          <AngularButton href="/support" size="lg" variant="outline">
            Contact Us
          </AngularButton>
        </div>
      </div>
    </section>
  );
}
