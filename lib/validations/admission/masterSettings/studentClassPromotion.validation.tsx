// Imports
import * as z from 'zod';





// Student class promotion validation
export const StudentClassPromotionValidation = z.object({
    class_name:z.string().nonempty({message:'*Please select class'}),
    section_name:z.string().nonempty({message:'*Please select section'}),
    current_session:z.string().nonempty({message:'*Please select session'}),
    next_session:z.string().nonempty({message:'*Please select next session'})
});