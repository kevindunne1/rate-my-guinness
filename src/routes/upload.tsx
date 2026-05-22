import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Upload, MapPin, Check, Loader2 } from "lucide-react";

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
  const [photoError, setPhotoError] = useState(false);
  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File | null | undefined) => {
    if (!f) return;
    setPhotoError(false);
    const url = URL.createObjectURL(f);
    setPreview(url);
  };

  const handleAutoLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      return;
    }
    setLocating(true);
    setLocationError("");
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();
          const city =
            data.address?.city ||
            data.address?.town ||
            data.address?.village ||
            data.address?.suburb ||
            "";
          const country = data.address?.country || "";
          const display = [city, country].filter(Boolean).join(", ");
          if (locationRef.current) locationRef.current.value = display;
        } catch {
          setLocationError("Couldn't look up your location. Please type it.");
        } finally {
          setLocating(false);
        }
      },
      () => {
        setLocationError("Location access denied. Please type your location.");
        setLocating(false);
      },
      { timeout: 8000 }
    );
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!preview) {
      setPhotoError(true);
      return;
    }
    setSubmitted(true);
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
          onClick={() => { setSubmitted(false); setPreview(null); setPhotoError(false); }}
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

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Photo upload */}
        <div>
          <label
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault(); setDragging(false);
              handleFile(e.dataTransfer.files?.[0]);
            }}
            className={`relative flex aspect-[4/3] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed transition-colors ${
              photoError
                ? "border-blood bg-blood/5"
                : dragging
                ? "border-gold bg-gold/5"
                : "border-border bg-card hover:border-gold/50"
            }`}
          >
            {preview ? (
              <img src={preview} alt="Your pint" className="h-full w-full object-cover" />
            ) : (
              <div className="text-center">
                <Upload size={36} className={`mx-auto ${photoError ? "text-blood" : "text-gold"}`} />
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
          {photoError && (
            <p className="mt-2 text-center text-sm font-medium text-blood">
              Add a photo to continue — that's what the judges are here for.
            </p>
          )}
        </div>

        <Field label="Pub Name" required>
          <input required className={fieldClass} placeholder="The Long Hall" />
        </Field>

        <Field
          label="Location / City"
          required
          hint={locationError ? undefined : undefined}
        >
          <div className="flex gap-2">
            <input
              ref={locationRef}
              required
              className={`${fieldClass} flex-1`}
              placeholder="Dublin, Ireland"
            />
            <button
              type="button"
              onClick={handleAutoLocation}
              disabled={locating}
              className="flex min-w-[72px] items-center justify-center gap-1.5 rounded-xl border border-border bg-card px-4 text-sm text-gold transition-colors hover:border-gold disabled:opacity-60"
            >
              {locating ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <><MapPin size={14} /> Auto</>
              )}
            </button>
          </div>
          {locationError && (
            <p className="mt-1.5 text-xs text-blood">{locationError}</p>
          )}
        </Field>

        <Field label="Your Handle" hint="Leave blank to submit anonymously">
          <input className={fieldClass} placeholder="@yourname" />
        </Field>

        <Field label="Notes" hint="Optional. The more poetic, the better.">
          <textarea rows={3} className={fieldClass} placeholder="Cathedral of a pour. Settled like silk." />
        </Field>

        <button
          type="submit"
          className="w-full rounded-full bg-gold py-4 font-medium text-stout transition-all hover:scale-[1.01] hover:brightness-110"
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

const fieldClass =
  "w-full rounded-xl border border-border bg-input px-4 py-3 text-cream placeholder:text-muted-foreground focus:border-gold focus:outline-none";

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 flex items-baseline justify-between">
        <span className="text-sm font-medium text-cream">
          {label}
          {required && <span className="text-gold">*</span>}
        </span>
        {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
      </label>
      {children}
    </div>
  );
}