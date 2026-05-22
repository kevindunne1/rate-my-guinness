# Rate My Guinness

> See the best (and worst) pours, vote on pints, climb the leaderboard, and find your next great Guinness on the map.

Inspired by the [Rate My Guinness Facebook group](https://www.facebook.com/groups/978995015642832) — a community that started as a bit of craic and grew into a global obsession with the perfect pour.

---

## What It Is

A community-driven web app where anyone can submit a photo of their Guinness pint and have it judged by strangers on the internet. Rate pints Tinder-style, discover great pubs on an interactive map, and settle once and for all who serves the best Guinness in the world.

---

## Pages

| Page | Path | Description |
|------|------|-------------|
| Home | `/` | Hero section + Tinder-style swipe rating + latest pints mosaic |
| Map | `/map` | Interactive map showing every submitted pint by location, colour-coded by score |
| Upload | `/upload` | Submit your pint photo — no account required |
| Leaderboard | `/leaderboard` | Top pints, top pubs, top submitters, and the Wall of Shame |
| History | `/history` | Guinness heritage, the two-part pour guide, and the scoring rubric |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [React 19](https://react.dev/) + [Vite 7](https://vite.dev/) |
| Routing | [TanStack Router](https://tanstack.com/router) |
| Data fetching | [TanStack Query](https://tanstack.com/query) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| UI components | [Radix UI](https://www.radix-ui.com/) primitives via [shadcn/ui](https://ui.shadcn.com/) |
| Maps | [Leaflet](https://leafletjs.com/) + [React Leaflet](https://react-leaflet.js.org/) (OpenStreetMap tiles — no API key required) |
| Forms | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) |
| Charts | [Recharts](https://recharts.org/) |
| Package manager | [Bun](https://bun.sh/) |
| Deployment | [Vercel](https://vercel.com/) |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) LTS or [Bun](https://bun.sh/) installed
- Git

### Run locally

```bash
# Clone the repo
git clone https://github.com/kevindunne1/rate-my-guinness.git
cd rate-my-guinness

# Install dependencies (Bun is faster, but npm works too)
bun install
# or: npm install

# Start the dev server
bun run dev
# or: npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

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

Every `git push` to `main` triggers an automatic redeploy.

---

## Project Structure

```
src/
├── assests/          # Pint images and hero photo
├── componets/        # Shared components (Navbar, PintCard, ScoreBadge, SwipeCard)
│   └── ui/           # Radix UI / shadcn primitives
├── hooks/            # Custom React hooks
├── lib/
│   ├── pints.ts      # Pint data model and seed data
│   └── utils.ts      # Shared utilities
└── routes/           # TanStack Router file-based routes
    ├── __root.tsx    # Root layout (Navbar + Footer)
    ├── index.tsx     # Home page
    ├── map.tsx       # Interactive map
    ├── upload.tsx    # Submit a pint
    ├── leaderboard.tsx
    └── history.tsx   # The Perfect Pint
```

---

## Scoring

Pints are rated 1–5. Score badges are colour-coded throughout the app:

| Score | Colour | Meaning |
|-------|--------|---------|
| 4.0 – 5.0 | Gold | Quality pour |
| 2.0 – 3.9 | White | Acceptable |
| Under 2.0 | Red | Criminal |

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

*Est. 2025. Sláinte.*