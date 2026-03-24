import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { CheckCircle } from "lucide-react";
import { toast } from "sonner";

const fields = ["Bust", "Waist", "Hip", "Shoulder", "Length", "Sleeve"] as const;

const MeasurementsPage = () => {
  const [saved, setSaved] = useState(false);
  const [measurements, setMeasurements] = useState<Record<string, string>>(
    Object.fromEntries(fields.map((f) => [f, ""]))
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const hasAny = Object.values(measurements).some((v) => v.trim() !== "");
    if (!hasAny) {
      alert("Please enter at least one measurement");
      return;
    }
    setSaved(true);
    alert("Measurement profile saved!");
  };

  if (saved) {
    return (
      <Layout>
        <section className="section-padding max-w-2xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <CheckCircle className="w-16 h-16 text-gold mx-auto mb-6" />
            <h1 className="font-serif text-4xl mb-4">Profile Saved</h1>
            <p className="text-muted-foreground mb-8">Your measurements are saved for future orders.</p>
            <button onClick={() => setSaved(false)} className="btn-premium bg-foreground text-background">
              Edit Measurements
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
          <h1 className="font-serif text-4xl md:text-5xl mb-4">Your Fit Profile</h1>
          <p className="text-muted-foreground">Save your measurements for a perfect fit every time.</p>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="p-8 md:p-12 gold-border bg-background rounded-sm"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {fields.map((field) => (
              <div key={field} className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
                  {field} (inches)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={measurements[field]}
                  onChange={(e) => setMeasurements({ ...measurements, [field]: e.target.value })}
                  className="border-b border-border bg-transparent py-2 focus:border-gold outline-none transition-all tabular-nums"
                  placeholder="0.0"
                />
              </div>
            ))}
          </div>

          <button type="submit" className="btn-premium w-full bg-foreground text-background hover:bg-gold hover:text-foreground">
            Save Measurement Profile
          </button>
        </motion.form>
      </section>
    </Layout>
  );
};

export default MeasurementsPage;
