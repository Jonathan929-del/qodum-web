// Imports
import * as z from 'zod';





// Parish Validation
export const ParishValidation = z.object({
    parish:z.string().nonempty({message:'*Parish is required'}),
    religion:z.string().array()
});