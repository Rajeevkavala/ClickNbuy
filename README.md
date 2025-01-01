Here's the updated `README.md` reflecting the completion of the new features and deployment:

```markdown
# Custom E-Commerce

This repository contains the setup for a MERN stack-based e-commerce project, designed to
demonstrate a full-stack application with user and admin functionalities.
The project integrates a responsive frontend, a powerful backend, and a robust database,
with payment functionality using PayPal and partial integration of Razorpay.

---

## 📋 Summary

This project aims to provide a seamless e-commerce experience by implementing user authentication,
an admin panel for product and user management, and interactive pages for shopping, reviews,
and more. Additionally, the project supports payment integration via PayPal (fully implemented)
and Razorpay (partially implemented).

### Highlights

- **User Authentication:** Secure login/logout functionality for users.
- **Admin Authentication:** Restricted login for admins with advanced features.
- **Home Page Features:** Showcases top-rated products and allows users to add and view reviews.
- **Shop, Favorites, and Cart Pages:** Functional pages for browsing, saving, and purchasing products.
- **Admin Panel:** Includes CRUD operations for product management and user administration.
- **Payment Integration:**  
  - **💳 PayPal:** Fully integrated payment gateway.
  - **💸 Razorpay:** Partial integration for payments.
- **Enhanced Product Features:** Includes filtering and sorting options for products.
- **User Profiles:** Users can track their orders and view their order history.
- **Deployment:**  
  - **Frontend and Backend:** Deployed on Render for seamless cloud hosting.

---

## 🔑 Key Features (Implemented up to Week 2)

### **🔒 Authentication**
- **👤 User Authentication:** Login and logout functionality for users.
- **🛡️ Admin Authentication:** Admin login functionality with restricted access to admin features.

### **⚙️ Admin Panel**
- **📦 Product Management:** Create, Read, Update, and Delete (CRUD) operations for products.
- **👥 User Management:** Admins can view, edit, and manage user details.

### **🌐 Frontend Pages**
- **🏠 Home Page:**
  - **Top Featured Products:** Displays products based on ratings and reviews.
  - **User Reviews:** Users can add and view reviews for products.
- **🛍️ Shop Page:** Lists all available products with filtering and sorting options.
- **❤️ Favorites Page:** Allows users to save and view favorite products.
- **🛒 Cart Page:** Displays selected items for purchase, with options to edit quantities
  or proceed to checkout.

### **💳 Payment Integration**
- **PayPal:** Fully integrated payment gateway, allowing users to complete transactions securely.
- **Razorpay:** Partial integration, working in progress for smoother payment experience.

### **👤 User Profiles**
- Users can track their past orders and view their order history through a personal profile page.

### **🛍️ Enhanced Product Features**
- Filtering and sorting options have been added to the shop page to improve the browsing experience.

---

## ⚙️ Getting Started

To run this project locally, follow the steps below:

### Prerequisites
- Node.js installed
- MongoDB instance or cloud database (e.g., MongoDB Atlas)
- Basic understanding of MERN stack

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Rajeevkavala/Custom_E-Commerce.git
   cd Custom_E-Commerce
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

4. Set up environment variables (`.env`):
   - `MONGODB_URI`: MongoDB connection string.
   - `JWT_SECRET`: Secret key for JWT authentication.
   - Payment gateway keys for PayPal and Razorpay.

5. Start the backend and frontend servers:

   **Backend (API Server):**
   ```bash
   npm run dev
   ```

   **Frontend (React Server):**
   ```bash
   npm start
   ```

6. Open your browser and navigate to `http://localhost:3000` to view the application.

---

## 📂 Folder Structure

```plaintext
├── backend
│   ├── config
│   ├── controllers
│   ├── models
│   ├── routes
│   └── server.js
├── frontend
│   ├── public
│   ├── src
│   ├── tailwind.config.js
│   └── package.json
├── .env
└── README.md
```

---

## 🛠️ Technologies Used

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express.js, JWT Authentication
- **Database:** MongoDB (Mongoose)
- **Payment Gateway:** PayPal (Fully Integrated), Razorpay (Partial Integration)
- **Version Control:** Git, GitHub

---

## 🎯 Next Steps

- Finalize Razorpay integration for complete payment functionality.
- Enhance product features with additional filtering and sorting options.
- Add more user profile customization features (e.g., password change, address management).
- Deploy the project on cloud platforms like Vercel or AWS for better scalability and accessibility.

---

## 🚀 Deployment

- **Frontend:** Deployed on Render ([Frontend-url:](https://clicknbuy-frontend.onrender.com))
- **Backend:** Deployed on Render ([backend-url:](https://clicknbuy-backend.onrender.com))

---
