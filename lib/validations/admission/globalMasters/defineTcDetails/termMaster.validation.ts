// Imports
import * as z from 'zod';





// Term master validation
export const TermMasterValidation = z.object({
    term_name:z.string().nonempty({message:'*Term name is required'})
});