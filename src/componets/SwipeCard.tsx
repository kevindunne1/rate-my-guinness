import { useEffect, useRef, useState } from "react";
import type { Pint } from "@/lib/pints";
import { Beer, Skull, Star, MapPin } from "lucide-react";

type Props = {
  pints: Pint[];
};

export function SwipeStack({ pints }: Props) {
  const [index, setIndex] = useState(0);
  const [drag, setDrag] = useState({ x: 0, y: 0, active: false });
  const [stars, setStars] = useState<Record<string, number>>({});
  const startRef = useRef<{ x: number; y: number } | null>(null);

  const current = pints[index % pints.length];
  const next = pints[(index + 1) % pints.length];

  const advance = (dir: "left" | "right") => {
    setDrag({ x: dir === "right" ? 600 : -600, y: 0, active: false });
    setTimeout(() => {
      setIndex((i) => i + 1);
      setDrag({ x: 0, y: 0, active: false });
    }, 280);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") advance("right");
      else if (e.key === "ArrowLeft") advance("left");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

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
      {/* Stack hint */}
      <div className="absolute inset-0 translate-y-4 scale-[0.96] rounded-3xl border border-border bg-card opacity-60 shadow-pint" aria-hidden>
        <img src={next.photo} alt="" className="h-full w-full rounded-3xl object-cover opacity-40" />
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
          <img src={current.photo} alt={`Pint at ${current.pub}`} className="h-full w-full object-cover pointer-events-none" draggable={false} />
          <div className="absolute inset-0 bg-gradient-to-t from-stout via-stout/40 to-transparent" />

          {/* Overlays */}
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
              <span className="font-serif text-2xl text-gold">{current.score.toFixed(1)}</span>
              <span className="text-xs text-cream/70">avg · {current.ratings} ratings</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stars */}
      <div className="mt-5 flex items-center justify-center gap-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            onClick={() => setStars({ ...stars, [current.id]: n })}
            aria-label={`Rate ${n} stars`}
            className="p-1 transition-transform hover:scale-110"
          >
            <Star
              size={26}
              className={
                (stars[current.id] ?? 0) >= n
                  ? "fill-gold text-gold"
                  : "text-muted-foreground"
              }
            />
          </button>
        ))}
      </div>

      {/* Actions */}
      <div className="mt-5 flex items-center justify-center gap-4">
        <button
          onClick={() => advance("left")}
          className="group flex h-16 w-16 items-center justify-center rounded-full border-2 border-blood/60 bg-blood/10 text-blood transition-all hover:scale-110 hover:bg-blood hover:text-cream"
          aria-label="Disaster"
        >
          <Skull size={28} />
        </button>
        <button
          onClick={() => advance("right")}
          className="group flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold/60 bg-gold/10 text-gold transition-all hover:scale-110 hover:bg-gold hover:text-stout"
          aria-label="Good Pour"
        >
          <Beer size={28} />
        </button>
      </div>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Swipe, tap, or use ← → arrows
      </p>
    </div>
  );
}
