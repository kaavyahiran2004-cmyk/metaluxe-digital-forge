# Metallic Cursor Trail + Logo-Matched Wordmark

## 1. Metallic cursor trail

A cursor trail built from the same industrial vocabulary as the rest of the site — no glow, no blur, no rounded shapes.

- Small hard-edged square "filings" (4-6px) drop behind the pointer and settle, shrinking and fading over ~600ms, as if metal shavings were shaken loose.
- Colors cycle through the metal palette: Gunmetal Grey, Brass, Rust Iron, and the logo blue — so the trail reads as mixed scrap metal rather than one flat color.
- Each filing gets a 1px charcoal edge and a 1px hard offset shadow, matching the site's pressed-plate depth.
- Desktop / fine-pointer only: disabled on touch devices and fully disabled when the visitor prefers reduced motion. Never intercepts clicks.

## 2. Wordmark colors matched to the logo

Colors sampled directly from the logo image: blue `#0B5C94`, copper-brown `#B66337`.

- Hero heading: "Al Sandouq Al Ahmar" in logo blue, "Trading LLC" in logo copper.
- Navigation bar wordmark: same two-tone treatment.
- Footer wordmark: same two-tone treatment.
- Both colors are added as design tokens so they stay consistent and can be tuned in one place.

## Technical notes

- `src/index.css`: add `--logo-blue: 205 86% 31%` and `--logo-copper: 19 54% 47%` tokens; `tailwind.config.ts`: expose as `logo-blue` / `logo-copper` colors.
- New `src/components/CursorTrail.tsx`: pointer-move listener that appends absolutely-positioned particle divs to a fixed, `pointer-events-none`, high-z-index layer; throttled via `requestAnimationFrame`, capped particle count, each removed on animation end. Guards on `matchMedia("(pointer: fine)")` and `(prefers-reduced-motion: reduce)`. Keyframes added to `tailwind.config.ts`.
- Mounted once in `src/pages/Index.tsx`.
- `Hero.tsx`, `Navigation.tsx`, `Footer.tsx`: split the wordmark into two spans using the new tokens (no hardcoded hex in components).
