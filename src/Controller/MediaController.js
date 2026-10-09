import mongoose from "mongoose";
import { getMedia, saveMedia } from "../FormService/MediaService.js";

export async function uploadMedia(req, res) {
  if (!req.file) {
    return res.status(400).json({ ok: false, message: "No file received." });
  }

  const media = await saveMedia({
    filename: req.file.originalname.slice(0, 200),
    mime: req.file.mimetype,
    size: req.file.size,
    data: req.file.buffer,
  });

  return res.status(201).json({
    ok: true,
    url: `/api/media/${media.id}`,
  });
}

export async function readMedia(req, res) {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(404).end();
  const media = await getMedia(req.params.id);
  if (!media) return res.status(404).end();

  res.set({
    "Content-Type": media.mime,
    "Cache-Control": "public, max-age=31536000, immutable",
    "X-Content-Type-Options": "nosniff",
    "Content-Security-Policy":
      "default-src 'none'; style-src 'unsafe-inline'; sandbox",
  });
  return res.send(media.data);
}
