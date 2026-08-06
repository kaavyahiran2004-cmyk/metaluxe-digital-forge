import { useEffect, useRef } from "react";

/**
 * Metal-filings cursor trail.
 * Single canvas layer + one rAF loop, fixed particle pool, no per-particle DOM.
 * Pointer samples are interpolated so fast movement leaves a continuous ribbon.
 * Fine-pointer only, disabled under prefers-reduced-motion, paused when hidden.
 */

const POOL = 220;
const LIFE = 1100; // ms
const SPACING = 7; // px between filings along the pointer path

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rot: number;
  spin: number;
  born: number;
  face: string;
  edge: string;
  shade: string;
};

const readVar = (name: string, fallback: string) => {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
};

const CursorTrail = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Metal palette sampled from the design tokens.
    const hsl = (v: string, l = 0, a = 1) => {
      const [h, s, li] = v.split(/\s+/);
      const lightness = Math.max(0, Math.min(100, parseFloat(li) + l));
      return `hsla(${h}, ${s}, ${lightness}%, ${a})`;
    };

    const tokens = [
      readVar("--gunmetal", "45 18% 17%"),
      readVar("--brass", "29 56% 47%"),
      readVar("--rust", "17 57% 38%"),
      readVar("--logo-blue", "205 86% 31%"),
      readVar("--charcoal", "30 8% 10%"),
      "0 0% 62%", // pale steel
    ];

    const metals = tokens.map((t) => ({
      face: hsl(t, 6),
      shade: hsl(t, -12),
      edge: hsl(t, 26),
    }));

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const pool: Particle[] = Array.from({ length: POOL }, () => ({
      x: 0, y: 0, vx: 0, vy: 0, size: 0, rot: 0, spin: 0,
      born: -Infinity, face: "", edge: "", shade: "",
    }));
    let cursor = 0;
    let metalIndex = 0;

    const emit = (x: number, y: number, now: number) => {
      const p = pool[cursor];
      cursor = (cursor + 1) % POOL;
      const m = metals[metalIndex++ % metals.length];
      p.x = x + (Math.random() - 0.5) * 6;
      p.y = y + (Math.random() - 0.5) * 6;
      p.vx = (Math.random() - 0.5) * 0.5;
      p.vy = 0.06 + Math.random() * 0.14;
      p.size = 3.5 + Math.random() * 3.5;
      p.rot = Math.random() * Math.PI;
      p.spin = (Math.random() - 0.5) * 0.004;
      p.born = now;
      p.face = m.face;
      p.shade = m.shade;
      p.edge = m.edge;
    };

    let lastX: number | null = null;
    let lastY: number | null = null;
    let pendingX = 0;
    let pendingY = 0;
    let hasPending = false;

    const onMove = (e: PointerEvent) => {
      pendingX = e.clientX;
      pendingY = e.clientY;
      hasPending = true;
    };

    const drainPointer = (now: number) => {
      if (!hasPending) return;
      hasPending = false;
      if (lastX === null || lastY === null) {
        lastX = pendingX;
        lastY = pendingY;
        emit(pendingX, pendingY, now);
        return;
      }
      const dx = pendingX - lastX;
      const dy = pendingY - lastY;
      const dist = Math.hypot(dx, dy);
      if (dist < 1) return;
      // Interpolate along the path so fast flicks stay continuous.
      const steps = Math.min(Math.ceil(dist / SPACING), 24);
      for (let i = 1; i <= steps; i++) {
        const t = i / steps;
        emit(lastX + dx * t, lastY + dy * t, now - (1 - t) * 12);
      }
      lastX = pendingX;
      lastY = pendingY;
    };

    let raf = 0;
    let running = true;

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!running) return;

      drainPointer(now);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (let i = 0; i < POOL; i++) {
        const p = pool[i];
        const age = now - p.born;
        if (age < 0 || age > LIFE) continue;

        const t = age / LIFE;
        const ease = 1 - Math.pow(1 - t, 3); // ease-out settle
        const alpha = t < 0.12 ? t / 0.12 : Math.pow(1 - (t - 0.12) / 0.88, 1.6);
        const x = p.x + p.vx * age * ease;
        const y = p.y + p.vy * age * ease;
        const s = p.size * (1 - t * 0.55);

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(p.rot + p.spin * age);
        ctx.globalAlpha = Math.max(0, alpha) * 0.95;

        // Hard offset shadow (pressed-plate depth), no blur.
        ctx.fillStyle = "rgba(20,18,16,0.35)";
        ctx.fillRect(-s / 2 + 1, -s / 2 + 1, s, s);

        // Two-tone metallic face: lit top half, shaded lower half.
        ctx.fillStyle = p.shade;
        ctx.fillRect(-s / 2, -s / 2, s, s);
        ctx.fillStyle = p.face;
        ctx.fillRect(-s / 2, -s / 2, s, s * 0.55);
        ctx.fillStyle = p.edge;
        ctx.fillRect(-s / 2, -s / 2, s, 1);

        ctx.restore();
      }
    };

    const onVisibility = () => {
      running = !document.hidden;
      if (!running) {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        lastX = null;
        lastY = null;
      }
    };

    raf = requestAnimationFrame(frame);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100]"
    />
  );
};

export default CursorTrail;
