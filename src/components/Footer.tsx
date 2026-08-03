import { Facebook, Twitter, Linkedin, Instagram, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import logo from "@/assets/logo.png";

const Footer = () => {
  const [email, setEmail] = useState("");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    toast.success("Thank you for subscribing!");
    setEmail("");
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

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ];

  return (
    <footer className="relative bg-gunmetal text-[hsl(var(--paper-low))] border-t-2 border-border grain">
      {/* Main Footer Content */}
      <div className="container relative mx-auto px-4 md:px-6 py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1 - Company Info */}
          <div className="space-y-5">
            <img
              src={logo}
              alt="Al Sandouq Al Ahmar Trading LLC Logo"
              className="h-20 w-auto"
            />
            <h3 className="font-display text-xl font-bold text-brass-light">
              Al Sandouq Al Ahmar Trading LLC
            </h3>
            <p className="text-sm leading-relaxed text-[hsl(var(--paper-dim))]">
              Leading metal trading company in UAE, specializing in ferrous, non-ferrous metals, and e-waste recycling since 2013.
            </p>
            <div className="flex gap-2 pt-1">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-9 h-9 border border-[hsl(var(--paper-dim))]/40 flex items-center justify-center hover:bg-rust hover:border-rust transition-colors duration-150"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
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

          {/* Column 4 - Newsletter */}
          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] text-brass-light mb-4 pb-2 border-b border-[hsl(var(--paper-dim))]/30">
              Stay Updated
            </h4>
            <p className="text-sm text-[hsl(var(--paper-dim))] mb-4">
              Subscribe to our newsletter for market updates and latest news.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <Input
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-charcoal border-0 border-b-2 border-[hsl(var(--paper-dim))]/50 rounded-none text-[hsl(var(--paper-low))] placeholder:text-[hsl(var(--paper-dim))]/60 focus-visible:ring-0 focus-visible:border-brass"
              />
              <Button
                type="submit"
                className="w-full bg-rust text-accent-foreground border border-[hsl(var(--paper-dim))]/40 font-mono text-xs uppercase tracking-[0.16em] hover:bg-brass hover:text-charcoal transition-colors duration-150"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[hsl(var(--paper-dim))]/30">
        <div className="container mx-auto px-4 md:px-6 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-[hsl(var(--paper-dim))]">
            <p>© 2024 Al Sandouq Al Ahmar Trading LLC. All rights reserved.</p>

            <div className="flex items-center gap-5">
              <button className="hover:text-brass-light transition-colors duration-150">
                Privacy Policy
              </button>
              <button className="hover:text-brass-light transition-colors duration-150">
                Terms of Service
              </button>
            </div>

            <p>Made with precision in UAE</p>
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
