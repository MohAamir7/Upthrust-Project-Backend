import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { CLIENT_ORIGINS } from "./serverConfig.js";
import { getContent } from "../FormService/ContentService.js";
import authRouter from "../routes/auth.js";
import contentRouter from "../routes/content.js";
import leadsRouter from "../routes/apiLeads.js";
import mediaRouter from "../routes/media.js";

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const clientDist = path.resolve(currentDirectory, "../../../client/dist");

const safeJson = (value) =>
  JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");

export function createApp() {
  const app = express();

  app.set("trust proxy", 1);
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(
    cors({
      origin: CLIENT_ORIGINS,
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "x-admin-key"],
    }),
  );
  app.use(cookieParser());
  app.use(express.json({ limit: "1mb" }));

  app.use("/api/admin", authRouter);
  app.use("/api/content", contentRouter);
  app.use("/api/media", mediaRouter);
  app.use("/api/Leads", leadsRouter);
  app.use("/api", (req, res) =>
    res.status(404).json({ ok: false, message: "Not found" }),
  );

  app.use(
    express.static(clientDist, {
      index: false,
      setHeaders(res, filePath) {
        if (filePath.includes(`${path.sep}assets${path.sep}`)) {
          res.setHeader(
            "Cache-Control",
            "public, max-age=31536000, immutable",
          );
        }
      },
    }),
  );

  app.use(async (req, res, next) => {
    if (req.method !== "GET" && req.method !== "HEAD") return next();

    try {
      let html = await fs.readFile(path.join(clientDist, "index.html"), "utf8");
      const content = await getContent();
      if (content) {
        html = html.replace(
          "</head>",
          `<script>window.__CONTENT__=${safeJson(content)}</script></head>`,
        );
      }
      return res.set("Cache-Control", "no-cache").type("html").send(html);
    } catch (error) {
      if (error.code === "ENOENT") {
        return res
          .status(404)
          .send("Client not built. Run npm run build in the client directory.");
      }
      return next(error);
    }
  });

  app.use((error, req, res, next) => {
    console.error(error);
    if (res.headersSent) return next(error);
    return res.status(500).json({ ok: false, message: "Something went wrong." });
  });

  return app;
}
