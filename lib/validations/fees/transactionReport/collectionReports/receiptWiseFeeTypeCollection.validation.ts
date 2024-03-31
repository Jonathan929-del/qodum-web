// Imports
import * as z from 'zod';





// Receipt wise fee type collection validation
export const ReceiptWiseFeeTypeCollectionValidation = z.object({
    school:z.string(),
    wing:z.string(),
    board:z.string(),
    fee_type:z.string(),
    installment:z.string(),
    date_from:z.date(),
    date_to:z.date(),
    user:z.string(),
    new_student:z.string(),
    student_status:z.string(),
    with_settlment_date:z.boolean(),
    with_cheque_clearance_date:z.boolean(),
    show_remark:z.boolean(),
    is_active:z.string(),
    preview:z.string()
});