// Imports
import * as z from 'zod';





// Section Validation
export const SectionValidation = z.object({
    section_name:z.string().nonempty({message:'*Section name is required'}),
    order_no:z.number({invalid_type_error:'*Order no. is required'}).or(z.string().nonempty({message:'*Order no. is required'}))
                .pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
});