# Declutter, Polished Cursor Trail, Quote Form Hardening, Performance

## 1. Remove the part-number stamp

Delete the "MTL-7042 // REV.C" brass label from the top bar. The DIP pin row and schematic line-work stay, so the vintage-chip motif survives while the bar reads cleaner. The freed space lets the nav links and Get Quote button breathe on mid-size screens.

## 2. Cursor trail rebuild

The current trail spawns a DOM node per pointer move with a CSS transition — it skips filings on fast movement and stutters under load. Rebuild it as a single canvas layer:

- One full-viewport canvas, one animation loop, no per-particle DOM.
- Interpolates between pointer samples so a fast flick leaves a continuous ribbon of filings instead of gaps — it responds to every movement.
- Longer, smoother life (~1.1s) with eased fade, slight settle-and-drift, and subtle rotation.
- Metallic look: each filing gets a two-tone face (bright top edge, dark lower body) so it catches light like a real shaving, cycling through gunmetal, brass, rust, logo blue and a pale steel highlight.
- Still hard-edged squares, no glow or blur. Fine-pointer only, disabled under reduced-motion, pauses when the tab is hidden.

## 3. Quote form — test and harden

Test the live form end-to-end (submit, confirm the row lands in the database, check the notification path), then fix what the test surfaces. Known gaps to close regardless:

- **No abuse protection**: the submit endpoint is public and unthrottled — anyone can flood the database and the notification inbox. Add per-IP rate limiting (a short window, small burst allowance) plus a hidden honeypot field that bots fill and humans never see.
- **Email delivery**: the function calls a notification template that may not be provisioned. Confirm the email path actually reaches amitjain@alsandouqalahmar.com; if the email infrastructure isn't set up, set it up so enquiries are delivered rather than only stored.
- **Duplicate submits**: guard against double-clicks creating two rows.
- Client and server validation stay in sync; error messages stay generic to avoid leaking internals.

## 4. Efficiency and resilience

- **Error boundary** around the page so one component fault shows a branded fallback instead of a blank white screen.
- **Fonts**: three families with wide weight ranges are the largest blocking asset — trim to the weights actually used and load them non-render-blocking.
- **Images**: lazy-load and size below-the-fold imagery; the logo stays eager.
- **Listeners**: scroll and pointer handlers get passive/throttled treatment so scrolling stays smooth.
- **Live prices**: verify its timer clears on unmount (a leaked interval is a slow-crash source).
- **Head metadata**: replace the placeholder Lovable social image reference.

Visual design, copy, layout and all existing content stay exactly as they are.

## Technical notes

- `Navigation.tsx`: remove the stamp span; keep `.dip-pins` and `.schematic`.
- `CursorTrail.tsx`: rewrite as canvas + rAF loop with a fixed particle pool (no allocation per frame), pointer-sample interpolation, `visibilitychange` pause, DPR-aware sizing, resize handling.
- `supabase/functions/submit-quote/index.ts`: honeypot field check, IP rate limit backed by a small `rate_limits` table (with GRANTs + RLS, service-role only), idempotency on repeat submits.
- `Contact.tsx`: hidden honeypot input, submit disabled while in flight.
- New `src/components/ErrorBoundary.tsx` wrapping routes in `App.tsx`.
- `index.html`: trimmed font request, corrected og:image.
