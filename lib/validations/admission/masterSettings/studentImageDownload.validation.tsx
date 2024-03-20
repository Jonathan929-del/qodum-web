// Imports
import * as z from 'zod';





// Student image download validation
export const StudentImageDownloadValidation = z.object({
    class_name:z.string().nonempty({message:'*Please select class'})
});