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
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Industrial metal trading background"
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--deep-space))]/95 via-[hsl(var(--midnight-blue))]/90 to-[hsl(var(--deep-space))]/95" />
        
        {/* Gradient mesh overlay */}
        <div className="absolute inset-0 opacity-60" style={{ background: "var(--gradient-mesh)" }} />
        
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[hsl(var(--primary))] rounded-full mix-blend-screen filter blur-[120px] opacity-30 animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[hsl(var(--accent))] rounded-full mix-blend-screen filter blur-[120px] opacity-30 animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-full mix-blend-screen filter blur-[150px] opacity-20 animate-float" style={{ animationDelay: "4s" }} />
        
        {/* Noise texture */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E')" }} />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 md:px-6 py-32 md:py-40">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.1] tracking-tight animate-fade-in">
            <span className="block text-gradient-gold mb-2 drop-shadow-[0_0_30px_rgba(245,158,11,0.3)]" style={{ 
              backgroundSize: "200% 200%",
              animation: "gradient-shift 3s ease infinite"
            }}>
              Al Sandouq Al Ahmar
            </span>
            <span className="block text-foreground drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)]">
              Trading LLC
            </span>
          </h1>

          {/* Subheadline */}
          <p
            className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Pioneering Excellence in Metal Trading
            <span className="block mt-2 text-base md:text-lg">
              Serving UAE & Beyond Since 2013
            </span>
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            <Button
              size="lg"
              onClick={() => scrollToSection("contact")}
              className="group relative overflow-hidden bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] hover:shadow-glow-blue transition-all duration-400 hover:scale-[1.08] active:scale-[0.98] text-base md:text-lg px-8 py-6 shadow-intense"
              style={{
                backgroundSize: "200% 200%",
                animation: "gradient-shift 3s ease infinite"
              }}
            >
              <span className="relative z-10">Request Quote</span>
              <ArrowRight className="relative z-10 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--accent))] to-[hsl(var(--primary))] opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("products")}
              className="group border-2 border-[hsl(var(--primary))]/50 bg-[hsl(var(--primary))]/5 text-foreground hover:border-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/15 hover:shadow-glow-blue transition-all duration-400 hover:scale-[1.08] active:scale-[0.98] text-base md:text-lg px-8 py-6 backdrop-blur-sm"
            >
              View Products
              <div className="ml-2 inline-block transition-transform duration-300 group-hover:rotate-90">→</div>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div
            className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto pt-12 animate-fade-in"
            style={{ animationDelay: "0.6s" }}
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group glass-card p-4 md:p-6 rounded-xl hover:shadow-glow-blue transition-all duration-500 cursor-default relative overflow-hidden"
                style={{
                  animation: `scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${0.6 + index * 0.1}s both`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--primary))]/10 to-[hsl(var(--accent))]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="text-2xl md:text-4xl font-bold text-gradient-gold mb-1 md:mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={() => scrollToSection("products")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-muted-foreground hover:text-foreground transition-colors duration-300"
        aria-label="Scroll to products"
      >
        <ChevronDown size={32} />
      </button>
    </section>
  );
};

export default Hero;
