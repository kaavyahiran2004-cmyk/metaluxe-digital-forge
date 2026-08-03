import { Package, Zap, Leaf } from "lucide-react";
import ferrousImg from "@/assets/ferrous-metals.jpg";
import nonFerrousImg from "@/assets/non-ferrous-metals.jpg";
import eWasteImg from "@/assets/e-waste.jpg";

const Products = () => {
  const products = [
    {
      title: "Ferrous Metals",
      code: "FE-01",
      description: "High-quality steel, iron, and related ferrous materials for industrial applications worldwide.",
      features: ["Steel Scrap", "Iron Ore", "Cast Iron", "HMS 1&2"],
      icon: Package,
      image: ferrousImg,
    },
    {
      title: "Non-Ferrous Metals",
      code: "NF-02",
      description: "Premium copper, aluminum, brass, and specialty metals sourced and delivered globally.",
      features: ["Copper Wire", "Aluminum Scrap", "Brass", "Bronze"],
      icon: Zap,
      image: nonFerrousImg,
      featured: true,
    },
    {
      title: "E-Waste Recycling",
      code: "EW-03",
      description: "Sustainable electronic waste processing and precious metal recovery services.",
      features: ["Circuit Boards", "Electronic Components", "Precious Metals", "Battery Recycling"],
      icon: Leaf,
      image: eWasteImg,
    },
  ];

  return (
    <section id="products" className="relative py-20 md:py-28 bg-paper-container grain border-y border-border">
      <div className="container relative mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <span className="tag mb-4">Catalogue</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4 text-foreground stamped">
            Our Products
          </h2>
          <div className="double-rule mb-4" />
          <p className="text-lg text-muted-foreground">
            Comprehensive metal trading solutions backed by decades of expertise and global reach
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product, index) => {
            const Icon = product.icon;
            return (
              <article
                key={index}
                className={`group relative border border-border bg-sheet press-hover ${
                  product.featured ? "md:col-span-2 lg:col-span-1" : ""
                }`}
                style={{
                  animation: `fadeIn 0.4s ease-out ${index * 0.08}s both`,
                }}
              >
                {/* Nameplate */}
                <div className="nameplate flex items-center justify-between">
                  <span>{product.code}</span>
                  {product.featured && <span className="text-brass-light">Featured</span>}
                </div>

                {/* Image plate */}
                <div className="relative h-56 overflow-hidden border-b border-border">
                  <img
                    src={product.image}
                    alt={product.title}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale contrast-110 transition-all duration-500 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-[hsl(var(--rust))]/10 mix-blend-multiply" />
                  <div className="absolute top-3 right-3 p-2 border border-border bg-paper">
                    <Icon className="w-5 h-5 text-rust" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <h3 className="font-display text-2xl font-bold text-foreground">
                    {product.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed text-[15px]">
                    {product.description}
                  </p>

                  <ul className="divide-y divide-rule border-t border-rule">
                    {product.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center justify-between py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-foreground"
                      >
                        <span>{feature}</span>
                        <span className="text-muted-foreground">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Products;
