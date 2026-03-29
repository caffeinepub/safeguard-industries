import { Button } from "@/components/ui/button";
import { Cone, Flame, FlaskConical } from "lucide-react";
import { motion } from "motion/react";

const CATEGORIES = [
  {
    icon: Flame,
    title: "Oil & Gas Safety",
    description:
      "Flame-resistant clothing, gas detectors, and comprehensive fire safety equipment for hazardous environments.",
    image: "/assets/generated/product-fr-clothing.dim_600x600.jpg",
    color: "from-orange-900/60 to-transparent",
    accent: "text-orange-400",
  },
  {
    icon: FlaskConical,
    title: "Chemical Safety",
    description:
      "Chemical-resistant suits, protective gloves, safety goggles, and spill containment kits.",
    image: "/assets/generated/product-chem-suit.dim_600x600.jpg",
    color: "from-yellow-900/60 to-transparent",
    accent: "text-yellow-400",
  },
  {
    icon: Cone,
    title: "Road Safety",
    description:
      "Traffic cones, reflective jackets, speed breakers, and barricades for highway and construction safety.",
    image: "/assets/generated/product-traffic-cones.dim_600x600.jpg",
    color: "from-amber-900/60 to-transparent",
    accent: "text-amber-400",
  },
];

export default function CategoryHighlights() {
  const scrollToProducts = () => {
    document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-20 bg-industrial-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="section-heading mx-auto inline-block">
            Our Product Categories
          </h2>
          <p className="text-industrial-300 mt-6 max-w-xl mx-auto">
            Comprehensive safety solutions across three major industry verticals
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-lg border border-industrial-700 bg-industrial-800 hover:border-amber-500/50 transition-all duration-300"
            >
              <div
                className="h-48 bg-cover bg-center relative"
                style={{ backgroundImage: `url('${cat.image}')` }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${cat.color}`}
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <cat.icon className={`w-6 h-6 ${cat.accent}`} />
                  <h3 className="font-display font-bold text-white text-lg uppercase tracking-wide">
                    {cat.title}
                  </h3>
                </div>
                <p className="text-industrial-300 text-sm leading-relaxed mb-4">
                  {cat.description}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={scrollToProducts}
                  className="border-amber-500/50 text-amber-500 hover:bg-amber-500 hover:text-industrial-900 uppercase text-xs tracking-wider font-bold transition-all"
                  data-ocid="category.button"
                >
                  View Solutions
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
