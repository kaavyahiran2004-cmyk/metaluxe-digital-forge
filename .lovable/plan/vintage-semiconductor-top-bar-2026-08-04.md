# Vintage Semiconductor Top Bar

Restyle the fixed top navigation as a ceramic DIP-chip package / IC datasheet header, using only the existing Industrial Ledger tokens (0px radius, hard offset shadows, no blur or gradients, existing type scale).

## What changes

1. **DIP pin row** — a row of 2px x 6px Gunmetal Grey leads along the bottom edge of the bar, repeating every 28px, sitting just below the existing bottom rule so it reads as chip legs.
2. **Part-number stamp** — `MTL-7042 // REV.C` in JetBrains Mono, all-caps, Brass, small tracking-wide text placed at the right end of the bar (left end on desktop is the logo lockup). Hidden on the narrowest screens only if it would collide with the menu button.
3. **Schematic overlay** — a 1px right-angled line-work layer (resistor zigzags, capacitor plates, transistor symbols) in Gunmetal Grey at ~18% opacity behind the nav content, plus 3px Rust Iron rivet dots at line junctions. Pointer-events off, purely decorative.
4. **Nav items untouched** — labels, sizing, and the existing hover treatment stay exactly as they are. Contrast is checked against the overlay; if the 18% line-work reduces label legibility, the overlay drops to 15% rather than changing text colors.
5. **Mobile** — pin row and part-number stamp stay; the schematic overlay is hidden below the `md` breakpoint.

## Note on hover color

The nav links currently hover to Rust Iron, not Brass. The plan keeps that behavior unchanged as requested ("keep nav item hover unchanged"). Say the word if you actually want it switched to Brass.

## Technical notes

- `src/index.css`: add three utilities in the existing `@layer utilities` block — `.dip-pins` (bottom lead row via `repeating-linear-gradient` of hard-edged Gunmetal stops, no soft gradient falloff), `.schematic` (inline SVG data-URI background of right-angle symbol line-work in `--gunmetal` with Rust junction dots, `opacity` ~0.18), and reuse the existing `.stamped` text-shadow for the part number.
- `src/components/Navigation.tsx`: add a decorative `<div>` overlay (`aria-hidden`, `pointer-events-none`, `hidden md:block`) for the schematic, a pin-row `<div>` pinned to the bar's bottom edge, and a mono Brass part-number span in the header row. No changes to nav link markup, scroll logic, or the mobile menu.
- All colors referenced through existing tokens (`--gunmetal`, `--brass`, `--rust`); no hardcoded hex in components.
