# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack
Vite + React + TypeScript + React Router (confirmed by the user). Mock data only; no backend.

## Users
Azerbaijani-speaking viewers who want to find and watch Azerbaijani national cinema (e.g. "Nəsimi", 1973) on desktop and phone, and to learn about the directors and actors behind the films.

## Product Purpose
KinoAz (screens are branded "Milli Pərdə") is a streaming and catalogue app for Azerbaijani cinema: home, search and film catalogue, film detail, directors and actors pages, and a video player. Success is a viewer finding a film and starting it quickly.

## Positioning
A streaming app focused only on Azerbaijani national cinema, fully in the Azerbaijani language, with its people (directors, actors) treated as first-class content.

## Operating Context
Used on desktop and mobile. The interface language is Azerbaijani. The design source is the Stitch project `15778261104332329369` (10 screens: 5 desktop, 4 mobile, 1 logo asset).

## Capabilities and Constraints
- Screens to build (from Stitch): home, search and film catalogue, film details, directors and actors (tabbed), mobile variants, video player, logo.
- Every film card opens that film's page on this site (user's choice after the critique); the page has an embedded YouTube player (iframe, loads on click) and a "YouTube-da aç" button that opens the video on YouTube in a new tab. The hero's "İzlə" opens the film page with the player already running. Film data (director, cast, runtime, synopsis, YouTube link) was researched on the web and verified via YouTube oEmbed; it lives in `research/` and is compiled by `scripts/build-films.mjs` into `src/data/films.json`.
- Out of scope by the user's own choice: ratings and watchlists. No view counts or ratings are shown because none exist.
- Posters come from the Stitch design (AI-generated placeholders, not official posters). No verified portraits of directors or actors exist, so people show monogram avatars.
- Undecided: product name (KinoAz vs Milli Pərdə), since the Stitch project uses both. The app currently shows "Milli Pərdə".

## Brand Commitments
The Stitch design is binding: dark UI, red primary `#e50914`, Bebas Neue headlines and Plus Jakarta Sans body, 8px rounding. The Milli Pərdə emblem (Stitch screen `6c7fc01eb0694f798fa71495e4afff46`) is the logo.

## Evidence on Hand
Stitch exports (HTML and screenshots) for each screen. No real film posters, video files or licensed metadata on hand; these must not be fabricated as factual.

## Product Principles
1. Finding and starting a film comes first; everything else supports it.
2. Azerbaijani language and cultural context are the product, not a localisation layer.
3. People behind the films (directors, actors) are browsable content, not metadata.
4. Mobile and desktop are equal first-class targets.

## Accessibility & Inclusion
No product-specific standard was set. Baseline: keyboard-operable player and navigation, visible focus, sufficient contrast on the dark theme, `lang="az"`.
