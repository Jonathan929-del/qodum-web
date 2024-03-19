// Imports
import * as z from 'zod';





// Sms template validation
export const SmsTemplateValidation = z.object({
    sms_type:z.string().nonempty({message:'*Please enter sms type'}),
    sms_template:z.string().nonempty({message:'*Please enter SMS'}),
    is_enable:z.boolean()
});