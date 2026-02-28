import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ImagePlus, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export default function AdminAddProduct() {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    const { data: categories = [] } = useQuery({
        queryKey: ["admin-categories"],
        queryFn: async () => {
            const res = await fetch("http://localhost:5000/api/categories");
            if (!res.ok) throw new Error("Failed to fetch");
            return res.json();
        }
    });

    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        shortDescription: "",
        description: "",
        category: "",
        trialPrice: "",
        valuePrice: "",
        ingredients: "",
        benefits: "",
        usage: "",
        shelfLife: "3 months",
    });
    const [image, setImage] = useState<File | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const form = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (['ingredients', 'benefits', 'usage'].includes(key)) {
                    // split by comma and trim
                    form.append(key, JSON.stringify(value.split(',').map((item) => item.trim())));
                } else {
                    form.append(key, value);
                }
            });

            if (image) {
                form.append("image", image);
            }

            // Note: Assuming token is stored in localStorage by your frontend auth implementation.
            // Or you might use cookies if backend sends it as httpOnly.
            const userStr = localStorage.getItem('user');
            const token = userStr ? JSON.parse(userStr).token : '';

            const res = await fetch('http://localhost:5000/api/products', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: form,
            });

            if (res.ok) {
                toast({ title: "Product created successfully!" });
                navigate('/admin/products');
            } else {
                const data = await res.json();
                throw new Error(data.message || 'Failed to create product');
            }
        } catch (err: any) {
            toast({ title: "Error", description: err.message, variant: "destructive" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
                <Package className="w-8 h-8 text-primary" />
                <h1 className="font-display text-2xl font-bold">Add New Product</h1>
            </div>

            <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-6 md:p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="name">Product Name</Label>
                            <Input id="name" value={formData.name} onChange={handleChange} placeholder="e.g. Kandi Podi" required className="mt-1.5" />
                        </div>
                        <div>
                            <Label htmlFor="slug">Slug</Label>
                            <Input id="slug" value={formData.slug} onChange={handleChange} placeholder="e.g. kandi-podi" required className="mt-1.5" />
                        </div>
                        <div>
                            <Label htmlFor="category">Category</Label>
                            <select
                                id="category"
                                value={formData.category}
                                onChange={(e: any) => handleChange(e)}
                                required
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1.5"
                            >
                                <option value="" disabled>Select a category</option>
                                {categories.map((c: any) => (
                                    <option key={c._id || c.id} value={c.slug}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="trialPrice">Trial Price (₹)</Label>
                                <Input id="trialPrice" type="number" value={formData.trialPrice} onChange={handleChange} placeholder="100" required className="mt-1.5" />
                            </div>
                            <div>
                                <Label htmlFor="valuePrice">Value Price (₹)</Label>
                                <Input id="valuePrice" type="number" value={formData.valuePrice} onChange={handleChange} placeholder="150" required className="mt-1.5" />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="shelfLife">Shelf Life</Label>
                            <Input id="shelfLife" value={formData.shelfLife} onChange={handleChange} placeholder="e.g. 3 months" required className="mt-1.5" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="image">Product Image</Label>
                            <div className="relative mt-1.5 border-2 border-dashed border-border rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-muted/50 transition-colors">
                                <ImagePlus className="w-8 h-8 text-muted-foreground mb-3" />
                                <p className="text-sm font-medium">Click to upload image</p>
                                <p className="text-xs text-muted-foreground mt-1">PNG, JPG, WEBP up to 5MB</p>
                                <input
                                    type="file"
                                    id="image"
                                    accept="image/*"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    onChange={handleFileChange}
                                />
                            </div>
                            {image && <p className="text-sm text-green-600 mt-2">Selected: {image.name}</p>}
                        </div>

                        <div>
                            <Label htmlFor="shortDescription">Short Description</Label>
                            <Input id="shortDescription" value={formData.shortDescription} onChange={handleChange} placeholder="Brief summary for cards" required className="mt-1.5" />
                        </div>
                    </div>
                </div>

                <div className="space-y-4 pt-6 border-t border-border">
                    <div>
                        <Label htmlFor="description">Full Description</Label>
                        <Textarea id="description" value={formData.description} onChange={handleChange} placeholder="Detailed product description..." required className="mt-1.5 min-h-[120px]" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <Label htmlFor="ingredients">Ingredients (comma-separated)</Label>
                            <Input id="ingredients" value={formData.ingredients} onChange={handleChange} placeholder="Dal, Chili, Salt..." required className="mt-1.5" />
                        </div>
                        <div>
                            <Label htmlFor="benefits">Benefits (comma-separated)</Label>
                            <Input id="benefits" value={formData.benefits} onChange={handleChange} placeholder="Rich in Iron, Healthy..." required className="mt-1.5" />
                        </div>
                        <div>
                            <Label htmlFor="usage">Usage (comma-separated)</Label>
                            <Input id="usage" value={formData.usage} onChange={handleChange} placeholder="With rice, with idli..." required className="mt-1.5" />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-6">
                    <Button type="submit" disabled={loading} className="gold-gradient text-primary-foreground font-bold shadow-lg md:w-auto w-full">
                        {loading ? 'Creating...' : 'Create Product'}
                    </Button>
                </div>
            </form>
        </div>
    );
}
