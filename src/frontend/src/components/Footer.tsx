import { Mail, MapPin, Phone, Shield } from "lucide-react";
import { SiFacebook, SiLinkedin, SiX, SiYoutube } from "react-icons/si";

const QUICK_LINKS = [
  { label: "Products", href: "#products" },
  { label: "About Us", href: "#about" },
  { label: "Industries", href: "#industries" },
  { label: "Safety Tips", href: "#safety-tips" },
  { label: "Contact", href: "#contact" },
];

const PRODUCT_LINKS = [
  "Safety Shoes & Boots",
  "Helmets & Hard Hats",
  "Gloves",
  "Fire Extinguishers",
  "Chemical Spill Kits",
  "Road Safety Products",
];

export default function Footer() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const year = new Date().getFullYear();
  const utmLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`;

  return (
    <footer className="bg-industrial-950 border-t border-industrial-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-amber-500 rounded flex items-center justify-center">
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
            </div>
            <p className="text-industrial-400 text-sm leading-relaxed mb-6">
              Protecting industrial workers with certified, durable, and
              field-tested safety equipment.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: SiLinkedin, href: "#", label: "LinkedIn" },
                { Icon: SiFacebook, href: "#", label: "Facebook" },
                { Icon: SiX, href: "#", label: "X" },
                { Icon: SiYoutube, href: "#", label: "YouTube" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 bg-industrial-800 border border-industrial-700 rounded flex items-center justify-center text-industrial-400 hover:text-amber-500 hover:border-amber-500/50 transition-all"
                  data-ocid="footer.link"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-white text-xs uppercase tracking-widest mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={() => scrollTo(link.href)}
                    className="text-industrial-400 hover:text-amber-500 text-sm transition-colors"
                    data-ocid="footer.link"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-display font-bold text-white text-xs uppercase tracking-widest mb-4">
              Products
            </h4>
            <ul className="space-y-2">
              {PRODUCT_LINKS.map((product) => (
                <li key={product}>
                  <button
                    type="button"
                    onClick={() => scrollTo("#products")}
                    className="text-industrial-400 hover:text-amber-500 text-sm transition-colors text-left"
                  >
                    {product}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-bold text-white text-xs uppercase tracking-widest mb-4">
              Contact
            </h4>
            <div className="space-y-3">
              <div className="flex gap-2 text-industrial-400 text-sm">
                <Phone className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p>+91 76780 34480</p>
                  <p>+91 82379 32116</p>
                </div>
              </div>
              <div className="flex gap-2 text-industrial-400 text-sm">
                <Mail className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>safety@safeguard.com</span>
              </div>
              <div className="flex gap-2 text-industrial-400 text-sm">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>India</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-industrial-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-industrial-500 text-xs">
            © {year} SafeGuard Industries. All rights reserved.
          </p>
          <p className="text-industrial-500 text-xs">
            Built with ❤️ using{" "}
            <a
              href={utmLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-500/70 hover:text-amber-500 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
