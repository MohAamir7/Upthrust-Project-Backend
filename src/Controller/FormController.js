import { createFormService } from "../FormService/FormService";
export const createForm = async (req, res) => {
    try {
        const response = await createFormService({
            body: req.body.body
        });

        return res.status(201).json({
            success: true,
            data: response,
            message: 'Form created successfully'
        })
    } catch(error) {
        console.log(error);
        if(error.status) {
            return res.status(error.status).json({
                message: error.message,
                success: false
            });
        }
        return res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
}