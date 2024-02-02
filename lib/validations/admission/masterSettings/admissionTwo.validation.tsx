// Imports
import * as z from 'zod';





// Admission setting two validation
export const AdmissionSettingTwoValidation = z.object({
    session:z.string(),
    paymode:z.string(),
    admission_account:z.string(),
    post_account:z.string(),
    send_sms_after_enquiry:z.boolean(),
    is_auto_roll_no:z.boolean()
});