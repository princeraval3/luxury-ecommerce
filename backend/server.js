const dotenv = require("dotenv");

dotenv.config();

const express = require("express");
const cors = require("cors");
const ConnectDB = require("./config/db");
const authRoutes = require("./router/authRoutes");
const cookieParser = require("cookie-parser");
const adminRoutes = require("./router/adminRoutes");
const productRoutes = require("./router/productRoutes");
const categoryRoutes = require("./router/categoryRoutes");
const adminUserRoutes = require("./router/adminUserRoutes");
const orderRoutes = require("./router/orderRoutes");
const cartRoutes = require("./router/cartRoutes");
ConnectDB();

const app = express();

app.use(
  cors({
    origin: "https://luxury-ecommerce-eight.vercel.app",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/admin/users", adminUserRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
  console.log("cloudinary api key:", process.env.CLOUDINARY_API_KEY);
});