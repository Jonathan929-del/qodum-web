// Imports
import * as z from 'zod';





// Student health entry validation
export const StudentHealthEntryValidation = z.object({
    class_name:z.string().nonempty({message:'*Class is required'}),
    section:z.string().nonempty({message:'*Section is required'}),
    students:z.array(z.object({
        adm_no:z.string(),
        height:z.number().or(z.string()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
        weight:z.number().or(z.string()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'}))
    }))
});