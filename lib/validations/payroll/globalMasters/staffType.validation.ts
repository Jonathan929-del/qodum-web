// Imports
import * as z from 'zod';





// Staff type validation
export const StaffTypeValidation = z.object({
    staff_type:z.string().nonempty({message:'*Please enter staff type'}),
    is_hourly_paid:z.boolean(),
    show_on_ecare:z.boolean()
});