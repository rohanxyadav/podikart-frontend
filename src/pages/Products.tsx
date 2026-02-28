import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function CategoryRow({ categoryId, categoryName, categoryDescription, categoryProducts }: { categoryId: string; categoryName: string; categoryDescription: string, categoryProducts: any[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!categoryProducts || categoryProducts.length === 0) return null;

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      const amount = 320;
      scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
    }
  };

  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ duration: 0.5 }} className="mb-14">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">{categoryName}</h2>
          <p className="text-muted-foreground text-sm mt-1">{categoryDescription}</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button onClick={() => scroll("left")} className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-primary/10 hover:border-primary text-muted-foreground hover:text-primary transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={() => scroll("right")} className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-primary/10 hover:border-primary text-muted-foreground hover:text-primary transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div ref={scrollRef} className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
        {categoryProducts.map((p) => (
          <div key={p._id || p.id} className="min-w-[280px] max-w-[300px] snap-start shrink-0">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function ProductsPage() {
  const [searchParams] = useSearchParams();
  const filterCategory = searchParams.get("category");

  const { data: allProducts = [], isLoading: isLoadingProducts } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/api/products");
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    }
  });

  const { data: categories = [], isLoading: isLoadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/api/categories");
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    }
  });

  const displayCategories = filterCategory
    ? categories.filter((c: any) => c.slug === filterCategory)
    : categories;

  if (isLoadingProducts || isLoadingCategories) {
    return <main className="pt-24 pb-20 text-center text-muted-foreground">Loading products...</main>;
  }

  return (
    <main className="pt-24 pb-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-primary font-semibold text-sm tracking-[0.15em] uppercase">Our Collection</span>
          <h1 className="font-display text-3xl md:text-4xl font-bold mt-3 mb-4">
            All <span className="gold-text">Premium Podis</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Explore our range of authentic, homemade podis crafted with love and tradition — browse by category.
          </p>
        </div>

        {displayCategories.map((c: any) => (
          <CategoryRow
            key={c._id || c.id}
            categoryId={c.slug}
            categoryName={c.name}
            categoryDescription={c.description}
            categoryProducts={allProducts.filter((p: any) => p.category === c.slug)}
          />
        ))}
      </div>
    </main>
  );
}
