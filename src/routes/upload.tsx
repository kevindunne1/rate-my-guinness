import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Upload, MapPin, Check } from "lucide-react";

export const Route = createFileRoute("/upload")({
  head: () => ({
    meta: [
      { title: "Submit Your Pint — Rate My Guinness" },
      { name: "description", content: "Upload a photo of your Guinness and let the judges decide." },
      { property: "og:title", content: "Submit Your Pint" },
    ],
  }),
  component: UploadPage,
});

function UploadPage() {
  const [preview, setPreview] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File | null | undefined) => {
    if (!f) return;
    const url = URL.createObjectURL(f);
    setPreview(url);
  };

  if (submitted) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-20 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gold text-stout shadow-gold">
          <Check size={36} />
        </div>
        <h1 className="mt-8 font-serif text-4xl text-cream">Sent to the Judges.</h1>
        <p className="mt-3 text-muted-foreground">Your pint enters the rotation. Fate is sealed.</p>
        <button
          onClick={() => { setSubmitted(false); setPreview(null); }}
          className="mt-8 rounded-full bg-gold px-6 py-3 font-medium text-stout"
        >
          Submit another
        </button>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-12 sm:py-16">
      <header className="mb-10 text-center">
        <h1 className="font-serif text-4xl text-cream sm:text-5xl">Submit Your Pint</h1>
        <p className="mt-3 text-muted-foreground">Photo first. Glory or shame second.</p>
      </header>

      <form
        onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
        className="space-y-6"
      >
        <label
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault(); setDragging(false);
            handleFile(e.dataTransfer.files?.[0]);
          }}
          className={`relative flex aspect-[4/3] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed transition-colors ${
            dragging ? "border-gold bg-gold/5" : "border-border bg-card hover:border-gold/50"
          }`}
        >
          {preview ? (
            <img src={preview} alt="Your pint" className="h-full w-full object-cover" />
          ) : (
            <div className="text-center">
              <Upload size={36} className="mx-auto text-gold" />
              <p className="mt-4 font-serif text-xl text-cream">Drop your pint here</p>
              <p className="mt-1 text-sm text-muted-foreground">or tap to upload</p>
            </div>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={(e) => handleFile(e.target.files?.[0])}
            className="absolute inset-0 cursor-pointer opacity-0"
          />
        </label>

        <Field label="Pub Name" required>
          <input required className={fieldClass} placeholder="The Long Hall" />
        </Field>

        <Field label="Location / City" required>
          <div className="flex gap-2">
            <input required className={`${fieldClass} flex-1`} placeholder="Dublin, Ireland" />
            <button type="button" className="flex items-center gap-1.5 rounded-xl border border-border bg-card px-4 text-sm text-gold hover:border-gold">
              <MapPin size={14} /> Auto
            </button>
          </div>
        </Field>

        <Field label="Your Handle" hint="Leave blank to submit anonymously">
          <input className={fieldClass} placeholder="@yourname" />
        </Field>

        <Field label="Notes" hint="Optional. The more poetic, the better.">
          <textarea rows={3} className={fieldClass} placeholder="Cathedral of a pour. Settled like silk." />
        </Field>

        <button
          type="submit"
          disabled={!preview}
          className="w-full rounded-full bg-gold py-4 font-medium text-stout transition-all hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Send It to the Judges
        </button>

        <p className="text-center text-xs text-muted-foreground">
          By submitting you agree your photo may be rated, judged, mocked, or celebrated by strangers on the internet.
        </p>
      </form>
    </main>
  );
}

const fieldClass = "w-full rounded-xl border border-border bg-input px-4 py-3 text-cream placeholder:text-muted-foreground focus:border-gold focus:outline-none";

function Field({ label, required, hint, children }: { label: string; required?: boolean; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-2 flex items-baseline justify-between">
        <span className="text-sm font-medium text-cream">
          {label}{required && <span className="text-gold">*</span>}
        </span>
        {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
      </label>
      {children}
    </div>
  );
}
