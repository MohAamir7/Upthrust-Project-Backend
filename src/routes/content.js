import { Router } from "express";
import { contentSchema } from "../content/schema.js";
import {
  readContent,
  restoreDefaultContent,
  updateContent,
} from "../Controller/ContentController.js";
import { requireAdmin } from "../Validator/AuthValidator.js";

const router = Router();

const validateContent = (req, res, next) => {
  const parsed = contentSchema.safeParse(req.body?.content);
  if (!parsed.success) {
    return res.status(400).json({
      ok: false,
      message: "Some content is not valid, so nothing was saved.",
      errors: parsed.error.issues
        .slice(0, 8)
        .map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
    });
  }
  req.validatedContent = parsed.data;
  return next();
};

router.get("/", readContent);
router.put("/", requireAdmin, validateContent, updateContent);
router.delete("/", requireAdmin, restoreDefaultContent);

export default router;
