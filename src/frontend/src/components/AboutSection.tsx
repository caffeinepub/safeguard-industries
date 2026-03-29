import { CheckCircle } from "lucide-react";
import { motion } from "motion/react";

const VALUES = [
  "CE Marked PPE for Global Standards",
  "In-house Testing & Quality Assurance",
  "30+ Years of Industry Experience",
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-industrial-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="section-heading mb-8">About SafeGuard Industries</h2>
            <p className="text-industrial-200 leading-relaxed mb-4">
              Founded in 1994, SafeGuard Industries has been at the forefront of
              industrial safety, providing world-class protection equipment to
              oil refineries, chemical plants, and highway construction projects
              across 40+ countries.
            </p>
            <p className="text-industrial-300 leading-relaxed mb-6">
              Our mission is simple:{" "}
              <span className="text-amber-500 font-semibold">
                Zero compromises on worker safety.
              </span>{" "}
              We source, test, and certify every product to the highest
              international standards, ensuring your workforce stays protected
              in the most demanding conditions.
            </p>

            <div className="grid sm:grid-cols-2 gap-3">
              {VALUES.map((value, i) => (
                <motion.div
                  key={value}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="flex items-start gap-2"
                >
                  <CheckCircle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                  <span className="text-industrial-200 text-sm">{value}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-lg overflow-hidden">
              <img
                src="/assets/generated/about-industrial.dim_800x600.jpg"
                alt="SafeGuard industrial workers"
                className="w-full h-[420px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-industrial-950/40 to-transparent" />
            </div>
            {/* Stats overlay */}
            <div className="absolute -bottom-6 -left-6 bg-amber-500 p-5 rounded-lg shadow-amber-lg">
              <div className="text-industrial-900 font-display font-bold text-3xl">
                30+
              </div>
              <div className="text-industrial-900 text-xs uppercase font-bold tracking-wider">
                Years of Excellence
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
