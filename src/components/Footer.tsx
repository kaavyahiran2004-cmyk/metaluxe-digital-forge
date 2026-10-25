import { ArrowUp } from "lucide-react";
import logo from "@/assets/logo.png";
import logoAvif from "@/assets/logo.avif";
import logoWebp from "@/assets/logo.webp";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const footerLinks = {
    company: [
      { label: "Home", id: "hero" },
      { label: "Products", id: "products" },
      { label: "About", id: "about" },
      { label: "Certificates", id: "certificates" },
      { label: "Contact", id: "contact" },
    ],
    products: [
      { label: "Ferrous Metals", id: "products" },
      { label: "Non-Ferrous Metals", id: "products" },
      { label: "E-Waste Recycling", id: "products" },
    ],
  };

  return (
    <footer className="relative bg-gunmetal text-[hsl(var(--paper-low))] border-t-2 border-border grain">
      {/* Main Footer Content */}
      <div className="container relative mx-auto px-4 md:px-6 py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr] gap-10 md:gap-12">
          {/* Column 1 - Company Info */}
          <div className="space-y-5">
            <picture>
              <source type="image/avif" srcSet={logoAvif} />
              <source type="image/webp" srcSet={logoWebp} />
              <img
                src={logo}
                alt="Al Sandouq Al Ahmar Trading LLC Logo"
                width={433}
                height={524}
                loading="lazy"
                decoding="async"
                className="h-20 w-auto"
              />
            </picture>
            <h3 className="font-display text-xl font-bold text-logo-blue-light">
              Al Sandouq Al Ahmar{" "}
              <span className="text-logo-copper-light">Trading LLC</span>
            </h3>

            <p className="text-sm leading-relaxed text-[hsl(var(--paper-dim))] max-w-sm">
              Physical scrap metal processor and exporter based in Sharjah, UAE. Specializing in ferrous, non-ferrous, and e-waste trading since 2013.
            </p>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] text-brass-light mb-4 pb-2 border-b border-[hsl(var(--paper-dim))]/30">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="font-mono text-xs uppercase tracking-[0.14em] text-[hsl(var(--paper-dim))] hover:text-brass-light transition-colors duration-150"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Products */}
          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] text-brass-light mb-4 pb-2 border-b border-[hsl(var(--paper-dim))]/30">
              Products
            </h4>
            <ul className="space-y-2">
              {footerLinks.products.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="font-mono text-xs uppercase tracking-[0.14em] text-[hsl(var(--paper-dim))] hover:text-brass-light transition-colors duration-150"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[hsl(var(--paper-dim))]/30">
        <div className="container mx-auto px-4 md:px-6 py-5 md:pr-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-[hsl(var(--paper-dim))]">
            <p>© 2026 Al Sandouq Al Ahmar Trading LLC. All rights reserved.</p>

            <div className="flex items-center gap-5">
              <button className="hover:text-brass-light transition-colors duration-150">
                Privacy Policy
              </button>
              <button className="hover:text-brass-light transition-colors duration-150">
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-11 h-11 bg-primary text-primary-foreground border border-[hsl(var(--paper-dim))]/40 flex items-center justify-center press-sm hover:bg-rust transition-colors duration-150 z-50"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </footer>
  );
};

export default Footer;
