import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";

import connectDB from "./config/connectDB.js";

import userRouter from "./route/user.route.js";
import categoryRouter from "./route/category.route.js";
import uploadRouter from "./route/upload.router.js";
import subCategoryRouter from "./route/subCategory.route.js";
import productRouter from "./route/product.route.js";
import cartRouter from "./route/cart.route.js";
import addressRouter from "./route/address.route.js";
import orderRouter from "./route/order.route.js";

dotenv.config();

const app = express();

// ===== MIDDLEWARE =====
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev")); // FIXED
app.use(helmet({
  crossOriginResourcePolicy: false
}));

// ===== PORT FIXED =====
const PORT = process.env.PORT || 8080;

// ===== ROUTE TEST =====
app.get("/", (req, res) => {
  res.json({
    message: "Server is running on " + PORT
  });
});

// ===== ROUTES =====
app.use("/api/user", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/file", uploadRouter);
app.use("/api/subcategory", subCategoryRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);

// ===== DB + SERVER =====
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("🚀 Server is running on port", PORT);
  });
});