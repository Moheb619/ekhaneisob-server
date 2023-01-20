import express from "express";
import { createProduct, getCategorizedProducts, getProducts, getLatestProducts, getFeaturedProducts, getSearchedProducts } from "../controllers/products.js";
import { uploads } from "../utils/uploadProductImage.js";

const router = express.Router();

router.post("/create-product", uploads.array("img"), createProduct);
router.get("/get-products", getProducts);
router.get("/get-categorized-products", getCategorizedProducts);
router.get("/get-latest-products", getLatestProducts);
router.get("/get-featured-products", getFeaturedProducts);
router.get("/get-searched-products", getSearchedProducts);

export default router;
