// Imports
import * as z from 'zod';





// Due limit validation
export const DueLimitValidation = z.object({
    class_name:z.string(),
    fee_type:z.string(),
    late_fee_on_due:z.boolean(),
    dues_amount:z.number().or(z.string()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
    is_percent:z.boolean(),
    heads:z.string(),
    fine_waive_off_setting:z.string()
});