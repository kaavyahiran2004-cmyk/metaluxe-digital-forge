import { useEffect, useRef } from "react";

/**
 * Metal-filings cursor trail.
 *
 * Performance note: a full-viewport canvas has to be re-composited over the whole
 * page on every frame it changes, which is what made hovering over imagery stutter.
 * Instead this uses a small canvas (BOX x BOX) that follows the pointer via a
 * transform, so only a fraction of the screen is ever re-composited.
 *
 * Fine-pointer only, disabled under prefers-reduced-motion, paused when hidden or
 * when the pointer leaves the window, and fully idle when no particle is alive.
 */

const POOL = 140;
const LIFE = 900; // ms
const SPACING = 7; // px between filings along the pointer path
const BOX = 760; // CSS px, canvas edge length
const RECENTER = 110; // px the pointer may stray from the canvas centre

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
    const setup = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(BOX * dpr);
      canvas.height = Math.floor(BOX * dpr);
      canvas.style.width = `${BOX}px`;
      canvas.style.height = `${BOX}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setup();

    // Top-left corner of the canvas in viewport coordinates.
    let originX = -BOX;
    let originY = -BOX;
    const place = (cx: number, cy: number) => {
      originX = Math.round(cx - BOX / 2);
      originY = Math.round(cy - BOX / 2);
      canvas.style.transform = `translate3d(${originX}px, ${originY}px, 0)`;
    };

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
      wake();
    };

    const drainPointer = (now: number) => {
      if (!hasPending) return;
      hasPending = false;

      if (lastX === null || lastY === null) {
        place(pendingX, pendingY);
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

      // Keep the small canvas around the pointer.
      if (
        Math.abs(pendingX - (originX + BOX / 2)) > RECENTER ||
        Math.abs(pendingY - (originY + BOX / 2)) > RECENTER
      ) {
        place(pendingX, pendingY);
      }
    };

    let raf = 0;
    let running = false;
    let idleFrames = 0;

    const frame = (now: number) => {
      if (!running) return;

      drainPointer(now);
      ctx.clearRect(0, 0, BOX, BOX);

      let alive = 0;
      for (let i = 0; i < POOL; i++) {
        const p = pool[i];
        const age = now - p.born;
        if (age < 0 || age > LIFE) continue;
        alive++;

        const t = age / LIFE;
        const ease = 1 - Math.pow(1 - t, 3); // ease-out settle
        const alpha = t < 0.12 ? t / 0.12 : Math.pow(1 - (t - 0.12) / 0.88, 1.6);
        const x = p.x + p.vx * age * ease - originX;
        const y = p.y + p.vy * age * ease - originY;
        if (x < -10 || y < -10 || x > BOX + 10 || y > BOX + 10) continue;
        const s = p.size * (1 - t * 0.55);

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(p.rot + p.spin * age);
        ctx.globalAlpha = Math.max(0, alpha) * 0.95;

        // Hard offset shadow (pressed-plate depth), no blur.
        ctx.fillStyle = "rgba(20,18,16,0.35)";
        ctx.fillRect(-s / 2 + 1, -s / 2 + 1, s, s);

        // Two-tone metallic face: lit top half, shaded lower body.
        ctx.fillStyle = p.shade;
        ctx.fillRect(-s / 2, -s / 2, s, s);
        ctx.fillStyle = p.face;
        ctx.fillRect(-s / 2, -s / 2, s, s * 0.55);
        ctx.fillStyle = p.edge;
        ctx.fillRect(-s / 2, -s / 2, s, 1);

        ctx.restore();
      }

      if (alive > 0) {
        idleFrames = 0;
      } else if (++idleFrames > 30) {
        running = false;
        raf = 0;
        return;
      }

      raf = requestAnimationFrame(frame);
    };

    const wake = () => {
      if (!running && !document.hidden) {
        running = true;
        idleFrames = 0;
        raf = requestAnimationFrame(frame);
      }
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
      raf = 0;
      ctx.clearRect(0, 0, BOX, BOX);
      lastX = null;
      lastY = null;
    };

    const onVisibility = () => {
      if (document.hidden) stop();
    };

    const onLeave = (e: PointerEvent) => {
      if (!e.relatedTarget) stop();
    };

    const onResize = () => {
      setup();
      lastX = null;
      lastY = null;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerout", onLeave, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerout", onLeave);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100]"
      style={{ transform: "translate3d(-9999px, -9999px, 0)" }}
    />
  );
};

export default CursorTrail;
