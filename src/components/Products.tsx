import { Package, Zap, Leaf } from "lucide-react";
import ferrousImg from "@/assets/ferrous-metals.jpg";
import nonFerrousImg from "@/assets/non-ferrous-metals.jpg";
import eWasteImg from "@/assets/e-waste.jpg";

const Products = () => {
  const products = [
    {
      title: "Ferrous Metals",
      description: "High-quality steel, iron, and related ferrous materials for industrial applications worldwide.",
      features: ["Steel Scrap", "Iron Ore", "Cast Iron", "HMS 1&2"],
      icon: Package,
      image: ferrousImg,
      gradient: "from-blue-500/20 to-cyan-500/20",
    },
    {
      title: "Non-Ferrous Metals",
      description: "Premium copper, aluminum, brass, and specialty metals sourced and delivered globally.",
      features: ["Copper Wire", "Aluminum Scrap", "Brass", "Bronze"],
      icon: Zap,
      image: nonFerrousImg,
      gradient: "from-amber-500/20 to-yellow-500/20",
      featured: true,
    },
    {
      title: "E-Waste Recycling",
      description: "Sustainable electronic waste processing and precious metal recovery services.",
      features: ["Circuit Boards", "Electronic Components", "Precious Metals", "Battery Recycling"],
      icon: Leaf,
      image: eWasteImg,
      gradient: "from-green-500/20 to-emerald-500/20",
    },
  ];

  return (
    <section id="products" className="relative py-20 md:py-32 bg-[hsl(var(--midnight-blue))]">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gradient-gold">
            Our Products
          </h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive metal trading solutions backed by decades of expertise and global reach
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product, index) => {
            const Icon = product.icon;
            return (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-2xl glass-card cursor-pointer ${
                  product.featured ? "md:col-span-2 lg:col-span-1" : ""
                }`}
                style={{
                  animation: `fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.15}s both`,
                }}
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--primary))]/20 to-[hsl(var(--accent))]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} mix-blend-multiply group-hover:opacity-80 transition-opacity duration-500`} />
                  
                  {/* Icon Badge */}
                  <div className="absolute top-4 right-4 p-3 rounded-xl glass group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                    <Icon className="w-6 h-6 text-[hsl(var(--accent))] group-hover:text-[hsl(var(--primary))] transition-colors duration-500" />
                  </div>

                  {product.featured && (
                    <div className="absolute top-4 left-4 px-4 py-1.5 rounded-full bg-gradient-to-r from-[hsl(var(--accent))] to-[hsl(var(--primary))] text-[hsl(var(--accent-foreground))] text-xs font-bold uppercase tracking-wider shadow-glow-gold animate-pulse">
                      Featured
                    </div>
                  )}
                  
                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 space-y-4">
                  <h3 className="text-2xl md:text-3xl font-bold text-gradient-gold group-hover:scale-105 transition-transform duration-300 origin-left drop-shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                    {product.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-2 pt-2">
                    {product.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-sm text-foreground/80"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--primary))] mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Hover Arrow */}
                  <div className="pt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <span className="text-[hsl(var(--primary))] font-bold inline-flex items-center text-sm uppercase tracking-wider">
                      Learn More
                      <svg
                        className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                  
                  {/* Bottom gradient accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--primary))] opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ backgroundSize: "200% 100%", animation: "gradient-shift 3s linear infinite" }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Products;
