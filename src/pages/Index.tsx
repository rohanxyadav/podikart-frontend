import heroBg from "@/assets/hero-bg.jpg";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Star, Shield, Heart, Leaf, Users, ChevronRight, MessageCircle, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import API_BASE_URL from "@/lib/api";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const trustIcons = [
  { icon: Shield, label: "100% Homemade" },
  { icon: Users, label: "Women Empowered Manufacturing" },
  { icon: Heart, label: "Hygienically Packed" },
  { icon: Leaf, label: "No Artificial Preservatives" },
];

const testimonials = [
  { name: "Lakshmi R.", location: "Hyderabad", quote: "Tastes exactly like my mother used to make. The Kandi Podi is absolutely authentic!", rating: 5 },
  { name: "Priya S.", location: "Bangalore", quote: "Finally found a healthy alternative to pickles for my kids. They love the Palli Podi!", rating: 5 },
  { name: "Venkat M.", location: "USA", quote: "As a Telugu NRI, Podikart brings the taste of home to my dining table. Premium quality!", rating: 5 },
];

const faqs = [
  { q: "How long do the podis stay fresh?", a: "Our podis have a shelf life of 2–3 months when stored in an airtight container in a cool, dry place." },
  { q: "Are these podis suitable for children?", a: "Yes! Our mild podis are perfect for children. We also have spicier variants for adults." },
  { q: "Do you deliver across India?", a: "Yes, we deliver pan-India through trusted courier partners. Order via WhatsApp for fastest processing." },
  { q: "Are any preservatives used?", a: "Absolutely not. All our podis are 100% natural with no artificial preservatives, colors, or flavors." },
  { q: "What is the best way to consume podi?", a: "Mix with hot rice and ghee/oil, use as a dry chutney with idli/dosa, or sprinkle on snacks for extra flavor." },
];

export default function Index() {
  const { data: featuredProducts = [], isLoading } = useQuery({
    queryKey: ["featured-products"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/api/products?featured=true`);
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    }
  });

  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <img src={heroBg} alt="Premium South Indian Podis" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "var(--hero-overlay)" }} />
        <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ duration: 0.8 }}>
            <span className="inline-block gold-gradient text-primary-foreground text-xs font-semibold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full mb-6">
              Homemade Authentic Podis
            </span>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-secondary-foreground leading-tight mb-4">
              Old-School Recipes.
              <br />
              <span className="gold-text">New-Age Impact.</span>
            </h1>
            <p className="text-lg md:text-xl text-secondary-foreground/80 max-w-2xl mx-auto mb-8 font-body">
              Healthy, Hygienic & Authentic Everyday Podis – A Better Alternative to Pickles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/919999999999?text=Hi!%20I%27d%20like%20to%20order%20from%20Podikart."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="gold-gradient text-primary-foreground font-bold text-base shadow-2xl hover:opacity-90 transition-opacity px-8">
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Order on WhatsApp
                </Button>
              </a>
              <Link to="/products">
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 font-semibold text-base px-8">
                  Explore Products <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-secondary py-6">
        <div className="container mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-16">
          {trustIcons.map((t) => (
            <div key={t.label} className="flex items-center gap-2 text-secondary-foreground/80">
              <t.icon className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">{t.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ duration: 0.6 }}>
            <span className="text-primary font-semibold text-sm tracking-[0.15em] uppercase">Our Story</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 mb-6 text-foreground">
              Building India's Most Loved <span className="gold-text">Podi Brand</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Podikart was born from a simple belief: every Indian household deserves access to authentic,
              hygienic, and consistently delicious podis. We're replacing oily, unhealthy pickles with
              nutrient-rich podi varieties that taste just like homemade — because they are.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ duration: 0.6 }}>
            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <div className="bg-secondary/10 rounded-2xl p-8 border border-border">
                <h3 className="font-display text-2xl font-bold text-secondary mb-4">The Problem</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex gap-2"><span className="text-secondary">✗</span> Oily, unhealthy pickles dominate Indian condiments</li>
                  <li className="flex gap-2"><span className="text-secondary">✗</span> Inconsistent taste and questionable hygiene</li>
                  <li className="flex gap-2"><span className="text-secondary">✗</span> Loaded with artificial preservatives</li>
                  <li className="flex gap-2"><span className="text-secondary">✗</span> Not suitable for daily consumption</li>
                </ul>
              </div>
              <div className="bg-primary/5 rounded-2xl p-8 border border-primary/20">
                <h3 className="font-display text-2xl font-bold text-primary mb-4">Our Solution</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex gap-2"><span className="text-primary">✓</span> Dry, healthy podis – the perfect everyday condiment</li>
                  <li className="flex gap-2"><span className="text-primary">✓</span> Consistent taste, hygienic production</li>
                  <li className="flex gap-2"><span className="text-primary">✓</span> 100% natural, zero preservatives</li>
                  <li className="flex gap-2"><span className="text-primary">✓</span> Protein-rich, nutrient-dense daily companion</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social Impact */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ duration: 0.6 }}>
            <Users className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Empowering Women, <span className="gold-text">One Podi at a Time</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed text-lg mb-6">
              Every Podikart product is handcrafted by women aged 45–65, providing dignified employment
              and fair wages. We're not just building a brand — we're building livelihoods.
            </p>
            <div className="flex justify-center gap-8 flex-wrap">
              <div className="text-center">
                <div className="font-display text-3xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Women Employed</div>
              </div>
              <div className="text-center">
                <div className="font-display text-3xl font-bold text-primary">10K+</div>
                <div className="text-sm text-muted-foreground">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="font-display text-3xl font-bold text-primary">6+</div>
                <div className="text-sm text-muted-foreground">Podi Varieties</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Best Selling Products */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-primary font-semibold text-sm tracking-[0.15em] uppercase">Bestsellers</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-3">
              Our <span className="gold-text">Best Selling</span> Podis
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {isLoading ? (
              <div className="col-span-full text-center text-muted-foreground py-10">Loading featured products...</div>
            ) : (
              featuredProducts.slice(0, 6).map((p: any) => (
                <motion.div key={p._id || p.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ duration: 0.5 }}>
                  <ProductCard product={p} />
                </motion.div>
              ))
            )}
          </div>
          <div className="text-center mt-10">
            <Link to="/products">
              <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10 font-semibold">
                View All Products <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-primary font-semibold text-sm tracking-[0.15em] uppercase">Testimonials</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-3">
              What Our <span className="gold-text">Customers Say</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <div className="bg-card border border-border rounded-xl p-6 h-full">
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic mb-4">"{t.quote}"</p>
                  <div className="text-sm font-semibold text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.location}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Opportunity */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-secondary-foreground mb-6">
            A <span className="gold-text">₹500 Crore</span> Market Opportunity
          </h2>
          <p className="text-secondary-foreground/70 text-lg mb-8">
            The Indian condiment market is evolving. Health-conscious consumers are seeking authentic,
            preservative-free alternatives. Podikart is positioned at the intersection of tradition and modern FMCG.
          </p>
          <div className="flex justify-center gap-12 flex-wrap">
            <div className="text-center">
              <div className="font-display text-2xl font-bold text-primary">30%+</div>
              <div className="text-sm text-secondary-foreground/60">Gross Margins</div>
            </div>
            <div className="text-center">
              <div className="font-display text-2xl font-bold text-primary">FMCG</div>
              <div className="text-sm text-secondary-foreground/60">Ready Model</div>
            </div>
            <div className="text-center">
              <div className="font-display text-2xl font-bold text-primary">Export</div>
              <div className="text-sm text-secondary-foreground/60">Ready Product</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <div className="text-center mb-12">
            <HelpCircle className="w-8 h-8 text-primary mx-auto mb-3" />
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              Frequently Asked <span className="gold-text">Questions</span>
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <details key={i} className="group bg-card border border-border rounded-lg">
                <summary className="cursor-pointer p-5 font-semibold text-foreground flex justify-between items-center">
                  {f.q}
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-open:rotate-90 transition-transform" />
                </summary>
                <div className="px-5 pb-5 text-muted-foreground text-sm">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ duration: 0.6 }}>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Ready to Taste <span className="gold-text">Authenticity?</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              Order your favorite podis now via WhatsApp. Quick, easy, and delivered to your doorstep.
            </p>
            <a
              href="https://wa.me/919999999999?text=Hi!%20I%27d%20like%20to%20order%20from%20Podikart."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="gold-gradient text-primary-foreground font-bold text-lg shadow-2xl hover:opacity-90 transition-opacity px-10">
                <MessageCircle className="w-5 h-5 mr-2" />
                Order on WhatsApp
              </Button>
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
