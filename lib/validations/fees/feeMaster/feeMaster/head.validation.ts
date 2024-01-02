// Imports
import * as z from 'zod';





// Head Validation
export const HeadValidation = z.object({
    name:z.string().nonempty({message:'*Head name is required'}),
    print_name:z.string().nonempty({message:'*Head print name is required'}),
    pay_schedule:z.string().nonempty({message:'*Head print name is required'}),
    priority_no:z.number().or(z.string().nonempty()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
    type:z.string().nonempty({message:'*Type is required'}),
    show_in_certificate:z.boolean(),
    fee_refundable:z.boolean()
});