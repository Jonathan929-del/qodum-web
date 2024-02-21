// Imports
import * as z from 'zod';





// Head
const head = z.object({
    conc_amount:z.number().or(z.string()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
    paid_amount:z.number().or(z.string()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'}))
});





// Fee entry validation
export const FeeEntryValidation = z.object({
    receipt_date:z.date(),
    ref_no:z.string(),
    receipt_no:z.number().or(z.string()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
    pay_mode:z.string(),
    remarks:z.string(),
    is_adjust_advance:z.boolean(),
    adjust_advance:z.number().or(z.string()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
    fee_type:z.string(),
    bank_name:z.string(),
    installment:z.array(z.string()),
    entry_mode:z.string(),
    heads:z.array(head),
    total_paid_amount:z.number().or(z.string()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
    dues:z.number().or(z.string()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
    advance_amt:z.number().or(z.string()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'}))
});