// Imports
import * as z from 'zod';





// Staff validation
export const StaffValidation = z.object({

    // Staff registration
    staff_registration:z.object({
        pref_no:z.number({invalid_type_error:'*Please enter pref. no.'}).or(z.string().nonempty({message:'*Please enter Pref. no.'})).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
        first_name_title:z.string().nonempty({message:'Please select first name title'}),
        first_name:z.string().nonempty({message:'Please enter first name'}),
        middle_name:z.string(),
        last_name:z.string(),
        gender:z.string(),
        email:z.string(),
        alternate_email:z.string(),
        phone:z.number().or(z.string()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
        mobile:z.number({invalid_type_error:'*Please enter mobile no.'}).or(z.string().nonempty({message:'*Please enter mobile no.'})).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
        alternate_mobile:z.number().or(z.string()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
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
        address:z.string(),
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

    //Staff salary details
    staff_salary_details:z.object({
        emp_no:z.string(),
        pan_no:z.string(),
        bank_name:z.string(),
        bank_account_no:z.string(),
        is_generate_salary:z.boolean(),
        is_salary_to_bank:z.boolean(),
        machine_no:z.number().or(z.string()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
        pf_no:z.string(),
        esi_no:z.string(),
        uan_no:z.string(),
        emp_acc_no:z.string(),
        status:z.string(),
        salary_group:z.string(),
        basic_salary_part:z.object({
            basic:z.object({
                value:z.number().or(z.string()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
                applied_on:z.date()
            }),
            grade_pay:z.object({
                value:z.number().or(z.string()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
                applied_on:z.date()
            })
        }),
        confirmation_date:z.date(),
        permanent_date:z.date(),
        leaving_date:z.date(),
        joining_date_epf:z.date(),
        joining_date_eps:z.date(),
        leaving_date_epf:z.date(),
        leaving_date_eps:z.date(),
        probation_date:z.date(),
        increment_date:z.date(),
        reason_of_leaving:z.string(),
        short_name:z.string()
    }),

    // Staff salary heads
    staff_salary_heads:z.array(z.object({
        head_name:z.string(),
        value:z.number().or(z.string()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
        value_type:z.string()
    })),


    // Staff educational details
    staff_educational_details:z.any(),


    // Staff document details
    staff_document_details:z.array(z.object({
        document_type:z.string(),
        document_name:z.string(),
        files:z.array(z.string())
    })),

});