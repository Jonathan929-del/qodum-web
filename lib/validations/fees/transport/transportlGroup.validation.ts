// Imports
import * as z from 'zod';





// Transport group validation
export const TransportGroupValidation = z.object({
    distance_name:z.string().nonempty({message:'*Distance name is required'}),
    distance_amount:z.number({invalid_type_error:'*Distance amount is required'}).or(z.string().nonempty({message:'*Distance amount is required'})).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
    distance_from:z.number().or(z.string()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
    distance_to:z.number().or(z.string()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'}))
});