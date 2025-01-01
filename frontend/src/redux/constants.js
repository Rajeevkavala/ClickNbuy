// Use the appropriate base URL depending on the environment (local or production)
export const BASE_URL = process.env.NODE_ENV === "production"
  ? "https://clicknbuy-backend.onrender.com"  // Production URL
  : "http://localhost:5001";  // Local development URL (update as needed)

export const USERS_URL = "/api/users";
export const CATEGORY_URL = "/api/category";
export const PRODUCT_URL = "/api/products";
export const UPLOAD_URL = "/api/upload";
export const ORDERS_URL = "/api/orders";
export const PAYPAL_URL = "/api/config/paypal";
export const RAZORPAY_URL = "/api/config/razorpay";
