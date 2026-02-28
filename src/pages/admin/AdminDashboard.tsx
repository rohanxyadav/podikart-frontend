import { Package, ShoppingCart, Users, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function AdminDashboard() {
  const { data: statsData, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const userStr = localStorage.getItem('user');
      const token = userStr ? JSON.parse(userStr).token : '';
      const res = await fetch("http://localhost:5000/api/admin/stats", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Failed to fetch stats");
      return res.json();
    }
  });

  const stats = [
    { label: "Total Products", value: statsData?.totalProducts || 0, icon: Package, change: "Live from DB" },
    { label: "WhatsApp Orders", value: statsData?.totalOrders || 0, icon: ShoppingCart, change: "Manual tracking" },
    { label: "Customers", value: statsData?.totalUsers || 0, icon: Users, change: "Registered users" },
    { label: "Revenue", value: `₹${statsData?.totalRevenue || 0}`, icon: TrendingUp, change: "Est. revenue" },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold mb-8">Dashboard</h1>

      {isLoading ? (
        <div className="text-muted-foreground p-8 text-center">Loading live stats...</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((s) => (
            <div key={s.label} className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">{s.label}</span>
                <s.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground">{s.value}</div>
              <div className="text-xs text-primary mt-1">{s.change}</div>
            </div>
          ))}
        </div>
      )}
      <div className="bg-card border border-border rounded-xl p-8 text-center text-muted-foreground">
        <p className="font-semibold text-foreground mb-2">ImageKit Note</p>
        <p className="text-sm">We are preparing to integrate ImageKit for product photo uploads.</p>
      </div>
    </div>
  );
}
