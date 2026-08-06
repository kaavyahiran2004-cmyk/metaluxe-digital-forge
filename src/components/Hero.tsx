import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const stats = [
    { value: "10+", label: "Years Experience" },
    { value: "5000+", label: "Containers Traded" },
    { value: "ISO", label: "Certified" },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden grain bg-paper"
    >
      {/* Background plate */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Industrial metal trading yard"
          loading="eager"
          decoding="async"
          fetchpriority="high"
          className="w-full h-full object-cover opacity-20 grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-paper/70" />
        {/* Blueprint grid */}
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--charcoal)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--charcoal)) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 md:px-6 py-32 md:py-40">
        <div className="max-w-5xl mx-auto">
          <div className="border-2 border-border bg-paper/85 press">
            {/* Manifest header */}
            <div className="nameplate flex items-center justify-between">
              <span>Est. 2013 &mdash; United Arab Emirates</span>
              <span className="hidden sm:inline">Ref. ASA / MTL / 01</span>
            </div>

            <div className="p-6 md:p-12 space-y-8">
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-logo-blue">
                Al Sandouq Al Ahmar
                <span className="block text-logo-copper mt-1">Trading LLC</span>
              </h1>


              <div className="double-rule" />

              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                Pioneering Excellence in Metal Trading
                <span className="block mt-2 font-mono text-xs uppercase tracking-[0.18em] text-foreground">
                  Serving UAE &amp; Beyond Since 2013
                </span>
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Button
                  size="lg"
                  onClick={() => scrollToSection("contact")}
                  className="group bg-primary text-primary-foreground border border-border font-mono text-xs uppercase tracking-[0.18em] px-8 py-6 press hover:bg-rust hover:text-accent-foreground hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-150"
                >
                  Request Quote
                  <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform duration-150" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => scrollToSection("products")}
                  className="border border-border bg-transparent text-foreground font-mono text-xs uppercase tracking-[0.18em] px-8 py-6 hover:bg-paper-high press-sm hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all duration-150"
                >
                  View Products
                </Button>
              </div>
            </div>

            {/* Stamped stats strip */}
            <div className="grid grid-cols-3 border-t border-border divide-x divide-[hsl(var(--charcoal))]">
              {stats.map((stat, index) => (
                <div key={index} className="p-4 md:p-6 text-center bg-paper-container">
                  <div className="font-mono text-2xl md:text-3xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="mt-1 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={() => scrollToSection("products")}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-muted-foreground hover:text-rust transition-colors duration-150"
        aria-label="Scroll to products"
      >
        <ChevronDown size={28} />
      </button>
    </section>
  );
};

export default Hero;
