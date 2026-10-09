import { Router } from "express";
import rateLimit from "express-rate-limit";
import { currentAdmin, login, logout } from "../Controller/AuthController.js";
import { requireAdmin } from "../Validator/AuthValidator.js";

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, message: "Too many attempts. Try again in 15 minutes." },
});

const router = Router();

router.post("/login", loginLimiter, login);
router.post("/logout", logout);
router.get("/me", requireAdmin, currentAdmin);

export default router;
