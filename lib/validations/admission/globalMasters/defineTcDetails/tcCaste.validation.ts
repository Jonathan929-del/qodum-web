// Imports
import * as z from 'zod';





// Tc Caste Validation
export const TcCasteValidation = z.object({
    caste_name:z.string().nonempty({message:'*Caste name is required'})
});