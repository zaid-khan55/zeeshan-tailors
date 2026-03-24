import { useState, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { supabase } from "@/lib/supabase";

const Catalog = () => {
  const [searchParams] = useSearchParams();
  const typeParam = searchParams.get("type");

  const [designs, setDesigns] = useState<any[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [occasionFilter, setOccasionFilter] = useState<string>("all");

  // ✅ Fetch designs from Supabase
  useEffect(() => {
    const fetchDesigns = async () => {
      const { data, error } = await supabase.from("designs").select("*");

      if (error) {
        console.log("ERROR:", error);
      } else {
        setDesigns(data || []);
      }
    };

    fetchDesigns();
  }, []);

  // ✅ Filtering logic
  const filtered = useMemo(() => {
    return designs.filter((d) => {
      if (typeParam && d.category !== typeParam) return false;
      if (categoryFilter !== "all" && d.category !== categoryFilter) return false;
      if (occasionFilter !== "all" && d.occasion !== occasionFilter) return false;
      return true;
    });
  }, [designs, categoryFilter, occasionFilter, typeParam]);

  return (
    <Layout>
      <section className="section-padding max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="gold-line mx-auto mb-4" />
          <h1 className="font-serif text-4xl md:text-5xl mb-4">
            Design Catalog
          </h1>
          <p className="text-muted-foreground">
            Browse our collection of handcrafted designs
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">

          {/* Category */}
          <div className="flex gap-2">
            <span className="text-xs uppercase tracking-widest text-muted-foreground self-center mr-2">
              Style:
            </span>
            {["all", "indian", "western"].map((v) => (
              <button
                key={v}
                onClick={() => setCategoryFilter(v)}
                className={`px-4 py-2 text-xs uppercase tracking-widest rounded-sm ${
                  categoryFilter === v
                    ? "bg-black text-white"
                    : "border"
                }`}
              >
                {v}
              </button>
            ))}
          </div>

          {/* Occasion */}
          <div className="flex gap-2">
            <span className="text-xs uppercase tracking-widest text-muted-foreground self-center mr-2">
              Occasion:
            </span>
            {["all", "wedding", "party", "casual"].map((v) => (
              <button
                key={v}
                onClick={() => setOccasionFilter(v)}
                className={`px-4 py-2 text-xs uppercase tracking-widest rounded-sm ${
                  occasionFilter === v
                    ? "bg-black text-white"
                    : "border"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {filtered.map((design, i) => (
            <motion.div
              key={design.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="border rounded-lg overflow-hidden bg-white shadow-sm"
            >
              {/* Image */}
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={design.image_url || "https://via.placeholder.com/300x400"}
                  alt={design.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">
                  {design.title}
                </h3>

                <p className="text-gray-600 mb-4">
                  ₹{design.price}
                </p>

                <Link
                  to={`/booking?design=${design.id}`}
                  className="block text-center bg-black text-white py-2 rounded"
                >
                  Order Now
                </Link>
              </div>
            </motion.div>
          ))}

        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-16">
            No designs available.
          </p>
        )}

      </section>
    </Layout>
  );
};

export default Catalog;