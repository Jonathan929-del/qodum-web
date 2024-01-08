// Imports
import * as z from 'zod';





// Category Validation
export const CategoryValidation = z.object({
    category_name:z.string().nonempty({message:'*Category name is required'}),
    is_default:z.boolean()
});