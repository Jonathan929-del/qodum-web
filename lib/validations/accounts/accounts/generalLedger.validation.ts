// Imports
import * as z from 'zod';





// General Ledger Validation
export const GeneralLedgerValidation = z.object({
    account_name:z.string().nonempty({message:'*Account name is required'}),
    group:z.string().nonempty({message:'*Please select a group'}),
    account_type:z.string(),
    opening_balance:z.number({invalid_type_error:'*Opening balance is required'}).or(z.string().nonempty({message:'*Opening balance is required'}))
                    .pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
    opening_balance_type:z.string(),
    assign_date:z.date(),
    is_cash_book:z.boolean(),
    is_fixed_asset:z.boolean(),
    depreciation:z.number().or(z.string()).or(z.null()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'}))
}).refine(data => data.is_fixed_asset === true, {
    message:'Depreciation is required',
    path:['depreciation']
});