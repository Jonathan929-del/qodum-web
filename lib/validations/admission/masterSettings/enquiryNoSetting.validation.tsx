// Imports
import * as z from 'zod';





// Enquiry no. setting validation
export const EnquiryNoSettingValidation = z.object({
    session:z.string(),
    setting_type:z.string(),
    prefix:z.string(),
    start_from:z.string(),
    lead_zero:z.string(),
    suffix:z.string()
});