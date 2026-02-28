import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import API_BASE_URL from "@/lib/api";

export default function CategoriesPage() {
  const { data: categories = [], isLoading: isLoadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/api/categories`);
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    }
  });

  const { data: allProducts = [] } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/api/products`);
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    }
  });

  return (
    <main className="pt-24 pb-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-primary font-semibold text-sm tracking-[0.15em] uppercase">Browse By Type</span>
          <h1 className="font-display text-3xl md:text-4xl font-bold mt-3 mb-4">
            Podi <span className="gold-text">Categories</span>
          </h1>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {isLoadingCategories ? (
            <div className="col-span-full text-center text-muted-foreground py-10">Loading categories...</div>
          ) : categories.map((c: any) => (
            <Link
              key={c._id || c.id}
              to={`/products?category=${c.slug}`}
              className="group bg-card border border-border rounded-xl p-8 hover:border-primary/50 hover:shadow-lg transition-all"
            >
              <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                {c.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">{c.description}</p>
              <span className="text-xs text-primary font-semibold">{allProducts.filter((p: any) => p.category === c.slug).length} Products →</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
