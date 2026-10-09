import express from "express";
import mongoose from "mongoose";
import { leadSchema } from "../Validator/FormSchema.js";
import Lead from "../Schema/FormModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const result = leadSchema.safeParse(req.body);

  if (!result.success) {
    const errors = {};

    for (const issue of result.error.issues) {
      const field = issue.path[0];
      if (typeof field !== "string") continue;
      errors[field] ??= [];
      errors[field].push(issue.message);
    }

    return res.status(400).json({
      ok: false,
      message: "Please correct the submitted fields.",
      errors,
    });
  }

  if (result.data.website.trim()) {
    return res.status(201).json({
      ok: true,
      message: "Lead submitted successfully.",
    });
  }

  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      ok: false,
      message: "Lead submission is temporarily unavailable.",
    });
  }

  try {
    const { name, email, company, message } = result.data;
    const lead = await Lead.create({ name, email, company, message });

    return res.status(201).json({
      ok: true,
      message: "Lead submitted successfully.",
      leadId: lead.id,
    });
  } catch (error) {
    console.error("Failed to save lead:", error);
    return res.status(500).json({
      ok: false,
      message: "Unable to save the lead.",
    });
  }
});

export default router;
