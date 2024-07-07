// Imports
import * as z from 'zod';





// Fee Entry Setting Validation
export const FeeEntrySettingValidation = z.object({
    prefix:z.string(),
    lead_zero:z.string(),
    receipt_no_start:z.string(),
    suffix:z.string(),
    generate_type:z.string()
});