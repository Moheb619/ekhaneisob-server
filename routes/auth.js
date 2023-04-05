import express from "express";
import { getTokenValue, login, logout, register } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/get-token-value", getTokenValue);

export default router;
