import { useEffect, useRef, useState } from "react";
import type { Pint } from "@/lib/pints";
import { MapPin, ThumbsDown, ThumbsUp } from "lucide-react";
import { Link } from "@tanstack/react-router";

type Props = {
  pints: Pint[];
};

export function SwipeStack({ pints }: Props) {
  const [index, setIndex] = useState(0);
  const [drag, setDrag] = useState({ x: 0, y: 0, active: false });
  const [swipedIds, setSwipedIds] = useState<Set<string>>(new Set());
  const startRef = useRef<{ x: number; y: number } | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  if (pints.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-4 rounded-3xl border border-border bg-card text-muted-foreground">
        <p>No pints to rate right now.</p>
        <Link to="/upload" className="rounded-full bg-gold px-5 py-2 text-sm font-medium text-stout">
          Be the first to submit one
        </Link>
      </div>
    );
  }

  if (swipedIds.size >= pints.length) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-6 rounded-3xl border border-border bg-card px-8 py-14 text-center">
        <span className="text-5xl">🍺</span>
        <h3 className="font-serif text-2xl text-cream">
          You've rated all {pints.length} pints.
        </h3>
        <p className="text-sm text-muted-foreground">
          The jury has spoken. Check the leaderboard or submit your own.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={() => { setSwipedIds(new Set()); setIndex(0); }}
            className="rounded-full border border-border px-6 py-2.5 text-sm text-cream hover:border-gold hover:text-gold"
          >
            Rate again
          </button>
          <Link to="/leaderboard" className="rounded-full bg-gold px-6 py-2.5 text-sm font-medium text-stout">
            See the Leaderboard
          </Link>
          <Link to="/upload" className="rounded-full border border-gold/40 px-6 py-2.5 text-sm text-gold hover:bg-gold/10">
            Submit a pint
          </Link>
        </div>
      </div>
    );
  }

  const current = pints[index % pints.length];

  const advance = (dir: "left" | "right") => {
    setSwipedIds((prev) => new Set([...prev, current.id]));
    setDrag({ x: dir === "right" ? 600 : -600, y: 0, active: false });
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setIndex((i) => i + 1);
      setDrag({ x: 0, y: 0, active: false });
      timerRef.current = null;
    }, 280);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") advance("right");
      else if (e.key === "ArrowLeft") advance("left");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, current]);

  const onStart = (x: number, y: number) => {
    startRef.current = { x, y };
    setDrag({ x: 0, y: 0, active: true });
  };
  const onMove = (x: number, y: number) => {
    if (!startRef.current) return;
    setDrag({ x: x - startRef.current.x, y: y - startRef.current.y, active: true });
  };
  const onEnd = () => {
    if (Math.abs(drag.x) > 120) advance(drag.x > 0 ? "right" : "left");
    else setDrag({ x: 0, y: 0, active: false });
    startRef.current = null;
  };

  const rotation = drag.x / 20;
  const goodOpacity = Math.min(Math.max(drag.x / 120, 0), 1);
  const badOpacity = Math.min(Math.max(-drag.x / 120, 0), 1);

  return (
    <div className="relative mx-auto w-full max-w-md select-none">

      {/* Swipe instruction */}
      <div className="mb-3 flex items-center justify-between px-1 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5 text-blood/80">← Bad pour</span>
        <span className="text-cream/40">Swipe to rate</span>
        <span className="flex items-center gap-1.5 text-gold/80">Good pour →</span>
      </div>

      {/* Card */}
      <div
        className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-pint touch-none"
        style={{
          transform: `translate(${drag.x}px, ${drag.y}px) rotate(${rotation}deg)`,
          transition: drag.active ? "none" : "transform 0.3s ease-out",
        }}
        onMouseDown={(e) => onStart(e.clientX, e.clientY)}
        onMouseMove={(e) => drag.active && onMove(e.clientX, e.clientY)}
        onMouseUp={onEnd}
        onMouseLeave={() => drag.active && onEnd()}
        onTouchStart={(e) => onStart(e.touches[0].clientX, e.touches[0].clientY)}
        onTouchMove={(e) => onMove(e.touches[0].clientX, e.touches[0].clientY)}
        onTouchEnd={onEnd}
      >
        <div className="relative aspect-[3/4] bg-stout">
          <img
            src={current.photo}
            alt={`Pint at ${current.pub}`}
            className="h-full w-full object-cover pointer-events-none"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stout via-stout/40 to-transparent" />

          {/* Swipe overlays */}
          <div
            className="absolute left-6 top-6 rotate-[-12deg] rounded-xl border-4 border-gold px-4 py-2 font-serif text-2xl font-bold text-gold"
            style={{ opacity: goodOpacity }}
          >
            Quality Pour
          </div>
          <div
            className="absolute right-6 top-6 rotate-[12deg] rounded-xl border-4 border-blood px-4 py-2 font-serif text-2xl font-bold text-blood"
            style={{ opacity: badOpacity }}
          >
            Criminal
          </div>

          {/* Meta */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h3 className="font-serif text-2xl text-cream">{current.pub}</h3>
            <p className="mt-1 flex items-center gap-1 text-sm text-cream/80">
              <MapPin size={14} /> {current.city}, {current.country}
            </p>
            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="text-gold">{current.handle}</span>
              <span className="text-cream/60">{current.date}</span>
            </div>
            <div className="mt-3 flex items-center gap-3 rounded-xl bg-stout/70 px-3 py-2 backdrop-blur">
              {current.ratings > 0 ? (
                <>
                  <span className="font-serif text-2xl text-gold">{current.score.toFixed(1)}</span>
                  <span className="text-xs text-cream/70">avg · {current.ratings} ratings</span>
                </>
              ) : (
                <span className="text-xs font-medium uppercase tracking-wider text-gold/80">
                  ✦ New Entry — be the first to rate
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        <button
          onClick={() => advance("left")}
          aria-label="Criminal — bad pour"
          className="group flex items-center justify-center gap-3 rounded-2xl border-2 border-blood/50 bg-blood/10 px-6 py-5 text-blood transition-all hover:bg-blood hover:text-cream hover:border-blood active:scale-95"
        >
          <ThumbsDown size={24} strokeWidth={2.5} className="transition-transform group-hover:-rotate-12" />
          <span className="font-serif text-xl font-bold tracking-wide">Criminal</span>
        </button>
        <button
          onClick={() => advance("right")}
          aria-label="Quality pour — approve"
          className="group flex items-center justify-center gap-3 rounded-2xl border-2 border-gold/50 bg-gold/10 px-6 py-5 text-gold transition-all hover:bg-gold hover:text-stout hover:border-gold active:scale-95"
        >
          <span className="font-serif text-xl font-bold tracking-wide">Quality</span>
          <ThumbsUp size={24} strokeWidth={2.5} className="transition-transform group-hover:rotate-12" />
        </button>
      </div>

      <p className="mt-3 text-center text-xs text-muted-foreground">
        Swipe or tap · ← → arrow keys also work
      </p>
      <p className="mt-2 text-center text-xs text-muted-foreground/60">
        Each swipe counts as one rating. The displayed score is the live average of all votes cast.
      </p>
    </div>
  );
}
