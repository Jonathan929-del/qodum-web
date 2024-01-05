// Imports
import * as z from 'zod';





// Vehicle route validation
export const VehicleRouteValidation = z.object({
    route_no:z.number({invalid_type_error:'*Route no. is required'}).or(z.string().nonempty({message:'*Route no. is required'})).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
    vehicle_description:z.string(),
    route_in_charge_name:z.string(),
    route_in_charge_mobile_no:z.number().or(z.string()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
});