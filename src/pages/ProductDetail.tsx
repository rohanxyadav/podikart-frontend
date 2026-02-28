import { useParams, Link } from "react-router-dom";
import { getWhatsAppLink } from "@/data/products";
import { Star, ChevronLeft, ShoppingBag, ShoppingCart, Leaf, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Image } from "@imagekit/react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import API_BASE_URL from "@/lib/api";

export default function ProductDetail() {
  const { slug } = useParams();

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", slug],
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/api/products/${slug}`);
      if (!res.ok) throw new Error("Product not found");
      return res.json();
    },
    enabled: !!slug
  });
  const [selectedPack, setSelectedPack] = useState<"trial" | "value">("value");
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, selectedPack, quantity);
    toast({ title: `${product.name} added to cart!`, description: `${packLabel} × ${quantity}` });
  };

  if (isLoading) {
    return (
      <main className="pt-24 pb-20 text-center">
        <h1 className="font-display text-2xl font-bold text-muted-foreground mt-4">Loading product details...</h1>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="pt-24 pb-20 text-center">
        <h1 className="font-display text-2xl font-bold mt-4">Product not found</h1>
        <Link to="/products" className="text-primary underline mt-4 inline-block">Back to Products</Link>
      </main>
    );
  }

  const price = selectedPack === "trial" ? product.trialPrice : product.valuePrice;
  const packLabel = selectedPack === "trial" ? "Trial Pack" : "Value Pack";

  return (
    <main className="pt-24 pb-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <Link to="/products" className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary mb-8 text-sm">
          <ChevronLeft className="w-4 h-4" /> Back to Products
        </Link>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Image */}
          <div className="bg-card rounded-2xl overflow-hidden border border-border">
            <Image src={product.image} alt={product.name} className="w-full aspect-square object-cover" />
          </div>

          {/* Details */}
          <div>
            <span className="text-primary font-semibold text-xs tracking-[0.15em] uppercase">{product.category.replace(/-/g, " ")}</span>
            <h1 className="font-display text-3xl md:text-4xl font-bold mt-2 mb-2">{product.name}</h1>

            <div className="flex items-center gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-border"}`} />
              ))}
              <span className="text-sm text-muted-foreground ml-2">{product.rating} ({product.reviewCount} reviews)</span>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-6">{product.description}</p>

            {/* Pack Selection */}
            <div className="mb-6">
              <label className="text-sm font-semibold text-foreground mb-2 block">Select Pack</label>
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedPack("trial")}
                  className={`px-5 py-3 rounded-lg border text-sm font-medium transition-all ${selectedPack === "trial"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-primary/50"
                    }`}
                >
                  Trial Pack – ₹{product.trialPrice}
                </button>
                <button
                  onClick={() => setSelectedPack("value")}
                  className={`px-5 py-3 rounded-lg border text-sm font-medium transition-all ${selectedPack === "value"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-primary/50"
                    }`}
                >
                  Value Pack – ₹{product.valuePrice}
                </button>
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <label className="text-sm font-semibold text-foreground mb-2 block">Quantity</label>
              <div className="flex items-center gap-3">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-lg hover:border-primary">−</button>
                <span className="font-semibold w-8 text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-lg hover:border-primary">+</button>
                <span className="text-muted-foreground text-sm ml-3">Total: ₹{price * quantity}</span>
              </div>
            </div>

            {/* CTA */}
            <div className="flex gap-3">
              <Button size="lg" onClick={handleAddToCart} className="flex-1 gold-gradient text-primary-foreground font-bold text-base shadow-xl hover:opacity-90 transition-opacity">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart – ₹{price * quantity}
              </Button>
              <a
                href={getWhatsAppLink(product.name, packLabel, quantity)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-none"
              >
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  <ShoppingBag className="w-5 h-5" />
                </Button>
              </a>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-3 gap-4 mt-6 text-center">
              <div className="bg-card rounded-lg p-3 border border-border">
                <Leaf className="w-5 h-5 text-primary mx-auto mb-1" />
                <span className="text-xs text-muted-foreground">100% Natural</span>
              </div>
              <div className="bg-card rounded-lg p-3 border border-border">
                <Shield className="w-5 h-5 text-primary mx-auto mb-1" />
                <span className="text-xs text-muted-foreground">Hygienically Made</span>
              </div>
              <div className="bg-card rounded-lg p-3 border border-border">
                <Clock className="w-5 h-5 text-primary mx-auto mb-1" />
                <span className="text-xs text-muted-foreground">{product.shelfLife} Shelf Life</span>
              </div>
            </div>
          </div>
        </div>

        {/* Extended Info */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-card rounded-xl p-6 border border-border">
            <h3 className="font-display text-lg font-bold mb-3">Ingredients</h3>
            <ul className="space-y-1">{product.ingredients.map((i) => <li key={i} className="text-sm text-muted-foreground">• {i}</li>)}</ul>
          </div>
          <div className="bg-card rounded-xl p-6 border border-border">
            <h3 className="font-display text-lg font-bold mb-3">Benefits</h3>
            <ul className="space-y-1">{product.benefits.map((b) => <li key={b} className="text-sm text-muted-foreground">• {b}</li>)}</ul>
          </div>
          <div className="bg-card rounded-xl p-6 border border-border">
            <h3 className="font-display text-lg font-bold mb-3">How to Use</h3>
            <ul className="space-y-1">{product.usage.map((u) => <li key={u} className="text-sm text-muted-foreground">• {u}</li>)}</ul>
          </div>
        </div>

        {/* Reviews placeholder */}
        <div className="mt-16">
          <h2 className="font-display text-2xl font-bold mb-6">Customer Reviews</h2>
          <div className="bg-card rounded-xl p-8 border border-border text-center text-muted-foreground">
            <Star className="w-10 h-10 text-primary mx-auto mb-3" />
            <p className="font-semibold text-foreground text-lg">{product.rating} out of 5</p>
            <p className="text-sm">Based on {product.reviewCount} reviews</p>
            <p className="mt-4 text-sm">Detailed reviews section coming soon!</p>
          </div>
        </div>
      </div>
    </main>
  );
}
