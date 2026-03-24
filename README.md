# 🧵 Zeeshan Tailors Boutique

A modern web application for a tailoring business where users can explore designs, place custom stitching orders, and communicate seamlessly via WhatsApp.

LIVE WEBSITE - https://zeeshan-tailors.vercel.app/

---

## 🌟 Features

### 🛍️ Design Catalog
- Browse various stitching designs
- Filter by **Style** (Indian / Western)
- Filter by **Occasion** (Wedding / Party / Casual)

### 📦 Order Booking System
- Select design
- Enter measurements
- Choose delivery date
- Submit order

### 📱 WhatsApp Integration
- Admin gets instant order notification
- Pre-filled message with order details
- Fast communication without backend APIs

### 🛠️ Admin Panel
- Add new designs with image upload
- Delete designs
- View customer orders
- Update order status

### ☁️ Supabase Integration
- Database for designs & orders
- Storage for design images

---

## 🧰 Tech Stack

- Frontend: React + TypeScript + Vite  
- Styling: Tailwind CSS / ShadCN UI  
- Backend (BaaS): Supabase  
- Icons: Lucide React  
- Animations: Framer Motion  

---

## 📁 Project Structure


src/
│
├── components/ # Reusable UI components
├── pages/ # Main pages (Booking, Admin, Catalog)
├── lib/ # Supabase configuration
├── assets/ # Images & static files
└── App.tsx # Main app entry


---

## ⚙️ Setup Instructions

### 1. Clone the repository


git clone https://github.com/your-username/zeeshan-tailors.git

cd zeeshan-tailors


---

### 2. Install dependencies


npm install


---

### 3. Setup Supabase

Create a project on https://supabase.com

#### Create table: designs

- id
- title
- price
- image_url
- style
- occasion

#### Create table: orders

- id
- name
- phone
- design_id
- status
- delivery_date

---

### 4. Setup Storage

- Create bucket: `design-images`
- Make it PUBLIC
- Add policies for upload and read

---

### 5. Add Environment Variables

Create `.env` file:


VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key


---

### 6. Run the project


npm run dev


---

## 📲 WhatsApp Notification

When a user places an order:

- Order is saved in database
- WhatsApp opens with pre-filled message to admin

Example message:


New Order

Name: John Doe
Phone: 9876543210
Design: Wedding Lehenga
ID: 123
Date: 2026-03-25


---

## 🚀 Future Improvements

- Payment integration (Razorpay / Stripe)
- Admin analytics dashboard
- Order tracking system
- AI-based design suggestions
- Image preview before upload

---

## 👨‍💻 Author

Zaid Khan

---

## 📄 License

This project is open-source and available under the MIT License.
