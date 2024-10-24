// Imports
import * as z from 'zod';





// Staff application validation
export const StaffApplicationValidation = z.object({

    // Staff registration
    staff_registration:z.object({
        post:z.string().nonempty({message:'Please select a post'}),
        reg_no:z.string().nonempty({message:'Please enter registration no'}),
        employee_code:z.string().nonempty({message:'Please enter employee code'}),
        approved_teacher:z.string(),
        teacher_id:z.string(),
        cbse_code:z.string(),
        first_name_title:z.string().nonempty({message:'Please select first name title'}),
        first_name:z.string().nonempty({message:'Please enter first name'}),
        middle_name:z.string(),
        last_name:z.string(),
        gender:z.string(),
        email:z.string(),
        alternate_email:z.string(),
        phone:z.number().or(z.string()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
        mobile:z.number({invalid_type_error:'*Please enter mobile no.'}).or(z.string().nonempty({message:'*Please enter mobile no.'})).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
        whatsapp_mobile:z.number().or(z.string()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
        emergency_mobile:z.number().or(z.string()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
        wing:z.string(),
        is_active:z.boolean(),
        profile_picture:z.string(),
        maritial_status:z.string(),
        qualification:z.string(),
        date_of_birth:z.date().nullable().refine(val => val !== null, {message:'DOB is required'}),
        date_of_anniversary:z.date(),
        date_of_joining:z.date(),
        date_of_retire:z.date(),
        date_of_retire_is_extend:z.boolean(),
        permenant_address:z.string(),
        current_address:z.string(),
        father_or_spouse_name:z.string().nonempty({message:'*Please enter father/spouse name'}),
        father_or_spouse_mobile:z.number().or(z.string()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
        father_or_spouse_relation:z.string(),
        blood_group:z.string(),
        staff_type:z.string().nonempty({message:'*Please select staff type'}),
        designation:z.string().nonempty({message:'*Please select designation'}),
        department:z.string().nonempty({message:'*Please select department'}),
        religion:z.string(),
        aadhar_card_no:z.number().or(z.string()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'}))
    }),


    // Staff educational details
    staff_educational_details:z.any(),


    // Staff experience details
    staff_experience_details:z.any(),


    // Staff document details
    staff_document_details:z.array(z.object({
        document_type:z.string(),
        document_name:z.string(),
        files:z.array(z.string())
    }))

});