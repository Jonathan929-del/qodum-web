// Imports
import * as z from 'zod';





// Vehicle details validation
export const VehicleDetailsValidation = z.object({
    vehicle_owner:z.string(),
    vehicle_type:z.string().nonempty({message:'*Vehicle type is required'}),
    vehicle_name:z.string().nonempty({message:'*Vehicle name is required'}),
    vehicle_reg_no:z.string().nonempty({message:'*Vehicle register no. is required'}),
    driver_name:z.string(),
    driver_mobile_no:z.string(),
    gps_no:z.string(),
    service_due_date:z.string().nonempty({message:'*Service due date is required'}),
    insurance_due_date:z.string().nonempty({message:'*Insurance due date is required'}),
    vendor:z.string()
});