import express from "express";
import { getCarts } from "../controllers/categories.js";

const router = express.Router();

router.get("/get-carts", getCarts);

export default router;
