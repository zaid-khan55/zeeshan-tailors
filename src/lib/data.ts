import { Design, Order } from "./types";
import kurtiImg from "@/assets/category-kurti.jpg";
import blouseImg from "@/assets/category-blouse.jpg";
import lehengaImg from "@/assets/category-lehenga.jpg";
import westernImg from "@/assets/category-western.jpg";

export const sampleDesigns: Design[] = [
  {
    id: "1", title: "Elegant Chikankari Kurti", price: 2500, image: kurtiImg,
    category: "indian", occasion: "casual", type: "kurti",
    description: "Hand-embroidered Lucknowi chikankari on fine cotton fabric."
  },
  {
    id: "2", title: "Royal Bridal Lehenga", price: 45000, image: lehengaImg,
    category: "indian", occasion: "wedding", type: "lehenga",
    description: "Heavy zardozi work bridal lehenga with dupatta."
  },
  {
    id: "3", title: "Designer Blouse", price: 3500, image: blouseImg,
    category: "indian", occasion: "festive", type: "blouse",
    description: "Custom fit designer blouse with intricate gold embroidery."
  },
  {
    id: "4", title: "Cocktail Evening Gown", price: 8000, image: westernImg,
    category: "western", occasion: "party", type: "gown",
    description: "Elegant floor-length evening gown in soft blush."
  },
  {
    id: "5", title: "Festive Anarkali Kurti", price: 4500, image: kurtiImg,
    category: "indian", occasion: "festive", type: "kurti",
    description: "Flared Anarkali style kurti with gold detailing."
  },
  {
    id: "6", title: "Western Wrap Dress", price: 5500, image: westernImg,
    category: "western", occasion: "casual", type: "western-dress",
    description: "Chic wrap dress perfect for brunch or office wear."
  },
];

export const sampleOrders: Order[] = [
  {
    id: "ORD001", customerName: "Priya Sharma", phone: "8430153819",
    designId: "1", designTitle: "Elegant Chikankari Kurti",
    measurements: { bust: 36, waist: 30, hip: 38, length: 42, sleeve: 18 },
    status: "In Progress", urgent: false, deliveryDate: "2026-04-01", createdAt: "2026-03-10"
  },
  {
    id: "ORD002", customerName: "Anita Verma", phone: "9876543211",
    designId: "2", designTitle: "Royal Bridal Lehenga",
    measurements: { bust: 34, waist: 28, hip: 36, length: 44, sleeve: 17 },
    status: "Pending", urgent: true, deliveryDate: "2026-03-25", createdAt: "2026-03-12"
  },
  {
    id: "ORD003", customerName: "Meera Patel", phone: "9876543212",
    designId: "4", designTitle: "Cocktail Evening Gown",
    measurements: { bust: 38, waist: 32, hip: 40, length: 56, sleeve: 20 },
    status: "Ready", urgent: false, deliveryDate: "2026-03-20", createdAt: "2026-03-05"
  },
];
