import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Package, Search, ShoppingCart } from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import type { Product } from "../backend.d";
import { useAddToCart, useAllProducts } from "../hooks/useQueries";
import { getProductImage } from "../utils/imageMap";

const CATEGORIES = [
  "All",
  "Oil & Gas",
  "Chemical Safety",
  "Road Safety",
  "Personal Protection",
  "Fire Safety",
];

interface ProductsProps {
  sessionId: string;
}

export default function ProductsSection({ sessionId }: ProductsProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const { data: products = [], isLoading } = useAllProducts();
  const addToCart = useAddToCart(sessionId);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCat =
        activeCategory === "All" || p.category === activeCategory;
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [products, activeCategory, search]);

  const handleAddToCart = async (product: Product) => {
    try {
      await addToCart.mutateAsync({ productId: product.id, quantity: 1n });
      toast.success(`${product.name} added to cart!`, {
        style: {
          background: "#1A1D21",
          color: "white",
          border: "1px solid #F5A623",
        },
      });
    } catch {
      toast.error("Failed to add to cart");
    }
  };

  const categoryColor: Record<string, string> = {
    "Oil & Gas": "bg-orange-500/20 text-orange-400 border-orange-500/30",
    "Chemical Safety": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    "Road Safety": "bg-amber-500/20 text-amber-400 border-amber-500/30",
    "Personal Protection": "bg-blue-500/20 text-blue-400 border-blue-500/30",
    "Fire Safety": "bg-red-500/20 text-red-400 border-red-500/30",
  };

  return (
    <section id="products" className="py-20 bg-industrial-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <h2 className="section-heading">Our Products</h2>
          <p className="text-industrial-300 mt-6 max-w-xl">
            Industry-certified safety equipment engineered for the most
            demanding environments.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex flex-wrap gap-2" data-ocid="products.tab">
            {CATEGORIES.map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded border transition-all ${
                  activeCategory === cat
                    ? "bg-amber-500 text-industrial-900 border-amber-500"
                    : "border-industrial-600 text-industrial-300 hover:border-amber-500/50 hover:text-amber-500"
                }`}
                data-ocid="products.tab"
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative sm:ml-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-industrial-400" />
            <Input
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-industrial-800 border-industrial-600 text-white placeholder:text-industrial-400 w-full sm:w-64"
              data-ocid="products.search_input"
            />
          </div>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            data-ocid="products.loading_state"
          >
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-industrial-800 rounded-lg overflow-hidden"
              >
                <Skeleton className="h-48 w-full bg-industrial-700" />
                <div className="p-4 space-y-3">
                  <Skeleton className="h-4 w-3/4 bg-industrial-700" />
                  <Skeleton className="h-3 w-full bg-industrial-700" />
                  <Skeleton className="h-8 w-28 bg-industrial-700" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div
            className="text-center py-20 text-industrial-400"
            data-ocid="products.empty_state"
          >
            <Package className="w-12 h-12 mx-auto mb-4 opacity-40" />
            <p>No products found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product, i) => (
              <motion.div
                key={String(product.id)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group bg-industrial-800 border border-industrial-700 rounded-lg overflow-hidden hover:border-amber-500/40 transition-all duration-300"
                data-ocid={`products.item.${i + 1}`}
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={getProductImage(product.imageUrl)}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-industrial-900/60 to-transparent" />
                  {!product.inStock && (
                    <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                      Out of Stock
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <Badge
                    className={`text-[10px] uppercase font-bold mb-2 border ${
                      categoryColor[product.category] ||
                      "bg-industrial-700 text-industrial-300"
                    }`}
                  >
                    {product.category}
                  </Badge>
                  <h3 className="font-display font-bold text-white text-base mb-1">
                    {product.name}
                  </h3>
                  <p className="text-industrial-300 text-xs leading-relaxed mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-amber-500 font-bold text-xl">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                    <Button
                      size="sm"
                      onClick={() => handleAddToCart(product)}
                      disabled={!product.inStock || addToCart.isPending}
                      className="bg-amber-500 hover:bg-amber-600 text-industrial-900 font-bold text-xs uppercase tracking-wider"
                      data-ocid={`products.delete_button.${i + 1}`}
                    >
                      <ShoppingCart className="w-3 h-3 mr-1" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
