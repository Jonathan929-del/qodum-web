// Imports
import * as z from 'zod';





// Admission setting validation
export const AdmissionSettingValidation = z.object({
    school:z.string().nonempty({message:'*Please select school'}),
    class_name:z.string(),
    board:z.string(),
    setting_type:z.string(),
    should_be:z.string(),
    rec_no:z.number().or(z.string()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
    prefix:z.string(),
    start_from:z.number().or(z.string()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
    lead_zero:z.string(),
    suffix:z.string()
});