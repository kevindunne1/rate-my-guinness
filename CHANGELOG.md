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

## [0.2.0] — 22/05/2026

Polish pass, data expansion, and UX improvements based on review.

### Added

- **51-pub global dataset** — `pints.ts` rewritten with one real pub per local asset image, covering Ireland (Dublin + regional), Northern Ireland, England, Scotland, USA, Canada, Australia, New Zealand, Spain, Germany, France, Japan, and Singapore. All photos now served from local assets rather than Unsplash CDN.
- **Upload file guidance** — format and size hint ("JPEG, PNG, WebP or HEIC · Max 20 MB") displayed below the upload area. Client-side 20 MB file size validation added with a distinct error message.
- **Leaderboard filters wired up** — time and geography filter chips now actually filter the pints, pubs, and submitters lists (previously cosmetic). Empty state shown when no pints match.
- **Upload geolocation** — "Auto" button uses browser geolocation + Nominatim reverse geocoding to pre-fill the location field. Loader spinner during lookup, error message on denial or timeout.

### Changed

- **SwipeCard redesign** — star ratings removed (redundant with on-card score). Direction indicator pills above card removed. Skull/beer icon buttons replaced with full-width "Criminal" (ThumbsDown) / "Quality" (ThumbsUp) button pair with animated hover states.
- **SwipeCard end state** — once all pints are rated, shows a completion screen with options to rate again, view the leaderboard, or submit a pint. Previously cycled back silently.
- **PintCard** — hover animations removed (implied tappability with no destination). "New" gold badge shown for unrated entries instead of a score badge.
- **Map popup** — deep-link CTA now navigates to `/leaderboard` (was a broken `/#rate` anchor).
- **Navbar** — mobile hamburger menu links now highlight correctly on the active page (was missing the active gold state).

### Fixed

- `useEffect` keyboard listener dependency array corrected — was re-registering on every render.
- `setTimeout` now cleaned up on `SwipeCard` unmount to prevent state updates on an unmounted component.
- Unused imports (`Link`, `ScoreBadge`) removed from `map.tsx` after popup change.

---

*Entries below this line will be added as the project evolves.*