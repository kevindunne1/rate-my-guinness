import type { Pint } from "@/lib/pints";
import { ScoreBadge } from "./ScoreBadge";
import { MapPin } from "lucide-react";

export function PintCard({ pint }: { pint: Pint }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="relative aspect-[4/5] overflow-hidden bg-stout">
        <img
          src={pint.photo}
          alt={`Pint at ${pint.pub}`}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="absolute right-3 top-3">
          {pint.ratings > 0 ? (
            <ScoreBadge score={pint.score} />
          ) : (
            <span className="rounded-full bg-gold/20 px-2.5 py-1 text-xs font-medium text-gold">
              New
            </span>
          )}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-serif text-lg text-cream">{pint.pub}</h3>
        <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin size={12} /> {pint.city}
        </p>
        <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
          <span className="text-gold">{pint.handle}</span>
          <span>{pint.ratings > 0 ? `${pint.ratings} ratings` : "No ratings yet"}</span>
        </div>
      </div>
    </article>
  );
}
