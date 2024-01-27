// Imports
import * as z from 'zod';





// Admission setting validation
export const AdmissionSettingValidation = z.object({
    session:z.string(),
    pay_mode:z.string(),
    send_sms:z.boolean(),
    is_auto_roll_no:z.boolean(),
    school:z.string(),
    class:z.string(),
    board:z.string(),
    number:z.string(),
    should_be:z.string(),
    rec_no_start_from:z.string(),
    prefix:z.string(),
    start_from:z.string(),
    lead_zero:z.string(),
    suffix:z.string()
});