// Imports
import * as z from 'zod';





// Change academic validation
export const ChangeAcademicValidation = z.object({
    academic_year:z.string().nonempty(),
    financial_year:z.string().nonempty(),
    school_name:z.string().nonempty(),
});