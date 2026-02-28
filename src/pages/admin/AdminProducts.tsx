import { Edit, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Image } from "@imagekit/react";

export default function AdminProducts() {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["admin-products"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/api/products");
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    }
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-2xl font-bold">Products</h1>
        <Link to="/admin/products/new">
          <Button className="gold-gradient text-primary-foreground font-semibold">
            <Plus className="w-4 h-4 mr-2" /> Add Product
          </Button>
        </Link>
      </div>
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="p-4 text-sm font-semibold text-muted-foreground">Product</th>
              <th className="p-4 text-sm font-semibold text-muted-foreground hidden md:table-cell">Category</th>
              <th className="p-4 text-sm font-semibold text-muted-foreground">Price</th>
              <th className="p-4 text-sm font-semibold text-muted-foreground hidden md:table-cell">Rating</th>
              <th className="p-4 text-sm font-semibold text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={5} className="p-4 text-center text-muted-foreground">Loading products...</td></tr>
            ) : products.map((p: any) => {
              return (
                <tr key={p._id || p.id} className="border-b border-border last:border-0">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Image src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                      <span className="font-medium text-sm text-foreground">{p.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground hidden md:table-cell capitalize">{p.category.replace(/-/g, " ")}</td>
                  <td className="p-4 text-sm text-foreground">₹{p.trialPrice}–₹{p.valuePrice}</td>
                  <td className="p-4 text-sm text-muted-foreground hidden md:table-cell">{p.rating} ⭐</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-primary"><Edit className="w-4 h-4" /></button>
                      <button className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
