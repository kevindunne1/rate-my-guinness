import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PINTS } from "@/lib/pints";
import { ScoreBadge } from "@/components/ScoreBadge";
import { Trophy, Award } from "lucide-react";

export const Route = createFileRoute("/leaderboard")({
  head: () => ({
    meta: [
      { title: "Leaderboard — Rate My Guinness" },
      { name: "description", content: "Top-rated pints, pubs, and submitters." },
      { property: "og:title", content: "Leaderboard — Rate My Guinness" },
    ],
  }),
  component: Leaderboard,
});

type Tab = "pints" | "pubs" | "submitters";
type TimeFilter = "week" | "month" | "all" | "ireland" | "uk" | "australia" | "global";

function Leaderboard() {
  const [tab, setTab] = useState<Tab>("pints");
  const [time, setTime] = useState<TimeFilter>("all");
  const [shame, setShame] = useState(false);

  const sortedPints = useMemo(() => {
    const arr = [...PINTS].sort((a, b) => (shame ? a.score - b.score : b.score - a.score));
    return arr;
  }, [shame]);

  const pubs = useMemo(() => {
    const m = new Map<string, { pub: string; city: string; scores: number[]; count: number }>();
    PINTS.forEach((p) => {
      const k = `${p.pub}|${p.city}`;
      const e = m.get(k) ?? { pub: p.pub, city: p.city, scores: [], count: 0 };
      e.scores.push(p.score); e.count++;
      m.set(k, e);
    });
    return Array.from(m.values())
      .map((v) => ({ ...v, avg: v.scores.reduce((a, b) => a + b, 0) / v.scores.length }))
      .sort((a, b) => b.avg - a.avg);
  }, []);

  const submitters = useMemo(() => {
    const m = new Map<string, { handle: string; scores: number[]; count: number }>();
    PINTS.forEach((p) => {
      const e = m.get(p.handle) ?? { handle: p.handle, scores: [], count: 0 };
      e.scores.push(p.score); e.count++;
      m.set(p.handle, e);
    });
    return Array.from(m.values())
      .map((v) => ({ ...v, avg: v.scores.reduce((a, b) => a + b, 0) / v.scores.length }))
      .sort((a, b) => b.avg - a.avg);
  }, []);

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:py-16">
      <header className="mb-10 text-center">
        <h1 className="font-serif text-4xl text-cream sm:text-5xl">Leaderboard</h1>
        <p className="mt-3 text-muted-foreground">The best and the worst, ranked by you.</p>
      </header>

      <div className="mb-6 flex flex-wrap justify-center gap-2 border-b border-border pb-4">
        {([
          ["pints", "Top Pints"],
          ["pubs", "Top Pubs"],
          ["submitters", "Top Submitters"],
        ] as const).map(([k, label]) => (
          <button
            key={k}
            onClick={() => setTab(k)}
            className={`rounded-full px-5 py-2 text-sm transition-colors ${
              tab === k ? "bg-gold text-stout" : "text-muted-foreground hover:text-cream"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {([
          ["week", "This Week"], ["month", "This Month"], ["all", "All Time"],
          ["ireland", "Ireland"], ["uk", "UK"], ["australia", "Australia"], ["global", "Global"],
        ] as const).map(([k, label]) => (
          <button
            key={k}
            onClick={() => setTime(k)}
            className={`rounded-full px-3.5 py-1.5 text-xs ${time === k ? "border border-gold text-gold" : "border border-border text-muted-foreground"}`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "pints" && (
        <div>
          <div className="mb-6 flex justify-center">
            <button
              onClick={() => setShame(!shame)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                shame ? "bg-blood text-cream" : "border border-blood/40 text-blood hover:bg-blood/10"
              }`}
            >
              {shame ? "← Back to Top Pints" : "Wall of Shame →"}
            </button>
          </div>
          <ol className={`space-y-3 ${shame ? "[&_*]:!border-blood/30" : ""}`}>
            {sortedPints.map((p, i) => (
              <li
                key={p.id}
                className="flex items-center gap-4 rounded-2xl border border-border bg-card p-3 transition-colors hover:border-gold/40 sm:p-4"
              >
                <div className="w-8 text-center font-serif text-2xl text-gold">{i + 1}</div>
                <img src={p.photo} alt={p.pub} className="h-16 w-16 shrink-0 rounded-xl object-cover sm:h-20 sm:w-20" loading="lazy" />
                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-serif text-lg text-cream">{p.pub}</h3>
                  <p className="truncate text-sm text-muted-foreground">{p.city} · {p.handle}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{p.ratings} ratings</p>
                </div>
                <ScoreBadge score={p.score} size="lg" />
              </li>
            ))}
          </ol>
        </div>
      )}

      {tab === "pubs" && (
        <ol className="space-y-3">
          {pubs.map((p, i) => (
            <li key={p.pub} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4">
              <div className="w-8 text-center font-serif text-2xl text-gold">{i + 1}</div>
              <div className="flex-1 min-w-0">
                <h3 className="font-serif text-lg text-cream">{p.pub}</h3>
                <p className="text-sm text-muted-foreground">{p.city} · {p.count} rated pint{p.count > 1 ? "s" : ""}</p>
              </div>
              <ScoreBadge score={p.avg} size="lg" />
            </li>
          ))}
        </ol>
      )}

      {tab === "submitters" && (
        <ol className="space-y-3">
          {submitters.map((s, i) => (
            <li key={s.handle} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4">
              <div className="w-8 text-center font-serif text-2xl text-gold">{i + 1}</div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-gold">
                <Trophy size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-serif text-lg text-cream">{s.handle}</h3>
                <p className="text-sm text-muted-foreground">{s.count} submission{s.count > 1 ? "s" : ""} · avg {s.avg.toFixed(2)}</p>
              </div>
              {s.avg > 4.5 && (
                <span className="hidden items-center gap-1 rounded-full bg-gold/15 px-3 py-1 text-xs font-medium text-gold sm:inline-flex">
                  <Award size={12} /> Pint Whisperer
                </span>
              )}
            </li>
          ))}
        </ol>
      )}
    </main>
  );
}
