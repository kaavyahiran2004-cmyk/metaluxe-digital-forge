import { Award, Globe, Users, TrendingUp } from "lucide-react";

const About = () => {
  const stats = [
    { icon: Award, value: 13, suffix: "+", label: "Years in Business" },
    { icon: Globe, value: 5000, suffix: "+", label: "Containers Traded" },
    { icon: Users, value: 15, suffix: "+", label: "Countries Served" },
    { icon: TrendingUp, value: 100, suffix: "%", label: "Inspection Compliance" },
  ];

  return (
    <section id="about" className="relative py-20 md:py-28 bg-paper-container grain border-y border-border">
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column - Content */}
          <div className="space-y-6">
            <span className="tag">About Us</span>

            <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight text-foreground stamped">
              Over a Decade of Reliable
              <span className="block text-rust">Metal Trading in the UAE</span>
            </h2>

            <div className="double-rule" />

            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                Operating out of Industrial Area 10 in Sharjah since 2013, <span className="text-foreground font-semibold">Al Sandouq Al Ahmar Trading LLC</span> is a physical scrap metal processor and exporter serving industrial buyers across Asia, the Middle East, and Europe.
              </p>

              <p>
                We handle the sourcing, sorting, shearing, and container loading of <span className="text-rust font-semibold">ferrous and non-ferrous scrap</span> alongside specialized <span className="text-rust font-semibold">e-waste recovery</span>. Every shipment is weighed, inspected, and documented at our facility before dispatch.
              </p>

              <p>
                Backed by <span className="text-foreground font-semibold">ISO 9001 and ISO 14001 certifications</span>, we focus on accurate grading, clean loading, and dependable delivery schedules for long-term supply partners.
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
  return (
    <div
      className="relative border-r border-b border-border bg-sheet p-6 hover:bg-paper-high transition-colors duration-150"
    >
      <Icon className="w-6 h-6 text-rust" />

      <div className="mt-4 font-mono text-3xl md:text-4xl font-bold text-foreground">
        {value}{suffix}
      </div>

      <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </div>
    </div>
  );
};

export default About;
