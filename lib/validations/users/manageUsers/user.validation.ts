import * as z from 'zod';
import { optionalNumberField } from '../../shared/number';


// User validation
export const UpdateUserValidation = z.object({
    name:z.string().nonempty({message:'*Please enter name'}),
    user_name:z.string().nonempty({message:'*Please enter user name'}),
    password:z.string().refine(
        (v) => v === '' || v.length >= 8,
        { message: '*Password must be at least 8 characters long' }
    ),
    is_reset_password:z.boolean(),
    designation:z.string(),
    email:z.string(),
    employee:z.string(),
    mobile:optionalNumberField(),
    profile_picture:z.string(),
    schools:z.array(z.string()),
    is_active:z.boolean(),
    enable_otp:z.boolean()
});


// Create user validation
export const CreateUserValidation = UpdateUserValidation.extend({
  password: z.string()
    .nonempty({ message: '*Please enter password' })
    .min(8, { message: '*Password must be at least 8 characters long' }),
});