import express from "express";
import { addToCart, getCarts } from "../controllers/carts.js";
import { verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/get-carts/:id", verifyUser, getCarts);

router.post("/add-to-cart/:id", verifyUser, addToCart);

export default router;
