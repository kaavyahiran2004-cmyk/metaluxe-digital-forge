import { useEffect, useRef } from "react";

/**
 * Metal-filings cursor trail: hard-edged square shavings in the site's
 * metal palette that settle and fade behind the pointer.
 * Fine-pointer only, disabled under prefers-reduced-motion.
 */
const COLORS = [
  "var(--gunmetal)",
  "var(--brass)",
  "var(--rust)",
  "var(--logo-blue)",
  "var(--charcoal)",
];

const MAX_PARTICLES = 60;

const CursorTrail = () => {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduced) return;

    const layer = layerRef.current;
    if (!layer) return;

    let last = 0;
    let colorIndex = 0;

    const spawn = (x: number, y: number) => {
      if (layer.childElementCount > MAX_PARTICLES) {
        layer.firstElementChild?.remove();
      }

      const el = document.createElement("span");
      const size = 4 + Math.floor(Math.random() * 3);
      const drift = (Math.random() - 0.5) * 18;
      const fall = 10 + Math.random() * 16;
      const rotate = (Math.random() - 0.5) * 90;
      const color = COLORS[colorIndex++ % COLORS.length];

      el.style.cssText = [
        "position:absolute",
        `left:${x}px`,
        `top:${y}px`,
        `width:${size}px`,
        `height:${size}px`,
        `background:hsl(${color})`,
        "border:1px solid hsl(var(--charcoal) / 0.7)",
        "box-shadow:1px 1px 0 hsl(var(--charcoal) / 0.45)",
        "transform:translate(-50%,-50%)",
        "opacity:0.9",
        "transition:transform 620ms cubic-bezier(0.2,0,0,1), opacity 620ms linear",
      ].join(";");

      layer.appendChild(el);

      requestAnimationFrame(() => {
        el.style.transform = `translate(calc(-50% + ${drift}px), calc(-50% + ${fall}px)) rotate(${rotate}deg) scale(0.3)`;
        el.style.opacity = "0";
      });

      window.setTimeout(() => el.remove(), 700);
    };

    const onMove = (e: PointerEvent) => {
      const now = performance.now();
      if (now - last < 28) return;
      last = now;
      spawn(e.clientX, e.clientY);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div
      ref={layerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100] overflow-hidden"
    />
  );
};

export default CursorTrail;
