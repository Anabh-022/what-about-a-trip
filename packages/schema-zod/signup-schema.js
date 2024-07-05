import {z} from "zod"
import validator from "validator"
export const signup_schema=z.object({
    username:z.string().min(6,{message:"Please enter a valid username"}),
    firstname:z.string(),
    lastname:z.string(),
    contact:z.string().length(10,{message:"Please enter a valid number"}).refine(validator.isMobilePhone,{message:"Please enter a numeric number"}),
    email:z.string().email(),
    password:z.string().min(8)

})