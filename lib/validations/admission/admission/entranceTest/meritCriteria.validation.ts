// Imports
import * as z from 'zod';





// Merit criteria validation
export const MeritCriteriaValidation = z.object({
    session:z.string().nonempty({message:'*Please selected session'}),
    name:z.string().nonempty({message:'*Please enter name'}),
    maximum_point:z.number({invalid_type_error:'*Please enter maximum point'}).or(z.string().nonempty({message:'*Please enter mobile number'})).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'}))
});