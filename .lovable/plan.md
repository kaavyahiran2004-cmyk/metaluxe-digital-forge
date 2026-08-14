# Mobile Layout Fix, Performance Pass, Favicon

## 1. Mobile horizontal overflow (the white bar on the right)

Measured at a 390px-wide viewport: the page scrolls to 425px, so every centered
container sits ~17px off-centre and a blank strip appears on the right.

Confirmed sources:

- **Contact section** — the info grid measures 409px inside a 358px column. The
  long unbroken strings (`amitjain@alsandouqalahmar.com`) plus icon + padding
  force a minimum width that grid tracks cannot shrink below.
- **Live prices section** — a smaller 377px-in-358px overflow from the price
  row layout.

Fixes:

- Allow the grid/flex tracks to actually shrink (`min-w-0` on the items, not
  only the inner text wrapper) and let long email/URL strings break.
- Rework the price row so its columns wrap on narrow screens instead of forcing
  a fixed minimum.
- Add a global guard so any future stray element cannot shift the page: prevent
  horizontal scrolling at the page level.
- Re-measure at 360/390/430px after the fix and confirm scroll width equals the
  viewport width and every section is centred.

## 2. Performance, fluidity, scroll smoothness

- Cursor trail canvas: skip entirely on coarse-pointer/mobile so phones never
  pay for it; cap device pixel ratio at 2 and pause the loop when off-screen.
- Scroll listeners: passive, and driven by a frame-throttled handler instead of
  running work on every scroll event.
- Promote only the elements that need it to their own compositing layer, and
  remove any lingering `will-change` that costs memory without benefit.
- Section entrances: reuse a single shared IntersectionObserver rather than one
  per element.
- Images: correct `width`/`height` on every image so nothing reflows during
  scroll, `lazy` + `async` below the fold, hero stays eager.
- Fonts: `font-display: swap` on the Google Fonts request so text paints
  immediately.
- Reduced-motion continues to disable the trail and animations.

## 3. Favicon

Use the emblem from the uploaded logo (the copper ascending bars with the blue
globe) — mark only, no wordmark, so it stays legible at 16px. Crop it out of the
uploaded file, place it on a transparent square canvas, and save a square
`public/favicon.png`, referenced from `index.html` (replacing the default icon
link). Also wire it as the apple-touch icon.

## Technical notes

- `src/components/Contact.tsx`: `min-w-0` on grid children, `break-all` /
  `break-words` on contact values.
- `src/components/LivePrices.tsx`: wrap the row on narrow widths.
- `src/index.css`: `overflow-x: hidden` on `html, body` plus `max-width: 100%`
  safety.
- `src/components/CursorTrail.tsx`: `matchMedia("(pointer: fine)")` gate,
  DPR clamp, rAF pause on hidden tab.
- `src/components/Navigation.tsx`: rAF-throttled passive scroll handler.
- `index.html`: `&display=swap` retained, new `<link rel="icon" href="/favicon.png" type="image/png">`,
  delete `public/favicon.ico` if present.

No copy, colour, or structural design changes.
