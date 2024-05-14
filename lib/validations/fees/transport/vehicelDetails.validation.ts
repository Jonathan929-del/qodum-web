// Imports
import * as z from 'zod';





// Vehicle details validation
export const VehicleDetailsValidation = z.object({
    vehicle_owner:z.string(),
    vehicle_type:z.string().nonempty({message:'*Vehicle type is required'}),
    vehicle_name:z.string().nonempty({message:'*Vehicle name is required'}),
    vehicle_reg_no:z.string().nonempty({message:'*Vehicle register no. is required'}),
    driver_name:z.string(),
    attendent_name:z.string(),
    fule_type:z.string(),
    seating_capacity:z.string(),
    facility_in_bus:z.object({
        cctv:z.boolean(),
        wifi:z.boolean(),
        gps:z.boolean(),
        ac:z.boolean()
    }),
    driver_mobile_no:z.string(),
    gps_no:z.string(),
    service_due_date:z.date(),
    insurance_due_date:z.date(),
    vendor:z.string()
});