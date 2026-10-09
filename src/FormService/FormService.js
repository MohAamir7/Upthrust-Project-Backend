import { createFrom as createLeadRepository } from "../repo/createFrom.js";

export const createFormService = async (leadData) => {
  const { name, email, company, message } = leadData;
  return createLeadRepository({ name, email, company, message });
};