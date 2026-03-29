import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShoppingBag, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import {
  useAllProducts,
  useCart,
  useClearCart,
  useRemoveFromCart,
} from "../hooks/useQueries";
import { getProductImage } from "../utils/imageMap";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  sessionId: string;
}

export default function CartDrawer({
  open,
  onClose,
  sessionId,
}: CartDrawerProps) {
  const { data: cartItems = [] } = useCart(sessionId);
  const { data: allProducts = [] } = useAllProducts();
  const removeFromCart = useRemoveFromCart(sessionId);
  const clearCart = useClearCart(sessionId);

  const getProduct = (productId: bigint) =>
    allProducts.find((p) => p.id === productId);

  const total = cartItems.reduce((sum, item) => {
    const product = getProduct(item.productId);
    return sum + (product?.price || 0) * Number(item.quantity);
  }, 0);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-industrial-900 border-l border-industrial-700 z-50 flex flex-col"
            data-ocid="cart.panel"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-industrial-700">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-amber-500" />
                <h2 className="font-display font-bold text-white uppercase tracking-wide">
                  Cart
                </h2>
                <span className="bg-amber-500 text-industrial-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.reduce((s, i) => s + Number(i.quantity), 0)}
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="text-industrial-400 hover:text-white transition-colors"
                data-ocid="cart.close_button"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart items */}
            {cartItems.length === 0 ? (
              <div
                className="flex-1 flex flex-col items-center justify-center text-industrial-400"
                data-ocid="cart.empty_state"
              >
                <ShoppingBag className="w-16 h-16 opacity-20 mb-4" />
                <p className="font-medium">Your cart is empty</p>
                <p className="text-sm mt-1">Add some safety equipment!</p>
              </div>
            ) : (
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {cartItems.map((item, i) => {
                    const product = getProduct(item.productId);
                    if (!product) return null;
                    return (
                      <div
                        key={String(item.productId)}
                        className="flex gap-3 bg-industrial-800 rounded-lg p-3"
                        data-ocid={`cart.item.${i + 1}`}
                      >
                        <img
                          src={getProductImage(product.imageUrl)}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-medium truncate">
                            {product.name}
                          </p>
                          <p className="text-amber-500 text-sm font-bold">
                            ${product.price.toFixed(2)}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-industrial-300 text-xs">
                              Qty: {String(item.quantity)}
                            </span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart.mutate(item.productId)}
                          className="text-industrial-400 hover:text-red-400 transition-colors"
                          data-ocid={`cart.delete_button.${i + 1}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            )}

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-4 border-t border-industrial-700 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-industrial-300 font-medium">Total</span>
                  <span className="text-amber-500 text-xl font-display font-bold">
                    ${total.toFixed(2)}
                  </span>
                </div>
                <Button
                  className="w-full bg-amber-500 hover:bg-amber-600 text-industrial-900 font-bold uppercase tracking-wider"
                  data-ocid="cart.primary_button"
                >
                  Checkout
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => clearCart.mutate()}
                  className="w-full border-industrial-600 text-industrial-300 hover:text-red-400 hover:border-red-400 uppercase text-xs tracking-wider"
                  data-ocid="cart.delete_button"
                >
                  <Trash2 className="w-3 h-3 mr-2" />
                  Clear Cart
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
