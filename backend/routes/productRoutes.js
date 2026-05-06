import express from "express"
import { getProducts, getProductById } from "../controllers/productControllers.js";
import products from "../data/products.js";


const router = express.Router();


router.route("/").get(getProducts);

router.route("/:id").get(getProductById);






export default router;
