import crypto from "node:crypto";
import jwt from "jsonwebtoken";
import { ADMIN_PASSWORD, JWT_SECRET } from "../Config/serverConfig.js";

const digest = (value) =>
  crypto.createHash("sha256").update(String(value)).digest();

export function verifyAdminPassword(password) {
  if (typeof password !== "string" || !ADMIN_PASSWORD) return false;
  return crypto.timingSafeEqual(digest(password), digest(ADMIN_PASSWORD));
}

export function issueAdminToken() {
  return jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "8h" });
}

export function isValidAdminToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET)?.role === "admin";
  } catch {
    return false;
  }
}
