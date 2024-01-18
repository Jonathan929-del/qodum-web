// Imports
import * as z from 'zod';





// Student Validation
export const StudentValidation = z.object({
    // Student
    student:z.object({
        // 1
        class:z.string().nonempty({message:'*Class is required'}),
        board:z.string(),
        reg_no:z.number({invalid_type_error:'*Register no. is required'}).or(z.string().nonempty({message:'*Register no. is required'})).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
        pros_no:z.number().or(z.string()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
        amount:z.number().or(z.string()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
        date:z.date(),
        payment_mode:z.string(),
        admission_account:z.string(),
        post_account:z.string(),
        session:z.string(),
        // 2
        name:z.string().nonempty({message:'*Name is required'}),
        middle_name:z.string(),
        last_name:z.string(),
        dob:z.date(),
        place_of_birth:z.string(),
        gender:z.string(),
        contact_person_name:z.string(),
        contact_person_mobile:z.number().or(z.string()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
        contact_person_email:z.string(),
        secondary_contact_no:z.number().or(z.string()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
        h_no_and_streets:z.string(),
        email:z.string(),
        city:z.string(),
        mobile:z.number().or(z.string()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
        state:z.string(),
        pin_code:z.number().or(z.string()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
        aadhar_card_no:z.number().or(z.string()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
        religion:z.string(),
        blood_group:z.string(),
        caste:z.string(),
        category:z.string(),
        is_ews:z.boolean(),
        sibling:z.boolean(),
        transport:z.string(),
        nationality:z.string().nonempty({message:'*Nationality is required'})
    }),



    // Parents
    parents:z.object({
        // Father
        father:z.object({
            father_name:z.string(),
            middle_name:z.string(),
            last_name:z.string(),
            profession:z.string(),
            designation:z.string(),
            residence_address:z.string(),
            office_address:z.string(),
            email:z.string(),
            alternate_email:z.string(),
            dob:z.date(),
            mobile:z.number().or(z.string()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
            phone:z.number().or(z.string()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
            company_name:z.string(),
            business_details:z.string(),
            qualification:z.string(),
            service_in:z.string(),
            office_phone:z.number().or(z.string()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
            office_mobile:z.number().or(z.string()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
            office_extension:z.string(),
            office_email:z.string(),
            office_website:z.string(),
            annual_income:z.string(),
            parent_status:z.string()
        }),
        // Mother
        mother:z.object({
            mother_name:z.string(),
            middle_name:z.string(),
            last_name:z.string(),
            profession:z.string(),
            designation:z.string(),
            residence_address:z.string(),
            office_address:z.string(),
            email:z.string(),
            alternate_email:z.string(),
            dob:z.date(),
            mobile:z.number().or(z.string()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
            phone:z.number().or(z.string()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
            company_name:z.string(),
            business_details:z.string(),
            qualification:z.string(),
            service_in:z.string(),
            office_phone:z.number().or(z.string()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
            office_mobile:z.number().or(z.string()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
            office_extension:z.string(),
            office_email:z.string(),
            office_website:z.string(),
            annual_income:z.string(),
            anniversary_date:z.date()
        })
    }),



    // Other details
    others:z.object({
        // 1
        general_description:z.string(),
        // 2
        emergency_contact:z.object({
            person_name:z.string(),
            mobile_no:z.number().or(z.string()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
            phone_no:z.number().or(z.string()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
            address:z.string(),
            relation:z.string(),
        }),
        // 3
        emergency_contact_two:z.object({
            person_name:z.string(),
            mobile_no:z.number().or(z.string()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
            phone_no:z.number().or(z.string()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
            address:z.string(),
            relation:z.string(),
            is_alumni:z.boolean()
        }),
        // 4
        student_other_details:z.object({
            stream:z.string(),
            optional_subject:z.string(),
            medical_history:z.string(),
            allergies:z.string(),
            other_medical_info:z.string(),
            family_doctor_name:z.string(),
            family_doctor_phone:z.number().or(z.string()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
            family_doctor_address:z.string(),
            distance_from_home:z.number().or(z.string()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
            no_of_living_years:z.number().or(z.string()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
            only_child:z.boolean()
        }),
        // 5
        student_staff_relation:z.object({
            staff_ward:z.string(),
            staff_name:z.string()
        }),
        // 6
        previous_school_details:z.object({
            school_name:z.string(),
            city:z.string(),
            class:z.string(),
            year:z.string(),
            board:z.string()
        })
    }),



    // Guardian details
    guardian_details:z.object({
        // 1
        guardian_name:z.string(),
        profession:z.string(),
        designation:z.string(),
        residence_address:z.string(),
        office_address:z.string(),
        email:z.string(),
        alternate_email:z.string(),
        dob:z.date(),
        mobile:z.number().or(z.string()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
        phone:z.number().or(z.string()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
        company_name:z.string(),
        business_details:z.string(),
        qualification:z.string(),
        service_in:z.string(),
        office_phone:z.number().or(z.string()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
        office_mobile:z.number().or(z.string()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
        office_extension:z.string(),
        office_email:z.string(),
        office_website:z.string(),
        income:z.string(),
        // 2
        if_single_parent:z.object({
            student_lives_with:z.string(),
            correspondence_to:z.string(),
            legal_custody_of_the_child:z.string(),
            check_id_applicable:z.string(),
            separation_reason:z.string(),
        })
    })
});