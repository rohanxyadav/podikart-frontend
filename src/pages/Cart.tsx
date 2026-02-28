import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/data/products";

export default function Cart() {
  const { items, updateQuantity, removeFromCart, clearCart, totalPrice, totalItems } = useCart();

  const getWhatsAppOrderLink = () => {
    const lines = items.map(
      (i) =>
        `• ${i.product.name} (${i.pack === "trial" ? "Trial Pack" : "Value Pack"}) x${i.quantity}`
    );
    const message = encodeURIComponent(
      `Hi! I'd like to place an order from Podikart:\n\n${lines.join("\n")}\n\nTotal: ₹${totalPrice}\n\nPlease confirm availability and total.`
    );
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
  };

  if (items.length === 0) {
    return (
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-2xl text-center py-20">
          <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="font-display text-2xl font-bold mb-2">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-6">Add some delicious podis to get started!</p>
          <Link to="/products">
            <Button className="gold-gradient text-primary-foreground font-semibold">Browse Products</Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-24 pb-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <Link to="/products" className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary mb-6 text-sm">
          <ArrowLeft className="w-4 h-4" /> Continue Shopping
        </Link>
        <h1 className="font-display text-3xl font-bold mb-8">Your <span className="gold-text">Cart</span></h1>

        <div className="space-y-4 mb-8">
          {items.map((item) => {
            const price = item.pack === "trial" ? item.product.trialPrice : item.product.valuePrice;
            return (
              <div key={`${item.product.id}-${item.pack}`} className="flex items-center gap-4 bg-card border border-border rounded-xl p-4">
                <img src={item.product.image} alt={item.product.name} className="w-20 h-20 object-cover rounded-lg" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-bold text-foreground truncate">{item.product.name}</h3>
                  <p className="text-sm text-muted-foreground">{item.pack === "trial" ? "Trial Pack" : "Value Pack"} – ₹{price}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateQuantity(item.product.id, item.pack, item.quantity - 1)} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:border-primary">
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="font-semibold w-6 text-center text-sm">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.product.id, item.pack, item.quantity + 1)} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:border-primary">
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
                <span className="font-bold text-foreground w-16 text-right">₹{price * item.quantity}</span>
                <button onClick={() => removeFromCart(item.product.id, item.pack)} className="text-muted-foreground hover:text-destructive">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-muted-foreground">Items ({totalItems})</span>
            <span className="font-semibold">₹{totalPrice}</span>
          </div>
          <div className="flex justify-between items-center mb-4 text-lg">
            <span className="font-display font-bold">Total</span>
            <span className="font-display font-bold gold-text">₹{totalPrice}</span>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={clearCart} className="text-sm">Clear Cart</Button>
            <a href={getWhatsAppOrderLink()} target="_blank" rel="noopener noreferrer" className="flex-1">
              <Button className="w-full gold-gradient text-primary-foreground font-bold shadow-xl hover:opacity-90">
                <ShoppingBag className="w-5 h-5 mr-2" />
                Order on WhatsApp – ₹{totalPrice}
              </Button>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
