# Changelog

All notable changes to Rate My Guinness are recorded here.

Format: `[version] — DD/MM/YYYY` with sections for **Added**, **Changed**, **Fixed**, and **Removed**.

---

## [0.1.0] — 22/05/2025

Initial build. All five pages scaffolded and working with seed data.

### Added

**Core pages**
- Home page — hero section, Tinder-style swipe rating (swipe right = quality pour, swipe left = criminal), latest pints mosaic
- Map page — interactive Leaflet map with OpenStreetMap tiles, colour-coded pins by score (gold 4+, white 2–4, red under 2), pin clustering on zoom out, sidebar filters by score range and date
- Upload page — drag-and-drop photo upload, pub name, location, optional handle and notes, guest submission (no account required)
- Leaderboard page — Top Pints / Top Pubs / Top Submitters tabs, date and country filters, Wall of Shame toggle for worst-rated pints
- History page — Guinness heritage section (Arthur Guinness, 1759, St James's Gate), two-part pour guide, scoring rubric (head, colour, temperature, glass, pour marks)

**Shared components**
- `Navbar` — sticky top nav with mobile hamburger menu, active page highlighted in gold
- `PintCard` — photo thumbnail, pub name, location, score badge, submitter handle
- `SwipeCard` — full-screen swipe card with animated overlays (green "Quality Pour" / red "Criminal")
- `ScoreBadge` — circular badge, colour-coded by score band

**Data layer**
- `pints.ts` — `Pint` type definition and 9-entry seed dataset covering Dublin, London, Belfast, Boston, Sydney

**Tech stack**
- React 19 + Vite 7 + TanStack Router + TanStack Query
- Tailwind CSS v4
- Radix UI primitives via shadcn/ui
- Leaflet + React Leaflet for maps
- React Hook Form + Zod for upload validation
- Bun as package manager

**Infrastructure**
- GitHub repository: [kevindunne1/rate-my-guinness](https://github.com/kevindunne1/rate-my-guinness)
- Vercel deployment configured (auto-deploy on push to `main`)
- README and CHANGELOG added

---

*Entries below this line will be added as the project evolves.*