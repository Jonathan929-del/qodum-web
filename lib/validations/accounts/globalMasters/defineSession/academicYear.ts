// Imports
import * as z from 'zod';





// Narration Master Validation
export const AcademicYearValidation = z.object({
    year_name:z.string().nonempty(),
    start_date:z.object({
        day:z.string().nonempty(),
        month:z.string().nonempty(),
        year:z.string().nonempty()
    }),
    end_date:z.object({
        day:z.string().nonempty(),
        month:z.string().nonempty(),
        year:z.string().nonempty(),
    }),
    is_active:z.boolean()
});