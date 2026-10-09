import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
    company: { type: String, trim: true, maxlength: 120, default: "" },
    message: { type: String, required: true, trim: true, maxlength: 2000 },
    source: { type: String, default: "landing-footer" },
    userAgent: { type: String, maxlength: 300 },
  },
  { timestamps: true } // adds createdAt / updatedAt
);

const Form =  mongoose.model("Lead", leadSchema);

export default Form;