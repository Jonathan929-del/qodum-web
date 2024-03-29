// Imports
import * as z from 'zod';





// Daily fee collection validation
export const DailyFeeCollectionValidation = z.object({
    school:z.string(),
    wing:z.string(),
    board:z.string(),
    date_from:z.date(),
    date_to:z.date(),
    is_receipt_no_range:z.boolean(),
    from:z.number().or(z.string()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
    to:z.number().or(z.string()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
    show_collection:z.string(),
    user:z.string(),
    with_settlment_date:z.boolean(),
    with_cheque_clearance_date:z.boolean()
});