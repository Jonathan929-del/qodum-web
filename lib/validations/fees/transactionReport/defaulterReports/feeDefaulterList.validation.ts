// Imports
import * as z from 'zod';





// Fee defaulter list validation
export const FeeDefaulterListValidation = z.object({
    school:z.string(),
    wing:z.string(),
    preview:z.string(),
    class_name:z.string(),
    section:z.string(),
    board:z.string(),
    fee_type:z.string(),
    is_date_range:z.boolean(),
    from_date:z.date(),
    till_date:z.date(),
    with_head:z.boolean(),
    range:z.string(),
    range_value:z.number().or(z.string()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
    with_fine:z.boolean(),
    header_with_class_group:z.boolean(),
    filter_with_cheque_clearing_date:z.boolean(),
    remark:z.string()
});