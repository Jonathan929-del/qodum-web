// Imports
import * as z from 'zod';





// Affiliated head
const head = z.object({
    head_name:z.string(),
    amount:z.number().or(z.string()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
});





// Assign fee group to fee head validation
export const AssignAmountGroupValidation = z.object({
    group_name:z.string().nonempty({message:'*Group name is required'}),
    installment:z.string(),
    affiliated_heads:z.array(head)
});