// Imports
import * as z from 'zod';





// Prospectus Validation
export const ProspectusValidation = z.object({
    class:z.string().nonempty({message:'*Please enter class'}),
    board:z.string(),
    reg_no:z.number({invalid_type_error:'*Please enter register number'}).or(z.string().nonempty({message:'*Please enter register number'})).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
    date:z.date(),
    session:z.string(),
    student_name:z.string().nonempty({message:'*Please enter student name'}),
    student_middle_name:z.string(),
    student_last_name:z.string(),
    reference:z.string(),
    date_of_birth:z.date(),
    gender:z.string().nonempty({message:'*Please select gender'}),
    father_name:z.string().nonempty({message:'*Please enter father name'}),
    father_middle_name:z.string(),
    father_last_name:z.string(),
    mother_name:z.string(),
    mother_middle_name:z.string(),
    mother_last_name:z.string(),
    con_person:z.string(),
    con_mobile:z.number({invalid_type_error:'*Please enter con number'}).or(z.string().nonempty({message:'*Please enter con number'})).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
    con_email:z.string(),
    h_no_and_streets:z.string(),
    state:z.string(),
    city:z.string(),
    pin_code:z.string(),
    stationaries:z.array(z.string()),
    paymode:z.object({
        name:z.string(),
        cheque_no:z.number().or(z.string()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
        cheque_date:z.date(),
        cheque_bank:z.string(),
        branch_name:z.string(),
        deposit_bank:z.string(),
        dd_no:z.number().or(z.string()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'}))
    }),
    is_online:z.boolean()
});