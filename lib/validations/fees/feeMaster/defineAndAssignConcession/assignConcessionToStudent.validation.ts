// Imports
import * as z from 'zod';





// Assign concession to student validation
export const AssignConcessionToStudentValidation = z.object({
    class:z.string().nonempty({message:'*Please select class name'}),
    section:z.string().nonempty({message:'*Please select section'})
});