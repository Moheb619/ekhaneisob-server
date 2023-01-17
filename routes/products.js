import express from "express";
import { createProduct, getProducts } from "../controllers/products.js";
import { uploads } from "../utils/uploadProductImage.js";

const router = express.Router();

router.post("/create-product", uploads.array("img"), createProduct);
router.get("/get-products", getProducts);

export default router;
