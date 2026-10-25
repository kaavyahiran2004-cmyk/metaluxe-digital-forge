import { Package, Zap, Leaf } from "lucide-react";
import ferrousImg from "@/assets/ferrous-metals.jpg";
import nonFerrousImg from "@/assets/non-ferrous-metals.jpg";
import eWasteImg from "@/assets/e-waste.jpg";
import ferrousAvif from "@/assets/ferrous-metals.avif";
import nonFerrousAvif from "@/assets/non-ferrous-metals.avif";
import eWasteAvif from "@/assets/e-waste.avif";
import ferrousWebp from "@/assets/ferrous-metals.webp";
import nonFerrousWebp from "@/assets/non-ferrous-metals.webp";
import eWasteWebp from "@/assets/e-waste.webp";

const Products = () => {
  const products = [
    {
      title: "Ferrous Metals",
      code: "Ferrous",
      description: "Heavy melting steel and cast iron scrap processed and inspected for direct mill and foundry charging.",
      features: ["HMS 1&2", "Shredded Steel Scrap", "Cast Iron Scrap", "LMS Bundles"],
      icon: Package,
      image: ferrousImg,
      avif: ferrousAvif,
      webp: ferrousWebp,
    },
    {
      title: "Non-Ferrous Metals",
      code: "Non-Ferrous",
      description: "High-purity copper, aluminum, and brass scrap sorted and graded to international recovery standards.",
      features: ["Copper Wire (Millberry/Berry)", "Aluminum Scrap (Tense/Taint)", "Honey Brass", "Bronze & Gunmetal"],
      icon: Zap,
      image: nonFerrousImg,
      avif: nonFerrousAvif,
      webp: nonFerrousWebp,
      featured: true,
    },
    {
      title: "E-Waste Recycling",
      code: "E-Waste",
      description: "Compliant dismantling and sorting of telecom boards, industrial IT hardware, and metal-bearing electronic scrap.",
      features: ["High-Grade Circuit Boards", "Telecom & Server Scrap", "Insulated Copper Cable", "Industrial Electric Motors"],
      icon: Leaf,
      image: eWasteImg,
      avif: eWasteAvif,
      webp: eWasteWebp,
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
            Sorted, graded, and container-loaded scrap metals supplied directly from our Sharjah yard to international mills and recyclers.
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
                  <picture className="block w-full h-full">
                    <source type="image/avif" srcSet={product.avif} />
                    <source type="image/webp" srcSet={product.webp} />
                    <img
                      src={product.image}
                      alt={product.title}
                      width={800}
                      height={600}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover grayscale contrast-110 transition-[filter] duration-300 group-hover:grayscale-0 hover-layer"
                    />
                  </picture>
                  <div className="absolute inset-0 bg-[hsl(var(--rust))]/10" />

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
