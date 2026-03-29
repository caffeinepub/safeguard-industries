import { Button } from "@/components/ui/button";
import { Menu, Search, Shield, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "../hooks/useQueries";

interface HeaderProps {
  onCartOpen: () => void;
  sessionId: string;
}

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Products", href: "#products" },
  { label: "About", href: "#about" },
  { label: "Industries", href: "#industries" },
  { label: "Safety Tips", href: "#safety-tips" },
  { label: "Contact", href: "#contact" },
];

export default function Header({ onCartOpen, sessionId }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: cartItems = [] } = useCart(sessionId);

  const totalItems = cartItems.reduce(
    (sum, item) => sum + Number(item.quantity),
    0,
  );

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 bg-industrial-950/95 backdrop-blur-sm border-b border-industrial-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-2 group"
            data-ocid="header.link"
          >
            <div className="w-9 h-9 bg-amber-500 rounded flex items-center justify-center shadow-amber">
              <Shield className="w-5 h-5 text-industrial-900" />
            </div>
            <div className="leading-tight">
              <span className="font-display font-bold text-white text-sm uppercase tracking-wider">
                SafeGuard
              </span>
              <br />
              <span className="font-display font-bold text-amber-500 text-[10px] uppercase tracking-[0.2em]">
                Industries
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-6"
            data-ocid="nav.panel"
          >
            {NAV_LINKS.map((link) => (
              <button
                type="button"
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-xs uppercase tracking-wider text-industrial-200 hover:text-amber-500 transition-colors font-medium"
                data-ocid="nav.link"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="hidden md:block text-industrial-300 hover:text-amber-500 transition-colors"
              data-ocid="header.search_input"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={onCartOpen}
              className="relative text-industrial-300 hover:text-amber-500 transition-colors"
              data-ocid="cart.open_modal_button"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-500 text-industrial-900 text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            <Button
              size="sm"
              className="hidden md:flex bg-amber-500 hover:bg-amber-600 text-industrial-900 font-bold uppercase tracking-wider text-xs"
              data-ocid="header.primary_button"
            >
              Request Quote
            </Button>

            <button
              type="button"
              className="md:hidden text-industrial-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-ocid="nav.toggle"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div
            className="md:hidden py-4 border-t border-industrial-700"
            data-ocid="nav.panel"
          >
            {NAV_LINKS.map((link) => (
              <button
                type="button"
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="block w-full text-left px-4 py-3 text-sm uppercase tracking-wider text-industrial-200 hover:text-amber-500 hover:bg-industrial-800 transition-colors"
                data-ocid="nav.link"
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
