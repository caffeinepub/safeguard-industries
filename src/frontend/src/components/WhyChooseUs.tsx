import { Hammer, ShieldCheck, Truck } from "lucide-react";
import { motion } from "motion/react";

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Quality Assured Products",
    description:
      "Every product in our catalog meets strict quality and safety standards, rigorously tested for performance in Oil & Gas, Chemical, and Road Safety environments.",
    stats: "Quality Assured",
  },
  {
    icon: Hammer,
    title: "Durable & Field-Tested",
    description:
      "Our equipment undergoes rigorous stress testing under real-world conditions — extreme temperatures, chemical exposure, and mechanical impact — before reaching your workforce.",
    stats: "10,000+ Tests",
  },
  {
    icon: Truck,
    title: "Fast Delivery & Support",
    description:
      "Nationwide same-day dispatch from 12 regional warehouses. Dedicated account managers and 24/7 emergency procurement for critical safety situations.",
    stats: "48hr Delivery",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="py-20 bg-industrial-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="section-heading mx-auto inline-block">
            Why Choose SafeGuard
          </h2>
          <p className="text-industrial-300 mt-6 max-w-xl mx-auto">
            Three pillars of excellence that set us apart in industrial safety
            supply.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative bg-industrial-800 border border-industrial-700 rounded-lg p-8 hover:border-amber-500/40 transition-all duration-300 group"
              data-ocid={`why-us.item.${i + 1}`}
            >
              <div className="w-14 h-14 bg-amber-500/10 border border-amber-500/30 rounded-lg flex items-center justify-center mb-6 group-hover:bg-amber-500/20 transition-colors">
                <feature.icon className="w-7 h-7 text-amber-500" />
              </div>
              <div className="text-amber-500 font-display font-bold text-sm uppercase tracking-widest mb-2">
                {feature.stats}
              </div>
              <h3 className="font-display font-bold text-white text-xl uppercase tracking-wide mb-3">
                {feature.title}
              </h3>
              <p className="text-industrial-300 text-sm leading-relaxed">
                {feature.description}
              </p>

              {/* Corner accent */}
              <div className="absolute bottom-0 right-0 w-16 h-16 opacity-5 group-hover:opacity-10 transition-opacity">
                <div className="w-full h-full bg-amber-500 rounded-tl-3xl" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
