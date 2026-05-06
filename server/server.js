import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit"; // ✅ Import rate-limit

import authRoutes from "./routes/auth.js";
import feedbackRoutes from "./routes/feedback.js";
import ordersRoutes from "./routes/orders.js";

dotenv.config();
const app = express();

// ✅ Rate limiting middleware
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute window
  max: 20, // limit each IP to 20 requests per minute
  message: "Too many requests, please try again later.",
});
app.use(limiter); // ✅ Apply rate limiter globally

// ✅ CORS configuration
app.use(cors({
  origin: ["[https://foodie-zone-mern.vercel.app](https://foodie-zone-mern.vercel.app)"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// ✅ API routes
app.use("/api/auth", authRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/orders", ordersRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});
