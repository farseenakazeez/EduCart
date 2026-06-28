import express from "express";
import products from "./data/products.js";
import  dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import {errorHandler, notFound } from "./middleware/errorHandler.js";
import cookieParser from "cookie-parser";

dotenv.config();
const port = process.env.PORT || 5000;
console.log(process.env.PORT);
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())
const allowedOrigins = [
  "http://localhost:5174",
  "https://educart-k573.onrender.com"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));


app.use("/api/products",productRoutes)
app.use("/api/users",userRoutes)
app.use("/api/orders",orderRoutes)

app.use(notFound)
app.use(errorHandler)


app.listen(port,()=>console.log(`server running on port : ${port}`));