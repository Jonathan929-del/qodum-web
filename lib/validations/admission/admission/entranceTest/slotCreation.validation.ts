// Imports
import * as z from 'zod';





// Slot creation validation
export const SlotCreationValidation = z.object({
    session:z.string().nonempty({message:'*Please select session'}),
    class_name:z.string().nonempty({message:'*Please select class'}),
    till_date:z.date(),
    total_student:z.number().or(z.string()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
    no_of_slot:z.number({invalid_type_error:'*Please enter no. of slot'}).or(z.string().nonempty({message:'*Please enter no. of slot'})).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
    no_of_app:z.number({invalid_type_error:'*Please enter no. of applicant'}).or(z.string().nonempty({message:'*Please enter no. of slot'})).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric applicant'}))
});