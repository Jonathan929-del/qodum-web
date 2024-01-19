// Imports
import * as z from 'zod';





// Send Sms Validation
export const SendSmsValidation = z.object({
    session:z.string().nonempty({message:'*Please select session'}),
    class_name:z.string().nonempty({message:'*Please select class'}),
    special_group:z.string(),
    route:z.string(),
    stop:z.string(),
    vehicle:z.string()
});