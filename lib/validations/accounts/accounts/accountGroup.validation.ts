// Imports
import * as z from 'zod';





// Account Group Validation
export const AccountGroupValidation = z.object({
    group_name:z.string().nonempty({message:'*Group name is required'}),
    category:z.string().nonempty({message:'*Category is required'}),
    group_type:z.string().nonempty({message:'*Group type is required'}),
    group_no:z.number({invalid_type_error:'*Group no. is required'}).or(z.string().nonempty({message:'*Group no. is required'}))
    .pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'}))
});