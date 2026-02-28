export default function AdminOrders() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold mb-8">Order Requests</h1>
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="p-4 text-sm font-semibold text-muted-foreground">Order #</th>
              <th className="p-4 text-sm font-semibold text-muted-foreground">Customer</th>
              <th className="p-4 text-sm font-semibold text-muted-foreground hidden md:table-cell">Product</th>
              <th className="p-4 text-sm font-semibold text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              { id: "WA-001", customer: "Lakshmi R.", product: "Kandi Podi × 2", status: "Delivered" },
              { id: "WA-002", customer: "Priya S.", product: "Palli Podi × 1", status: "Shipped" },
              { id: "WA-003", customer: "Venkat M.", product: "Combo Pack × 1", status: "Processing" },
            ].map((o) => (
              <tr key={o.id} className="border-b border-border last:border-0">
                <td className="p-4 text-sm font-medium text-foreground">{o.id}</td>
                <td className="p-4 text-sm text-muted-foreground">{o.customer}</td>
                <td className="p-4 text-sm text-muted-foreground hidden md:table-cell">{o.product}</td>
                <td className="p-4">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    o.status === "Delivered" ? "bg-primary/10 text-primary" :
                    o.status === "Shipped" ? "bg-accent/20 text-accent-foreground" :
                    "bg-muted text-muted-foreground"
                  }`}>
                    {o.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-sm text-muted-foreground mt-4">
        * These are placeholder entries. Orders from WhatsApp will be integrated once backend is connected.
      </p>
    </div>
  );
}
