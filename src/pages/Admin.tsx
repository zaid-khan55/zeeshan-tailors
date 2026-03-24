import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { supabase } from "@/lib/supabase";
import { Plus, Trash2, LogIn } from "lucide-react";

const AdminPanel = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<"designs" | "orders" | "custom">("designs");

  const [designs, setDesigns] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [customRequests, setCustomRequests] = useState<any[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);

  const fetchDesigns = async () => {
    const { data } = await supabase.from("designs").select("*");
    setDesigns(data || []);
  };

  const fetchOrders = async () => {
    const { data } = await supabase.from("orders").select("*");
    setOrders(data || []);
  };

  const fetchCustomRequests = async () => {
    const { data } = await supabase.from("custom_requests").select("*").order("created_at", { ascending: false });
    setCustomRequests(data || []);
  };

  useEffect(() => {
    fetchDesigns();
    fetchOrders();
    fetchCustomRequests();
  }, []);

  const deleteDesign = async (id: string) => {
    await supabase.from("designs").delete().eq("id", id);
    fetchDesigns();
  };

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("orders").update({ status }).eq("id", id);
    fetchOrders();
  };

  const updateCustomStatus = async (id: string, status: string) => {
    await supabase.from("custom_requests").update({ status }).eq("id", id);
    fetchCustomRequests();
  };

  // Tab button style helper
  const tabStyle = (tab: string) => ({
    padding: "8px 20px",
    marginRight: "8px",
    background: activeTab === tab ? "#000" : "#eee",
    color: activeTab === tab ? "#fff" : "#000",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: activeTab === tab ? "bold" : "normal",
  });

  // LOGIN
  if (!loggedIn) {
    return (
      <Layout>
        <section className="section-padding max-w-md mx-auto text-center">
          <LogIn className="w-12 h-12 text-gold mx-auto mb-6" />
          <h1 className="font-serif text-3xl mb-6">Admin Login</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (password === import.meta.env.VITE_ADMIN_PASSWORD?.trim()) {
                setLoggedIn(true);
                alert("Welcome back!");
              } else {
                alert("Incorrect password");
              }
            }}
            className="space-y-6"
          >
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full border-b border-border bg-transparent py-3 text-center focus:border-gold outline-none transition-all"
            />
            <button type="submit" className="btn-premium w-full bg-foreground text-background">
              Login
            </button>
          </form>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <div style={{ padding: "20px" }}>
        <h1 style={{ marginBottom: "20px" }}>Admin Dashboard</h1>

        {/* TABS */}
        <div style={{ marginBottom: "24px" }}>
          <button style={tabStyle("designs")} onClick={() => setActiveTab("designs")}>
            Designs ({designs.length})
          </button>
          <button style={tabStyle("orders")} onClick={() => setActiveTab("orders")}>
            Orders ({orders.length})
          </button>
          <button style={tabStyle("custom")} onClick={() => setActiveTab("custom")}>
            Custom Requests ({customRequests.length})
          </button>
        </div>

        {/* ===== DESIGNS TAB ===== */}
        {activeTab === "designs" && (
          <div>
            <button
              onClick={() => setShowAddForm(true)}
              style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 16px", background: "#000", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", marginBottom: "20px" }}
            >
              <Plus size={16} /> Add Design
            </button>

            {showAddForm && (
              <AddDesignForm
                onClose={() => {
                  setShowAddForm(false);
                  fetchDesigns();
                }}
              />
            )}

            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
              {designs.map((d) => (
                <div key={d.id} style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "8px" }}>
                  <img
                    src={d.image_url}
                    alt={d.title}
                    style={{ width: "200px", height: "250px", objectFit: "cover", borderRadius: "4px" }}
                  />
                  <h3 style={{ margin: "8px 0 4px" }}>{d.title}</h3>
                  <p style={{ color: "#666", marginBottom: "4px" }}>₹{d.price}</p>
                  <p style={{ fontSize: "12px", color: "#999" }}>{d.style} · {d.occasion}</p>
                  <button
                    onClick={() => deleteDesign(d.id)}
                    style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "8px", padding: "6px 12px", background: "#fee2e2", color: "#dc2626", border: "none", borderRadius: "4px", cursor: "pointer" }}
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== ORDERS TAB ===== */}
        {activeTab === "orders" && (
          <div>
            {orders.length === 0 && <p>No orders yet</p>}
            {orders.map((order) => (
              <div
                key={order.id}
                style={{ border: "1px solid #ccc", padding: "16px", marginBottom: "12px", borderRadius: "8px" }}
              >
                <p><b>Name:</b> {order.name}</p>
                <p><b>Phone:</b> {order.phone}</p>
                <p><b>Status:</b> {order.status}</p>
                <p><b>Delivery:</b> {order.delivery_date || "Not specified"}</p>

                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order.id, e.target.value)}
                  style={{ marginTop: "8px", padding: "4px 8px" }}
                >
                  <option value="pending">Pending</option>
                  <option value="in progress">In Progress</option>
                  <option value="ready">Ready</option>
                  <option value="delivered">Delivered</option>
                </select>

                <br /><br />

                <a
                  href={`https://wa.me/91${order.phone}?text=${encodeURIComponent(
                    "Hi " + order.name + ", your order status is now: " + order.status
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#16a34a", fontWeight: "bold" } as React.CSSProperties}
                >
                  Notify via WhatsApp
                </a>
              </div>
            ))}
          </div>
        )}

        {/* ===== CUSTOM REQUESTS TAB ===== */}
        {activeTab === "custom" && (
          <div>
            {customRequests.length === 0 && <p>No custom requests yet</p>}
            {customRequests.map((req) => (
              <div
                key={req.id}
                style={{ border: "1px solid #ccc", padding: "16px", marginBottom: "12px", borderRadius: "8px" }}
              >
                <p><b>Name:</b> {req.name}</p>
                <p><b>Phone:</b> {req.phone}</p>
                <p><b>Description:</b> {req.description}</p>
                <p><b>Budget:</b> {req.budget || "Not specified"}</p>
                <p><b>Status:</b> {req.status}</p>
                <p style={{ fontSize: "12px", color: "#999" }}>
                  {new Date(req.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </p>

                <select
                  value={req.status}
                  onChange={(e) => updateCustomStatus(req.id, e.target.value)}
                  style={{ marginTop: "8px", padding: "4px 8px" }}
                >
                  <option value="pending">Pending</option>
                  <option value="in progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="rejected">Rejected</option>
                </select>

                <br /><br />

                <a
                  href={`https://wa.me/91${req.phone}?text=${encodeURIComponent(
                    "Hi " + req.name + ", regarding your custom design request — " + req.status
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#16a34a", fontWeight: "bold" } as React.CSSProperties}
                >
                  Reply via WhatsApp
                </a>
              </div>
            ))}
          </div>
        )}

      </div>
    </Layout>
  );
};

export default AdminPanel;


// ================= ADD DESIGN FORM =================

const AddDesignForm = ({ onClose }: { onClose: () => void }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [style, setStyle] = useState("Indian");
  const [occasion, setOccasion] = useState("Wedding");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!title || !price || !file) {
      alert("All fields required");
      return;
    }

    setLoading(true);

    try {
      const fileName = `${Date.now()}-${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from("design-images")
        .upload(fileName, file);

      if (uploadError) {
        alert(uploadError.message);
        setLoading(false);
        return;
      }

      const { data } = supabase.storage.from("design-images").getPublicUrl(fileName);
      const imageUrl = data.publicUrl;

      const { error } = await supabase.from("designs").insert([
        { title, price: Number(price), image_url: imageUrl, style, occasion },
      ]);

      if (error) {
        alert(error.message);
        setLoading(false);
        return;
      }

      alert("Design Added Successfully!");
      onClose();
    } catch (err: any) {
      alert(JSON.stringify(err, null, 2));
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ marginTop: "20px", padding: "15px", border: "1px solid #ddd", borderRadius: "8px", maxWidth: "400px", background: "#fafafa", marginBottom: "20px" }}
    >
      <h3 style={{ marginBottom: "15px" }}>Add New Design</h3>

      <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} style={{ width: "100%", padding: "6px", marginBottom: "10px" }} />

      <input placeholder="Price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} style={{ width: "100%", padding: "6px", marginBottom: "10px" }} />

      <select value={style} onChange={(e) => setStyle(e.target.value)} style={{ width: "100%", padding: "6px", marginBottom: "10px" }}>
        <option value="Indian">Indian</option>
        <option value="Western">Western</option>
      </select>

      <select value={occasion} onChange={(e) => setOccasion(e.target.value)} style={{ width: "100%", padding: "6px", marginBottom: "10px" }}>
        <option value="Wedding">Wedding</option>
        <option value="Party">Party</option>
        <option value="Casual">Casual</option>
      </select>

      <input type="file" onChange={(e) => setFile(e.target.files?.[0])} style={{ marginBottom: "10px" }} />

      <div style={{ display: "flex", gap: "10px" }}>
        <button type="submit" disabled={loading} style={{ padding: "8px 16px", background: "#000", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          {loading ? "Saving..." : "Save"}
        </button>
        <button type="button" onClick={onClose} style={{ padding: "8px 16px", background: "#ccc", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          Cancel
        </button>
      </div>
    </form>
  );
};