import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import LivePrices from "@/components/LivePrices";
import About from "@/components/About";
import Certificates from "@/components/Certificates";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CursorTrail from "@/components/CursorTrail";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <CursorTrail />
      <Navigation />
      <main>

        <Hero />
        <Products />
        <LivePrices />
        <About />
        <Certificates />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
