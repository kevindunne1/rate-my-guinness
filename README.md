# Rate My Guinness

> See the best (and worst) pours, vote on pints, climb the leaderboard, and find your next great Guinness on the map.

Inspired by the [Rate My Guinness Facebook group](https://www.facebook.com/groups/978995015642832) — a community that started as a bit of craic and grew into a global obsession with the perfect pour.

Live site: [rate-my-guinness.vercel.app](https://rate-my-guinness.vercel.app)

---

## What It Is

A community-driven web app where anyone can submit a photo of their Guinness pint and have it judged by strangers on the internet. Rate pints Tinder-style, discover great pubs on an interactive map, and settle once and for all who serves the best Guinness in the world.

---

## Pages

| Page | Path | Description |
|------|------|-------------|
| Home | `/` | Hero section + swipe-to-rate card stack + latest pints grid |
| Map | `/map` | Interactive map showing every submitted pint by location, colour-coded by score |
| Upload | `/upload` | Submit your pint photo — no account required |
| Leaderboard | `/leaderboard` | Top pints, top pubs, top submitters, and the Wall of Shame |
| History | `/history` | Guinness heritage, the two-part pour guide, and the scoring rubric |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [React 19](https://react.dev/) + [Vite 7](https://vite.dev/) |
| Routing | [TanStack Router v1](https://tanstack.com/router) (file-based) |
| Data fetching | [TanStack Query v5](https://tanstack.com/query) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) with `@theme` custom properties |
| UI components | [Radix UI](https://www.radix-ui.com/) primitives via [shadcn/ui](https://ui.shadcn.com/) |
| Maps | [Leaflet](https://leafletjs.com/) — OpenStreetMap/CARTO dark tiles, no API key required |
| Geolocation | [Nominatim](https://nominatim.org/) reverse geocoding (upload page auto-fill) |
| Package manager | [Bun](https://bun.sh/) (npm also works) |
| Deployment | [Vercel](https://vercel.com/) — SPA mode via `vercel.json` rewrites |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) LTS or [Bun](https://bun.sh/)
- Git

### Run locally

```bash
# Clone the repo
git clone https://github.com/kevindunne1/rate-my-guinness.git
cd rate-my-guinness

# Install dependencies
bun install
# or: npm install

# Start the dev server
bun run dev
# or: npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
bun run build
# or: npm run build
```

---

## Deploying to Vercel

This project is configured for Vercel out of the box.

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com) → Add New Project → Import the repo
3. Vercel auto-detects Vite — no configuration needed
4. Click Deploy

Every `git push` to `main` triggers an automatic redeploy. The `vercel.json` SPA rewrite rule ensures all routes resolve correctly.

---

## Project Structure

```
src/
├── assets/           # 51 pint photos + hero image (local, no CDN dependency)
├── componets/        # Shared components — note: folder name is intentional (locked on Windows)
│   ├── Navbar.tsx    # Sticky top nav, mobile hamburger, active state highlighting
│   ├── PintCard.tsx  # Photo card used in the latest pints grid
│   ├── ScoreBadge.tsx
│   ├── SwipeCard.tsx # Tinder-style swipe stack with Criminal / Quality rating
│   └── ui/           # Radix UI / shadcn primitives
├── hooks/            # Custom React hooks
├── lib/
│   ├── pints.ts      # Pint type + 51-entry global dataset (one per local asset)
│   └── utils.ts      # Shared utilities
└── routes/           # TanStack Router file-based routes
    ├── __root.tsx    # Root layout (QueryClientProvider, Navbar, Outlet)
    ├── index.tsx     # Home page
    ├── map.tsx       # Interactive Leaflet map with sidebar filters
    ├── upload.tsx    # Submit a pint (photo, pub, location, handle, notes)
    ├── leaderboard.tsx
    └── history.tsx   # The Perfect Pint — heritage, pour guide, scoring rubric
```

> **Note on path aliases:** `@/components/*` resolves to `src/componets/*` via a `tsconfig.json` override. This is intentional — the folder name cannot be changed on the host system.

---

## Scoring

Pints are rated by swipes — right for quality, left for criminal. Each swipe adds one vote. The displayed score is the live average of all votes cast.

Score badges are colour-coded throughout the app:

| Score | Colour | Meaning |
|-------|--------|---------|
| 4.0 – 5.0 | Gold | Quality pour |
| 2.0 – 3.9 | Cream | Acceptable |
| Under 2.0 | Red | Criminal |

---

## Dataset

51 real pubs across 14 countries, each mapped to a local photo asset:

| Region | Pubs |
|--------|------|
| Ireland (Dublin) | The Long Hall, Mulligan's, Kehoe's, The Stag's Head, Grogan's, The Palace Bar, The Gravediggers, Doheny & Nesbitt, Toner's, O'Donoghue's, The Brazen Head |
| Ireland (regional) | Dick Mack's (Dingle), The Quays (Galway), Tigh Neachtain (Galway), Sin É (Cork), Tynan's (Kilkenny), Morrissey's (Abbeyleix) |
| Northern Ireland | The Crown Bar, White's Tavern, Kelly's Cellars (Belfast) |
| England | The Toucan, The Harp, Waxy O'Connor's (London), The Philharmonic (Liverpool), The Britons Protection (Manchester), The Black Swan (York) |
| Scotland | The Bow Bar, The Sheep Heid Inn (Edinburgh), The Pot Still (Glasgow) |
| USA | The Dead Rabbit, McSorley's, P.J. Clarke's (New York), The Plough & Stars (Boston), Fado (Chicago), Connolly's (San Francisco), The Dubliner (Washington DC) |
| Canada | The Dora Keogh (Toronto), The Irish Heather (Vancouver), Bridie Molloy's (Ottawa) |
| Australia | P.J. O'Brien's (Sydney), Bridie O'Reilly's (Melbourne), The Pineapple Hotel (Brisbane), Fibber Magee's (Perth) |
| New Zealand | Galbraith's (Auckland), The Malthouse (Wellington) |
| Spain | Flaherty's (Madrid), Kitty O'Shea's (Barcelona) |
| Germany | Dicey Reilly's (Berlin) |
| France | Carr's Irish Pub (Paris) |
| Japan | The Dubliners (Tokyo) |
| Singapore | Molly Malone's |

---

## Roadmap

- [ ] Backend persistence (Supabase — photo storage, voting records, leaderboards)
- [ ] User accounts and profiles
- [ ] Pub profile pages aggregating all pints from a venue
- [ ] Real photo upload to cloud storage
- [ ] Share a pint card to social media
- [ ] Mobile app (React Native)

---

## Contributing

Pull requests welcome. If you find a genuinely terrible Guinness, submit it via the Upload page — the Wall of Shame needs feeding.

---

## Acknowledgements

Competitive landscape research informed by [ratemyguinness.co.uk](https://ratemyguinness.co.uk), [ratemyg.com](https://ratemyg.com), [The Guinness Map](https://www.theguinnessmap.com/), and [Untappd](https://untappd.com). Built to do what none of them do: swipe-to-rate community pint photos with a location-based discovery layer.

---

*Est. 2026. Sláinte.*