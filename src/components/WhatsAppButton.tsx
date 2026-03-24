import { MessageCircle } from "lucide-react";

export const WhatsAppButton = () => {
  const phone = import.meta.env.VITE_ADMIN_PHONE;
  const message = encodeURIComponent("Hello! I'd like to inquire about your tailoring services.");
  
  return (
    <a
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[hsl(142,70%,40%)] hover:bg-[hsl(142,70%,35%)] text-[hsl(0,0%,100%)] p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} fill="currentColor" />
    </a>
  );
};