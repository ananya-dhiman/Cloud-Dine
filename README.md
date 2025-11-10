# Cloud-Dine 
**A Cloud Kitchen Management and Food Ordering Web Application**

---

## 🚀 Overview
**Cloud Dine** is a full-stack web application built to connect customers with cloud kitchens through a unified digital platform.  
It allows users to browse menus, place orders, and give reviews, while kitchen owners can manage menus, track orders, and monitor performance — all in one place.

---

## 🎯 Objectives
- To provide a centralized online platform for cloud kitchens.  
- To enable customers to browse, order, and review food easily.  
- To offer kitchen owners a simple dashboard for managing menus and orders.  
- To ensure secure authentication and reliable database operations using the MERN stack.

---

## 🛠️ Tech Stack
### **Frontend**
- React.js (with Vite)  
- Tailwind CSS
- Shadcn UI Components  

### **Backend**
- Node.js  
- Express.js  

### **Database**
- MongoDB (with Mongoose)  

### **Authentication**
- Firebase Authentication  

### **Cloud Integration**
- Cloudinary (for image uploads)

---

## 🧩 Features
- 🔐 Secure Login & Signup (Role-based access for User / Owner / Admin)  
- 🍴 Menu Management (Add / Edit / Delete menu items with images)  
- 🧾 Order Management (Place, update, and track orders)  
- ⭐ Review & Rating System  
- ☁️ Cloud Storage for images via Cloudinary  
- 📱 Fully Responsive Design  

---

## 🧠 Work Distribution
- **Anam Khan:** Frontend, PPT, report, and documentation  
- **Ankita Survase:** Admin frontend and Figma design  
- **Ananya Dhiman:** Backend development  

---

## 🗄️ Database Design
| Collection | Description |
|-------------|-------------|
| **User** | Stores personal details, authentication data, and role type (User / Owner / Admin). |
| **Kitchen** | Linked to Owner; contains kitchen name, location, and contact info. |
| **Menu** | Linked to Kitchen; includes dish name, description, price, and image URL. |
| **Order** | Linked to User and Menu; stores items, total, status, and timestamps. |
| **Review** | Linked to User and Kitchen; stores ratings and comments. |

---

## ⚙️ Installation and Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/Cloud-Dine.git
2️⃣ Navigate to the Project Directory
cd Cloud-Dine
3️⃣ Install Dependencies
For both frontend and backend:
cd frontend
npm install
cd ../backend
npm install
4️⃣ Create a .env File
Add your environment variables for:
MONGO_URI=
FIREBASE_API_KEY=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
PORT=
5️⃣ Run the Application
In two terminals:
# Run backend
cd backend
npm start

# Run frontend
cd frontend
npm run dev
________________________________________
🧩 Folder Structure
Cloud-Dine/
│
├── frontend/          # React.js frontend
├── backend/           # Node.js backend
├── .vscode/           # Editor config
├── README.md          # Project documentation
└── package.json
________________________________________
🧰 Technical Issues Solved
•	Fixed Firebase token authentication conflicts with Express middleware.
•	Resolved Cloudinary upload delays with optimized presets.
•	Corrected Mongoose reference population for nested schemas.
•	Implemented state re-rendering in React for live order status updates.
________________________________________
🔮 Future Scope
•	Integration of payment gateways (Razorpay / Stripe).
•	Real-time order tracking via WebSockets.
•	Mobile App version using React Native.
•	AI-based dish recommendations and analytics dashboard.
________________________________________
📎 GitHub Repository
👉 Cloud Dine GitHub Link
________________________________________
🧑‍💻 Developed By
Anam Khan, Ankita Survase, and Ananya Dhiman
Department of Computer Engineering
KJ Somaiya College of Engineering

---

