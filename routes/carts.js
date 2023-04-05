import express from "express";
import { addToCart } from "../controllers/carts.js";

const router = express.Router();

// router.get("/get-carts", getCarts);

router.post("/add-to-cart", addToCart);

export default router;
