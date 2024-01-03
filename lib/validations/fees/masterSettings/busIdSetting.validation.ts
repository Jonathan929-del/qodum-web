// Imports
import * as z from 'zod';





// Bus id setting validation
export const BusIdSettingValidation = z.object({
    bus_id_type:z.string(),
    prefix:z.string(),
    start_from:z.string(),
    lead_zero:z.string(),
    suffix:z.string()
});