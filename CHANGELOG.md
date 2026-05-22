# Changelog

All notable changes to Rate My Guinness are recorded here.

Format: `[version] — DD/MM/YYYY` with sections for **Added**, **Changed**, **Fixed**, and **Removed**.

---

## [0.2.1] — 22/05/2026

SwipeCard polish and mobile layout fixes.

### Added

- **Swipe direction labels** — "← Bad pour · Swipe to rate · Good pour →" row above the card, coloured in red/gold to match the swipe overlays. Makes intent clear before the user touches anything.
- **Rating explainer** — one-line note below the action buttons: "Each swipe counts as one rating. The displayed score is the live average of all votes cast."

### Changed

- **Stack hint removed** — the ghost card behind the main swipe card used `absolute inset-0` on the outer wrapper, which extended below the card and rendered a non-interactive layer over the Criminal/Quality buttons. Removed entirely.

### Fixed

- **Mobile horizontal overflow** — `overflow-x: hidden` added to both `html` and `body` in global CSS. The `html` + `body` combination is required; `body` alone has a known iOS Safari momentum-scroll bypass. Also added `overflow-hidden` to the swipe section on the home page to clip the 600px card exit animation at the section boundary rather than letting it escape into the viewport.

---

## [0.2.0] — 22/05/2026

Polish pass, data expansion, and UX improvements based on review.

### Added

- **51-pub global dataset** — `pints.ts` rewritten with one real pub per local asset image, covering Ireland (Dublin + regional), Northern Ireland, England, Scotland, USA, Canada, Australia, New Zealand, Spain, Germany, France, Japan, and Singapore. All photos now served from local assets rather than Unsplash CDN.
- **Upload file guidance** — format and size hint ("JPEG, PNG, WebP or HEIC · Max 20 MB") displayed below the upload area. Client-side 20 MB file size validation with a distinct "File too large" error message.
- **Leaderboard filters wired up** — time and geography filter chips now actually filter the pints, pubs, and submitters lists (were previously cosmetic). Empty state shown when no pints match.
- **Upload geolocation** — "Auto" button uses browser geolocation + Nominatim reverse geocoding to pre-fill the location field. Loader spinner during lookup, error message on denial or timeout.

### Changed

- **SwipeCard redesign** — star ratings removed (redundant with on-card score). Direction indicator pills above card removed. Skull/beer icon buttons replaced with full-width "Criminal" (ThumbsDown) / "Quality" (ThumbsUp) button pair with animated hover states.
- **SwipeCard end state** — once all pints are rated, shows a completion screen with options to rate again, view the leaderboard, or submit a pint. Previously cycled back silently.
- **PintCard** — hover animations removed (implied tappability with no destination route). "New" gold badge shown for unrated entries instead of a score badge.
- **Map popup** — deep-link CTA now navigates to `/leaderboard` (was a broken `/#rate` anchor).
- **Navbar** — mobile hamburger menu links now highlight correctly on the active page (was missing the active gold state that desktop already had).

### Fixed

- `useEffect` keyboard listener dependency array corrected — was re-registering on every render due to missing `[index, current]` dependency array.
- `setTimeout` now cleaned up on `SwipeCard` unmount via `timerRef` to prevent state updates after unmount.
- Unused imports (`Link`, `ScoreBadge`) removed from `map.tsx` after popup change.

---

## [0.1.0] — 22/05/2026

Initial build. All five pages scaffolded and working with seed data.

### Added

**Core pages**
- Home page — hero section, Tinder-style swipe rating (swipe right = quality pour, swipe left = criminal), latest pints mosaic
- Map page — interactive Leaflet map with OpenStreetMap/CARTO dark tiles, colour-coded pins by score (gold 4+, cream 2–4, red under 2), sidebar filters by score range, date, and country
- Upload page — drag-and-drop photo upload, pub name, location, optional handle and notes, guest submission (no account required)
- Leaderboard page — Top Pints / Top Pubs / Top Submitters tabs, date and country filters, Wall of Shame toggle
- History page — Guinness heritage (Arthur Guinness, 1759, St James's Gate), two-part pour guide, scoring rubric

**Shared components**
- `Navbar` — sticky top nav with mobile hamburger menu, active page highlighted in gold
- `PintCard` — photo thumbnail, pub name, location, score badge, submitter handle
- `SwipeCard` — full-screen swipe card with animated overlays ("Quality Pour" / "Criminal")
- `ScoreBadge` — circular badge, colour-coded by score band

**Data layer**
- `pints.ts` — `Pint` type definition and initial seed dataset covering Dublin, London, Belfast, New York, Sydney

**Tech stack**
- React 19 + Vite 7 + TanStack Router v1 + TanStack Query v5
- Tailwind CSS v4 with `@theme` custom colour palette (stout/cream/gold/blood)
- Radix UI primitives via shadcn/ui
- Leaflet + React Leaflet for maps
- Bun as package manager

**Infrastructure**
- GitHub repository: [kevindunne1/rate-my-guinness](https://github.com/kevindunne1/rate-my-guinness)
- Vercel deployment with SPA rewrite rules (`vercel.json`)
- Auto-deploy on push to `main`
- tsconfig path alias override (`@/components/*` → `src/componets/*`) to work around a locked folder name

---

*Entries below this line will be added as the project evolves.*