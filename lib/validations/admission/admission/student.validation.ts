// Imports
import * as z from 'zod';





// Student Validation
export const StudentValidation = z.object({
    // Student
    student:z.object({
        // 1
        image:z.string(),
        enquiry_no:z.string(),
        reg_no:z.number({invalid_type_error:'*Register no. is required'}).or(z.string().nonempty({message:'*Register no. is required'})).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
        pros_no:z.number().or(z.string()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
        amount:z.number().or(z.string()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
        date:z.date(),
        payment_mode:z.string(),
        admission_account:z.string(),
        post_account:z.string(),
        // 2
        class:z.string().nonempty({message:'*Class is required'}),
        board:z.string(),
        stream:z.string(),
        subject:z.string(),
        optional_subject:z.string(),
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
        student_other_details:z.object({
            medical_history:z.string(),
            descriptions:z.string(),
            allergies:z.string(),
            allergies_causes:z.string(),
            family_doctor_name:z.string(),
            family_doctor_phone:z.number().or(z.string()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
            family_doctor_address:z.string(),
            distance_from_home:z.number().or(z.string()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
            no_of_living_year:z.number().or(z.string()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
            only_child:z.string(),
            general_description:z.string(),
        }),
        // 2
        student_staff_relation:z.object({
            staff_ward:z.string(),
            staff_name:z.string()
        }),
        // 3
        is_alumni:z.object({
            is_alumni:z.boolean(),
            academic_session:z.string(),
            class_name:z.string(),
            admission_number:z.number().or(z.string()).pipe(z.coerce.number({invalid_type_error:'*Please enter a numeric value'})),
        }),
        // 4
        previous_school_details:z.array(z.object({
            school_name:z.string(),
            board:z.string(),
            passing_year:z.string(),
            total_marks:z.string(),
            percentage:z.string(),
            result:z.string(),
            is_alumni:z.string(),
            father_name:z.string(),
            father_passing_year:z.string(),
            mother_name:z.string(),
            mother_passing_year:z.string()
        }))
    }),



    // Guardian details
    guardian_details:z.object({
        // 1
        guardian_name:z.string(),
        profession:z.string(),
        designation:z.string(),
        company_name:z.string(),
        business_details:z.string(),
        qualification:z.string(),
        // 2
        if_single_parent:z.object({
            student_lives_with:z.string(),
            legal_custody_of_the_child:z.string(),
            correspondence_to:z.string(),
            check_id_applicable:z.string(),
            separation_reason:z.string(),
        })
    })
});