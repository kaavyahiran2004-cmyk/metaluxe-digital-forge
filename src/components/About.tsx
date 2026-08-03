import { Award, Globe, Users, TrendingUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const About = () => {
  const stats = [
    { icon: Award, value: 10, suffix: "+", label: "Years in Business" },
    { icon: Globe, value: 5000, suffix: "+", label: "Containers Traded" },
    { icon: Users, value: 200, suffix: "+", label: "Global Clients" },
    { icon: TrendingUp, value: 99, suffix: "%", label: "Client Satisfaction" },
  ];

  return (
    <section id="about" className="relative py-20 md:py-28 bg-paper-container grain border-y border-border">
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column - Content */}
          <div className="space-y-6">
            <span className="tag">About Us</span>

            <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight text-foreground stamped">
              Pioneering Excellence
              <span className="block text-rust">in Metal Trading</span>
            </h2>

            <div className="double-rule" />

            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                Since 2013, <span className="text-foreground font-semibold">Al Sandouq Al Ahmar Trading LLC</span> has been at the forefront of the metal trading industry in the UAE, establishing itself as a trusted partner for businesses worldwide.
              </p>

              <p>
                We specialize in the trade of <span className="text-rust font-semibold">ferrous and non-ferrous metals</span>, along with comprehensive <span className="text-rust font-semibold">e-waste recycling solutions</span>. Our commitment to quality, sustainability, and customer satisfaction has enabled us to build lasting relationships across the globe.
              </p>

              <p>
                With <span className="text-foreground font-semibold">ISO certification</span> and a proven track record, we ensure every transaction meets the highest standards of quality and compliance.
              </p>
            </div>

            {/* Trust Badge */}
            <div className="inline-flex items-center gap-4 border border-border bg-sheet p-4 press-sm">
              <Award className="w-8 h-8 text-rust" />
              <div>
                <div className="font-display font-bold text-foreground">ISO Certified</div>
                <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  Trusted Since 2013
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Statistics */}
          <div className="grid grid-cols-2 border-t border-l border-border">
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
  index: number;
}

const StatCard = ({ icon: Icon, value, suffix, label }: StatCardProps) => {
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

    const duration = 1600;
    const steps = 50;
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
      className="relative border-r border-b border-border bg-sheet p-6 hover:bg-paper-high transition-colors duration-150"
    >
      <Icon className="w-6 h-6 text-rust" />

      <div className="mt-4 font-mono text-3xl md:text-4xl font-bold text-foreground">
        {count.toLocaleString()}{suffix}
      </div>

      <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </div>
    </div>
  );
};

export default About;
