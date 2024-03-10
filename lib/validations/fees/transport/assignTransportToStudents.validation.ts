// Imports
import * as z from 'zod';





// Assign transport to students validation
export const AssignTransportToStudentsValidation = z.object({
    class_name:z.string().nonempty({message:'*Please select class name'}),
    section_name:z.string()
});