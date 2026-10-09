import {
  issueAdminToken,
  verifyAdminPassword,
} from "../FormService/AuthService.js";

const COOKIE_NAME = "cms_token";
const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  maxAge: 8 * 60 * 60 * 1000,
  path: "/",
};

export function login(req, res) {
  if (!verifyAdminPassword(req.body?.password)) {
    return res.status(401).json({ ok: false, message: "Wrong password." });
  }

  res.cookie(COOKIE_NAME, issueAdminToken(), COOKIE_OPTIONS);
  return res.json({ ok: true });
}

export function logout(req, res) {
  res.clearCookie(COOKIE_NAME, { path: "/" });
  return res.json({ ok: true });
}

export function currentAdmin(req, res) {
  return res.json({ ok: true });
}
