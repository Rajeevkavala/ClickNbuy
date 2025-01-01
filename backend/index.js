// packages
import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"; // Import the CORS package
import Razorpay from "razorpay"; // Import Razorpay package
import userRoutes from "./routes/userRoutes.js"; // Import your user routes
import categoryRoutes from "./routes/categoryRoutes.js";// Import your category routes
import productRoutes from "./routes/productRoutes.js";// Import your product routes
import uploadRoutes from "./routes/uploadRoutes.js";// Import your upload routes
import orderRoutes from "./routes/orderRoutes.js";// Import your order routes
// Utiles
import connectDB from "./config/db.js";
import { ClientRequest } from "http";
import { log } from "console";

dotenv.config();
const port = process.env.PORT || 5000;

connectDB();

const app = express();

// CORS Configuration: Allow requests from your front-end domain
const allowedOrigins = ["https://clicknbuy-frontend.onrender.com"]; // Replace with your front-end domain
// const allowedOrigins = ["http://localhost:5173"]; // Replace with your front-end domain
const corsOptions = {
  origin: allowedOrigins, // Allow requests from this origin
  methods: ["GET", "POST", "PUT", "DELETE"], // Allow these HTTP methods
  credentials: true, // Allow cookies to be sent
};

// Apply CORS middleware to allow cross-origin requests
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Razorpay Configuration
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, // Your Razorpay key ID
  key_secret: process.env.RAZORPAY_KEY_SECRET, // Your Razorpay key secret
});


// Define routes
app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/config/paypal", (req, res) =>{
  res.send({clientId:process.env.PAYPAL_CLIENT_ID})
});
// Razorpay Configuration Route
app.use("/api/config/razorpay", (req, res) => {
  res.json({
    keyId: process.env.RAZORPAY_KEY_ID,
    keySecret: process.env.RAZORPAY_KEY_SECRET, // Include if frontend needs it for a specific use case
  });
});


const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));

app.listen(port, () => console.log(`Server running on port: ${port}`));
