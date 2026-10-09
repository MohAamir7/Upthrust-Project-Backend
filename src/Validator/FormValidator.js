
export const validate = (schema)=>{
    // it return a validate middleware
     

    return async (req,res,next)=>{
        try{
            console.log(req.body);
            schema.parse(req.body);
            next();
        }catch{
            return res.status(400).json({
                // error:error.errors,
                success:false,
                messsage:"Validation Failed"
                
            })

        }
    }
}