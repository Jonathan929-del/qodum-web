// Imports
import * as z from 'zod';





// Assign multiple group to student validation
export const AssignMultipleGroupToStudentValidation = z.object({
    group_type:z.string(),
    fees_group:z.string().nonempty({message:'*Please select group'}),
    fees_installment:z.string(),
    class:z.string()
});