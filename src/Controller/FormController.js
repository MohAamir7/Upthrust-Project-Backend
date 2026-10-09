import { createFormService } from "../FormService/FormService.js";

export const createForm = async (req, res) => {
  const { name, email, company, message, website } = req.validatedBody;

  if (website.trim()) {
    return res.status(201).json({
      ok: true,
      message: "Lead submitted successfully.",
    });
  }

  try {
    const lead = await createFormService({ name, email, company, message });

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
};