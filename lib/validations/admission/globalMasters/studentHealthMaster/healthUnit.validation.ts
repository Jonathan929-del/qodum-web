// Imports
import * as z from 'zod';





// Health Unit Validation
export const HealthUnitValidation = z.object({
    unit_name:z.string().nonempty({message:'*Unit name is required'}),
    unit_type:z.string().nonempty({message:'*Unit type is required'}),
});