import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import API_BASE_URL from "@/lib/api";

export default function AdminCategories() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/api/categories`);
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    }
  });

  const createCategory = useMutation({
    mutationFn: async (newCategory: any) => {
      const userStr = localStorage.getItem('user');
      const token = userStr ? JSON.parse(userStr).token : '';
      const res = await fetch(`${API_BASE_URL}/api/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(newCategory),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.message || "Failed to create category");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      setName("");
      setSlug("");
      setDescription("");
      toast({ title: "Category added successfully!" });
    },
    onError: (err: any) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  });

  const deleteCategory = useMutation({
    mutationFn: async (id: string) => {
      const userStr = localStorage.getItem('user');
      const token = userStr ? JSON.parse(userStr).token : '';
      const res = await fetch(`${API_BASE_URL}/api/categories/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete category");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast({ title: "Category deleted!" });
    }
  });

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !slug) return;
    createCategory.mutate({ name, slug, description });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-2xl font-bold">Categories</h1>
      </div>

      <div className="bg-card border border-border rounded-xl p-6 mb-8">
        <h3 className="font-semibold text-lg mb-4">Add New Category</h3>
        <form onSubmit={handleAddCategory} className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="text-sm font-medium">Name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Traditional Andhra" required />
          </div>
          <div>
            <label className="text-sm font-medium">Slug</label>
            <Input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="e.g. traditional-andhra" required />
          </div>
          <div>
            <label className="text-sm font-medium">Description</label>
            <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Short desc" />
          </div>
          <Button type="submit" disabled={createCategory.isPending} className="gold-gradient text-primary-foreground font-semibold">
            <Plus className="w-4 h-4 mr-2" /> Add Category
          </Button>
        </form>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {isLoading ? (
          <div className="col-span-2 text-center text-muted-foreground p-8">Loading categories...</div>
        ) : categories.map((c: any) => (
          <div key={c._id || c.id} className="bg-card border border-border rounded-xl p-5 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground">{c.name}</h3>
              <p className="text-sm text-muted-foreground">{c.description}</p>
              <p className="text-xs text-muted-foreground mt-1 text-primary">Slug: {c.slug}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => deleteCategory.mutate(c._id)} className="p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-destructive">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
