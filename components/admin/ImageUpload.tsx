"use client";

import { useRef, useState } from "react";
import { ImagePlus, LoaderCircle, Link2 } from "lucide-react";

const MAX_DIM = 1400;

/** Downscale + re-encode in the browser so uploads stay small. */
function processFile(file: File): Promise<{ mime: string; data: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read file"));
    reader.onload = () => {
      const img = new window.Image();
      img.onerror = () => reject(new Error("Could not decode image"));
      img.onload = () => {
        const scale = Math.min(1, MAX_DIM / Math.max(img.width, img.height));
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);

        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("Canvas unavailable"));
        ctx.drawImage(img, 0, 0, w, h);

        const dataUrl = canvas.toDataURL("image/webp", 0.85);
        const [, base64] = dataUrl.split(",");
        resolve({ mime: "image/webp", data: base64 });
      };
      img.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
}

export function ImageUpload({
  name = "image_url",
  defaultValue = "",
}: {
  name?: string;
  defaultValue?: string;
}) {
  const [url, setUrl] = useState(defaultValue);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setBusy(true);
    setError(null);
    try {
      const { mime, data } = await processFile(file);
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename: file.name, mime, data }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Upload failed");
      setUrl(json.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-3">
      <input type="hidden" name={name} value={url} />

      <div className="flex items-start gap-4">
        <div className="relative h-28 w-36 shrink-0 overflow-hidden border border-white/15 bg-ink-600">
          {url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={url}
              alt="Product preview"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="grid h-full w-full place-items-center text-muted">
              <ImagePlus className="h-6 w-6" />
            </div>
          )}
          {busy && (
            <div className="absolute inset-0 grid place-items-center bg-ink/70">
              <LoaderCircle className="h-5 w-5 animate-spin text-copper" />
            </div>
          )}
        </div>

        <div className="flex-1 space-y-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
            }}
          />
          <button
            type="button"
            disabled={busy}
            onClick={() => inputRef.current?.click()}
            className="inline-flex h-10 items-center gap-2 border border-white/15 px-4 font-display text-xs uppercase tracking-widest text-muted-light transition hover:border-copper hover:text-copper disabled:opacity-50"
          >
            <ImagePlus className="h-4 w-4" />
            {busy ? "Uploading…" : "Upload image"}
          </button>

          <div className="flex items-center gap-2">
            <Link2 className="h-4 w-4 shrink-0 text-muted" />
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="…or paste an image URL / path"
              className="h-10 w-full border border-white/15 bg-ink-600 px-3 text-sm text-white outline-none placeholder:text-muted focus:border-copper"
            />
          </div>
          {error && <p className="text-xs text-red-400">{error}</p>}
        </div>
      </div>
    </div>
  );
}
