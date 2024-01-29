// Imports
import * as z from 'zod';





// Manual List Generation Validation
export const ManualListGenerationValidation = z.object({
    class_name:z.string().nonempty({message:'*Please select class'}),
    merit_list:z.string(),
    date:z.date(),
    admission_date_from:z.date(),
    admission_date_to:z.date(),
    session:z.string(),
    students:z.array(z.string())
});