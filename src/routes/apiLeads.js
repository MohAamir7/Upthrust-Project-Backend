import express from "express";
import { leadSchema } from "../Validator/FormSchema.js";
import { validate } from "../Validator/FormValidator.js";
import { createForm } from "../Controller/FormController.js";

const router = express.Router();

router.post("/", validate(leadSchema), createForm);

export default router;
