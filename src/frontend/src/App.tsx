import { Toaster } from "@/components/ui/sonner";
import { useEffect, useState } from "react";
import AboutSection from "./components/AboutSection";
import CartDrawer from "./components/CartDrawer";
import CategoryHighlights from "./components/CategoryHighlights";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import IndustriesSection from "./components/IndustriesSection";
import ProductsSection from "./components/ProductsSection";
import SafetyAwareness from "./components/SafetyAwareness";
import TestimonialsSection from "./components/TestimonialsSection";
import WhatsAppFAB from "./components/WhatsAppFAB";
import WhyChooseUs from "./components/WhyChooseUs";
import { useActor } from "./hooks/useActor";
import { getSessionId } from "./utils/session";

export default function App() {
  const { actor, isFetching } = useActor();
  const [cartOpen, setCartOpen] = useState(false);
  const sessionId = getSessionId();

  useEffect(() => {
    if (actor && !isFetching) {
      actor.seedData().catch(() => {
        /* ignore if already seeded */
      });
    }
  }, [actor, isFetching]);

  return (
    <div className="min-h-screen bg-industrial-900 text-white font-body">
      <Header onCartOpen={() => setCartOpen(true)} sessionId={sessionId} />
      <main>
        <HeroSection />
        <CategoryHighlights />
        <ProductsSection sessionId={sessionId} />
        <AboutSection />
        <IndustriesSection />
        <WhyChooseUs />
        <SafetyAwareness />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        sessionId={sessionId}
      />
      <WhatsAppFAB />
      <Toaster />
    </div>
  );
}
