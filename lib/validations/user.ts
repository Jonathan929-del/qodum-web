// Import
import * as z from 'zod';



// User validation
export const UserValidation = z.object({
    email:z.string().email(),
    password:z.string().min(8).nonempty(),
});