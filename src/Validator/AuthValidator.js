import crypto from "node:crypto";
import { ADMIN_PASSWORD } from "../Config/serverConfig.js";
import { isValidAdminToken } from "../FormService/AuthService.js";

const COOKIE_NAME = "cms_token";
const digest = (value) =>
  crypto.createHash("sha256").update(String(value)).digest();

export function requireAdmin(req, res, next) {
  const token = req.cookies?.[COOKIE_NAME];
  if (token && isValidAdminToken(token)) return next();

  const key = req.get("x-admin-key");
  if (
    typeof key === "string" &&
    ADMIN_PASSWORD &&
    crypto.timingSafeEqual(digest(key), digest(ADMIN_PASSWORD))
  ) {
    return next();
  }

  return res.status(401).json({ ok: false, message: "Unauthorized" });
}
