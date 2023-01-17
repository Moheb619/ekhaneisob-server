import express from "express";
import { getCategories } from "../controllers/categories.js";
import { uploads } from "../utils/uploadProductImage.js";

const router = express.Router();

router.get("/get-categories", getCategories);

export default router;
