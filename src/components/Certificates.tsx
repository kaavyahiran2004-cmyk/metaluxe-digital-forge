import { Award, CheckCircle, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const Certificates = () => {
  const certificates = [
    {
      name: "ISO 9001:2015",
      authority: "International Organization for Standardization",
      type: "Quality Management",
      year: "2023",
      icon: Award,
    },
    {
      name: "ISO 14001:2015",
      authority: "International Organization for Standardization",
      type: "Environmental Management",
      year: "2023",
      icon: Shield,
    },
    {
      name: "Trade License",
      authority: "UAE Ministry of Economy",
      type: "Business Authorization",
      year: "2013",
      icon: CheckCircle,
    },
  ];

  return (
    <section id="certificates" className="relative py-20 md:py-32 bg-[hsl(var(--midnight-blue))]">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <Shield className="w-4 h-4 text-[hsl(var(--accent))]" />
            <span className="text-sm uppercase tracking-wider text-muted-foreground font-semibold">
              Certified Excellence
            </span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gradient-gold">
            Certifications & Compliance
          </h2>
          <p className="text-lg text-muted-foreground">
            Our commitment to quality and compliance is backed by internationally recognized certifications
          </p>
        </div>

        {/* Certificates Grid */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-12">
          {certificates.map((cert, index) => {
            const Icon = cert.icon;
            return (
              <div
                key={index}
                className="group relative glass-card rounded-2xl p-8 hover:shadow-elevated transition-all duration-500 hover:-translate-y-2"
                style={{
                  animation: `fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.15}s both`,
                }}
              >
                {/* Certificate Icon */}
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-foreground group-hover:text-gradient-gold transition-all duration-300">
                    {cert.name}
                  </h3>
                  
                  <p className="text-sm text-[hsl(var(--accent))] font-semibold uppercase tracking-wider">
                    {cert.type}
                  </p>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {cert.authority}
                  </p>

                  <div className="pt-4 flex items-center justify-between border-t border-[hsl(var(--border))]">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">
                      Certified
                    </span>
                    <span className="text-sm font-bold text-[hsl(var(--primary))]">
                      {cert.year}
                    </span>
                  </div>
                </div>

                {/* Verification Badge */}
                <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>

                {/* Shimmer Effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-[hsl(var(--primary))] text-foreground hover:bg-[hsl(var(--primary))]/10 transition-all duration-300 hover:scale-105"
          >
            <Shield className="mr-2 w-5 h-5" />
            Request Verification Documents
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Certificates;
