// Imports
import * as z from 'zod';





// User validation
export const UserValidation = z.object({
    name:z.string().nonempty({message:'*Please enter name'}),
    user_name:z.string().nonempty({message:'*Please enter user name'}),
    password:z.string().min(8, {message:'*Password must be at least 8 characters long'}).nonempty({message:'*Please enter password'}),
    is_reset_password:z.boolean(),
    designation:z.string(),
    email:z.string(),
    employee:z.string(),
    mobile:z.number().or(z.string()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
    profile_picture:z.string(),
    schools:z.array(z.string()),
    is_active:z.boolean(),
    enable_otp:z.boolean()
});