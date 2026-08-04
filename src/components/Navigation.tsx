import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: "Home", id: "hero" },
    { label: "Products", id: "products" },
    { label: "About", id: "about" },
    { label: "Certificates", id: "certificates" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-200 ${
          isScrolled
            ? "bg-paper border-border py-2 press-sm"
            : "bg-paper/95 border-rule py-4"
        }`}
      >
        {/* Schematic line-work overlay (desktop only) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden md:block schematic"
        />

        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => scrollToSection("hero")}
              className="flex items-center gap-4 group"
            >
              <img
                src={logo}
                alt="Al Sandouq Al Ahmar Trading LLC Logo"
                className="h-14 md:h-16 w-auto"
              />
              <span className="font-display text-lg md:text-xl font-bold text-foreground hidden lg:block stamped">
                Al Sandouq Al Ahmar
              </span>
            </button>


            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-7">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground hover:text-rust transition-colors duration-150 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-rust transition-all duration-200 group-hover:w-full" />
                </button>
              ))}
            </div>

            {/* CTA Button - Desktop */}
            <Button
              onClick={() => scrollToSection("contact")}
              className="hidden md:inline-flex bg-primary text-primary-foreground border border-border font-mono text-xs uppercase tracking-[0.16em] hover:bg-rust hover:text-accent-foreground press-sm hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all duration-150"
            >
              Get Quote
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-foreground hover:text-rust transition-colors duration-150"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-200 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-paper" />
        <div className="relative h-full flex flex-col items-center justify-center gap-6 p-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="font-display text-2xl font-bold text-foreground hover:text-rust transition-colors duration-150"
            >
              {link.label}
            </button>
          ))}
          <Button
            onClick={() => scrollToSection("contact")}
            className="mt-4 bg-primary text-primary-foreground border border-border font-mono text-xs uppercase tracking-[0.16em] press-sm"
          >
            Get Quote
          </Button>
        </div>
      </div>
    </>
  );
};

export default Navigation;
