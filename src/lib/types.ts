export interface Design {
  id: string;
  title: string;
  price: number;
  image: string;
  category: "indian" | "western";
  occasion: "wedding" | "casual" | "party" | "festive";
  type: "kurti" | "blouse" | "lehenga" | "western-dress" | "gown" | "saree";
  description: string;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  designId: string;
  designTitle: string;
  measurements: Measurements;
  status: "Pending" | "In Progress" | "Ready" | "Delivered";
  urgent: boolean;
  deliveryDate: string;
  customImage?: string;
  createdAt: string;
}

export interface Measurements {
  bust: number;
  waist: number;
  hip: number;
  length: number;
  sleeve: number;
  shoulder?: number;
}

export interface CustomRequest {
  id: string;
  description: string;
  budget: string;
  imageUrl?: string;
  customerName: string;
  phone: string;
  createdAt: string;
}
