// Imports
import * as z from 'zod';





// Stationary Details Validation
export const StationaryDetailsValidation = z.object({
    stationary_name:z.string().nonempty({message:'*Stationary name is required'}),
    amount:z.number({invalid_type_error:'*Amoumt is required'}).or(z.string().nonempty({message:'*Amount is required'})).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
    account_name:z.string().nonempty({message:'*Account name is required'}),
    school_name:z.string().nonempty({message:'*School name is required'}),
    session:z.string(),
    is_online:z.boolean()
});