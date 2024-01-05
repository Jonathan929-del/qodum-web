// Imports
import * as z from 'zod';





// Travel master validation
export const TravelMasterValidation = z.object({
    travel_agency_name:z.string().nonempty({message:'*Class name is required'}),
    mobile_no:z.number({invalid_type_error:'*Mobile no. is required'}).or(z.string().nonempty({message:'*Mobile no. is required'})).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
    mail_id:z.string().nonempty({message:'*Mail id is required'})
});