import Lead from "../Schema/FormModel.js";

export const createFrom = async (leadData) => Lead.create(leadData);