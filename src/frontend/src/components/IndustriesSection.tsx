import { motion } from "motion/react";

const INDUSTRIES = [
  {
    title: "Oil Refineries",
    description:
      "Complete PPE and safety systems for upstream, midstream, and downstream oil operations.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        role="img"
        aria-label="Oil drop icon"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
  },
  {
    title: "Chemical Plants",
    description:
      "Specialized chemical-resistant equipment for lab-to-production chemical handling.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        role="img"
        aria-label="Flask icon"
      >
        <path d="M9 3h6v2.5L17 8H7L9 5.5V3z" />
        <path d="M7 8l-3 9a2 2 0 002 2h12a2 2 0 002-2l-3-9" />
        <circle cx="12" cy="14" r="2" />
      </svg>
    ),
  },
  {
    title: "Construction & Highways",
    description:
      "Comprehensive road safety and worker protection for civil construction projects.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        role="img"
        aria-label="Construction layers icon"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    title: "Manufacturing Units",
    description:
      "Industrial safety gear for factory floors, machine shops, and heavy manufacturing.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        role="img"
        aria-label="Gear icon"
      >
        <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
        <path d="M6 12a6 6 0 1 0 12 0a6 6 0 1 0 -12 0" />
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
    ),
  },
];

export default function IndustriesSection() {
  return (
    <section id="industries" className="py-20 bg-industrial-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="section-heading">Industries We Serve</h2>
          <p className="text-industrial-300 mt-6 max-w-xl">
            Delivering specialized safety solutions to the world's most
            demanding industrial sectors.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INDUSTRIES.map((industry, i) => (
            <motion.div
              key={industry.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-industrial-800 border border-industrial-700 rounded-lg p-6 hover:border-amber-500/50 transition-all duration-300"
              data-ocid={`industries.item.${i + 1}`}
            >
              <div className="text-amber-500 mb-4 group-hover:scale-110 transition-transform duration-300">
                {industry.icon}
              </div>
              <h3 className="font-display font-bold text-white text-base uppercase tracking-wide mb-2">
                {industry.title}
              </h3>
              <p className="text-industrial-300 text-sm leading-relaxed">
                {industry.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
