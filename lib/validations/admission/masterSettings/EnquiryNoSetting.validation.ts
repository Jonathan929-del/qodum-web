// Imports
import * as z from 'zod';





// Enquiry no setting validation
export const EnquiryNoSettingValidation = z.object({
    session:z.string().nonempty({message:'*Please select a session'}),
    enquiry_no_setting_should_be:z.string().nonempty({message:'*Please enter setting type'}),
    prefix:z.string().nonempty({message:'*Please enter prefix'}),
    start_from:z.number({invalid_type_error:'*Please enter start from value'}).or(z.string().nonempty({message:'*Please enter start from value'})).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
    lead_zero:z.string().nonempty({message:'*Please enter lead zero value'}),
    suffix:z.string().nonempty({message:'*Please enter suffix'})
});