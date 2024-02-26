// Imports
import * as z from 'zod';





// Fee entry validation
export const FeeEntryValidation = z.object({
    received_date:z.date(),
    receipt_no:z.string(),
    remarks:z.string(),
    installment:z.string(),
    pay_mode:z.string(),
    pay_mode_details:z.object({}),
    
    
    
    
    // Form inputs
    fee_type:z.string(),
    bank_name:z.string(),
    entry_mode:z.string(),
    total_paid_amount:z.number().or(z.string()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
    dues:z.number().or(z.string()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
    advance_amt:z.number().or(z.string()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'}))
});