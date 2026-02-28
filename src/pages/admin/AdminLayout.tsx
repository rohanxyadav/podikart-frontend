import { Link, Outlet, useLocation } from "react-router-dom";
import { LayoutDashboard, Package, Tag, Image, ShoppingCart, Settings } from "lucide-react";

const sidebarLinks = [
  { label: "Dashboard", to: "/admin", icon: LayoutDashboard },
  { label: "Products", to: "/admin/products", icon: Package },
  { label: "Add Product", to: "/admin/products/new", icon: Package },
  { label: "Categories", to: "/admin/categories", icon: Tag },
  { label: "Banners", to: "/admin/banners", icon: Image },
  { label: "Orders", to: "/admin/orders", icon: ShoppingCart },
];

export default function AdminLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card hidden md:flex flex-col">
        <div className="p-6 border-b border-border">
          <Link to="/" className="font-display text-xl font-bold gold-text">PODIKART</Link>
          <p className="text-xs text-muted-foreground mt-1">Admin Panel</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {sidebarLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${location.pathname === l.to ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
            >
              <l.icon className="w-4 h-4" />
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-border">
          <Link to="/" className="text-xs text-muted-foreground hover:text-primary">← Back to Store</Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 p-6 lg:p-10 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
