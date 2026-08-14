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

    setTimeout(() => {
      toast.success("You'll be notified when live prices launch!");
      setEmail("");
      setIsSubmitting(false);
    }, 800);
  };

  const features = [
    { label: "Real-Time Updates", code: "RT" },
    { label: "Historical Charts", code: "HC" },
    { label: "Price Alerts", code: "PA" },
  ];

  return (
    <section id="live-prices" className="relative py-20 md:py-28 bg-paper grain">
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto border-2 border-border bg-sheet press">
          <div className="nameplate flex items-center justify-between">
            <span className="inline-flex items-center gap-2">
              <Clock className="w-3 h-3" /> Coming Soon
            </span>
            <span className="hidden sm:inline">Market Desk</span>
          </div>

          <div className="p-5 sm:p-8 md:p-12 space-y-8">
            <div className="flex items-start gap-4">
              <div className="border border-border bg-primary p-3 flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-brass-light" />
              </div>
              <div className="min-w-0">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                  Live Metal Prices
                </h2>
                <p className="mt-2 text-lg text-muted-foreground leading-relaxed">
                  Real-time market data, price tracking, and instant quotes for all metal categories
                </p>
              </div>
            </div>

            {/* Ledger rows */}
            <div className="border-t border-border">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-wrap items-center gap-x-3 gap-y-1 justify-between border-b border-rule py-3 hover:bg-paper-high transition-colors duration-150"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                    {feature.code}
                  </span>
                  <span className="font-mono text-xs sm:text-sm uppercase tracking-[0.12em] text-foreground min-w-0 break-words">
                    {feature.label}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-rust">
                    Pending
                  </span>
                </div>
              ))}
            </div>


            {/* Email Notification Form */}
            <form onSubmit={handleNotifyMe} className="max-w-lg">
              <label className="block font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
                Notify me at launch
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-paper-container border-0 border-b-2 border-border rounded-none etched focus-visible:ring-0 focus-visible:border-rust"
                  disabled={isSubmitting}
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary text-primary-foreground border border-border font-mono text-xs uppercase tracking-[0.16em] press-sm hover:bg-rust hover:text-accent-foreground whitespace-nowrap"
                >
                  {isSubmitting ? "Submitting…" : "Notify Me"}
                </Button>
              </div>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                We only write when the desk goes live.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LivePrices;
