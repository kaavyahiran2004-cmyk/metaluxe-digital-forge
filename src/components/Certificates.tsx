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

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="certificates" className="relative py-20 md:py-28 bg-paper grain">
      <div className="container relative mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <span className="tag mb-4">Certified Excellence</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4 text-foreground stamped">
            Certifications &amp; Compliance
          </h2>
          <div className="double-rule mb-4" />
          <p className="text-lg text-muted-foreground">
            Our commitment to quality and compliance is backed by internationally recognized certifications
          </p>
        </div>

        {/* Certificates Grid */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-12">
          {certificates.map((cert, index) => {
            const Icon = cert.icon;
            return (
              <article
                key={index}
                className="relative border border-border bg-sheet press-hover"
                style={{
                  animation: `fadeIn 0.4s ease-out ${index * 0.08}s both`,
                }}
              >
                <div className="nameplate flex items-center justify-between">
                  <span>{cert.type}</span>
                  <span className="text-brass-light">Verified</span>
                </div>

                <div className="p-6 space-y-4">
                  <div className="w-12 h-12 border border-border bg-primary flex items-center justify-center">
                    <Icon className="w-6 h-6 text-brass-light" />
                  </div>

                  <h3 className="font-display text-2xl font-bold text-foreground">
                    {cert.name}
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {cert.authority}
                  </p>

                  <div className="pt-4 flex items-center justify-between border-t border-border font-mono text-[11px] uppercase tracking-[0.16em]">
                    <span className="text-muted-foreground">Certified</span>
                    <span className="text-rust font-bold">{cert.year}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Call to Action */}
        <div>
          <Button
            variant="outline"
            size="lg"
            onClick={scrollToContact}
            className="border border-border bg-transparent text-foreground font-mono text-xs uppercase tracking-[0.18em] px-8 py-6 press-sm hover:bg-primary hover:text-primary-foreground transition-all duration-150"
          >
            <Shield className="mr-3 w-4 h-4" />
            Request Verification Documents
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Certificates;
