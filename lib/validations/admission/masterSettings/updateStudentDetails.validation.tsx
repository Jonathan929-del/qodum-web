// Imports
import * as z from 'zod';





// Update student details validation
export const UpdateStudentDetailsValidation = z.object({
    class_name:z.string().nonempty({message:'*Please select class'}),
    section_name:z.string().nonempty({message:'*Please select section'}),
    field:z.string().nonempty({message:'*Please select field'})
});