# Reduce Lag When Gliding the Cursor Over Images

## 1. Profile first

Run a scripted hover pass over the product cards in the live preview with Chrome's
performance tracing enabled, and record:

- frames per second and long-frame count while the pointer glides across the three
  product images,
- how much time goes to paint vs. compositing vs. scripting,
- the same run with the cursor trail disabled, so its share of the cost is isolated.

Numbers before and after go in the final report, so the improvement is measured, not
claimed.

## 2. Suspected cost centres (to be confirmed by the trace)

- **Grayscale-to-colour transition on hover.** Each product image animates a CSS
  `filter` over 500ms. Filters on a 800x600 image force a full repaint of that layer
  every frame unless the image is on its own compositing layer.
- **`mix-blend-multiply` rust overlay sitting on top of each image.** Blend modes
  break layer isolation, so the blended stack repaints together with the filter
  animation.
- **Card lift on hover.** `press-hover` translates the whole card and changes its
  shadow, repainting the card's text and borders alongside the image.
- **Cursor trail canvas.** It clears and redraws the entire viewport every frame
  while the pointer moves, which stacks on top of the hover repaints exactly when
  the user is gliding over an image.

## 3. Fixes

- Give the animating image its own compositing layer only for the duration of the
  hover, so the filter animates on the GPU instead of repainting on the CPU.
- Replace the blended rust overlay with an equivalent non-blending tint so the image
  layer stays isolated (the visual result stays the same colour).
- Keep the card lift, but drive it with transform/shadow only and avoid re-triggering
  layout.
- Cursor trail: clear only the dirty region covering live particles instead of the
  whole viewport, skip the frame entirely when no particle is alive, and stop the
  loop when the pointer leaves the window.
- Shorten the filter transition slightly if the trace shows it is still the dominant
  paint cost.

Nothing about the look, copy, layout, colours, or the quote form changes — this is
purely a rendering-cost pass.

## Technical notes

- Profiling: Playwright + CDP `Performance`/tracing, scripted `mouse.move` sweep at
  a fixed rate across `#products` cards; compare traces with and without
  `CursorTrail` mounted.
- `src/components/Products.tsx`: image gets `will-change: filter` applied on
  group-hover only (via a hover-scoped utility, not a permanent one); rust overlay
  moves from `mix-blend-multiply` to a flat low-alpha rust layer.
- `src/index.css`: hover-scoped `will-change` utility; verify `.press-hover` uses
  transform + box-shadow only.
- `src/components/CursorTrail.tsx`: track a per-frame bounding box of live particles
  and `clearRect` that box; early-out when the pool is empty; `pointerleave` pause.
