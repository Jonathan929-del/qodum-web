// Imports
import * as z from 'zod';





// Relate Class Validation
export const RelateClassValidation = z.object({
    class_name:z.string().nonempty({message:'*Class name is required'}),
    sections:z.string().array()
});