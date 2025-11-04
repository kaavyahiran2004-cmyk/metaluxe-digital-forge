import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      toast.success("Message sent successfully! We'll respond within 24 hours.");
      
      // Reset after showing success
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({ name: "", email: "", phone: "", company: "", message: "" });
      }, 3000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      content: "Dubai, United Arab Emirates",
      subtext: "Warehouse available for inspection",
    },
    {
      icon: Mail,
      title: "Email Us",
      content: "info@alsandouqalahmar.com",
      subtext: "Response within 24 hours",
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+971 XX XXX XXXX",
      subtext: "Mon-Sat: 9AM - 6PM GST",
    },
  ];

  return (
    <section id="contact" className="relative py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gradient-gold">
            Get a Quote
          </h2>
          <p className="text-lg text-muted-foreground">
            Ready to discuss your metal trading needs? Reach out and let's build a partnership
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left Column - Contact Form */}
          <div className="glass-card rounded-2xl p-8 md:p-10">
            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground/80">
                      Name *
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="bg-[hsl(var(--midnight-blue))] border-[hsl(var(--border))] focus:border-[hsl(var(--primary))] transition-all duration-300"
                      disabled={isSubmitting}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground/80">
                      Email *
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@company.com"
                      className="bg-[hsl(var(--midnight-blue))] border-[hsl(var(--border))] focus:border-[hsl(var(--primary))] transition-all duration-300"
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground/80">
                      Phone *
                    </label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+971 XX XXX XXXX"
                      className="bg-[hsl(var(--midnight-blue))] border-[hsl(var(--border))] focus:border-[hsl(var(--primary))] transition-all duration-300"
                      disabled={isSubmitting}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground/80">
                      Company
                    </label>
                    <Input
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your Company"
                      className="bg-[hsl(var(--midnight-blue))] border-[hsl(var(--border))] focus:border-[hsl(var(--primary))] transition-all duration-300"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/80">
                    Message *
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your requirements..."
                    rows={6}
                    className="bg-[hsl(var(--midnight-blue))] border-[hsl(var(--border))] focus:border-[hsl(var(--primary))] transition-all duration-300 resize-none"
                    disabled={isSubmitting}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Minimum 20 characters
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] hover:shadow-glow-blue transition-all duration-300 hover:scale-105 h-12"
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-pulse">Sending...</span>
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 space-y-6 animate-scale-in">
                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center">
                  <CheckCircle className="w-12 h-12 text-green-500" />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-2xl font-bold text-foreground">Thank You!</h3>
                  <p className="text-muted-foreground">
                    We've received your message and will respond within 24 hours.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Contact Info */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div
                  key={index}
                  className="glass-card rounded-2xl p-6 hover:shadow-glow-blue transition-all duration-300 hover:-translate-y-1"
                  style={{
                    animation: `fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s both`,
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">
                        {info.title}
                      </h3>
                      <p className="text-lg text-[hsl(var(--accent))] font-medium mb-1">
                        {info.content}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {info.subtext}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Additional Info */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-semibold text-foreground mb-3">Working Hours</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monday - Saturday</span>
                  <span className="text-foreground font-medium">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sunday</span>
                  <span className="text-foreground font-medium">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
