import { Clock, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

const LivePrices = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNotifyMe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("You'll be notified when live prices launch!");
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section id="live-prices" className="relative py-20 md:py-32 bg-background overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }} />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Content Card */}
          <div className="glass-card rounded-3xl p-8 md:p-16 text-center space-y-8 hover:shadow-elevated transition-all duration-500">
            {/* Animated Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] animate-glow-pulse">
              <TrendingUp className="w-10 h-10 text-white" />
            </div>

            {/* Headline with Glitch Effect */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass mb-4">
                <Clock className="w-4 h-4 text-[hsl(var(--accent))] animate-pulse" />
                <span className="text-sm uppercase tracking-wider text-muted-foreground font-semibold">
                  Coming Soon
                </span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-gradient-gold">
                Live Metal Prices
              </h2>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Real-time market data, price tracking, and instant quotes for all metal categories
              </p>
            </div>

            {/* Features Preview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-8">
              {[
                { label: "Real-Time Updates", icon: "📊" },
                { label: "Historical Charts", icon: "📈" },
                { label: "Price Alerts", icon: "🔔" },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-[hsl(var(--midnight-blue))] border border-[hsl(var(--border))] hover:border-[hsl(var(--primary))] transition-all duration-300"
                >
                  <div className="text-3xl mb-2">{feature.icon}</div>
                  <div className="text-sm font-medium text-foreground/80">
                    {feature.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Email Notification Form */}
            <form onSubmit={handleNotifyMe} className="max-w-md mx-auto">
              <p className="text-sm text-muted-foreground mb-4">
                Be the first to know when we launch
              </p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-[hsl(var(--midnight-blue))] border-[hsl(var(--border))] focus:border-[hsl(var(--primary))] transition-all duration-300"
                  disabled={isSubmitting}
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] hover:shadow-glow-blue transition-all duration-300 whitespace-nowrap"
                >
                  {isSubmitting ? "Submitting..." : "Notify Me"}
                </Button>
              </div>
            </form>

            {/* Trust Badge */}
            <p className="text-xs text-muted-foreground">
              🔒 Your email is safe with us. We'll only notify you about the launch.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LivePrices;
