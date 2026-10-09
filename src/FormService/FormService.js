import { createFrom as createFormRepository } from "../repo/createFrom";

export const createFormService = async ({ body }) => {
    // try to find any problem in the form body and if any exists don't
    // create the tweet and return an error message

    

    const Form = await createFormRepository({ body });

    return Form;

}