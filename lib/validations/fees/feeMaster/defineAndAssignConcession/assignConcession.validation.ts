// Imports
import * as z from 'zod';





// Assign concession validation
export const AssignConcessionValidation = z.object({
    fees_type:z.string(),
    concession_type:z.string(),
    installment:z.string(),
    copy_to_other_installments:z.boolean()
});