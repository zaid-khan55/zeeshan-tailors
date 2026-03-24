import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { Upload, CheckCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";

const CustomDesign = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", description: "", budget: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.phone.trim() || !form.description.trim()) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);

    // Save to Supabase
    const { data: insertData, error } = await supabase.from("custom_requests").insert([
      {
        name: form.name,
        phone: form.phone,
        description: form.description,
        budget: form.budget || null,
        status: "pending",
      },
    ]);

console.log("INSERT RESULT:", insertData, "ERROR:", error);

    if (error) {
      alert("Failed to submit request. Please try again.");
      console.error(error);
      setLoading(false);
      return;
    }

    // WhatsApp notification to admin
    const adminNumber = import.meta.env.VITE_ADMIN_PHONE;
    const message = `*New Custom Design Request*

Name: ${form.name}
Phone: ${form.phone}

Description: ${form.description}
Budget: ${form.budget || "Not specified"}`;

    const whatsappUrl = `https://wa.me/${adminNumber}?text=${encodeURIComponent(message)}`;
    const newWindow = window.open(whatsappUrl, "_blank");
    if (!newWindow) alert("Please allow popups to notify via WhatsApp");

    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Layout>
        <section className="section-padding max-w-2xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <CheckCircle className="w-16 h-16 text-gold mx-auto mb-6" />
            <h1 className="font-serif text-4xl mb-4">Request Submitted</h1>
            <p className="text-muted-foreground mb-8">
              Your masterpiece is now in our hands. We will notify you via WhatsApp shortly.
            </p>
            <button
              onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", description: "", budget: "" }); }}
              className="btn-premium bg-foreground text-background"
            >
              Submit Another Request
            </button>
          </motion.div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="section-padding max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="gold-line mx-auto mb-4" />
          <h1 className="font-serif text-4xl md:text-5xl mb-4">Custom Design</h1>
          <p className="text-muted-foreground">Have a design in mind? Share it with us and we'll bring it to life.</p>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="p-8 md:p-12 gold-border bg-background rounded-sm space-y-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Your Name *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="border-b border-border bg-transparent py-2 focus:border-gold outline-none transition-all"
                placeholder="Full name"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Phone Number *</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="border-b border-border bg-transparent py-2 focus:border-gold outline-none transition-all"
                placeholder="+91 XXXXX XXXXX"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Design Description *</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={4}
              className="border-b border-border bg-transparent py-2 focus:border-gold outline-none transition-all resize-none"
              placeholder="Describe your dream outfit — style, fabric, color preferences..."
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Budget Range</label>
            <input
              type="text"
              value={form.budget}
              onChange={(e) => setForm({ ...form, budget: e.target.value })}
              className="border-b border-border bg-transparent py-2 focus:border-gold outline-none transition-all"
              placeholder="e.g., ₹5,000 - ₹10,000"
            />
          </div>

          <div className="gold-border border-dashed p-8 text-center rounded-sm">
            <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">Upload reference images (coming soon)</p>
            <p className="text-xs text-muted-foreground/50 mt-1">For now, share images via WhatsApp</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-premium w-full bg-foreground text-background hover:bg-gold hover:text-foreground disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Start Your Fitting"}
          </button>
        </motion.form>
      </section>
    </Layout>
  );
};

export default CustomDesign;