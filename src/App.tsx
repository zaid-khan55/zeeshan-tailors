import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import Catalog from "./pages/Catalog";
import CustomDesign from "./pages/CustomDesign";
import MeasurementsPage from "./pages/Measurements";
import Booking from "./pages/Booking";
import Contact from "./pages/Contact";
import AdminPanel from "./pages/Admin";
import NotFound from "./pages/NotFound";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

const queryClient = new QueryClient();

const App = () => {

  useEffect(() => {
    console.log("TEST RUNNING");

    const testConnection = async () => {
      const { data, error } = await supabase.from('designs').select('*')
      console.log("DATA:", data)
      console.log("ERROR:", error)
    }

    testConnection()
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/custom" element={<CustomDesign />} />
            <Route path="/measurements" element={<MeasurementsPage />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;