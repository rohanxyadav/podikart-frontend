import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, ShoppingBag, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/products" },
  { label: "Categories", to: "/categories" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "Partner", to: "/partner" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { totalItems } = useCart();
  const { isAuthenticated } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-2xl font-bold gold-text tracking-tight">PODIKART</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-sm font-medium font-body tracking-wide transition-colors hover:text-primary ${
                location.pathname === l.to ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <Link to="/cart" className="relative p-2 hover:text-primary transition-colors text-muted-foreground">
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 gold-gradient text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          <Link to={isAuthenticated ? "/account" : "/login"} className="p-2 hover:text-primary transition-colors text-muted-foreground">
            <User className="w-5 h-5" />
          </Link>
          <a
            href="https://wa.me/919999999999?text=Hi!%20I%27d%20like%20to%20know%20more%20about%20Podikart%20products."
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="gold-gradient text-primary-foreground font-semibold shadow-lg hover:opacity-90 transition-opacity ml-1">
              <ShoppingBag className="w-4 h-4 mr-2" />
              Order Now
            </Button>
          </a>
        </div>

        {/* Mobile toggle */}
        <div className="md:hidden flex items-center gap-2">
          <Link to="/cart" className="relative p-2 text-muted-foreground hover:text-primary">
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 gold-gradient text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          <button className="text-foreground" onClick={() => setOpen(!open)}>
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-background border-b border-border px-4 pb-4">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="block py-3 text-sm font-medium text-muted-foreground hover:text-primary"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to={isAuthenticated ? "/account" : "/login"}
            className="block py-3 text-sm font-medium text-muted-foreground hover:text-primary"
            onClick={() => setOpen(false)}
          >
            {isAuthenticated ? "My Account" : "Login / Sign Up"}
          </Link>
          <a
            href="https://wa.me/919999999999?text=Hi!%20I%27d%20like%20to%20know%20more%20about%20Podikart%20products."
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="w-full mt-2 gold-gradient text-primary-foreground font-semibold">
              <ShoppingBag className="w-4 h-4 mr-2" />
              Order Now
            </Button>
          </a>
        </div>
      )}
    </nav>
  );
}
