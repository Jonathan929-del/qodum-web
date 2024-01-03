// Imports
import * as z from 'zod';





// Group Validation
export const GroupValidation = z.object({
    name:z.string().nonempty({message:'*Installment name is required'}),
    is_special:z.boolean()
});