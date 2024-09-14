// Imports
import * as z from 'zod';





// Route stop validation
export const RouteStopValidation = z.object({
    route_no:z.string(),
    stop_no:z.number().or(z.string()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
    stop_name:z.string(),
    morning_arrival_time:z.object({
        hour:z.string(),
        minute:z.string(),
        meridiem:z.string()
    }),
    afternoon_arrival_time:z.object({
        hour:z.string(),
        minute:z.string(),
        meridiem:z.string()
    }),
    transport_groups:z.object({
        jan:z.string(),
        feb:z.string(),
        mar:z.string(),
        apr:z.string(),
        may:z.string(),
        jun:z.string(),
        jul:z.string(),
        aug:z.string(),
        sep:z.string(),
        oct:z.string(),
        nov:z.string(),
        dec:z.string()
    })
});