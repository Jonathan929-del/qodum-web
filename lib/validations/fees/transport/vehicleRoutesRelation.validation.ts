// Imports
import * as z from 'zod';





// Vehicle routes relation validation
export const VehicleRoutesRelationValidation = z.object({
    vehicle_name:z.string().nonempty({message:'*Please select vehicle name'}),
    vehicle_no:z.string()
});