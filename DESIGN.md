---
name: Milli Pərdə
description: Azərbaycan kinosunun kataloqu — qara kinozal, tək kino qırmızısı, Oswald başlıqlar.
colors:
  cinema-red: "#e50914"
  cinema-red-hover: "#f40612"
  on-red: "#fff7f6"
  rose-accent: "#ffb4aa"
  red-deep: "#c0000c"
  background: "#131316"
  surface-lowest: "#0e0e11"
  surface-low: "#1b1b1e"
  surface: "#1f1f22"
  surface-high: "#2a2a2d"
  surface-highest: "#353438"
  surface-bright: "#39393c"
  on-surface: "#e4e1e6"
  secondary-text: "#c0c7d3"
  on-surface-variant: "#e9bcb6"
  outline: "#af8782"
  outline-variant: "#5e3f3b"
  amber-note: "#f1be6d"
  error: "#ffb4ab"
typography:
  display-hero:
    fontFamily: "Oswald Variable, Oswald, Arial Narrow, sans-serif"
    fontSize: "72px"
    fontWeight: 600
    lineHeight: "72px"
    letterSpacing: "0.04em"
  display-hero-xl:
    fontFamily: "Oswald Variable, Oswald, Arial Narrow, sans-serif"
    fontSize: "96px"
    fontWeight: 600
    lineHeight: "94px"
    letterSpacing: "0.04em"
  headline-xl:
    fontFamily: "Oswald Variable, Oswald, Arial Narrow, sans-serif"
    fontSize: "38px"
    fontWeight: 600
    lineHeight: "42px"
    letterSpacing: "0.03em"
  headline-lg:
    fontFamily: "Oswald Variable, Oswald, Arial Narrow, sans-serif"
    fontSize: "28px"
    fontWeight: 600
    lineHeight: "32px"
    letterSpacing: "0.02em"
  headline-md:
    fontFamily: "Plus Jakarta Sans Variable, system-ui, sans-serif"
    fontSize: "20px"
    fontWeight: 700
    lineHeight: "28px"
  body-lg:
    fontFamily: "Plus Jakarta Sans Variable, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: "26px"
  body-md:
    fontFamily: "Plus Jakarta Sans Variable, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: "22px"
  body-sm:
    fontFamily: "Plus Jakarta Sans Variable, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: "18px"
  label-lg:
    fontFamily: "Plus Jakarta Sans Variable, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: "20px"
    letterSpacing: "0.01em"
  label-md:
    fontFamily: "Plus Jakarta Sans Variable, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: "16px"
    letterSpacing: "0.02em"
rounded:
  sm: "4px"
  lg: "8px"
  xl: "12px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  2xl: "64px"
  margin: "16px"
  margin-tablet: "32px"
  margin-desktop: "56px"
components:
  button-primary:
    backgroundColor: "{colors.cinema-red}"
    textColor: "{colors.on-red}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.lg}"
    padding: "14px 40px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.cinema-red-hover}"
  button-secondary:
    backgroundColor: "{colors.surface-high}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.lg}"
    padding: "14px 24px"
    height: "48px"
  chip-genre:
    backgroundColor: "{colors.surface-highest}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-md}"
    rounded: "{rounded.sm}"
    padding: "2px 8px"
  pill-filter:
    backgroundColor: "{colors.surface-high}"
    textColor: "{colors.secondary-text}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: "0 24px"
    height: "40px"
  pill-filter-active:
    backgroundColor: "{colors.cinema-red}"
    textColor: "{colors.on-red}"
  film-card:
    backgroundColor: "{colors.surface-high}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.xl}"
    padding: "8px"
  search-input:
    backgroundColor: "{colors.surface-high}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.full}"
    padding: "10px 16px 10px 40px"
  era-tile:
    backgroundColor: "{colors.surface-low}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.xl}"
    padding: "24px"
  era-tile-hover:
    backgroundColor: "{colors.cinema-red}"
    textColor: "{colors.on-red}"
  monogram:
    backgroundColor: "{colors.surface-highest}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.full}"
    size: "48px"
---

# Design System: Milli Pərdə

## Overview

**Creative North Star: "The Dark Screening Room"**

Milli Pərdə is a catalogue of Azerbaijani national cinema built as a near-black cinema room: a charcoal field (`#131316`) with a deeper well (`#0e0e11`) for chrome and a single saturated cinema red (`#e50914`) that marks the one thing to do next, which is to play a film. The film frames themselves, real YouTube stills in 16:9, supply all the color and imagery; the interface stays out of their way. The system is the user's Stitch design carried into code, with Oswald for titles and Plus Jakarta Sans for reading.

Density is medium and carousel-driven: horizontal rows of frames, generous 40px vertical rhythm between rows, and rounded soft surfaces (12px cards, full pills) rather than hard edges. Depth comes from tonal layering of near-black surfaces; shadows are soft and black. All interface copy is Azerbaijani; the Ə/ə glyphs are part of the brand, which is why the title face is Oswald (Bebas Neue lacks Ə).

The build carries no ratings, scores, watchlists or view counts, because none exist in the product.

**Key Characteristics:**
- Tonal near-black layering from `#0e0e11` to `#353438`, no light surfaces.
- One red, used for the primary action, active state, hover fill and the "Pərdə" half of the wordmark.
- Condensed uppercase Oswald titles over Plus Jakarta Sans text.
- 16:9 film stills with a red circular play affordance on hover and focus.
- Circular grey monogram initials where no verified person photo exists.

## Colors

A restrained dark palette: ten-odd tonal neutrals and one red. Warm rose and amber appear only as small supporting tints.

### Primary
- **Cinema Red** (#e50914): primary buttons, active nav and filter states, play button disc, era-tile hover fill, text selection, and the "Pərdə" wordmark half. Hover shifts to **Cinema Red Bright** (#f40612).
- **Rose Accent** (#ffb4aa): the focus ring (2px, 3px offset), active mobile-tab icon and label, card-title hover, and era-tile arrow. It is the readable red on dark; use it for small text and strokes, never as a fill.

### Secondary
- **Steel Mist** (#c0c7d3): secondary text, synopsis copy, metadata lines, idle pill labels.

### Tertiary
- **Amber Note** (#f1be6d): used only for the honest-link tags "Treyler", "Fraqment", "YouTube axtarışı" on cards and the film page, signalling that the link is not the full film.

### Neutral
- **Screening Room Black** (#131316): page background.
- **Projection Well** (#0e0e11): header, mobile bar, footer, scrollbar track, html canvas.
- **Low Surface** (#1b1b1e): era tiles, About block, person rows.
- **Surface** (#1f1f22): hover step for person rows.
- **High Surface** (#2a2a2d): film card body, idle pills, search field, round carousel buttons.
- **Highest Surface** (#353438): genre chips, monogram disc, scrollbar thumb.
- **Projector Light** (#e4e1e6): primary text.
- **Blush Variant** (#e9bcb6): idle nav links and search icon (warm secondary).
- **Dusty Outline** (#af8782): input placeholder. **Oxblood Line** (#5e3f3b): outlined secondary-button border, scrollbar thumb hover.

### Named Rules
**The One Red Rule.** Red marks the next action or the current location, nothing else. If two red elements compete in the same viewport, one of them is wrong.

**The Tonal Ladder Rule.** Layers separate by stepping one rung up the surface ladder (low, container, high, highest), not by borders. Cards may carry a 1px white-at-5% ring (`ring-white/5`) as the only edge.

## Typography

**Display Font:** Oswald Variable (with Oswald, Arial Narrow, sans-serif)
**Body Font:** Plus Jakarta Sans Variable (with system-ui, sans-serif)

**Character:** A condensed, tall poster face for titles paired with a friendly geometric sans for reading. Oswald carries the full Azerbaijani alphabet including Ə, Ö, Ü, Ş, Ç, Ğ, I/İ. Body text uses tabular figures (`tnum`) and stylistic set 1.

### Hierarchy
- **Display Hero** (Oswald 600, 44px mobile / 72px; `display-hero-xl` 96px with 94px line-height on the home hero from md up, 0.03-0.04em tracking, uppercase): featured film title and film-page title. Avatar initials use Headline LG (28px, 48px circle) and Headline XL (38px, 80px circle).
- **Headline XL** (Oswald 600, 28px mobile / 38px, 0.02-0.03em, uppercase): section and row titles, era names.
- **Headline LG** (Oswald 600, 28px, uppercase): wordmark, film-page sub-sections, title-card fallback.
- **Headline MD** (Plus Jakarta Sans 700, 20px/28px): defined, rarely used.
- **Body LG** (400, 16px/26px, capped at 56-62ch): synopses and overviews.
- **Body MD / SM** (400, 14px/22px and 12px/18px): default text, footer, hints, cast roles.
- **Label LG** (600, 14px, +0.01em): buttons, nav links, card titles. **Label MD** (600, 12px, +0.02em): metadata, chips, pills.

### Named Rules
**The Oswald-for-Titles Rule.** Oswald is uppercase and used only for titles, row headings and the wordmark. Reading text, buttons, labels and metadata are always Plus Jakarta Sans.

## Layout

A fluid single column with a page margin of 16px (mobile), 32px (tablet token) and 56px (desktop). Rows are full-bleed horizontal scrollers with scroll-snap and hidden scrollbars; fixed card widths are 256px, 288px and 320px at the base, `sm` and `lg` breakpoints. Grids (era tiles, cast, catalogue) use 16-24px gaps and collapse to one column on mobile; era tiles go three-up at `md`.

Vertical rhythm between home rows is 40px (`space-xl`); inside blocks it steps 8, 16, 24. Long copy stays within 56-62ch. The header is fixed (64px, 80px at `md`) and the mobile experience swaps the four-link nav for a fixed bottom bar of four icon-and-label tabs below `lg`. A sticky jump-pill strip sits under the home hero. The hero is a full-bleed still (78vh, 90vh at `lg`) with bottom and left scrims; film pages open on a blurred copy of the still behind a 16:9 player.

## Elevation & Depth

Hybrid: mostly tonal layering, with soft black shadows reserved for lifted or floating things. Nothing is lit by color; shadows are always black.

### Shadow Vocabulary
- **Card lift** (`box-shadow: 0 18px 32px -12px rgba(0,0,0,0.8)` with `translateY(-4px)`): film card hover and focus.
- **Header solid** (`0 8px 24px -12px rgba(0,0,0,0.8)` plus backdrop blur): header after 24px scroll.
- **Mobile bar** (`0 -8px 24px rgba(0,0,0,0.6)`): bottom tab bar.
- **Player** (`0 24px 40px -16px rgba(0,0,0,0.9)` with a `ring-white/10`): film-page player frame.

### Named Rules
**The Black Shadow Rule.** Shadows are black, long-offset and diffuse. No hard offset shadows, no colored glows.

## Shapes

Soft but not bubbly. Cards, tiles and blocks use 12px (`xl`); buttons and focus rings use 8px (`lg`); genre chips and tags use 4px; controls that are filters, search, carousel arrows, play discs and avatars are fully round. The play affordance is a red circle, the single recurring geometric motif. Film frames stay at a fixed 16:9 and are clipped by the card radius.

## Components

### Buttons
- **Shape:** 8px radius, minimum height 48px (44px on the film page).
- **Primary ("İzlə"):** Cinema Red fill, warm-white label, solid play-triangle glyph, 14px 40px padding, large shadow; hover to #f40612 (Tailwind token `primary-hover`); pressed scales to 0.98. On the home hero it is an internal link to `/film/nesimi?oynat=1`, so the film page opens and plays at once.
- **Secondary ("YouTube-da aç"):** High Surface at 70% with an Oxblood Line 1px border, backdrop blur on the hero, hover to Highest Surface, external-link glyph. Opens YouTube in a new tab; it lives on the film page (and beside the hero action), never on cards.
- **Focus:** 2px Rose Accent outline with 3px offset on every interactive element.

### Chips and Pills
- **Genre chip:** 4px radius, Highest Surface fill, 12px label; becomes a red fill on hover when it links to the catalogue.
- **Filter / jump pill:** fully round, High Surface and Steel Mist label; the active filter fills Cinema Red and exposes `aria-pressed`; an empty-count pill is disabled at 40% opacity.

### Cards / Containers
- **Film card:** the whole card is one link to the internal film page `/film/:id`; there is no "i" info button and no outbound link on the card. 12px radius, High Surface, 16:9 still on top (YouTube's mid-film frame `maxres2`, with `mq2` in `srcset` for small sizes), then title (Label LG bold, truncated) and "year • first genre" in Steel Mist. Hover lifts 4px, scales the still 1.05 over 500ms with `cubic-bezier(0.16,1,0.3,1)`, dims it, and reveals a 48px red play disc. An amber tag marks trailers, fragments or search links. If the still fails it falls back to an Oswald title card on a surface gradient.
- **Era tile / About block:** Low Surface, 12px radius, 16-40px padding; the era tile fills red on hover and its arrow nudges 4px.
- **Person row:** Low Surface pill-card with avatar and name, hovering up one surface step.

### Inputs / Fields
- **Search:** fully round High Surface field with a left search glyph and a Dusty Outline placeholder; on focus it lifts a rung and widens (224px to 288px on desktop); focus ring is Rose Accent.

### Navigation
- **Header:** fixed, a gradient from Projection Well to transparent at rest, solid 90% with blur after scroll. Wordmark "Milli Pərdə" in Oswald uppercase, "Pərdə" in red, beside the red curtain emblem (`/logo.svg`). Four links in Label LG; idle in Blush Variant, active is a red 8px pill.
- **Mobile bar:** four tabs with 22px line icons; active in Rose Accent, idle in Steel Mist.

### Player
A 16:9 frame at 12px radius showing the still and a 64-80px red play disc; the YouTube iframe (youtube-nocookie) loads only on click of the still and play button, or when the page is opened with `?oynat=1`. The hero "İzlə" goes to `/film/nesimi?oynat=1`, which starts it directly.

### Avatar / Monogram
A real Wikipedia or Wikimedia Commons photo (round, top-cropped) when one exists; otherwise a neutral flat disc (`surface-container-highest`, never a red gradient) with Oswald initials and a faint white ring (`ring-white/10`); 48px with Headline LG initials, 80px with Headline XL initials.

### Credits page
`/menbeler` lists the sources and licences of the images used (photos from Wikipedia and Wikimedia Commons, YouTube frames); it is linked from the footer in Rose Accent text with an underline on hover and uses the same Low Surface blocks and Oswald headings as the rest of the site.

### Motion
One orchestrated moment: the home hero copy rises 18px over 800ms with `cubic-bezier(0.16,1,0.3,1)` in 80ms steps. Interactive transitions run 200-500ms on that same easing. Under `prefers-reduced-motion` only movement stops: the rise is removed, smooth scroll becomes instant, and transitions are limited to color, background-color, border-color, opacity and box-shadow, so state changes still show. The global styles in `src/index.css` read their colors from Tailwind `theme()` tokens rather than hard-coded hex.

## Do's and Don'ts

### Do:
- **Do** use Cinema Red (#e50914) only for the primary action, active state and hover fill.
- **Do** keep the page on the tonal ladder (#0e0e11 to #353438) and separate layers by one rung.
- **Do** set titles in uppercase Oswald and everything readable in Plus Jakarta Sans; keep Ə/ə visible in titles.
- **Do** show film frames at 16:9 with the 12px card radius and the red play disc on hover and focus.
- **Do** tag trailers, fragments and searches in Amber Note so the link is honest.
- **Do** use real person photos from Wikipedia or Wikimedia Commons when verified, otherwise the monogram.
- **Do** keep the Rose Accent focus ring on every interactive element and honor reduced motion.

### Don't:
- **Don't** add ratings, scores, watchlists or view counts; the product has none.
- **Don't** use light surfaces, gradients on buttons, or a second saturated hue.
- **Don't** use hard offset or colored shadows.
- **Don't** set body or UI labels in Oswald, or titles in lowercase.
- **Don't** invent posters; cards show real video frames or the title-card fallback.

*Not canonized:* the build uses no kickers, eyebrows or glyph icons as decoration; lucide line icons are functional only, and no defect of that kind is recorded as a rule. The Stitch brief names Bebas Neue and 2:3 poster cards with red-gradient monograms; the build diverges (Oswald, 16:9 stills, flat grey monograms) and the build is recorded here.
