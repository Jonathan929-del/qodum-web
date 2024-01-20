// Imports
import * as z from 'zod';





// Enquiry no. setting validation
export const EnquiryNoSettingValidation = z.object({
    session:z.string(),
    setting_type:z.string(),
    prefix:z.string(),
    start_from:z.number({invalid_type_error:'*Set start from'}).or(z.string().nonempty({message:'*Set start from'})).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
    lead_zero:z.string(),
    suffix:z.string()
});