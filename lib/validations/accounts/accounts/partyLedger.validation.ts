// Imports
import * as z from 'zod';





// Party Ledger Validation
export const PartyLedgerValidation = z.object({
    account_name:z.string().nonempty({message:'*Account name is required'}),
    group:z.string().nonempty({message:'*Please select a group'}),
    account_type:z.string(),
    account_address:z.string(),
    account_city:z.string(),
    pin_code:z.number().or(z.string()).or(z.null()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
    email:z.string(),
    mobile:z.number().or(z.string()).or(z.null()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
    pan:z.number().or(z.string()).or(z.null()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
    tin:z.number().or(z.string()).or(z.null()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
    opening_balance:z.number({invalid_type_error:'*Opening balance is required'}).or(z.string().nonempty({message:'*Opening balance is required'}))
                    .pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
    opening_balance_type:z.string(),
    assign_date:z.date()
});