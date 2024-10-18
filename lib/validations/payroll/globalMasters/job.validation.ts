// Imports
import * as z from 'zod';





// Today's date
const today = new Date();
today.setHours(0, 0, 0, 0);





// Job validation
export const JobValidation = z.object({
    post:z.string().nonempty({message:'*Please enter post'}),
    salary:z.string().nonempty({message:'*Please enter salary'}),
    experience:z.string().nonempty({message:'*Please enter experience'}),
    description:z.string().nonempty({message:'*Please enter description'}),
    key_skill:z.string().nonempty({message:'*Please enter key skill'}),
    last_date_of_submission:z.date().refine(date => date > today, {
        message: 'Date must be in the future',
    })
});