// Imports
import * as z from 'zod';





// Fee Type Validation
export const FeeTypeValidation = z.object({
    name:z.string().nonempty({message:'*Fee type name is required'}),
    preference_no:z.number({invalid_type_error:'*Preference no. is required'}).or(z.string().nonempty({message:'*Preference no. is required'})).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
    heads:z.string().array()
});