import { lazy, Suspense, useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import LivePrices from "@/components/LivePrices";
import About from "@/components/About";
import Certificates from "@/components/Certificates";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// Purely decorative, desktop-only: kept out of the initial bundle and only
// loaded once the page is idle so it never competes with the LCP paint.
const CursorTrail = lazy(() => import("@/components/CursorTrail"));

const Index = () => {
  const [showTrail, setShowTrail] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const idle =
      (window as unknown as { requestIdleCallback?: (cb: () => void) => number })
        .requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1200));
    const id = idle(() => setShowTrail(true));
    return () => {
      if (typeof id === "number") clearTimeout(id);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {showTrail && (
        <Suspense fallback={null}>
          <CursorTrail />
        </Suspense>
      )}
      <Navigation />
      <main>
        <Hero />
        <Products />
        <LivePrices />
        <About />
        <Certificates />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
