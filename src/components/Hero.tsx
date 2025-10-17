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
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--deep-space))]/90 via-[hsl(var(--midnight-blue))]/85 to-[hsl(var(--deep-space))]/90" />
        
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[hsl(var(--primary))] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[hsl(var(--accent))] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: "2s" }} />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 md:px-6 py-32 md:py-40">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight animate-fade-in">
            <span className="block text-gradient-gold mb-2">
              Al Sandouq Al Ahmar
            </span>
            <span className="block text-foreground">
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
              className="group relative overflow-hidden bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] hover:shadow-glow-blue transition-all duration-300 hover:scale-105 text-base md:text-lg px-8 py-6"
            >
              Request Quote
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("products")}
              className="border-2 border-[hsl(var(--primary))] text-foreground hover:bg-[hsl(var(--primary))]/10 transition-all duration-300 hover:scale-105 text-base md:text-lg px-8 py-6"
            >
              View Products
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
                className="glass-card p-4 md:p-6 rounded-xl hover:shadow-glow-blue transition-all duration-300 hover:scale-105"
              >
                <div className="text-2xl md:text-4xl font-bold text-gradient-gold mb-1 md:mb-2">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider">
                  {stat.label}
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
