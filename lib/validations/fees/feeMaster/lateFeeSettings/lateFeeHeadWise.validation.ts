// Imports
import * as z from 'zod';



// Late fee head wise validation
export const LateFeeHeadWiseValidation = z.object({
    fee_group:z.string().nonempty({message:'*Please select fee group'}),
    fee_type:z.string(),
    installment:z.string(),
    head:z.string(),
    due_date:z.date(),
    late_fee_type:z.string(),
    amount:z.number({invalid_type_error:'*Please enter amount'}).or(z.string().nonempty({message:'*Please enter amount'})).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'}))
});