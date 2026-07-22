"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Lock, LoaderCircle } from "lucide-react";
import { login, type LoginState } from "./actions";
import { Logo } from "@/components/ui/Logo";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="flex h-12 w-full items-center justify-center gap-2 bg-copper font-display font-semibold uppercase tracking-widest text-white transition hover:bg-copper-bright clip-slant-br disabled:opacity-60"
    >
      {pending ? (
        <>
          <LoaderCircle className="h-4 w-4 animate-spin" /> Signing in…
        </>
      ) : (
        "Sign In"
      )}
    </button>
  );
}

export function LoginForm({ next }: { next: string }) {
  const [state, formAction] = useFormState<LoginState, FormData>(login, {});

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink px-6">
      <div className="absolute inset-0 diag-lines opacity-[0.07]" />
      <div className="absolute inset-0 bg-hero-vignette" />

      <div className="relative w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo priority className="h-16 w-auto" />
        </div>

        <form
          action={formAction}
          className="border border-white/10 bg-ink-800 p-8 shadow-panel clip-notch"
        >
          <div className="mb-6 flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center bg-copper/15 text-copper clip-slant-br">
              <Lock className="h-5 w-5" />
            </span>
            <div>
              <h1 className="font-display text-lg font-semibold uppercase tracking-widest text-white">
                Admin Access
              </h1>
              <p className="text-xs text-muted">Authorised personnel only</p>
            </div>
          </div>

          <input type="hidden" name="next" value={next} />

          <label
            htmlFor="password"
            className="mb-2 block font-display text-[11px] uppercase tracking-widest2 text-muted"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoFocus
            placeholder="••••••••••"
            className="mb-4 h-12 w-full border border-white/15 bg-ink-600 px-4 text-white outline-none transition placeholder:text-muted focus:border-copper"
          />

          {state.error && (
            <p className="mb-4 border border-red-500/40 bg-red-500/10 px-4 py-2.5 text-sm text-red-300">
              {state.error}
            </p>
          )}

          <SubmitButton />
        </form>
      </div>
    </div>
  );
}
