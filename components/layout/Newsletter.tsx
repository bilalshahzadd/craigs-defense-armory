"use client";

import { useState } from "react";
import { Check, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [robot, setRobot] = useState(false);
  const [done, setDone] = useState(false);

  return (
    <div className="border-b border-white/10 bg-ink-700 py-16 bg-grit">
      <div className="container-site max-w-3xl text-center">
        <h2 className="font-display text-3xl font-bold uppercase tracking-wide text-white md:text-4xl">
          Stay Updated
        </h2>
        <p className="mt-3 text-muted-light">
          Don&apos;t miss out on product launches, events, and free swag.
        </p>

        {done ? (
          <div className="mx-auto mt-8 flex max-w-md items-center justify-center gap-3 border border-gold/40 bg-gold/10 px-6 py-5 text-gold clip-slant-br">
            <Check className="h-5 w-5" />
            <span className="font-display text-sm uppercase tracking-widest">
              You&apos;re on the list.
            </span>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email && robot) setDone(true);
            }}
            className="mx-auto mt-8 max-w-2xl"
          >
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="h-14 flex-1 border border-white/15 bg-ink-600 px-5 text-white outline-none transition placeholder:text-muted focus:border-gold"
              />
              <button
                type="submit"
                className="h-14 bg-gold px-10 font-display font-semibold uppercase tracking-widest text-ink transition hover:bg-gold-bright clip-slant-tr disabled:cursor-not-allowed disabled:opacity-50"
                disabled={!robot}
              >
                Sign Up
              </button>
            </div>

            {/* Faux verification, styled like the reference */}
            <button
              type="button"
              onClick={() => setRobot((v) => !v)}
              className="mt-4 flex items-center gap-3 border border-white/15 bg-ink-600 px-4 py-3 text-left"
            >
              <span
                className={cn(
                  "grid h-6 w-6 place-items-center border-2 transition",
                  robot ? "border-gold bg-gold" : "border-white/30 bg-transparent"
                )}
              >
                {robot && <Check className="h-4 w-4 text-ink" />}
              </span>
              <span className="text-sm text-muted-light">I&apos;m not a robot</span>
              <ShieldCheck className="ml-2 h-6 w-6 text-muted" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
