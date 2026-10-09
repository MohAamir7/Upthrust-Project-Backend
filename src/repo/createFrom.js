import Form from "../Schema/FormModel";

export const createFrom = async ({ body }) => {
    try {
        const form = await Form.create({ body });
        return form;
    } catch(error) {
        throw error;
    }
}