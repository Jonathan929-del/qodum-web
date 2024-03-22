// Imports
import * as z from 'zod';





// Set student status validation
export const SetStudentStatusValidation = z.object({
    class_name:z.string().nonempty({message:'*Please select class'}),
    section_name:z.string().nonempty({message:'*Please select section'})
});