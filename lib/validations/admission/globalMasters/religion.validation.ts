// Imports
import * as z from 'zod';





// Religion Validation
export const ReligionValidation = z.object({
    religion_name:z.string().nonempty({message:'*Religion name is required'})
});