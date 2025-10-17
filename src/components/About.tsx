import { Award, Globe, Users, TrendingUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const About = () => {
  const stats = [
    { icon: Award, value: 10, suffix: "+", label: "Years in Business", color: "text-[hsl(var(--accent))]" },
    { icon: Globe, value: 5000, suffix: "+", label: "Containers Traded", color: "text-[hsl(var(--primary))]" },
    { icon: Users, value: 200, suffix: "+", label: "Global Clients", color: "text-[hsl(var(--accent))]" },
    { icon: TrendingUp, value: 99, suffix: "%", label: "Client Satisfaction", color: "text-[hsl(var(--primary))]" },
  ];

  return (
    <section id="about" className="relative py-20 md:py-32 bg-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass">
              <span className="w-2 h-2 rounded-full bg-[hsl(var(--accent))] animate-pulse" />
              <span className="text-sm uppercase tracking-wider text-muted-foreground font-semibold">
                About Us
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              <span className="text-gradient-gold">Pioneering Excellence</span>
              <br />
              <span className="text-foreground">in Metal Trading</span>
            </h2>

            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                Since 2013, <span className="text-foreground font-semibold">Al Sandouq Al Ahmar Trading LLC</span> has been at the forefront of the metal trading industry in the UAE, establishing itself as a trusted partner for businesses worldwide.
              </p>
              
              <p>
                We specialize in the trade of <span className="text-[hsl(var(--accent))]">ferrous and non-ferrous metals</span>, along with comprehensive <span className="text-[hsl(var(--accent))]">e-waste recycling solutions</span>. Our commitment to quality, sustainability, and customer satisfaction has enabled us to build lasting relationships across the globe.
              </p>

              <p>
                With <span className="text-[hsl(var(--primary))] font-semibold">ISO certification</span> and a proven track record, we ensure every transaction meets the highest standards of quality and compliance.
              </p>
            </div>

            {/* Trust Badge */}
            <div className="inline-flex items-center gap-3 p-4 rounded-xl glass-card">
              <Award className="w-8 h-8 text-[hsl(var(--accent))]" />
              <div>
                <div className="font-semibold text-foreground">ISO Certified</div>
                <div className="text-sm text-muted-foreground">Trusted Since 2013</div>
              </div>
            </div>
          </div>

          {/* Right Column - Statistics */}
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

interface StatCardProps {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
  color: string;
  index: number;
}

const StatCard = ({ icon: Icon, value, suffix, label, color, index }: StatCardProps) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <div
      ref={ref}
      className="group relative overflow-hidden glass-card rounded-2xl p-6 hover:shadow-glow-blue transition-all duration-500 hover:scale-105"
      style={{
        animation: isVisible
          ? `scaleIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s both`
          : "none",
      }}
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--primary))]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative space-y-3">
        <Icon className={`w-8 h-8 ${color} transition-transform duration-300 group-hover:scale-110`} />
        
        <div className="text-3xl md:text-4xl font-bold text-gradient-gold">
          {count.toLocaleString()}{suffix}
        </div>
        
        <div className="text-sm text-muted-foreground uppercase tracking-wider">
          {label}
        </div>
      </div>

      {/* Shine Effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
};

export default About;
