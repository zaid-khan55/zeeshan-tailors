import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { Star, Scissors, Heart, Clock } from "lucide-react";
import heroImg from "@/assets/hero-bridal.jpg";
import kurtiImg from "@/assets/category-kurti.jpg";
import blouseImg from "@/assets/category-blouse.jpg";
import lehengaImg from "@/assets/category-lehenga.jpg";
import westernImg from "@/assets/category-western.jpg";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7 },
};

const categories = [
  { title: "Kurti", image: kurtiImg, link: "/catalog?type=kurti" },
  { title: "Blouse", image: blouseImg, link: "/catalog?type=blouse" },
  { title: "Lehenga", image: lehengaImg, link: "/catalog?type=lehenga" },
  { title: "Western", image: westernImg, link: "/catalog?type=western-dress" },
];

const testimonials = [
  { name: "Priya S.", text: "My bridal lehenga was absolutely stunning. The craftsmanship is unmatched!", rating: 5 },
  { name: "Anita V.", text: "Perfect fit every single time. Zeeshan Tailors understands my style perfectly.", rating: 5 },
  { name: "Meera P.", text: "The custom Western gown they made for my reception was a showstopper!", rating: 5 },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Luxury bridal collection" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-xl"
          >
            <div className="gold-line mb-6" />
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-background leading-[1.1] mb-6">
              Timeless Elegance, Tailored to Your{" "}
              <span className="text-gold italic">Silhouette</span>
            </h1>
            <p className="text-background/70 text-lg mb-8 font-body">
              Bespoke Indian & Western wear crafted with love. From bridal lehengas to everyday kurtis.
            </p>
            <Link
              to="/booking"
              className="btn-premium inline-block bg-gold text-foreground hover:bg-gold-dark"
            >
              Book Stitching Now
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="section-padding max-w-7xl mx-auto">
        <motion.div {...fadeUp} className="text-center mb-16">
          <div className="gold-line mx-auto mb-4" />
          <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-4">Our Collections</h2>
          <p className="text-muted-foreground max-w-md mx-auto">Explore our curated categories of Indian and Western designs.</p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link to={cat.link} className="group block relative overflow-hidden gold-border rounded-sm">
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <h3 className="font-serif text-xl md:text-2xl text-background">{cat.title}</h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-secondary">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <div className="gold-line mx-auto mb-4" />
            <h2 className="font-serif text-3xl md:text-5xl mb-4">Why Choose Us</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Scissors, title: "Expert Tailoring", desc: "20+ years of precision stitching" },
              { icon: Heart, title: "Custom Designs", desc: "Bring your dream outfit to life" },
              { icon: Star, title: "Premium Fabrics", desc: "Handpicked quality materials" },
              { icon: Clock, title: "Timely Delivery", desc: "We respect your deadlines" },
            ].map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6"
              >
                <feat.icon className="w-8 h-8 text-gold mx-auto mb-4" />
                <h3 className="font-serif text-xl mb-2">{feat.title}</h3>
                <p className="text-sm text-muted-foreground">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding max-w-7xl mx-auto">
        <motion.div {...fadeUp} className="text-center mb-16">
          <div className="gold-line mx-auto mb-4" />
          <h2 className="font-serif text-3xl md:text-5xl mb-4">What Our Clients Say</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="p-8 gold-border bg-background rounded-sm"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 italic">"{t.text}"</p>
              <p className="text-sm font-medium uppercase tracking-widest">{t.name}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="section-padding bg-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <div className="gold-line mx-auto mb-4" />
            <h2 className="font-serif text-3xl md:text-5xl text-background mb-6">About Zeeshan Tailors</h2>
            <p className="text-background/60 text-lg leading-relaxed mb-8">
              For over two decades, we have been crafting bespoke garments that celebrate the beauty of every woman.
              From intricate bridal lehengas to contemporary Western wear, our atelier blends traditional craftsmanship
              with modern aesthetics. Every stitch tells a story of elegance.
            </p>
            <Link to="/contact" className="btn-premium inline-block border border-gold text-gold hover:bg-gold hover:text-foreground">
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
