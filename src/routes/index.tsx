import { createFileRoute, Link } from "@tanstack/react-router";
import { SwipeStack } from "@/components/SwipeCard";
import { PintCard } from "@/components/PintCard";
import { PINTS } from "@/lib/pints";
import heroPint from "@/assets/hero-pint.jpg";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rate My Guinness — Every pint tells a story" },
      { name: "description", content: "Rate the good ones. Shame the disasters. Swipe through pints from pubs around the world." },
      { property: "og:title", content: "Rate My Guinness" },
      { property: "og:description", content: "Rate the good ones. Shame the disasters." },
    ],
  }),
  component: Landing,
});

function Landing() {
  const [filter, setFilter] = useState<"all" | "week" | "near">("all");
  const filtered = filter === "all" ? PINTS : filter === "week" ? PINTS.slice(0, 5) : PINTS.slice(0, 3);

  return (
    <main>
      {/* HERO */}
      <section className="relative grain min-h-[92vh] overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroPint} alt="A perfect pint of Guinness" className="h-full w-full object-cover opacity-60" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-b from-stout/70 via-stout/50 to-stout" />
        </div>
        <div className="relative mx-auto flex min-h-[92vh] max-w-5xl flex-col items-center justify-center px-4 py-20 text-center">
          <span className="mb-6 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-gold">
            Est. by the thirsty
          </span>
          <h1 className="font-serif text-5xl leading-[1.05] text-cream sm:text-7xl md:text-8xl">
            Every pint <br /> tells a <em className="text-gold">story.</em>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-cream/80 sm:text-xl">
            Rate the good ones. Shame the disasters.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <a
              href="#rate"
              className="group inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 font-medium text-stout transition-transform hover:scale-105"
            >
              Start Rating
              <ArrowDown size={18} className="transition-transform group-hover:translate-y-0.5" />
            </a>
            <Link
              to="/upload"
              className="inline-flex items-center gap-2 rounded-full border border-cream/30 px-8 py-4 text-cream transition-colors hover:border-gold hover:text-gold"
            >
              Submit Your Pint <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* SWIPE */}
      <section id="rate" className="relative overflow-hidden px-4 py-20 sm:py-28">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <h2 className="font-serif text-4xl text-cream sm:text-5xl">Swipe to Judge</h2>
            <p className="mt-3 text-muted-foreground">Right for quality. Left for the unforgivable.</p>
          </div>

          <div className="mb-8 flex justify-center gap-2">
            {([
              ["all", "All"],
              ["week", "This Week"],
              ["near", "Near Me"],
            ] as const).map(([k, label]) => (
              <button
                key={k}
                onClick={() => setFilter(k)}
                className={`rounded-full px-5 py-2 text-sm transition-colors ${
                  filter === k
                    ? "bg-gold text-stout"
                    : "border border-border bg-card text-muted-foreground hover:text-cream"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <SwipeStack pints={filtered} />
        </div>
      </section>

      {/* LATEST */}
      <section className="border-t border-border bg-card/30 px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="font-serif text-4xl text-cream sm:text-5xl">Fresh from the Judges</h2>
              <p className="mt-2 text-muted-foreground">The latest submissions, hot off the tap.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PINTS.slice(0, 6).map((p) => (
              <PintCard key={p.id} pint={p} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link to="/leaderboard" className="inline-flex items-center gap-2 text-gold hover:underline">
              See the Leaderboard <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-border px-4 py-10 text-center text-sm text-muted-foreground">
        Rate My Guinness · Drink responsibly · Pour patiently
      </footer>
    </main>
  );
}
