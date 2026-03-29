import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, Calendar, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { SafetyArticle } from "../backend.d";
import { useAllArticles } from "../hooks/useQueries";

const STATIC_ARTICLES: SafetyArticle[] = [
  {
    id: 1n,
    title: "Top 10 Safety Tips in the Chemical Industry",
    summary:
      "Essential protocols for handling hazardous chemicals, from proper PPE selection to emergency spill response procedures that can save lives.",
    content:
      "Chemical industry workers face unique hazards daily. Implementing proper safety protocols starts with understanding chemical properties, using appropriate PPE, maintaining MSDS awareness, and conducting regular safety drills. Never mix unknown chemicals, always work in ventilated areas, and ensure emergency eyewash stations are accessible within 10 seconds of any potential hazard exposure.",
    category: "Chemical Safety",
    publishedDate: 1709856000n,
  },
  {
    id: 2n,
    title: "Importance of PPE in Oil & Gas Operations",
    summary:
      "Understanding why Personal Protective Equipment is non-negotiable on oil rigs and refinery floors, with guidelines for proper selection and maintenance.",
    content:
      "In oil and gas environments, PPE is the last line of defense against catastrophic injury. Flame-resistant clothing must meet NFPA 2112 standards, and workers should understand arc flash ratings. Gas detectors save lives — test them daily. Hard hats, steel-toed boots, and eye protection are mandatory from site entry to departure.",
    category: "Oil & Gas",
    publishedDate: 1709856000n,
  },
  {
    id: 3n,
    title: "Road Safety Best Practices for Construction Zones",
    summary:
      "How proper traffic management and high-visibility equipment protect highway construction workers and passing motorists from preventable accidents.",
    content:
      "Construction zone fatalities are largely preventable. Establish proper work zone setup with advance warning signs, speed reductions, and channelizing devices. All workers must wear ANSI/ISEA Class 3 high-visibility garments. Use rumble strips and water-filled barriers for maximum protection. Conduct daily toolbox talks covering the day's traffic management plan.",
    category: "Road Safety",
    publishedDate: 1709856000n,
  },
];

export default function SafetyAwareness() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const { data: articles = [], isLoading } = useAllArticles();

  const displayArticles = articles.length > 0 ? articles : STATIC_ARTICLES;

  const categoryColor: Record<string, string> = {
    "Chemical Safety": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    "Oil & Gas": "bg-orange-500/20 text-orange-400 border-orange-500/30",
    "Road Safety": "bg-amber-500/20 text-amber-400 border-amber-500/30",
  };

  return (
    <section id="safety-tips" className="py-20 bg-industrial-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-6 h-6 text-amber-500" />
            <span className="text-amber-500 text-xs font-bold uppercase tracking-widest">
              Safety Awareness
            </span>
          </div>
          <h2 className="section-heading">Safety Tips & Resources</h2>
          <p className="text-industrial-300 mt-6 max-w-xl">
            Industry knowledge and best practices to keep your workforce safe
            every day.
          </p>
        </motion.div>

        {isLoading ? (
          <div
            className="grid md:grid-cols-3 gap-6"
            data-ocid="articles.loading_state"
          >
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-industrial-800 rounded-lg p-6">
                <Skeleton className="h-4 w-24 bg-industrial-700 mb-3" />
                <Skeleton className="h-6 w-full bg-industrial-700 mb-2" />
                <Skeleton className="h-4 w-full bg-industrial-700" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {displayArticles.map((article, i) => (
              <motion.div
                key={String(article.id)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-industrial-800 border border-industrial-700 rounded-lg overflow-hidden hover:border-amber-500/30 transition-all"
                data-ocid={`articles.item.${i + 1}`}
              >
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge
                      className={`text-[10px] uppercase font-bold border ${categoryColor[article.category] || "bg-industrial-700 text-industrial-300"}`}
                    >
                      {article.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-industrial-400 text-xs ml-auto">
                      <Calendar className="w-3 h-3" />
                      <span>Mar 2024</span>
                    </div>
                  </div>
                  <h3 className="font-display font-bold text-white text-base mb-2 leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-industrial-300 text-sm leading-relaxed mb-4">
                    {article.summary}
                  </p>

                  <AnimatePresence>
                    {expanded === String(article.id) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="text-industrial-300 text-sm leading-relaxed mb-4 pt-2 border-t border-industrial-700">
                          {article.content}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setExpanded(
                        expanded === String(article.id)
                          ? null
                          : String(article.id),
                      )
                    }
                    className="text-amber-500 hover:text-amber-400 hover:bg-amber-500/10 p-0 h-auto font-bold text-xs uppercase tracking-wider"
                    data-ocid="articles.button"
                  >
                    {expanded === String(article.id)
                      ? "Show Less"
                      : "Read More"}
                    <ChevronDown
                      className={`w-3 h-3 ml-1 transition-transform ${expanded === String(article.id) ? "rotate-180" : ""}`}
                    />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
