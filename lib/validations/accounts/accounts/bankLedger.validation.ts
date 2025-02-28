// Imports
import * as z from 'zod';





// Bank Ledger Validation
export const BankLedgerValidation = z.object({
    account_name:z.string().nonempty({message:'*Account name is required'}),
    account_no:z.number({invalid_type_error:'*Account number is required'}).or(z.string().nonempty({message:'*Account number is required'})).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
    group:z.string().nonempty({message:'*Please select a group'}),
    account_type:z.string(),
    account_address:z.string(),
    account_city:z.string(),
    pin_code:z.number().or(z.string()).or(z.null()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
    email:z.string(),
    mobile:z.number().or(z.string()).or(z.null()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
    opening_balance:z.number({invalid_type_error:'*Opening balance is required'}).or(z.string().nonempty({message:'*Opening balance is required'})).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
    opening_balance_type:z.string(),
    assign_date:z.date()
});