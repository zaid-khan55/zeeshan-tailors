import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background/80">
      <div className="max-w-7xl mx-auto section-padding">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-serif text-3xl text-background mb-4">
              ZEESHAN <span className="text-gold">TAILORS</span>
            </h3>
            <p className="text-sm leading-relaxed opacity-70">
              Timeless elegance, tailored to your silhouette. Crafting bespoke Indian & Western wear since 2005.
            </p>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-gold mb-6">Quick Links</h4>
            <div className="space-y-3">
              {[
                { label: "Design Catalog", to: "/catalog" },
                { label: "Custom Design", to: "/custom" },
                { label: "Measurements", to: "/measurements" },
                { label: "Book Stitching", to: "/booking" },
                { label: "Contact Us", to: "/contact" },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block text-sm opacity-70 hover:opacity-100 hover:text-gold transition-all duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-gold mb-6">Contact</h4>
            <div className="space-y-3 text-sm opacity-70">
              <p>📍Peela Talab, Rampur</p>
              <p>📞 +{import.meta.env.VITE_ADMIN_PHONE}</p>
              <p>✉️ hello@zeeshantailors.com</p>
              <p>🕐 Mon - Sat: 10AM - 8PM</p>
            </div>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-background/10 text-center text-xs opacity-50">
          © {new Date().getFullYear()} Zeeshan Tailors. All rights reserved.
        </div>
        <div className="text-center mt-2">
          <Link to="/admin" className="text-xs text-background/20 hover:text-background/50 transition-opacity">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
};