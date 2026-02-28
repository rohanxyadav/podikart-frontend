import { useAuth } from "@/contexts/AuthContext";
import { Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User, Mail, Phone, ShoppingBag, LogOut, Package } from "lucide-react";

export default function Account() {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <main className="pt-24 pb-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <h1 className="font-display text-3xl font-bold mb-8">My <span className="gold-text">Account</span></h1>

        {/* Profile Card */}
        <div className="bg-card border border-border rounded-xl p-6 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full gold-gradient flex items-center justify-center">
              <User className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold">{user?.name}</h2>
              <p className="text-muted-foreground text-sm">Podikart Customer</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">{user?.email}</span>
            </div>
            {user?.phone && (
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">{user?.phone}</span>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <Link to="/cart" className="bg-card border border-border rounded-xl p-5 hover:border-primary transition-colors group">
            <ShoppingBag className="w-6 h-6 text-primary mb-2" />
            <h3 className="font-display font-bold group-hover:text-primary transition-colors">My Cart</h3>
            <p className="text-sm text-muted-foreground">View items in your cart</p>
          </Link>
          <Link to="/products" className="bg-card border border-border rounded-xl p-5 hover:border-primary transition-colors group">
            <Package className="w-6 h-6 text-primary mb-2" />
            <h3 className="font-display font-bold group-hover:text-primary transition-colors">Browse Products</h3>
            <p className="text-sm text-muted-foreground">Explore our podi collection</p>
          </Link>
        </div>

        {/* Order History Placeholder */}
        <div className="bg-card border border-border rounded-xl p-6 mb-6">
          <h3 className="font-display text-lg font-bold mb-3">Order History</h3>
          <div className="text-center py-8 text-muted-foreground">
            <ShoppingBag className="w-10 h-10 mx-auto mb-2 text-muted-foreground/50" />
            <p className="text-sm">No orders yet. Start shopping!</p>
          </div>
        </div>

        <Button variant="outline" onClick={logout} className="text-destructive border-destructive/30 hover:bg-destructive/10">
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </main>
  );
}
