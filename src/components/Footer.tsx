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
    <footer className="relative bg-[hsl(var(--midnight-blue))] border-t border-[hsl(var(--border))]">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 md:px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1 - Company Info */}
          <div className="space-y-6">
            <div className="flex flex-col items-start gap-4">
              <img 
                src={logo} 
                alt="Al Sandouq Al Ahmar Trading LLC Logo" 
                className="h-24 md:h-28 w-auto drop-shadow-[0_0_25px_rgba(245,158,11,0.4)]"
              />
              <h3 className="text-xl md:text-2xl font-bold text-gradient-gold">
                Al Sandouq Al Ahmar Trading LLC
              </h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Leading metal trading company in UAE, specializing in ferrous, non-ferrous metals, and e-waste recycling since 2013.
            </p>
            <div className="flex gap-3 pt-2">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-[hsl(var(--primary))]/20 hover:shadow-glow-blue transition-all duration-300 hover:scale-110"
                  >
                    <Icon className="w-4 h-4 text-muted-foreground hover:text-[hsl(var(--primary))]" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-muted-foreground hover:text-[hsl(var(--primary))] transition-colors duration-200 text-sm relative group"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-[hsl(var(--primary))] transition-all duration-300 group-hover:w-full" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Products */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Products</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--accent))]" />
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-muted-foreground hover:text-[hsl(var(--primary))] transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Newsletter */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Stay Updated</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to our newsletter for market updates and latest news.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[hsl(var(--background))] border-[hsl(var(--border))] focus:border-[hsl(var(--primary))] transition-all duration-300"
              />
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] hover:shadow-glow-blue transition-all duration-300"
              >
                Subscribe
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-3">
              🔒 We respect your privacy. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[hsl(var(--border))]">
        <div className="container mx-auto px-4 md:px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © 2024 Al Sandouq Al Ahmar Trading LLC. All rights reserved.
            </p>
            
            <div className="flex items-center gap-6">
              <button className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
                Privacy Policy
              </button>
              <button className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
                Terms of Service
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>Made with precision in UAE</span>
              <span className="text-[hsl(var(--accent))]">🇦🇪</span>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] shadow-glow-blue flex items-center justify-center hover:scale-110 transition-all duration-300 z-50"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5 text-white" />
      </button>
    </footer>
  );
};

export default Footer;
