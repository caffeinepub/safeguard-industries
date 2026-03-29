import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { Testimonial } from "../backend.d";
import { useAllTestimonials } from "../hooks/useQueries";

const STATIC_TESTIMONIALS: Testimonial[] = [
  {
    id: 1n,
    customerName: "James Mitchell",
    company: "ExxonMobil Refinery",
    review:
      "SafeGuard's FR clothing line saved two of our workers last year. The quality and certification compliance is unmatched. Their response time for emergency orders is remarkable.",
    rating: 5n,
    avatarUrl: "",
  },
  {
    id: 2n,
    customerName: "Sarah Chen",
    company: "BASF Chemical Division",
    review:
      "We've standardized on SafeGuard equipment across all 8 of our chemical plants. The chemical suit range is excellent and the spill kits have been invaluable for containment drills.",
    rating: 5n,
    avatarUrl: "",
  },
  {
    id: 3n,
    customerName: "David Okafor",
    company: "National Highway Authority",
    review:
      "Our road crews feel significantly safer since switching to SafeGuard high-vis gear. The barricades are robust and the cones exceed ASTM standards. Delivery was ahead of schedule.",
    rating: 5n,
    avatarUrl: "",
  },
  {
    id: 4n,
    customerName: "Priya Sharma",
    company: "Reliance Industries",
    review:
      "Outstanding customer service and top-tier product quality. The gas detectors we sourced have been deployed across our Gujarat refinery with zero calibration issues in 18 months.",
    rating: 5n,
    avatarUrl: "",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating
              ? "text-amber-500 fill-amber-500"
              : "text-industrial-600"
          }`}
        />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const { data: testimonials = [], isLoading } = useAllTestimonials();

  const displayTestimonials =
    testimonials.length > 0 ? testimonials : STATIC_TESTIMONIALS;
  const total = displayTestimonials.length;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  return (
    <section id="testimonials" className="py-20 bg-industrial-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-heading mx-auto inline-block">
            Customer Testimonials
          </h2>
          <p className="text-industrial-300 mt-6 max-w-xl mx-auto">
            What our industrial clients say about SafeGuard Industries
          </p>
        </motion.div>

        {isLoading ? (
          <div
            className="bg-industrial-800 rounded-xl p-8"
            data-ocid="testimonials.loading_state"
          >
            <Skeleton className="h-6 w-48 bg-industrial-700 mb-4" />
            <Skeleton className="h-4 w-full bg-industrial-700 mb-2" />
            <Skeleton className="h-4 w-3/4 bg-industrial-700" />
          </div>
        ) : (
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
                className="bg-industrial-800 border border-industrial-700 rounded-xl p-8 md:p-12 max-w-3xl mx-auto"
                data-ocid="testimonials.panel"
              >
                <Quote className="w-8 h-8 text-amber-500/40 mb-6" />
                <p className="text-industrial-100 text-lg leading-relaxed mb-8 italic">
                  "{displayTestimonials[current]?.review}"
                </p>
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12 border-2 border-amber-500/40">
                    <AvatarFallback className="bg-amber-500/20 text-amber-500 font-bold">
                      {getInitials(
                        displayTestimonials[current]?.customerName || "",
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-amber-500 font-display font-bold">
                      {displayTestimonials[current]?.customerName}
                    </div>
                    <div className="text-industrial-300 text-sm">
                      {displayTestimonials[current]?.company}
                    </div>
                    <StarRating
                      rating={Number(displayTestimonials[current]?.rating)}
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                type="button"
                onClick={prev}
                className="w-10 h-10 border border-industrial-600 rounded-full flex items-center justify-center text-industrial-300 hover:border-amber-500 hover:text-amber-500 transition-colors"
                data-ocid="testimonials.pagination_prev"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex gap-2">
                {displayTestimonials.map((_, i) => (
                  <button
                    type="button"
                    // biome-ignore lint/suspicious/noArrayIndexKey: carousel dots use index intentionally
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === current
                        ? "bg-amber-500 w-6"
                        : "bg-industrial-600 hover:bg-industrial-400"
                    }`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={next}
                className="w-10 h-10 border border-industrial-600 rounded-full flex items-center justify-center text-industrial-300 hover:border-amber-500 hover:text-amber-500 transition-colors"
                data-ocid="testimonials.pagination_next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
