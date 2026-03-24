import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { Phone, MessageCircle, MapPin, Mail, CheckCircle } from "lucide-react";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) {
      alert("Please fill all required fields");
      return;
    }
    setSubmitted(true);
    alert("Message sent! We'll get back to you soon.");
  };

  return (
    <Layout>
      <section className="section-padding max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="gold-line mx-auto mb-4" />
          <h1 className="font-serif text-4xl md:text-5xl mb-4">Get in Touch</h1>
          <p className="text-muted-foreground">We'd love to hear from you.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <div className="space-y-6">
              {[
                { icon: Phone, label: "Phone", value: `+${import.meta.env.VITE_ADMIN_PHONE}`, href: `tel:+${import.meta.env.VITE_ADMIN_PHONE}` },
                { icon: MessageCircle, label: "WhatsApp", value: "Chat with us", href: `https://wa.me/${import.meta.env.VITE_ADMIN_PHONE}` },
                { icon: Mail, label: "Email", value: "hello@zeeshantailors.com", href: "mailto:hello@zeeshantailors.com" },
                { icon: MapPin, label: "Address", value: "Peela Talab, Rampur, Uttar Pradesh, India", href: "#map" },
              ].map((item) => (
                <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 gold-border rounded-sm hover:bg-secondary transition-colors">
                  <item.icon className="w-5 h-5 text-gold shrink-0" />
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">{item.label}</p>
                    <p className="font-medium">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Map */}
            <div id="map" className="gold-border rounded-sm overflow-hidden aspect-video">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d244.56170413203262!2d79.03210304159167!3d28.804360329532415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390a8d47ca5617cb%3A0x8816d7802232ba03!2sPeela%20Talab%2C%20Rampur%2C%20Uttar%20Pradesh%20244901!5e0!3m2!1sen!2sin!4v1773756861164!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Zeeshan Tailors Location"
              />
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            {submitted ? (
              <div className="p-12 gold-border rounded-sm text-center">
                <CheckCircle className="w-16 h-16 text-gold mx-auto mb-6" />
                <h2 className="font-serif text-3xl mb-4">Message Sent</h2>
                <p className="text-muted-foreground mb-6">We'll get back to you shortly.</p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", email: "", message: "" }); }}
                  className="btn-premium bg-foreground text-background"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 md:p-12 gold-border rounded-sm space-y-6">
                <h2 className="font-serif text-2xl mb-4">Send a Message</h2>
                {[
                  { key: "name", label: "Your Name *", type: "text", placeholder: "Full name" },
                  { key: "phone", label: "Phone", type: "tel", placeholder: "+91 XXXXX XXXXX" },
                  { key: "email", label: "Email", type: "email", placeholder: "you@example.com" },
                ].map((f) => (
                  <div key={f.key} className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-widest text-muted-foreground font-medium">{f.label}</label>
                    <input
                      type={f.type}
                      value={form[f.key as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                      className="border-b border-border bg-transparent py-2 focus:border-gold outline-none transition-all"
                      placeholder={f.placeholder}
                    />
                  </div>
                ))}
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Message *</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={4}
                    className="border-b border-border bg-transparent py-2 focus:border-gold outline-none transition-all resize-none"
                    placeholder="Tell us about your requirements..."
                  />
                </div>
                <button type="submit" className="btn-premium w-full bg-foreground text-background hover:bg-gold hover:text-foreground">
                  Send Message
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;