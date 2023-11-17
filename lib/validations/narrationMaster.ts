// Imports
import * as z from 'zod';





// Narration Master Validation
export const NarrationMasterValidation = z.object({
    voucher_type:z.string().nonempty(),
    narration:z.string().min(3).max(2000).nonempty()
});