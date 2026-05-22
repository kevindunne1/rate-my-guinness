import { createFileRoute, Link } from "@tanstack/react-router";
import { Beer, Palette, Thermometer, GlassWater, Sparkles, ArrowRight } from "lucide-react";
import heroPint from "@/assets/hero-pint.jpg";
import pour1 from "@/assets/pint-6.jpg";
import pour2 from "@/assets/pint-1.jpg";

export const Route = createFileRoute("/history")({
  head: () => ({
    meta: [
      { title: "The Perfect Pint — Rate My Guinness" },
      { name: "description", content: "A short history of Guinness and what makes a perfect pour." },
      { property: "og:title", content: "The Perfect Pint" },
      { property: "og:description", content: "The two-part pour, the scoring rubric, and the 1759 story." },
    ],
  }),
  component: HistoryPage,
});

const rubric = [
  { icon: Sparkles, name: "Head", good: "Tight, creamy, two fingers thick, sits proud above the rim.", bad: "Foamy, soapy, dissolving as you watch." },
  { icon: Palette, name: "Colour", good: "Ruby-black against the light. Never opaque.", bad: "Flat brown. Lifeless." },
  { icon: Thermometer, name: "Temperature", good: "42.8°F. Cool, never icy. Lets flavour breathe.", bad: "Lukewarm or freezing — both criminal." },
  { icon: GlassWater, name: "Glass", good: "Tulip pint, clean, dry, branded.", bad: "Wet, smudged, or a frosted American pint glass." },
  { icon: Beer, name: "Pour Marks", good: "Six clean rings down the glass as you drink.", bad: "No marks. The sign of a rushed pour." },
];

export default function HistoryPage() { return <Page />; }

function Page() {
  return (
    <main>
      {/* Hero */}
      <section className="relative grain overflow-hidden border-b border-border">
        <img src={heroPint} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-stout/80 to-stout" />
        <div className="relative mx-auto max-w-4xl px-4 py-24 text-center sm:py-32">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">A short manifesto</p>
          <h1 className="mt-4 font-serif text-5xl text-cream sm:text-7xl">What Makes a <em className="text-gold">Perfect Pint?</em></h1>
        </div>
      </section>

      {/* History */}
      <section className="mx-auto max-w-3xl px-4 py-20">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">1759</p>
        <h2 className="mt-3 font-serif text-3xl text-cream sm:text-4xl">St James's Gate</h2>
        <div className="mt-6 space-y-5 text-lg leading-relaxed text-cream/85">
          <p>
            On the last day of 1759, a 34-year-old Arthur Guinness signed a 9,000-year lease
            on a disused brewery at St James's Gate, Dublin. The rent: £45 a year. Water
            from the Wicklow Mountains. A bet on porter when porter was king.
          </p>
          <p>
            Two and a half centuries later, the same gates still open onto the same yard.
            The stuff inside the glass is what stayed worth defending.
          </p>
          <p>
            This page exists because a pint is a craft, not a commodity. If you've had a great
            one, you know. If you've had a bad one, you really know.
          </p>
        </div>
      </section>

      {/* Two-part pour */}
      <section className="border-y border-border bg-card/30 px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <p className="text-center text-xs uppercase tracking-[0.3em] text-gold">The Method</p>
          <h2 className="mt-3 text-center font-serif text-3xl text-cream sm:text-4xl">The Two-Part Pour</h2>
          <p className="mt-3 text-center text-muted-foreground">119.5 seconds. Not negotiable.</p>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <Step n={1} title="The Tilt" img={pour1}>
              Hold the glass at 45 degrees, harp facing the tap. Pull the handle smoothly toward
              you. Fill to three-quarters. Set it down. Walk away. Wait.
            </Step>
            <Step n={2} title="The Top-Up" img={pour2}>
              When the surge has settled — properly settled — push the handle away from you and top
              up straight until the head domes proud above the rim. Serve.
            </Step>
          </div>
        </div>
      </section>

      {/* Rubric */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <p className="text-center text-xs uppercase tracking-[0.3em] text-gold">The Rubric</p>
        <h2 className="mt-3 text-center font-serif text-3xl text-cream sm:text-4xl">How We Score</h2>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rubric.map((r) => (
            <div key={r.name} className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-gold/40">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-gold">
                <r.icon size={22} />
              </div>
              <h3 className="mt-5 font-serif text-2xl text-cream">{r.name}</h3>
              <div className="mt-4 space-y-3">
                <div>
                  <p className="text-xs uppercase tracking-wider text-gold">Perfect</p>
                  <p className="mt-1 text-sm text-cream/85">{r.good}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-blood">Disaster</p>
                  <p className="mt-1 text-sm text-muted-foreground">{r.bad}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border px-4 py-20 text-center">
        <h2 className="mx-auto max-w-2xl font-serif text-3xl text-cream sm:text-4xl">
          Think you've found a perfect pint? <em className="text-gold">Prove it.</em>
        </h2>
        <Link
          to="/upload"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 font-medium text-stout hover:scale-105 transition-transform"
        >
          Submit Your Pint <ArrowRight size={16} />
        </Link>
      </section>
    </main>
  );
}

function Step({ n, title, img, children }: { n: number; title: string; img: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="aspect-[4/3] overflow-hidden bg-stout">
        <img src={img} alt={title} className="h-full w-full object-cover" loading="lazy" />
      </div>
      <div className="p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-gold">Step {n}</p>
        <h3 className="mt-2 font-serif text-2xl text-cream">{title}</h3>
        <p className="mt-3 text-cream/80">{children}</p>
      </div>
    </div>
  );
}
