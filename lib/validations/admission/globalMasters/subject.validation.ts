// Imports
import * as z from 'zod';





// Subject Validation
export const SubjectValidation = z.object({
    subject_name:z.string().nonempty({message:'*Please enter subject name'}),
    available_seats:z.number().or(z.string()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
    is_university:z.boolean()
});