import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { PINTS, type Pint } from "@/lib/pints";
import { Search, X, Filter } from "lucide-react";

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [
      { title: "Map — Rate My Guinness" },
      { name: "description", content: "Explore rated Guinness pints on a map of pubs worldwide." },
      { property: "og:title", content: "Pint Map — Rate My Guinness" },
    ],
  }),
  component: MapPage,
});

function MapPage() {
  const [scoreRange, setScoreRange] = useState(0);
  const [dateFilter, setDateFilter] = useState<"all" | "week" | "month">("all");
  const [country, setCountry] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const countries = useMemo(() => Array.from(new Set(PINTS.map((p) => p.country))), []);

  const filtered = useMemo(() => {
    return PINTS.filter((p) => p.score >= scoreRange)
      .filter((p) => country === "all" || p.country === country)
      .filter((p) => {
        if (dateFilter === "all") return true;
        if (dateFilter === "week") return /hour|day|Yesterday|week/i.test(p.date) && !/weeks/i.test(p.date);
        if (dateFilter === "month") return !/month/i.test(p.date);
        return true;
      })
      .filter((p) => !search || p.pub.toLowerCase().includes(search.toLowerCase()) || p.city.toLowerCase().includes(search.toLowerCase()));
  }, [scoreRange, country, dateFilter, search]);

  return (
    <main className="relative h-[calc(100vh-73px)]">
      {/* Sidebar */}
      <aside
        className={`absolute left-0 top-0 z-[1000] h-full w-80 max-w-[85vw] overflow-y-auto border-r border-border bg-card transition-transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-5">
          <div className="flex items-center justify-between md:hidden">
            <h2 className="font-serif text-xl text-cream">Filters</h2>
            <button onClick={() => setSidebarOpen(false)} className="text-muted-foreground"><X size={20} /></button>
          </div>

          <div className="relative mt-4">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search pub or city"
              className="w-full rounded-full border border-border bg-input py-2.5 pl-10 pr-3 text-sm text-cream placeholder:text-muted-foreground focus:border-gold focus:outline-none"
            />
          </div>

          <div className="mt-6">
            <label className="text-xs uppercase tracking-wider text-muted-foreground">
              Min score: <span className="text-gold">{scoreRange.toFixed(1)}+</span>
            </label>
            <input
              type="range" min={0} max={5} step={0.5}
              value={scoreRange}
              onChange={(e) => setScoreRange(parseFloat(e.target.value))}
              className="mt-2 w-full accent-[var(--gold)]"
            />
          </div>

          <div className="mt-6">
            <p className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">Date</p>
            <div className="flex flex-wrap gap-2">
              {(["week", "month", "all"] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => setDateFilter(d)}
                  className={`rounded-full px-3 py-1.5 text-xs ${dateFilter === d ? "bg-gold text-stout" : "border border-border text-muted-foreground"}`}
                >
                  {d === "all" ? "All Time" : d === "week" ? "This Week" : "This Month"}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <p className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">Country</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setCountry("all")}
                className={`rounded-full px-3 py-1.5 text-xs ${country === "all" ? "bg-gold text-stout" : "border border-border text-muted-foreground"}`}
              >All</button>
              {countries.map((c) => (
                <button
                  key={c}
                  onClick={() => setCountry(c)}
                  className={`rounded-full px-3 py-1.5 text-xs ${country === c ? "bg-gold text-stout" : "border border-border text-muted-foreground"}`}
                >{c}</button>
              ))}
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-border bg-stout/50 p-4">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Showing</p>
            <p className="mt-1 font-serif text-3xl text-gold">{filtered.length}</p>
            <p className="text-xs text-muted-foreground">pints on the map</p>
          </div>

          <div className="mt-6 rounded-xl border border-border p-4">
            <p className="mb-3 text-xs uppercase tracking-wider text-muted-foreground">Legend</p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-gold" /> 4.0+ stellar</div>
              <div className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-cream" /> 2.0–4.0 decent</div>
              <div className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-blood" /> Under 2.0 disaster</div>
            </div>
          </div>
        </div>
      </aside>

      <button
        onClick={() => setSidebarOpen(true)}
        className="absolute left-4 top-4 z-[999] flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-sm font-medium text-stout shadow-gold md:hidden"
      >
        <Filter size={14} /> Filters
      </button>

      <div className="h-full md:pl-80">
        <LeafletMap pints={filtered} />
      </div>
    </main>
  );
}

function LeafletMap({ pints }: { pints: Pint[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const layerRef = useRef<any>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !ref.current) return;
      if (!mapRef.current) {
        mapRef.current = L.map(ref.current, { zoomControl: true }).setView([53.34, -6.26], 4);
        L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
          attribution: "&copy; OpenStreetMap &copy; CARTO",
          maxZoom: 19,
        }).addTo(mapRef.current);
      }
      if (layerRef.current) mapRef.current.removeLayer(layerRef.current);
      layerRef.current = L.layerGroup().addTo(mapRef.current);

      pints.forEach((p) => {
        const color = p.score >= 4 ? "#C9A84C" : p.score >= 2 ? "#F5F0E8" : "#8B1A1A";
        const icon = L.divIcon({
          className: "",
          html: `<div style="width:28px;height:28px;border-radius:50%;background:${color};border:3px solid #0D0D0D;box-shadow:0 4px 12px rgba(0,0,0,0.6);display:flex;align-items:center;justify-content:center;font-weight:700;color:#0D0D0D;font-size:11px;font-family:serif;">${p.score.toFixed(1)}</div>`,
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        });
        const marker = L.marker([p.lat, p.lng], { icon });
        marker.bindPopup(
          `<div style="font-family:Inter,sans-serif;color:#0D0D0D;min-width:200px">
            <img src="${p.photo}" style="width:100%;height:120px;object-fit:cover;border-radius:8px;margin-bottom:8px" />
            <div style="font-family:'Playfair Display',serif;font-size:18px;font-weight:700;margin-bottom:2px">${p.pub}</div>
            <div style="font-size:12px;color:#666;margin-bottom:8px">${p.city}, ${p.country}</div>
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
              <span style="background:${color};color:#0D0D0D;padding:4px 10px;border-radius:999px;font-weight:700;font-size:13px">${p.score.toFixed(1)} ★</span>
              <span style="font-size:11px;color:#666">${p.ratings} ratings</span>
            </div>
            <a href="/leaderboard" style="display:block;background:#0D0D0D;color:#C9A84C;text-align:center;padding:8px;border-radius:8px;font-size:12px;font-weight:600;text-decoration:none">View on Leaderboard</a>
          </div>`
        );
        layerRef.current.addLayer(marker);
      });

      if (pints.length > 0) {
        const bounds = L.latLngBounds(pints.map((p) => [p.lat, p.lng]));
        mapRef.current.fitBounds(bounds, { padding: [60, 60], maxZoom: 8 });
      }
    })();
    return () => { cancelled = true; };
  }, [pints]);

  useEffect(() => () => { mapRef.current?.remove(); mapRef.current = null; }, []);

  return <div ref={ref} className="h-full w-full bg-stout" />;
}
