// Imports
import * as z from 'zod';





// Student class promotion validation
export const StudentClassPromotionValidation = z.object({
    class:z.string(),
    section:z.boolean(),
    current_session:z.string(),
    next_session:z.string()
});