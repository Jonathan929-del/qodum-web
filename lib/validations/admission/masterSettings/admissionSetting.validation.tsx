// Imports
import * as z from 'zod';





// Admission setting validation
export const AdmissionSettingValidation = z.object({
    session:z.string(),
    default_pay_mode:z.string(),
    is_validate:z.boolean()
});