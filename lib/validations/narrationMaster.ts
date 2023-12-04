// Imports
import * as z from 'zod';





// Narration Master Validation
export const NarrationMasterValidation = z.object({
    voucher_type:z.string(),
    narration:z.string().nonempty()
});