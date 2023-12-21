// Imports
import * as z from 'zod';





// Bank Ledger Validation
export const AccountGroupValidation = z.object({
    account_name:z.string().nonempty({message:'*Account name is required'}),
    group:z.string().nonempty({message:'*Please select a group'}),
    account_type:z.string(),
    account_address:z.string(),
    account_city:z.string(),
    pin_code:z.number({invalid_type_error:'*Please enter a numeric value'}).or(z.string().transform(value => {if(value.length !== 6) throw new Error('Please enter 6 digits pin code')}))
                .pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
    email:z.string(),
    mobile:z.number({invalid_type_error:'*Please enter a numeric value'}).or(z.string())
            .pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
    opening_balance:z.number({invalid_type_error:'*Opening balance is required'}).or(z.string().nonempty({message:'*Opening balance is required'}))
                    .pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
    opening_balance_type:z.string(),
    assign_date:z.date()
});