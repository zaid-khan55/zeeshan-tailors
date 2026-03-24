import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { CheckCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";

const Booking = () => {
  const [searchParams] = useSearchParams();
  const preselectedDesign = searchParams.get("design") || "";

  const [submitted, setSubmitted] = useState(false);
  const [designs, setDesigns] = useState<any[]>([]);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    designId: preselectedDesign,
    bust: "",
    waist: "",
    hip: "",
    length: "",
    sleeve: "",
    deliveryDate: "",
    urgent: false,
  });

  useEffect(() => {
    const fetchDesigns = async () => {
      const { data } = await supabase.from("designs").select("*");
      setDesigns(data || []);
    };
    fetchDesigns();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.phone.trim() || !form.designId) {
      alert("Please fill all required fields");
      return;
    }

    const selectedDesign = designs.find((d) => d.id == form.designId);
    const designName = selectedDesign?.title || "Unknown";

    const { error } = await supabase.from("orders").insert([
      {
        name: form.name,
        phone: form.phone,
        design_id: form.designId,
        status: "pending",
        delivery_date: form.deliveryDate || null,
      },
    ]);

    if (error) {
      alert("Failed to place order");
      return;
    }

    const adminNumber = import.meta.env.VITE_ADMIN_PHONE;
    const message = `*New Order Received*

    Name: ${form.name}
    Phone: ${form.phone}

    Design: ${designName}
    Design ID: ${form.designId}

    Delivery: ${form.deliveryDate || "Not specified"}
    Urgent: ${form.urgent ? "Yes" : "No"}`;

    const whatsappUrl = `https://wa.me/${adminNumber}?text=${encodeURIComponent(message)}`;
    const newWindow = window.open(whatsappUrl, "_blank");
    if (!newWindow) alert("Please allow popups");

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Layout>
        <section className="section-padding max-w-2xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <CheckCircle className="w-16 h-16 text-gold mx-auto mb-6" />
            <h1 className="font-serif text-4xl mb-4">Order Confirmed</h1>
            <p className="text-muted-foreground mb-8">
              Your order has been placed. Please confirm via WhatsApp.
            </p>
          </motion.div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="section-padding max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="gold-line mx-auto mb-4" />
          <h1 className="font-serif text-4xl md:text-5xl mb-4">Book Your Order</h1>
          <p className="text-muted-foreground">
            Select a design, enter your measurements, and choose a delivery date.
          </p>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 md:p-12 gold-border bg-background rounded-sm space-y-8"
        >
          {/* Name + Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
                Your Name *
              </label>
              <input
                type="text"
                placeholder="Full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="border-b border-border bg-transparent py-2 focus:border-gold outline-none transition-all"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
                Phone *
              </label>
              <input
                type="tel"
                placeholder="+91 XXXXX XXXXX"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="border-b border-border bg-transparent py-2 focus:border-gold outline-none transition-all"
              />
            </div>
          </div>

          {/* Design */}
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
              Select Design *
            </label>
            <select
              value={form.designId}
              onChange={(e) => setForm({ ...form, designId: e.target.value })}
              className="border-b border-border bg-transparent py-2 focus:border-gold outline-none transition-all"
            >
              <option value="">Choose a design...</option>
              {designs.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.title}
                </option>
              ))}
            </select>
          </div>

          {/* Measurements */}
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-4">
              Your Measurements
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { key: "bust", label: "Bust" },
                { key: "waist", label: "Waist" },
                { key: "hip", label: "Hip" },
                { key: "length", label: "Length" },
                { key: "sleeve", label: "Sleeve" },
              ].map((m) => (
                <div key={m.key} className="flex flex-col gap-1">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground">
                    {m.label}
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    value={form[m.key as keyof typeof form] as string}
                    onChange={(e) => setForm({ ...form, [m.key]: e.target.value })}
                    className="border-b border-border bg-transparent py-2 focus:border-gold outline-none transition-all w-full"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Date + Urgent */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
                Delivery Date
              </label>
              <input
                type="date"
                value={form.deliveryDate}
                onChange={(e) => setForm({ ...form, deliveryDate: e.target.value })}
                className="border-b border-border bg-transparent py-2 focus:border-gold outline-none transition-all"
              />
            </div>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.urgent}
                onChange={(e) => setForm({ ...form, urgent: e.target.checked })}
                className="w-4 h-4"
              />
              <span className="text-sm text-muted-foreground">
                Urgent Stitching (additional charges may apply)
              </span>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn-premium w-full bg-foreground text-background hover:bg-gold hover:text-foreground"
          >
            Confirm Order
          </button>
        </motion.form>
      </section>
    </Layout>
  );
};

export default Booking;