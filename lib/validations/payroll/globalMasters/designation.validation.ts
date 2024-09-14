// Imports
import * as z from 'zod';





// Designation validation
export const DesignationValidation = z.object({
    designation:z.string().nonempty({message:'*Please enter designation'}),
    show_in_payroll:z.boolean()
});