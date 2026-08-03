import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const inputClass =
  "bg-paper-container border-0 border-b-2 border-border rounded-none etched focus-visible:ring-0 focus-visible:border-rust";

const labelClass =
  "block font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim();
    const phone = formData.phone.trim();
    const company = formData.company.trim();
    const message = formData.message.trim();

    if (!name || !email || !phone || !message) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (message.length < 20) {
      toast.error("Please write at least 20 characters in your message");
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke("submit-quote", {
        body: { name, email, phone, company, message },
      });

      if (error || (data && (data as { error?: string }).error)) {
        throw error ?? new Error("Request failed");
      }

      setIsSuccess(true);
      toast.success("Enquiry received. We'll respond within 24 hours.");
      setFormData({ name: "", email: "", phone: "", company: "", message: "" });

      setTimeout(() => setIsSuccess(false), 6000);
    } catch {
      toast.error("Could not send your enquiry. Please email amitjain@alsandouqalahmar.com directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      content: "Industrial Area 10, Sharjah, UAE",
      subtext: "Warehouse available for inspection",
    },
    {
      icon: Mail,
      title: "Email Us",
      content: "amitjain@alsandouqalahmar.com",
      subtext: "Response within 24 hours",
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+971 502033064",
      subtext: "Direct line to the trading desk",
    },
  ];

  return (
    <section id="contact" className="relative py-20 md:py-28 bg-paper-container grain border-t border-border">
      <div className="container relative mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <span className="tag mb-4">Enquiry Form</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4 text-foreground stamped">
            Get a Quote
          </h2>
          <div className="double-rule mb-4" />
          <p className="text-lg text-muted-foreground">
            Ready to discuss your metal trading needs? Reach out and let's build a partnership
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Column - Contact Form */}
          <div className="border-2 border-border bg-sheet press">
            <div className="nameplate flex items-center justify-between">
              <span>Quote Request</span>
              <span className="hidden sm:inline">Form / ASA-Q</span>
            </div>

            <div className="p-6 md:p-8">
              {!isSuccess ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass} htmlFor="name">Name *</label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        maxLength={100}
                        className={inputClass}
                        disabled={isSubmitting}
                        required
                      />
                    </div>

                    <div>
                      <label className={labelClass} htmlFor="email">Email *</label>
                      <Input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@company.com"
                        maxLength={255}
                        className={inputClass}
                        disabled={isSubmitting}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass} htmlFor="phone">Phone *</label>
                      <Input
                        id="phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+971 XX XXX XXXX"
                        maxLength={40}
                        className={inputClass}
                        disabled={isSubmitting}
                        required
                      />
                    </div>

                    <div>
                      <label className={labelClass} htmlFor="company">Company</label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Your Company"
                        maxLength={150}
                        className={inputClass}
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass} htmlFor="message">Message *</label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your requirements..."
                      rows={6}
                      maxLength={2000}
                      className={`${inputClass} resize-none`}
                      disabled={isSubmitting}
                      required
                    />
                    <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                      Minimum 20 characters
                    </p>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 bg-primary text-primary-foreground border border-border font-mono text-xs uppercase tracking-[0.18em] press hover:bg-rust hover:text-accent-foreground hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-150"
                  >
                    {isSubmitting ? "Sending…" : (
                      <>
                        Send Message
                        <Send className="ml-3 w-4 h-4" />
                      </>
                    )}
                  </Button>
                </form>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 space-y-6 text-center">
                  <div className="w-16 h-16 border border-border bg-primary flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-brass-light" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-display text-2xl font-bold text-foreground">Thank You</h3>
                    <p className="text-muted-foreground">
                      Your enquiry has been logged. We'll respond within 24 hours.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Contact Info */}
          <div className="border-t border-l border-border">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div
                  key={index}
                  className="flex items-start gap-4 border-r border-b border-border bg-sheet p-6 hover:bg-paper-high transition-colors duration-150"
                >
                  <div className="w-11 h-11 border border-border bg-primary flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-brass-light" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-1">
                      {info.title}
                    </h3>
                    <p className="font-display text-lg font-bold text-foreground break-words">
                      {info.content}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {info.subtext}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
