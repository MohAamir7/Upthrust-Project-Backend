import { Router } from "express";
import multer from "multer";
import { requireAdmin } from "../Validator/AuthValidator.js";
import { readMedia, uploadMedia } from "../Controller/MediaController.js";

const ALLOWED = new Set(["image/png", "image/jpeg", "image/webp", "image/avif", "image/gif", "image/svg+xml"]);
const MAX_BYTES = 2 * 1024 * 1024;

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_BYTES, files: 1 },
  fileFilter: (req, file, cb) => (ALLOWED.has(file.mimetype) ? cb(null, true) : cb(new Error("BAD_TYPE"))),
}).single("file");

const router = Router();

// Admin: upload one image, get back its URL
router.post(
  "/",
  requireAdmin,
  (req, res, next) =>
    upload(req, res, (err) => {
      if (!err) return next();
      const tooBig = err.code === "LIMIT_FILE_SIZE";
      res.status(tooBig ? 413 : 415).json({
        ok: false,
        message: tooBig ? "Image is larger than 2 MB." : "Only PNG, JPG, WebP, AVIF, GIF or SVG images are allowed.",
      });
    }),
  uploadMedia
);

router.get("/:id", readMedia);

export default router;
