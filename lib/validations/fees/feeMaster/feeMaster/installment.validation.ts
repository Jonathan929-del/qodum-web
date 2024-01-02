// Imports
import * as z from 'zod';





// Installment Validation
export const InstallmentValidation = z.object({
    name:z.string().nonempty({message:'*Installment name is required'}),
    print_name:z.string().nonempty({message:'*Installment print name is required'}),
    preference_no:z.number({invalid_type_error:'*Preference no. is required'}).or(z.string().nonempty({message:'*Preference no. is required'})).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
    due_on_date:z.object({
        day:z.string().nonempty(),
        month:z.string().nonempty(),
        year:z.string().nonempty()
    }),
    due_date:z.object({
        day:z.string().nonempty(),
        month:z.string().nonempty(),
        year:z.string().nonempty(),
    }),
    months:z.string().array()
});