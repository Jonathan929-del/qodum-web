// Imports
import * as z from 'zod';





// Document validation
export const DocumentValidation = z.object({
    document_type:z.string().nonempty({message:'*Please select document type'}),
    document_name:z.string().nonempty({message:'*Please enter document name'}),
});