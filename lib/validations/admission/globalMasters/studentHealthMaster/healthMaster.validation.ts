// Imports
import * as z from 'zod';





// Health Master Validation
export const HealthMasterValidation = z.object({
    health_parameter:z.string().nonempty({message:'*Health parameter is required'}),
    unit:z.string().nonempty({message:'*Unit is required'}),
});