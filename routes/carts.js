import express from "express";
import { getCarts, addToCart } from "../controllers/categories.js";

const router = express.Router();

router.get("/get-carts", getCarts);

router.post("/add-to-cart", addToCart);

export default router;
